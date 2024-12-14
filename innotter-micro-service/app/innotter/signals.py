from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from innotter.models import Participant


@receiver([post_save, post_delete], sender=Participant)
def update_page_follower(sender, instance, **kwargs):
    room = instance.room
    room.participants = Participant.objects.filter(room=room).count()
    room.save()

