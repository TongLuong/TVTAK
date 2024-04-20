from Adafruit_IO import Client
import requests

class AdafruitConnection:
    def __init__(self, username, key, feed_id):
        self.AIO_FEED_ID = feed_id
        self.AIO_USERNAME = username
        self.AIO_KEY = key

        self.FEED_API_DATA = f"https://io.adafruit.com/api/v2/{username}/feeds/{feed_id}/data"
        self.client = Client(self.AIO_USERNAME, self.AIO_KEY)

    def sendFeedData(self, data):
        self.client.send(self.AIO_FEED_ID, data)

    def getFeedData(self) -> list:
        return requests.get(self.FEED_API_DATA).json()