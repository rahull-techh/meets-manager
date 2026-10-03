from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Meeting, MeetingParticipant
from .serializers import (
    MeetingSerializer,
    MeetingParticipantSerializer
)
from django.utils import timezone

from .models import Meeting
from .serializers import MeetingSerializer


class MeetingCreateAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = MeetingSerializer(data=request.data)

        if serializer.is_valid():
            meeting = serializer.save(host=request.user)

            return Response(
                MeetingSerializer(meeting).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class MyMeetingsAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        meetings = Meeting.objects.filter(
            host=request.user
        ).order_by("-created_at")

        serializer = MeetingSerializer(
            meetings,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
    
class JoinMeetingAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, meeting_id):

        try:
            meeting = Meeting.objects.get(
                meeting_id=meeting_id
            )
        except Meeting.DoesNotExist:
            return Response(
                {"error": "Meeting not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response(
            MeetingSerializer(meeting).data,
            status=status.HTTP_200_OK
        )    

class JoinParticipantAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, meeting_id):

        try:
            meeting = Meeting.objects.get(
                meeting_id=meeting_id
            )
        except Meeting.DoesNotExist:
            return Response(
                {"error": "Meeting not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        participant, created = MeetingParticipant.objects.get_or_create(
            meeting=meeting,
            user=request.user
        )

        return Response(
            MeetingParticipantSerializer(participant).data,
            status=status.HTTP_201_CREATED if created
            else status.HTTP_200_OK
        )
class LeaveParticipantAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, meeting_id):

        try:
            meeting = Meeting.objects.get(
                meeting_id=meeting_id
            )
        except Meeting.DoesNotExist:
            return Response(
                {"error": "Meeting not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            participant = MeetingParticipant.objects.get(
                meeting=meeting,
                user=request.user
            )
        except MeetingParticipant.DoesNotExist:
            return Response(
                {"error": "You have not joined this meeting"},
                status=status.HTTP_404_NOT_FOUND
            )

        participant.left_at = timezone.now()
        participant.save()

        return Response(
            MeetingParticipantSerializer(participant).data,
            status=status.HTTP_200_OK
        )


class MeetingParticipantsAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, meeting_id):

        try:
            meeting = Meeting.objects.get(
                meeting_id=meeting_id
            )
        except Meeting.DoesNotExist:
            return Response(
                {"error": "Meeting not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        participants = MeetingParticipant.objects.filter(
            meeting=meeting
        ).order_by("joined_at")

        serializer = MeetingParticipantSerializer(
            participants,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class MeetingUpdateAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def put(self, request, meeting_id):

        try:
            meeting = Meeting.objects.get(
                meeting_id=meeting_id
            )
        except Meeting.DoesNotExist:
            return Response(
                {"error": "Meeting not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if meeting.host != request.user:
            return Response(
                {"error": "Only the host can update this meeting"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = MeetingSerializer(
            meeting,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class MeetingDeleteAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, meeting_id):

        try:
            meeting = Meeting.objects.get(
                meeting_id=meeting_id
            )
        except Meeting.DoesNotExist:
            return Response(
                {"error": "Meeting not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if meeting.host != request.user:
            return Response(
                {"error": "Only the host can delete this meeting"},
                status=status.HTTP_403_FORBIDDEN
            )

        meeting.delete()

        return Response(
            {"message": "Meeting deleted successfully"},
            status=status.HTTP_200_OK
        )

class StartMeetingAPIView(APIView):

    permission_classes = [IsAuthenticated]
    def post(self, request,meeting_id):

        try:
            meeting = Meeting.objects.get(
                meeting_id = meeting_id
            )
        except Meeting.DoesNotExist:
            return Response ({"error": "Meeting Not found"},
            status = status.HTTP_404_NOT_FOUND )

        if meeting.host != request.user:
            return Response({"error":"Only host can start this meeting"},
                        status = status.HTTP_403_FORBIDDEN
            )
        meeting.is_active = True
        meeting.save(update_fields=["is_active"])

        return Response({
            "message": "Meeting started successfully",
            "meeting_id": str(meeting.meeting_id),
            "is_active": meeting.is_active
        },
        status= status.HTTP_200_OK
        )


class EndMeetingAPIView(APIView):

    permission_classes =[IsAuthenticated]

    def post(self,request,meeting_id):

        try:
            meeting = Meeting.objects.get(
                meeting_id = meeting_id
            )
        except Meeting.DoesNotExist:
            return Response({
                "error":"Meeting doesnot exist"},
                status= status.HTTP_404_NOT_FOUND
            )

        if meeting.host != request.user:
            return Response({"error":"Only Host can end the meeting"},
                            status= status.HTTP_403_FORBIDDEN
            )
        if not meeting.is_active:
            return Response({"error":
                 "Meeting is not active"},
                 status= status.HTTP_400_BAD_REQUEST
                )
        meeting.is_active = True
        meeting.save(update_fields=["is_active"])

        return Response({"message": "Meeting ended successfully",
                "meeting_id": str(meeting.meeting_id),
                "is_active": meeting.is_active},
                
                status=status.HTTP_200_OK
            )