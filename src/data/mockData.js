export const companies = [
  {
    id: 'all',
    name: 'Alla Bolag',
    shortName: 'Portfolio',
    color: '#10b981',
    icon: 'PF',
  },
  {
    id: 'doktor-hemma',
    name: 'Doktor Hemma',
    shortName: 'DH',
    color: '#3b82f6',
    icon: 'DH',
    description: 'Digital hemsjukvård',
    status: 'active',
    founded: '2021',
    employees: 34,
  },
  {
    id: 'medilink',
    name: 'MediLink',
    shortName: 'ML',
    color: '#8b5cf6',
    icon: 'ML',
    description: 'Digital vårdplattform',
    status: 'active',
    founded: '2022',
    employees: 18,
  },
  {
    id: 'careflow',
    name: 'CareFlow',
    shortName: 'CF',
    color: '#f59e0b',
    icon: 'CF',
    description: 'Patientuppföljning',
    status: 'scaling',
    founded: '2023',
    employees: 12,
  },
]

export const portfolioMetrics = {
  all: {
    revenue: { value: 4850000, change: 18.3, label: 'Total Omsättning', unit: 'kr' },
    patients: { value: 12840, change: 24.1, label: 'Aktiva Patienter', unit: '' },
    bookings: { value: 3420, change: 12.7, label: 'Bokningar / mån', unit: '' },
    margin: { value: 34.2, change: 3.1, label: 'Bruttomarginal', unit: '%' },
    burnRate: { value: 890000, change: -8.2, label: 'Burn Rate / mån', unit: 'kr' },
    runway: { value: 14, change: 2, label: 'Runway', unit: 'mån' },
    utilization: { value: 78, change: 5.4, label: 'Beläggningsgrad', unit: '%' },
    nps: { value: 72, change: 4, label: 'NPS', unit: '' },
  },
  'doktor-hemma': {
    revenue: { value: 2400000, change: 15.2, label: 'Omsättning', unit: 'kr' },
    patients: { value: 6200, change: 18.5, label: 'Aktiva Patienter', unit: '' },
    bookings: { value: 1800, change: 10.3, label: 'Bokningar / mån', unit: '' },
    margin: { value: 38.1, change: 2.8, label: 'Bruttomarginal', unit: '%' },
    burnRate: { value: 420000, change: -5.1, label: 'Burn Rate / mån', unit: 'kr' },
    runway: { value: 16, change: 1, label: 'Runway', unit: 'mån' },
    utilization: { value: 82, change: 3.2, label: 'Beläggningsgrad', unit: '%' },
    nps: { value: 76, change: 3, label: 'NPS', unit: '' },
  },
  'medilink': {
    revenue: { value: 1650000, change: 22.4, label: 'Omsättning', unit: 'kr' },
    patients: { value: 4100, change: 28.7, label: 'Aktiva Patienter', unit: '' },
    bookings: { value: 1050, change: 15.6, label: 'Bokningar / mån', unit: '' },
    margin: { value: 31.5, change: 4.2, label: 'Bruttomarginal', unit: '%' },
    burnRate: { value: 310000, change: -12.3, label: 'Burn Rate / mån', unit: 'kr' },
    runway: { value: 12, change: 3, label: 'Runway', unit: 'mån' },
    utilization: { value: 74, change: 7.1, label: 'Beläggningsgrad', unit: '%' },
    nps: { value: 68, change: 5, label: 'NPS', unit: '' },
  },
  'careflow': {
    revenue: { value: 800000, change: 31.5, label: 'Omsättning', unit: 'kr' },
    patients: { value: 2540, change: 42.3, label: 'Aktiva Patienter', unit: '' },
    bookings: { value: 570, change: 18.9, label: 'Bokningar / mån', unit: '' },
    margin: { value: 28.4, change: 6.1, label: 'Bruttomarginal', unit: '%' },
    burnRate: { value: 160000, change: -15.7, label: 'Burn Rate / mån', unit: 'kr' },
    runway: { value: 18, change: 4, label: 'Runway', unit: 'mån' },
    utilization: { value: 68, change: 9.8, label: 'Beläggningsgrad', unit: '%' },
    nps: { value: 71, change: 6, label: 'NPS', unit: '' },
  },
}

