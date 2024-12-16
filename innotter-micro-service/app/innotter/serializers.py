from rest_framework import serializers

from innotter.models import Participant, Room, Tag


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
            "created_at",
            "modified_at",
        ]

    def get_is_user_in_room(self, obj):
        user_id = self.context.get("user_id")
        if user_id:
            return obj.is_user_in_room(user_id)
        return False

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
