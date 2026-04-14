# HealthHub OS — Multi-Company Health Platform

## Vision

HealthHub OS is a unified operating system for managing multiple digital health companies from a single command center. Built for founders and investors running portfolio health ventures, it replaces fragmented systems with one coherent platform.

## Target User

- **Primary**: Founder/CEO managing 2-3+ digital health companies simultaneously
- **Context**: Mid capital raise, needs investor-grade dashboards and cross-company visibility
- **Pain points**: Scattered admin across companies, no unified view, manual reporting, duplicated infrastructure costs

## Core Principles

1. **Platform over Product** — Not a tool for one company, but an OS for a portfolio
2. **Investor-Ready by Default** — Every view should be presentable to a board
3. **Shared Infrastructure** — Common booking, payments, patient flow, and analytics layer
4. **Scalability First** — Adding a new company should take minutes, not months

---

## Architecture: Multi-Tenant Health OS

### Layer 1: Company Management
- Register and manage multiple companies (Doktor Hemma + others)
- Per-company branding, settings, and team members
- Unified owner/admin view across all entities

### Layer 2: Shared Services
- **Patient Flow Engine**: Shared patient registration, intake, and journey tracking
- **Booking System**: Unified scheduling across companies with smart routing
- **Payment Processing**: Centralized billing, invoicing, and revenue tracking
- **Communication Hub**: Patient messaging, notifications, and follow-ups

### Layer 3: Analytics & Control
- **Real-time Dashboard**: Cross-company KPIs at a glance
- **Financial Overview**: Revenue, costs, margins per company and consolidated
- **Operational Metrics**: Bookings, utilization, patient satisfaction
- **Investor Reporting**: Auto-generated board decks with key metrics

### Layer 4: Admin & Governance
- Role-based access (Owner, Company Admin, Staff)
- Audit trails and compliance logging
- Company-level and platform-level settings

---

## Key Features (MVP)

### 1. Portfolio Dashboard
- Total revenue across all companies (real-time)
- Patient volume and growth trends
- Staff utilization rates
- Margin analysis per company
- Cash burn rate and runway indicator

### 2. Company Switcher
- Instant context switching between companies
- Company-specific views that inherit platform design
- Side-by-side company comparison mode

### 3. Unified Patient Flow
- Single patient database with company-level segmentation
- Cross-referral between portfolio companies
- Shared medical history (with consent management)
- Automated follow-up workflows

### 4. Booking & Scheduling
- Multi-company calendar view
- Resource optimization across companies
- Patient self-booking portal (white-labeled per company)
- Automated reminders and confirmations

### 5. Financial Command Center
- Revenue per company, service line, and provider
- Cost allocation and shared service billing
- Invoice management and payment tracking
- Cash flow forecasting
- Investor-ready financial reports

### 6. Team Management
- Staff directory across all companies
- Shared resource pool (e.g., doctors working across entities)
- Scheduling and availability management
- Performance tracking

---

## Technical Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Routing**: React Router v6
- **State**: Zustand for global state
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Repository**: GitHub

---

## Design Direction

- **Aesthetic**: Refined medical-tech — clean, trustworthy, data-dense but breathable
- **Color Palette**: Deep navy primary, white/light gray surfaces, emerald green accents for positive metrics, amber for warnings, coral for alerts
- **Typography**: Modern geometric sans-serif, clear hierarchy
- **Layout**: Sidebar navigation with company switcher, main content area with card-based widgets
- **Tone**: Professional, investor-grade, Scandinavian clarity

---

## Build Phases

### Phase 1 (Current): Interactive Prototype
- Portfolio dashboard with mock data
- Company switcher functionality
- Key metric visualizations
- Responsive layout

### Phase 2: Backend Integration
- Supabase or similar BaaS
- Real authentication and authorization
- Live data connections
- API layer for integrations

### Phase 3: Full Platform
- Patient flow engine
- Booking system
- Payment processing
- Communication hub
- Investor reporting module

---

## Success Metrics

- **For Owner**: Time saved on admin across companies (target: 60% reduction)
- **For Investors**: Real-time visibility into portfolio performance
- **For Operations**: Shared infrastructure cost savings (target: 40% reduction)
- **For Scale**: Time to onboard new company (target: under 1 hour)
