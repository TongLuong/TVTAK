import sys
sys.path.append("../adafruit-io/")
from connect import AdafruitConnection

adafruit_conn = AdafruitConnection("DADN_CNPM_3",
                    "aio_lCaK60OFwRJhKMC1laoTjfIk5OGJ",
                    "manual-pump")

# feedData = adafruit_conn.getFeedData()
# print(feedData)

adafruit_conn.sendFeedData("1")