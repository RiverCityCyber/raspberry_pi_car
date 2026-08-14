import React, { useState } from "react";
import BottomNav from "./components/BottomNav";
import Diagnostics from "./pages/Diagnostics";
import Maintenance from "./pages/Maintenance";
import Climate from "./pages/Climate";
import Performance from "./pages/Performance";

export type PageKey = "diagnostics" | "maintenance" | "climate" | "performance";

const C = {
  bg: "#14171B",
};

export default function App() {
  const [activePage, setActivePage] = useState<PageKey>("diagnostics");

  function renderPage() {
    switch (activePage) {
      case "diagnostics":
        return <Diagnostics />;
      case "maintenance":
        return <Maintenance />;
      case "climate":
        return <Climate />;
      case "performance":
        return <Performance />;
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col" style={{ background: C.bg }}>
      <div className="flex-1 overflow-y-auto">{renderPage()}</div>
      <BottomNav activePage={activePage} onNavigate={setActivePage} />
    </div>
  );
}
