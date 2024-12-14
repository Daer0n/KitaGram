from django.db import models

from innotter.managers import ParticipantManager


class Tag(models.Model):
    name = models.CharField(max_length=50)


class Room(models.Model):
    user_id = models.UUIDField(null=False)
    name = models.CharField(max_length=50, null=False)
    description = models.CharField(max_length=100, default=None, blank=True, null=True)
    image_url = models.URLField(default=None, blank=True, null=True)
    tags = models.ManyToManyField(Tag)
    datetime = models.DateTimeField(null=False)
    participants = models.PositiveIntegerField(default=0)
    participants_limit = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)


class Participant(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    user_id = models.UUIDField(null=False)

    objects = ParticipantManager()


