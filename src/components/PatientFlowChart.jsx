import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { patientFlowData } from '../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null
  return (
    <div className="glass-strong rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-xs font-medium text-white/50 mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-white/60 capitalize">{entry.name}:</span>
          <span className="font-semibold">{entry.value.toLocaleString('sv-SE')}</span>
        </div>
      ))}
    </div>
  )
}

export default function PatientFlowChart() {
  return (
    <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold">Patientflöde</h3>
          <p className="text-[11px] text-white/30 mt-0.5">Nya, återbesök & avslutade — alla bolag</p>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={patientFlowData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
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
            <Bar dataKey="nya" fill="#10b981" radius={[4, 4, 0, 0]} barSize={16} />
            <Bar dataKey="återbesök" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={16} />
            <Bar dataKey="avslutade" fill="#ffffff15" radius={[4, 4, 0, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 mt-4 justify-center">
        {[
          { label: 'Nya', color: '#10b981' },
          { label: 'Återbesök', color: '#3b82f6' },
          { label: 'Avslutade', color: 'rgba(255,255,255,0.08)' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
            <span className="text-[10px] text-white/40">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
