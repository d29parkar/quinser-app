const initSqlJs = require('sql.js')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')

const DB_PATH = path.join(__dirname, 'quinser.db')

let db = null

const initDatabase = async () => {
  const SQL = await initSqlJs()

  // Load existing database or create new one
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH)
    db = new SQL.Database(fileBuffer)
  } else {
    db = new SQL.Database()
  }

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Seed default admin if not exists
  const adminResult = db.exec("SELECT id FROM admins WHERE username = 'admin'")
  if (adminResult.length === 0 || adminResult[0].values.length === 0) {
    const hashedPassword = bcrypt.hashSync('quinser2025', 10)
    db.run('INSERT INTO admins (username, password) VALUES (?, ?)', ['admin', hashedPassword])
    console.log('Default admin created: admin / quinser2025')
  }

  // Seed initial products if none exist
  const productCount = db.exec('SELECT COUNT(*) as count FROM products')
  if (productCount[0].values[0][0] === 0) {
    const initialProducts = [
      { name: "Antibiotic Capsules 500mg", category: "Antibiotics", description: "Broad-spectrum antibiotic for bacterial infections" },
      { name: "Pain Relief Tablets", category: "Analgesics", description: "Fast-acting pain relief medication" },
      { name: "Cardiac Care Formula", category: "Cardiology", description: "Supports cardiovascular health" },
      { name: "Diabetes Management", category: "Endocrinology", description: "Helps manage blood sugar levels" },
      { name: "Respiratory Relief", category: "Pulmonology", description: "For respiratory conditions and breathing support" },
      { name: "Digestive Health Capsules", category: "Gastroenterology", description: "Promotes digestive wellness" },
      { name: "Multivitamin Complex", category: "Nutritional Supplements", description: "Complete daily vitamin and mineral supplement" },
      { name: "Skin Care Cream", category: "Dermatology", description: "Topical treatment for skin conditions" },
      { name: "Allergy Relief Tablets", category: "Allergy", description: "Antihistamine for allergy symptoms" },
      { name: "Joint Health Supplement", category: "Orthopedics", description: "Supports joint mobility and comfort" },
      { name: "Eye Care Drops", category: "Ophthalmology", description: "Lubricating eye drops for dry eyes" },
      { name: "Antiviral Tablets", category: "Antivirals", description: "Treatment for viral infections" },
      { name: "Fertility Support Formula", category: "Fertility Products", description: "Nutritional support for reproductive health" }
    ]

    for (const product of initialProducts) {
      db.run('INSERT INTO products (name, category, description) VALUES (?, ?, ?)',
        [product.name, product.category, product.description])
    }
    console.log('Initial products seeded')
  }

  saveDatabase()
  return db
}

const saveDatabase = () => {
  if (db) {
    const data = db.export()
    const buffer = Buffer.from(data)
    fs.writeFileSync(DB_PATH, buffer)
  }
}

const getDb = () => db

// Helper functions that mimic better-sqlite3 API
const prepare = (sql) => {
  return {
    get: (...params) => {
      const result = db.exec(sql, params)
      if (result.length === 0 || result[0].values.length === 0) return null
      const columns = result[0].columns
      const values = result[0].values[0]
      const row = {}
      columns.forEach((col, i) => row[col] = values[i])
      return row
    },
    all: (...params) => {
      const result = db.exec(sql, params)
      if (result.length === 0) return []
      const columns = result[0].columns
      return result[0].values.map(values => {
        const row = {}
        columns.forEach((col, i) => row[col] = values[i])
        return row
      })
    },
    run: (...params) => {
      db.run(sql, params)
      saveDatabase()
      const lastId = db.exec('SELECT last_insert_rowid() as id')
      return { lastInsertRowid: lastId[0]?.values[0]?.[0] || 0 }
    }
  }
}

module.exports = { initDatabase, getDb, prepare, saveDatabase }
