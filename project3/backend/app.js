const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
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

// 初始化数据库后再启动路由
const db = require('./config/database');

db.initDatabase().then(() => {
  // 导入路由
  const userRoutes = require('./routes/user');
  const productRoutes = require('./routes/product');
  const traceabilityRoutes = require('./routes/traceability');

  // API路由
  app.use('/api/user', userRoutes);
  app.use('/api/product', productRoutes);
  app.use('/api/traceability', traceabilityRoutes);

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
}).catch(err => {
  console.error('❌ 启动失败：', err.message);
  console.error('💡 请先运行: npm run init-db');
  process.exit(1);
});

module.exports = app;
