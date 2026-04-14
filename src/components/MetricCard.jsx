import { TrendingUp, TrendingDown } from 'lucide-react'

export default function MetricCard({ label, value, unit, change, icon: Icon, delay = 0, accentColor }) {
  const isPositive = change >= 0
  const isCurrency = unit === 'kr'
  
  const formatValue = (val) => {
    if (isCurrency) {
      if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`
      if (val >= 1000) return `${(val / 1000).toFixed(0)}k`
    }
    return val.toLocaleString('sv-SE')
  }

  return (
    <div
      className="glass rounded-2xl p-5 hover:bg-white/[0.05] transition-all duration-300 group animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-[11px] uppercase tracking-wider text-white/30 font-medium">{label}</p>
        {Icon && (
          <div className="p-1.5 rounded-lg bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors">
            <Icon size={14} className="text-white/30" />
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-semibold tracking-tight">
          {formatValue(value)}
        </span>
        {unit && unit !== 'kr' && (
          <span className="text-sm text-white/30 mb-0.5">{unit}</span>
        )}
        {isCurrency && <span className="text-sm text-white/30 mb-0.5">kr</span>}
      </div>
      <div className="flex items-center gap-1 mt-2">
        {isPositive ? (
          <TrendingUp size={12} className="text-emerald-400" />
        ) : (
          <TrendingDown size={12} className="text-coral-400" />
        )}
        <span className={`text-[11px] font-medium ${
          label === 'Burn Rate / mån'
            ? (change < 0 ? 'text-emerald-400' : 'text-coral-400')
            : (isPositive ? 'text-emerald-400' : 'text-coral-400')
        }`}>
          {Math.abs(change)}%
        </span>
        <span className="text-[11px] text-white/20">vs förra mån</span>
      </div>
    </div>
  )
}
