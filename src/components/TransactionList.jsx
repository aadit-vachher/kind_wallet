export default function TransactionList({ transactions }) {
  return (
    <div className="card transactions fade-in" aria-label="Recent Activity">
      <div className="tx-row header">
        <div className="tx-cell">Person</div>
        <div className="tx-cell">Amount</div>
        <div className="tx-cell">Date</div>
        <div className="tx-cell">Category</div>
      </div>
      {transactions.map((t, idx) => (
        <div key={idx} className="tx-row">
          <div className="tx-cell tx-person" data-label="Person">{t.person}</div>
          <div className={`tx-cell tx-amount ${t.amount < 0 ? 'neg' : 'pos'}`} data-label="Amount">₹{Math.abs(t.amount).toLocaleString('en-IN')}</div>
          <div className="tx-cell tx-date" data-label="Date">{t.date}</div>
          <div className="tx-cell tx-category" data-label="Category">{t.category}</div>
        </div>
      ))}
    </div>
  )
}
