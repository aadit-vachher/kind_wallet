import { useMemo, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './Home.jsx'
import TransactionList from './components/TransactionList.jsx'

function Modal({ open, title, onClose, children }) {
  if (!open) return null
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  )
}

function App() {
  // Mock initial data per spec
  const [balance, setBalance] = useState(24500)
  const [spentThisMonth, setSpentThisMonth] = useState(9200)
  const [monthlyBudget, setMonthlyBudget] = useState(30000)
  const [savingsGoal, setSavingsGoal] = useState(100000)
  const [savingsProgress, setSavingsProgress] = useState(32000)
  const [transactions, setTransactions] = useState([
    { person: 'Asha', amount: -1200, date: '2025-12-02', category: 'Groceries' },
    { person: 'Ravi', amount: -3500, date: '2025-12-04', category: 'Rent' },
    { person: 'Neha', amount: 2000, date: '2025-12-09', category: 'Received' },
    { person: 'Metro', amount: -150, date: '2025-12-12', category: 'Transport' },
  ])
  const data = useMemo(() => ({ balance, spentThisMonth, monthlyBudget, savingsGoal, savingsProgress, transactions }), [balance, spentThisMonth, monthlyBudget, savingsGoal, savingsProgress, transactions])

  // Simple, reversible modals
  const [sendOpen, setSendOpen] = useState(false)
  const [reqOpen, setReqOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)

  // Form state
  const [form, setForm] = useState({ person: '', amount: '', category: '' })
  const resetForm = () => setForm({ person: '', amount: '', category: '' })

  // Reversible banner state
  const [lastAction, setLastAction] = useState(null)

  const confirmSend = () => {
    const amt = Math.max(0, Number(form.amount||0))
    if (!amt || !form.person || !form.category) { setSendOpen(false); resetForm(); return }
    const date = new Date().toISOString().slice(0,10)
    setBalance(b => Math.max(0, b - amt))
    setSpentThisMonth(s => s + amt)
    setTransactions(t => [{ person: form.person, amount: -amt, date, category: form.category }, ...t])
    setLastAction({
      message: `Sent ₹${amt.toLocaleString('en-IN')} to ${form.person}.`,
      undo: () => {
        setBalance(b => b + amt)
        setSpentThisMonth(s => Math.max(0, s - amt))
        setTransactions(t => t.filter((tx, i) => !(i===0 && tx.person===form.person && tx.amount===-amt && tx.date===date && tx.category===form.category)))
      }
    })
    setSendOpen(false); resetForm()
  }
  const confirmRequest = () => {
    const amt = Math.max(0, Number(form.amount||0))
    if (!amt || !form.person) { setReqOpen(false); resetForm(); return }
    const date = new Date().toISOString().slice(0,10)
    setBalance(b => b + amt)
    setTransactions(t => [{ person: form.person, amount: amt, date, category: 'Received' }, ...t])
    setLastAction({
      message: `Recorded ₹${amt.toLocaleString('en-IN')} received from ${form.person}.`,
      undo: () => {
        setBalance(b => Math.max(0, b - amt))
        setTransactions(t => t.filter((tx, i) => !(i===0 && tx.person===form.person && tx.amount===amt && tx.date===date && tx.category==='Received')))
      }
    })
    setReqOpen(false); resetForm()
  }
  const confirmAdd = () => {
    const amt = Math.max(0, Number(form.amount||0))
    if (!amt) { setAddOpen(false); resetForm(); return }
    const date = new Date().toISOString().slice(0,10)
    const addToSavings = Math.round(amt * 0.2)
    setBalance(b => b + amt)
    setSavingsProgress(s => s + addToSavings)
    setTransactions(t => [{ person: 'Bank Top-up', amount: amt, date, category: 'Top-up' }, ...t])
    setLastAction({
      message: `Added ₹${amt.toLocaleString('en-IN')} to wallet (₹${addToSavings.toLocaleString('en-IN')} to savings).`,
      undo: () => {
        setBalance(b => Math.max(0, b - amt))
        setSavingsProgress(s => Math.max(0, s - addToSavings))
        setTransactions(t => t.filter((tx, i) => !(i===0 && tx.person==='Bank Top-up' && tx.amount===amt && tx.date===date && tx.category==='Top-up')))
      }
    })
    setAddOpen(false); resetForm()
  }

  const [view, setView] = useState('home')

  return (
    <div className="app-shell">
      <Navbar current={view} onNavigate={setView} />
      {view === 'home' && (
        <>
          {lastAction && (
            <div className="container" style={{paddingTop: 16}}>
              <div className="card panel fade-in" role="status" aria-live="polite" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap: 8}}>
                <div>{lastAction.message}</div>
                <div style={{display:'flex', gap:8}}>
                  <button onClick={() => { lastAction.undo(); setLastAction(null) }}>Undo</button>
                  <button onClick={() => setLastAction(null)}>Dismiss</button>
                </div>
              </div>
            </div>
          )}
          <Home data={data} onSend={() => setSendOpen(true)} onRequest={() => setReqOpen(true)} onAdd={() => setAddOpen(true)} />
        </>
      )}
      {view === 'budget' && (
        <div className="container content">
          <div className="card panel fade-in">
            <h2>Budget</h2>
            <p>Set a monthly budget to guide your spending with awareness.</p>
            <div className="field" style={{marginTop: 8}}>
              <label htmlFor="budget">Monthly Budget (₹)</label>
              <input id="budget" type="number" min="0" value={monthlyBudget} onChange={e => setMonthlyBudget(Number(e.target.value||0))} />
            </div>
          </div>
        </div>
      )}
      {view === 'savings' && (
        <div className="container content">
          <div className="card panel fade-in">
            <h2>Savings</h2>
            <p>Goal: ₹{savingsGoal.toLocaleString('en-IN')} • Progress: ₹{savingsProgress.toLocaleString('en-IN')}</p>
            <div className="progress" style={{marginTop: 10}}>
              <span style={{ width: `${Math.min(100, Math.round((savingsProgress/savingsGoal)*100))}%` }} />
            </div>
          </div>
        </div>
      )}
      {view === 'activity' && (
        <div className="container content">
          <div className="section-title">All Activity</div>
          <TransactionList transactions={transactions} />
        </div>
      )}
      {view === 'settings' && (
        <div className="container content">
          <div className="card panel fade-in">
            <h2>Settings</h2>
            <p>Configure preferences. No notifications are sent by default.</p>
            <div className="field" style={{marginTop: 8}}>
              <label htmlFor="goal">Savings Goal (₹)</label>
              <input id="goal" type="number" min="0" value={savingsGoal} onChange={e => setSavingsGoal(Number(e.target.value||0))} />
            </div>
          </div>
        </div>
      )}

      {/* Modals - reversible, no urgency */}
      <Modal open={sendOpen} title="Send Money" onClose={() => { setSendOpen(false); resetForm(); }}>
        <form onSubmit={e => { e.preventDefault(); confirmSend(); }}>
          <div className="field">
            <label htmlFor="send-person">Person</label>
            <input id="send-person" value={form.person} onChange={e => setForm(f => ({...f, person: e.target.value}))} />
          </div>
          <div className="field">
            <label htmlFor="send-amount">Amount (₹)</label>
            <input id="send-amount" type="number" min="0" value={form.amount} onChange={e => setForm(f => ({...f, amount: e.target.value}))} />
          </div>
          <div className="field">
            <label htmlFor="send-cat">Category</label>
            <select id="send-cat" value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}>
              <option value="" disabled>Select category</option>
              <option>General</option>
              <option>Groceries</option>
              <option>Transport</option>
              <option>Bills</option>
              <option>Rent</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={() => { setSendOpen(false); resetForm(); }}>Cancel</button>
            <button type="submit">Confirm Send</button>
          </div>
        </form>
      </Modal>

      <Modal open={reqOpen} title="Request Money" onClose={() => { setReqOpen(false); resetForm(); }}>
        <form onSubmit={e => { e.preventDefault(); confirmRequest(); }}>
          <div className="field">
            <label htmlFor="req-person">Person</label>
            <input id="req-person" value={form.person} onChange={e => setForm(f => ({...f, person: e.target.value}))} />
          </div>
          <div className="field">
            <label htmlFor="req-amount">Amount (₹)</label>
            <input id="req-amount" type="number" min="0" value={form.amount} onChange={e => setForm(f => ({...f, amount: e.target.value}))} />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={() => { setReqOpen(false); resetForm(); }}>Cancel</button>
            <button type="submit">Confirm Request</button>
          </div>
        </form>
      </Modal>

      <Modal open={addOpen} title="Add Funds" onClose={() => { setAddOpen(false); resetForm(); }}>
        <form onSubmit={e => { e.preventDefault(); confirmAdd(); }}>
          <div className="field">
            <label htmlFor="add-amount">Amount (₹)</label>
            <input id="add-amount" type="number" min="0" value={form.amount} onChange={e => setForm(f => ({...f, amount: e.target.value}))} />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={() => { setAddOpen(false); resetForm(); }}>Cancel</button>
            <button type="submit">Confirm Add</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default App
