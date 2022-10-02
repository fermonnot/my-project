"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Products
from api.utils import generate_sitemap, APIException

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
     

    

