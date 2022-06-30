from flask import Flask, render_template, request, redirect, url_for, flash,jsonify
import os 
from peewee import *
from playhouse.shortcuts import model_to_dict, dict_to_model
import json 
import requests
# initializations
app = Flask(__name__)

# Mysql Connection
# MYSQL_HOST = os.getenv('MYSQL_HOST')
# MYSQL_USER = os.getenv('MYSQL_USER')
# MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
# MYSQL_DB = os.getenv('MYSQL_DB')

MYSQL_HOST = "158.42.161.177"
MYSQL_USER = "user"
MYSQL_PASSWORD = "password"
MYSQL_DB = "tfm"

db = MySQLDatabase(MYSQL_DB,host=MYSQL_HOST, port=30306, user=MYSQL_USER, passwd=MYSQL_PASSWORD)


class EdgeData1(Model):
    factoryID = TextField()
    sectionID = TextField()
    registry = TextField()
    value = TextField()
 
    class Meta:
        database = db

EdgeData1.create_table()
# routes

@app.route('/api',methods=['POST'])
def postDBdata():
    body=request.get_json()
    checkResult = checkError(body)
    if checkResult['status'] != 200:  return jsonify(checkResult)
    try:
        edgeData = EdgeData1(factoryID="Danone", sectionID='section1', registry=body['registry'], value=body['value'])
        edgeData.save()
        return jsonify({'status':200, 'detail':'DB updated succesfully'})
    except:
        print("DB update FAILED!")
        return jsonify({'status':400, 'detail':'DB error'})
   

@app.route('/api',methods=['GET'])
def getDBdata():
    try:
        edgeData = EdgeData1.select().get()
        json_data = json.dumps(model_to_dict(edgeData))
        return jsonify({'status':200, 'detail':'ok'})
    except:
        print("DB select FAILED!")
        return jsonify({'status':400, 'detail':'DB error'})

def checkError(data):
    if data["registry"] == 3029 and data['value'] < 50:
        print(type(data))
        postOrion = requests.post('http://127.0.0.1:8880/upload',json = data)
        print(postOrion.status_code)
        if postOrion.status_code != 200: 
            return {'status':400, 'detail':'Orion Error'} 
        else: 
            return {'status':200}


# starting the app
if __name__ == "__main__":
    app.run(port=3000, debug=True,host = "0.0.0.0")