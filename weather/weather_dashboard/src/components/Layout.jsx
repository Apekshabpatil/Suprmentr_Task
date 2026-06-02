import { Link, useLocation } from 'react-router-dom'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/results', label: 'Results' },
  { to: '/history', label: 'History' },
]

export default function Layout({ children }) {
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-zen-700">Ace Your Placement</Link>
          <nav className="flex gap-4">
            {nav.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-medium ${location.pathname === to ? 'text-zen-600' : 'text-stone-600 hover:text-zen-600'}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
