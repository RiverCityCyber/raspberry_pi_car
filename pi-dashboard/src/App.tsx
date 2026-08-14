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
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 p-6"
    style={{ background: C.bg, fontFamily: DISPLAY_FONT }}>
      <span style={{ color: C.inkDim, fontSize: 12, letterSpacing: "0.14em" }}
      className="uppercase">Welcome • Select a page</span>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {TILES.map(({ key, label, icon: Icon }) => (
          <button key={key}
          onClick={() => onNavigate?.(key)}
          className="flex flex-col items-center justify-center gap-3 rounded-2xl py-8"
          style={{
            background: C.panel,
            border: '1px solid ${C.panelBorder}',
            color: C.ink,
          }}>
            <Icon size={36} color={C.teal} />
            <span style={{ fontSize: 14, letterSpacing: "0.04em" }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}