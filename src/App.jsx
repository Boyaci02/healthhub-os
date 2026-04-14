import { useState } from 'react'
import {
  DollarSign, Users, Calendar, TrendingUp,
  Flame, Clock, Activity, Heart, Search,
  ArrowUpRight, Building2, Zap
} from 'lucide-react'
import Sidebar from './components/Sidebar'
import MetricCard from './components/MetricCard'
import RevenueChart from './components/RevenueChart'
import PatientFlowChart from './components/PatientFlowChart'
import BookingsList from './components/BookingsList'
import ActivityFeed from './components/ActivityFeed'
import CompanyHealthScores from './components/CompanyHealthScores'
import StaffOverview from './components/StaffOverview'
import { portfolioMetrics, companies } from './data/mockData'

const metricIcons = {
  revenue: DollarSign,
  patients: Users,
  bookings: Calendar,
  margin: TrendingUp,
  burnRate: Flame,
  runway: Clock,
  utilization: Activity,
  nps: Heart,
}

function PlaceholderPage({ title, description }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mx-auto mb-4">
          <Zap size={28} className="text-emerald-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-white/30 max-w-sm">{description}</p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-xs text-white/40">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Under utveckling
        </div>
      </div>
    </div>
  )
}

const pages = {
  patients: { title: 'Patienter', description: 'Hantera patienter, journaler och remisser över alla bolag med ett gemensamt patientregister.' },
  bookings: { title: 'Bokningar', description: 'Enhetligt bokningssystem med smart resursfördelning och automatiserade påminnelser.' },
  financials: { title: 'Ekonomi', description: 'Konsoliderad ekonomiöversikt med intäkter, kostnader och kassaflöde per bolag.' },
  analytics: { title: 'Analys', description: 'Djupgående analyser med AI-drivna insikter och prediktioner för din portfölj.' },
  staff: { title: 'Personal', description: 'Personalhantering med delad resurspool, schemaläggning och prestationsuppföljning.' },
  reports: { title: 'Rapporter', description: 'Automatiskt genererade investerarrapporter, styrelseunderlag och KPI-sammanställningar.' },
}

export default function App() {
  const [activeCompany, setActiveCompany] = useState('all')
  const [activePage, setActivePage] = useState('dashboard')

  const metrics = portfolioMetrics[activeCompany] || portfolioMetrics.all
  const currentCompany = companies.find(c => c.id === activeCompany)

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Background grain */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <Sidebar
        activeCompany={activeCompany}
        setActiveCompany={setActiveCompany}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main content */}
      <main className="lg:ml-[260px] min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between border-b border-white/[0.04] bg-navy-950/80 backdrop-blur-xl">
          <div className="ml-10 lg:ml-0">
            <div className="flex items-center gap-2">
              {activeCompany !== 'all' && (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: currentCompany?.color }}
                />
              )}
              <h2 className="text-base font-semibold">
                {activePage === 'dashboard' ? 'Portfolio Dashboard' : pages[activePage]?.title || 'Dashboard'}
              </h2>
            </div>
            <p className="text-[11px] text-white/25 mt-0.5">
              {activeCompany === 'all'
                ? 'Översikt alla bolag · Realtid'
                : `${currentCompany?.name} · ${currentCompany?.description}`
              }
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl glass">
              <Search size={14} className="text-white/25" />
              <input
                type="text"
                placeholder="Sök patienter, bokningar..."
                className="bg-transparent border-none outline-none text-xs text-white/60 placeholder:text-white/20 w-48"
              />
              <kbd className="text-[9px] text-white/15 border border-white/10 rounded px-1.5 py-0.5">⌘K</kbd>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-white/40 font-medium">Live</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">
          {activePage === 'dashboard' ? (
            <div className="space-y-6">
              {/* Quick company pills */}
              {activeCompany === 'all' && (
                <div className="flex items-center gap-2 animate-fade-in">
                  {companies.filter(c => c.id !== 'all').map(c => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCompany(c.id)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl glass hover:bg-white/[0.06] transition-all group"
                    >
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center text-[10px]"
                        style={{ background: `${c.color}15`, color: c.color }}
                      >
                        {c.icon}
                      </div>
                      <span className="text-[11px] font-medium text-white/50 group-hover:text-white/70">{c.name}</span>
                      <ArrowUpRight size={10} className="text-white/20 group-hover:text-white/40" />
                    </button>
                  ))}
                </div>
              )}

              {/* Investor highlight bar */}
              {activeCompany === 'all' && (
                <div className="glass rounded-2xl p-4 flex items-center justify-between animate-slide-up border border-emerald-500/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10">
                      <Building2 size={18} className="text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold">Portföljöversikt — Kapitalrunda</h3>
                      <p className="text-[10px] text-white/30 mt-0.5">3 bolag · 64 anställda · 14 månaders runway · 18.3% MoM tillväxt</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-400 text-[11px] font-semibold hover:bg-emerald-500/25 transition-colors">
                    Generera Investerarrapport
                  </button>
                </div>
              )}

              {/* KPI Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {Object.entries(metrics).map(([key, metric], i) => (
                  <MetricCard
                    key={key}
                    label={metric.label}
                    value={metric.value}
                    unit={metric.unit}
                    change={metric.change}
                    icon={metricIcons[key]}
                    delay={i * 60}
                  />
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <RevenueChart activeCompany={activeCompany} />
                <PatientFlowChart />
              </div>

              {/* Bottom row */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <BookingsList />
                <CompanyHealthScores />
                <div className="space-y-6">
                  <ActivityFeed />
                </div>
              </div>

              {/* Staff */}
              <StaffOverview />
            </div>
          ) : (
            <PlaceholderPage
              title={pages[activePage]?.title || ''}
              description={pages[activePage]?.description || ''}
            />
          )}
        </div>
      </main>
    </div>
  )
}
