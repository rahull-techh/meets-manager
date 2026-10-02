from django.urls import path
from .views import (
    MeetingCreateAPIView,
    MyMeetingsAPIView,
    JoinMeetingAPIView,
)

urlpatterns = [
    path("create/", MeetingCreateAPIView.as_view(), name="meeting_create"),
    path("my/", MyMeetingsAPIView.as_view(), name="my_meetings"),
    path(
        "join/<uuid:meeting_id>/",
        JoinMeetingAPIView.as_view(),
        name="join_meeting",
    ),
]