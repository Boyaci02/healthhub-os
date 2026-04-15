import { Clock, Video, UserPlus, RefreshCw, FileText, CheckCircle2, AlertCircle } from 'lucide-react'
import { upcomingBookings } from '../data/mockData'

const typeIcons = {
  'Videokonsultation': Video,
  'Uppföljning': RefreshCw,
  'Nybesök': UserPlus,
  'Provresultat': FileText,
}

const companyColors = {
  'Bolag 1': '#3b82f6',
  'Bolag 2': '#8b5cf6',
  'Bolag 3': '#f59e0b',
}

export default function BookingsList() {
  return (
    <div className="card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Dagens Bokningar</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Kommande besök idag</p>
        </div>
        <button className="text-[11px] text-emerald-600 hover:text-emerald-700 transition-colors font-semibold">
          Visa alla
        </button>
      </div>
      <div className="space-y-1">
        {upcomingBookings.map((booking) => {
          const TypeIcon = typeIcons[booking.type] || Clock
          const color = companyColors[booking.company]
          return (
            <div
              key={booking.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="text-center flex-shrink-0 w-11">
                <p className="text-sm font-bold text-slate-700">{booking.time}</p>
              </div>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}12` }}
              >
                <TypeIcon size={14} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">{booking.patient}</p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">{booking.type} · {booking.provider}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <div
                  className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                  style={{ background: `${color}12`, color }}
                >
                  {booking.company.split(' ').map(w => w[0]).join('')}
                </div>
                {booking.status === 'confirmed' ? (
                  <CheckCircle2 size={14} className="text-emerald-500" />
                ) : (
                  <AlertCircle size={14} className="text-amber-400" />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
