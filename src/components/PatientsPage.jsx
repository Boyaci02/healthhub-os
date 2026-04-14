import { useState, useMemo } from 'react'
import {
  Search, ChevronDown, ChevronRight, Heart, AlertCircle,
  UserX, Calendar, Clock, Star, Activity, Phone, Mail,
  FileText, MapPin
} from 'lucide-react'
import { patientsList, companies } from '../data/mockData'

const companyColors = {
  'Doktor Hemma': '#3b82f6',
  'MediLink': '#8b5cf6',
  'CareFlow': '#f59e0b',
}

const statusConfig = {
  active: { label: 'Aktiv', color: '#10b981', icon: Heart },
  pending: { label: 'Väntande', color: '#f59e0b', icon: AlertCircle },
  inactive: { label: 'Inaktiv', color: '#fb7185', icon: UserX },
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}

function Avatar({ name, size = 'md' }) {
  const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('')
  const sizeClass = size === 'lg' ? 'w-12 h-12 text-sm' : 'w-9 h-9 text-[11px]'
  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center font-semibold flex-shrink-0`}>
      {initials}
    </div>
  )
}

function StatPill({ label, value, sub }) {
  return (
    <div className="glass rounded-xl px-4 py-3 flex-1">
      <p className="text-[10px] uppercase tracking-wider text-white/30 font-medium">{label}</p>
      <p className="text-xl font-semibold mt-0.5">{value}</p>
      {sub && <p className="text-[10px] text-white/30 mt-0.5">{sub}</p>}
    </div>
  )
}

function ExpandedDetail({ patient }) {
  const color = companyColors[patient.company]
  const recentVisits = [
    { date: patient.lastVisit || '2026-03-15', type: patient.careType, provider: patient.provider, note: 'Besöket genomfört utan komplikationer.' },
    { date: '2026-03-01', type: 'Uppföljning', provider: patient.provider, note: 'Medicinering justerad.' },
    { date: '2026-02-10', type: 'Nybesök', provider: patient.provider, note: 'Initial bedömning genomförd.' },
  ].filter((_, i) => i < (patient.visits >= 3 ? 3 : patient.visits || 1))

  return (
    <div className="mx-3 mb-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Kontaktinfo */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/25 font-medium mb-2">Kontaktuppgifter</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[11px] text-white/50">
              <Phone size={11} className="text-white/25 flex-shrink-0" />
              <span>07{patient.id}0 {100 + patient.id * 13} {200 + patient.id * 7}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-white/50">
              <Mail size={11} className="text-white/25 flex-shrink-0" />
              <span className="truncate">{patient.name.split(' ')[0].toLowerCase()}@email.se</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-white/50">
              <MapPin size={11} className="text-white/25 flex-shrink-0" />
              <span>Stockholm, Sverige</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/[0.04]">
            <p className="text-[10px] uppercase tracking-wider text-white/25 font-medium mb-1.5">Bolag</p>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ background: `${color}15` }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
              <span className="text-[11px] font-medium" style={{ color }}>{patient.company}</span>
            </div>
          </div>
        </div>

        {/* NPS & Stats */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/25 font-medium mb-2">Statistik</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/40">Totala besök</span>
              <span className="text-[11px] font-semibold">{patient.visits}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/40">NPS-betyg</span>
              {patient.nps ? (
                <div className="flex items-center gap-1">
                  <Star size={10} className="text-amber-400" />
                  <span className="text-[11px] font-semibold">{patient.nps}/10</span>
                </div>
              ) : (
                <span className="text-[11px] text-white/25">Saknas</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/40">Nästa besök</span>
              <span className="text-[11px] font-semibold">{formatDate(patient.nextAppointment)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/40">Ålder</span>
              <span className="text-[11px] font-semibold">{patient.age} år</span>
            </div>
          </div>
        </div>

        {/* Besökshistorik */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/25 font-medium mb-2">Senaste besök</p>
          <div className="space-y-2">
            {recentVisits.map((v, i) => (
              <div key={i} className="flex gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: color }} />
                  {i < recentVisits.length - 1 && <div className="w-px flex-1 bg-white/[0.06] mt-1" />}
                </div>
                <div className="pb-2">
                  <p className="text-[11px] font-medium">{v.type}</p>
                  <p className="text-[10px] text-white/30">{formatDate(v.date)} · {v.provider.split(' ').slice(1).join(' ')}</p>
                  <p className="text-[10px] text-white/25 mt-0.5">{v.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4 pt-3 border-t border-white/[0.04]">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-[11px] font-medium text-white/60 hover:text-white/80 transition-colors">
          <FileText size={12} />
          Journalanteckning
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors" style={{ background: `${color}15`, color }}>
          <Calendar size={12} />
          Boka tid
        </button>
      </div>
    </div>
  )
}

export default function PatientsPage() {
  const [search, setSearch] = useState('')
  const [companyFilter, setCompanyFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = useMemo(() => {
    return patientsList.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.provider.toLowerCase().includes(search.toLowerCase()) ||
        p.careType.toLowerCase().includes(search.toLowerCase())
      const matchCompany = companyFilter === 'all' || p.company === companyFilter
      const matchStatus = statusFilter === 'all' || p.status === statusFilter
      return matchSearch && matchCompany && matchStatus
    })
  }, [search, companyFilter, statusFilter])

  const stats = useMemo(() => {
    const active = patientsList.filter(p => p.status === 'active').length
    const newThisMonth = patientsList.filter(p => p.isNew).length
    const npsScores = patientsList.filter(p => p.nps).map(p => p.nps)
    const avgNps = npsScores.length ? (npsScores.reduce((a, b) => a + b, 0) / npsScores.length).toFixed(1) : '—'
    return { total: patientsList.length, active, newThisMonth, avgNps }
  }, [])

  const portfolioCompanies = companies.filter(c => c.id !== 'all')

  return (
    <div className="space-y-5 animate-fade-in">

      {/* Stats */}
      <div className="flex gap-3">
        <StatPill label="Totalt" value={stats.total} sub="i registret" />
        <StatPill label="Aktiva" value={stats.active} sub={`${Math.round(stats.active / stats.total * 100)}% av totalt`} />
        <StatPill label="Nya denna månad" value={stats.newThisMonth} sub="nyregistrerade" />
        <StatPill label="Snitt NPS" value={stats.avgNps} sub="patientnöjdhet" />
      </div>

      {/* Patient list card */}
      <div className="glass rounded-2xl animate-slide-up" style={{ animationDelay: '100ms' }}>

        {/* Toolbar */}
        <div className="p-4 border-b border-white/[0.04] flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass flex-1 min-w-[180px]">
            <Search size={13} className="text-white/25 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Sök patient, läkare, vårdtyp..."
              className="bg-transparent border-none outline-none text-xs text-white/60 placeholder:text-white/20 w-full"
            />
          </div>

          {/* Company filter */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCompanyFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${companyFilter === 'all' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'}`}
            >
              Alla bolag
            </button>
            {portfolioCompanies.map(c => (
              <button
                key={c.id}
                onClick={() => setCompanyFilter(companyFilter === c.name ? 'all' : c.name)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${companyFilter === c.name ? 'text-white' : 'text-white/30 hover:text-white/50'}`}
                style={companyFilter === c.name ? { background: `${c.color}20`, color: c.color } : {}}
              >
                {c.shortName}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1">
            {['all', 'active', 'pending', 'inactive'].map(s => {
              const labels = { all: 'Alla', active: 'Aktiva', pending: 'Väntande', inactive: 'Inaktiva' }
              const isActive = statusFilter === s
              const cfg = statusConfig[s]
              return (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${isActive && s !== 'all' ? 'text-white' : isActive ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'}`}
                  style={isActive && s !== 'all' ? { background: `${cfg.color}20`, color: cfg.color } : {}}
                >
                  {labels[s]}
                </button>
              )
            })}
          </div>

          <span className="text-[11px] text-white/25 ml-auto flex-shrink-0">
            {filtered.length} av {patientsList.length}
          </span>
        </div>

        {/* Column headers */}
        <div className="px-4 py-2 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_36px] gap-3 border-b border-white/[0.03]">
          {['Patient', 'Bolag', 'Vårdtyp', 'Senaste besök', 'Nästa tid', ''].map((h, i) => (
            <p key={i} className="text-[10px] uppercase tracking-wider text-white/20 font-medium">{h}</p>
          ))}
        </div>

        {/* Rows */}
        <div>
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Activity size={24} className="text-white/15 mx-auto mb-3" />
              <p className="text-xs text-white/25">Inga patienter matchar filtret</p>
            </div>
          ) : (
            filtered.map((patient) => {
              const color = companyColors[patient.company]
              const status = statusConfig[patient.status]
              const StatusIcon = status.icon
              const isExpanded = expandedId === patient.id

              return (
                <div key={patient.id}>
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : patient.id)}
                    className={`px-4 py-3 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_36px] gap-3 items-center cursor-pointer transition-colors ${isExpanded ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
                  >
                    {/* Patient name */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Avatar name={patient.name} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-medium truncate">{patient.name}</p>
                          {patient.isNew && (
                            <span className="px-1.5 py-0 rounded text-[8px] font-semibold bg-emerald-500/15 text-emerald-400 flex-shrink-0">NY</span>
                          )}
                        </div>
                        <p className="text-[10px] text-white/30">{patient.age} år · {patient.provider.split(' ').slice(0, 2).join(' ')}</p>
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md" style={{ background: `${color}15` }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                        <span className="text-[10px] font-medium" style={{ color }}>
                          {patient.company.split(' ').map(w => w[0]).join('')}
                        </span>
                      </div>
                    </div>

                    {/* Care type */}
                    <p className="text-[11px] text-white/50 truncate">{patient.careType}</p>

                    {/* Last visit */}
                    <div className="flex items-center gap-1 text-[11px] text-white/40">
                      <Clock size={10} className="text-white/20 flex-shrink-0" />
                      {formatDate(patient.lastVisit)}
                    </div>

                    {/* Next appointment */}
                    <div className="flex items-center gap-1 text-[11px]">
                      {patient.nextAppointment ? (
                        <>
                          <Calendar size={10} className="text-emerald-400/50 flex-shrink-0" />
                          <span className="text-emerald-400/80">{formatDate(patient.nextAppointment)}</span>
                        </>
                      ) : (
                        <span className="text-white/20">—</span>
                      )}
                    </div>

                    {/* Expand + status */}
                    <div className="flex items-center justify-end gap-1.5">
                      <StatusIcon size={13} style={{ color: status.color }} />
                      <ChevronDown
                        size={13}
                        className="text-white/20 transition-transform"
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }}
                      />
                    </div>
                  </div>

                  {isExpanded && <ExpandedDetail patient={patient} />}

                  <div className="h-px bg-white/[0.025] mx-4 last:hidden" />
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
