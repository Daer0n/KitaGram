from rest_framework import serializers

from innotter.models import Participant, Room, Tag, Priority
from django.db.models import Sum, F



class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = [
            "id",
            "name",
        ]

class RoomSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, required=False)
    is_user_in_room = serializers.SerializerMethodField()
    priority_count = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = [
            "id",
            "name",
            "description",
            "image_url",
            "category",
            "tags",
            "datetime",
            "location",
            "participants",
            "participants_limit",
            "is_user_in_room",
            "priority_count",
            "created_at",
            "modified_at",
        ]

    def get_is_user_in_room(self, obj):
        user_id = self.context.get("user_id")
        if user_id:
            return obj.is_user_in_room(user_id)
        return False
    
    def get_priority_count(self, obj):
        user_id = self.context.get("user_id")
        if not user_id:
            return 0
    
        priority_count = (
            Priority.objects.filter(tag__in=obj.tags.all(), user_id=user_id)
            .aggregate(total=Sum('count'))['total']
            or 0
        )
        return priority_count
    

class RoomCreateSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(), many=True, required=False
    )

    class Meta:
        model = Room
        fields = [
            "id",
            "name",
            "description",
            "image_url",
            "category",
            "tags",
            "location",
            "datetime",
            "participants",
            "participants_limit",
            "created_at",
            "modified_at",
        ]

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = [
            "user_id",
            "room"
        ]
