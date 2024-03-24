from Adafruit_IO import MQTTClient, Client
import serial.tools.list_ports
import sys, time, requests
from datetime import datetime

AIO_FEED_ID = "iot-light"
AIO_USERNAME = "DADN_CNPM_3"
AIO_KEY = "aio_lCaK60OFwRJhKMC1laoTjfIk5OGJ"

FEED_API_DATA = f"https://io.adafruit.com/api/v2/{AIO_USERNAME}/feeds/{AIO_FEED_ID}/data"

def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB-SERIAL" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    return commPort

def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    if splitData[1] == "TEMP":
        print(data)
        # client.send(AIO_FEED_ID, data)

mess = ""
def run():
    client = Client(AIO_USERNAME, AIO_KEY)
    ser = serial.Serial(port="COM6", baudrate=9600)
    def readSerial():
        bytesToRead = ser.inWaiting()
        if (bytesToRead > 0):
            global mess
            mess = mess + ser.read(bytesToRead).decode("UTF-8")
            while ("#" in mess) and ("!" in mess):
                start = mess.find("!")
                end = mess.find("#")
                processData(mess[start:end + 1])
                if (end == len(mess)):
                    mess = ""
                else:
                    mess = mess[end+1:]

    while True:
        data = client.receive(AIO_FEED_ID)
        print(f"Received value: {data.value}")
        readSerial()
        
        time.sleep(0.5)

def getFeedData() -> list:
    return requests.get(FEED_API_DATA).json()

# print(datetime.strptime(getFeedData()[0]["created_at"], "%Y-%m-%dT%I:%M:%SZ"))
# run()