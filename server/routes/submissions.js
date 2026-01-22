const express = require('express')
const { prepare } = require('../database')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// Submit contact form (public)
router.post('/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Name, email, subject, and message are required' })
  }

  const result = prepare(
    'INSERT INTO submissions (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)'
  ).run(name, email, phone || '', subject, message)

  res.status(201).json({
    message: 'Thank you for your message! We will get back to you soon.',
    id: result.lastInsertRowid
  })
})

// Get all submissions (protected)
router.get('/', authMiddleware, (req, res) => {
  const submissions = prepare('SELECT * FROM submissions ORDER BY created_at DESC').all()
  res.json(submissions)
})

// Get single submission (protected)
router.get('/:id', authMiddleware, (req, res) => {
  const submission = prepare('SELECT * FROM submissions WHERE id = ?').get(req.params.id)

  if (!submission) {
    return res.status(404).json({ error: 'Submission not found' })
  }

  res.json(submission)
})

// Mark submission as read (protected)
router.put('/:id/read', authMiddleware, (req, res) => {
  const { id } = req.params

  const existing = prepare('SELECT * FROM submissions WHERE id = ?').get(id)

  if (!existing) {
    return res.status(404).json({ error: 'Submission not found' })
  }

  prepare('UPDATE submissions SET is_read = 1 WHERE id = ?').run(id)

  const updated = prepare('SELECT * FROM submissions WHERE id = ?').get(id)
  res.json(updated)
})

// Delete submission (protected)
router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params

  const existing = prepare('SELECT * FROM submissions WHERE id = ?').get(id)

  if (!existing) {
    return res.status(404).json({ error: 'Submission not found' })
  }

  prepare('DELETE FROM submissions WHERE id = ?').run(id)

  res.json({ message: 'Submission deleted successfully' })
})

// Get stats (protected)
router.get('/stats/overview', authMiddleware, (req, res) => {
  const totalSubmissions = prepare('SELECT COUNT(*) as count FROM submissions').get().count
  const unreadSubmissions = prepare('SELECT COUNT(*) as count FROM submissions WHERE is_read = 0').get().count
  const totalProducts = prepare('SELECT COUNT(*) as count FROM products').get().count

  res.json({
    totalSubmissions,
    unreadSubmissions,
    totalProducts
  })
})

module.exports = router
