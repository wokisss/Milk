from sqlalchemy.orm import Session
from sqlalchemy import func, Float
from datetime import datetime
import models, schemas
from typing import Optional

def get_stats(db: Session):
    """从数据库计算统计数据"""
    
    # 获取当前日期，并格式化为 "YYYY.M.D"
    today_str = datetime.now().strftime("%Y.%-m.%-d")

    # 计算总收购量
    # 注意：weight 存储为 "10kg" 格式的字符串，需要先去除 "kg" 并转换为浮点数
    total_weight_query = db.query(func.sum(func.cast(func.replace(models.Acquisition.weight, 'kg', ''), Float)))
    total_weight_result = total_weight_query.scalar()
    
    # 计算当日收购量
    daily_weight_query = db.query(func.sum(func.cast(func.replace(models.Acquisition.weight, 'kg', ''), Float))).filter(models.Acquisition.date == today_str)
    daily_weight_result = daily_weight_query.scalar()

    # 准备返回的统计数据
    return {
        "date": today_str,
        "daily_weight": f"{daily_weight_result or 0}kg",
        "total_weight": f"{total_weight_result or 0}kg"
    }

# --- Herdsman CRUD ---

def get_herdsman(db: Session, herdsman_id: int):
    """通过 ID 获取单个牧民"""
    return db.query(models.Herdsman).filter(models.Herdsman.id == herdsman_id).first()

def get_herdsman_by_id_card(db: Session, id_card: str):
    """通过身份证号获取单个牧民"""
    return db.query(models.Herdsman).filter(models.Herdsman.id_card == id_card).first()

def get_herdsmen(db: Session, skip: int = 0, limit: int = 100, search: Optional[str] = None):
    """
    获取牧民列表
    - 支持分页 (skip, limit)
    - 支持模糊搜索 (search on name or id_card)
    """
    query = db.query(models.Herdsman)
    
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (models.Herdsman.name.ilike(search_term)) | 
            (models.Herdsman.id_card.ilike(search_term))
        )
        
    return query.offset(skip).limit(limit).all()

def create_herdsman(db: Session, herdsman: schemas.HerdsmanCreate):
    """创建一个新的牧民"""
    db_herdsman = models.Herdsman(**herdsman.dict())
    db.add(db_herdsman)
    db.commit()
    db.refresh(db_herdsman)
    return db_herdsman

def update_herdsman(db: Session, herdsman_id: int, herdsman_data: schemas.HerdsmanUpdate):
    """更新一个已存在的牧民"""
    db_herdsman = get_herdsman(db, herdsman_id)
    if db_herdsman:
        # 将 Pydantic 模型转换为字典
        update_data = herdsman_data.dict(exclude_unset=True)
        # 遍历字典的键值对，更新数据库对象的属性
        for key, value in update_data.items():
            setattr(db_herdsman, key, value)
        
        db.commit()
        db.refresh(db_herdsman)
        
    return db_herdsman


def delete_herdsman(db: Session, herdsman_id: int):
    """删除一个牧民"""
    db_herdsman = get_herdsman(db, herdsman_id)
    if db_herdsman:
        db.delete(db_herdsman)
        db.commit()
    return db_herdsman

# --- Announcement CRUD ---

def get_announcement(db: Session, announcement_id: int):
    """通过 ID 获取单个公告"""
    return db.query(models.Announcement).filter(models.Announcement.id == announcement_id).first()

def get_announcements(db: Session, skip: int = 0, limit: int = 100):
    """获取公告列表"""
    return db.query(models.Announcement).offset(skip).limit(limit).all()

def create_announcement(db: Session, announcement: schemas.AnnouncementCreate):
    """创建一个新的公告"""
    db_announcement = models.Announcement(**announcement.dict())
    db.add(db_announcement)
    db.commit()
    db.refresh(db_announcement)
    return db_announcement

def update_announcement(db: Session, announcement_id: int, announcement_data: schemas.AnnouncementUpdate):
    """更新一个已存在的公告"""
    db_announcement = get_announcement(db, announcement_id)
    if db_announcement:
        update_data = announcement_data.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_announcement, key, value)
        
        db.commit()
        db.refresh(db_announcement)
        
    return db_announcement

