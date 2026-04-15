import { staffOverview } from '../data/mockData'

const companyColors = {
  'Bolag 1': '#3b82f6',
  'Bolag 2': '#8b5cf6',
  'Bolag 3': '#f59e0b',
}

export default function StaffOverview() {
  return (
    <div className="card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '450ms' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Personal och Belaggning</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Idag — alla bolag</p>
        </div>
        <button className="text-[11px] text-emerald-600 hover:text-emerald-700 transition-colors font-semibold">
          Hantera
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-2">
        {staffOverview.map((staff) => {
          const utilizationColor =
            staff.utilization >= 90 ? '#f43f5e' :
            staff.utilization >= 80 ? '#f59e0b' :
            '#10b981'

          return (
            <div
              key={staff.name}
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-600 flex-shrink-0">
                {staff.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">{staff.name}</p>
                <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                  <span className="text-[10px] text-slate-400">{staff.role}</span>
                  <span className="text-[10px] text-slate-300">·</span>
                  <div className="flex gap-0.5">
                    {staff.companies.map(c => (
                      <div
                        key={c}
                        className="px-1.5 py-0 rounded text-[8px] font-bold"
                        style={{ background: `${companyColors[c]}12`, color: companyColors[c] }}
                      >
                        {c.split(' ').map(w => w[0]).join('')}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${staff.utilization}%`, background: utilizationColor }}
                    />
                  </div>
                  <span className="text-[10px] font-bold flex-shrink-0" style={{ color: utilizationColor }}>
                    {staff.utilization}%
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
