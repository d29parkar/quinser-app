require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { initDatabase, prepare } = require('./database')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Initialize database and start server
initDatabase().then(() => {
  // Routes (import after database is initialized)
  const authRoutes = require('./routes/auth')
  const productRoutes = require('./routes/products')
  const submissionRoutes = require('./routes/submissions')

  app.use('/api/auth', authRoutes)
  app.use('/api/products', productRoutes)
  app.use('/api/submissions', submissionRoutes)

  // Contact form endpoint (convenience alias)
  app.post('/api/contact', (req, res) => {
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

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // Error handling
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Something went wrong!' })
  })

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}).catch(err => {
  console.error('Failed to initialize database:', err)
  process.exit(1)
})
