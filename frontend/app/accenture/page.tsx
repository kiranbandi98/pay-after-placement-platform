import Link from "next/link";

export default function AccenturePage() {

const cardStyle = {
backgroundColor: "#111",
border: "1px solid #333",
borderRadius: "16px",
padding: "25px",
textAlign: "center" as const,
};

const buttonStyle = {
marginTop: "15px",
padding: "12px 24px",
border: "none",
borderRadius: "10px",
background:
"linear-gradient(90deg,#8b5cf6,#a855f7)",
color: "white",
cursor: "pointer",
fontWeight: "bold",
};

return (
<main
style={{
minHeight: "100vh",
backgroundColor: "#000",
color: "white",
padding: "40px",
fontFamily: "Arial, sans-serif",
}}
>

```
  <div
    style={{
      textAlign: "center",
      marginBottom: "50px",
    }}
  >
    <h1
      style={{
        fontSize: "42px",
      }}
    >
      Accenture Placement Preparation
    </h1>

    <p
      style={{
        color: "#a1a1aa",
        fontSize: "18px",
      }}
    >
      Complete all rounds to prepare for Accenture placements
    </p>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(280px,1fr))",
      gap: "20px",
    }}
  >

    <div style={cardStyle}>
      <h2>📝 Technical Test</h2>
      <p>
        Practice Accenture technical MCQs
      </p>

      <Link href="/accenture/technical/test">
        <button style={buttonStyle}>
          Start Test
        </button>
      </Link>
    </div>

    <div style={cardStyle}>
      <h2>🧠 Cognitive Test</h2>
      <p>
        Improve logical and aptitude skills
      </p>

      <Link href="/accenture/cognitive">
        <button style={buttonStyle}>
          Start Test
        </button>
      </Link>
    </div>

    <div style={cardStyle}>
      <h2>🎮 Cognitive Gaming</h2>
      <p>
        Practice Accenture game-based rounds
      </p>

      <Link href="/accenture/cognitive-game">
        <button style={buttonStyle}>
          Start Game
        </button>
      </Link>
    </div>

    <div style={cardStyle}>
      <h2>💻 Coding Round</h2>
      <p>
        Solve coding questions
      </p>

      <Link href="/accenture/coding">
        <button style={buttonStyle}>
          Start Coding
        </button>
      </Link>
    </div>

    <div style={cardStyle}>
      <h2>🗣 Communication Round</h2>
      <p>
        Improve spoken communication
      </p>

      <Link href="/accenture/communication">
        <button style={buttonStyle}>
          Start Round
        </button>
      </Link>
    </div>

    <div style={cardStyle}>
      <h2>👔 Behavioral Round</h2>
      <p>
        Practice HR interview questions
      </p>

      <Link href="/accenture/behavioral">
        <button style={buttonStyle}>
          Start Round
        </button>
      </Link>
    </div>

    <div style={cardStyle}>
      <h2>🎤 Mock Interview</h2>
      <p>
        Simulate a real interview
      </p>

      <Link href="/accenture/mock-interview">
        <button style={buttonStyle}>
          Start Interview
        </button>
      </Link>
    </div>

    <div style={cardStyle}>
      <h2>🏆 Leaderboard</h2>
      <p>
        Compare your performance
      </p>

      <Link href="/accenture/leaderboard">
        <button style={buttonStyle}>
          View Ranking
        </button>
      </Link>
    </div>

  </div>

</main>


);
}
