import { useNavigate } from 'react-router-dom'
import { addHistoryEntry } from '../lib/storage'

const SAMPLE_SKILLS = ['Data Structures', 'Algorithms', 'System Design', 'Behavioral', 'DSA Arrays', 'Problem Solving']
const SAMPLE_7_DAY = `Day 1: Arrays & Two pointers
Day 2: Hash maps & Sliding window
Day 3: Stacks & Queues
Day 4: Linked lists & Trees
Day 5: Recursion & Backtracking
Day 6: Dynamic programming basics
Day 7: Mock test & revision`
const SAMPLE_CHECKLIST = `[ ] Resume review\n[ ] Intro & projects\n[ ] Coding round prep\n[ ] HR round prep\n[ ] Company research`
const SAMPLE_QUESTIONS = `1. Tell me about yourself.\n2. Describe a challenging project.\n3. Reverse a linked list.\n4. Two sum problem.\n5. Explain time complexity.\n6. Design a URL shortener.\n7. Conflict resolution example.\n8. Where do you see yourself in 5 years?\n9. Implement LRU cache.\n10. Any questions for us?`

function createNewEntry() {
  const id = 'entry_' + Date.now()
  const baseScore = 52
  const entry = {
    id,
    createdAt: new Date().toISOString(),
    readinessScore: baseScore,
    keySkills: [...SAMPLE_SKILLS],
    skillConfidenceMap: {},
    sevenDayPlan: SAMPLE_7_DAY,
    roundChecklist: SAMPLE_CHECKLIST,
    tenQuestions: SAMPLE_QUESTIONS,
  }
  addHistoryEntry(entry)
  return entry
}

export default function Dashboard() {
  const navigate = useNavigate()

  function handleAssess() {
    const entry = createNewEntry()
    navigate('/results', { state: { entryId: entry.id } })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900 mb-6">Dashboard</h1>
      <p className="text-stone-600 mb-8">Run a quick assessment to get your readiness score and personalized plan.</p>
      <button
        onClick={handleAssess}
        className="rounded-lg bg-zen-600 text-white px-6 py-3 font-medium hover:bg-zen-700 transition"
      >
        Run assessment
      </button>
    </div>
  )
}
