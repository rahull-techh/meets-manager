import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from .models import Meeting


class MeetingConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.meeting_id = self.scope["url_route"]["kwargs"]["meeting_id"]

        self.room_group_name = f"meeting_{self.meeting_id}"

        meeting_exists = await self.check_meeting()

        if not meeting_exists:
            await self.close()
            return

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "user_joined",
                "username": self.scope["user"].username,
            }
        )

    async def disconnect(self, close_code):

        if hasattr(self, "room_group_name"):
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "user_left",
                    "username": self.scope["user"].username,
                }
            )

    async def receive(self, text_data):

        data = json.loads(text_data)

        message = data.get("message", "")
        username = self.scope["user"].username

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "username": username,
                "message": message
            }
        )

    async def user_joined(self, event):

        await self.send(text_data=json.dumps({
            "type": "user_joined",
            "username": event["username"]
        }))

    async def user_left(self, event):

        await self.send(text_data=json.dumps({
            "type": "user_left",
            "username": event["username"]
        }))

    async def chat_message(self, event):

        await self.send(text_data=json.dumps({
            "type": "chat_message",
            "username": event["username"],
            "message": event["message"]
        }))

    @database_sync_to_async
    def check_meeting(self):

        return Meeting.objects.filter(
            meeting_id=self.meeting_id
        ).exists()