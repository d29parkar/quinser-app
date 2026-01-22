import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('adminToken'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setAdmin(data.admin)
        } else {
          localStorage.removeItem('adminToken')
          setToken(null)
        }
      } catch (error) {
        console.error('Token verification failed:', error)
        localStorage.removeItem('adminToken')
        setToken(null)
      }

      setLoading(false)
    }

    verifyToken()
  }, [token])

  const login = async (username, password) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Login failed')
    }

    localStorage.setItem('adminToken', data.token)
    setToken(data.token)
    setAdmin(data.admin)

    return data
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    setToken(null)
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout, API_URL }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
