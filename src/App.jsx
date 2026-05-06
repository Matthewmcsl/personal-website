import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import profileImg from './assets/matthew_profile.jpg'

const NAV_LINKS = ['About', 'Experience', 'Education', 'Skills', 'Contact']

const monthsSince = (year, month) => {
  const start = new Date(year, month - 1, 1)
  const now = new Date()
  return (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth())
}

const tiktokMonths = monthsSince(2025, 6)

const INDUSTRIES = [
  {
    name: 'Technology',
    color: '#5a8fa3',
    companies: [
      { company: 'ByteDance (TikTok)', period: 'Jun 2025 – Present', months: tiktokMonths, current: true },
      { company: 'Shopee', period: 'May 2022 – Apr 2023', months: 11 },
      { company: 'Omnistream', period: 'Sep 2020 – Jun 2021', months: 9 },
    ],
  },
  {
    name: 'Education',
    color: '#6b7fa3',
    companies: [
      { company: 'SUSS', period: 'Apr 2023 – Jun 2025', months: 26 },
    ],
  },
  {
    name: 'Healthcare',
    color: '#8c6b8c',
    companies: [
      { company: 'Becton Dickinson', period: 'Oct 2021 – Apr 2022', months: 6 },
    ],
  },
]

const formatTenure = (months) => {
  const y = Math.floor(months / 12)
  const m = months % 12
  if (y === 0) return `${m}m`
  if (m === 0) return `${y}y`
  return `${y}y ${m}m`
}

const EXPERIENCE = [
  {
    role: 'Data Analyst',
    company: 'ByteDance (TikTok)',
    period: 'Jun 2025 – Present',
    description: 'Trust & Safety Operations, Reports & Insights. Moderation quality & efficiency reporting (human & ML), data pipeline ownership, A/B testing for policy launches, and red teaming stress tests on large-scale multimodal AI systems.',
    award: {
      label: "Q4 2025 Spot Bonus Winner",
      img: 'https://media.licdn.com/dms/image/v2/D562DAQGC3NgzS1HuxQ/profile-treasury-image-shrink_800_800/B56ZzIhh7QIsAY-/0/1772890759808?e=1778698800&v=beta&t=BG1tW2xVUEsiYnWB-sjo44Rw8ZHXDf3zwFjXFBwMmtQ',
    },
  },
  {
    role: 'Business Intelligence and Analytics Specialist',
    company: 'Singapore University of Social Sciences',
    period: 'Apr 2023 – Jun 2025',
    description: 'Business Intelligence and Analytics. Student attrition, engagement, and GPA predictions.',
    publication: {
      title: 'Digital learning resources and student success: Analyzing engagement and academic performance',
      url: 'https://doi.org/10.37074/jalt.2025.8.S2.3',
      note: 'Third Author',
    },
  },
  {
    role: 'Data Analyst, Associate',
    company: 'Shopee',
    period: 'May 2022 – Apr 2023',
    description: 'Regional Operations, Returns and Refunds. Headcount projection, metrics optimisation, and root cause analyses.',
  },
  {
    role: 'Data Analytics and Insights Intern',
    company: 'Becton Dickinson',
    period: 'Oct 2021 – Apr 2022',
    description: 'Regional Marketing, Diabetes Care. Market sizing, operations, dashboarding, and GTM strategy.',
  },
  {
    role: 'Data Science Intern',
    company: 'Omnistream',
    period: 'Sep 2020 – Jun 2021',
  },
]

