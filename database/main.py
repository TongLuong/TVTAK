import mysql.connector

mydb = mysql.connector.connect(
    host = "viaduct.proxy.rlwy.net",
    user = "root",
    password = "iVGPpMSCwEPwGCgDuenHGhXevsdwbQtI",
    database = "railway",
    port = "33671"
)

mycursor = mydb.cursor()

# sql = "INSERT INTO User VALUES (%s, %s)"
# val = ("0", "abc@gmail.com", "john", "1234", "012345678", "Japan", "No")
# mycursor.execute(sql, val)

# mydb.commit()

# print(mycursor.rowcount, "record inserted.")
mycursor.execute("select * from User")
for x in mycursor:
    print(x)