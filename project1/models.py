from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash
import uuid

db = SQLAlchemy()

# 用户表，仅用于 Project 1 内部登录，保持不变
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

# Farmer 模型修改为匹配 Project 2 的 'herdsmen' 表
class Farmer(db.Model):
    __tablename__ = 'herdsmen'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    id_card = db.Column(db.String(30), unique=True, nullable=False)
    phone = db.Column(db.String(30))
    address = db.Column(db.String(256))
    bank_card = db.Column(db.String(30))
    milk_station_id = db.Column(db.Integer) # 类型改为 Integer

    # 关系定义，确保在 app 中可以通过 farmer.purchases 访问收购记录
    purchases = db.relationship('Purchase', back_populates='farmer', foreign_keys='Purchase.herdsman_id')

# Purchase 模型修改为匹配 Project 2 的 'acquisitions' 表
class Purchase(db.Model):
    __tablename__ = 'acquisitions'
    id = db.Column(db.Integer, primary_key=True)
    herdsman_id = db.Column(db.Integer, db.ForeignKey('herdsmen.id'), nullable=False)
    initial_id = db.Column(db.String(50), nullable=False, unique=True, default=lambda: str(uuid.uuid4()))
    weight = db.Column(db.String(50), nullable=False) # 数量 -> weight, String
    price = db.Column(db.Float, nullable=False) # 单价 -> price, Float
    total_price = db.Column(db.Float, nullable=False) # 总价
    date = db.Column(db.String(50), nullable=False, default=lambda: datetime.now().strftime('%Y-%m-%d %H:%M:%S')) # 时间 -> date, String
    location = db.Column(db.String(256))

    # 关系定义
    farmer = db.relationship('Farmer', back_populates='purchases', foreign_keys=[herdsman_id])