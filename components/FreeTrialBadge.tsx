'use client';

export default function FreeTrialBadge() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
      <a 
        href="https://bpmscloud.com" 
        target="_blank" 
        rel="noreferrer"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          background: "linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)",
          color: "white",
          textDecoration: "none",
          borderRadius: "50px",
          fontWeight: "600",
          fontSize: "14px",
          letterSpacing: "0.5px",
          boxShadow: "0 8px 24px rgba(255, 107, 107, 0.4)",
          transition: "all 0.3s ease",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(255, 107, 107, 0.6)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 107, 107, 0.4)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        🎯 FREE TRIAL
      </a>
    </div>
  );
}
