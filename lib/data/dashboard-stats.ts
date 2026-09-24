import { NGO_INFO } from "./ngo-info";

export const DASHBOARD_METRICS = [
  {
    label: "Lives Impacted",
    value: NGO_INFO.metrics.livesImpacted,
    caption: "Official Published Figure",
    change: "Grassroots reach across Nainital district",
    icon: "HeartHandshake",
    badge: "Official Metric",
    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  {
    label: "Villages Served",
    value: NGO_INFO.metrics.villagesServed,
    caption: "Official Published Figure",
    change: "Active community coverage in Uttarakhand",
    icon: "MapPin",
    badge: "Official Metric",
    color: "text-forest-700 bg-forest-50 border-forest-200",
  },
  {
    label: "Active Volunteers",
    value: NGO_INFO.metrics.activeVolunteers,
    caption: "Official Published Figure",
    change: "Committed youth and field coordinators",
    icon: "Users",
    badge: "Official Metric",
    color: "text-blue-700 bg-blue-50 border-blue-200",
  },
  {
    label: "Years of Service",
    value: NGO_INFO.metrics.yearsOfService,
    caption: "Official Published Figure",
    change: "Sustained non-profit community work",
    icon: "CalendarCheck",
    badge: "Official Metric",
    color: "text-amber-700 bg-amber-50 border-amber-200",
  },
];

// Activity categories distribution for Recharts
export const ACTIVITIES_BY_CATEGORY = [
  { name: "Environment / Plantation", count: 8, fill: "#15803d" },
  { name: "Computer Education", count: 6, fill: "#0d9488" },
  { name: "General Education", count: 5, fill: "#2563eb" },
  { name: "Awareness Drives", count: 4, fill: "#d97706" },
  { name: "Hunger Relief", count: 3, fill: "#e11d48" },
  { name: "Community Service", count: 2, fill: "#7c3aed" },
];

// Monthly activity participation trend (Demo representation for dashboard visualization)
export const MONTHLY_ACTIVITY_TRENDS = [
  { month: "Apr", activities: 2, participants: 85 },
  { month: "May", activities: 3, participants: 140 },
  { month: "Jun", activities: 4, participants: 210 },
  { month: "Jul", activities: 6, participants: 320 },
  { month: "Aug", activities: 7, participants: 410 },
  { month: "Sep", activities: 6, participants: 380 },
];

// Focus area breakdown for Donut chart
export const SECTOR_ALLOCATION = [
  { name: "Plantation & Ecology (Green Haldwani)", value: 35, color: "#166534" },
  { name: "Digital Literacy (Seeds of Digital Confidence)", value: 25, color: "#0f766e" },
  { name: "Education & Literacy Support", value: 20, color: "#1d4ed8" },
  { name: "Hunger Relief & Nutrition", value: 12, color: "#c2410c" },
  { name: "Community Dialogue & Welfare", value: 8, color: "#6b21a8" },
];
