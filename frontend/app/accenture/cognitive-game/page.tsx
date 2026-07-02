
"use client";

import { useState, useEffect } from "react";

export default function CognitiveGame() {

  const btnStyle = {
  margin: "6px",
  padding: "10px 18px",
  borderRadius: "12px",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.2s"
};

  const [section, setSection] = useState(1);
  const [mode, setMode] = useState<"test" | "practice" | null>(null);

  const [section1Score, setSection1Score] = useState(0);
  const [section2Completed, setSection2Completed] = useState(false);
  const [section3Completed, setSection3Completed] = useState(false);
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const [tileFlipIndex, setTileFlipIndex] = useState(Array(9).fill(0));
  
  const [rocketPos3, setRocketPos3] = useState(0); // 3x3
const [rocketPos4, setRocketPos4] = useState(8);

  const [rocketTime, setRocketTime] = useState(240); // 4 minutes
  
   const runRocket = () => {
  let current: number;
  let earthTile: number;
  let entry: string;

  if (section === 1) {
    current = 0;       // 3x3
    earthTile = 2;
    entry = "left";
  }

  else if (section === 2) {
    current = 8;       // 4x4
    earthTile = 3;
    entry = "left";
  }

  else {
    current = 20;      // 5x5
    earthTile = 4;
    entry = "left";
  }

  // ✅ ONLY 4x4 LOGIC
  if (section === 2) {

    current = 8;
    entry = "left";

    const directions: Record<number, { from: string; to: string }> = {
      8:  { from: "left",   to: "down" },
      12: { from: "up",    to: "right" },
      13: { from: "left",   to: "right" },
      14: { from: "left",   to: "up" },
      10: { from: "down",   to: "up" },

      6:  { from: "down", to: "left" },
      5:  { from: "right",  to: "up" },
      1:  { from: "down", to: "right" },

      2:  { from: "left",   to: "right" },
      3:  { from: "left",   to: "right" }
    };

    setRocketPos4(current);

    const interval = setInterval(() => {

      const tile = directions[current];
      console.log("Current:", current);
      console.log("Tile:", current, "Entry:", entry);


       if (!tile) {
  clearInterval(interval);
  alert("❌ Invalid tile");
  return;
}
// ✅ ADD THIS
  if (tile.from !== entry) {
    clearInterval(interval);
    alert("❌ Please correct the path");
    return;
  }

      const exit = tile.to;

       if (current === 3) {
  clearInterval(interval);
  alert("🚀 Reached Earth!");
  return;
}

      let next = current;
      if (exit === "right") next = current + 1;
else if (exit === "left") next = current - 1;
else if (exit === "up") next = current - 4;
else if (exit === "down") next = current + 4;

console.log("Current:", current, "Next:", next);
// ✅ FIX — MOVE THIS HERE
 entry =
  exit === "right" ? "left" :
  exit === "left" ? "right" :
  exit === "up" ? "down" :
  "up";
   

      current = next;

      setRocketPos4(current);
      // ✅ CHECK HERE (CORRECT PLACE)
if (current === 3) {
  clearInterval(interval);
  alert("🚀 Reached Earth!");
  return;
}
      
    }, 500);
  }
};
   const getInitialTiles = (lvl: number) => {
 if (lvl === 1) {
  return [
    0, 0, 0,
    0, 0, 0,
    2, 0, 0
  ];
}

  if (lvl === 2) {
    return Array(16).fill(0);
  }

  return Array(25).fill(0);
};

const [tileRotation, setTileRotation] = useState(getInitialTiles(1));
  // ---------------- SECTION 1 ----------------
  const questions = [
    { bubbles: ["2+1", "5-1", "3"], answers: [3, 4, 3] },
    { bubbles: ["4+1", "2+2", "6-1"], answers: [5, 4, 5] },
    { bubbles: ["3+2", "7-3", "4"], answers: [5, 4, 4] },
    { bubbles: ["6-2", "2+1", "5"], answers: [4, 3, 5] },
    { bubbles: ["8-4", "1+2", "6"], answers: [4, 3, 6] },

    { bubbles: ["15-10", "4+3", "2*3"], answers: [5, 7, 6] },
    { bubbles: ["20/2", "5*2", "18-8"], answers: [10, 10, 10] },
    { bubbles: ["9+3", "16-4", "2*6"], answers: [12, 12, 12] },
    { bubbles: ["14-6", "3*3", "5+4"], answers: [8, 9, 9] },
    { bubbles: ["12/3", "2*5", "6+2"], answers: [4, 10, 8] },

    { bubbles: ["25-13", "4*3", "36/3"], answers: [12, 12, 12] },
    { bubbles: ["18/3", "7+2", "3*3"], answers: [6, 9, 9] },
    { bubbles: ["45/5", "6*2", "10+2"], answers: [9, 12, 12] },
    { bubbles: ["30/3", "8+4", "5*2"], answers: [10, 12, 10] },
    { bubbles: ["50/5", "9+1", "3*4"], answers: [10, 10, 12] },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);

 
 // ---------------- SECTION 3 ----------------
const [level, setLevel] = useState(1); // ✅ NEW

useEffect(() => {
  if (level === 1) {
    setRocketPos3(0);   // 3x3 start
  }

  if (level === 2) {
    setRocketPos4(8);   // 4x4 start ✅ FIXED
  }

  // (optional future)
  // if (level === 3) {
  //   setRocketPos5(20);
  // }
}, [level]);

const [playerDoor, setPlayerDoor] = useState(6);
const [hasKey, setHasKey] = useState(false);
const [hitWall, setHitWall] = useState<number | null>(null);
const [levelsPassed, setLevelsPassed] = useState(0);
// ✅ GRID SIZE
// ✅ ADD THIS HERE
const [showResult, setShowResult] = useState(false);
const gridSize = level === 1 ? 3 : level === 2 ? 4 : 5;

// ✅ KEY & DOOR POSITIONS
const keyPos =
  level === 1 ? 1 :
  level === 2 ? 5 :
  7;

const doorPos =
  level === 1 ? 8 :
  level === 2 ? 15 :
  24;

// ✅ HIDDEN WALLS
const blockedPaths =
  level === 1
    ? [
        [0,1],[1,0],
        [4,1],[1,4],
        [5,8],[8,5],
      ]
    : level === 2
    ? [
        [6,7],[7,6],
        [8,9],[9,8],
        [10,11],[11,10],
      ]
    : [
        [6,7],[7,6],
        [8,9],[9,8],
        [12,13],[13,12],
        [15,16],[16,15],
        [18,19],[19,18],
      ];

function isBlocked(from: number, to: number) {
  return blockedPaths.some(([a, b]) => a === from && b === to);
}

// ✅ RESET PLAYER WHEN LEVEL CHANGES
useEffect(() => {
  if (level === 1) setPlayerDoor(6);
  if (level === 2) setPlayerDoor(12);
  if (level === 3) setPlayerDoor(20);
  setHasKey(false);
}, [level]);
 useEffect(() => {
  setTileRotation(getInitialTiles(level));

  // ✅ ADD THIS LINE
  setTileFlipIndex(
    Array(level === 1 ? 9 : level === 2 ? 16 : 25).fill(0)
  );

  setRocketPos3(0);
}, [level]);
// 🔥 CLICK MOVE
function handleCellClick(target: number) {
  const validMoves = [
    playerDoor - gridSize,
    playerDoor + gridSize,
    playerDoor - 1,
    playerDoor + 1,
  ];

  if (playerDoor % gridSize === 0 && target === playerDoor - 1) return;
  if (playerDoor % gridSize === gridSize - 1 && target === playerDoor + 1) return;

  if (!validMoves.includes(target)) return;

  if (isBlocked(playerDoor, target)) {
    setHitWall(target);

    setTimeout(() => {
      setHitWall(null);
      setPlayerDoor(level === 1 ? 6 : level === 2 ? 12 : 20);
      setHasKey(false);
    }, 400);

    return;
  }

  setPlayerDoor(target);

  if (target === keyPos) setHasKey(true);

  if (target === doorPos) {
    if (hasKey) {

      if (level === 1) {
         setLevelsPassed((prev) => prev + 1);
        alert("✅ Level 1 Completed");
        setLevel(2);
        return;
      }

      if (level === 2) {
         setLevelsPassed((prev) => prev + 1);
        alert("✅ Level 2 Completed");
        setLevel(3);
        return;
      }
 if (level === 3) {
  setLevelsPassed((prev) => prev + 1);

  setSection2Completed(true);

  alert("✅ Door & Key Completed");

  setSection(3); // Open Rocket Game

  return;
}

    } else {
      alert("❌ Need key first!");
    }
  }
}

  // ---------------- TIMER ----------------
  useEffect(() => {
    if (section !== 1) return;

    if (timeLeft === 0) {
      nextQuestion(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, section]);
  // ✅ ADD THIS FULL BLOCK HERE (ROCKET TIMER)
useEffect(() => {
  if (section !== 3) return;

   if (rocketTime === 0) {
  alert("⏱ Time Up!");
  setRocketPos3(0);
  return;
}

  const timer = setTimeout(() => {
    setRocketTime(prev => prev - 1);
  }, 1000);

  return () => clearTimeout(timer);
}, [rocketTime, section]);

  function handleClick(index: number) {
    let newSelected = [...selected];

    if (newSelected.includes(index)) {
      newSelected = newSelected.filter(i => i !== index);
    } else {
      newSelected.push(index);
    }

    setSelected(newSelected);

    if (newSelected.length === 3) {
      checkAnswer(newSelected);
    }
  }

  function checkAnswer(order: number[]) {
    const correctOrder = [...questions[current].answers]
      .map((val, i) => ({ val, i }))
      .sort((a, b) => a.val - b.val)
      .map(obj => obj.i);

    const isCorrect =
      JSON.stringify(order) === JSON.stringify(correctOrder);

    nextQuestion(isCorrect);
  }

  function nextQuestion(isCorrect: boolean) {
    if (isCorrect) setScore(prev => prev + 1);

    if (current < questions.length - 1) {
      setCurrent(prev => prev + 1);
      setSelected([]);
      setTimeLeft(15);
    } else {
      finishSection1();
    }
  }

 function finishSection1() {
  setSection1Score(score);
  alert(`Section 1 Completed\nScore: ${score}/15`);

  // ✅ Move to Door & Key
  setSection(2);
}

  function calculateFinalResult() {
    let passCount = 0;

    if (section1Score >= 8) passCount++;
    if (section2Completed) passCount++;
    if (section3Completed) passCount++;

    if (passCount >= 2) {
      alert("✅ You are eligible for Technical Round");
      window.location.href = "/accenture/technical/test";
    } else {
      alert("❌ You are not eligible. Try again.");
      window.location.href = "/accenture/behavioral";
    }
  }
   
type Direction = "right" | "left" | "up" | "down";
const getArrow = (dir: string, type: string) => {
  const normalize = (d: string) => {
    if (d === "top") return "up";
    if (d === "bottom") return "down";
    return d;
  };

  const d = normalize(dir);

  const fromMap: Record<string, string> = {
    right: "←",
    left: "→",
    up: "↓",
    down: "↑"
  };

  const toMap: Record<string, string> = {
    right: "→",
    left: "←",
    up: "↑",
    down: "↓"
  };

  return type === "from"
    ? fromMap[d] || ""
    : toMap[d] || "";
};
 function normalize(dir: string): Direction {
  if (dir === "top") return "up";
  if (dir === "bottom") return "down";
  return dir as Direction;
}
 
// ✅ ADD HERE (MIDDLE END)
function getTileDirection(index: number): [Direction, Direction] {
  const flip = tileFlipIndex[index] ?? 0;
  
 
 const convert = (from: string, to: string): [Direction, Direction] => {
  return [normalize(from), normalize(to)];
};
// ✅ ADD HERE ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  if (level === 2) {

    if (index === 0) {
  const map = [
    ["left","right"],
    ["right","left"]
  ];
  const [from, to] = map[flip % 2];
  return convert(from, to);
}
    if (index === 1) {
  const map = [
    ["bottom","right"],
    ["right","bottom"],

    ["right","left"],
    ["left","right"],

    ["left","bottom"],
    ["bottom","left"]
  ];

  const [from, to] = map[flip % 6];
  return convert(from, to);
}
     if (index === 2) {
  const map = [
    ["bottom","top"],
    ["top","bottom"]
  ];
  const [from, to] = map[flip % 2];
  return convert(from, to);
}
     if (index === 3) {
  const map = [
    ["left","right"],
    ["right","left"]
  ];
  const [from, to] = map[flip % 2];
  return convert(from, to);
}

    if (index === 4) {
  const map = [
    ["bottom","top"],
    ["top","bottom"]
  ];
  const [from, to] = map[flip % 2];
  return convert(from, to);
}
    if (index === 5) {
  const map = [
    ["right","top"],
    ["top","right"]
  ];
  const [from, to] = map[flip % 2];
  return convert(from, to);
}
    if (index === 6) {
  const map = [
    ["left","top"],
    ["top","left"]
  ];
  const [from, to] = map[flip % 2];
  return convert(from, to);
}
   if (index === 7) {
  const map = [
    ["left","right"],
    ["right","left"]
  ];
  const [from, to] = map[flip % 2];
  return convert(from, to);
}

      // TILE 8 (4x4) ✅ FIXED
if (index === 8) {
  const map = [
    ["up", "left"],   // default ✅
    ["left", "up"]    // flip ✅
  ];

  const [from, to] = map[flip % 2];
  return convert(from, to);
}
    if (index === 9) {
  const map = [
    ["left","right"],
    ["right","left"]
  ];
  const [from, to] = map[flip % 2];
  return convert(from, to);
}
    if (index === 10) {
  const map = [
    ["bottom","top"],
    ["top","bottom"]
  ];
  const [from, to] = map[flip % 2];
  return convert(from, to);
}
    if (index === 11) {
  const map = [
    ["left","right"],
    ["right","left"]
  ];
  const [from, to] = map[flip % 2];
  return convert(from, to);
}
    if (index === 12) {
  const map = [
    ["top","right"],
    ["right","top"],
    ["right","bottom"],
    ["bottom","right"],
    ["bottom","left"],
    ["left","bottom"],
    ["left","top"],
    ["top","left"]
  ];

  const safeIndex = (flip ?? 0) % map.length; // ✅ FIX
  const [from, to] = map[safeIndex];

  return convert(from, to);
}

    if (index === 13) {
  const map = [
    ["left","right"],
    ["right","left"]
  ];
  const [from, to] = map[flip % 2];
  return convert(from, to);
}
      if (index === 14) {
  const map = [
    ["right","down"],
    ["down","right"]
  ];

  const [from, to] = map[(flip ?? 0) % 2];
  return convert(from, to);
}

    if (index === 15) {
  const map = [
    ["left","right"],
    ["right","left"]
  ];
  const [from, to] = map[flip % 2];
  return convert(from, to);
}
return ["left", "right"]; // fallback
} // ✅ function closed
  const getNextIndex = (index: number, dir: string) => {
  const row = Math.floor(index / 4);
  const col = index % 4;

  if (dir === "right") return col < 3 ? index + 1 : -1;
  if (dir === "left") return col > 0 ? index - 1 : -1;
  if (dir === "down") return row < 3 ? index + 4 : -1;
  if (dir === "up") return row > 0 ? index - 4 : -1;

  return -1;
};

const runRocket = () => {
  let current = 9;
  const endTile = 3;

  for (let step = 0; step < 20; step++) {
    console.log("Current:", current);
    const [from, to] = getTileDirection(current);
    const next = getNextIndex(current, to);

    if (next === -1) {
      alert("Wrong path");
      return;
    }

    const [nextFrom] = getTileDirection(next);

    if (
      (to === "right" && nextFrom !== "left") ||
      (to === "left" && nextFrom !== "right") ||
      (to === "up" && nextFrom !== "down") ||
      (to === "down" && nextFrom !== "up")
    ) {
      alert("Path broken");
      return;
    }

    current = next;

    if (current === endTile) {
      alert("Success 🚀🌍");
      return;
    }
  }

  alert("No path");
};

  // ⬇️ KEEP YOUR EXISTING 3×3 CODE BELOW (DO NOT TOUCH)

  // TILE 0
  if (index === 0) {
    const map = [
      ["right","top"],
      ["top","right"],
      ["right","left"],
      ["left","right"],
      ["left","top"],
      ["top","left"]
    ];
    const [from, to] = map[flip % 6];
    return convert(from, to);
  }

  // TILE 1,2,3
  if (index === 1 || index === 2 || index === 3) {
     // TILE 1
if (index === 1) {
  const map = [
    ["left","bottom"],
    ["bottom","left"]
  ];
  const [from, to] = map[flip % 2];
  return convert(from, to);
}

// TILE 2 (🔥 IMPORTANT FIX)
if (index === 2) {
  const map = [
    ["bottom","right"],   // ✅ must go to Earth
    ["right","bottom"]
  ];
  const [from, to] = map[flip % 2];
  return convert(from, to);
}

// TILE 3
if (index === 3) {
  const map = [
    ["left","bottom"],
    ["bottom","left"]
  ];
  const [from, to] = map[flip % 2];
  return convert(from, to);
}
  }

  // TILE 4
  if (index === 4) {
    const map = [
      ["right","top"],
      ["top","right"],
      ["right","bottom"],
      ["bottom","right"],
      ["bottom","top"],
      ["top","bottom"]
    ];
    const [from, to] = map[flip % 6];
    return convert(from, to);
  }

  // TILE 5,6
  if (index === 5 || index === 6) {
    const map = [
      ["top","bottom"],
      ["bottom","top"]
    ];
    const [from, to] = map[flip % 2];
    return convert(from, to);
  }

  // TILE 7
  if (index === 7) {
    const map = [
      ["top","right"],
      ["right","top"]
    ];
    const [from, to] = map[flip % 2];
    return convert(from, to);
  }

  // TILE 8
  if (index === 8) {
    const map = [
      ["left","top"],
      ["top","left"]
    ];
    const [from, to] = map[flip % 2];
    return convert(from, to);
  }

  return ["left","right"];
}
   async function validatePath() {
  let current = level === 2 ? 8 : 0;
  let entry: Direction = "left";

  const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

  const moves: Record<Direction, number> = {
    right: 1,
    left: -1,
    up: -gridSize,
    down: gridSize
  };

  const opposite: Record<Direction, Direction> = {
    right: "left",
    left: "right",
    up: "down",
    down: "up"
  };

  const earthTile = 2;

  // =========================
  // 🚀 STEP 2: ANIMATE ROCKET
  // =========================
  current = 0;
  entry = "left";

  setRocketPos3(0);

  for (let step = 0; step < gridSize * gridSize; step++) {

     const directions = {
  8:  "down",
  12: "right",
  13: "right",
  14: "up",
  10: "up",
  6:  "left",
  5:  "top",
  1:  "right",
  2:  "right",
  3:  "right"
};

 let outDir;

if (level === 1) {
  // ✅ 3x3 → USE ORIGINAL FUNCTION
  const [from, to] = getTileDirection(current);

  if (!from) {
    alert("❌ Invalid tile");
    return;
  }

  outDir = to;
} else {
  // ✅ 4x4 → USE HARD-CODED PATH
  outDir = (directions as any)[current];

  if (!outDir) {
    alert("❌ Invalid tile");
    return;
  }
}

    // ✅ CHECK BEFORE MOVE (IMPORTANT FIX)
    if (current === earthTile && outDir === "right") {
      alert("✅ Level Completed");

      if (level === 1) setLevel(2);
      else if (level === 2) setLevel(3);
      else {
        alert("🚀 All Rocket Levels Completed");
        setSection3Completed(true);
        calculateFinalResult();
      }

      return;
    }

    await sleep(300);

    current += (moves as any)[outDir];
    if (level === 1) {
  setRocketPos3(current);
}

if (level === 2) {
  setRocketPos4(current);
}

    entry = opposite[outDir as keyof typeof opposite];
  }

  alert("❌ Please correct the path");
}
 if (mode === null) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Accenture Cognitive Test</h1>

      <button
        style={{ margin: "10px", padding: "10px 20px" }}
        onClick={() => {
          setMode("test");
          setSection(1);
        }}
      >
        Cognitive Test (Full)
      </button>

      <button
        style={{ margin: "10px", padding: "10px 20px" }}
        onClick={() => {
          setMode("practice");
          setSection(1);
        }}
      >
        Cognitive Gaming (Practice)
      </button>
    </div>
  );
}
if (mode === "practice" && section === 1) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Select Practice Round</h2>

      <button
        style={{ margin: "10px", padding: "10px 20px" }}
        onClick={() => {
  window.location.href = "/bubblegame";
}}
      >
        Bubble Round
      </button>

      <button
  style={{ margin: "10px", padding: "10px 20px" }}
  onClick={() => {
    window.location.href = "/doorandkeygame";
  }}
