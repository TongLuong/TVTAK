import mysql.connector
import sys
from datetime import datetime

sys.path.append("../adafruit-io/")
import connect as adafruit_conn

feedData = adafruit_conn.getFeedData()

mydb = mysql.connector.connect(
    host = "viaduct.proxy.rlwy.net",
    user = "root",
    password = "iVGPpMSCwEPwGCgDuenHGhXevsdwbQtI",
    database = "railway",
    port = "33671"
)

mycursor = mydb.cursor()

def updateRecord(feed_key):
    mycursor.execute(f"select id from Devices where feed_key = '{feed_key}'")
    sensor_id = mycursor.fetchone()[0]
    
    sql = "insert into Records values (%s, %s, %s, %s)"
    val = []
    for i in range(len(feedData)):
        d = feedData[i]
        time = datetime.strptime(d["created_at"], "%Y-%m-%dT%I:%M:%SZ").strftime("%Y-%m-%d %H:%M:%S")
        val.append((None, time, "recorded data", sensor_id))
    
    mycursor.executemany(sql, val)

    mydb.commit()

updateRecord(adafruit_conn.AIO_FEED_ID)

# mycursor.execute("drop table Devices")