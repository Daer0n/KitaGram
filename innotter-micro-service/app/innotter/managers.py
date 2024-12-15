from django.core.exceptions import ObjectDoesNotExist
from django.db import models


class ParticipantManager(models.Manager):
    def join(self, room, user_id):
        result = None
        try:
            self.get(room=room, user_id=user_id)
            result = False
        except ObjectDoesNotExist:
            self.create(room=room, user_id=user_id)
            result = True
        return result

    def leave(self, room, user_id):
        result = None
        try:
            follower = self.get(room=room, user_id=user_id)
            follower.delete()
            result = True
        except ObjectDoesNotExist:
            result = False
        return result



class PriorityManager(models.Manager):
    def increase(self, user_id, room):
        tags = room.tags.all()
        for tag in tags:
            instace, created = self.get_or_create(user_id=user_id, tag=tag)
            if not created:
                instace.counter += 1
                instace.save()
        