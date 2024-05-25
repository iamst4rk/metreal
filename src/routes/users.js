const express = require('express');
const db = require('../database');
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { name, login, password } = req.body;
    await db('users').insert({ name, login, password });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
