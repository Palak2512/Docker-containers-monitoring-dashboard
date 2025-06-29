const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// 🔐 Hardcoded admin user
const ADMIN = {
  email: 'admin@dockdash.com',
  password: bcrypt.hashSync('securepass123', 10) // hashed password
};

// POST /api/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN.email || !bcrypt.compareSync(password, ADMIN.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Create token
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '2h' });

  res.json({ token });
});

module.exports = router;