def delete_announcement(db: Session, announcement_id: int):
    """删除一个公告"""
    db_announcement = get_announcement(db, announcement_id)
    if db_announcement:
        db.delete(db_announcement)
        db.commit()
    return db_announcement

# --- Acquisition CRUD ---

def get_acquisition(db: Session, acquisition_id: int):
    """通过 ID 获取单个收购记录"""
    return db.query(models.Acquisition).filter(models.Acquisition.id == acquisition_id).first()

def get_acquisitions(db: Session, skip: int = 0, limit: int = 100):
    """获取收购记录列表"""
    return db.query(models.Acquisition).offset(skip).limit(limit).all()

def create_acquisition(db: Session, acquisition: schemas.AcquisitionCreate):
    """创建一个新的收购记录"""
    acquisition_data = acquisition.dict()
    weight_str = acquisition_data.get("weight", "0kg").replace('kg', '')
    weight_float = float(weight_str)
    price = acquisition_data.get("price", 0)
    acquisition_data["total_price"] = weight_float * price
    
    db_acquisition = models.Acquisition(**acquisition_data)
    db.add(db_acquisition)
    db.commit()
    db.refresh(db_acquisition)
    return db_acquisition

def update_acquisition(db: Session, acquisition_id: int, acquisition_data: schemas.AcquisitionUpdate):
    """更新一个已存在的收购记录"""
    db_acquisition = get_acquisition(db, acquisition_id)
    if db_acquisition:
        update_data = acquisition_data.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_acquisition, key, value)
        
        db.commit()
        db.refresh(db_acquisition)
        
    return db_acquisition

def delete_acquisition(db: Session, acquisition_id: int):
    """删除一个收购记录"""
    db_acquisition = get_acquisition(db, acquisition_id)
    if db_acquisition:
        db.delete(db_acquisition)
        db.commit()
    return db_acquisition


from sqlalchemy import func
from datetime import datetime

def get_stats(db: Session):
    """从数据库计算统计数据"""
    
    # 获取当前日期，并格式化为 "YYYY.M.D"
    today_str = datetime.now().strftime("%Y.%-m.%-d")

    # 计算总收购量
    # 注意：weight 存储为 "10kg" 格式的字符串，需要先去除 "kg" 并转换为浮点数
    total_weight_query = db.query(func.sum(func.cast(func.replace(models.Acquisition.weight, 'kg', ''), Float)))
    total_weight_result = total_weight_query.scalar()
    
    # 计算当日收购量
    daily_weight_query = db.query(func.sum(func.cast(func.replace(models.Acquisition.weight, 'kg', ''), Float))).filter(models.Acquisition.date == today_str)
    daily_weight_result = daily_weight_query.scalar()

    # 准备返回的统计数据
    return {
        "date": today_str,
        "daily_weight": f"{daily_weight_result or 0}kg",
        "total_weight": f"{total_weight_result or 0}kg"
    }


# --- Profile CRUD ---

def get_profile(db: Session, username: str):
    """通过用户名获取个人资料"""
    return db.query(models.Profile).filter(models.Profile.username == username).first()

def create_profile(db: Session, profile: schemas.ProfileCreate):
    """创建一个新的个人资料"""
    profile_data = profile.dict()
    profile_data["permissions"] = ",".join(profile_data["permissions"])
    db_profile = models.Profile(**profile_data)
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile

def update_profile(db: Session, username: str, profile_data: schemas.ProfileUpdate):
    """更新一个已存在的个人资料"""
    db_profile = get_profile(db, username)
    if db_profile:
        update_data = profile_data.dict(exclude_unset=True)
        if "permissions" in update_data:
            update_data["permissions"] = ",".join(update_data["permissions"])
        for key, value in update_data.items():
            setattr(db_profile, key, value)
        
        db.commit()
        db.refresh(db_profile)
        
    return db_profile

