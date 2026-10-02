from django.urls import path
from .views import (
    MeetingCreateAPIView,
    MyMeetingsAPIView,
    JoinMeetingAPIView,
    JoinParticipantAPIView,
)
urlpatterns = [
    path("create/", MeetingCreateAPIView.as_view(), name="meeting_create"),
    path("my/", MyMeetingsAPIView.as_view(), name="my_meetings"),
    path(
        "join/<uuid:meeting_id>/",
        JoinMeetingAPIView.as_view(),
        name="join_meeting",
    ),
    path(
    "join-participant/<uuid:meeting_id>/",
    JoinParticipantAPIView.as_view(),
    name="join_participant",
),
]