>
  Door & Key
</button>

      <button
  style={{ margin: "10px", padding: "10px 20px" }}
  onClick={() => {
    setLevel(1);   // ✅ Reset to Level 1
    setTileRotation(getInitialTiles(1)); // ✅ Reset tiles
    setTileFlipIndex(Array(9).fill(0)); // ✅ Reset flip
    setRocketPos3(0); // ✅ Reset rocket start position
    setRocketTime(240); // ✅ ADD THIS LINE (IMPORTANT)
    setSection(3);   // ✅ Open Rocket Game
  }}
>
  Rocket Game
</button>
    </div>
  );
}
  // ---------------- SECTION 2 UI ----------------
if (section === 2) {
  return (
    <div>
      <h1>Door & Key Game</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize}, 80px)`,
        gap: "8px",
        justifyContent: "center"
      }}>
        {[...Array(gridSize * gridSize)].map((_, i) => {

          let border = "1px solid black";
          if (hitWall === i) border = "3px solid red";

          return (
            <div
              key={i}
              onClick={() => handleCellClick(i)}
              style={{
                width: "80px",
                height: "80px",
                background: tileRotation[i] !== 0 || tileFlipIndex[i] !== 0
  ? "#6b7280"
  : "#f3f4f6",
                border,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                position: "relative",
                cursor: "pointer"
              }}
            >

              {/* PLAYER */}
              {playerDoor === i && (
                <>
                  {hasKey ? "👤🔑" : "👤"}

                  {/* 🔥 DYNAMIC TRIANGLES */}

                  {/* UP */}
                  {i - gridSize >= 0 && (
                    <div style={{
                      position: "absolute",
                      top: "-10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "0",
                      height: "0",
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderBottom: "14px solid black"
                    }} />
                  )}

                  {/* DOWN */}
                  {i + gridSize < gridSize * gridSize && (
                    <div style={{
                      position: "absolute",
                      bottom: "-10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "0",
                      height: "0",
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderTop: "14px solid black"
                    }} />
                  )}

                

                  {/* RIGHT */}
                  {i % gridSize !== gridSize - 1 && (
                    <div style={{
                      position: "absolute",
                      right: "-10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "0",
                      height: "0",
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      borderLeft: "14px solid black"
                    }} />
                  )}
                </>
              )}

              {/* KEY */}
              {i === keyPos && !hasKey && "🔑"}

              {/* DOOR */}
              {i === doorPos && "🚪"}

            </div>
          );
        })}
      </div>

      <p>{hasKey ? "🔑 Key Collected" : "No Key Yet"}</p>
    </div>
  );
}
 if (section === 3) {
  return (
     <div style={{
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",

  // ✅ CLEAN WHITE BACKGROUND (LIKE REFERENCE)
  background: "#f5f5f5",

  // ✅ DARK TEXT
  color: "#111",

  padding: "20px"
}}>

       <div style={{
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  textAlign: "center"
}}>
      <div style={{ marginBottom: "10px", opacity: 0.8 }}>
  Section 3 of 3
</div>

<h2 style={{ marginBottom: "10px" }}>
  🚀 Rocket Game
</h2>

<h3 style={{ marginBottom: "10px" }}>
  Level {level} / 3
</h3>

  
 {/* GRID */}
<div style={{
  display: "grid",
  gridTemplateColumns: `repeat(${level === 1 ? 3 : level === 2 ? 4 : 5}, 70px)`,
  gap: "0px",
  justifyContent: "center",
  marginTop: "40px"
}}>
  {[...Array(level === 1 ? 9 : level === 2 ? 16 : 25)].map((_, i) => {
    return (
      <div
        key={i}
        onClick={() => setSelectedTile(i)}
        style={{
          width: "70px",
          height: "70px",

          background: "#6b7280",

          margin: "-1px",
          border: "1px solid #999",

          fontSize: "28px",
          fontWeight: "bold",
          color: "#111",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          cursor: "pointer",
          transition: "all 0.2s ease",

          // ✅ IMPORTANT (for rocket positioning)
          position: "relative",
           overflow: "visible" 
        }}
      >
          {/* 🚀 ROCKET FOR 3x3 */}
       {level === 1 && rocketPos3 === i && (
  <span style={{
    position: "absolute",
    top: "50%",
    left: i === 0 ? "-35px" : "50%",
    transform:
      i === 0
        ? "translateY(-50%)"
        : "translate(-50%, -50%)"
  }}>
    🚀
  </span>
)}
{/* 🌍 EARTH FOR 3x3 */}
{level === 1 && i === 2 && (
  <span style={{
    position: "absolute",
    top: "50%",
    right: "-35px",
    transform: "translateY(-50%)"
  }}>
    🌍
  </span>
)}
    {/* 🚀 ROCKET FOR 4x4  ✅ ADD THIS */}
{level === 2 && rocketPos4 === i && (
  <div style={{
    position: "absolute",
    top: "50%",
    left: i === 8 ? "-35px" : "50%",   // ✅ tile 8 left outside
    transform:
      i === 8
        ? "translateY(-50%)"
        : "translate(-50%, -50%)",
    fontSize: "24px",
    zIndex: 9999,
    pointerEvents: "none"
  }}>
    🚀
  </div>
)}

{/* 🌍 EARTH */}
{level === 2 && i === 3 && (
  <div style={{
    position: "absolute",
    top: "50%",
    right: "-25px",
    transform: "translateY(-50%)",
    fontSize: "22px",
    zIndex: 100
  }}>
    🌍
  </div>
)}
       
        {/* TILE DRAWING */}
        {(() => {
          
            if (level === 1) {
  // existing 3x3 tiles (no change)
if (i === 0) {

  const [from, to] = getTileDirection(i) as [Direction, Direction];

  const getCurvePath = () => {
    if (from === "left" && to === "up")
      return "M10 26 Q18 18 18 10";

    if (from === "up" && to === "right")
      return "M18 10 Q18 18 26 18";

    if (from === "right" && to === "left")
      return "M26 18 L10 18";

    if (from === "left" && to === "right")
      return "M10 18 L26 18";

    if (from === "right" && to === "up")
      return "M26 18 Q18 18 18 10";

    if (from === "up" && to === "left")
      return "M18 10 Q18 18 10 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ✅ ROTATE EVERYTHING (ROAD + ARROWS) */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`,
        transition: "transform 0.2s ease"
      }}>

        {/* ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "16px",
          height: "50%",
          background: "#4b5563",
          transform: "translateX(-50%)"
        }} />

        {/* PATH */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <path
            d={getCurvePath()}
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* ENTRY ARROW */}
<div style={{
  position: "absolute",

  top:
    from === "up" ? "10%" :
    from === "down" ? "90%" :
    "50%",

  left:
    from === "left" ? "10%" :
    from === "right" ? "90%" :
    "50%",

  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(from, "from")}
</div>
        
   {/* EXIT ARROW */}
<div style={{
  position: "absolute",

  top:
    to === "up" ? "10%" :
    to === "down" ? "90%" :
    "50%",

  left:
    to === "left" ? "10%" :
    to === "right" ? "90%" :
    "50%",

  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(to, "to")}
</div>
         

      </div>
    </div>
  );
}
if (i === 1) {

  const [from, to] = getTileDirection(i) as [Direction, Direction];

  const getCurvePath = () => {
    if (from === "left" && to === "down")
      return "M10 18 Q18 18 18 26";

    if (from === "down" && to === "left")
      return "M18 26 Q18 18 10 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      transform: `rotate(${tileRotation[i] * 90}deg)`
    }}>

      {/* LEFT ROAD */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: 0,
        width: "50%",
        height: "16px",
        background: "#4b5563",
        transform: "translateY(-50%)"
      }} />

      {/* DOWN ROAD */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        width: "16px",
        height: "50%",
        background: "#4b5563",
        transform: "translateX(-50%)"
      }} />

      {/* CENTER */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "16px",
        height: "16px",
        background: "#4b5563",
        transform: "translate(-50%, -50%)"
      }} />

      {/* ENTRY ARROW */}
