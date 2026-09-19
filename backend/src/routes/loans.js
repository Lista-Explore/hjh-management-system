const express = require('express');
const pool = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user's loans
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM loans WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
});

// Get loan repayment schedule
router.get('/:loanId/schedule', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM loan_repayments WHERE loan_id = $1 ORDER BY due_date',
      [req.params.loanId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch repayment schedule' });
  }
});

module.exports = router;
