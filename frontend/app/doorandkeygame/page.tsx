"use client";
import { useState, useEffect } from "react";

export default function DoorGame() {

  const [level, setLevel] = useState(1);

  const gridSize = level === 1 ? 3 : level === 2 ? 4 : 5;
  const totalCells = gridSize * gridSize;

  const startPos = level === 1 ? 6 : level === 2 ? 12 : 20;

  const [player, setPlayer] = useState(startPos);
  const [collectedKeys, setCollectedKeys] = useState<number[]>([]);
  const [hitWall, setHitWall] = useState<number | null>(null);

  // ✅ MULTIPLE KEYS
  const keyPositions =
    level === 1 ? [1]
    : level === 2 ? [5]
    : [7, 18];

  const doorPos =
    level === 1 ? 8 :
    level === 2 ? 15 :
    24;

  const blockedPaths =
    level === 1
      ? [[0,1],[1,0],[4,1],[1,4],[5,8],[8,5]]
      : level === 2
      ? [[6,7],[7,6],[8,9],[9,8],[10,11],[11,10]]
      : [[6,7],[7,6],[8,9],[9,8],[12,13],[13,12],[15,16],[16,15],[18,19],[19,18]];

  const isBlocked = (from: number, to: number) =>
    blockedPaths.some(([a, b]) => a === from && b === to);

  useEffect(() => {
    setPlayer(startPos);
    setCollectedKeys([]);
  }, [level]);

  // 🔥 MOVE
  const handleCellClick = (target: number) => {

    const validMoves = [
      player - gridSize,
      player + gridSize,
      player - 1,
      player + 1,
    ];

    if (player % gridSize === 0 && target === player - 1) return;
    if (player % gridSize === gridSize - 1 && target === player + 1) return;

    if (!validMoves.includes(target)) return;

    if (isBlocked(player, target)) {
      setHitWall(target);

      setTimeout(() => {
        setHitWall(null);
        setPlayer(startPos);
        setCollectedKeys([]);
      }, 400);
      return;
    }

    setPlayer(target);

    // 🔑 COLLECT KEYS
    if (keyPositions.includes(target) && !collectedKeys.includes(target)) {
      setCollectedKeys([...collectedKeys, target]);
    }

    // 🚪 DOOR
    if (target === doorPos) {
      if (collectedKeys.length === keyPositions.length) {
        if (level === 1) return setLevel(2);
        if (level === 2) return setLevel(3);
        if (level === 3) alert("Game Completed 🎉");
      } else {
        alert("Collect all keys!");
      }
    }
  };

  // 🔺 ARROW LOGIC (SHOW EVEN IF BLOCKED)
  const validMoves = [
    player - gridSize,
    player + gridSize,
    player - 1,
    player + 1,
  ];

  const moves: number[] = [];

  validMoves.forEach((m) => {
    if (player % gridSize === 0 && m === player - 1) return;
    if (player % gridSize === gridSize - 1 && m === player + 1) return;

    if (m >= 0 && m < totalCells) {
      moves.push(m);
    }
  });

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>Door & Key Game (Level {level})</h2>

      <div style={{
        position: "relative",
        width: gridSize * 80,
        margin: "auto"
      }}>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridSize}, 80px)`
          }}
        >
          {Array.from({ length: totalCells }).map((_, index) => {

            let bg = "white";
            if (player === index) bg = "#333";
            if (hitWall === index) bg = "red";

            return (
              <div
                key={index}
                onClick={() => handleCellClick(index)}
                style={{
                  width: 80,
                  height: 80,
                  border: "1px solid #999",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: bg,
                  color: player === index ? "white" : "black"
                }}
              >
                {player === index && (collectedKeys.length ? "👤🔑" : "👤")}

                {keyPositions.includes(index) &&
                  !collectedKeys.includes(index) && "🔑"}

                {index === doorPos && "🚪"}
              </div>
            );
          })}
        </div>

        {/* 🔺 ARROWS BETWEEN CELLS */}
        {moves.map((m, i) => {
          const row = Math.floor(player / gridSize);
          const col = player % gridSize;

          let top = row * 80;
          let left = col * 80;

          let arrow = "";

          if (m === player - gridSize) {
            top -= 10;
            left += 30;
            arrow = "▲";
          }
          if (m === player + gridSize) {
            top += 70;
            left += 30;
            arrow = "▼";
          }
          if (m === player - 1) {
            top += 30;
            left -= 10;
            arrow = "◀";
          }
          if (m === player + 1) {
            top += 30;
            left += 70;
            arrow = "▶";
          }

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top,
                left,
                fontSize: 14,
                pointerEvents: "none"
              }}
            >
              {arrow}
            </div>
          );
        })}

      </div>
    </div>
  );
}