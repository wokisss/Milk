const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// --- Database Initialization ---
const dbPath = path.join(__dirname, 'data', 'milk_trace.db');
const initSqlPath = path.join(__dirname, 'database', 'init.sql');

// Automatically initialize the database if it doesn't exist
if (!fs.existsSync(dbPath)) {
  console.log('Database file not found. Initializing new database...');
  const initSql = fs.readFileSync(initSqlPath, 'utf8');
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error creating database file:', err.message);
      return;
    }
  });

  db.exec(initSql, (err) => {
    if (err) {
      console.error('Error initializing database:', err.message);
    } else {
      console.log('Database initialized successfully with schema.');
    }
    db.close();
  });
}
// --- End of Database Initialization ---

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 确保必要的目录存在
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件配置
app.use(cors({
  origin: '*', // 开发环境允许所有跨域，生产环境建议指定前端域名
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态资源映射
app.use('/uploads', express.static(uploadsDir));

// 图片资源映射（如果前端需要访问）
const imgDir = path.join(__dirname, '../product-traceability2.0/db/img');
app.use('/img', express.static(imgDir));

// 导入路由
const productRoutes = require('./routes/product');

// API路由
app.use('/api/product', productRoutes);

// 健康检查接口
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '服务运行正常',
    timestamp: new Date().toISOString()
  });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '接口不存在'
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误：', err);
  res.status(500).json({
    success: false,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`✅ 后端服务运行在：http://localhost:${PORT}`);
  console.log(`✅ 环境：${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ 图片访问示例：http://localhost:${PORT}/img/1.jpg`);
});

module.exports = app;

