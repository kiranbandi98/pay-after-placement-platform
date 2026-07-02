import Link from "next/link";

export default function TCSPage() {
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
          TCS Hiring Process 2025 & 2026
        </h1>

        <p
          style={{
            color: "#a1a1aa",
            fontSize: "18px",
          }}
        >
          Complete all rounds and prepare for TCS placements
        </p>
      </div>

      {/* Round 1 */}
<div style={roundStyle}>
  <h2 style={{ color: "#a855f7" }}>
    Round 1 - Foundation Assessment
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
      <h3>🔢 Numerical Ability</h3>

      <p>20 Questions</p>
      <p>25 Minutes</p>
      <p>Foundation Section</p>

      <button
        style={{
          ...buttonStyle,
          background: "#555",
          cursor: "not-allowed",
        }}
      >
        Coming Soon
      </button>
    </div>

    <div style={cardStyle}>
      <h3>🧠 Reasoning Ability</h3>

      <p>20 Questions</p>
      <p>25 Minutes</p>
      <p>Foundation Section</p>

      <button
        style={{
          ...buttonStyle,
          background: "#555",
          cursor: "not-allowed",
        }}
      >
        Coming Soon
      </button>
    </div>

    <div style={cardStyle}>
      <h3>📖 Verbal Ability</h3>

      <p>25 Questions</p>
      <p>25 Minutes</p>
      <p>Foundation Section</p>

      <button
        style={{
          ...buttonStyle,
          background: "#555",
          cursor: "not-allowed",
        }}
      >
        Coming Soon
      </button>
    </div>

    <div style={cardStyle}>
      <h3>📊 Foundation Result</h3>

      <p>Available after completing</p>
      <p>Numerical + Reasoning + Verbal</p>

      <button
        style={{
          ...buttonStyle,
          background: "#555",
          cursor: "not-allowed",
        }}
      >
        Locked
      </button>
    </div>
  </div>
</div>

       {/* Round 2 */}
<div style={roundStyle}>
  <h2 style={{ color: "#a855f7" }}>
    Round 2 - Advanced Assessment
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
      <h3>🧮 Advanced Quants</h3>

      <p>14–16 Questions</p>
      <p>25 Minutes</p>
      <p>Digital & Prime Profile</p>

      <button
        style={{
          ...buttonStyle,
          background: "#555",
          cursor: "not-allowed",
        }}
      >
        Coming Soon
      </button>
    </div>

    <div style={cardStyle}>
      <h3>💻 Advanced Coding</h3>

      <p>2 Coding Questions</p>
      <p>90 Minutes</p>
      <p>Medium to Hard Level</p>

      <Link href="/tcs/coding">
        <button style={buttonStyle}>
          Start Coding Round
        </button>
      </Link>
    </div>
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
          TCS Hiring Process Summary
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
                <td>Numerical Ability</td>
                <td>20</td>
                <td>25 Minutes</td>
              </tr>

              <tr>
                <td style={{ padding: "12px" }}>1</td>
                <td>Reasoning Ability</td>
                <td>20</td>
                <td>25 Minutes</td>
              </tr>

              <tr>
                <td style={{ padding: "12px" }}>1</td>
                <td>Verbal Ability</td>
                <td>25</td>
                <td>25 Minutes</td>
              </tr>

              <tr>
                <td style={{ padding: "12px" }}>2</td>
                <td>Advanced Quants</td>
                <td>14–16</td>
                <td>25 Minutes</td>
              </tr>

              <tr>
                <td style={{ padding: "12px" }}>2</td>
                <td>Advanced Coding</td>
                <td>2 Coding Questions</td>
                <td>90 Minutes</td>
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
          Every section is important in the TCS hiring process.
        </p>

        <p>
          Complete the Foundation Assessment before attempting the
          Advanced Coding Round.
        </p>
      </div>

      {/* Leaderboard */}
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Link href="/tcs/leaderboard">
          <button style={buttonStyle}>
            🏆 View TCS Leaderboard
          </button>
        </Link>
      </div>
    </main>
  );
}