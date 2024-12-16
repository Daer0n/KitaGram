from django.db import models

from innotter.managers import ParticipantManager, PriorityManager


class Tag(models.Model):
    name = models.CharField(max_length=50)


class Room(models.Model):
    user_id = models.UUIDField(null=False)
    name = models.CharField(max_length=50, null=False)
    description = models.CharField(max_length=100, default=None, blank=True, null=True)
    image_url = models.URLField(default=None, blank=True, null=True)
    category =  models.CharField(max_length=100, default=None, blank=True, null=True)
    tags = models.ManyToManyField(Tag)
    location = models.CharField(max_length=255, default=None, blank=True, null=True)
    datetime = models.DateTimeField(null=False)
    participants = models.PositiveIntegerField(default=0)
    participants_limit = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def is_user_in_room(self, user_id):
        return self.participant_set.filter(user_id=user_id).exists()


class Participant(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    user_id = models.UUIDField(null=False)

    objects = ParticipantManager()


class Priority(models.Model):
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    user_id = models.UUIDField(null=False)
    count = models.PositiveIntegerField(default=1)

    objects = PriorityManager()

