import { TrendingUp, TrendingDown } from 'lucide-react'

export default function MetricCard({ label, value, unit, change, icon: Icon, delay = 0 }) {
  const isPositive = change >= 0
  const isCurrency = unit === 'kr'
  const isBurnRate = label === 'Burn Rate / mån'

  const formatValue = (val) => {
    if (isCurrency) {
      if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`
      if (val >= 1000) return `${(val / 1000).toFixed(0)}k`
    }
    return val.toLocaleString('sv-SE')
  }

  const changePositive = isBurnRate ? change < 0 : isPositive

  return (
    <div
      className="card card-hover rounded-2xl p-5 animate-slide-up group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">{label}</p>
        {Icon && (
          <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors">
            <Icon size={14} className="text-slate-400" />
          </div>
        )}
      </div>
      <div className="flex items-end gap-1.5">
        <span className="text-2xl font-bold text-slate-800 tracking-tight">
          {formatValue(value)}
        </span>
        {unit && unit !== 'kr' && (
          <span className="text-sm text-slate-400 mb-0.5 font-medium">{unit}</span>
        )}
        {isCurrency && <span className="text-sm text-slate-400 mb-0.5 font-medium">kr</span>}
      </div>
      <div className="flex items-center gap-1 mt-2.5">
        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md ${changePositive ? 'bg-emerald-50' : 'bg-red-50'}`}>
          {changePositive ? (
            <TrendingUp size={11} className="text-emerald-600" />
          ) : (
            <TrendingDown size={11} className="text-red-500" />
          )}
          <span className={`text-[11px] font-semibold ${changePositive ? 'text-emerald-600' : 'text-red-500'}`}>
            {Math.abs(change)}%
          </span>
        </div>
        <span className="text-[11px] text-slate-400">vs förra mån</span>
      </div>
    </div>
  )
}