export const revenueHistory = [
  { month: 'Sep', 'Doktor Hemma': 1680, MediLink: 980, CareFlow: 410 },
  { month: 'Okt', 'Doktor Hemma': 1790, MediLink: 1080, CareFlow: 480 },
  { month: 'Nov', 'Doktor Hemma': 1950, MediLink: 1200, CareFlow: 540 },
  { month: 'Dec', 'Doktor Hemma': 2020, MediLink: 1290, CareFlow: 590 },
  { month: 'Jan', 'Doktor Hemma': 2150, MediLink: 1380, CareFlow: 650 },
  { month: 'Feb', 'Doktor Hemma': 2250, MediLink: 1480, CareFlow: 720 },
  { month: 'Mar', 'Doktor Hemma': 2400, MediLink: 1650, CareFlow: 800 },
]

export const patientFlowData = [
  { month: 'Sep', nya: 820, återbesök: 1640, avslutade: 310 },
  { month: 'Okt', nya: 910, återbesök: 1780, avslutade: 290 },
  { month: 'Nov', nya: 980, återbesök: 1920, avslutade: 340 },
  { month: 'Dec', nya: 870, återbesök: 2010, avslutade: 280 },
  { month: 'Jan', nya: 1050, återbesök: 2150, avslutade: 320 },
  { month: 'Feb', nya: 1120, återbesök: 2280, avslutade: 350 },
  { month: 'Mar', nya: 1240, återbesök: 2430, avslutade: 310 },
]

export const upcomingBookings = [
  { id: 1, patient: 'Anna Lindström', time: '09:00', type: 'Videokonsultation', company: 'Doktor Hemma', provider: 'Dr. Erik Svensson', status: 'confirmed' },
  { id: 2, patient: 'Karl Bergman', time: '09:30', type: 'Uppföljning', company: 'CareFlow', provider: 'Dr. Maria Johansson', status: 'confirmed' },
  { id: 3, patient: 'Sara Nilsson', time: '10:00', type: 'Nybesök', company: 'MediLink', provider: 'Dr. Johan Andersson', status: 'pending' },
  { id: 4, patient: 'Erik Holm', time: '10:30', type: 'Videokonsultation', company: 'Doktor Hemma', provider: 'Dr. Lisa Ekström', status: 'confirmed' },
  { id: 5, patient: 'Maria Dahl', time: '11:00', type: 'Provresultat', company: 'MediLink', provider: 'Dr. Erik Svensson', status: 'confirmed' },
  { id: 6, patient: 'Oskar Lund', time: '11:30', type: 'Uppföljning', company: 'CareFlow', provider: 'Dr. Maria Johansson', status: 'pending' },
]

export const recentActivity = [
  { id: 1, action: 'Ny patient registrerad', detail: 'Anna K. — Doktor Hemma', time: '2 min sedan', type: 'patient' },
  { id: 2, action: 'Betalning mottagen', detail: '4 500 kr — MediLink', time: '8 min sedan', type: 'payment' },
  { id: 3, action: 'Bokning bekräftad', detail: 'Karl B. kl 14:00 — CareFlow', time: '15 min sedan', type: 'booking' },
  { id: 4, action: 'Recept utfärdat', detail: 'Dr. Svensson — Doktor Hemma', time: '22 min sedan', type: 'medical' },
  { id: 5, action: 'Uppföljning slutförd', detail: 'Sara N. — MediLink', time: '35 min sedan', type: 'completed' },
  { id: 6, action: 'Ny faktura skapad', detail: '12 800 kr — CareFlow', time: '42 min sedan', type: 'payment' },
  { id: 7, action: 'Patient feedback', detail: 'NPS: 9/10 — Doktor Hemma', time: '1 tim sedan', type: 'feedback' },
]

