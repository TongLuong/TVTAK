import pymysql
import mysql.connector # type: ignore

pymysql.install_as_MySQLdb()
mysql.connector.connect()