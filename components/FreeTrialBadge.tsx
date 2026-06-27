'use client';

export default function FreeTrialBadge() {
  return (
    <div style={{ position: "fixed", top: "140px", right: "20px", zIndex: 10, pointerEvents: "none" }}>
      <a 
        href="https://bpmscloud.com" 
        target="_blank" 
        rel="noreferrer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "180px",
          height: "180px",
          background: "linear-gradient(135deg, #42d3ff 0%, #74f2bd 100%)",
          color: "#06111f",
          textDecoration: "none",
          fontWeight: "900",
          fontSize: "24px",
          letterSpacing: "1.5px",
          boxShadow: "0 16px 40px rgba(66, 211, 255, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
          transition: "all 0.3s ease",
          border: "3px solid rgba(255, 255, 255, 0.5)",
          cursor: "pointer",
          textAlign: "center",
          padding: "20px",
          borderRadius: "20px",
          position: "relative",
          lineHeight: "1.2",
          pointerEvents: "auto",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 20px 50px rgba(66, 211, 255, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.3)";
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 16px 40px rgba(66, 211, 255, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {/* Speech bubble pointer */}
        <div style={{
          position: "absolute",
          bottom: "-15px",
          right: "20px",
          width: "0",
          height: "0",
          borderLeft: "15px solid transparent",
          borderTop: "15px solid #74f2bd",
          borderRight: "0px solid transparent",
        }} />
        
        <div style={{ fontSize: "32px" }}>🎯</div>
        <div style={{ fontSize: "18px", fontWeight: "900", marginTop: "6px" }}>FREE</div>
        <div style={{ fontSize: "18px", fontWeight: "900" }}>TRIAL</div>
      </a>
    </div>
  );
}