export const staffOverview = [
  { name: 'Dr. Erik Svensson', role: 'Allmänläkare', companies: ['Doktor Hemma', 'MediLink'], utilization: 92, patientsToday: 8 },
  { name: 'Dr. Maria Johansson', role: 'Specialist', companies: ['CareFlow'], utilization: 78, patientsToday: 5 },
  { name: 'Dr. Johan Andersson', role: 'Allmänläkare', companies: ['MediLink'], utilization: 85, patientsToday: 7 },
  { name: 'Dr. Lisa Ekström', role: 'Barnläkare', companies: ['Doktor Hemma'], utilization: 88, patientsToday: 6 },
  { name: 'Ssk. Petra Olsson', role: 'Sjuksköterska', companies: ['Doktor Hemma', 'CareFlow'], utilization: 95, patientsToday: 12 },
]

export const patientsList = [
  { id: 1, name: 'Anna Lindström', age: 34, gender: 'F', company: 'Doktor Hemma', status: 'active', careType: 'Videokonsultation', provider: 'Dr. Erik Svensson', lastVisit: '2026-04-10', nextAppointment: '2026-04-18', nps: 9, visits: 12, isNew: false },
  { id: 2, name: 'Karl Bergman', age: 52, gender: 'M', company: 'CareFlow', status: 'active', careType: 'Uppföljning', provider: 'Dr. Maria Johansson', lastVisit: '2026-04-08', nextAppointment: '2026-04-22', nps: 8, visits: 5, isNew: false },
  { id: 3, name: 'Sara Nilsson', age: 28, gender: 'F', company: 'MediLink', status: 'pending', careType: 'Nybesök', provider: 'Dr. Johan Andersson', lastVisit: null, nextAppointment: '2026-04-15', nps: null, visits: 0, isNew: true },
  { id: 4, name: 'Erik Holm', age: 45, gender: 'M', company: 'Doktor Hemma', status: 'active', careType: 'Videokonsultation', provider: 'Dr. Lisa Ekström', lastVisit: '2026-04-09', nextAppointment: '2026-04-21', nps: 10, visits: 8, isNew: false },
  { id: 5, name: 'Maria Dahl', age: 61, gender: 'F', company: 'MediLink', status: 'active', careType: 'Provresultat', provider: 'Dr. Erik Svensson', lastVisit: '2026-04-07', nextAppointment: '2026-04-28', nps: 7, visits: 15, isNew: false },
  { id: 6, name: 'Oskar Lund', age: 38, gender: 'M', company: 'CareFlow', status: 'pending', careType: 'Uppföljning', provider: 'Dr. Maria Johansson', lastVisit: '2026-03-28', nextAppointment: '2026-04-16', nps: 8, visits: 3, isNew: false },
  { id: 7, name: 'Lena Karlsson', age: 42, gender: 'F', company: 'Doktor Hemma', status: 'active', careType: 'Videokonsultation', provider: 'Dr. Erik Svensson', lastVisit: '2026-04-11', nextAppointment: null, nps: 9, visits: 6, isNew: false },
  { id: 8, name: 'Johan Eriksson', age: 55, gender: 'M', company: 'Doktor Hemma', status: 'inactive', careType: 'Uppföljning', provider: 'Dr. Lisa Ekström', lastVisit: '2026-02-14', nextAppointment: null, nps: 6, visits: 4, isNew: false },
  { id: 9, name: 'Maja Svensson', age: 23, gender: 'F', company: 'MediLink', status: 'active', careType: 'Nybesök', provider: 'Dr. Johan Andersson', lastVisit: '2026-04-05', nextAppointment: '2026-04-19', nps: 10, visits: 2, isNew: true },
  { id: 10, name: 'Peter Lindqvist', age: 67, gender: 'M', company: 'Doktor Hemma', status: 'active', careType: 'Kronisk vård', provider: 'Dr. Erik Svensson', lastVisit: '2026-04-12', nextAppointment: '2026-04-26', nps: 8, visits: 22, isNew: false },
  { id: 11, name: 'Sofia Berg', age: 31, gender: 'F', company: 'CareFlow', status: 'active', careType: 'Patientuppföljning', provider: 'Dr. Maria Johansson', lastVisit: '2026-04-03', nextAppointment: '2026-04-17', nps: 9, visits: 7, isNew: false },
  { id: 12, name: 'Anders Ström', age: 49, gender: 'M', company: 'Doktor Hemma', status: 'pending', careType: 'Remiss', provider: 'Dr. Lisa Ekström', lastVisit: '2026-04-01', nextAppointment: '2026-04-20', nps: null, visits: 1, isNew: true },
  { id: 13, name: 'Karin Persson', age: 58, gender: 'F', company: 'MediLink', status: 'active', careType: 'Kronisk vård', provider: 'Dr. Johan Andersson', lastVisit: '2026-04-06', nextAppointment: '2026-05-06', nps: 7, visits: 18, isNew: false },
  { id: 14, name: 'Mikael Johansson', age: 36, gender: 'M', company: 'Doktor Hemma', status: 'active', careType: 'Videokonsultation', provider: 'Dr. Erik Svensson', lastVisit: '2026-04-11', nextAppointment: '2026-04-25', nps: 10, visits: 9, isNew: false },
  { id: 15, name: 'Emma Larsson', age: 26, gender: 'F', company: 'CareFlow', status: 'inactive', careType: 'Uppföljning', provider: 'Dr. Maria Johansson', lastVisit: '2026-01-30', nextAppointment: null, nps: 5, visits: 2, isNew: false },
  { id: 16, name: 'Thomas Olsson', age: 71, gender: 'M', company: 'Doktor Hemma', status: 'active', careType: 'Kronisk vård', provider: 'Dr. Lisa Ekström', lastVisit: '2026-04-10', nextAppointment: '2026-04-24', nps: 9, visits: 31, isNew: false },
  { id: 17, name: 'Ingrid Magnusson', age: 44, gender: 'F', company: 'MediLink', status: 'pending', careType: 'Nybesök', provider: 'Dr. Johan Andersson', lastVisit: null, nextAppointment: '2026-04-16', nps: null, visits: 0, isNew: true },
  { id: 18, name: 'Fredrik Gustafsson', age: 39, gender: 'M', company: 'Doktor Hemma', status: 'active', careType: 'Videokonsultation', provider: 'Dr. Erik Svensson', lastVisit: '2026-04-08', nextAppointment: '2026-04-22', nps: 8, visits: 5, isNew: false },
  { id: 19, name: 'Hanna Björk', age: 33, gender: 'F', company: 'CareFlow', status: 'active', careType: 'Patientuppföljning', provider: 'Dr. Maria Johansson', lastVisit: '2026-04-09', nextAppointment: '2026-04-23', nps: 9, visits: 4, isNew: false },
  { id: 20, name: 'Lars Petersson', age: 63, gender: 'M', company: 'MediLink', status: 'active', careType: 'Kronisk vård', provider: 'Dr. Erik Svensson', lastVisit: '2026-04-07', nextAppointment: '2026-05-07', nps: 8, visits: 14, isNew: false },
]

export const companyHealthScores = [
  { company: 'Doktor Hemma', score: 87, trend: 'up', factors: { revenue: 90, patients: 85, margin: 88, satisfaction: 92 } },
  { company: 'MediLink', score: 74, trend: 'up', factors: { revenue: 78, patients: 82, margin: 68, satisfaction: 72 } },
  { company: 'CareFlow', score: 69, trend: 'up', factors: { revenue: 62, patients: 78, margin: 64, satisfaction: 76 } },
]
