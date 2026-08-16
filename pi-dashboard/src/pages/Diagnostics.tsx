import React from "react";
import { Radio, TriangleAlert, CircleCheck } from "lucide-react";
import { C, DISPLAY_FONT, MONO_FONT, glow, bezelStyle } from "../theme";

const SWEEP = 270;
const START_ANGLE = -225;

function pctFor(value: number, min: number, max: number) {
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

function zoneColor(pct: number, warnPct: number, dangerPct: number) {
  if (pct >= dangerPct) return C.danger;
  if (pct >= warnPct) return C.warn;
  return C.good;
}

interface GaugeArcProps {
  value: number;
  min: number;
  max: number;
  label: string;
  unit: string;
  decimals?: number;
  warnPct?: number;
  dangerPct?: number;
  size?: number;
}

function GaugeArc({
  value, min, max, label, unit, decimals = 0,
  warnPct = 0.78, dangerPct = 0.92, size = 176,
}: GaugeArcProps) {
  const r = 78;
  const circumference = 2 * Math.PI * r;
  const arcLength = circumference * (SWEEP / 360);
  const pct = pctFor(value, min, max);
  const color = zoneColor(pct, warnPct, dangerPct);

  const needleAngle = START_ANGLE + pct * SWEEP;
  const needleRad = (needleAngle * Math.PI) / 180;
  const needleLen = r - 10;
  const nx = 100 + needleLen * Math.cos(needleRad);
  const ny = 100 + needleLen * Math.sin(needleRad);
  const ticks = Array.from({ length: 10 }, (_, i) => i / 9);

  return (
    <div className="flex flex-col items-center rounded-md" style={{ ...bezelStyle, padding: "14px 10px" }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 200 200" width={size} height={size}>
          <g transform={`rotate(${START_ANGLE} 100 100)`}>
            <circle cx="100" cy="100" r={r} fill="none" stroke={C.chrome} strokeOpacity={0.25}
              strokeWidth="9" strokeLinecap="butt" strokeDasharray={`${arcLength} ${circumference}`} />
            <circle cx="100" cy="100" r={r} fill="none" stroke={color}
              strokeWidth="9" strokeLinecap="butt"
              strokeDasharray={`${arcLength * pct} ${circumference}`}
              style={{ transition: "stroke-dasharray 400ms ease, stroke 400ms ease", filter: `drop-shadow(0 0 4px ${color})` }} />
          </g>
          {ticks.map((t, i) => {
            const ang = ((START_ANGLE + t * SWEEP) * Math.PI) / 180;
            const outer = r + 8, inner = r - 2;
            const x1 = 100 + inner * Math.cos(ang), y1 = 100 + inner * Math.sin(ang);
            const x2 = 100 + outer * Math.cos(ang), y2 = 100 + outer * Math.sin(ang);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.inkDim} strokeWidth={i === 0 || i === ticks.length - 1 ? 2 : 1} opacity={0.6} />;
          })}
          <line x1="100" y1="100" x2={nx} y2={ny} stroke={C.ink} strokeWidth="2.5" strokeLinecap="round"
            style={{ transition: "all 400ms ease", filter: `drop-shadow(0 0 3px ${C.ink})` }} />
          <circle cx="100" cy="100" r="4" fill={C.ink} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ marginTop: 18 }}>
          <span style={{ fontFamily: MONO_FONT, color, fontSize: 30, fontWeight: 700, letterSpacing: "0.03em", textShadow: glow(color) }}>
            {value.toFixed(decimals)}
          </span>
          <span style={{ fontFamily: MONO_FONT, color: C.inkDim, fontSize: 11, letterSpacing: "0.08em" }}>{unit}</span>
        </div>
      </div>
      <span style={{ fontFamily: DISPLAY_FONT, color: C.inkDim, fontSize: 12, letterSpacing: "0.14em" }} className="uppercase mt-1">
        {label}
      </span>
    </div>
  );
}

interface DigitalReadoutProps {
  label: string; value: number; unit: string; decimals?: number;
  warnBelow?: number; warnAbove?: number;
}

