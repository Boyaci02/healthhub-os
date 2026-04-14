import { UserPlus, CreditCard, Calendar, Pill, CheckCircle, MessageSquare } from 'lucide-react'
import { recentActivity } from '../data/mockData'

const activityIcons = {
  patient: { icon: UserPlus, color: '#10b981' },
  payment: { icon: CreditCard, color: '#3b82f6' },
  booking: { icon: Calendar, color: '#8b5cf6' },
  medical: { icon: Pill, color: '#f59e0b' },
  completed: { icon: CheckCircle, color: '#10b981' },
  feedback: { icon: MessageSquare, color: '#06b6d4' },
}

export default function ActivityFeed() {
  return (
    <div className="card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '500ms' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Senaste Aktivitet</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Realtidsflöde alla bolag</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-emerald-700 font-semibold">Live</span>
        </div>
      </div>
      <div className="space-y-1">
        {recentActivity.map((activity) => {
          const { icon: Icon, color } = activityIcons[activity.type]
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${color}12` }}
              >
                <Icon size={13} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-700">{activity.action}</p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">{activity.detail}</p>
              </div>
              <span className="text-[10px] text-slate-400 flex-shrink-0 whitespace-nowrap mt-0.5">{activity.time}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
