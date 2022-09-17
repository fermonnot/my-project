from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Products (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(120), unique=True, nullable=False)
    laboratory = db.Column(db.String(120), unique=False, nullable=False)
    price = db.Column(db.Float, unique=False, nullable=False)
    # url_image = db.Column(db.String(50), unique=False, nullable=False) ----- para que funcione debo borrar todos los datos 
    # de la base de datos

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "laboratory":self.laboratory,
            "price": self.price
        }
    