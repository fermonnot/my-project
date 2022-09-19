"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db,User
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
@api.route('/users/<int:user_id>', methods=['GET'])
def handle_users(user_id = None):
    if request.method == 'GET':
        if user_id is None:
            users = User()
            users = users.query.all()

            return jsonify(list(map(lambda item: item.serialize(), users))) , 200
        else:
            user = User()
            user = user.query.get(user_id)
            if user:
                return jsonify(user.serialize())
            
        return jsonify({"message":"not found"}), 404
 

@api.route('/user', methods=['POST'])   
def add_user():
    if request.method == 'POST':
        body = request.json
        email = body.get('email',None)
        password = body.get('password',None)
        rif = body.get ('rif',None)
        sicm = body.get('sicm',None )
        
        if email is None or password is None or rif is None or sicm is None:
            return jsonify('Por favor, complete los campos correctamente'),400
        else:
            print('guardar')  
            request_user= User(email=email,password=password,rif=rif,sicm=sicm)
            db.session.add(request_user)

            try:
                db.session.commit()
                return jsonify ('good'),201
            except Exception as error:
                db.session.rollback()
                return jsonify('intenta de nuevo'),500      
    return jsonify(),201 
