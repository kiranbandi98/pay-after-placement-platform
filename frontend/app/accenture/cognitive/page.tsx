import Link from "next/link";

export default function CognitivePage() {
  return (
    <main style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Accenture Cognitive Ability Test</h1>

      <p>Select the section</p>

      <div style={{ marginTop: "40px" }}>
        <Link href="/accenture/cognitive/test">
          <button style={{ padding: "12px", margin: "10px" }}>
            Start Cognitive Test
          </button>
        </Link>
      </div>
    </main>
  );
}