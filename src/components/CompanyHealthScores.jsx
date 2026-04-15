import { TrendingUp, TrendingDown } from 'lucide-react'
import { companyHealthScores } from '../data/mockData'

const companyColors = {
  'Bolag 1': '#3b82f6',
  'Bolag 2': '#8b5cf6',
  'Bolag 3': '#f59e0b',
}

export default function CompanyHealthScores() {
  return (
    <div className="card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '350ms' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Bolagshälsa</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Sammanvägt hälsoindex per bolag</p>
        </div>
      </div>
      <div className="space-y-5">
        {companyHealthScores.map((company) => {
          const color = companyColors[company.company]
          return (
            <div key={company.company}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                  <span className="text-xs font-semibold text-slate-700">{company.company}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold text-slate-800">{company.score}</span>
                  <span className="text-[10px] text-slate-400 font-medium">/100</span>
                  {company.trend === 'up' ? (
                    <TrendingUp size={12} className="text-emerald-500" />
                  ) : (
                    <TrendingDown size={12} className="text-red-400" />
                  )}
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${company.score}%`, background: `linear-gradient(90deg, ${color}, ${color}aa)` }}
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2.5">
                {Object.entries(company.factors).map(([key, value]) => {
                  const labels = { revenue: 'Intäkt', patients: 'Patienter', margin: 'Marginal', satisfaction: 'Nöjdhet' }
                  const scoreColor = value >= 80 ? '#10b981' : value >= 70 ? '#f59e0b' : '#f43f5e'
                  return (
                    <div key={key} className="text-center bg-slate-50 rounded-lg py-1.5">
                      <p className="text-[9px] text-slate-400 font-medium">{labels[key]}</p>
                      <p className="text-[12px] font-bold mt-0.5" style={{ color: scoreColor }}>{value}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
