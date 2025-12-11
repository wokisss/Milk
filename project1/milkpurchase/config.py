import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key')
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:123456@localhost:3306/smart_milk_chain"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
