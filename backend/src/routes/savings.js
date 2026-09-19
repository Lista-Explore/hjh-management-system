const express = require('express');
const pool = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user's savings account
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM savings_accounts WHERE user_id = $1',
      [req.user.id]
    );
    res.json(result.rows[0] || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch savings' });
  }
});

// Get savings transactions
router.get('/transactions', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM transactions WHERE user_id = $1 AND type IN ($2, $3) ORDER BY date DESC',
      [req.user.id, 'savings_deposit', 'savings_withdrawal']
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

module.exports = router;
