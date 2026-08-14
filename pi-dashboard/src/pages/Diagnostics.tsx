import React from "react";
import { Gauge, Wrench, Snowflake, Activity } from "lucide-react";

//shared palette
const C = {
  bg: "#14171B",
  panel: "#1B1F24",
  panelBorder: "#2A2F36",
  ink: "#F2F4F6",
  inkDim: "#8A929B",
  teal: "#5EEAD4",
};

const DISPLAY_FONT = "'Space Grotesk', 'Inter', sans-serif";

export type PageKey = "diagnostics" | "maintenance" | "climate" | "performance";

interface NavTitle {
  key: PageKey;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
}

const TILES: NavTitle[] = [
  { key: "diagnostics", label: "Diagnostics", icon: Gauge },
  { key: "maintenance", label: "Maintenance", icon: Wrench },
  { key: "climate", label: "A/C", icon: Snowflake },
  { key: "performance", label: "Performance", icon: Activity },
]

interface AppProps {
  //placeholder, will update later for real data
  onNavigate?: (page: PageKey) => void;
}

export default function App({ onNavigate }: AppProps) {
  return (
  <div className="min-h-full p-4" style={{ background: C.bg, fontFamily: DISPLAY_FONT }}>
      <h1 style={{ color: C.ink, fontSize: 18, fontWeight: 600 }}>Run Diagnostics</h1>
      <div
        className="rounded-2xl p-4 mt-3"
        style={{ background: C.panel, border: `1px solid ${C.panelBorder}` }}
      >
        <p style={{ color: C.inkDim, fontSize: 13 }}>
          Placeholder — build out mileage-based service items here (oil, timing belt, etc.)
        </p>
        <button onClick = { () => alert('Running Diagnostics') }>Run Diagnostics</button>
      </div>
    </div>
  );
}