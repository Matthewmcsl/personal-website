import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Thoughts() {
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    setDark(d => {
      document.documentElement.setAttribute('data-theme', !d ? 'dark' : 'light')
      return !d
    })
  }

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="nav-name">Matthew Chan</Link>
          <div className="nav-links">
            <Link to="/" className="nav-thoughts">← Back to main</Link>
            <span className="nav-thoughts" style={{ opacity: 0.3 }}>Thoughts 💬</span>
            <a href="https://www.linkedin.com/in/matthewmcsl/" target="_blank" rel="noreferrer" className="nav-thoughts nav-linkedin">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <button className="theme-toggle" onClick={toggleDark} aria-label="Toggle dark mode">
              {dark ? 'Toggle Light Mode ☀️' : 'Toggle Dark Mode 🌙'}
            </button>
          </div>
        </div>
      </nav>

      <main className="main">
        <section className="section" style={{ marginTop: '64px' }}>
          <h2 className="section-title">Thoughts</h2>
          <p className="text-muted">Coming soon.</p>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Matthew Chan</p>
      </footer>
    </>
  )
}