<div style={{
  position: "absolute",

  top:
    from === "up" ? "10%" :
    from === "down" ? "90%" :
    "50%",

  left:
    from === "left" ? "10%" :
    from === "right" ? "90%" :
    "50%",

  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(from, "from")}
</div>

      {/* PATH */}
      <svg width="36" height="36" viewBox="0 0 36 36"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
        <path
          d={getCurvePath()}
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

     {/* EXIT ARROW */}
<div style={{
  position: "absolute",

  top:
    to === "up" ? "10%" :
    to === "down" ? "90%" :
    "50%",

  left:
    to === "left" ? "10%" :
    to === "right" ? "90%" :
    "50%",

  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(to, "to")}
</div>

    </div>
  );
}
   if (i === 2) {

  const [from, to] = getTileDirection(i) as [Direction, Direction];

  const getCurvePath = () => {
    if (from === "down" && to === "right")
      return "M18 26 Q20 18 26 18";

    if (from === "right" && to === "down")
      return "M26 18 Q20 18 18 26";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      transform: `rotate(${tileRotation[i] * 90}deg)`
    }}>

      {/* RIGHT ROAD */}
      <div style={{
        position: "absolute",
        top: "50%",
        right: 0,
        width: "50%",
        height: "16px",
        background: "#4b5563",
        transform: "translateY(-50%)"
      }} />

      {/* BOTTOM ROAD */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        width: "16px",
        height: "50%",
        background: "#4b5563",
        transform: "translateX(-50%)"
      }} />

      {/* CENTER */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "16px",
        height: "16px",
        background: "#4b5563",
        transform: "translate(-50%, -50%)"
      }} />

       {/* ENTRY ARROW */}
