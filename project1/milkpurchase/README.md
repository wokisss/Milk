# 鲜奶收购管理系统

一个基于Flask开发的现代化牧民鲜奶收购管理系统，提供完整的牧民信息管理、收购记录管理等功能，采用绿色主题设计，界面美观友好。

## 📋 项目概述

本系统专为牧区鲜奶收购业务设计，帮助奶站管理人员高效管理牧民信息和收购记录。系统支持用户认证、数据录入、查询统计等核心功能，具有响应式设计，支持桌面和移动设备访问。

### 🎯 主要功能

- **用户管理**：安全的登录认证系统，支持管理员和普通用户角色
- **牧民管理**：完整的牧民信息管理，包括姓名、身份证、银行卡号、联系方式、地址等
- **收购管理**：鲜奶收购记录管理，自动计算总价，支持收购地点和备注信息
- **数据展示**：美观的表格展示，支持数据排序和筛选
- **响应式设计**：适配各种屏幕尺寸，提供良好的移动端体验

## 🛠 技术栈

### 后端技术
- **Flask** - 轻量级Web框架
- **Flask-SQLAlchemy** - ORM数据库操作
- **Flask-WTF** - 表单处理和CSRF保护
- **Werkzeug** - 密码哈希处理
- **SQLite** - 轻量级数据库

### 前端技术
- **HTML5** - 语义化标记
- **CSS3** - 现代化样式，Flexbox布局
- **JavaScript** - 交互功能
- **Jinja2** - 模板引擎

### 开发工具
- **Python 3.7+** - 编程语言
- **pip** - 包管理器

## 📁 项目结构

```
milkpurchase/
├── app.py                 # 主应用文件，路由和视图逻辑
├── config.py              # 配置文件，数据库连接等设置
├── models.py              # 数据模型定义（User, Farmer, Purchase）
├── forms.py               # WTForms表单定义
├── requirements.txt        # Python依赖包列表
├── README.md             # 项目说明文档
├── milk.db               # SQLite数据库文件（自动生成）
├── static/               # 静态资源目录
│   ├── css/
│   │   └── style.css     # 主样式文件
│   ├── js/
│   │   └── main.js       # JavaScript文件
│   └── uploads/          # 文件上传目录
└── templates/            # HTML模板目录
    ├── base.html          # 基础模板
    ├── index.html         # 首页模板
    ├── login.html         # 登录页面
    ├── farmers.html       # 牧民列表页面
    ├── farmer_form.html   # 牧民信息表单
    ├── purchases.html     # 收购记录列表
    └── purchase_form.html # 收购记录表单
```

## 🚀 快速开始

### 环境要求

- Python 3.7 或更高版本
- pip 包管理器
- 现代Web浏览器

### 安装步骤

1. **克隆或下载项目**
   ```bash
   # 如果使用Git
   git clone <repository-url>
   cd milkpurchase
   ```

2. **创建虚拟环境（推荐）**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate
   
   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **安装依赖包**
   ```bash
   pip install -r requirements.txt
   ```

4. **运行应用**
   ```bash
   python app.py
   ```

5. **访问应用**
   
   打开浏览器访问：`http://127.0.0.1:5000`

### 默认登录信息

- **用户名**：`admin`
- **密码**：`admin123`

## 📊 数据库结构

系统使用SQLite数据库，包含以下主要数据表：

### Users表（用户表）
- `id` - 主键
- `username` - 用户名（唯一）
- `password_hash` - 密码哈希值
- `role` - 用户角色（admin/user）
- `created_at` - 创建时间

### Farmers表（牧民表）
- `id` - 主键
- `name` - 姓名
- `id_card` - 身份证号（唯一）
- `bank_card` - 银行卡号
- `address` - 家庭住址
- `phone` - 联系电话
- `milk_station_id` - 所属奶站编号
- `created_at` - 创建时间

### Purchases表（收购记录表）
- `id` - 主键
- `farmer_id` - 牧民ID（外键）
- `price_per_unit` - 收购单价
- `quantity` - 收购数量
- `total_price` - 总价（自动计算）
- `purchase_time` - 收购时间
- `location` - 收购地点
- `note` - 备注信息
- `created_at` - 记录创建时间

## 🎨 界面特色

