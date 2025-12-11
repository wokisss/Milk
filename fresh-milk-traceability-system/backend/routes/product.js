const express = require('express');
const router = express.Router();
const db = require('../config/database');

/**
 * 获取产品列表
 * GET /api/product/list
 * 查询参数: province (可选) - 省份筛选
 */
router.get('/list', (req, res) => {
  try {
    const { province, page = 1, pageSize = 20 } = req.query;
    
    let sql = 'SELECT * FROM product WHERE 1=1';
    const params = [];
    
    if (province && province !== '全部') {
      sql += ' AND province = ?';
      params.push(province);
    }
    
    sql += ' ORDER BY create_time DESC LIMIT ? OFFSET ?';
    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;
    params.push(limit, offset);
    
    const rows = db.prepare(sql).all(...params);
    
    // 获取总数
    let countSql = 'SELECT COUNT(*) as total FROM product WHERE 1=1';
    const countParams = [];
    if (province && province !== '全部') {
      countSql += ' AND province = ?';
      countParams.push(province);
    }
    const countResult = db.prepare(countSql).get(...countParams);
    const total = countResult.total;
    
    res.json({
      success: true,
      data: rows,
      pagination: {
        page: parseInt(page),
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('获取产品列表失败：', error);
    res.status(500).json({
      success: false,
      message: '服务器错误，获取产品失败'
    });
  }
});

/**
 * 搜索产品
 * GET /api/product/search
 * 查询参数: keyword (必填) - 搜索关键词, province (可选) - 省份筛选
 */
router.get('/search', (req, res) => {
  try {
    const { keyword, province, page = 1, pageSize = 20 } = req.query;
    
    if (!keyword || !keyword.trim()) {
      return res.status(400).json({
        success: false,
        message: '请输入搜索关键词'
      });
    }
    
    let sql = 'SELECT * FROM product WHERE product_name LIKE ?';
    const params = [`%${keyword.trim()}%`];
    
    if (province && province !== '全部') {
      sql += ' AND province = ?';
      params.push(province);
    }
    
    sql += ' ORDER BY create_time DESC LIMIT ? OFFSET ?';
    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;
    params.push(limit, offset);
    
    const rows = db.prepare(sql).all(...params);
    
    // 获取总数
    let countSql = 'SELECT COUNT(*) as total FROM product WHERE product_name LIKE ?';
    const countParams = [`%${keyword.trim()}%`];
    if (province && province !== '全部') {
      countSql += ' AND province = ?';
      countParams.push(province);
    }
    const countResult = db.prepare(countSql).get(...countParams);
    const total = countResult.total;
    
    res.json({
      success: true,
      data: rows,
      pagination: {
        page: parseInt(page),
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('搜索产品失败：', error);
    res.status(500).json({
      success: false,
      message: '服务器错误，搜索失败'
    });
  }
});

/**
 * 根据产品编码获取产品详情
 * GET /api/product/detail
 * 查询参数: productCode (必填) - 产品编码
 */
router.get('/detail', (req, res) => {
  try {
    const { productCode } = req.query;
    
    if (!productCode) {
      return res.status(400).json({
        success: false,
        message: '缺少产品编码参数'
      });
    }
    
    const rows = db.prepare('SELECT * FROM product WHERE product_code = ?').all(productCode);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: '产品不存在'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('获取产品详情失败：', error);
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
});

/**
 * 获取所有省份列表（用于筛选）
 * GET /api/product/provinces
 */
router.get('/provinces', (req, res) => {
  try {
    const rows = db.prepare('SELECT DISTINCT province FROM product WHERE province IS NOT NULL ORDER BY province').all();
    
    const provinces = rows.map(row => row.province);
    
    res.json({
      success: true,
      data: provinces
    });
  } catch (error) {
    console.error('获取省份列表失败：', error);
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
});

module.exports = router;

