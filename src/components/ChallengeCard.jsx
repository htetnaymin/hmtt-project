export default function ChallengeCard({ challengeName }) {
  return (
    <div className="card challenge-card">
      <h3>{challengeName || "Challenge Name"}</h3>
    </div>
  );
}