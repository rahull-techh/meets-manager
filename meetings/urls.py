from django.urls import path
from .views import (
    MeetingCreateAPIView,
    MyMeetingsAPIView,
    JoinMeetingAPIView,
    JoinParticipantAPIView,
    LeaveParticipantAPIView,
    MeetingParticipantsAPIView,
    MeetingUpdateAPIView,
    MeetingDeleteAPIView,
)
urlpatterns = [

    path("create/", MeetingCreateAPIView.as_view(), name="meeting_create"),
    path("my/", MyMeetingsAPIView.as_view(), name="my_meetings"),
    path( "join/<uuid:meeting_id>/",JoinMeetingAPIView.as_view(),name="join_meeting"),
    path("join-participant/<uuid:meeting_id>/",JoinParticipantAPIView.as_view(),name="join_participant"),
    path("leave-participant/<uuid:meeting_id>/",LeaveParticipantAPIView.as_view(),name="leave_participant"),
    path("participants/<uuid:meeting_id>/",MeetingParticipantsAPIView.as_view(),name="meeting_participants"),
    path("update/<uuid:meeting_id>/",MeetingUpdateAPIView.as_view(),name="meeting_update"),
    path("delete/<uuid:meeting_id>/", MeetingDeleteAPIView.as_view(),name="meeting_delete"),

]