import os
from flask import Flask, request, jsonify, abort
# from sqlalchemy import exc
import json
from flask_cors import CORS
import pandas as pd
import uuid

from sqlalchemy import create_engine
# from .database.models import db_drop_and_create_all, setup_db, Drink
from auth.auth import AuthError, requires_auth
import requests
app = Flask(__name__)
# setup_db(app)
CORS(app)
##
user = 'AhmedSalah'
password = 'M@DEin2BYSS'
account_name = 'zh03665.west-us-2.azure'
data_base = 'test'
ware_house = 'test'
con_str = 'snowflake://{user}:{password}@{account}/{data_base}/public?warehouse={ware_house}'.format(
        user=user,
        password=password,
        account=account_name,
        data_base = data_base,
        ware_house = ware_house
    )



##
@app.route('/upload_data',methods=['POST'])
@requires_auth()
def upload_data(jwt):
	print(request)
	body = request.get_json()
	print(body)
	if not(body):
		abort(400)
	data = body.get('data',None)
	print(data)
	if not (data):
		abort(400)
	cols = body.get('cols',None)
	if not (cols):
		abort(400)
	table = body.get('table',None)
	if not (table):
		abort(400)
	engine = create_engine(con_str)
	domain = 'dev-8tto1d7k.eu.auth0.com'
	url = 'https://{}/userinfo'.format(domain)
	print(jwt)
	headers = {'Authorization': 'Bearer '+jwt}
	x = requests.get(url, headers=headers)
	x = x.json()
	print(x)
	if 'email' in x:
		email = x['email']
	else:
		return jsonify({"success": False})
	
	# a_json = json.loads(data)
	# df = pd.DataFrame.from_dict(data, orient="index")
	# df = pd.DataFrame(data)
	# unique_filename = str(uuid.uuid4().hex)
	# df.to_csv(unique_filename)
	
	sequence_of_parameters1 = [list(elem.values()) for elem in data]

	stmt2 = "insert into PEOPLE (v1, v2, v3) values (?, ?)"
	# con = snowflake.connector.connect(...)
	failed = False
	try:
		df = pd.DataFrame(sequence_of_parameters1, columns=cols)
		df['EMAIL'] = email
		print(df)
		results = df.to_sql(table, con=engine, schema='public', index=False, if_exists='append')

		# con = engine.connect()
		# results = con.cursor().executemany(stmt2, sequence_of_parameters1)
		print(results)
	except Exception as e:
		print(e)
		failed = True
	finally:
		# con.close()
		engine.dispose()
	if not failed:
		response = {"success": True}
	else:
		response = {"success": False}
	return jsonify(response)
@app.errorhandler(400)
def unprocessable(error):
    return jsonify({
                    "success": False, 
                    "error": 400,
                    "message": "badrequest"
                    }), 400
@app.errorhandler(500)
def unprocessable(error):
    return jsonify({
                    "success": False, 
                    "error": 500,
                    "message": "internalservererror"
                    }), 500
if __name__ == '__main__':
    app.run()