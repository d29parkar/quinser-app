const express = require('express')
const { prepare } = require('../database')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await prepare('SELECT * FROM products ORDER BY id ASC').all()
    res.json(products)
  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// Get single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    console.error('Get product error:', error)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

// Create product (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, category, dosage_form, description } = req.body

    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category are required' })
    }

    const result = await prepare(
      'INSERT INTO products (name, category, dosage_form, description) VALUES (?, ?, ?, ?)'
    ).run(name, category, dosage_form || '', description || '')

    const newProduct = await prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid)

    res.status(201).json(newProduct)
  } catch (error) {
    console.error('Create product error:', error)
    res.status(500).json({ error: 'Failed to create product' })
  }
})

// Update product (protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, category, dosage_form, description } = req.body
    const { id } = req.params

    const existing = await prepare('SELECT * FROM products WHERE id = ?').get(id)

    if (!existing) {
      return res.status(404).json({ error: 'Product not found' })
    }

    await prepare(
      'UPDATE products SET name = ?, category = ?, dosage_form = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).run(
      name || existing.name,
      category || existing.category,
      dosage_form !== undefined ? dosage_form : existing.dosage_form,
      description !== undefined ? description : existing.description,
      id
    )

    const updated = await prepare('SELECT * FROM products WHERE id = ?').get(id)
    res.json(updated)
  } catch (error) {
    console.error('Update product error:', error)
    res.status(500).json({ error: 'Failed to update product' })
  }
})

// Delete product (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params

    const existing = await prepare('SELECT * FROM products WHERE id = ?').get(id)

    if (!existing) {
      return res.status(404).json({ error: 'Product not found' })
    }

    await prepare('DELETE FROM products WHERE id = ?').run(id)

    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Delete product error:', error)
    res.status(500).json({ error: 'Failed to delete product' })
  }
})

module.exports = router
