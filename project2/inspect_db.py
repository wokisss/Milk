
import os
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.orm.exc import NoResultFound

# --- Configuration ---
# Build the path to the database file relative to this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'milk_regulation.db')
DATABASE_URL = f"sqlite:///{DB_PATH}"

# --- SQLAlchemy Models ---
# We redefine the models here to make the script self-contained.
Base = declarative_base()

class Acquisition(Base):
    __tablename__ = "acquisitions"
    id = Column(Integer, primary_key=True)
    herdsman_id = Column(Integer)
    initial_id = Column(String)
    weight = Column(String) # Defined as String in the model
    price = Column(Float)
    total_price = Column(Float)
    date = Column(String)
    location = Column(String)

# --- Inspection Logic ---
def inspect_acquisitions_data():
    """
    Connects to the database, iterates through all acquisitions,
    and checks for data conversion errors, especially in the 'weight' column.
    """
    if not os.path.exists(DB_PATH):
        print(f"错误：数据库文件未找到，路径：{DB_PATH}")
        return

    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = SessionLocal()

    print(f"正在检查数据库: {DB_PATH}")
    print("正在扫描 'acquisitions' 表中的 'weight' 字段...")
    
    invalid_rows = []
    try:
        acquisitions = session.query(Acquisition).all()
        
        if not acquisitions:
            print("表 'acquisitions' 中没有数据。")
            return

        for acq in acquisitions:
            # Try to convert weight to a float. If it fails, it's bad data.
            try:
                float(acq.weight)
            except (ValueError, TypeError):
                invalid_rows.append({
                    "id": acq.id,
                    "weight": acq.weight,
                    "reason": f"无法将 weight ('{acq.weight}') 转换为数字。"
                })

    finally:
        session.close()

    # --- Report Results ---
    if invalid_rows:
        print("\n[!] 发现有问题的行：")
        for row in invalid_rows:
            print(f"  - 行 ID: {row['id']}, Weight 值: \"{row['weight']}\". 原因: {row['reason']}")
        print("\n请修复以上数据或将其删除，以解决程序错误。")
    else:
        print("\n[✓] 未在 'weight' 字段中发现明显的类型转换问题。")
        print("这表明问题可能更复杂，例如与 'price' 或 'total_price' 字段相关。")

if __name__ == "__main__":
    inspect_acquisitions_data()
