// RouletteWheel.jsx
// Interactive CSS roulette wheel — Chapter 3 centerpiece
import { useState, useRef } from "react";

const NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36,
  11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9,
  22, 18, 29, 7, 28, 12, 35, 3, 26,
];

const RED = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);

export default function RouletteWheel() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [totalSpins, setTotalSpins] = useState(0);
  const [losses, setLosses] = useState(0);
  const wheelRef = useRef(null);
  const currentRotation = useRef(0);

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const extra = 1800 + Math.random() * 1440; // 5–9 full rotations
    currentRotation.current += extra;

    if (wheelRef.current) {
      wheelRef.current.style.transition = `transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)`;
      wheelRef.current.style.transform = `rotate(${currentRotation.current}deg)`;
    }

    setTimeout(() => {
      const segAngle = 360 / NUMBERS.length;
      const normalised = ((currentRotation.current % 360) + 360) % 360;
      const idx = Math.floor((360 - normalised) / segAngle) % NUMBERS.length;
      const landed = NUMBERS[idx];

      setResult(landed);
      setTotalSpins(s => s + 1);
      // Roughly simulate the house edge: lose ~55% of the time for simplicity
      if (Math.random() < 0.55) setLosses(l => l + 1);

      setSpinning(false);
    }, 4100);
  }

  const color = result === null ? null : result === 0 ? "green" : RED.has(result) ? "red" : "black";
  const lossRate = totalSpins > 0 ? Math.round((losses / totalSpins) * 100) : null;

  return (
    <div style={styles.wrapper}>
      <div style={styles.wheelContainer}>
        {/* Pointer */}
        <div style={styles.pointer}>▼</div>

        {/* Wheel */}
        <div ref={wheelRef} style={styles.wheel}>
          {NUMBERS.map((n, i) => {
            const angle = (360 / NUMBERS.length) * i;
            const isRed = RED.has(n);
            const isGreen = n === 0;
            return (
              <div
                key={n}
                style={{
                  ...styles.segment,
                  transform: `rotate(${angle}deg)`,
                  background: isGreen ? "#1a6b1a" : isRed ? "#c0392b" : "#111",
                }}
              >
                <span style={styles.segNum}>{n}</span>
              </div>
            );
          })}
          <div style={styles.hub} />
        </div>
      </div>

      <div style={styles.controls}>
        <button
          onClick={spin}
          disabled={spinning}
          style={{ ...styles.spinBtn, opacity: spinning ? 0.5 : 1 }}
        >
          {spinning ? "SPINNING..." : "SPIN"}
        </button>

        {result !== null && (
          <div style={styles.result}>
            <span style={{ ...styles.resultNum, color: color === "red" ? "#ff4444" : color === "green" ? "#00ff88" : "#fff" }}>
              {result}
            </span>
            <span style={styles.resultColor}>{color?.toUpperCase()}</span>
          </div>
        )}

        {lossRate !== null && (
          <p style={styles.counter}>
            {totalSpins} spins — lost <strong style={{ color: "#ff003c" }}>{lossRate}%</strong> of the time
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    padding: "2rem 0",
  },
  wheelContainer: {
    position: "relative",
    width: "280px",
    height: "280px",
  },
  pointer: {
    position: "absolute",
    top: "-20px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "#ffd700",
    fontSize: "1.5rem",
    zIndex: 10,
    filter: "drop-shadow(0 0 6px #ffd700)",
  },
  wheel: {
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    position: "relative",
    border: "6px solid #ffd700",
    boxShadow: "0 0 30px rgba(255, 215, 0, 0.4), inset 0 0 20px rgba(0,0,0,0.5)",
    overflow: "hidden",
  },
  segment: {
    position: "absolute",
    width: "50%",
    height: "2px",
    top: "50%",
    left: "50%",
    transformOrigin: "0 50%",
    display: "flex",
    alignItems: "center",
  },
  segNum: {
    fontSize: "0.45rem",
    color: "rgba(255,255,255,0.9)",
    fontFamily: "'Syne Mono', monospace",
    marginLeft: "8px",
    transform: "rotate(5deg)",
  },
  hub: {
    position: "absolute",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "#ffd700",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 5,
    boxShadow: "0 0 12px #ffd700",
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  spinBtn: {
    background: "transparent",
    border: "2px solid #ffd700",
    color: "#ffd700",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "0.75rem",
    padding: "1rem 2.5rem",
    cursor: "pointer",
    letterSpacing: "0.1em",
    transition: "all 0.2s",
  },
  result: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.25rem",
  },
  resultNum: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "2rem",
    textShadow: "0 0 20px currentColor",
  },
  resultColor: {
    fontFamily: "'Syne Mono', monospace",
    fontSize: "0.8rem",
    color: "#888",
    letterSpacing: "0.15em",
  },
  counter: {
    fontFamily: "'Syne Mono', monospace",
    fontSize: "0.85rem",
    color: "#888",
    textAlign: "center",
  },
};
