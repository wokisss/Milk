# --- 0. 导入依赖 ---
from typing import List, Optional

# 导入 FastAPI 框架和相关工具
from fastapi import FastAPI, Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session

# 导入 CORS 中间件，用于处理跨域请求
from starlette.middleware.cors import CORSMiddleware
import uvicorn

# 导入本地模块
import crud, models, schemas
from database import SessionLocal, engine


# --- 1. 初始化 FastAPI 应用 ---

# 在应用启动时创建数据库表
models.Base.metadata.create_all(bind=engine)

app = FastAPI()
router = APIRouter()


# --- 2. 配置跨域资源共享 (CORS) ---
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- 3. 数据库会话依赖 ---
def get_db():
    """
    FastAPI 依赖项：为每个请求提供一个数据库会话。
    - 创建一个 SessionLocal 实例。
    - 使用 yield 将会话提供给路径操作函数。
    - 在请求处理完成后，无论成功或失败，都确保关闭会话。
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- 4. API 接口实现 ---

@app.get("/")
def read_root():
    """根路由，可用于健康检查或返回欢迎信息"""
    return {"message": "欢迎使用高原智慧牧业管理系统后端 API"}

# --- Herdsmen Endpoints (已迁移到数据库) ---

@router.post("/herdsmen/", response_model=schemas.Herdsman, status_code=201)
def create_herdsman(herdsman: schemas.HerdsmanCreate, db: Session = Depends(get_db)):
    """
    创建一个新的牧民记录并存入数据库。
    - 检查该身份证号是否已存在。
    """
    db_herdsman = crud.get_herdsman_by_id_card(db, id_card=herdsman.id_card)
    if db_herdsman:
        raise HTTPException(status_code=400, detail="该身份证号已被注册")
    return crud.create_herdsman(db=db, herdsman=herdsman)


@router.get("/herdsmen/", response_model=List[schemas.Herdsman])
def read_herdsmen(search: Optional[str] = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    从数据库获取牧民列表。
    - 支持通过 `search` 查询参数进行姓名或身份证号的模糊匹配。
    - 支持分页 (skip, limit)。
    """
    herdsmen = crud.get_herdsmen(db, skip=skip, limit=limit, search=search)
    return herdsmen


@router.get("/herdsmen/{herdsman_id}", response_model=schemas.Herdsman)
def read_herdsman(herdsman_id: int, db: Session = Depends(get_db)):
    """根据 ID 从数据库获取单个牧民信息"""
    db_herdsman = crud.get_herdsman(db, herdsman_id=herdsman_id)
    if db_herdsman is None:
        raise HTTPException(status_code=404, detail=f"未找到 ID 为 {herdsman_id} 的牧民")
    return db_herdsman


@router.put("/herdsmen/{herdsman_id}", response_model=schemas.Herdsman)
def update_herdsman(herdsman_id: int, herdsman: schemas.HerdsmanUpdate, db: Session = Depends(get_db)):
    """根据 ID 更新一个已存在的牧民信息"""
    db_herdsman = crud.update_herdsman(db, herdsman_id=herdsman_id, herdsman_data=herdsman)
    if db_herdsman is None:
        raise HTTPException(status_code=404, detail=f"未找到 ID 为 {herdsman_id} 的牧民")
    return db_herdsman


@router.delete("/herdsmen/{herdsman_id}", response_model=schemas.Herdsman)
def delete_herdsman(herdsman_id: int, db: Session = Depends(get_db)):
    """根据 ID 删除指定的牧民"""
    db_herdsman = crud.delete_herdsman(db, herdsman_id=herdsman_id)
    if db_herdsman is None:
        raise HTTPException(status_code=404, detail=f"未找到 ID 为 {herdsman_id} 的牧民")
    return db_herdsman


# --- Mock Endpoints (待迁移) ---

# 注意：以下接口仍使用模拟数据，将在后续步骤中迁移到数据库

@router.post("/login")
def login(login_request: schemas.LoginRequest):
    """登录认证接口 (模拟)"""
    if login_request.username and login_request.password:
        return {"token": "mock-token", "username": login_request.username}
    raise HTTPException(status_code=401, detail="用户名或密码不能为空")

@router.get("/stats", response_model=schemas.Stats)
def get_stats():
    """获取当前的统计数据 (模拟)"""
    return {
        "date": "2025.11.1",
        "daily_weight": "50kg",
        "total_weight": "250kg"
    }

# --- Profile Endpoints ---
@router.get("/profile/{username}", response_model=schemas.Profile)
def get_profile(username: str, db: Session = Depends(get_db)):
    """获取用户个人资料"""
    db_profile = crud.get_profile(db, username=username)
    if db_profile is None:
        raise HTTPException(status_code=404, detail="个人资料未找到")
    db_profile.permissions = db_profile.permissions.split(",")
    return db_profile

