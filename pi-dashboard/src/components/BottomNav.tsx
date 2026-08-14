import React from "react";
import { Gauge, Wrench, Snowflake, Activity } from "lucide-react";
import type { PageKey } from "../App";

const C = {
  panel: "#1B1F24",
  panelBorder: "#2A2F36",
  ink: "#F2F4F6",
  inkDim: "#8A929B",
  teal: "#5EEAD4",
};

const DISPLAY_FONT = "'Space Grotesk', 'Inter', sans-serif";

interface NavItem {
  key: PageKey;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
}

const ITEMS: NavItem[] = [
  { key: "diagnostics", label: "Diagnostics", icon: Gauge },
  { key: "maintenance", label: "Maintenance", icon: Wrench },
  { key: "climate", label: "A/C", icon: Snowflake },
  { key: "performance", label: "Performance", icon: Activity },
];

interface BottomNavProps {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
}

export default function BottomNav({ activePage, onNavigate }: BottomNavProps) {
  return (
    <nav
      className="flex items-stretch w-full"
      style={{
        background: C.panel,
        borderTop: `1px solid ${C.panelBorder}`,
        fontFamily: DISPLAY_FONT,
        height: 72,
      }}
    >
      {ITEMS.map(({ key, label, icon: Icon }) => {
        const active = key === activePage;
        return (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            className="flex-1 flex flex-col items-center justify-center gap-1"
            style={{
              background: "transparent",
              borderTop: active ? `2px solid ${C.teal}` : "2px solid transparent",
              color: active ? C.teal : C.inkDim,
            }}
          >
            <Icon size={22} color={active ? C.teal : C.inkDim} />
            <span style={{ fontSize: 11, letterSpacing: "0.04em" }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
