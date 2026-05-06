// PopupAd.jsx
// Fake casino popup ad — fires after a delay, styled like early 2010s web ads.
// Jarring by design. That's the point.
import { useState, useEffect } from "react";

const ADS = [
  {
    headline: "🎰 YOU'VE BEEN SELECTED!",
    body: "Claim your FREE 1000 coins! Limited time offer for players aged 13+!",
    cta: "CLAIM NOW",
    sub: "*No purchase necessary. Must be 13 or older.",
  },
  {
    headline: "⚡ DAILY BONUS READY!",
    body: "Don't miss out! Your friends are opening loot boxes RIGHT NOW.",
    cta: "OPEN BOXES",
    sub: "*Odds of legendary item: 0.3%",
  },
  {
    headline: "🏆 EXCLUSIVE OFFER!",
    body: "Buy the Season Pass and get a FREE mystery crate! Valued at $29.99!",
    cta: "BUY NOW — $9.99",
    sub: "*Contents randomized. No refunds on opened crates.",
  },
];

export default function PopupAd() {
  const [visible, setVisible] = useState(false);
  const [adIndex, setAdIndex] = useState(0);
  const [dismissed, setDismissed] = useState(0);

  useEffect(() => {
    // First popup fires after 3s
    const t1 = setTimeout(() => {
      setAdIndex(0);
      setVisible(true);
    }, 3000);
    return () => clearTimeout(t1);
  }, []);

  function dismiss() {
    setVisible(false);
    setDismissed(d => d + 1);
    // Fire another ad after a bit — just like real ones
    if (dismissed < 2) {
      setTimeout(() => {
        setAdIndex(i => (i + 1) % ADS.length);
        setVisible(true);
      }, 8000);
    }
  }

  if (!visible) return null;

  const ad = ADS[adIndex];

  return (
    <div style={styles.overlay} role="dialog" aria-modal="true" aria-label="Advertisement">
      <div style={styles.popup}>
        {/* Fake browser chrome */}
        <div style={styles.chrome}>
          <span style={styles.chromeTitle}>🔒 secure-gaming-rewards.com</span>
          <button
            style={styles.closeBtn}
            onClick={dismiss}
            aria-label="Close advertisement"
          >
            ✕
          </button>
        </div>

        {/* Ad content */}
        <div style={styles.body}>
          <div style={styles.flashBanner}>★ CONGRATULATIONS ★</div>
          <h3 style={styles.headline}>{ad.headline}</h3>
          <p style={styles.adBody}>{ad.body}</p>

          <div style={styles.ctaWrapper}>
            <button style={styles.ctaBtn} onClick={dismiss}>{ad.cta}</button>
            <button style={styles.skipBtn} onClick={dismiss}>
              No thanks, I don't want free rewards
            </button>
          </div>

          <p style={styles.fine}>{ad.sub}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  },
  popup: {
    background: "#f0f0f0",
    width: "min(420px, 95vw)",
    borderRadius: "6px",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
    border: "2px solid #999",
    animation: "popIn 0.3s ease",
  },
  chrome: {
    background: "#e0e0e0",
    borderBottom: "1px solid #bbb",
    padding: "6px 10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chromeTitle: {
    fontSize: "0.7rem",
    color: "#555",
    fontFamily: "monospace",
  },
  closeBtn: {
    background: "#cc3300",
    border: "none",
    color: "white",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    fontSize: "0.6rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  body: {
    padding: "1.5rem",
    textAlign: "center",
    background: "linear-gradient(135deg, #1a0a00, #3d0000)",
    color: "white",
  },
  flashBanner: {
    background: "#ffd700",
    color: "#1a0a00",
    fontWeight: "900",
    fontSize: "0.75rem",
    padding: "0.4rem 1rem",
    letterSpacing: "0.15em",
    marginBottom: "1rem",
    animation: "flash 0.8s ease infinite alternate",
  },
  headline: {
    fontSize: "1.3rem",
    fontWeight: "900",
    marginBottom: "0.75rem",
    fontFamily: "Impact, sans-serif",
    color: "#ffd700",
    textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
  },
  adBody: {
    fontSize: "0.9rem",
    lineHeight: "1.5",
    marginBottom: "1.5rem",
    color: "#f0f0f0",
  },
  ctaWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  ctaBtn: {
    background: "#00cc44",
    border: "3px solid #00ff55",
    color: "white",
    fontWeight: "900",
    fontSize: "1rem",
    padding: "0.8rem",
    cursor: "pointer",
    fontFamily: "Impact, sans-serif",
    letterSpacing: "0.1em",
    boxShadow: "0 4px 0 #008833",
    transition: "transform 0.1s",
  },
  skipBtn: {
    background: "transparent",
    border: "none",
    color: "#666",
    fontSize: "0.65rem",
    cursor: "pointer",
    textDecoration: "underline",
  },
  fine: {
    fontSize: "0.55rem",
    color: "#888",
    lineHeight: "1.4",
  },
};
