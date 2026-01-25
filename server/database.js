const { Pool } = require('pg')
const bcrypt = require('bcryptjs')

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

const initDatabase = async () => {
  try {
    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        dosage_form TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Add dosage_form column if it doesn't exist (for existing databases)
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'products' AND column_name = 'dosage_form'
        ) THEN
          ALTER TABLE products ADD COLUMN dosage_form TEXT;
        END IF;
      END $$;
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        is_read INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Seed default admin if not exists
    const adminResult = await pool.query("SELECT id FROM admins WHERE username = 'admin'")
    if (adminResult.rows.length === 0) {
      const hashedPassword = bcrypt.hashSync('quinser2025', 10)
      await pool.query('INSERT INTO admins (username, password) VALUES ($1, $2)', ['admin', hashedPassword])
      console.log('Default admin created: admin / quinser2025')
    }

    // Seed initial products if none exist
    const productCount = await pool.query('SELECT COUNT(*) as count FROM products')
    if (parseInt(productCount.rows[0].count) === 0) {
      const initialProducts = require('./seedProducts')

      for (const product of initialProducts) {
        await pool.query('INSERT INTO products (name, category, dosage_form, description) VALUES ($1, $2, $3, $4)',
          [product.name, product.category, product.dosage_form, product.description])
      }
      console.log('Initial products seeded')
    }

    console.log('Database initialized successfully')
  } catch (err) {
    console.error('Database initialization error:', err)
    throw err
  }
}

const getDb = () => pool

// Helper functions that mimic better-sqlite3 API but use async/await
const prepare = (sql) => {
  // Convert ? placeholders to $1, $2, etc. for PostgreSQL
  let paramCount = 0
  const convertedSql = sql.replace(/\?/g, () => `$${++paramCount}`)

  return {
    get: async (...params) => {
      const result = await pool.query(convertedSql, params)
      return result.rows[0] || null
    },
    all: async (...params) => {
      const result = await pool.query(convertedSql, params)
      return result.rows
    },
    run: async (...params) => {
      const result = await pool.query(convertedSql + ' RETURNING id', params)
      return { lastInsertRowid: result.rows[0]?.id || 0 }
    }
  }
}

module.exports = { initDatabase, getDb, prepare }
