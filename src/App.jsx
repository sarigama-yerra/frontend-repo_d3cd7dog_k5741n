import React, { useMemo, useState } from 'react'
import PergolaScene from './components/PergolaScene'

function App() {
  const defaultRacks = Number((import.meta.env.VITE_NUMBER_OF_RACKS || '').trim()) || 6
  const [rackCount, setRackCount] = useState(defaultRacks)

  const options = useMemo(() => [4,6,8,10,12,14,16].map(n => ({label:`${n} Racks`, value:n})), [])

  return (
    <div className="relative min-h-screen">
      <PergolaScene rackCount={rackCount} />

      {/* Minimal control overlay */}
      <div className="pointer-events-auto fixed left-4 bottom-4 z-50 bg-slate-900/60 backdrop-blur-md border border-cyan-400/30 rounded-xl px-3 py-2 shadow-lg text-cyan-100 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-cyan-300/80">Racks:</span>
          <select
            className="bg-transparent outline-none border border-cyan-500/30 rounded px-2 py-1"
            value={rackCount}
            onChange={e => setRackCount(Number(e.target.value))}
          >
            {options.map(o => (
              <option key={o.value} value={o.value} className="bg-slate-900">
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default App
