import time
import json
import socketio # python-socketio
from locust import HttpUser, between, task

HOST_FRONT = 'https://duxit.ga'
HOST_BACK = 'https://duxit.ga:3000'

class WebsiteUser(HttpUser):
    wait_time = between(1, 2)
    
    def on_start(self):
        # Enter main page
        self.client.get('/')
        
        # Create room
        res = self.client.post(':3000/rooms')
        self.roomID = res.json()['roomID']

        # Enter room
        self.client.get(f'/game/?room={self.roomID}')

        # Connect to socketio
        self.socket = socketio.Client()
        self.socket.connect(f'{HOST_BACK}/socket.io/', transports='polling')

    def on_quit(self):
        self.socket.disconnect()

    @task
    def send_chat(self):
        self.socket.emit(json.dumps(["send chat", {"message": "test message"}]))

    @task
    def move_duck(self):
        self.socket.emit(json.dumps(["send duck move", {"x": 60, "y": 60}]))