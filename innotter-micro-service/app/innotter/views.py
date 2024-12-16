import boto3
from uuid import UUID
from django.conf import settings
from django.db.models import Avg, F
from rest_framework import mixins, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from innotter.models import Participant, Room, Tag, Priority
from innotter.paginations import CustomPageNumberPagination
from innotter.permissions import (
    IsAdmin,
    IsModeratorOfPageOwnerGroup,
    IsPageOwner,
    JWTAuthentication,
)
from innotter.serializers import (
    ParticipantSerializer,
    RoomSerializer,
    RoomCreateSerializer,
    TagSerializer,
)
from innotter.utils import get_user_info


class FeedViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [JWTAuthentication]
    serializer_class = RoomSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        user_id = get_user_info(self.request).get("id")
        context["user_id"] = user_id
        return context
    
    def get_queryset(self):
        user = get_user_info(self.request)
        user_id = user["id"]
        queryset = Room.objects.all()

        tags = self.request.query_params.get("tags")
        name = self.request.query_params.get("name")
        if name:
            queryset = queryset.filter(name__icontains=name)
        if tags:
            tag_ids = [int(tag) for tag in tags.split(",") if tag.isdigit()]
            queryset = queryset.filter(tags__id__in=tag_ids).distinct()

        queryset = (
            queryset.annotate(
                priority_score=Avg(
                    F('tags__priority__count'),
                    filter=F('tags__priority__user_id') == user_id
                )
            )
            .order_by('priority_score', '-created_at')
        )
        return queryset


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    pagination_class = CustomPageNumberPagination

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']: 
            return RoomCreateSerializer
        return RoomSerializer 

    def get_permissions(self):
        permission_classes = {
            "destroy": [IsAdmin | IsModeratorOfPageOwnerGroup | IsPageOwner],
            "partial_update": [IsPageOwner],
            "post": [IsPageOwner],
            "participants": [IsAdmin | IsModeratorOfPageOwnerGroup | IsPageOwner],
            "default": [JWTAuthentication],
        }
        return [
            permission()
            for permission in permission_classes.get(
                self.action, permission_classes["default"]
            )
        ]

    def perform_create(self, serializer):
        serializer.save(user_id=get_user_info(self.request).get("id"))

    @action(detail=True, methods=["patch"])
    def join(self, request, pk=None):
        room = self.get_object()
        user_id = get_user_info(self.request).get("id")
        response = None
        if Participant.objects.join(room, user_id):
            Priority.objects.increase(user_id, room)
            response = Response(
                {"message": f"You have now joined the room {room.id}."})
        else:
            response = Response(
                {"message": f"You are already in the room {room.id}."}
            )
        return response

    @action(detail=True, methods=["patch"])
    def leave(self, request, pk=None):
        room = self.get_object()
        user_id = get_user_info(self.request).get("id")
        response = None
        if Participant.objects.leave(room, user_id):
            response = Response(
                {"message": f"You have now left the room {room.id}."})
        else:
            response = Response(
                {"message": "You are not in the room {room.id}."})
        return response

    @action(detail=True, methods=["get"])
    def participants(self, request, pk=None):
        room = self.get_object()
        participants = Participant.objects.filter(room=room)
        serializer = ParticipantSerializer(participants, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def joined(self, request, pk=None):
        user = get_user_info(self.request)
        user_id = user["id"]
        room_ids = Participant.objects.filter(
            user_id=user_id).values_list("room")
        rooms = Room.objects.filter(id__in=room_ids)
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def my(self, request, pk=None):
        user = get_user_info(self.request)
        user_id = UUID(user["id"])
        rooms = Room.objects.filter(user_id=user_id)
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)


class TagViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [JWTAuthentication]

    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class PhotoViewSet(viewsets.ViewSet):
    permission_classes = [JWTAuthentication]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.s3_client = boto3.client(
            "s3",
            endpoint_url=settings.AWS["default"]["AWS_URL"],
            aws_access_key_id=settings.AWS["default"]["AWS_ACCESS_KEY"],
            aws_secret_access_key=settings.AWS["default"]["AWS_SECRET_ACCESS_KEY"],
            region_name=settings.AWS["default"]["AWS_REGION_NAME"],
        )
        self.bucket = settings.AWS["default"]["BUCKET"]

    @action(detail=False, methods=["post"])
    def upload_photo(self, request, pk=None):
        user = get_user_info(self.request)

        img_file = request.FILES.get('image')
        if not img_file:
            return Response({"error": "image are required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user_id = UUID(user["id"])
            s3_key = f"uploads/{user_id}/{img_file.name}"
            self.s3_client.upload_fileobj(img_file, self.bucket, s3_key)
            url = f"http://localhost:4566/{self.bucket}/{s3_key}"
            return Response({"url": url}, status=status.HTTP_201_CREATED)
        except ValueError:
            return Response({"error": "Invalid user_id format"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
