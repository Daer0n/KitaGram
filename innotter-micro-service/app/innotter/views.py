from uuid import UUID
from django.db.models import Q
from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from innotter.models import Participant, Room, Tag
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
    TagSerializer,
)
from innotter.utils import get_user_info


# TODO: add recommendations
class FeedViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [JWTAuthentication]
    serializer_class = RoomSerializer

    def get_queryset(self):
        queryset = Room.objects.all()

        tags = self.request.query_params.get("tags")
        name = self.request.query_params.get("name")
        if name:
            queryset = queryset.filter(name__icontains=name)
        if tags:
            tag_ids = [int(tag) for tag in tags.split(",") if tag.isdigit()]
            queryset = queryset.filter(tags__id__in=tag_ids).distinct()

        return queryset


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    pagination_class = CustomPageNumberPagination

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
            response = Response({"message": f"You are now following page {room.id}."})
        else:
            response = Response(
                {"message": f"You are already following page {room.id}."}
            )
        return response

    @action(detail=True, methods=["patch"])
    def leave(self, request, pk=None):
        room = self.get_object()
        user_id = get_user_info(self.request).get("id")
        response = None
        if Participant.objects.leave(room, user_id):
            response = Response({"message": f"You no longer following page {room.id}."})
        else:
            response = Response({"message": f"You are not following page {room.id}."})
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
        room_ids = Participant.objects.filter(user_id=user_id).values_list("room")
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

