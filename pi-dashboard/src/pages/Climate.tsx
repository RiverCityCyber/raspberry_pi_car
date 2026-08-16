import React from "react";

import { C, DISPLAY_FONT } from "../theme";


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
