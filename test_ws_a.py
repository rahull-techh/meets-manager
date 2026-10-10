import websocket
import json
import threading

meeting_id = "0c123aad-210d-448f-97ba-04cca4b697f3"
access_token = "YOUR_ACCESS_TOKEN"

url = f"wss://meets-manager.onrender.com/ws/meetings/{meeting_id}/?token={access_token}"

ws = websocket.create_connection(url)

print("User A connected")
print("Received:", ws.recv())

def receive_messages():
    while True:
        try:
            message = ws.recv()

            if not message:
                break

            print("\nUser A received:", message)

        except Exception:
            break

threading.Thread(
    target=receive_messages,
    daemon=True
).start()

while True:
    message = input("User A: ")

    if message.lower() == "exit":
        break

    ws.send(json.dumps({
        "username": "User A",
        "message": message
    }))

ws.close()