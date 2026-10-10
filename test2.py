import websocket
import json
import threading

meeting_id = "0c123aad-210d-448f-97ba-04cca4b697f3"

url = f"ws://127.0.0.1:8000/ws/meetings/{meeting_id}/"

ws = websocket.create_connection(url)

print("User B connected")
print("Received:", ws.recv())


def receive_messages():
    while True:
        try:
            message = ws.recv()

            if not message:
                break

            print("\nUser B received:", message)

        except Exception:
            break


threading.Thread(
    target=receive_messages,
    daemon=True
).start()


while True:
    message = input("User B: ")

    if message.lower() == "exit":
        break

    ws.send(json.dumps({
        "username": "User B",
        "message": message
    }))

ws.close()