from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# The User model remains unchanged as it's specific to project1's authentication
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100))
    role = db.Column(db.String(20), default='user')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'role': self.role
        }

# Re-defined Farmer model as Herdsman, mapping to the 'herdsmen' table of project2
class Herdsman(db.Model):
    __tablename__ = "herdsmen"

    id = db.Column(db.Integer, primary_key=True, index=True)
    id_card = db.Column(db.String(255), unique=True, index=True, nullable=False)
    name = db.Column(db.String(255), index=True, nullable=False)
    phone = db.Column(db.String(255), nullable=True)
    address = db.Column(db.String(255), nullable=True)
    bank_card = db.Column(db.String(255), nullable=True)
    milk_station_id = db.Column(db.Integer, nullable=True)
    
    # Relationship to acquisitions
    acquisitions = db.relationship('Acquisition', backref='herdsman', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'id_card': self.id_card,
            'name': self.name,
            'phone': self.phone,
            'address': self.address,
            'bank_card': self.bank_card,
            'milk_station_id': self.milk_station_id
        }

# Re-defined Purchase model as Acquisition, mapping to the 'acquisitions' table of project2
class Acquisition(db.Model):
    __tablename__ = "acquisitions"

    id = db.Column(db.Integer, primary_key=True, index=True)
    herdsman_id = db.Column(db.Integer, db.ForeignKey("herdsmen.id"))
    initial_id = db.Column(db.String(255), nullable=False)
    weight = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    date = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'herdsman_id': self.herdsman_id,
            'herdsman_name': self.herdsman.name if self.herdsman else None,
            'initial_id': self.initial_id,
            'weight': self.weight,
            'price': self.price,
            'total_price': self.total_price,
            'date': self.date,
            'location': self.location
        }