import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { revenueHistory } from '../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null
  return (
    <div className="glass-strong rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-xs font-medium text-white/50 mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-white/60">{entry.name}:</span>
          <span className="font-semibold">{entry.value.toLocaleString('sv-SE')}k kr</span>
        </div>
      ))}
    </div>
  )
}

export default function RevenueChart({ activeCompany }) {
  const showAll = activeCompany === 'all'

  return (
    <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold">Omsättningsutveckling</h3>
          <p className="text-[11px] text-white/30 mt-0.5">Senaste 7 månaderna (tkr)</p>
        </div>
        <div className="flex gap-1">
          {['7M', '12M', 'YTD'].map(period => (
            <button
              key={period}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors ${
                period === '7M' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradDH" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradML" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradCF" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.3)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.3)' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {(showAll || activeCompany === 'doktor-hemma') && (
              <Area
                type="monotone"
                dataKey="Doktor Hemma"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#gradDH)"
              />
            )}
            {(showAll || activeCompany === 'medilink') && (
              <Area
                type="monotone"
                dataKey="MediLink"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#gradML)"
              />
            )}
            {(showAll || activeCompany === 'careflow') && (
              <Area
                type="monotone"
                dataKey="CareFlow"
                stroke="#f59e0b"
                strokeWidth={2}
                fill="url(#gradCF)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
