# backend/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 注释掉原来的 SQLite
# SQLALCHEMY_DATABASE_URL = "sqlite:///./milk_regulation.db"

# 换成 MySQL (格式: mysql+pymysql://用户名:密码@地址:端口/数据库名)
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:123456@localhost:3306/smart_milk_chain"

engine = create_engine(
    DATABASE_URL, 
    # connect_args 是 SQLite 特有的配置，用于允许多线程访问
    # FastAPI 是异步框架，可能在后台使用多线程处理请求
    connect_args={"check_same_thread": False}
)

# SessionLocal 类将是数据库会话的工厂
# 每次数据库操作前，我们都会创建这个类的一个实例
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base 是所有 ORM 模型的基类
# 我们创建的每个数据库模型 (表) 都将继承这个类
Base = declarative_base()