<div style={{
  position: "absolute",

  top:
    from === "up" ? "10%" :
    from === "down" ? "90%" :
    "50%",

  left:
    from === "left" ? "10%" :
    from === "right" ? "90%" :
    "50%",

  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(from, "from")}
</div>

      {/* PATH */}
      <svg width="36" height="36" viewBox="0 0 36 36"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
        <path
          d={getCurvePath()}
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

       {/* EXIT ARROW */}
<div style={{
  position: "absolute",

  top:
    to === "up" ? "10%" :
    to === "down" ? "90%" :
    "50%",

  left:
    to === "left" ? "10%" :
    to === "right" ? "90%" :
    "50%",

  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(to, "to")}
</div>
      

    </div>
  );
}
  if (i === 3) {

  const [from, to] = getTileDirection(i) as [Direction, Direction];

  const getCurvePath = () => {
    if (from === "left" && to === "down")
      return "M10 18 Q18 18 18 26";

    if (from === "down" && to === "left")
      return "M18 26 Q18 18 10 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      transform: `rotate(${tileRotation[i] * 90}deg)`
    }}>

      {/* LEFT ROAD */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: 0,
        width: "50%",
        height: "16px",
        background: "#4b5563",
        transform: "translateY(-50%)"
      }} />

      {/* BOTTOM ROAD */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        width: "16px",
        height: "50%",
        background: "#4b5563",
        transform: "translateX(-50%)"
      }} />

      {/* CENTER */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "16px",
        height: "16px",
        background: "#4b5563",
        transform: "translate(-50%, -50%)"
      }} />

      {/* ENTRY ARROW */}
