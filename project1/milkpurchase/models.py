from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Farmer(db.Model):
    __tablename__ = 'herdsmen'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    id_card = db.Column(db.String(30), unique=True, nullable=False)
    bank_card = db.Column(db.String(30))  # 银行卡号
    address = db.Column(db.String(256))
    phone = db.Column(db.String(30))
    milk_station_id = db.Column(db.String(50))

class Purchase(db.Model):
    __tablename__ = 'acquisitions'
    id = db.Column(db.Integer, primary_key=True)
    herdsman_id = db.Column(db.Integer, db.ForeignKey('herdsmen.id'), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    weight = db.Column(db.Numeric(12, 3), nullable=False)
    total_price = db.Column(db.Numeric(12, 2), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    location = db.Column(db.String(256))

    herdsman = db.relationship('Farmer', backref='purchases')
