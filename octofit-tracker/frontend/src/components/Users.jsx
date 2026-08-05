import React, { useEffect, useState } from 'react'

const getApiBase = () => {
  const codespace = import.meta.env.VITE_CODESPACE_NAME
  if (codespace) return `https://${codespace}-8000.app.github.dev/api`
  return `${window.location.protocol}//${window.location.hostname}:8000/api`
}

export default function Users() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const base = getApiBase()
    fetch(`${base}/users/`)
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : data.results || data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="container mt-4">Loading users…</div>

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      {items.length === 0 && <p>No users.</p>}
      <ul className="list-group">
        {items.map((u) => (
          <li key={u.id} className="list-group-item">
            {u.name} — {u.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