<div style={{
  position: "absolute",
  top:
    from === "up" ? "10%" :
    from === "down" ? "90%" :
    "50%",
  left:
    from === "left" ? "10%" :
    from === "right" ? "90%" :
    "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(from, "from")}
</div>

      {/* PATH */}
      <svg width="36" height="36" viewBox="0 0 36 36"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
        <path
          d={getCurvePath()}
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

       
      {/* EXIT ARROW */}
<div style={{
  position: "absolute",
  top:
    to === "up" ? "10%" :
    to === "down" ? "90%" :
    "50%",
  left:
    to === "left" ? "10%" :
    to === "right" ? "90%" :
    "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(to, "to")}
</div>

    </div>
  );
}
   if (i === 4) {

  const [from, to] = getTileDirection(i) as [Direction, Direction];

  const getPath = () => {
    if (from === "right" && to === "up")
      return "M26 18 Q18 18 18 10";

    if (from === "up" && to === "right")
      return "M18 10 Q18 18 26 18";

    if (from === "right" && to === "down")
      return "M26 18 Q18 18 18 26";

    if (from === "down" && to === "right")
      return "M18 26 Q18 18 26 18";

    if (from === "down" && to === "up")
      return "M18 26 L18 10";

    if (from === "up" && to === "down")
      return "M18 10 L18 26";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      transform: `rotate(${tileRotation[i] * 90}deg)`
    }}>

      {/* LEFT BLOCK */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: 0,
        width: "50%",
        height: "16px",
        background: "#6b7280",
        transform: "translateY(-50%)"
      }} />

      {/* RIGHT */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "50%",
        height: "16px",
        background: "#4b5563",
        transform: "translateY(-50%)"
      }} />

      {/* TOP */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        width: "16px",
        height: "50%",
        background: "#4b5563",
        transform: "translateX(-50%)"
      }} />

      {/* BOTTOM */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        width: "16px",
        height: "50%",
        background: "#4b5563",
        transform: "translateX(-50%)"
      }} />

      {/* CENTER */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "16px",
        height: "16px",
        background: "#4b5563",
        transform: "translate(-50%, -50%)"
      }} />

      {/* ENTRY ARROW */}
<div style={{
  position: "absolute",
  top:
    from === "up" ? "10%" :
    from === "down" ? "90%" :
    "50%",
  left:
    from === "left" ? "10%" :
    from === "right" ? "90%" :
    "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(from, "from")}
</div>

      {/* PATH */}
      <svg width="36" height="36" viewBox="0 0 36 36"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
        <path
          d={getPath()}
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* EXIT ARROW */}
<div style={{
  position: "absolute",
  top:
    to === "up" ? "10%" :
    to === "down" ? "90%" :
    "50%",
  left:
    to === "left" ? "10%" :
    to === "right" ? "90%" :
    "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(to, "to")}
</div>

    </div>
  );
}
if (i === 5) {

  const [from, to] = getTileDirection(i) as [Direction, Direction];

  const getPath = () => {
    return "M18 10 L18 26";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      transform: `rotate(${tileRotation[i] * 90}deg)`
    }}>

      {/* TOP ROAD */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        width: "16px",
        height: "50%",
        background: "#4b5563",
        transform: "translateX(-50%)"
      }} />

      {/* BOTTOM ROAD */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        width: "16px",
        height: "50%",
        background: "#4b5563",
        transform: "translateX(-50%)"
      }} />

      {/* CENTER */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "16px",
        height: "16px",
        background: "#4b5563",
        transform: "translate(-50%, -50%)"
      }} />

      {/* ENTRY ARROW */}
<div style={{
  position: "absolute",
  top:
    from === "up" ? "10%" :
    from === "down" ? "90%" :
    "50%",
  left:
    from === "left" ? "10%" :
    from === "right" ? "90%" :
    "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(from, "from")}
</div>

      {/* PATH */}
      <svg width="36" height="36" viewBox="0 0 36 36"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
        <path
          d={getPath()}
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

    {/* EXIT ARROW */}
<div style={{
  position: "absolute",
  top:
    to === "up" ? "10%" :
    to === "down" ? "90%" :
    "50%",
  left:
    to === "left" ? "10%" :
    to === "right" ? "90%" :
    "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(to, "to")}
</div>

    

    </div>
  );
}
  if (i === 6) {

  const [from, to] = getTileDirection(i) as [Direction, Direction];

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      transform: `rotate(${tileRotation[i] * 90}deg)`
    }}>

      {/* ✅ STRAIGHT VERTICAL ROAD ONLY */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        width: "16px",
        height: "100%",
        background: "#4b5563",
        transform: "translateX(-50%)"
      }} />

      {/* CENTER */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "16px",
        height: "16px",
        background: "#4b5563",
        transform: "translate(-50%, -50%)"
      }} />

      {/* ENTRY ARROW */}
