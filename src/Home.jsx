import BalancePanel from './components/BalancePanel.jsx'
import NudgeCard from './components/NudgeCard.jsx'
import ActionButtons from './components/ActionButtons.jsx'
import TransactionList from './components/TransactionList.jsx'

export default function Home({ data, onSend, onRequest, onAdd }) {
  const { balance, spentThisMonth, monthlyBudget, savingsGoal, savingsProgress, transactions } = data
  const spentVsLastWeekPct = 12
  return (
    <div className="container content">
      <div className="grid" style={{marginBottom: 16}}>
        <BalancePanel
          balance={balance}
          spentThisMonth={spentThisMonth}
          monthlyBudget={monthlyBudget}
          savingsGoal={savingsGoal}
          savingsProgress={savingsProgress}
        />
      </div>

      <div className="grid grid-2" style={{marginBottom: 16}}>
        <div className="nudges">
          <div className="section-title">Smart Awareness</div>
          <NudgeCard title="Gentle reminder" message={`You've spent ${spentVsLastWeekPct}% more than last week.`} />
          <NudgeCard title="Compounding helps" message="Saving ₹500/month builds ~₹60,000 in a year." />
          <NudgeCard title="On track" message="You are on track to reach your savings goal." />
        </div>
        <div>
          <div className="section-title">Primary Actions</div>
          <ActionButtons onSend={onSend} onRequest={onRequest} onAdd={onAdd} />
        </div>
      </div>

      <div className="grid" style={{marginBottom: 24}}>
        <div className="section-title">Recent Activity</div>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  )
}
