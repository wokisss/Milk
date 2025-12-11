const express = require('express');
const router = express.Router();
// 确保这里的 'db.js' 指向正确的数据库配置文件
// 根据文件结构，它应该是 '../database/db'
const db = require('../../product-traceability/db/db'); 

/**
 * 获取产品列表
 * GET /api/product/list
 * 执行联表查询并格式化数据以供前端使用
 */
router.get('/list', (req, res) => {
  // 关键SQL：联表查询 acquisitions 和 herdsmen
  const sql = `
    SELECT 
      a.id, 
      a.initial_id,
      a.weight,
      a.price,
      a.total_price,
      a.date,
      a.location,
      h.name as herdsman_name 
    FROM acquisitions a 
    JOIN herdsmen h ON a.herdsman_id = h.id
    ORDER BY a.date DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('获取产品列表失败：', err);
      return res.status(500).json({
        success: false,
        message: '服务器错误，获取产品失败'
      });
    }
    
    // 关键步骤：格式化数据以匹配前端需求
    const formattedData = rows.map(row => ({
        product_name: `生态鲜奶 (批次:${row.initial_id})`,
        // 随机分配一个产品图片
        product_img: `/static/img/product/${Math.floor(Math.random() * 4) + 1}.jpg`,
        // 将收购地点映射为产地
        province: row.location,
        price: row.price,
        date: row.date,
        herdsman: row.herdsman_name
    }));

    res.json({
      success: true,
      data: formattedData,
    });
  });
});

module.exports = router;