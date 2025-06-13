import requests
import json

def test():
    response = requests.post(f"http://localhost:3000/test", json = {
        "username": "22621",
    })
    print(response.json())

test()
