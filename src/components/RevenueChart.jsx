import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { revenueHistory } from '../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-lg">
      <p className="text-xs font-semibold text-slate-500 mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-slate-500">{entry.name}:</span>
          <span className="font-semibold text-slate-800">{entry.value.toLocaleString('sv-SE')}k kr</span>
        </div>
      ))}
    </div>
  )
}

export default function RevenueChart({ activeCompany }) {
  const showAll = activeCompany === 'all'

  return (
    <div className="card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Omsättningsutveckling</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Senaste 7 månaderna (tkr)</p>
        </div>
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
          {['7M', '12M', 'YTD'].map(period => (
            <button
              key={period}
              className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-colors ${
                period === '7M'
                  ? 'bg-white text-slate-700 shadow-sm border border-slate-200'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradDH" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradML" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradCF" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'DM Sans' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'DM Sans' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }} />
            {(showAll || activeCompany === 'doktor-hemma') && (
              <Area type="monotone" dataKey="Bolag 1" stroke="#3b82f6" strokeWidth={2} fill="url(#gradDH)" dot={false} />
            )}
            {(showAll || activeCompany === 'medilink') && (
              <Area type="monotone" dataKey="Bolag 2" stroke="#8b5cf6" strokeWidth={2} fill="url(#gradML)" dot={false} />
            )}
            {(showAll || activeCompany === 'careflow') && (
              <Area type="monotone" dataKey="Bolag 3" stroke="#f59e0b" strokeWidth={2} fill="url(#gradCF)" dot={false} />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {showAll && (
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100">
          {[
            { label: 'Bolag 1', color: '#3b82f6' },
            { label: 'Bolag 2', color: '#8b5cf6' },
            { label: 'Bolag 3', color: '#f59e0b' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
              <span className="text-[11px] text-slate-500 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
