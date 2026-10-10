import json
import urllib.request
import websocket


# Django login details
username = "newhu2"
password = "123456"

# Your existing meeting UUID
meeting_id = "51586ac8-c786-4cdb-a7be-11988fd37201"


# -----------------------------
# Step 1: Login to Django
# -----------------------------

login_url = "http://127.0.0.1:8000/login/"

login_data = json.dumps({
    "username": username,
    "password": password
}).encode("utf-8")

login_request = urllib.request.Request(
    login_url,
    data=login_data,
    headers={
        "Content-Type": "application/json"
    },
    method="POST"
)

with urllib.request.urlopen(login_request) as response:
    login_response = json.loads(
        response.read().decode("utf-8")
    )


access_token = login_response["access"]

print("Django login successful")
print("Username:", login_response["user"]["username"])


# -----------------------------
# Step 2: Connect WebSocket
# -----------------------------

ws_url = (
    f"ws://127.0.0.1:8000"
    f"/ws/meetings/{meeting_id}/"
    f"?token={access_token}"
)

ws = websocket.create_connection(ws_url)

print("WebSocket connected")

print("Received:", ws.recv())


# -----------------------------
# Step 3: Send messages
# -----------------------------

while True:

    message = input("Message: ")

    if message.lower() == "exit":
        break

    ws.send(json.dumps({
        "message": message
    }))

    print("Server:", ws.recv())


ws.close()