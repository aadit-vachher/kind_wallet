import { useState } from 'react'

export default function Navbar({ current, onNavigate }) {
  const [open, setOpen] = useState(false)
  const tabs = [
    { key: 'home', label: 'Home' },
    { key: 'budget', label: 'Budget' },
    { key: 'savings', label: 'Savings' },
    { key: 'activity', label: 'Activity' },
    { key: 'settings', label: 'Settings' },
  ]
  const handleNav = key => {
    onNavigate(key)
    setOpen(false)
  }
  return (
    <div className="navbar">
      <div className="nav-inner">
        <div className="brand">
          <span className="brand-badge">₹</span>
          Kind Wallet
        </div>
        <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
          <span />
          <span />
          <span />
        </button>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {tabs.map(t => (
            <button key={t.key} className={`nav-btn ${current===t.key ? 'active':''}`} onClick={() => handleNav(t.key)} aria-current={current===t.key ? 'page':undefined}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
