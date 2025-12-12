const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Correctly imports the sqlite3 db instance

/**
 * @route   GET /api/product/list
 * @desc    Get all products from the product table
 * @access  Public
 */
router.get('/list', (req, res) => {
  const sql = 'SELECT * FROM product ORDER BY production_date DESC';

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching product list:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve products from the database.'
      });
    }
    res.json({
      success: true,
      data: rows
    });
  });
});

/**
 * @route   GET /api/product/trace/:id
 * @desc    Get the full traceability information for a single product
 * @access  Public
 */
router.get('/trace/:id', (req, res) => {
  const productId = req.params.id;
  const response = {};

  const productSql = 'SELECT * FROM product WHERE id = ?';
  const logisticsSql = 'SELECT * FROM logistics WHERE product_id = ?';
  const processingSql = 'SELECT * FROM processing WHERE product_id = ?';
  const supermarketSql = 'SELECT * FROM supermarket WHERE product_id = ?';

  db.serialize(() => {
    db.get(productSql, [productId], (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: 'Error querying product table' });
      }
      if (!row) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      response.product = row;

      db.get(logisticsSql, [productId], (err, row) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ success: false, message: 'Error querying logistics table' });
        }
        response.logistics = row || null;

        db.get(processingSql, [productId], (err, row) => {
          if (err) {
            console.error(err.message);
            return res.status(500).json({ success: false, message: 'Error querying processing table' });
          }
          response.processing = row || null;

          db.get(supermarketSql, [productId], (err, row) => {
            if (err) {
              console.error(err.message);
              return res.status(500).json({ success: false, message: 'Error querying supermarket table' });
            }
            response.supermarket = row || null;

            res.json({ success: true, data: response });
          });
        });
      });
    });
  });
});


module.exports = router;