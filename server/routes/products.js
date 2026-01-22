const express = require('express')
const { prepare } = require('../database')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// Get all products (public)
router.get('/', (req, res) => {
  const products = prepare('SELECT * FROM products ORDER BY id ASC').all()
  res.json(products)
})

// Get single product (public)
router.get('/:id', (req, res) => {
  const product = prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)

  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }

  res.json(product)
})

// Create product (protected)
router.post('/', authMiddleware, (req, res) => {
  const { name, category, description } = req.body

  if (!name || !category) {
    return res.status(400).json({ error: 'Name and category are required' })
  }

  const result = prepare(
    'INSERT INTO products (name, category, description) VALUES (?, ?, ?)'
  ).run(name, category, description || '')

  const newProduct = prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid)

  res.status(201).json(newProduct)
})

// Update product (protected)
router.put('/:id', authMiddleware, (req, res) => {
  const { name, category, description } = req.body
  const { id } = req.params

  const existing = prepare('SELECT * FROM products WHERE id = ?').get(id)

  if (!existing) {
    return res.status(404).json({ error: 'Product not found' })
  }

  prepare(
    'UPDATE products SET name = ?, category = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(
    name || existing.name,
    category || existing.category,
    description !== undefined ? description : existing.description,
    id
  )

  const updated = prepare('SELECT * FROM products WHERE id = ?').get(id)
  res.json(updated)
})

// Delete product (protected)
router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params

  const existing = prepare('SELECT * FROM products WHERE id = ?').get(id)

  if (!existing) {
    return res.status(404).json({ error: 'Product not found' })
  }

  prepare('DELETE FROM products WHERE id = ?').run(id)

  res.json({ message: 'Product deleted successfully' })
})

module.exports = router
