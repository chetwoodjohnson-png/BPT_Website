'use client';

export default function FreeTrialBadge() {
  return (
    <div style={{ position: "relative", width: "100%", height: "0" }}>
      <a 
        href="https://bpmscloud.com" 
        target="_blank" 
        rel="noreferrer"
        style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "140px",
          height: "140px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)",
          color: "white",
          textDecoration: "none",
          fontWeight: "700",
          fontSize: "11px",
          letterSpacing: "1px",
          boxShadow: "0 12px 32px rgba(255, 107, 107, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
          transition: "all 0.3s ease",
          border: "2px solid rgba(255, 255, 255, 0.4)",
          cursor: "pointer",
          textAlign: "center",
          padding: "10px",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          zIndex: 50,
          lineHeight: "1.2",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 16px 40px rgba(255, 107, 107, 0.7), inset 0 2px 4px rgba(255, 255, 255, 0.3)";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(255, 107, 107, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        🎯<br />FREE<br />TRIAL
      </a>
    </div>
  );
}
