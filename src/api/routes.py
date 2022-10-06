"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db,User, Products, OrdenCo
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token



api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/products', methods=['GET'])
@api.route('/products/<int:product_id>', methods=['GET'])
def handle_products(product_id = None):

    if request.method == 'GET':
        if product_id is None:
            products = Products()
            products = products.query.all()
            if products is None:
                return jsonify ({"Message":"empty list"})
            else:
                return jsonify(list (map(lambda item: item.serialize(), products))), 200  
        else: 
           
             # primero se coloca el valor de mi tabla en model(id) y luego el establecido aca en el decorador(product_id)
            product = Products.query.filter_by(id=product_id).first()    
                     
            return jsonify(product.serialize()), 200 
            

        return jsonify ({"message":"Not Found"}), 404
    

@api.route('/products', methods=['POST'])
def add_products():
    if request.method == 'POST':
        body = request.json
        if body.get("description") is None:
            return jsonify({"message":"error propertie bad "}), 400

        new_product = Products(description =body['description'], laboratory=body['laboratory'],price=body['price'], quantity=body['quantity'])
        db.session.add(new_product)

        try :
            db.session.commit()
            return jsonify(new_product.serialize()),201
        except Exception as error:
            print(error.args)
            db.session.rollback()
            return jsonify({"message":f"Error {error.args}"}),500


# ACTUALIZAR

@api.route('/products', methods=['PUT'])
@api.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id=None):
    if request.method == 'PUT':
        body = request.json
        
        if product_id is None:
            return jsonify({"message":"Bad request"}), 400

        if product_id is not None:
            update_product = Products.query.get(product_id)
            if update_product is None:
                return jsonify({"message":"Not found"}), 404
            else:
                update_product.description = body["description"]
                update_product.laboratory = body["laboratory"]
                update_product.price = body["price"]
                update_product.quantity = body["quantity"]

                try:
                    db.session.commit()
                    return jsonify(update_product.serialize()), 201
                except Exception as error:
                    print(error.args)
                    return jsonify({"message":f"Error {error.args}"}),500

        return jsonify([]), 200
    return jsonify([]), 405
        

# DELETE

@api.route('/products', methods=['DELETE'])
@api.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id=None):
    if request.method == 'DELETE':
        if product_id is None:
            return jsonify({"message":"Not found"}), 400

        if product_id is not None:
            delete_product = Products.query.get(product_id)
            
            if delete_product is None:
                return jsonify({"message":"Not found"}), 404
            else:
                db.session.delete(delete_product)

                try:
                    db.session.commit()
                    return jsonify([]), 204
                except Exception as error:
                    print(error.args)
                    db.session.rollback()
                    return jsonify({"message":f"Error {error.args}"}),500
        
    return jsonify([]), 405
     

    




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
 
def set_password(password):
    return generate_password_hash(password)

def check_password(hash_pasword,password):
    return check_password_hash(hash_pasword,password)


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
            password= set_password(password)
            print('guardar',password)  
            request_user= User(email=email,password=password,rif=rif,sicm=sicm)
            db.session.add(request_user)

            try:
                db.session.commit()
                return jsonify ('good'),201
            except Exception as error:
                db.session.rollback()
                return jsonify(error.args),500      
    return jsonify(),201 


@api.route('/login',methods=['POST'])
def login():
    if request.method == 'POST':
        body = request.json
        email = body.get('email',None)
        password = body.get('password',None)


        login_user = User.query.filter_by (email=email).one_or_none()
        if login_user:
            if check_password(login_user.password,password):
                acess = create_access_token(identity=login_user.id)
            return jsonify({'token':acess}),200

        else:
            return jsonify ('acceso denegado'),400 

    return jsonify ('bienvenido'),201



@api.route('/ordenco',methods=['GET'])
def get_ordenco():
    if request.method =='GET':
        user_id= 1

        ordenco_user = OrdenCo.query.filter_by(user_id=user_id, status="processing").all()
        print(ordenco_user)
        # if ordenco_user:
        #     if Status == and user_id("user.id") > 0:

                
        #     return jsonify({'token':acess}),200

        # else:
        #     return jsonify ('acceso denegado'),400 
        return jsonify(list(map(lambda item:item.serialize(),ordenco_user))), 200






@api.route('/ordenco', methods=['POST'])
def add_ordenco():
    if request.method == 'POST':
        body = request.json  
        quantity = body.get('quantity',None)
        amount = body.get ('amount',None)
        user_id = body.get('user.id',None )
        product_id = body.get('products.id', None)
        
        if quantity is None:
            return jsonify('Por favor, complete los campos correctamente'),400
            return jsonify({"message":"error propertie bad "}), 400

        new_orden = OrdenCo( quantity=body['quantity'],amount=body['amount'], user_id=body['user.id'], product_id=body['products.id'])
        db.session.add(new_orden)

        try :
            db.session.commit()
            return jsonify(new_orden.serialize()),201
        except Exception as error:
            print(error.args)
            db.session.rollback()
            return jsonify({"message":f"Error {error.args}"}),500
