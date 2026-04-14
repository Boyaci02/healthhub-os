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
import PatientsPage from './components/PatientsPage'
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
        <div className="w-16 h-16 rounded-2xl card flex items-center justify-center mx-auto mb-4">
          <Zap size={28} className="text-emerald-500" />
        </div>
        <h2 className="text-xl font-semibold text-slate-800 mb-2">{title}</h2>
        <p className="text-sm text-slate-400 max-w-sm">{description}</p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl card text-xs text-slate-400">
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
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar
        activeCompany={activeCompany}
        setActiveCompany={setActiveCompany}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="lg:ml-[260px] min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 px-6 py-3.5 flex items-center justify-between border-b border-slate-200 bg-white/90 backdrop-blur-xl">
          <div className="ml-10 lg:ml-0">
            <div className="flex items-center gap-2">
              {activeCompany !== 'all' && (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: currentCompany?.color }}
                />
              )}
              <h2 className="text-sm font-semibold text-slate-800">
                {activePage === 'dashboard' ? 'Portfolio Dashboard' : pages[activePage]?.title || 'Dashboard'}
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {activeCompany === 'all'
                ? 'Översikt alla bolag · Realtid'
                : `${currentCompany?.name} · ${currentCompany?.description}`
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200">
              <Search size={13} className="text-slate-400" />
              <input
                type="text"
                placeholder="Sök patienter, bokningar..."
                className="bg-transparent border-none outline-none text-xs text-slate-600 placeholder:text-slate-400 w-44"
              />
              <kbd className="text-[9px] text-slate-400 border border-slate-300 rounded px-1.5 py-0.5 font-medium">K</kbd>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] text-emerald-700 font-medium">Live</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">
          {activePage === 'patients' ? (
            <PatientsPage />
          ) : activePage === 'dashboard' ? (
            <div className="space-y-5">
              {/* Quick company pills */}
              {activeCompany === 'all' && (
                <div className="flex items-center gap-2 animate-fade-in flex-wrap">
                  {companies.filter(c => c.id !== 'all').map(c => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCompany(c.id)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl card card-hover transition-all group"
                    >
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold"
                        style={{ background: `${c.color}15`, color: c.color }}
                      >
                        {c.icon}
                      </div>
                      <span className="text-[12px] font-medium text-slate-600 group-hover:text-slate-800">{c.name}</span>
                      <ArrowUpRight size={11} className="text-slate-300 group-hover:text-slate-500" />
                    </button>
                  ))}
                </div>
              )}

              {/* Investor highlight bar */}
              {activeCompany === 'all' && (
                <div className="rounded-2xl p-4 flex items-center justify-between animate-slide-up border border-emerald-200 bg-emerald-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-100">
                      <Building2 size={18} className="text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-slate-800">Portföljöversikt — Kapitalrunda</h3>
                      <p className="text-[10px] text-slate-500 mt-0.5">3 bolag · 64 anställda · 14 månaders runway · 18.3% MoM tillväxt</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 transition-colors">
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
                    delay={i * 50}
                  />
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                <RevenueChart activeCompany={activeCompany} />
                <PatientFlowChart />
              </div>

              {/* Bottom row */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                <BookingsList />
                <CompanyHealthScores />
                <ActivityFeed />
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
