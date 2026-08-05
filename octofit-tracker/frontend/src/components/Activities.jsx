import React, { useEffect, useState } from 'react'

const getApiBase = () => {
  const codespace = import.meta.env.VITE_CODESPACE_NAME
  if (codespace) return `https://${codespace}-8000.app.github.dev/api`
  // safe fallback to same-origin + port 8000
  return `${window.location.protocol}//${window.location.hostname}:8000/api`
}

export default function Activities() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const base = getApiBase()
    fetch(`api/activities/`)
      .then((r) => r.json())
      .then((data) => {
        // support paginated responses and arrays
        const list = Array.isArray(data) ? data : data.results || data.data || []
        setItems(list)
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="container mt-4">Loading activities…</div>

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      {items.length === 0 && <p>No activities found.</p>}
      <ul className="list-group">
        {items.map((a) => (
          <li key={a.id} className="list-group-item">
            <strong>{a.type}</strong> — {a.distanceKm || a.distance} km in {a.durationMin || a.duration} min
          </li>
        ))}
      </ul>
    </div>
  )
}
