from rest_framework import serializers
from .models import Meeting, MeetingParticipant


class MeetingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Meeting
        fields = [
            "id",
            "meeting_id",
            "title",
            "scheduled_at",
            "created_at",
            "is_active",
        ]
        read_only_fields = [
            "id",
            "meeting_id",
            "created_at",
            "is_active",
        ]
    def validate_scheduled_at(self,value):
        from django.utils import timezone

        if value <= timezone.now():
            raise serializers.ValidationError("Meeting should be scheduled for Future time")
        return value


class MeetingParticipantSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:
        model = MeetingParticipant
        fields = [
            "id",
            "username",
            "joined_at",
            "left_at",
        ]
        read_only_fields = [
            "id",
            "username",
            "joined_at",
            "left_at",
        ]