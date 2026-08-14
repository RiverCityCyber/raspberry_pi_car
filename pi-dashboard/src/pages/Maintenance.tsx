import React, { useState, useEffect, useCallback } from "react";

const C = {
  bg: "#14171B",
  panel: "#1B1F24",
  panelBorder: "#2A2F36",
  ink: "#F2F4F6",
  inkDim: "#8A929B",
  accent: "#6d4aff",
  success: "#2dd4bf",
  successDim: "rgba(45,212,191,0.08)",
};

const DISPLAY_FONT = "'Space Grotesk', 'Inter', sans-serif";
const CURRENT_MILEAGE = 225000;

export type MaintenanceTask = {
  id: string;
  description: string;
  triggerMileage: number;
  done?: boolean;
};

function MilestoneGroup({
  label,
  mileage,
  tasks,
  onToggle,
}: {
  label: string;
  mileage: number;
  tasks: MaintenanceTask[];
  onToggle: (id: string) => void;
}) {
  if (tasks.length === 0) return null;

  return (
    <div>
      <div className="flex items-baseline gap-2 mb-2">
        <span style={{ color: C.ink, fontSize: 13, fontWeight: 600 }}>{label}</span>
        <span style={{ color: C.inkDim, fontSize: 12 }}>
          {mileage.toLocaleString()} mi
        </span>
      </div>

      <div className="space-y-1">
        {tasks.map((task) => (
          <label
            key={task.id}
            className="flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-colors hover:bg-white/[0.03]"
            style={{ background: "transparent" }}
          >
            <span
              className="shrink-0 flex items-center justify-center rounded-md transition-all"
              style={{
                width: 20,
                height: 20,
                border: `1.5px solid ${task.done ? C.success : C.panelBorder}`,
                background: task.done ? C.successDim : "transparent",
              }}
            >
              {task.done && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 6.5L5 9L9.5 3"
                    stroke={C.success}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <input
              type="checkbox"
              checked={!!task.done}
              onChange={() => onToggle(task.id)}
              className="sr-only"
            />
            <span
              style={{
                color: task.done ? C.inkDim : C.ink,
                fontSize: 13,
                textDecoration: task.done ? "line-through" : "none",
                transition: "all 0.2s ease",
              }}
            >
              {task.description}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function Maintenance() {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from JSON file via Vite dev server plugin
  useEffect(() => {
    fetch("/api/maintenance-tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load maintenance tasks:", err);
        setLoading(false);
      });
  }, []);

  const persistTasks = useCallback((updated: MaintenanceTask[]) => {
    fetch("/api/maintenance-tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    }).catch((err) => {
      console.error("Failed to save maintenance tasks:", err);
    });
  }, []);

  const toggleDone = (id: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      );
      persistTasks(updated);
      return updated;
    });
  };

  const dueNow = tasks.filter(
    (t) => !t.done && t.triggerMileage <= CURRENT_MILEAGE
  );
  const upcoming = tasks.filter(
    (t) => !t.done && t.triggerMileage > CURRENT_MILEAGE
  );

  const groupByMileage = (list: MaintenanceTask[]): number[] => {
    return [...new Set(list.map((t) => t.triggerMileage))].sort((a, b) => a - b);
  };

  const dueMileages = groupByMileage(dueNow);
  const upcomingMileages = groupByMileage(upcoming);

  if (loading) {
    return (
      <div
        className="min-h-full p-4 flex items-center justify-center"
        style={{ background: C.bg, fontFamily: DISPLAY_FONT }}
      >
        <span style={{ color: C.inkDim, fontSize: 14 }}>Loading maintenance…</span>
      </div>
    );
  }

  return (
    <div
      className="min-h-full p-4 flex flex-col gap-4"
      style={{ background: C.bg, fontFamily: DISPLAY_FONT }}
    >
      <div className="flex items-end justify-between">
        <h1 style={{ color: C.ink, fontSize: 18, fontWeight: 600 }}>
          Maintenance Tracker
        </h1>
        <div className="flex items-baseline gap-1.5">
          <span style={{ color: C.inkDim, fontSize: 12 }}>Current:</span>
          <span style={{ color: C.accent, fontSize: 16, fontWeight: 600 }}>
            {CURRENT_MILEAGE.toLocaleString()} mi
          </span>
        </div>
      </div>

      {/* Due Now */}
      <div
        className="rounded-2xl p-4"
        style={{ background: C.panel, border: `1px solid ${C.panelBorder}` }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: dueNow.length > 0 ? C.accent : C.success,
            }}
          />
          <h2 style={{ color: C.ink, fontSize: 14, fontWeight: 600 }}>
            Due Now
          </h2>
          <span style={{ color: C.inkDim, fontSize: 12 }}>
            {dueNow.length} item{dueNow.length !== 1 ? "s" : ""}
          </span>
        </div>

        {dueMileages.map((mi) => (
          <div key={mi} className="mb-4 last:mb-0">
            <MilestoneGroup
              label="Milestone"
              mileage={mi}
              tasks={dueNow.filter((t) => t.triggerMileage === mi)}
              onToggle={toggleDone}
            />
          </div>
        ))}

        {dueNow.length === 0 && (
          <p style={{ color: C.inkDim, fontSize: 13 }}>
            ✓ All caught up — nothing due at this mileage.
          </p>
        )}
      </div>

      {/* Upcoming */}
      <div
        className="rounded-2xl p-4"
        style={{ background: C.panel, border: `1px solid ${C.panelBorder}` }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: C.inkDim,
            }}
          />
          <h2 style={{ color: C.ink, fontSize: 14, fontWeight: 600 }}>
            Upcoming
          </h2>
          <span style={{ color: C.inkDim, fontSize: 12 }}>
            {upcoming.length} item{upcoming.length !== 1 ? "s" : ""}
          </span>
        </div>

        {upcomingMileages.map((mi) => (
          <div key={mi} className="mb-4 last:mb-0">
            <MilestoneGroup
              label="Milestone"
              mileage={mi}
              tasks={upcoming.filter((t) => t.triggerMileage === mi)}
              onToggle={toggleDone}
            />
          </div>
        ))}

        {upcoming.length === 0 && (
          <p style={{ color: C.inkDim, fontSize: 13 }}>
            No upcoming milestones scheduled.
          </p>
        )}
      </div>
    </div>
  );
}