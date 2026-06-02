import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { getHistoryEntry, getHistory, updateHistoryEntry } from '../lib/storage'

const SCORE_KNOW = 2
const SCORE_PRACTICE = -2

function computeLiveScore(baseScore, skillConfidenceMap, keySkills) {
  let delta = 0
  keySkills.forEach((skill) => {
    const status = skillConfidenceMap[skill] || 'practice'
    delta += status === 'know' ? SCORE_KNOW : SCORE_PRACTICE
  })
  return Math.max(0, Math.min(100, baseScore + delta))
}

export default function Results() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const entryId = state?.entryId

  const [entry, setEntry] = useState(null)
  const [skillConfidenceMap, setSkillConfidenceMap] = useState({})
  const [copied, setCopied] = useState(null)

  useEffect(() => {
    let e = entryId ? getHistoryEntry(entryId) : null
    if (!e) {
      const history = getHistory()
      e = history[0] ?? null
    }
    if (e) {
      setEntry(e)
      setSkillConfidenceMap(e.skillConfidenceMap || {})
    }
  }, [entryId])

  const keySkills = entry?.keySkills ?? []
  const baseScore = entry?.readinessScore ?? 0
  const liveScore = useMemo(
    () => computeLiveScore(baseScore, skillConfidenceMap, keySkills),
    [baseScore, skillConfidenceMap, keySkills]
  )

  useEffect(() => {
    if (!entry?.id) return
    updateHistoryEntry(entry.id, {
      skillConfidenceMap: { ...skillConfidenceMap },
      readinessScore: liveScore,
    })
  }, [entry?.id, skillConfidenceMap, liveScore])

  const setSkillConfidence = (skill, value) => {
    setSkillConfidenceMap((prev) => ({ ...prev, [skill]: value }))
  }

  const weakSkills = useMemo(
    () => keySkills.filter((s) => (skillConfidenceMap[s] || 'practice') === 'practice').slice(0, 3),
    [keySkills, skillConfidenceMap]
  )

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(label)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      setCopied(null)
    }
  }

  const downloadTxt = () => {
    if (!entry) return
    const sections = [
      '=== 7-DAY PLAN ===',
      entry.sevenDayPlan,
      '',
      '=== ROUND CHECKLIST ===',
      entry.roundChecklist,
      '',
      '=== 10 QUESTIONS ===',
      entry.tenQuestions,
    ]
    const blob = new Blob([sections.join('\n\n')], { type: 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `placement-readiness-${entry.id}.txt`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  if (!entry) {
    return (
      <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
        <p className="text-stone-600">No assessment result found. Run one from the Dashboard.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 text-zen-600 font-medium hover:underline"
        >
          Go to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-ink-900">Assessment Results</h1>

      {/* Live readiness score */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink-900 mb-2">Readiness Score</h2>
        <p className="text-4xl font-bold text-zen-600 tabular-nums">{liveScore}</p>
        <p className="text-sm text-stone-500 mt-1">Updates as you mark skills (base ± 2 per skill, 0–100)</p>
      </section>

      {/* Key skills with toggles */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink-900 mb-4">Key skills extracted</h2>
        <div className="flex flex-wrap gap-3">
          {keySkills.map((skill) => {
            const status = skillConfidenceMap[skill] || 'practice'
            return (
              <div
                key={skill}
                className="inline-flex items-center gap-2 rounded-full border bg-stone-50 overflow-hidden"
              >
                <span className="pl-4 pr-2 py-2 text-sm font-medium text-ink-900">{skill}</span>
                <div className="flex rounded-r-full overflow-hidden border-l border-stone-200">
                  <button
                    type="button"
                    onClick={() => setSkillConfidence(skill, 'practice')}
                    className={`px-3 py-2 text-xs font-medium transition ${status === 'practice' ? 'bg-zen-100 text-zen-800' : 'bg-white text-stone-500 hover:bg-stone-100'}`}
                  >
                    Need practice
                  </button>
                  <button
                    type="button"
                    onClick={() => setSkillConfidence(skill, 'know')}
                    className={`px-3 py-2 text-xs font-medium transition ${status === 'know' ? 'bg-zen-600 text-white' : 'bg-white text-stone-500 hover:bg-stone-100'}`}
                  >
                    I know this
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Export tools */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink-900 mb-4">Export</h2>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => copyToClipboard(entry.sevenDayPlan, 'plan')}
            className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-ink-900 hover:bg-stone-50"
          >
            {copied === 'plan' ? 'Copied!' : 'Copy 7-day plan'}
          </button>
          <button
            type="button"
            onClick={() => copyToClipboard(entry.roundChecklist, 'checklist')}
            className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-ink-900 hover:bg-stone-50"
          >
            {copied === 'checklist' ? 'Copied!' : 'Copy round checklist'}
          </button>
          <button
            type="button"
            onClick={() => copyToClipboard(entry.tenQuestions, 'questions')}
            className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-ink-900 hover:bg-stone-50"
          >
            {copied === 'questions' ? 'Copied!' : 'Copy 10 questions'}
          </button>
          <button
            type="button"
            onClick={downloadTxt}
            className="rounded-lg bg-zen-600 text-white px-4 py-2 text-sm font-medium hover:bg-zen-700"
          >
            Download as TXT
          </button>
        </div>
      </section>

      {/* Action Next */}
      <section className="rounded-xl border border-zen-200 bg-zen-50/50 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink-900 mb-2">Action Next</h2>
        {weakSkills.length > 0 ? (
          <>
            <p className="text-sm text-stone-600 mb-3">Top skills to practice:</p>
            <ul className="list-disc list-inside text-ink-800 mb-4">
              {weakSkills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="text-zen-700 font-medium">Start Day 1 plan now.</p>
          </>
        ) : (
          <p className="text-zen-700 font-medium">All key skills marked known. Keep revising with the 7-day plan.</p>
        )}
      </section>
    </div>
  )
}
