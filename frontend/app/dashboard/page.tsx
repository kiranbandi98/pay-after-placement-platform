import Link from "next/link";

export default function Dashboard() {
  return (
    <main
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Student Dashboard</h1>

      <p style={{ fontSize: "18px", marginTop: "10px" }}>
        Welcome to Pay After Placement Platform
      </p>

      <div
        style={{
          marginTop: "60px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "25px",
        }}
      >
        <Link href="/accenture">
          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Accenture Practice
          </button>
        </Link>

        <Link href="/accenture/coding">
          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Coding Round
          </button>
        </Link>

        <Link href="/accenture/communication">
          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Communication Test
          </button>
        </Link>
<Link href="/accenture/behavioral">        
  <button
    style={{
      padding: "14px 28px",
      fontSize: "16px",
      cursor: "pointer",
    }}
  >
    Behavioral Round
  </button>
</Link>

        <Link href="/mock-interview">
          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Mock Interview
          </button>
        </Link>
      </div>
    </main>
  );
}