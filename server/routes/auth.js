const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { prepare } = require('../database')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' })
  }

  const admin = prepare('SELECT * FROM admins WHERE username = ?').get(username)

  if (!admin) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const validPassword = bcrypt.compareSync(password, admin.password)

  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )

  res.json({
    token,
    admin: {
      id: admin.id,
      username: admin.username
    }
  })
})

// Verify token
router.get('/verify', authMiddleware, (req, res) => {
  res.json({
    valid: true,
    admin: req.admin
  })
})

module.exports = router
