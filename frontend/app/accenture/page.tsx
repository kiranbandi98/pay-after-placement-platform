import Link from "next/link";

export default function AccenturePage() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Accenture Test</h1>

      <br />

      <Link href="/accenture/technical/test">
        <button>Start Technical Test</button>
      </Link>

      <br /><br />

      <Link href="/accenture/cognitive">
        <button>Cognitive Test</button>
      </Link>

      <br /><br />

<Link href="/accenture/cognitive-game">
  <button>Cognitive Gaming</button>
</Link>

      <br /><br />

      <Link href="/accenture/coding">
        <button>Coding Round</button>
      </Link>

      <br /><br />
      <Link href="/accenture/communication">
  <button>Communication Round</button>
</Link>

<br /><br />

<Link href="/accenture/behavioral">
  <button>Behavioral Round</button>
</Link>

<br /><br />

<Link href="/accenture/mock-interview">
  <button>Mock Interview</button>
</Link>
      

      <br /><br />

      <Link href="/accenture/leaderboard">
        <button>Leaderboard</button>
      </Link>
    </div>
  );
}