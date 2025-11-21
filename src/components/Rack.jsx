import React from 'react'
import { Droplets, Thermometer, Sun, Waves } from 'lucide-react'

function Tier({ index, glow=true }) {
  return (
    <div className="relative h-10 sm:h-12 md:h-14 flex items-center">
      <div className="absolute inset-0 rounded-sm bg-gradient-to-b from-slate-300/60 via-slate-200/40 to-slate-500/60 border border-white/30 shadow-inner" />
      <div className={`absolute inset-0 ${glow ? 'bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.15),transparent_60%)]' : ''}`} />
      <div className="relative mx-2 h-6 sm:h-7 md:h-8 w-[92%] rounded-[3px] bg-gradient-to-b from-emerald-500 via-green-500 to-lime-400 shadow-[inset_0_0_20px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-0 opacity-70 bg-[linear-gradient(120deg,rgba(59,130,246,0.2),transparent_30%,rgba(16,185,129,0.2),transparent_70%)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_2px,transparent_2px,transparent_10px)]" />
      </div>
    </div>
  )
}

export default function Rack({ rack, telemetry }) {
  const tiers = Array.from({ length: 6 })
  return (
    <div className="relative group">
      {/* Stainless frame */}
      <div className="relative bg-gradient-to-b from-slate-200/70 to-slate-500/70 rounded-xl p-2 border border-white/30 shadow-2xl backdrop-blur-sm">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-cyan-400/10 via-emerald-400/10 to-sky-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative grid grid-rows-6 gap-2">
          {tiers.map((_, i) => (
            <Tier key={i} index={i} />
          ))}
        </div>
        {/* LED bars */}
        <div className="pointer-events-none absolute left-1 right-1 top-3 bottom-3 flex flex-col justify-between">
          {tiers.map((_, i) => (
            <div key={i} className="h-1.5 mx-1 rounded-full bg-cyan-300/30 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          ))}
        </div>
      </div>

      {/* Sensor badges */}
      {telemetry && (
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-cyan-100/90">
          <div className="flex items-center gap-1.5 bg-slate-800/60 rounded-md px-2 py-1 border border-cyan-500/20">
            <Thermometer size={14} className="text-cyan-300" />
            <span>{telemetry.temperature_c.toFixed(1)}°C</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/60 rounded-md px-2 py-1 border border-cyan-500/20">
            <Droplets size={14} className="text-emerald-300" />
            <span>{telemetry.humidity_pct.toFixed(0)}%</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/60 rounded-md px-2 py-1 border border-cyan-500/20">
            <Sun size={14} className="text-sky-300" />
            <span>{telemetry.light_lux} lx</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/60 rounded-md px-2 py-1 border border-cyan-500/20">
            <Waves size={14} className="text-teal-300" />
            <span>{telemetry.moisture_pct.toFixed(0)}%</span>
          </div>
        </div>
      )}

      {/* Rack label */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-slate-900/70 border border-cyan-400/30 text-cyan-100 shadow-[0_0_12px_rgba(16,185,129,0.5)]">
        Rack #{rack}
      </div>
    </div>
  )
}
