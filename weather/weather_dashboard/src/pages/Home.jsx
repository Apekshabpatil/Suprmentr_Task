import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-ink-900 mb-4">Ace Your Placement</h1>
      <p className="text-lg text-stone-600 mb-8 max-w-xl mx-auto">
        Practice, assess, and prepare for your dream job
      </p>
      <Link
        to="/dashboard"
        className="inline-flex items-center justify-center rounded-lg bg-zen-600 text-white px-6 py-3 font-medium hover:bg-zen-700 transition"
      >
        Get Started
      </Link>
      <div className="grid sm:grid-cols-3 gap-6 mt-16 text-left">
        <div className="p-5 rounded-xl border border-stone-200 bg-white shadow-sm">
          <h3 className="font-semibold text-ink-900 mb-2">Practice Problems</h3>
          <p className="text-sm text-stone-600">Solve curated coding challenges across data structures, algorithms, and more.</p>
        </div>
        <div className="p-5 rounded-xl border border-stone-200 bg-white shadow-sm">
          <h3 className="font-semibold text-ink-900 mb-2">Mock Interviews</h3>
          <p className="text-sm text-stone-600">Simulate real interview scenarios with timed sessions and feedback.</p>
        </div>
        <div className="p-5 rounded-xl border border-stone-200 bg-white shadow-sm">
          <h3 className="font-semibold text-ink-900 mb-2">Track Progress</h3>
          <p className="text-sm text-stone-600">Visualize your growth with detailed performance analytics.</p>
        </div>
      </div>
    </div>
  )
}
