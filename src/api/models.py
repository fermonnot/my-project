from flask_sqlalchemy import SQLAlchemy
from enum import Enum, unique

db = SQLAlchemy()


class Status(Enum):
    processing="processing",
    billed="billed"
    delivered="delivered",


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    rif = db.Column(db.String(11), unique=True, nullable=False)
    sicm = db.Column(db.Integer, unique=True)
    ordenco = db.relationship("OrdenCo", backref="user", uselist=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "rif": self.rif,
            "sicm": self.sicm,
            # do not serialize the password, its a security breach
        }

class Products (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(120), unique=True, nullable=False)
    laboratory = db.Column(db.String(120), unique=False, nullable=False)
    price = db.Column(db.Float, unique=False, nullable=False)
    quantity = db.Column(db.Integer, unique=False, nullable=False)
    ordenco = db.relationship("OrdenCo", backref="products", uselist=True)

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "laboratory":self.laboratory,
            "price": self.price,
            "quantity": self.quantity
        }


class OrdenCo (db.Model):
    id = db.Column(db.Integer, primary_key=True)  
    quantity = db.Column(db.Integer,nullable=False) 
    amount= db.Column(db.Integer, nullable=False)
    status = db.Column(db.Enum(Status), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    

    def serialize(self):
        product= Products.query.get(self.product_id)
        return {
            "id": self.id,
            "quantity": self.quantity,
            "status": self.status.value,
            "amount":self.amount,
            "product": product.serialize()     

        }


