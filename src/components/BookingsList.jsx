import { Clock, Video, UserPlus, RefreshCw, FileText, CheckCircle2, AlertCircle } from 'lucide-react'
import { upcomingBookings } from '../data/mockData'

const typeIcons = {
  'Videokonsultation': Video,
  'Uppföljning': RefreshCw,
  'Nybesök': UserPlus,
  'Provresultat': FileText,
}

const companyColors = {
  'Doktor Hemma': '#3b82f6',
  'MediLink': '#8b5cf6',
  'CareFlow': '#f59e0b',
}

export default function BookingsList() {
  return (
    <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold">Dagens Bokningar</h3>
          <p className="text-[11px] text-white/30 mt-0.5">Kommande besök idag</p>
        </div>
        <button className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
          Visa alla
        </button>
      </div>
      <div className="space-y-2">
        {upcomingBookings.map((booking) => {
          const TypeIcon = typeIcons[booking.type] || Clock
          return (
            <div
              key={booking.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors group cursor-pointer"
            >
              <div className="text-center flex-shrink-0 w-12">
                <p className="text-sm font-semibold">{booking.time}</p>
              </div>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${companyColors[booking.company]}15` }}
              >
                <TypeIcon size={15} style={{ color: companyColors[booking.company] }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{booking.patient}</p>
                <p className="text-[10px] text-white/30 truncate">{booking.type} · {booking.provider}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div
                  className="px-2 py-0.5 rounded-full text-[9px] font-medium"
                  style={{
                    background: `${companyColors[booking.company]}15`,
                    color: companyColors[booking.company]
                  }}
                >
                  {booking.company.split(' ').map(w => w[0]).join('')}
                </div>
                {booking.status === 'confirmed' ? (
                  <CheckCircle2 size={14} className="text-emerald-400/50" />
                ) : (
                  <AlertCircle size={14} className="text-amber-400/50" />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