<div style={{
  position: "absolute",
  top:
    from === "up" ? "10%" :
    from === "down" ? "90%" :
    "50%",
  left:
    from === "left" ? "10%" :
    from === "right" ? "90%" :
    "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(from, "from")}
</div>

      {/* PATH */}
      <svg width="36" height="36" viewBox="0 0 36 36"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
        <path
          d="M18 10 L18 26"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

       
    {/* EXIT ARROW */}
<div style={{
  position: "absolute",
  top:
    to === "up" ? "10%" :
    to === "down" ? "90%" :
    "50%",
  left:
    to === "left" ? "10%" :
    to === "right" ? "90%" :
    "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(to, "to")}
</div>

    </div>
  );
}
if (i === 7) {

  const [from, to] = getTileDirection(i) as [Direction, Direction];

  const getCurvePath = () => {
    if (from === "up" && to === "right")
      return "M18 10 Q18 18 26 18";

    if (from === "right" && to === "up")
      return "M26 18 Q18 18 18 10";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      transform: `rotate(${tileRotation[i] * 90}deg)`
    }}>

      {/* TOP ROAD */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        width: "16px",
        height: "50%",
        background: "#4b5563",
        transform: "translateX(-50%)"
      }} />

      {/* RIGHT ROAD */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "50%",
        height: "16px",
        background: "#4b5563",
        transform: "translateY(-50%)"
      }} />

      {/* CENTER */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "16px",
        height: "16px",
        background: "#4b5563",
        transform: "translate(-50%, -50%)"
      }} />

      {/* ENTRY ARROW */}
<div style={{
  position: "absolute",
  top:
    from === "up" ? "10%" :
    from === "down" ? "90%" :
    "50%",
  left:
    from === "left" ? "10%" :
    from === "right" ? "90%" :
    "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(from, "from")}
</div>

      {/* PATH */}
      <svg width="36" height="36" viewBox="0 0 36 36"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
        <path
          d={getCurvePath()}
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

       {/* EXIT ARROW */}
<div style={{
  position: "absolute",
  top:
    to === "up" ? "10%" :
    to === "down" ? "90%" :
    "50%",
  left:
    to === "left" ? "10%" :
    to === "right" ? "90%" :
    "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(to, "to")}
</div>
    </div>
  );
}
   if (i === 8) {

  const [from, to] = getTileDirection(i) as [Direction, Direction];

  const getCurvePath = () => {
    if (from === "left" && to === "up")
      return "M10 18 Q18 18 18 10";

    if (from === "up" && to === "left")
      return "M18 10 Q18 18 10 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      transform: `rotate(${tileRotation[i] * 90}deg)`
    }}>

      {/* LEFT ROAD */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: 0,
        width: "50%",
        height: "16px",
        background: "#4b5563",
        transform: "translateY(-50%)"
      }} />

      {/* TOP ROAD */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        width: "16px",
        height: "50%",
        background: "#4b5563",
        transform: "translateX(-50%)"
      }} />

      {/* CENTER */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "16px",
        height: "16px",
        background: "#4b5563",
        transform: "translate(-50%, -50%)"
      }} />

       {/* ENTRY ARROW */}