function DigitalReadout({ label, value, unit, decimals = 1, warnBelow, warnAbove }: DigitalReadoutProps) {
  let color = C.good;
  if (warnBelow !== undefined && value <= warnBelow) color = C.danger;
  if (warnAbove !== undefined && value >= warnAbove) color = C.warn;

  return (
    <div className="flex-1 rounded-md flex flex-col items-center justify-center py-4" style={bezelStyle}>
      <div className="flex items-baseline gap-1">
        <span style={{ fontFamily: MONO_FONT, color, fontSize: 26, fontWeight: 700, textShadow: glow(color) }}>
          {value.toFixed(decimals)}
        </span>
        <span style={{ fontFamily: MONO_FONT, color: C.inkDim, fontSize: 12 }}>{unit}</span>
      </div>
      <span style={{ fontFamily: DISPLAY_FONT, color: C.inkDim, fontSize: 11, letterSpacing: "0.14em" }} className="uppercase mt-1">
        {label}
      </span>
    </div>
  );
}

function DtcPanel() {
  const codes = [{ code: "P0300", desc: "Random/multiple cylinder misfire", status: "stored" }];
  const hasActive = codes.some((c) => c.status === "active");

  return (
    <div className="rounded-md px-4 py-3" style={bezelStyle}>
      <div className="flex items-center justify-between mb-2">
        <span style={{ fontFamily: DISPLAY_FONT, color: C.inkDim, fontSize: 11, letterSpacing: "0.14em" }} className="uppercase">
          Diagnostic Trouble Codes
        </span>
        {hasActive ? (
          <span className="flex items-center gap-1" style={{ color: C.danger, fontSize: 11, textShadow: glow(C.danger) }}>
            <TriangleAlert size={13} /> ACTIVE
          </span>
        ) : (
          <span className="flex items-center gap-1" style={{ color: C.good, fontSize: 11, textShadow: glow(C.good) }}>
            <CircleCheck size={13} /> NO ACTIVE CODES
          </span>
        )}
      </div>
      {codes.length === 0 ? (
        <p style={{ fontFamily: MONO_FONT, color: C.inkDim, fontSize: 13 }}>— none stored —</p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {codes.map((c) => (
            <li key={c.code} className="flex items-center gap-3">
              <span style={{ fontFamily: MONO_FONT, color: c.status === "active" ? C.danger : C.warn, fontSize: 14, fontWeight: 700, textShadow: glow(c.status === "active" ? C.danger : C.warn) }}>
                {c.code}
              </span>
              <span style={{ fontFamily: DISPLAY_FONT, color: C.ink, fontSize: 13 }}>{c.desc}</span>
              <span style={{ fontFamily: DISPLAY_FONT, color: C.inkDim, fontSize: 11 }} className="uppercase ml-auto">
                {c.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Diagnostics() {
  const data = { rpm: 2150, speed: 42, coolant: 92, voltage: 14.1, fuel: 68, intakeTemp: 34 };

  return (
    <div className="min-h-full w-full flex flex-col gap-4 p-4" style={{ background: C.bg, fontFamily: DISPLAY_FONT }}>
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col">
          <span style={{ color: C.inkDim, fontSize: 11, letterSpacing: "0.16em" }} className="uppercase">YD1 · 1st Gen</span>
          <span style={{ color: C.ink, fontSize: 18, fontWeight: 700, letterSpacing: "0.04em", textShadow: glow(C.ink) }}>MDX DIAGNOSTICS</span>
        </div>
        <div className="flex items-center gap-1.5" style={{ color: C.good, fontSize: 12, textShadow: glow(C.good) }}>
          <Radio size={14} />
          <span style={{ letterSpacing: "0.1em" }}>K-LINE CONNECTED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GaugeArc value={data.rpm} min={0} max={7000} label="Engine RPM" unit="rpm" warnPct={0.82} dangerPct={0.93} />
        <GaugeArc value={data.speed} min={0} max={140} label="Speed" unit="mph" warnPct={0.7} dangerPct={0.9} />
        <GaugeArc value={data.coolant} min={40} max={130} label="Coolant Temp" unit="°C" decimals={0} warnPct={0.75} dangerPct={0.88} />
      </div>

      <div className="flex gap-4">
        <DigitalReadout label="Battery" value={data.voltage} unit="V" decimals={1} warnBelow={11.8} warnAbove={14.8} />
        <DigitalReadout label="Fuel Level" value={data.fuel} unit="%" decimals={0} warnBelow={15} />
        <DigitalReadout label="Intake Air" value={data.intakeTemp} unit="°C" decimals={0} warnAbove={55} />
      </div>

      <DtcPanel />
    </div>
  );
}