function StickmanWalker() {
  const xRef = useRef(120)
  const [x, setX] = useState(120)
  const [dir, setDir] = useState(1)
  const [moving, setMoving] = useState(false)
  const movingRef = useRef(false)
  const wanderTargetRef = useRef(null)
  const nextWanderRef = useRef(performance.now() + 1200)

  useEffect(() => {
    let rafId
    const W = 68
    const SPEED = 0.7

    const tick = () => {
      const curr = xRef.current
      let shouldMove = false
      const now = performance.now()
      const wt = wanderTargetRef.current

      if (wt !== null) {
        const dist = wt - curr
        if (Math.abs(dist) < 3) {
          wanderTargetRef.current = null
          nextWanderRef.current = now + 1500 + Math.random() * 4000
        } else {
          const dx = dist > 0 ? SPEED : -SPEED
          const newX = Math.max(0, Math.min(window.innerWidth - W, curr + dx))
          xRef.current = newX; setX(newX); setDir(dx > 0 ? 1 : -1)
          shouldMove = true
        }
      } else if (now > nextWanderRef.current) {
        wanderTargetRef.current = 20 + Math.random() * (window.innerWidth - W - 40)
      }

      if (shouldMove !== movingRef.current) { movingRef.current = shouldMove; setMoving(shouldMove) }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div className={`stickman-walker${moving ? ' stick-moving' : ''}`} style={{ left: x, transform: `scaleX(${dir})` }}>
      <svg width="68" height="39" viewBox="0 0 105 60" style={{ overflow: 'visible' }}>
        {/* HEAD */}
        <circle cx="16" cy="8" r="7" fill="none" stroke="#333" strokeWidth="2"/>
        {/* BODY */}
        <line x1="16" y1="15" x2="16" y2="38" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Left arm — holds leash, static */}
        <line x1="16" y1="23" x2="29" y2="33" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
        {/* Right arm — swings */}
        <path className="stick-arm" d="M16 23 L5 18" stroke="#333" strokeWidth="2" strokeLinecap="round" fill="none"/>
        {/* Legs */}
        <path className="stick-leg-a" d="M16 38 L9 54" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path className="stick-leg-b" d="M16 38 L23 54" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

        {/* LEASH */}
        <path d="M29 33 Q52 52 67 46" fill="none" stroke="#8a6535" strokeWidth="1.5" strokeLinecap="round"/>

        {/* CAT */}
        {/* Tail — curling up from back of body */}
        <path d="M67 52 Q60 38 66 31 Q71 27 73 35" fill="none" stroke="#999" strokeWidth="2.2" strokeLinecap="round"/>
        {/* Body */}
        <ellipse cx="80" cy="51" rx="13" ry="7" fill="#e8e8e8" stroke="#999" strokeWidth="1.2"/>
        {/* Head */}
        <circle cx="91" cy="43" r="7.5" fill="#e8e8e8" stroke="#999" strokeWidth="1.2"/>
        {/* Ears */}
        <polygon points="87,37 84,30 90,36" fill="#e8e8e8" stroke="#999" strokeWidth="1" strokeLinejoin="round"/>
        <polygon points="94,36 96,29 99,37" fill="#e8e8e8" stroke="#999" strokeWidth="1" strokeLinejoin="round"/>
        <polygon points="87,37 85,32 89,36" fill="#ffb0b0" opacity="0.55"/>
        <polygon points="95,36 96,31 98,37" fill="#ffb0b0" opacity="0.55"/>
        {/* Eyes */}
        <ellipse cx="89" cy="42" rx="1.4" ry="2" fill="#222"/>
        <ellipse cx="94" cy="42" rx="1.4" ry="2" fill="#222"/>
        <circle cx="89.5" cy="41" r="0.6" fill="white"/>
        <circle cx="94.5" cy="41" r="0.6" fill="white"/>
        {/* Nose */}
        <polygon points="91,46 92.5,47.5 94,46" fill="#ffaaaa"/>
        {/* Whiskers */}
        <line x1="86" y1="45" x2="81" y2="44" stroke="#bbb" strokeWidth="0.8"/>
        <line x1="86" y1="47" x2="81" y2="48" stroke="#bbb" strokeWidth="0.8"/>
        <line x1="97" y1="45" x2="102" y2="44" stroke="#bbb" strokeWidth="0.8"/>
        <line x1="97" y1="47" x2="102" y2="48" stroke="#bbb" strokeWidth="0.8"/>
        {/* Far-side legs (static, slightly lighter) */}
        <line x1="73" y1="56" x2="71" y2="66" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="87" y1="56" x2="89" y2="66" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Near-side legs (animated) */}
        <path className="cat-leg-front" d="M75 56 L73 66" stroke="#999" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path className="cat-leg-back"  d="M85 56 L87 66" stroke="#999" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
    </div>
  )
}

