import React, { useEffect, useState } from 'react'

const getApiBase = () => {
  const codespace = import.meta.env.VITE_CODESPACE_NAME
  if (codespace) return `https://${codespace}-8000.app.github.dev/api`
  return `${window.location.protocol}//${window.location.hostname}:8000/api`
}

export default function Workouts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const base = getApiBase()
    fetch(`${base}/workouts/`)
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : data.results || data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="container mt-4">Loading workouts…</div>

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      {items.length === 0 && <p>No workouts found.</p>}
      <ul className="list-group">
        {items.map((w) => (
          <li key={w.id} className="list-group-item">
            <strong>{w.name || w.type}</strong> — {w.durationMin ?? w.duration} min
          </li>
        ))}
      </ul>
    </div>
  )
}
