from django.shortcuts import render
from rest_framework.response import Response # type: ignore
from rest_framework.decorators import api_view
from server.settings import ADAFRUIT_USERNAME, ADAFRUIT_KEY
from .models import User
from Adafruit_IO import Client
from django.http import HttpResponse
# Create your views here.
def get_api(request):

    return render(request, "index.html")

@api_view(['POST'])
def postData(request):
         # Retrieve data from the request
        data = request.data
        User.objects.create(**data)
        return Response()

@api_view(['GET'])
def getData(request):
        # Retrieve all users
        users = User.objects.all().values()
        return Response(users)
def controlPump(request):
    feed_id = "manual-pump"

    # Assuming ADAFRUIT_USERNAME and ADAFRUIT_KEY are defined elsewhere in your settings
    client = Client(ADAFRUIT_USERNAME, ADAFRUIT_KEY)
    data = client.receive(feed_id).value
    print("data", data)
    # Assuming you want to send the value 1 to the specified feed_id
    client.send_data(feed_id, 1 if data == '0' else 0)
    return HttpResponse("Data sent successfully to Ada fruit IO")