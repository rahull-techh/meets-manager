from django.urls import path

from .consumers import MeetingConsumer


websocket_urlpatterns = [
    path(
        "ws/meetings/<uuid:meeting_id>/",
        MeetingConsumer.as_asgi(),
    ),
]