function useTypingEffect(text, speed = 45) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])
  return displayed
}

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`fade-in ${visible ? 'fade-in-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function App() {
  const [lightbox, setLightbox] = useState(null)
  const [dark, setDark] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const heroTag = useTypingEffect('Data Analyst · Singapore')

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id) })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

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
          <span className="nav-name">Matthew Chan</span>
          <div className="nav-links">
            <a href="https://www.linkedin.com/in/matthewmcsl/" target="_blank" rel="noreferrer" className="nav-thoughts nav-linkedin">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <Link to="/thoughts" className="nav-thoughts">Thoughts 💬</Link>
            <button className="theme-toggle" onClick={toggleDark} aria-label="Toggle dark mode">
              {dark ? 'Toggle Light Mode ☀️' : 'Toggle Dark Mode 🌙'}
            </button>
          </div>
        </div>
      </nav>

      <main className="main">

        <section className="hero">
          <img
            src={profileImg}
            alt="Matthew Chan"
            className="hero-photo"
            onClick={() => setLightbox(profileImg)}
          />
          <div className="hero-tag-row">
            <p className="hero-tag">{heroTag}<span className="typing-cursor">|</span></p>
            <img src="https://cdn.simpleicons.org/bytedance/000000" alt="ByteDance" className="hero-logo" />
            <img src="https://cdn.simpleicons.org/tiktok/000000" alt="TikTok" className="hero-logo" />
          </div>
          <h1 className="hero-name">
            <span className="hero-name-egg">
              Matthew Chan
              <div className="hero-egg-card">
                <span>👨 Male</span>
                <span>🎂 Age 29</span>
              </div>
            </span>
          </h1>
          <p className="hero-bio">
            Data professional turning complex datasets into clear, actionable insights.
            Currently building analytics at TikTok. Also, extremely passionate about technology
            and artificial intelligence. Case in point: this website was built entirely
            using <a href="https://claude.ai" target="_blank" rel="noreferrer" className="bio-link">Claude.ai</a>.
          </p>
        </section>

        <FadeIn>
          <div className="heatmap-wrapper">
            <p className="heatmap-title">Career at a Glance</p>
            <div className="heatmap">
              {INDUSTRIES.map((industry, i) => {
                const totalMonths = industry.companies.reduce((s, c) => s + c.months, 0)
                return (
                  <div
                    key={i}
                    className="heatmap-block"
                    style={{ flex: totalMonths, backgroundColor: industry.color }}
                  >
                    <div>
                      <span className="heatmap-company">{industry.name}</span>
                      <div className="heatmap-companies-list">
                        {industry.companies.map((c, j) => (
                          <span key={j} className="heatmap-sub-company">
                            {c.company}{c.current && <span className="heatmap-current-tag"> (Current)</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="heatmap-tenure">{formatTenure(totalMonths)}</span>
                    <div className="heatmap-tooltip">
                      <strong>{industry.name}</strong>
                      {industry.companies.map((c, j) => (
                        <span key={j}>{c.company} · {formatTenure(c.months)}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </FadeIn>

        {lightbox && (
          <div className="lightbox" onClick={() => setLightbox(null)}>
            <img src={lightbox} alt="" className="lightbox-img" />
          </div>
        )}

        <FadeIn>
          <section id="about" className="section">
            <h2 className="section-title">About</h2>
            <p className="section-text">
              I'm a data analyst with a passion for making sense of large datasets and communicating
              findings that drive real decisions. With experience across fast-moving tech companies,
              healthcare, and academia, I bring both technical rigour and business context to every
              problem I work on.
            </p>
          </section>
        </FadeIn>

        <FadeIn>
          <section id="experience" className="section">
            <h2 className="section-title">Experience</h2>
            <div className="timeline">
              {EXPERIENCE.map((job, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <span className="timeline-role">{job.role}</span>
                        <span className="timeline-period">{job.period}</span>
                      </div>
                      <span className="timeline-company">{job.company}</span>
                      {job.description && (
                        <p className="timeline-description">{job.description}</p>
                      )}
                      {job.award && (
                        <button
                          className="timeline-award"
                          onClick={() => setLightbox(job.award.img)}
                        >
                          <span className="award-icon">🏅</span>
                          <span className="award-label">{job.award.label}</span>
                        </button>
                      )}
                      {job.publication && (
                        <a
                          href={job.publication.url}
                          target="_blank"
                          rel="noreferrer"
                          className="timeline-publication"
                        >
                          <span className="publication-note">{job.publication.note}</span>
                          <span className="publication-title">{job.publication.title}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section id="education" className="section">
            <h2 className="section-title">Education</h2>
            <div className="timeline">
              <FadeIn delay={0}>
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <span className="timeline-role">Bachelor of Science in Business Analytics</span>
                      <span className="timeline-period">2018 – 2022</span>
                    </div>
                    <span className="timeline-company">Singapore University of Social Sciences</span>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <span className="timeline-role">Diploma in Financial Informatics</span>
                      <span className="timeline-period">2013 – 2016</span>
                    </div>
                    <span className="timeline-company">Ngee Ann Polytechnic</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section id="skills" className="section">
            <h2 className="section-title">Skills</h2>
            <div className="skills-list">
              {['SQL', 'Python', 'Dashboarding', 'Statistical Analysis', 'Machine Learning'].map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section id="contact" className="section">
            <h2 className="section-title">Contact</h2>
            <div className="contact-links">
              <a href="mailto:matthew97chan@gmail.com" className="contact-item">
                <span className="contact-label">Email</span>
                <span className="contact-value">matthew97chan@gmail.com</span>
              </a>
              <a href="https://github.com/Matthewmcsl" target="_blank" rel="noreferrer" className="contact-item">
                <span className="contact-label">GitHub</span>
                <span className="contact-value">github.com/Matthewmcsl</span>
              </a>
              <a href="https://www.linkedin.com/in/matthewmcsl/" target="_blank" rel="noreferrer" className="contact-item">
                <span className="contact-label">LinkedIn</span>
                <span className="contact-value">linkedin.com/in/matthewmcsl</span>
              </a>
            </div>
          </section>
        </FadeIn>

      </main>

      <nav className="toc">
        {NAV_LINKS.map(link => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className={`toc-link ${activeSection === link.toLowerCase() ? 'toc-link-active' : ''}`}
          >
            <span className="toc-dot" />
            <span className="toc-label">{link}</span>
          </a>
        ))}
      </nav>

      <button
        className={`back-to-top ${showTop ? 'back-to-top-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Matthew Chan</p>
      </footer>

      <StickmanWalker />
    </>
  )
}
