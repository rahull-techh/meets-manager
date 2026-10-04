from django.db import models
from django.contrib.auth.models import User
import uuid


class Meeting(models.Model):
    host = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="hosted_meetings"
    )
    title = models.CharField(max_length=200)

    meeting_id = models.UUIDField(
    default=uuid.uuid4,
    unique=True,
    editable=False
)
    scheduled_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class MeetingParticipant(models.Model):

    meeting = models.ForeignKey(
        Meeting,
        on_delete=models.CASCADE,
        related_name="participants"
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="meeting_participations"
    )

    joined_at = models.DateTimeField(auto_now_add=True)

    left_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.meeting.title}"