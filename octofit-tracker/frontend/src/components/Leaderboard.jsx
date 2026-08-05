import React, { useEffect, useState } from 'react'

const getApiBase = () => {
  const codespace = import.meta.env.VITE_CODESPACE_NAME
  if (codespace) return `https://${codespace}-8000.app.github.dev/api`
  return `${window.location.protocol}//${window.location.hostname}:8000/api`
}

export default function Leaderboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const base = getApiBase()
    fetch(`api/leaderboard/`)
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : data.results || data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="container mt-4">Loading leaderboard…</div>

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      {items.length === 0 && <p>No leaderboard entries.</p>}
      <ol className="list-group list-group-numbered">
        {items.map((u) => (
          <li key={u.id} className="list-group-item">
            {u.name} — {u.score ?? u.points ?? u.total ?? 0}
          </li>
        ))}
      </ol>
    </div>
  )
}
