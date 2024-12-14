from rest_framework import serializers

from innotter.models import Participant, Room, Tag


class RoomSerializer(serializers.ModelSerializer):
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
            "tags",
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


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = [
            "id",
            "name",
        ]
