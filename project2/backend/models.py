# backend/models.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Herdsman(Base):
    __tablename__ = "herdsmen"

    id = Column(Integer, primary_key=True, index=True)
    id_card = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, index=True, nullable=False)
    contact = Column(String, nullable=False)
    address = Column(String, nullable=False)
    # 添加在 Herdsman 类中
    bank_card = Column(String, nullable=True)
    address = Column(String, nullable=True)
    milk_station_id = Column(Integer, nullable=True)

class Announcement(Base):
    __tablename__ = "announcements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    content = Column(String, nullable=False)
    date = Column(String, nullable=False)

class Acquisition(Base):
    __tablename__ = "acquisitions"

    id = Column(Integer, primary_key=True, index=True)
    herdsman_id = Column(Integer, ForeignKey("herdsmen.id"))
    initial_id = Column(String, nullable=False)
    weight = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)
    date = Column(String, nullable=False)
    location = Column(String, nullable=False)

    herdsman = relationship("Herdsman")

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    registration_date = Column(String, nullable=False)
    permissions = Column(String, nullable=False)

