import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'milk-purchase-secret-key-2024'
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlclient://root:123456@localhost:3306/smart_milk_chain'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-key-2024'