@router.put("/profile/{username}", response_model=schemas.Profile)
def update_profile(username: str, profile: schemas.ProfileUpdate, db: Session = Depends(get_db)):
    """更新用户个人资料"""
    db_profile = crud.update_profile(db, username=username, profile_data=profile)
    if db_profile is None:
        raise HTTPException(status_code=404, detail="个人资料未找到")
    db_profile.permissions = db_profile.permissions.split(",")
    return db_profile

@router.post("/profile/", response_model=schemas.Profile, status_code=201)
def create_profile(profile: schemas.ProfileCreate, db: Session = Depends(get_db)):
    """创建一个新的个人资料"""
    db_profile = crud.get_profile(db, username=profile.username)
    if db_profile:
        raise HTTPException(status_code=400, detail="该用户名的个人资料已存在")
    created_profile = crud.create_profile(db=db, profile=profile)
    created_profile.permissions = created_profile.permissions.split(",")
    return created_profile


# --- Acquisition Endpoints ---
@router.post("/acquisitions/", response_model=schemas.Acquisition, status_code=201)
def create_acquisition(acquisition: schemas.AcquisitionCreate, db: Session = Depends(get_db)):
    """创建一个新的收购记录"""
    return crud.create_acquisition(db=db, acquisition=acquisition)

@router.get("/acquisitions/", response_model=List[schemas.Acquisition])
def read_acquisitions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """获取收购记录列表"""
    acquisitions = crud.get_acquisitions(db, skip=skip, limit=limit)
    return acquisitions

@router.get("/acquisitions/{acquisition_id}", response_model=schemas.Acquisition)
def read_acquisition(acquisition_id: int, db: Session = Depends(get_db)):
    """获取单个收购记录"""
    db_acquisition = crud.get_acquisition(db, acquisition_id=acquisition_id)
    if db_acquisition is None:
        raise HTTPException(status_code=404, detail=f"未找到 ID 为 {acquisition_id} 的收购记录")
    return db_acquisition

@router.put("/acquisitions/{acquisition_id}", response_model=schemas.Acquisition)
def update_acquisition(acquisition_id: int, acquisition: schemas.AcquisitionUpdate, db: Session = Depends(get_db)):
    """更新一个收购记录"""
    db_acquisition = crud.update_acquisition(db, acquisition_id=acquisition_id, acquisition_data=acquisition)
    if db_acquisition is None:
        raise HTTPException(status_code=404, detail=f"未找到 ID 为 {acquisition_id} 的收购记录")
    return db_acquisition

@router.delete("/acquisitions/{acquisition_id}", response_model=schemas.Acquisition)
def delete_acquisition(acquisition_id: int, db: Session = Depends(get_db)):
    """删除一个收购记录"""
    db_acquisition = crud.delete_acquisition(db, acquisition_id=acquisition_id)
    if db_acquisition is None:
        raise HTTPException(status_code=404, detail=f"未找到 ID 为 {acquisition_id} 的收购记录")
    return db_acquisition


# --- Announcement Endpoints ---
@router.post("/announcements/", response_model=schemas.Announcement, status_code=201)
def create_announcement(announcement: schemas.AnnouncementCreate, db: Session = Depends(get_db)):
    """创建一个新的公告"""
    return crud.create_announcement(db=db, announcement=announcement)

@router.get("/announcements/", response_model=List[schemas.Announcement])
def read_announcements(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """获取公告列表"""
    announcements = crud.get_announcements(db, skip=skip, limit=limit)
    return announcements

@router.get("/announcements/{announcement_id}", response_model=schemas.Announcement)
def read_announcement(announcement_id: int, db: Session = Depends(get_db)):
    """获取单个公告"""
    db_announcement = crud.get_announcement(db, announcement_id=announcement_id)
    if db_announcement is None:
        raise HTTPException(status_code=404, detail=f"未找到 ID 为 {announcement_id} 的公告")
    return db_announcement

@router.put("/announcements/{announcement_id}", response_model=schemas.Announcement)
def update_announcement(announcement_id: int, announcement: schemas.AnnouncementUpdate, db: Session = Depends(get_db)):
    """更新一个公告"""
    db_announcement = crud.update_announcement(db, announcement_id=announcement_id, announcement_data=announcement)
    if db_announcement is None:
        raise HTTPException(status_code=404, detail=f"未找到 ID 为 {announcement_id} 的公告")
    return db_announcement

@router.delete("/announcements/{announcement_id}", response_model=schemas.Announcement)
def delete_announcement(announcement_id: int, db: Session = Depends(get_db)):
    """删除一个公告"""
    db_announcement = crud.delete_announcement(db, announcement_id=announcement_id)
    if db_announcement is None:
        raise HTTPException(status_code=404, detail=f"未找到 ID 为 {announcement_id} 的公告")
    return db_announcement

app.include_router(router, prefix="/api")

# --- 5. 应用启动入口 ---
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
