from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

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