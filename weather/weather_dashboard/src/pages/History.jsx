import { useNavigate } from 'react-router-dom'
import { getHistory } from '../lib/storage'
import { useState, useEffect } from 'react'

export default function History() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState([])

  useEffect(() => {
    setEntries(getHistory())
  }, [])

  function openResult(entryId) {
    navigate('/results', { state: { entryId } })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900 mb-6">History</h1>
      {entries.length === 0 ? (
        <div className="rounded-xl border border-stone-200 bg-white p-8 text-center text-stone-600">
          No assessments yet. Run one from the Dashboard.
        </div>
      ) : (
        <ul className="space-y-3">
          {entries.map((e) => (
            <li key={e.id}>
              <button
                type="button"
                onClick={() => openResult(e.id)}
                className="w-full text-left rounded-xl border border-stone-200 bg-white p-4 shadow-sm hover:border-zen-300 hover:bg-zen-50/30 transition"
              >
                <span className="font-medium text-ink-900">
                  Score: {e.readinessScore ?? '—'} · {e.keySkills?.length ?? 0} skills
                </span>
                <span className="block text-sm text-stone-500 mt-1">
                  {new Date(e.createdAt).toLocaleString()}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
