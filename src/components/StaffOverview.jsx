import { staffOverview } from '../data/mockData'

const companyColors = {
  'Doktor Hemma': '#3b82f6',
  'MediLink': '#8b5cf6',
  'CareFlow': '#f59e0b',
}

export default function StaffOverview() {
  return (
    <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '450ms' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold">Personal & Beläggning</h3>
          <p className="text-[11px] text-white/30 mt-0.5">Idag — alla bolag</p>
        </div>
        <button className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
          Hantera
        </button>
      </div>
      <div className="space-y-2">
        {staffOverview.map((staff) => (
          <div
            key={staff.name}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-[11px] font-semibold flex-shrink-0">
              {staff.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{staff.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] text-white/30">{staff.role}</span>
                <span className="text-[10px] text-white/15">·</span>
                <div className="flex gap-0.5">
                  {staff.companies.map(c => (
                    <div
                      key={c}
                      className="px-1.5 py-0 rounded text-[8px] font-medium"
                      style={{ background: `${companyColors[c]}15`, color: companyColors[c] }}
                    >
                      {c.split(' ').map(w => w[0]).join('')}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-right">
                <p className="text-xs font-medium">{staff.patientsToday}</p>
                <p className="text-[9px] text-white/25">patienter</p>
              </div>
              <div className="w-10">
                <div className="flex items-center justify-end gap-1">
                  <span className={`text-[11px] font-semibold ${
                    staff.utilization >= 90 ? 'text-coral-400' :
                    staff.utilization >= 80 ? 'text-amber-400' :
                    'text-emerald-400'
                  }`}>
                    {staff.utilization}%
                  </span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.04] mt-1 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${staff.utilization}%`,
                      background: staff.utilization >= 90 ? '#fb7185' :
                                  staff.utilization >= 80 ? '#fbbf24' : '#10b981'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