<div style={{
  position: "absolute",
  top:
    from === "up" ? "10%" :
    from === "down" ? "90%" :
    "50%",
  left:
    from === "left" ? "10%" :
    from === "right" ? "90%" :
    "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(from, "from")}
</div>
      {/* PATH */}
      <svg width="36" height="36" viewBox="0 0 36 36"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
        <path
          d={getCurvePath()}
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

       {/* EXIT ARROW */}
<div style={{
  position: "absolute",
  top:
    to === "up" ? "10%" :
    to === "down" ? "90%" :
    "50%",
  left:
    to === "left" ? "10%" :
    to === "right" ? "90%" :
    "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
}}>
  {getArrow(to, "to")}
</div>

    </div>
  );
}
}
 if (level === 2) {

  // ✅ TILE 0 (KEEP SAME)
  if (i === 0) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {
    if (from === "left" && to === "right")
      return "M10 18 L26 18";

    if (from === "right" && to === "left")
      return "M26 18 L10 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION BLOCK */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* ENTRY ARROW */}
        <div style={{
          position: "absolute",
          top: "50%",
          left:
            from === "left" ? "10%" :
            from === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* ✅ WHITE PATH (MIDDLE LINE) */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT ARROW */}
        <div style={{
          position: "absolute",
          top: "50%",
          left:
            to === "right" ? "90%" :
            to === "left" ? "10%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
    if (i === 1) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {

    if (from === "down" && to === "right")
      return "M18 26 Q18 18 26 18";

    if (from === "right" && to === "down")
      return "M26 18 Q18 18 18 26";

    if (from === "right" && to === "left")
      return "M26 18 L10 18";

    if (from === "left" && to === "right")
      return "M10 18 L26 18";

    if (from === "left" && to === "down")
      return "M10 18 Q18 18 18 26";

    if (from === "down" && to === "left")
      return "M18 26 Q18 18 10 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION BLOCK */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* LEFT ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "50%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* RIGHT ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          right: 0,
          width: "50%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* BOTTOM ROAD */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          width: "16px",
          height: "50%",
          background: "#4b5563",
          transform: "translateX(-50%)"
        }} />

        {/* CENTER */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "16px",
          height: "16px",
          background: "#4b5563",
          transform: "translate(-50%, -50%)"
        }} />

        {/* ENTRY ARROW */}
        <div style={{
          position: "absolute",
          top:
            from === "up" ? "10%" :
            from === "down" ? "90%" :
            "50%",
          left:
            from === "left" ? "10%" :
            from === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT ARROW */}
        <div style={{
          position: "absolute",
          top:
            to === "up" ? "10%" :
            to === "down" ? "90%" :
            "50%",
          left:
            to === "left" ? "10%" :
            to === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 2) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {
    if (from === "down" && to === "up")
      return "M18 26 L18 10";

    if (from === "up" && to === "down")
      return "M18 10 L18 26";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* ROAD */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "16px",
          height: "100%",
          background: "#4b5563",
          transform: "translateX(-50%)"
        }} />

        {/* ENTRY */}
        <div style={{
          position: "absolute",
          top: from === "up" ? "10%" : "90%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT */}
        <div style={{
          position: "absolute",
          top: to === "up" ? "10%" : "90%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 3) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {
    if (from === "left" && to === "right")
      return "M10 18 L26 18";

    if (from === "right" && to === "left")
      return "M26 18 L10 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION BLOCK */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* ENTRY */}
        <div style={{
          position: "absolute",
          top: "50%",
          left:
            from === "left" ? "10%" :
            from === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* WHITE PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT */}
        <div style={{
          position: "absolute",
          top: "50%",
          left:
            to === "left" ? "10%" :
            to === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 4) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {
    if (from === "down" && to === "up")
      return "M18 26 L18 10";

    if (from === "up" && to === "down")
      return "M18 10 L18 26";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION BLOCK */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* VERTICAL ROAD */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "16px",
          height: "100%",
          background: "#4b5563",
          transform: "translateX(-50%)"
        }} />

        {/* ENTRY */}
        <div style={{
          position: "absolute",
          top:
            from === "up" ? "10%" :
            from === "down" ? "90%" :
            "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* WHITE PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT */}
        <div style={{
          position: "absolute",
          top:
            to === "up" ? "10%" :
            to === "down" ? "90%" :
            "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 5) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {

    if (from === "right" && to === "up")
      return "M26 18 Q18 18 18 10";

    if (from === "up" && to === "right")
      return "M18 10 Q18 18 26 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION BLOCK */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* LEFT ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "50%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* RIGHT ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          right: 0,
          width: "50%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* TOP ROAD */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "16px",
          height: "50%",
          background: "#4b5563",
          transform: "translateX(-50%)"
        }} />

        {/* CENTER */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "16px",
          height: "16px",
          background: "#4b5563",
          transform: "translate(-50%, -50%)"
        }} />

        {/* ENTRY */}
        <div style={{
          position: "absolute",
          top:
            from === "up" ? "10%" :
            from === "down" ? "90%" :
            "50%",
          left:
            from === "left" ? "10%" :
            from === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT */}
        <div style={{
          position: "absolute",
          top:
            to === "up" ? "10%" :
            to === "down" ? "90%" :
            "50%",
          left:
            to === "left" ? "10%" :
            to === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 6) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {

    if (from === "left" && to === "up")
      return "M10 18 Q18 18 18 10";

    if (from === "up" && to === "left")
      return "M18 10 Q18 18 10 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION BLOCK */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* LEFT ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "50%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* TOP ROAD */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "16px",
          height: "50%",
          background: "#4b5563",
          transform: "translateX(-50%)"
        }} />

        {/* CENTER */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "16px",
          height: "16px",
          background: "#4b5563",
          transform: "translate(-50%, -50%)"
        }} />

        {/* ENTRY */}
        <div style={{
          position: "absolute",
          top:
            from === "up" ? "10%" :
            from === "down" ? "90%" :
            "50%",
          left:
            from === "left" ? "10%" :
            from === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT */}
        <div style={{
          position: "absolute",
          top:
            to === "up" ? "10%" :
            to === "down" ? "90%" :
            "50%",
          left:
            to === "left" ? "10%" :
            to === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 7) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {
    if (from === "left" && to === "right")
      return "M10 18 L26 18";

    if (from === "right" && to === "left")
      return "M26 18 L10 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION BLOCK */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* ENTRY */}
        <div style={{
          position: "absolute",
          top: "50%",
          left:
            from === "left" ? "10%" :
            from === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* WHITE PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT */}
        <div style={{
          position: "absolute",
          top: "50%",
          left:
            to === "left" ? "10%" :
            to === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 8) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {

    if (from === "up" && to === "left")
      return "M18 10 Q18 18 10 18";

    if (from === "left" && to === "up")
      return "M10 18 Q18 18 18 10";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION BLOCK */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* TOP ROAD */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "16px",
          height: "50%",
          background: "#4b5563",
          transform: "translateX(-50%)"
        }} />

        {/* LEFT ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "50%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* CENTER */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "16px",
          height: "16px",
          background: "#4b5563",
          transform: "translate(-50%, -50%)"
        }} />

        {/* ENTRY */}
        <div style={{
          position: "absolute",
          top:
            from === "up" ? "10%" :
            from === "down" ? "90%" :
            "50%",
          left:
            from === "left" ? "10%" :
            from === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT */}
        <div style={{
          position: "absolute",
          top:
            to === "up" ? "10%" :
            to === "down" ? "90%" :
            "50%",
          left:
            to === "left" ? "10%" :
            to === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 8) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {

    if (from === "up" && to === "left")
      return "M18 10 Q18 18 10 18";

    if (from === "left" && to === "up")
      return "M10 18 Q18 18 18 10";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION BLOCK */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* TOP ROAD */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "16px",
          height: "50%",
          background: "#4b5563",
          transform: "translateX(-50%)"
        }} />

        {/* LEFT ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "50%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* CENTER */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "16px",
          height: "16px",
          background: "#4b5563",
          transform: "translate(-50%, -50%)"
        }} />

        {/* ENTRY */}
        <div style={{
          position: "absolute",
          top:
            from === "up" ? "10%" :
            from === "down" ? "90%" :
            "50%",
          left:
            from === "left" ? "10%" :
            from === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT */}
        <div style={{
          position: "absolute",
          top:
            to === "up" ? "10%" :
            to === "down" ? "90%" :
            "50%",
          left:
            to === "left" ? "10%" :
            to === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 9) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {
    if (from === "left" && to === "right")
      return "M10 18 L26 18";

    if (from === "right" && to === "left")
      return "M26 18 L10 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION BLOCK */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* ENTRY */}
        <div style={{
          position: "absolute",
          top: "50%",
          left:
            from === "left" ? "10%" :
            from === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* WHITE PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT */}
        <div style={{
          position: "absolute",
          top: "50%",
          left:
            to === "left" ? "10%" :
            to === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 10) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {
    if (from === "down" && to === "up")
      return "M18 26 L18 10";

    if (from === "up" && to === "down")
      return "M18 10 L18 26";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION BLOCK */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* VERTICAL ROAD */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "16px",
          height: "100%",
          background: "#4b5563",
          transform: "translateX(-50%)"
        }} />

        {/* ENTRY */}
        <div style={{
          position: "absolute",
          top:
            from === "up" ? "10%" :
            from === "down" ? "90%" :
            "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* WHITE PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT */}
        <div style={{
          position: "absolute",
          top:
            to === "up" ? "10%" :
            to === "down" ? "90%" :
            "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 10) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {
    if (from === "down" && to === "up")
      return "M18 26 L18 10";

    if (from === "up" && to === "down")
      return "M18 10 L18 26";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION BLOCK */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* VERTICAL ROAD */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "16px",
          height: "100%",
          background: "#4b5563",
          transform: "translateX(-50%)"
        }} />

        {/* ENTRY */}
        <div style={{
          position: "absolute",
          top:
            from === "up" ? "10%" :
            from === "down" ? "90%" :
            "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* WHITE PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT */}
        <div style={{
          position: "absolute",
          top:
            to === "up" ? "10%" :
            to === "down" ? "90%" :
            "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 11) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {
    if (from === "left" && to === "right")
      return "M10 18 L26 18";

    if (from === "right" && to === "left")
      return "M26 18 L10 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION BLOCK */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* ENTRY */}
        <div style={{
          position: "absolute",
          top: "50%",
          left:
            from === "left" ? "10%" :
            from === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* WHITE PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT */}
        <div style={{
          position: "absolute",
          top: "50%",
          left:
            to === "left" ? "10%" :
            to === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 12) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {

    if (from === "up" && to === "right")
      return "M18 10 Q18 18 26 18";

    if (from === "right" && to === "up")
      return "M26 18 Q18 18 18 10";

    if (from === "right" && to === "down")
      return "M26 18 Q18 18 18 26";

    if (from === "down" && to === "right")
      return "M18 26 Q18 18 26 18";

    if (from === "down" && to === "left")
      return "M18 26 Q18 18 10 18";

    if (from === "left" && to === "down")
      return "M10 18 Q18 18 18 26";

    if (from === "left" && to === "up")
      return "M10 18 Q18 18 18 10";

    if (from === "up" && to === "left")
      return "M18 10 Q18 18 10 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION BLOCK */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* TOP */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "16px",
          height: "50%",
          background: "#4b5563",
          transform: "translateX(-50%)"
        }} />

        {/* BOTTOM */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          width: "16px",
          height: "50%",
          background: "#4b5563",
          transform: "translateX(-50%)"
        }} />

        {/* LEFT */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "50%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* RIGHT */}
        <div style={{
          position: "absolute",
          top: "50%",
          right: 0,
          width: "50%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* CENTER */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "16px",
          height: "16px",
          background: "#4b5563",
          transform: "translate(-50%, -50%)"
        }} />

        {/* ENTRY */}
        <div style={{
          position: "absolute",
          top:
            from === "up" ? "10%" :
            from === "down" ? "90%" :
            "50%",
          left:
            from === "left" ? "10%" :
            from === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT */}
        <div style={{
          position: "absolute",
          top:
            to === "up" ? "10%" :
            to === "down" ? "90%" :
            "50%",
          left:
            to === "left" ? "10%" :
            to === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 13) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {
    if (from === "left" && to === "right")
      return "M10 18 L26 18";

    if (from === "right" && to === "left")
      return "M26 18 L10 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* ENTRY ARROW */}
        <div style={{
          position: "absolute",
          top: "50%",
          left:
            from === "left" ? "10%" :
            from === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* WHITE PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT ARROW */}
        <div style={{
          position: "absolute",
          top: "50%",
          left:
            to === "left" ? "10%" :
            to === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 13) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {
    if (from === "left" && to === "right")
      return "M10 18 L26 18";

    if (from === "right" && to === "left")
      return "M26 18 L10 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* ENTRY ARROW */}
        <div style={{
          position: "absolute",
          top: "50%",
          left:
            from === "left" ? "10%" :
            from === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* WHITE PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT ARROW */}
        <div style={{
          position: "absolute",
          top: "50%",
          left:
            to === "left" ? "10%" :
            to === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 14) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {
    if (from === "right" && to === "down")
      return "M26 18 Q18 18 18 26";

    if (from === "down" && to === "right")
      return "M18 26 Q18 18 26 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* RIGHT ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          right: 0,
          width: "50%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* BOTTOM ROAD */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          width: "16px",
          height: "50%",
          background: "#4b5563",
          transform: "translateX(-50%)"
        }} />

        {/* CENTER */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "16px",
          height: "16px",
          background: "#4b5563",
          transform: "translate(-50%, -50%)"
        }} />

        {/* ENTRY */}
        <div style={{
          position: "absolute",
          top:
            from === "up" ? "10%" :
            from === "down" ? "90%" :
            "50%",
          left:
            from === "left" ? "10%" :
            from === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT */}
        <div style={{
          position: "absolute",
          top:
            to === "up" ? "10%" :
            to === "down" ? "90%" :
            "50%",
          left:
            to === "left" ? "10%" :
            to === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
if (i === 15) {

  const [from, to] = getTileDirection(i);

  const getPath = () => {
    if (from === "left" && to === "right")
      return "M10 18 L26 18";

    if (from === "right" && to === "left")
      return "M26 18 L10 18";

    return "";
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>

      {/* ROTATION */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: `rotate(${tileRotation[i] * 90}deg)`
      }}>

        {/* ROAD */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: "16px",
          background: "#4b5563",
          transform: "translateY(-50%)"
        }} />

        {/* ENTRY */}
        <div style={{
          position: "absolute",
          top: "50%",
          left:
            from === "left" ? "10%" :
            from === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(from, "from")}
        </div>

        {/* PATH */}
        <svg width="36" height="36" viewBox="0 0 36 36"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
          <path
            d={getPath()}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* EXIT */}
        <div style={{
          position: "absolute",
          top: "50%",
          left:
            to === "left" ? "10%" :
            to === "right" ? "90%" :
            "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          {getArrow(to, "to")}
        </div>

      </div>
    </div>
  );
}
  return null;
}



})()}

            </div>
          );
        })}

        </div>
      

         <div style={{
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  alignItems: "center"
}}>
  
  <button
    style={{
      padding: "10px 16px",
      borderRadius: "8px",
      border: "1px solid #333",
      background: "#2563eb",
      color: "white",
      cursor: "pointer"
    }}
    onClick={runRocket}
  >
    🚀 Start Rocket
  </button>

</div>

        <div style={{ marginTop: "20px" }}>
  ⏱ {Math.floor(rocketTime / 60)}:
  {(rocketTime % 60).toString().padStart(2, "0")}

  <br />

  {/* ROTATE */}
  <button
    disabled={selectedTile === null}
    style={{
      margin: "6px",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #333",
      background: "#1f2937",
      color: "white",
      opacity: selectedTile === null ? 0.4 : 1,
      cursor: "pointer"
    }}
    onClick={() => {
      if (selectedTile === null) return;
      const newRotation = [...tileRotation];
      newRotation[selectedTile] = (newRotation[selectedTile] + 1);
      setTileRotation(newRotation);
    }}
  >
    🔄
  </button>

  {/* FLIP */}
  <button
    disabled={selectedTile === null}
    style={{
      margin: "6px",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #333",
      background: "#1f2937",
      color: "white",
      opacity: selectedTile === null ? 0.4 : 1,
      cursor: "pointer"
    }}
     onClick={() => {
  if (selectedTile === null) return;

  

 const newFlip = [...tileFlipIndex];
if (selectedTile === 0 || selectedTile === 1 || selectedTile === 4) {
  // 3×3 special tiles
  newFlip[selectedTile] = (newFlip[selectedTile] + 1) % 6;
} 
else if (level === 2 && selectedTile === 12) {
  // ✅ 4×4 cross tile (IMPORTANT)
  newFlip[selectedTile] = (newFlip[selectedTile] + 1) % 8;
}
else {
  // normal tiles
  newFlip[selectedTile] = (newFlip[selectedTile] + 1) % 2;
}

setTileFlipIndex(newFlip);
}}
       
  >
    ⇄
  </button>
  

<button
  style={{
    margin: "6px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #333",
    background: "#1f2937",
    color: "white",
    cursor: "pointer"
  }}
  onClick={runRocket}
>
</button>

  {/* SUBMIT */}
  <button
    style={{
      margin: "6px",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #333",
      background: "#1f2937",
      color: "white",
      cursor: "pointer"
    }}
    onClick={validatePath}
  >
    ✓
  </button>

  {/* RESET */}
  <button
    style={{
      margin: "6px",
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #333",
      background: "#374151",
      color: "white",
      cursor: "pointer"
    }}
    onClick={() => {
      setTileRotation(getInitialTiles(level));
      setTileFlipIndex(
        Array(level === 1 ? 9 : level === 2 ? 16 : 25).fill(0)
      );
      setRocketPos3(0);//3x3 start
      setRocketPos4(8);//4x4 start

      setRocketTime(240);
    }}
  >
    🔁 Reset
  </button>
</div>
 </div>   {/* ✅ CLOSE WHITE CARD */}
   </div>
      );
}
}