### 设计理念
- **绿色主题**：采用清新的绿色渐变，象征自然和健康
- **现代化设计**：使用CSS3特性，包括渐变、阴影、动画效果
- **响应式布局**：完美适配桌面、平板和手机设备
- **用户友好**：直观的操作流程，清晰的视觉反馈

### 主要页面
1. **登录页面**：简洁的登录界面，包含默认账号提示
2. **首页**：系统概览，快速访问各功能模块
3. **牧民管理**：牧民信息列表和添加表单
4. **收购管理**：收购记录列表和新增表单

## 🔧 配置说明

### 数据库配置
默认使用SQLite数据库，数据文件位于项目根目录的`milk.db`。如需修改数据库配置，请编辑`config.py`文件：

```python
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'your_database.db')
```

### 安全配置
生产环境部署时，请修改以下配置：

1. **SECRET_KEY**：设置强密钥
   ```python
   SECRET_KEY = 'your-very-secret-key-here'
   ```

2. **数据库安全**：考虑使用MySQL或PostgreSQL
3. **HTTPS**：配置SSL证书

## 📝 使用指南

### 基本操作流程

1. **登录系统**
   - 使用默认管理员账号登录
   - 首次登录后建议修改密码

2. **管理牧民信息**
   - 点击"牧民信息"查看现有牧民列表
   - 点击"添加牧民"录入新牧民信息
   - 必填项：姓名、身份证号
   - 选填项：银行卡号、地址、电话、奶站编号

3. **管理收购记录**
   - 点击"收购信息"查看历史收购记录
   - 点击"新增收购"录入新的收购信息
   - 输入牧民身份证号自动关联牧民信息
   - 系统自动计算总价

### 数据管理建议

- **定期备份**：定期备份`milk.db`数据库文件
- **数据清理**：定期清理过期的测试数据
- **权限管理**：合理分配用户权限，避免误操作

## 🚀 部署指南

### 本地开发部署

按照"快速开始"部分的步骤即可完成本地部署。

### 生产环境部署

#### 使用Gunicorn（Linux/macOS）

1. **安装Gunicorn**
   ```bash
   pip install gunicorn
   ```

2. **启动应用**
   ```bash
   gunicorn -w 4 -b 0.0.0.0:8000 app:app
   ```

#### 使用Nginx + Gunicorn

1. **配置Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
       
       location /static {
           alias /path/to/milkpurchase/static;
       }
   }
   ```

2. **使用systemd管理Gunicorn服务**
   ```ini
   [Unit]
   Description=Milk Purchase System
   After=network.target

   [Service]
   User=www-data
   WorkingDirectory=/path/to/milkpurchase
   ExecStart=/path/to/venv/bin/gunicorn -w 4 -b 127.0.0.1:8000 app:app

   [Install]
   WantedBy=multi-user.target
   ```

#### Docker部署

1. **创建Dockerfile**
   ```dockerfile
   FROM python:3.9-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   EXPOSE 5000
   CMD ["python", "app.py"]
   ```

2. **构建和运行**
   ```bash
   docker build -t milk-purchase .
   docker run -p 5000:5000 milk-purchase
   ```

## 🔍 故障排除

### 常见问题

1. **数据库连接错误**
   - 检查`milk.db`文件权限
   - 确保SQLite依赖正确安装

2. **模板文件未找到**
   - 检查`templates`目录结构
   - 确认文件名拼写正确

3. **静态文件加载失败**
   - 检查`static`目录结构
   - 确认CSS/JS文件路径正确

4. **表单验证失败**
   - 检查必填字段是否完整
   - 确认数据格式符合要求

### 日志查看

开发模式下，Flask会输出详细的错误信息到控制台。生产环境建议配置日志文件：

```python
import logging
logging.basicConfig(filename='app.log', level=logging.INFO)
```

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目！

### 开发规范

1. **代码风格**：遵循PEP 8规范
2. **提交信息**：使用清晰的提交信息
3. **测试**：确保新功能有相应的测试
4. **文档**：更新相关文档说明

## 📄 许可证

本项目采用MIT许可证，详见LICENSE文件。

## 📞 技术支持

如遇到问题或需要技术支持，请：

1. 查看本README的故障排除部分
2. 搜索已有的Issues
3. 创建新的Issue并详细描述问题

---

**版本信息**：v1.0.0  
**最后更新**：2025年11月  
**维护者**：Milk Purchase System Team