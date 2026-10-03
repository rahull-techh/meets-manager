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
    StartMeetingAPIView,
    EndMeetingAPIView,
    MeetingHistoryAPIView,
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
    path("start/<uuid:meeting_id>/", StartMeetingAPIView.as_view(),name="start_meeting"),
    path("end/<uuid:meeting_id>/", EndMeetingAPIView.as_view(),name="end_meeting"),
    path("history/<uuid:meeting_id>/",MeetingHistoryAPIView.as_view(),name="meeting_history"),

]