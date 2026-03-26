import { useState, useRef, useCallback } from "react";

function createConfetti() {
  const container = document.createElement("div");
  container.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden";
  document.body.appendChild(container);

  const colors = [
    "#E32017",
    "#FFD300",
    "#003688",
    "#00782A",
    "#9B0056",
    "#0098D4",
    "#EE7C0E",
    "#F3A9BB",
  ];

  for (let i = 0; i < 150; i++) {
    const piece = document.createElement("div");
    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const duration = Math.random() * 2 + 2;
    const rotation = Math.random() * 720 - 360;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = Math.random() > 0.5 ? "50%" : "0";

    piece.style.cssText = `
      position:absolute;
      top:-20px;
      left:${left}%;
      width:${size}px;
      height:${size * 0.6}px;
      background:${color};
      border-radius:${shape};
      animation:confetti-fall ${duration}s ease-in ${delay}s forwards;
    `;
    container.appendChild(piece);
  }

  if (!document.getElementById("confetti-style")) {
    const style = document.createElement("style");
    style.id = "confetti-style";
    style.textContent = `
      @keyframes confetti-fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(${360}deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => container.remove(), 5000);
}

function createFlyingPlane() {
  const plane = document.createElement("div");
  plane.style.cssText =
    "position:fixed;top:40%;left:-100px;z-index:9999;pointer-events:none;font-size:64px;transition:none;";
  plane.textContent = "✈️";
  document.body.appendChild(plane);

  if (!document.getElementById("plane-style")) {
    const style = document.createElement("style");
    style.id = "plane-style";
    style.textContent = `
      @keyframes fly-across {
        0% { left: -100px; top: 40%; transform: rotate(-10deg); }
        30% { top: 25%; }
        50% { top: 35%; }
        70% { top: 20%; }
        100% { left: calc(100vw + 100px); top: 30%; transform: rotate(-10deg); }
      }
    `;
    document.head.appendChild(style);
  }

  plane.style.animation = "fly-across 3s ease-in-out forwards";
  setTimeout(() => plane.remove(), 4000);
}

export default function LogoEasterEgg() {
  const [clickCount, setClickCount] = useState(0);
  const eggStage = useRef(0); // 0 = next is confetti, 1 = next is plane

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const next = clickCount + 1;
      setClickCount(next);

      if (next === 7) {
        if (eggStage.current === 0) {
          createConfetti();
          eggStage.current = 1;
        } else {
          createFlyingPlane();
          eggStage.current = 0;
        }
        setClickCount(0);
      }
    },
    [clickCount]
  );

  return (
    <a href="/" onClick={handleClick} style={{ display: 'inline-flex', flexShrink: 0 }}>
      <img src="/team_logo.png" alt="7 Flights London" width="48" height="48" style={{ height: '48px', width: '48px' }} />
    </a>
  );
}
