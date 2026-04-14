import { useState, useMemo } from 'react'
import {
  Search, ChevronDown, Heart, AlertCircle,
  UserX, Calendar, Clock, Star, Phone, Mail,
  FileText, MapPin, Users
} from 'lucide-react'
import { patientsList, companies } from '../data/mockData'

const companyColors = {
  'Doktor Hemma': '#3b82f6',
  'MediLink': '#8b5cf6',
  'CareFlow': '#f59e0b',
}

const statusConfig = {
  active: { label: 'Aktiv', color: '#10b981', bg: '#f0fdf4', border: '#bbf7d0', icon: Heart },
  pending: { label: 'Väntande', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', icon: AlertCircle },
  inactive: { label: 'Inaktiv', color: '#94a3b8', bg: '#f8fafc', border: '#e2e8f0', icon: UserX },
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}

function Avatar({ name, size = 'md' }) {
  const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('')
  const sizeClass = size === 'lg' ? 'w-11 h-11 text-sm' : 'w-9 h-9 text-[11px]'
  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center font-bold text-slate-600 flex-shrink-0`}>
      {initials}
    </div>
  )
}

function StatPill({ label, value, sub, accent }) {
  return (
    <div className="card rounded-2xl px-5 py-4 flex-1">
      <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">{label}</p>
      <p className="text-2xl font-bold text-slate-800 mt-1" style={accent ? { color: accent } : {}}>{value}</p>
      {sub && <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>}
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
    <div className="mx-3 mb-1 rounded-xl border border-slate-200 bg-slate-50 p-5 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Kontaktinfo */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-3">Kontaktuppgifter</p>
          <div className="space-y-2">
            {[
              { icon: Phone, text: `07${patient.id}0 ${100 + patient.id * 13} ${200 + patient.id * 7}` },
              { icon: Mail, text: `${patient.name.split(' ')[0].toLowerCase()}@email.se` },
              { icon: MapPin, text: 'Stockholm, Sverige' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                  <Icon size={11} className="text-slate-400" />
                </div>
                <span className="text-[11px] text-slate-600 truncate">{text}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-2">Bolag</p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border" style={{ background: `${color}08`, borderColor: `${color}30` }}>
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-[11px] font-semibold" style={{ color }}>{patient.company}</span>
            </div>
          </div>
        </div>

        {/* Statistik */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-3">Statistik</p>
          <div className="space-y-2.5">
            {[
              { label: 'Totala besök', value: patient.visits },
              { label: 'Alder', value: `${patient.age} ar` },
              { label: 'Nasta besok', value: formatDate(patient.nextAppointment) },
              { label: 'NPS-betyg', value: patient.nps ? `${patient.nps}/10` : 'Saknas', icon: patient.nps ? Star : null },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                <span className="text-[11px] text-slate-500">{label}</span>
                <div className="flex items-center gap-1">
                  {Icon && <Icon size={11} className="text-amber-400" />}
                  <span className="text-[12px] font-semibold text-slate-800">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Besökshistorik */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-3">Senaste besok</p>
          <div className="space-y-3">
            {recentVisits.map((v, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0 border-2" style={{ borderColor: color, background: 'white' }} />
                  {i < recentVisits.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-1" />}
                </div>
                <div className="pb-2">
                  <p className="text-[12px] font-semibold text-slate-700">{v.type}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{formatDate(v.date)} · {v.provider.split(' ').slice(1).join(' ')}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{v.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-[11px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
          <FileText size={12} />
          Journalanteckning
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold text-white transition-colors" style={{ background: color }}>
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
      <div className="flex gap-3 flex-wrap">
        <StatPill label="Totalt" value={stats.total} sub="i registret" />
        <StatPill label="Aktiva" value={stats.active} sub={`${Math.round(stats.active / stats.total * 100)}% av totalt`} accent="#10b981" />
        <StatPill label="Nya denna manad" value={stats.newThisMonth} sub="nyregistrerade" />
        <StatPill label="Snitt NPS" value={stats.avgNps} sub="patientnojdhet" accent="#f59e0b" />
      </div>

      {/* Patient list card */}
      <div className="card rounded-2xl overflow-hidden">

        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 flex-1 min-w-[180px]">
            <Search size={13} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Sok patient, lakare, vardtyp..."
              className="bg-transparent border-none outline-none text-xs text-slate-700 placeholder:text-slate-400 w-full"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setCompanyFilter('all')}
              className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-colors ${companyFilter === 'all' ? 'bg-white text-slate-700 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Alla
            </button>
            {portfolioCompanies.map(c => (
              <button
                key={c.id}
                onClick={() => setCompanyFilter(companyFilter === c.name ? 'all' : c.name)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-colors ${companyFilter === c.name ? 'bg-white shadow-sm border' : 'text-slate-400 hover:text-slate-600'}`}
                style={companyFilter === c.name ? { color: c.color, borderColor: `${c.color}40` } : {}}
              >
                {c.shortName}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {['all', 'active', 'pending', 'inactive'].map(s => {
              const labels = { all: 'Alla', active: 'Aktiva', pending: 'Vantande', inactive: 'Inaktiva' }
              const isActive = statusFilter === s
              const cfg = statusConfig[s]
              return (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-colors ${isActive ? 'bg-white shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                  style={isActive && s !== 'all' ? { color: cfg.color, borderColor: `${cfg.color}40` } : isActive ? { color: '#374151' } : {}}
                >
                  {labels[s]}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">
            <Users size={12} className="text-slate-400" />
            <span className="text-[11px] text-slate-400 font-medium">{filtered.length} / {patientsList.length}</span>
          </div>
        </div>

        {/* Column headers */}
        <div className="px-5 py-2.5 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_32px] gap-4 bg-slate-50 border-b border-slate-100">
          {['Patient', 'Bolag', 'Vardtyp', 'Senaste besok', 'Nasta tid', ''].map((h, i) => (
            <p key={i} className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{h}</p>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-50">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <Users size={20} className="text-slate-300" />
              </div>
              <p className="text-sm font-medium text-slate-400">Inga patienter matchar filtret</p>
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
                    className={`px-5 py-3.5 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_32px] gap-4 items-center cursor-pointer transition-colors ${isExpanded ? 'bg-slate-50' : 'hover:bg-slate-50/60'}`}
                  >
                    {/* Name */}
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar name={patient.name} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-[13px] font-semibold text-slate-800 truncate">{patient.name}</p>
                          {patient.isNew && (
                            <span className="px-1.5 py-0 rounded-full text-[8px] font-bold bg-emerald-100 text-emerald-600 border border-emerald-200 flex-shrink-0">NY</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{patient.age} ar · {patient.provider.split(' ').slice(0, 2).join(' ')}</p>
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border" style={{ background: `${color}08`, borderColor: `${color}25` }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                        <span className="text-[10px] font-bold" style={{ color }}>
                          {patient.company.split(' ').map(w => w[0]).join('')}
                        </span>
                      </div>
                    </div>

                    {/* Care type */}
                    <p className="text-[12px] text-slate-500 truncate">{patient.careType}</p>

                    {/* Last visit */}
                    <div className="flex items-center gap-1.5">
                      <Clock size={11} className="text-slate-300 flex-shrink-0" />
                      <span className="text-[12px] text-slate-500">{formatDate(patient.lastVisit)}</span>
                    </div>

                    {/* Next appt */}
                    <div className="flex items-center gap-1.5">
                      {patient.nextAppointment ? (
                        <>
                          <Calendar size={11} className="text-emerald-500 flex-shrink-0" />
                          <span className="text-[12px] font-medium text-emerald-600">{formatDate(patient.nextAppointment)}</span>
                        </>
                      ) : (
                        <span className="text-[12px] text-slate-300">—</span>
                      )}
                    </div>

                    {/* Status + expand */}
                    <div className="flex items-center justify-end gap-1">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: status.bg }}>
                        <StatusIcon size={10} style={{ color: status.color }} />
                      </div>
                      <ChevronDown
                        size={13}
                        className="text-slate-300 transition-transform"
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }}
                      />
                    </div>
                  </div>

                  {isExpanded && <ExpandedDetail patient={patient} />}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
