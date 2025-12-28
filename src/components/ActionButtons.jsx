export default function ActionButtons({ onSend, onRequest, onAdd }) {
  return (
    <div className="card panel actions fade-in">
      <button className="btn-secondary" onClick={onSend}>Send Money</button>
      <button className="btn-secondary" onClick={onRequest}>Request Money</button>
      <button className="btn-secondary" onClick={onAdd}>Add Funds</button>
    </div>
  )
}
