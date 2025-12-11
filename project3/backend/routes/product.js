const express = require('express');
const router = express.Router();
const db = require('../config/database');

/**
 * 获取产品列表
 * GET /api/product/list
 */
router.get('/list', async (req, res) => {
  try {
    const sql = 'SELECT * FROM acquisitions';
    const rows = await db.query(sql);
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error('获取产品列表失败：', error);
    res.status(500).json({
      success: false,
      message: '服务器错误，获取产品失败'
    });
  }
});

module.exports = router;


