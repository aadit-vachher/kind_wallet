export default function BalancePanel({ balance, spentThisMonth, monthlyBudget, savingsGoal, savingsProgress }) {
  const remaining = Math.max(0, monthlyBudget - spentThisMonth)
  const progressPct = Math.min(100, Math.round((savingsProgress / savingsGoal) * 100))
  return (
    <div className="card balance-card fade-in">
      <div className="balance-header">
        <div className="balance-amount">₹{balance.toLocaleString('en-IN')}</div>
        <div className="balance-subtle">Total Available</div>
      </div>
      <div className="metrics">
        <div className="metric">
          <div className="label">Spent This Month</div>
          <div className="value">₹{spentThisMonth.toLocaleString('en-IN')}</div>
        </div>
        <div className="metric">
          <div className="label">Remaining Budget</div>
          <div className="value">₹{remaining.toLocaleString('en-IN')}</div>
        </div>
        <div className="metric">
          <div className="label">Savings Goal Progress</div>
          <div className="progress" aria-label={`Savings progress ${progressPct}%`}>
            <span style={{ width: `${progressPct}%` }} />
          </div>
          <div className="value">₹{savingsProgress.toLocaleString('en-IN')} / ₹{savingsGoal.toLocaleString('en-IN')} ({progressPct}%)</div>
        </div>
      </div>
    </div>
  )
}
