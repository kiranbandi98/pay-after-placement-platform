import Link from "next/link";

export default function Dashboard() {

  const handleLogout = () => {

    localStorage.removeItem("studentEmail");
    localStorage.removeItem("studentName");

    window.location.href = "/login";

  };

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

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

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
          <button>Accenture Practice</button>
        </Link>

        <Link href="/accenture/coding">
          <button>Coding Round</button>
        </Link>

        <Link href="/accenture/communication">
          <button>Communication Test</button>
        </Link>

        <Link href="/accenture/behavioral">
          <button>Behavioral Round</button>
        </Link>

        <Link href="/mock-interview">
          <button>Mock Interview</button>
        </Link>
      </div>
    </main>
  );
}