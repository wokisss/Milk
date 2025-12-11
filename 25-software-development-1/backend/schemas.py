# backend/schemas.py
from pydantic import BaseModel
from typing import List, Optional

# --- Herdsman Schemas ---

class HerdsmanBase(BaseModel):
    """基础模型，包含所有牧民共有的字段"""
    id_card: str
    name: str
    contact: str
    address: str

class HerdsmanCreate(HerdsmanBase):
    """创建牧民时使用的模型 (继承自 Base)"""
    pass

class HerdsmanUpdate(HerdsmanBase):
    """更新牧民时使用的模型 (继承自 Base)"""
    pass

class Herdsman(HerdsmanBase):
    """从数据库读取并返回给客户端的模型"""
    id: int

    class Config:
        # orm_mode = True 告诉 Pydantic 模型从 ORM 对象中读取数据
        # 即使它不是一个字典，也可以直接通过 orm_model.id 的方式访问
        orm_mode = True

# --- Announcement Schemas ---
class AnnouncementBase(BaseModel):
    """公告的基础模型"""
    title: str
    content: str
    date: str

class AnnouncementCreate(AnnouncementBase):
    """创建公告时使用的模型"""
    pass

class AnnouncementUpdate(AnnouncementBase):
    """更新公告时使用的模型"""
    pass

class Announcement(AnnouncementBase):
    """从数据库读取并返回给客户端的模型"""
    id: int
    class Config:
        orm_mode = True

# --- Acquisition Schemas ---
class AcquisitionBase(BaseModel):
    """收购记录的基础模型"""
    herdsman_id: int
    initial_id: str
    weight: str
    price: float
    total_price: float
    date: str
    location: str

class AcquisitionCreate(AcquisitionBase):
    """创建收购记录时使用的模型"""
    pass

class AcquisitionUpdate(AcquisitionBase):
    """更新收购记录时使用的模型"""
    pass

class Acquisition(AcquisitionBase):
    """从数据库读取并返回给客户端的模型"""
    id: int
    class Config:
        orm_mode = True

# --- Profile Schemas ---
class ProfileBase(BaseModel):
    """个人资料的基础模型"""
    username: str
    email: str
    registration_date: str
    permissions: List[str]

class ProfileCreate(ProfileBase):
    """创建个人资料时使用的模型"""
    pass

class ProfileUpdate(ProfileBase):
    """更新个人资料时使用的模型"""
    pass

class Profile(ProfileBase):
    """从数据库读取并返回给客户端的模型"""
    id: int
    class Config:
        orm_mode = True

# --- Login Schemas ---

class LoginRequest(BaseModel):
    """登录接口的请求体模型"""
    username: str
    password: str

# --- 其他模型 (暂未实现数据库逻辑) ---

class Stats(BaseModel):
    date: str
    daily_weight: str
    total_weight: str
