import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { patientFlowData } from '../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-lg">
      <p className="text-xs font-semibold text-slate-500 mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-slate-500 capitalize">{entry.name}:</span>
          <span className="font-semibold text-slate-800">{entry.value.toLocaleString('sv-SE')}</span>
        </div>
      ))}
    </div>
  )
}

export default function PatientFlowChart() {
  return (
    <div className="card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Patientflöde</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Nya, återbesök och avslutade — alla bolag</p>
        </div>
      </div>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={patientFlowData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barGap={2}>
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
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="nya" fill="#10b981" radius={[4, 4, 0, 0]} barSize={14} />
            <Bar dataKey="återbesök" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={14} />
            <Bar dataKey="avslutade" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-5 mt-4 pt-3 border-t border-slate-100">
        {[
          { label: 'Nya', color: '#10b981' },
          { label: 'Återbesök', color: '#3b82f6' },
          { label: 'Avslutade', color: '#e2e8f0', textColor: '#94a3b8' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full border border-slate-200" style={{ background: item.color }} />
            <span className="text-[11px] font-medium" style={{ color: item.textColor || '#64748b' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
