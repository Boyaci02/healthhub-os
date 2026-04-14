import { TrendingUp, TrendingDown } from 'lucide-react'
import { companyHealthScores } from '../data/mockData'

const companyColors = {
  'Doktor Hemma': '#3b82f6',
  'MediLink': '#8b5cf6',
  'CareFlow': '#f59e0b',
}

export default function CompanyHealthScores() {
  return (
    <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '350ms' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold">Bolagshälsa</h3>
          <p className="text-[11px] text-white/30 mt-0.5">Sammanvägt hälsoindex per bolag</p>
        </div>
      </div>
      <div className="space-y-4">
        {companyHealthScores.map((company) => {
          const color = companyColors[company.company]
          return (
            <div key={company.company} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: color }}
                  />
                  <span className="text-xs font-medium">{company.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">{company.score}</span>
                  <span className="text-[10px] text-white/30">/100</span>
                  {company.trend === 'up' ? (
                    <TrendingUp size={12} className="text-emerald-400" />
                  ) : (
                    <TrendingDown size={12} className="text-coral-400" />
                  )}
                </div>
              </div>
              {/* Score bar */}
              <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${company.score}%`,
                    background: `linear-gradient(90deg, ${color}, ${color}80)`,
                  }}
                />
              </div>
              {/* Factor breakdown */}
              <div className="grid grid-cols-4 gap-2 mt-2">
                {Object.entries(company.factors).map(([key, value]) => {
                  const labels = { revenue: 'Intäkt', patients: 'Patienter', margin: 'Marginal', satisfaction: 'Nöjdhet' }
                  return (
                    <div key={key} className="text-center">
                      <p className="text-[10px] text-white/20">{labels[key]}</p>
                      <p className="text-[11px] font-medium" style={{ color: value >= 80 ? '#10b981' : value >= 70 ? '#fbbf24' : '#fb7185' }}>
                        {value}
                      </p>
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
