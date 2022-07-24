from flask import Flask, render_template, request, redirect, url_for, flash,jsonify
import os 
from peewee import *
from playhouse.shortcuts import model_to_dict, dict_to_model
import json 
import requests
# initializations
app = Flask(__name__)

# Mysql Connection
MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_DB = os.getenv('MYSQL_DB')

# Authentication connection
AUTH_KEYROCK_URL = os.getenv('AUTH_KEYROCK_URL')
AUTH_BASIC_PASS = os.getenv('AUTH_BASIC_PASS')
PEP_URL = os.getenv('PEP_URL')
KEYROCK_USER = os.getenv('KEYROCK_USER')
KEYROCK_PASS = os.getenv('KEYROCK_PASS')


db = MySQLDatabase(MYSQL_DB,host=MYSQL_HOST, user=MYSQL_USER, passwd=MYSQL_PASSWORD)


class EdgeData1(Model):
    factoryID = TextField()
    edgeID = TextField()
    sectionID = TextField()
    registry = TextField()
    value = TextField()
 
    class Meta:
        database = db

EdgeData1.create_table()
# routes

#Post data in database
@app.route('/api',methods=['POST'])
def postDBdata():
    body=request.get_json()
    checkResult = checkError(body)
    if checkResult['status'] != 200:  return jsonify(checkResult)
    try:
        edgeData = EdgeData1(factoryID="Stark Industries",edgeID="1",sectionID= body['section'], registry=body['registry'], value=body['value'])
        edgeData.save()
        return jsonify({'status':200, 'detail':'DB updated succesfully'})
    except:
        print("DB update FAILED!")
        return jsonify({'status':400, 'detail':'DB error'})


# Get data from database
@app.route('/api',methods=['GET'])
def getDBdata():
    try:
        edgeData = EdgeData1.select()
        return jsonify({'status':200, 'detail': [model_to_dict(error) for error in edgeData] })
    except:
        print("DB select FAILED!")
        return jsonify({'status':400, 'detail':'DB error'})


#Check if registry value is less than 50 
def checkError(data):
    if data["registry"] == 3029 and data['value'] < 50:
        
        token = getToken()
        if 'status' in token : return token 

        responsePostAgent = postAgent(data,token)
        return responsePostAgent
    else:
        return {'status':200}

#Identification IDM Fiware (keyrock)
def getToken():
    headers = {"Content-Type": "application/x-www-form-urlencoded","Authorization": "Basic {}".format(AUTH_BASIC_PASS)}
    data = {
        "username":"{}".format(KEYROCK_USER),
        "password":"{}".format(KEYROCK_PASS),
        "grant_type": "password"
    }
    getToken = requests.post('{}/oauth2/token'.format(AUTH_KEYROCK_URL),data = data,headers = headers,verify=False)
    
    if getToken.status_code != 200: 
        return {'status':getToken.status_code, 'detail':getToken.text} 
    else:
        return json.loads(getToken.text)['access_token']

#Post data to the cloud agent
def postAgent(data,token):
    headers = {"Content-Type": "application/json","X-Auth-Token": token}
    postAgent = requests.post('{}/upload'.format(PEP_URL),json = data,headers = headers, verify=False)
    if postAgent.status_code != 200: 
        return {'status':postAgent.status_code, 'detail':(postAgent.text)} 
    else:
        return {'status':200, 'detail':json.loads(postAgent.text)}

 
# Starting the app
if __name__ == "__main__":
    app.run(port=3000, debug=True,host = "0.0.0.0")