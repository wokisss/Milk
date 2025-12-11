# 高原智慧牧业管理系统

这是一个前后端分离的“高原智慧牧业管理系统”全栈项目。项目后端采用 FastAPI + SQLAlchemy + SQLite 实现，为核心业务功能提供持久化数据存储；前端则由 React + TypeScript 构建，提供了一个现代化、响应式的用户界面。

## ✨ 核心功能

本项目已经实现了四大核心模块的**全功能持久化管理**，所有数据均存储于 SQLite 数据库中，并提供完整的 CRUD（创建、读取、更新、删除）操作接口。

- **牧民信息管理 (Herdsman)**:
    - 对牧民的基础信息（姓名、身份证、联系方式等）进行全生命周期管理。
    - 支持按姓名或身份证号进行**模糊搜索**和**分页**查询。
- **公告信息管理 (Announcement)**:
    - 实现系统公告的发布、更新和删除，支持分页展示。
- **收购记录管理 (Acquisition)**:
    - 记录每次收购的详细信息，包括产品、数量、金额等，支持分页展示。
- **用户资料管理 (Profile)**:
    - 管理用户的个人信息及其权限。

此外，系统还包含基于 Token 的前端认证机制，未登录的用户将被自动重定向到登录页。

## 🛠️ 技术栈

| 类别     | 技术                               |
| :------- | :--------------------------------- |
| **前端** | `React 18` `TypeScript` `Vite`     |
|          | `React Router v6`                  |
|          | `Tailwind CSS` `React Context`     |
| **后端** | `Python 3` `FastAPI`               |
|          | `SQLAlchemy (ORM)` `Pydantic`      |
|          | `SQLite (数据库)`                  |
|          | `CORS 中间件`                      |

## 🚀 快速开始

本项目包含独立的前端和后端，需要分别启动。

### 1. 启动后端服务

后端服务基于 FastAPI，负责处理所有业务逻辑和数据库交互。

**重要提示**: 为了确保 Python 能够正确处理模块导入，请在 **项目根目录** (`milk-goverment-regulation-subsystem/`) 下执行启动命令，而不是在 `backend/` 目录中。

```bash
# 1. (推荐) 在项目根目录创建并激活 Python 虚拟环境
# Windows
python -m venv venv
.\\venv\\Scripts\\activate
# macOS / Linux
python3 -m venv venv
source venv/bin/activate

# 2. 安装后端所有依赖
pip install -r backend/requirements.txt

# 3. 从项目根目录启动 FastAPI 应用
#    uvicorn backend.main:app 告诉 uvicorn 运行 backend 包下的 main 模块中的 app
#    --reload 参数会使服务器在代码变更后自动重启
uvicorn backend.main:app --reload
```
启动后，FastAPI 服务器将运行在 `http://localhost:8000`，并在 `backend` 目录下创建 `milk_regulation.db` 数据库文件。

### 2. 启动前端应用

前端应用运行在 `http://localhost:5173` (Vite 默认端口)。

```bash
# 1. (在项目根目录) 安装 npm 依赖
npm install

# 2. 运行开发服务器
npm run dev
```
启动后，浏览器将自动打开并显示登录页面。

## 🔌 API 接口

所有接口均带有 `/api` 前缀。

### 数据实体接口 (Database-Backed)

#### 牧民管理 (Herdsmen)
- `POST /herdsmen/`: 创建一个新牧民。
- `GET /herdsmen/`: 获取牧民列表。
  - **查询参数**:
    - `search: Optional[str]`: 按姓名或身份证号进行模糊搜索。
    - `skip: int = 0`: 分页偏移量。
    - `limit: int = 100`: 每页数量。
- `GET /herdsmen/{id}`: 获取单个牧民的详细信息。
- `PUT /herdsmen/{id}`: 更新一个牧民的信息。
- `DELETE /herdsmen/{id}`: 删除一个牧民。

#### 公告管理 (Announcements)
- `POST /announcements/`: 创建一个新公告。
- `GET /announcements/`: 获取公告列表。
  - **查询参数**: `skip`, `limit`。
- `GET /announcements/{id}`: 获取单个公告的详细信息。
- `PUT /announcements/{id}`: 更新一个公告的信息。
- `DELETE /announcements/{id}`: 删除一个公告。

#### 收购记录管理 (Acquisitions)
- `POST /acquisitions/`: 创建一个新收购记录。
- `GET /acquisitions/`: 获取收购记录列表。
  - **查询参数**: `skip`, `limit`。
- `GET /acquisitions/{id}`: 获取单个收购记录的详细信息。
- `PUT /acquisitions/{id}`: 更新一个收购记录的信息。
- `DELETE /acquisitions/{id}`: 删除一个收购记录。

#### 个人资料管理 (Profile)
- `POST /profile/`: 创建一个新的个人资料。
- `GET /profile/{username}`: 获取指定用户的个人资料。
- `PUT /profile/{username}`: 更新指定用户的个人资料。

### 辅助及模拟接口 (Utility & Mock Endpoints)
- `GET /`: API 根路径，返回欢迎信息。
- `POST /login`: 用户登录 (模拟)。返回一个固定的 `mock-token`。
- `GET /stats`: 获取统计数据 (占位符)。当前返回 404 Not Found。
