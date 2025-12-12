# 鲜奶收购管理系统

一个基于 Vue 3 + Flask 的前后端分离鲜奶收购管理系统。

## 项目简介

本系统用于管理鲜奶收购业务，包括牧民信息管理、收购记录管理、统计分析等功能。

## 技术栈

### 前端
- **Vue 3** - 渐进式 JavaScript 框架
- **Vue Router** - 官方路由管理器
- **Element Plus** - 基于 Vue 3 的组件库
- **Axios** - HTTP 请求库
- **Vite** - 下一代前端构建工具

### 后端
- **Flask** - Python 轻量级 Web 框架
- **Flask-SQLAlchemy** - 数据库 ORM
- **Flask-CORS** - 跨域资源共享
- **Flask-JWT-Extended** - JWT 认证
- **SQLite** - 轻量级数据库

## 项目结构

```
milkpurchase/
├── backend/                # 后端目录
│   ├── app.py             # Flask 主应用
│   ├── config.py          # 配置文件
│   ├── models.py          # 数据模型
│   ├── requirements.txt   # Python 依赖
│   └── milk.db            # SQLite 数据库
├── frontend/              # 前端目录
│   ├── src/
│   │   ├── api/           # API 接口
│   │   ├── assets/        # 静态资源
│   │   │   └── images/    # 图片资源
│   │   ├── components/    # 公共组件
│   │   │   └── Layout.vue # 布局组件
│   │   ├── router/        # 路由配置
│   │   ├── utils/         # 工具函数
│   │   │   ├── authHelper.js  # 认证辅助
│   │   │   └── request.js     # HTTP 请求封装
│   │   ├── views/         # 页面组件
│   │   │   ├── Login.vue      # 登录页
│   │   │   ├── Farmers.vue    # 牧民信息
│   │   │   ├── FarmerForm.vue # 牧民表单
│   │   │   ├── Purchases.vue  # 收购信息
│   │   │   ├── PurchaseForm.vue # 收购表单
│   │   │   ├── Statistics.vue # 统计信息
│   │   │   ├── Profile.vue    # 个人中心
│   │   │   └── RecordDetail.vue # 记录详情
│   │   ├── App.vue        # 根组件
│   │   ├── main.js        # 入口文件
│   │   └── style.css      # 全局样式
│   ├── public/            # 公共资源
│   ├── index.html         # HTML 模板
│   ├── package.json       # npm 配置
│   └── vite.config.js     # Vite 配置
└── README.md              # 项目说明
```

## 功能模块

### 1. 用户认证
- 登录/退出
- JWT Token 认证
- 路由守卫

### 2. 牧民信息管理
- 牧民列表展示
- 新增牧民
- 编辑牧民信息
- 删除牧民
- 查看牧民详情
- 搜索牧民

### 3. 收购信息管理
- 收购记录列表
- 新增收购记录
- 编辑收购记录
- 删除收购记录
- 按日期筛选

### 4. 统计信息
- 收购统计概览
- 记录详情查看

### 5. 个人中心
- 个人信息管理
- 修改密码

## 快速开始

### 环境要求
- Node.js >= 16.0
- Python >= 3.8
- npm 或 yarn

### 后端启动

```bash
# 进入后端目录
cd backend

# 安装依赖
pip install -r requirements.txt

# 启动服务
python app.py
```

后端服务将在 http://localhost:5000 运行

### 前端启动

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

前端服务将在 http://localhost:5173 或 http://localhost:5174 运行

### 构建生产版本

```bash
cd frontend
npm run build
```

## 默认账号

- **用户名**: admin
- **密码**: admin123

## API 接口

### 认证接口
- `POST /api/login` - 用户登录
- `GET /api/user/info` - 获取用户信息

### 牧民接口
- `GET /api/farmers` - 获取牧民列表
- `GET /api/farmers/:id` - 获取牧民详情
- `POST /api/farmers` - 新增牧民
- `PUT /api/farmers/:id` - 更新牧民
- `DELETE /api/farmers/:id` - 删除牧民

### 收购接口
- `GET /api/purchases` - 获取收购记录列表
- `GET /api/purchases/:id` - 获取收购记录详情
- `POST /api/purchases` - 新增收购记录
- `PUT /api/purchases/:id` - 更新收购记录
- `DELETE /api/purchases/:id` - 删除收购记录

### 统计接口
- `GET /api/stats` - 获取统计数据

## 界面预览

系统采用蓝色主题设计，包含：
- 左侧蓝色导航栏
- 顶部用户信息栏
- 响应式布局设计
- Element Plus 组件库

## 开发说明

### 前端开发
- 使用 Composition API 编写组件
- 使用 Element Plus 组件库
- API 请求统一封装在 `src/api/index.js`
- 路由配置在 `src/router/index.js`

### 后端开发
- RESTful API 设计
- SQLAlchemy ORM 操作数据库
- JWT 进行身份认证
- CORS 处理跨域请求

## 许可证

MIT License

## 联系方式

如有问题，请提交 Issue。

