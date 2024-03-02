from Adafruit_IO import MQTTClient, Client
import sys, time

AIO_FEED_ID = "led"
AIO_USERNAME = "DADN_CNPM_3"
AIO_KEY = "aio_lCaK60OFwRJhKMC1laoTjfIk5OGJ"

def connected(client):
    print ("Ket noi thanh cong ...")
    client.subscribe(AIO_FEED_ID)

def subscribe(client, userdata, mid, granted_qos) :
    print("Subcribe thanh cong ...")

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit(1)

def message(client, feed_id, payload):
    print("Nhan du lieu : " + payload)

# client = MQTTClient(AIO_USERNAME, AIO_KEY)
# client.on_connect = connected
# client.on_disconnect = disconnected
# client.on_message = message
# client.on_subscribe = subscribe
# client.connect()
# client.loop_background()
    
client = Client(AIO_USERNAME, AIO_KEY)
client.send(AIO_FEED_ID, 0)

while True:
    data = client.receive(AIO_FEED_ID)
    print(f"Received value: {data.value}")
    time.sleep(0.5)