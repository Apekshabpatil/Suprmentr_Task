const HISTORY_KEY = 'placement_readiness_history'

export function getHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveHistory(entries) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(entries))
}

export function getHistoryEntry(id) {
  const entries = getHistory()
  return entries.find((e) => e.id === id) ?? null
}

export function updateHistoryEntry(id, updates) {
  const entries = getHistory()
  const idx = entries.findIndex((e) => e.id === id)
  if (idx === -1) return
  entries[idx] = { ...entries[idx], ...updates }
  saveHistory(entries)
}

export function addHistoryEntry(entry) {
  const entries = getHistory()
  entries.unshift(entry)
  saveHistory(entries)
}
