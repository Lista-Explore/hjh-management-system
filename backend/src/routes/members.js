const express = require('express');
const pool = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all members (management only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, first_name, last_name, created_at FROM users WHERE role = $1 ORDER BY created_at DESC', ['member']);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// Get member profile
router.get('/profile/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, first_name, last_name, role FROM users WHERE id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch member profile' });
  }
});

module.exports = router;
