// Shared 90s digital-dash theme — vacuum-fluorescent amber/green glow
// on dark brushed plastic, like a late-80s/early-90s Buick Reatta or
// Nissan 300ZX digital cluster.

export const C = {
  bg: "#0F0F0E",          // chassis black
  panel: "#1B1A17",       // brushed plastic panel
  panelBorder: "#3A362C", // recessed bezel edge
  chrome: "#6B675C",      // trim line
  ink: "#FFB020",         // primary amber glow (numerals)
  inkDim: "#8A6A35",      // dim amber (labels, inactive)
  good: "#39D67A",        // secondary green glow (normal/ok status)
  warn: "#FFB020",        // amber (warning zone)
  danger: "#FF3B3B",      // red (danger zone)
};

export const DISPLAY_FONT = "'Arial Narrow', 'Inter', sans-serif";
export const MONO_FONT = "'Courier New', 'Consolas', monospace";

// text-shadow glow to simulate a lit VFD segment
export const glow = (color: string) => `0 0 4px ${color}, 0 0 10px ${color}66`;

// shared bezel look for panels — dark plastic with a recessed inset edge
export const bezelStyle = {
  background: C.panel,
  border: `1px solid ${C.panelBorder}`,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -3px 6px rgba(0,0,0,0.5)",
};
