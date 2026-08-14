import React from "react";

const C = {
  bg: "#14171B",
  panel: "#1B1F24",
  panelBorder: "#2A2F36",
  ink: "#F2F4F6",
  inkDim: "#8A929B",
};

const DISPLAY_FONT = "'Space Grotesk', 'Inter', sans-serif";

export default function Climate() {
  return (
    <div className="min-h-full p-4" style={{ background: C.bg, fontFamily: DISPLAY_FONT }}>
      <h1 style={{ color: C.ink, fontSize: 18, fontWeight: 600 }}>A/C</h1>
      <div
        className="rounded-2xl p-4 mt-3"
        style={{ background: C.panel, border: `1px solid ${C.panelBorder}` }}
      >
        <p style={{ color: C.inkDim, fontSize: 13 }}>
          Placeholder — climate controls/readouts go here.
        </p>
      </div>
    </div>
  );
}
