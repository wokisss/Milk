from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timezone

db = SQLAlchemy()

# 用户模型，仅用于Project 1内部认证，保持不变
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default='user')
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# 牧民模型，匹配Project 2的 'herdsmen' 表
class Herdsman(db.Model):
    __tablename__ = 'herdsmen'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    id_card = db.Column(db.String(30), unique=True, nullable=False)
    phone = db.Column(db.String(30))
    address = db.Column(db.String(256))
    bank_card = db.Column(db.String(30))
    milk_station_id = db.Column(db.Integer)

    acquisitions = db.relationship('Acquisition', back_populates='herdsman', cascade='all, delete-orphan')

# 收购模型，匹配Project 2的 'acquisitions' 表
class Acquisition(db.Model):
    __tablename__ = 'acquisitions'
    id = db.Column(db.Integer, primary_key=True)
    herdsman_id = db.Column(db.Integer, db.ForeignKey('herdsmen.id'), nullable=False)
    initial_id = db.Column(db.String(8), nullable=False, unique=True)
    weight = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    date = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(256))

    herdsman = db.relationship('Herdsman', back_populates='acquisitions')
