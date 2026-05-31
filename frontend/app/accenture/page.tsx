import Link from "next/link";

export default function AccenturePage() {
  const roundStyle = {
    backgroundColor: "#111",
    border: "1px solid #333",
    borderRadius: "18px",
    padding: "30px",
    marginBottom: "30px",
  };

  const cardStyle = {
    backgroundColor: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "16px",
    padding: "20px",
    flex: 1,
    minWidth: "280px",
  };

  const buttonStyle = {
    marginTop: "15px",
    padding: "12px 24px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(90deg,#8b5cf6,#a855f7)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
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
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "10px",
          }}
        >
          Accenture Hiring Process 2025
        </h1>

        <p
          style={{
            color: "#a1a1aa",
            fontSize: "18px",
          }}
        >
          Complete all rounds and prepare for Accenture placements
        </p>
      </div>

      {/* Round 1 */}
      <div style={roundStyle}>
        <h2 style={{ color: "#a855f7" }}>
          Round 1 - Assessment Round
        </h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <div style={cardStyle}>
            <h3>👔 Behavioral Assessment</h3>

            <p>54 Questions</p>
            <p>20 Minutes</p>
            <p>Psychometric Test</p>

            <Link href="/accenture/behavioral">
              <button style={buttonStyle}>
                Start Behavioral Round
              </button>
            </Link>
          </div>

          <div style={cardStyle}>
            <h3>🎮 Cognitive Gaming</h3>

            <p>3 Games</p>
            <p>20 Minutes</p>
            <p>Elimination Round</p>

            <Link href="/accenture/cognitive-game">
              <button style={buttonStyle}>
                Start Cognitive Gaming
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Round 2 */}
      <div style={roundStyle}>
        <h2 style={{ color: "#a855f7" }}>
          Round 2 - Technical Round
        </h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <div style={cardStyle}>
            <h3>📝 Technical Assessment</h3>

            <p>45 Questions</p>
            <p>45 Minutes</p>

            <Link href="/accenture/technical/test">
              <button style={buttonStyle}>
                Start Technical Test
              </button>
            </Link>
          </div>

          <div style={cardStyle}>
            <h3>💻 Coding Assessment</h3>

            <p>3 Coding Questions</p>
            <p>60 Minutes</p>

            <Link href="/accenture/coding">
              <button style={buttonStyle}>
                Start Coding Round
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Round 3 */}
      <div style={roundStyle}>
        <h2 style={{ color: "#a855f7" }}>
          Round 3 - Communication Round
        </h2>

        <div style={cardStyle}>
          <h3>🗣 Communication Assessment</h3>

          <p>Approximately 20 Questions</p>
          <p>30 Minutes</p>

          <Link href="/accenture/communication">
            <button style={buttonStyle}>
              Start Communication Round
            </button>
          </Link>
        </div>
      </div>

      {/* Round 4 */}
      <div style={roundStyle}>
        <h2 style={{ color: "#a855f7" }}>
          Round 4 - Final Interview
        </h2>

        <div style={cardStyle}>
          <h3>🎤 AI Mock Interview</h3>

          <p>Technical Questions</p>
          <p>HR Questions</p>
          <p>Resume Discussion</p>

          <Link href="/accenture/mock-interview">
            <button style={buttonStyle}>
              Start Interview
            </button>
          </Link>
        </div>
      </div>

      {/* Hiring Process Table */}
      <div
        style={{
          backgroundColor: "#111",
          border: "1px solid #333",
          borderRadius: "18px",
          padding: "30px",
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Accenture Hiring Process Summary
        </h2>

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#8b5cf6",
                }}
              >
                <th style={{ padding: "12px" }}>Round</th>
                <th style={{ padding: "12px" }}>Assessment</th>
                <th style={{ padding: "12px" }}>Questions</th>
                <th style={{ padding: "12px" }}>Duration</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={{ padding: "12px" }}>1</td>
                <td>Behavioral</td>
                <td>54</td>
                <td>20 min</td>
              </tr>

              <tr>
                <td style={{ padding: "12px" }}>1</td>
                <td>Cognitive Gaming</td>
                <td>3 Games</td>
                <td>20 min</td>
              </tr>

              <tr>
                <td style={{ padding: "12px" }}>2</td>
                <td>Technical MCQ</td>
                <td>45</td>
                <td>45 min</td>
              </tr>

              <tr>
                <td style={{ padding: "12px" }}>2</td>
                <td>Coding</td>
                <td>3</td>
                <td>60 min</td>
              </tr>

              <tr>
                <td style={{ padding: "12px" }}>3</td>
                <td>Communication</td>
                <td>20</td>
                <td>30 min</td>
              </tr>

              <tr>
                <td style={{ padding: "12px" }}>4</td>
                <td>Interview</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Notice */}
      <div
        style={{
          backgroundColor: "#2a1600",
          border: "1px solid orange",
          borderRadius: "12px",
          padding: "20px",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <h3>⚠ Important Notice</h3>

        <p>
          Every round is an elimination round.
        </p>

        <p>
          You must clear the current round before
          moving to the next round.
        </p>
      </div>

      {/* Leaderboard */}
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Link href="/accenture/leaderboard">
          <button style={buttonStyle}>
            🏆 View Leaderboard
          </button>
        </Link>
      </div>
    </main>
  );
}