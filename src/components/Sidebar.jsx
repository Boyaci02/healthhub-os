import { useState } from 'react'
import {
  LayoutDashboard, Users, Calendar, CreditCard, BarChart3,
  Settings, ChevronDown, Building2, Activity, UserCog,
  FileText, Bell, LogOut, HelpCircle, ChevronRight, Menu, X
} from 'lucide-react'
import { companies } from '../data/mockData'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Patienter', icon: Users },
  { id: 'bookings', label: 'Bokningar', icon: Calendar },
  { id: 'financials', label: 'Ekonomi', icon: CreditCard },
  { id: 'analytics', label: 'Analys', icon: BarChart3 },
  { id: 'staff', label: 'Personal', icon: UserCog },
  { id: 'reports', label: 'Rapporter', icon: FileText },
]

const bottomItems = [
  { id: 'notifications', label: 'Notiser', icon: Bell, badge: 3 },
  { id: 'settings', label: 'Inställningar', icon: Settings },
  { id: 'help', label: 'Hjälp', icon: HelpCircle },
]

export default function Sidebar({ activeCompany, setActiveCompany, activePage, setActivePage }) {
  const [companySwitcherOpen, setCompanySwitcherOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const currentCompany = companies.find(c => c.id === activeCompany) || companies[0]

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full z-50 flex flex-col
        bg-navy-950/95 backdrop-blur-xl border-r border-white/[0.06]
        transition-all duration-300 ease-out
        ${collapsed ? 'w-[72px]' : 'w-[260px]'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-white/[0.06]">
          {!collapsed && (
            <div className="flex items-center gap-2.5 animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Activity size={18} className="text-emerald-400" />
              </div>
              <div>
                <h1 className="text-sm font-semibold tracking-tight">HealthHub OS</h1>
                <p className="text-[10px] text-white/30 tracking-widest uppercase">Platform</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center mx-auto">
              <Activity size={18} className="text-emerald-400" />
            </div>
          )}
          <button
            onClick={() => { setCollapsed(!collapsed); setMobileOpen(false) }}
            className="hidden lg:flex p-1 rounded hover:bg-white/5 text-white/40 hover:text-white/60 transition-colors"
          >
            <ChevronRight size={16} className={`transition-transform ${collapsed ? '' : 'rotate-180'}`} />
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 rounded hover:bg-white/5 text-white/40"
          >
            <X size={16} />
          </button>
        </div>

        {/* Company Switcher */}
        <div className="p-3">
          <button
            onClick={() => !collapsed && setCompanySwitcherOpen(!companySwitcherOpen)}
            className={`
              w-full flex items-center gap-2.5 p-2.5 rounded-xl
              glass hover:bg-white/[0.06] transition-all duration-200
              ${companySwitcherOpen ? 'bg-white/[0.06]' : ''}
            `}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
              style={{ background: `${currentCompany.color}20`, color: currentCompany.color }}
            >
              {currentCompany.icon}
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-xs font-medium truncate">{currentCompany.name}</p>
                  <p className="text-[10px] text-white/30">
                    {activeCompany === 'all' ? '3 bolag' : currentCompany.description}
                  </p>
                </div>
                <ChevronDown
                  size={14}
                  className={`text-white/30 transition-transform flex-shrink-0 ${companySwitcherOpen ? 'rotate-180' : ''}`}
                />
              </>
            )}
          </button>

          {companySwitcherOpen && !collapsed && (
            <div className="mt-1.5 rounded-xl glass-strong overflow-hidden animate-slide-up">
              {companies.map(company => (
                <button
                  key={company.id}
                  onClick={() => {
                    setActiveCompany(company.id)
                    setCompanySwitcherOpen(false)
                  }}
                  className={`
                    w-full flex items-center gap-2.5 px-3 py-2.5
                    hover:bg-white/[0.06] transition-colors
                    ${activeCompany === company.id ? 'bg-white/[0.04]' : ''}
                  `}
                >
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center text-xs"
                    style={{ background: `${company.color}15`, color: company.color }}
                  >
                    {company.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-medium">{company.name}</p>
                  </div>
                  {activeCompany === company.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item, i) => {
            const Icon = item.icon
            const isActive = activePage === item.id
            return (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); setMobileOpen(false) }}
                className={`
                  w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                  transition-all duration-200 group relative
                  ${isActive
                    ? 'bg-white/[0.08] text-white'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
                  }
                `}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full bg-emerald-400" />
                )}
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && (
                  <span className="text-[13px] font-medium">{item.label}</span>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 rounded-md bg-navy-800 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    {item.label}
                  </div>
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-3 border-t border-white/[0.06] space-y-0.5">
          {bottomItems.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/[0.03] transition-all"
              >
                <div className="relative flex-shrink-0">
                  <Icon size={17} />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-coral-500 text-[9px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                {!collapsed && <span className="text-[13px]">{item.label}</span>}
              </button>
            )
          })}

          {/* User */}
          <div className={`mt-2 flex items-center gap-2.5 p-2.5 rounded-xl glass ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
              VD
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">Verkställande Direktör</p>
                <p className="text-[10px] text-white/30">Ägare & Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
