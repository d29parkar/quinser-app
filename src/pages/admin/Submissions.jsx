import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Submissions = () => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState(null)

  const { token, logout, API_URL } = useAuth()

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`${API_URL}/api/submissions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data)
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      await fetch(`${API_URL}/api/submissions/${id}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      fetchSubmissions()
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const response = await fetch(`${API_URL}/api/submissions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchSubmissions()
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(null)
        }
      }
    } catch (error) {
      console.error('Failed to delete submission:', error)
    }
  }

  const openSubmission = (submission) => {
    setSelectedSubmission(submission)
    if (!submission.is_read) {
      markAsRead(submission.id)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card-bg to-background">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/assets/logo.png" alt="Quinser" className="h-10 w-auto" />
              <span className="text-xl font-semibold text-primary">Admin Panel</span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                target="_blank"
                className="text-text-secondary hover:text-primary transition-colors text-sm"
              >
                View Website &rarr;
              </a>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/admin" className="text-text-secondary hover:text-primary transition-colors">
            &larr; Back to Dashboard
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-text mb-8">Contact Submissions</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-md border border-border overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-gray-50">
              <h2 className="font-semibold text-text">Messages ({submissions.length})</h2>
            </div>

            {loading ? (
              <div className="p-8 text-center text-text-secondary">Loading...</div>
            ) : submissions.length === 0 ? (
              <div className="p-8 text-center text-text-secondary">No messages yet</div>
            ) : (
              <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                {submissions.map((submission) => (
                  <button
                    key={submission.id}
                    onClick={() => openSubmission(submission)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      selectedSubmission?.id === submission.id ? 'bg-primary/5 border-l-4 border-primary' : ''
                    } ${!submission.is_read ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          {!submission.is_read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                          )}
                          <p className={`font-medium text-text truncate ${!submission.is_read ? 'font-semibold' : ''}`}>
                            {submission.name}
                          </p>
                        </div>
                        <p className="text-sm text-text-secondary truncate mt-1">
                          {submission.subject}
                        </p>
                        <p className="text-xs text-text-secondary mt-1">
                          {formatDate(submission.created_at)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-border overflow-hidden">
            {selectedSubmission ? (
              <>
                <div className="px-6 py-4 border-b border-border bg-gray-50 flex justify-between items-center">
                  <h2 className="font-semibold text-text">{selectedSubmission.subject}</h2>
                  <button
                    onClick={() => handleDelete(selectedSubmission.id)}
                    className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-text-secondary">From</p>
                      <p className="font-medium text-text">{selectedSubmission.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Email</p>
                      <a
                        href={`mailto:${selectedSubmission.email}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {selectedSubmission.email}
                      </a>
                    </div>
                    {selectedSubmission.phone && (
                      <div>
                        <p className="text-sm text-text-secondary">Phone</p>
                        <a
                          href={`tel:${selectedSubmission.phone}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {selectedSubmission.phone}
                        </a>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-text-secondary">Received</p>
                      <p className="font-medium text-text">{formatDate(selectedSubmission.created_at)}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-text-secondary mb-2">Message</p>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-text whitespace-pre-wrap">{selectedSubmission.message}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <a
                      href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`}
                      className="px-6 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-medium hover:from-primary-dark hover:to-primary transition-all"
                    >
                      Reply via Email
                    </a>
                    {selectedSubmission.phone && (
                      <a
                        href={`tel:${selectedSubmission.phone}`}
                        className="px-6 py-2 bg-gray-100 text-text rounded-xl font-medium hover:bg-gray-200 transition-colors"
                      >
                        Call
                      </a>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-text-secondary h-full flex items-center justify-center">
                <div>
                  <span className="text-4xl mb-4 block">📧</span>
                  <p>Select a message to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Submissions
