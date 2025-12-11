// 安装依赖：先在 db 目录执行 npm install express mysql2 cors 
 const express = require('express'); 
 const mysql = require('mysql2/promise'); 
 const cors = require('cors'); 
 const path = require('path'); // 处理文件路径 
 const app = express(); 
 
 // 端口配置（与前端请求一致） 
 const PORT = 3001; 
 
 // 1. 跨域配置（允许前端访问） 
 app.use(cors({
   origin: '*', // 开发环境允许所有跨域，生产环境可指定前端域名 
   methods: ['GET', 'POST'], 
   allowedHeaders: ['Content-Type'] 
 })); 
 
 // 2. 静态资源映射：将后端 img 目录映射为 /img 接口 
 // 作用：前端访问 http://localhost:3001/img/1.jpg → 实际读取后端 db/img/1.jpg 
 const imgDir = path.join(__dirname, 'img'); // __dirname 是 db 目录的绝对路径 
 app.use('/img', express.static(imgDir)); 
 console.log('图片目录映射成功：', imgDir); 
 
 // 3. 解析 JSON 请求体 
 app.use(express.json()); 
 
 // 4. 数据库连接池（修改为你的数据库配置） 
 const pool = mysql.createPool({
   host: 'localhost', 
   user: 'root', // 你的MySQL用户名（默认root） 
   password: 'root', // 你的MySQL密码 
   database: 'milk_trace', // 数据库名 
   port: 3306, 
   connectionLimit: 10 
 }); 
 
 // 测试数据库连接 
 pool.getConnection() 
   .then(conn => {
     console.log('✅ 数据库连接成功'); 
     conn.release(); 
   }) 
   .catch(err => {
     console.error('❌ 数据库连接失败：', err.message); 
   }); 
 
 // 5. 接口1：获取产品列表（按省份筛选） 
 app.get('/api/products', async (req, res) => {
   try { 
     const { province } = req.query; 
     let sql = 'SELECT * FROM product'; 
     const params = []; 
     
     if (province) { 
       sql += ' WHERE province = ?'; 
       params.push(province); 
     } 
     
     const [rows] = await pool.execute(sql, params); 
     res.json({ success: true, data: rows }); 
   } catch (error) { 
     console.error('获取产品列表失败：', error); 
     res.status(500).json({ success: false, message: '服务器错误，获取产品失败' }); 
   } 
 }); 
 
 // 6. 接口2：搜索产品（按名称模糊匹配+省份筛选） 
 app.get('/api/products/search', async (req, res) => {
   try { 
     const { keyword, province } = req.query; 
     
     if (!keyword || !keyword.trim()) { 
       return res.json({ success: false, message: '请输入搜索关键词' }); 
     } 
     
     let sql = 'SELECT * FROM product WHERE product_name LIKE ?'; 
     const params = [`%${keyword.trim()}%`]; // 模糊匹配 
     
     if (province) { 
       sql += ' AND province = ?'; 
       params.push(province); 
     } 
     
     const [rows] = await pool.execute(sql, params); 
     res.json({ success: true, data: rows }); 
   } catch (error) { 
     console.error('搜索产品失败：', error); 
     res.status(500).json({ success: false, message: '服务器错误，搜索失败' }); 
   } 
 }); 

// 登录/注册接口（保留原有功能）
app.post('/api/login', async (req, res) => {
  try {
    // 从请求体中获取数据
    const { name, gender, phone } = req.body || {};
    
    // 对关键参数进行校验
    if (!name || !gender || !phone) {
      return res.status(400).json({
        success: false,
        message: '请填写完整的信息'
      });
    }

    // 检查用户是否已存在
    const [existingUsers] = await pool.execute(
      'SELECT * FROM user WHERE phone = ?',
      [phone]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: '该手机号已注册'
      });
    }

    // 插入新用户
    const [result] = await pool.execute(
      'INSERT INTO user (username, gender, phone, create_time) VALUES (?, ?, ?, NOW())',
      [name, gender, phone]
    );

    res.json({
      success: true,
      message: '登录/注册成功',
      data: {
        id: result.insertId,
        username: name,
        gender: gender,
        phone: phone
      }
    });
  } catch (error) {
    console.error('登录接口异常：', error);
    res.status(500).json({
      success: false,
      message: '服务器错误，请稍后再试'
    });
  }
});
 
 // 启动后端服务 
 app.listen(PORT, () => { 
   console.log(`✅ 后端服务运行在：http://localhost:${PORT}`); 
   console.log(`✅ 图片访问示例：http://localhost:${PORT}/img/1.jpg`); 
 });