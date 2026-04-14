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
        className="lg:hidden fixed top-3.5 left-4 z-50 p-2 rounded-lg bg-white border border-slate-200 shadow-sm text-slate-600"
      >
        <Menu size={18} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full z-50 flex flex-col
        bg-white border-r border-slate-200
        transition-all duration-300 ease-out
        ${collapsed ? 'w-[68px]' : 'w-[260px]'}
        ${mobileOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="h-[57px] px-4 flex items-center justify-between border-b border-slate-200 flex-shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-2.5 animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Activity size={17} className="text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-800 tracking-tight">HealthHub</h1>
                <p className="text-[9px] text-slate-400 tracking-widest uppercase font-medium">OS Platform</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center mx-auto">
              <Activity size={17} className="text-white" />
            </div>
          )}
          <button
            onClick={() => { setCollapsed(!collapsed); setMobileOpen(false) }}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ChevronRight size={15} className={`transition-transform ${collapsed ? '' : 'rotate-180'}`} />
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
          >
            <X size={15} />
          </button>
        </div>

        {/* Company Switcher */}
        <div className="p-3 border-b border-slate-100">
          <button
            onClick={() => !collapsed && setCompanySwitcherOpen(!companySwitcherOpen)}
            className={`
              w-full flex items-center gap-2.5 p-2.5 rounded-xl
              hover:bg-slate-50 transition-all duration-200 border
              ${companySwitcherOpen ? 'bg-slate-50 border-slate-200' : 'border-slate-200 bg-white'}
            `}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
              style={{ background: `${currentCompany.color}15`, color: currentCompany.color }}
            >
              {currentCompany.icon}
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{currentCompany.name}</p>
                  <p className="text-[10px] text-slate-400">
                    {activeCompany === 'all' ? '3 bolag' : currentCompany.description}
                  </p>
                </div>
                <ChevronDown
                  size={13}
                  className={`text-slate-400 transition-transform flex-shrink-0 ${companySwitcherOpen ? 'rotate-180' : ''}`}
                />
              </>
            )}
          </button>

          {companySwitcherOpen && !collapsed && (
            <div className="mt-1.5 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden animate-slide-up">
              {companies.map(company => (
                <button
                  key={company.id}
                  onClick={() => {
                    setActiveCompany(company.id)
                    setCompanySwitcherOpen(false)
                  }}
                  className={`
                    w-full flex items-center gap-2.5 px-3 py-2.5
                    hover:bg-slate-50 transition-colors
                    ${activeCompany === company.id ? 'bg-slate-50' : ''}
                  `}
                >
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center text-[9px] font-bold"
                    style={{ background: `${company.color}15`, color: company.color }}
                  >
                    {company.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-medium text-slate-700">{company.name}</p>
                  </div>
                  {activeCompany === company.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item, i) => {
            const Icon = item.icon
            const isActive = activePage === item.id
            return (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); setMobileOpen(false) }}
                className={`
                  sidebar-item relative
                  ${isActive ? 'sidebar-item-active' : ''}
                `}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-emerald-500" />
                )}
                <Icon size={17} className="flex-shrink-0" />
                {!collapsed && (
                  <span className="text-[13px]">{item.label}</span>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-slate-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                    {item.label}
                  </div>
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-3 border-t border-slate-100 space-y-0.5">
          {bottomItems.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className="sidebar-item"
              >
                <div className="relative flex-shrink-0">
                  <Icon size={16} />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                {!collapsed && <span className="text-[13px]">{item.label}</span>}
              </button>
            )
          })}

          {/* User */}
          <div className={`mt-2 flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
              VD
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">Verkst. Direktör</p>
                <p className="text-[10px] text-slate-400">Ägare & Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
