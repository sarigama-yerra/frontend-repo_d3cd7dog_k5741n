import React, { useEffect, useMemo, useState } from 'react'
import Rack from './Rack'
import { Camera, Cpu, Activity } from 'lucide-react'

const uiFormat = (v, unit='') => `${v}${unit}`

export default function PergolaScene({ rackCount = 6 }) {
  const [data, setData] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchData = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/telemetry?racks=${rackCount}`)
      const json = await res.json()
      setData(json)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchData()
    const id = setInterval(fetchData, 4000)
    return () => clearInterval(id)
  }, [rackCount])

  const racks = useMemo(() => Array.from({ length: rackCount }), [rackCount])

  const centerIdx = Math.floor(rackCount / 2)

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Night sky gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.18),transparent_60%)]" />

      {/* Floor */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[radial-gradient(circle_at_50%_10%,rgba(0,0,0,0.6),transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.7))]" />
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-[repeating-linear-gradient(45deg,rgba(226,232,240,0.06)_0px,rgba(226,232,240,0.06)_2px,transparent_2px,transparent_16px)]" />

      {/* Pergola structure */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-28">
        <div className="relative border border-emerald-400/20 rounded-3xl p-6 bg-gradient-to-b from-emerald-500/5 via-cyan-500/5 to-transparent shadow-[0_0_60px_rgba(34,197,94,0.2)]">
          {/* Shade-net roof */}
          <div className="absolute -top-8 left-6 right-6 h-20 bg-[repeating-linear-gradient(90deg,rgba(16,185,129,0.22)_0px,rgba(16,185,129,0.22)_3px,transparent_3px,transparent_12px)] blur-[0.5px] rounded-t-2xl border-t border-emerald-400/30" />
          {/* Columns */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-8 top-0 bottom-0 w-2 bg-gradient-to-b from-slate-200/70 to-slate-500/70 rounded-full" />
            <div className="absolute right-8 top-0 bottom-0 w-2 bg-gradient-to-b from-slate-200/70 to-slate-500/70 rounded-full" />
          </div>

          {/* Warm architectural lights */}
          <div className="absolute -top-4 left-10 w-24 h-2 rounded-full bg-amber-300/40 blur-md" />
          <div className="absolute -top-4 right-10 w-24 h-2 rounded-full bg-amber-300/40 blur-md" />

          {/* Racks grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 place-items-center">
            {racks.map((_, i) => (
              <Rack key={i} rack={i+1} telemetry={data?.racks?.[i]} />
            ))}
          </div>

          {/* Raspberry Pi control box */}
          <div className="mt-8 flex items-center gap-3 bg-slate-900/60 border border-cyan-500/20 rounded-xl px-4 py-3 w-fit backdrop-blur-sm">
            <Cpu className="text-cyan-300" size={18} />
            <span className="text-sm text-cyan-100/90">Raspberry Pi Controller</span>
            <span className="ml-2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
          </div>
        </div>
      </div>

      {/* Floating UI panel over center rack */}
      {data && (
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-24 z-20">
          <div className="relative rounded-2xl bg-slate-900/40 border border-cyan-400/30 px-5 py-4 backdrop-blur-md shadow-[0_0_40px_rgba(16,185,129,0.25)]">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-cyan-400/10 via-emerald-400/10 to-sky-400/10 blur-lg" />
            <div className="relative flex items-center gap-6 text-sm text-cyan-100">
              <div>
                <div className="text-xs uppercase tracking-wider text-cyan-300/80">Rack #{centerIdx+1}</div>
                <div className="text-[10px] text-cyan-200/60">{data.timestamp}</div>
              </div>
              <div className="h-8 w-px bg-cyan-400/20" />
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-[10px] text-cyan-300/70">Temperature</div>
                  <div className="text-base font-semibold">{uiFormat(data.racks[centerIdx]?.temperature_c.toFixed(1),'°C')}</div>
                </div>
                <div>
                  <div className="text-[10px] text-cyan-300/70">Humidity</div>
                  <div className="text-base font-semibold">{uiFormat(Math.round(data.racks[centerIdx]?.humidity_pct),'%')}</div>
                </div>
                <div>
                  <div className="text-[10px] text-cyan-300/70">Growth</div>
                  <div className="text-base font-semibold">{data.racks[centerIdx]?.growth_status}</div>
                </div>
              </div>
              <div className="h-8 w-px bg-cyan-400/20" />
              <div className="flex items-center gap-2 text-[10px] text-cyan-300/70">
                <Activity size={14} className="text-emerald-300" /> Live
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security camera and PiP */}
      <div className="absolute top-6 right-6 z-30 flex items-start gap-3">
        <div className="relative w-32 h-20 rounded-md overflow-hidden border border-slate-700 bg-black/70 shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.07),transparent_70%)]" />
          <div className="absolute left-0 top-0 text-[9px] text-blue-200/80 px-1.5 py-0.5 bg-black/60">{new Date().toISOString().slice(0,19).replace('T',' ')}</div>
          <div className="absolute right-1 top-1 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)]" />
          {/* Fake live feed with subtle grain */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.15),transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.12] bg-[repeating-linear-gradient(0deg,white_0px,white_1px,transparent_1px,transparent_2px)] mix-blend-overlay" />
          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-[shimmer_5s_linear_infinite]" />
        </div>
        <div className="mt-4 flex items-center gap-1 text-cyan-200/70 text-xs">
          <Camera size={14} className="text-cyan-300" />
          Cam-01
        </div>
      </div>

      <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
    </div>
  )
}
