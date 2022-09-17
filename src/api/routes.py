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

