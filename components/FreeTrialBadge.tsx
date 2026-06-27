'use client';

export default function FreeTrialBadge() {
  return (
    <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 100 }}>
      <a 
        href="https://bpmscloud.com" 
        target="_blank" 
        rel="noreferrer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "160px",
          height: "160px",
          background: "linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)",
          color: "white",
          textDecoration: "none",
          fontWeight: "700",
          fontSize: "18px",
          letterSpacing: "1px",
          boxShadow: "0 16px 40px rgba(255, 107, 107, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
          transition: "all 0.3s ease",
          border: "3px solid rgba(255, 255, 255, 0.4)",
          cursor: "pointer",
          textAlign: "center",
          padding: "20px",
          borderRadius: "20px",
          position: "relative",
          lineHeight: "1.3",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 20px 50px rgba(255, 107, 107, 0.7), inset 0 2px 4px rgba(255, 255, 255, 0.3)";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 16px 40px rgba(255, 107, 107, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3)";
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
          borderTop: "15px solid #ff5252",
          borderRight: "0px solid transparent",
        }} />
        
        <div>🎯</div>
        <div style={{ fontSize: "14px", fontWeight: "800", marginTop: "4px" }}>FREE</div>
        <div style={{ fontSize: "14px", fontWeight: "800" }}>TRIAL</div>
      </a>
    </div>
  );
}
