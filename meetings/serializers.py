from rest_framework import serializers
from .models import Meeting


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