const express = require('express');
const pool = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Check if user is manager
const isManager = (req, res, next) => {
  if (req.user.role !== 'manager' && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};

// Dashboard metrics
router.get('/dashboard', authenticateToken, isManager, async (req, res) => {
  try {
    const totalMembers = await pool.query('SELECT COUNT(*) FROM users WHERE role = $1', ['member']);
    const totalSavings = await pool.query('SELECT SUM(balance) FROM savings_accounts');
    const activeLoanCount = await pool.query('SELECT COUNT(*) FROM loans WHERE status = $1', ['active']);

    res.json({
      totalMembers: totalMembers.rows[0].count,
      totalSavings: totalSavings.rows[0].sum || 0,
      activeLoanCount: activeLoanCount.rows[0].count,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Financial reports
router.get('/reports/financial', authenticateToken, isManager, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM financial_reports ORDER BY created_at DESC LIMIT 10'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch financial reports' });
  }
});

// Management action register
router.get('/actions', authenticateToken, isManager, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM management_actions ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch management actions' });
  }
});

module.exports = router;
