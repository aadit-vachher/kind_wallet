export default function NudgeCard({ title, message }) {
  return (
    <div className="card nudge fade-in" role="note">
      <div>
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
    </div>
  )
}
