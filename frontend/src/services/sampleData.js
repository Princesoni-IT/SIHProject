// Sample data for demo mode only. None of this ships with real data —
// it exists so the UI has something meaningful to render before the
// backend/ML endpoints are live. Every service tries the real API first.

export const sampleStats = {
  totalComplaints: { value: 1250, trend: 12, trendLabel: 'this week' },
  pendingComplaints: { value: 320, trend: 8, trendLabel: 'this week' },
  inProgressComplaints: { value: 250, trend: 10, trendLabel: 'this week' },
  resolvedComplaints: { value: 930, trend: 15, trendLabel: 'this week' },
  highRiskAreas: { value: 12, trend: 3, trendLabel: 'new areas' },
};

export const sampleComplaints = [
  { id: 'CMP-1042', type: 'Water Logging', location: 'Sector 12, Ward 5', reportedBy: 'Aman Verma', priority: 'High', status: 'Pending', date: '2026-09-04T09:10:00Z', description: 'Ankle-deep water accumulated near the main crossing after last night\'s rain.', images: [], assignedOfficer: null, timeline: [{ label: 'Complaint filed', time: '2026-09-04T09:10:00Z' }] },
  { id: 'CMP-1041', type: 'Pothole', location: 'MG Road, Ward 2', reportedBy: 'Priya Nair', priority: 'Medium', status: 'In Progress', date: '2026-09-04T08:50:00Z', description: 'Large pothole forming near the bus stop, worsened by rain.', images: [], assignedOfficer: 'Insp. R. Sharma', timeline: [{ label: 'Complaint filed', time: '2026-09-04T08:50:00Z' }, { label: 'Assigned to officer', time: '2026-09-04T09:30:00Z' }] },
  { id: 'CMP-1040', type: 'Drainage Issue', location: 'Shastri Nagar, Ward 8', reportedBy: 'Ravi Kumar', priority: 'Low', status: 'Pending', date: '2026-09-04T08:10:00Z', description: 'Blocked drain causing slow water flow along the lane.', images: [], assignedOfficer: null, timeline: [{ label: 'Complaint filed', time: '2026-09-04T08:10:00Z' }] },
  { id: 'CMP-1039', type: 'Water Logging', location: 'Indrapuri, Ward 11', reportedBy: 'Sunita Rao', priority: 'High', status: 'Pending', date: '2026-09-04T07:40:00Z', description: 'Severe waterlogging blocking vehicle movement.', images: [], assignedOfficer: null, timeline: [{ label: 'Complaint filed', time: '2026-09-04T07:40:00Z' }] },
  { id: 'CMP-1038', type: 'Garbage Overflow', location: 'Kankarbagh, Ward 3', reportedBy: 'Deepak Singh', priority: 'Medium', status: 'Resolved', date: '2026-09-04T06:30:00Z', description: 'Overflowing bin attracting waterlogging and blockage.', images: [], assignedOfficer: 'Insp. M. Iqbal', timeline: [{ label: 'Complaint filed', time: '2026-09-04T06:30:00Z' }, { label: 'Resolved', time: '2026-09-04T10:00:00Z' }] },
  { id: 'CMP-1037', type: 'Drainage Issue', location: 'Rajendra Nagar, Ward 6', reportedBy: 'Kabir Alam', priority: 'Critical', status: 'In Progress', date: '2026-09-03T21:15:00Z', description: 'Drain cover missing, hazard for pedestrians in flooded lane.', images: [], assignedOfficer: 'Insp. R. Sharma', timeline: [{ label: 'Complaint filed', time: '2026-09-03T21:15:00Z' }] },
  { id: 'CMP-1036', type: 'Water Logging', location: 'Patliputra Road, Ward 9', reportedBy: 'Neha Jain', priority: 'High', status: 'Closed', date: '2026-09-03T18:05:00Z', description: 'Waterlogging near the market entrance, resolved after pump deployment.', images: [], assignedOfficer: 'Insp. A. Verma', timeline: [{ label: 'Complaint filed', time: '2026-09-03T18:05:00Z' }, { label: 'Closed', time: '2026-09-03T22:00:00Z' }] },
];

export const sampleRainfall = {
  current: 24,
  unit: 'mm',
  condition: 'Moderate Rainfall',
  max24h: 65,
  min24h: 5,
  humidity: 78,
  windSpeed: 12,
};

export const sampleRiskAreas = [
  { id: 'RA-01', area: 'Indrapuri Low Lying Area', riskLevel: 'High', waterLevel: '1.4 m', rainfall: '58 mm', populationAffected: 4200, lastUpdated: '2026-09-04T08:00:00Z', status: 'Active', lat: 25.612, lng: 85.101 },
  { id: 'RA-02', area: 'Shastri Nagar Drainage Belt', riskLevel: 'High', waterLevel: '1.1 m', rainfall: '52 mm', populationAffected: 3100, lastUpdated: '2026-09-04T07:40:00Z', status: 'Active', lat: 25.625, lng: 85.09 },
  { id: 'RA-03', area: 'Kankarbagh Circular Road', riskLevel: 'Medium', waterLevel: '0.6 m', rainfall: '31 mm', populationAffected: 1800, lastUpdated: '2026-09-04T07:00:00Z', status: 'Monitoring', lat: 25.598, lng: 85.14 },
  { id: 'RA-04', area: 'Patliputra Colony Area', riskLevel: 'Medium', waterLevel: '0.5 m', rainfall: '28 mm', populationAffected: 1500, lastUpdated: '2026-09-04T06:50:00Z', status: 'Monitoring', lat: 25.606, lng: 85.078 },
  { id: 'RA-05', area: 'Danapur Riverside', riskLevel: 'Critical', waterLevel: '2.1 m', rainfall: '71 mm', populationAffected: 6400, lastUpdated: '2026-09-04T08:20:00Z', status: 'Active', lat: 25.635, lng: 85.045 },
  { id: 'RA-06', area: 'MG Road Junction', riskLevel: 'Low', waterLevel: '0.2 m', rainfall: '14 mm', populationAffected: 600, lastUpdated: '2026-09-04T06:10:00Z', status: 'Normal', lat: 25.611, lng: 85.13 },
];

export const sampleMapLocations = [
  { id: 'LOC-1', type: 'complaint', severity: 'high', title: 'Water Logging', location: 'Danapur', lat: 25.638, lng: 85.049 },
  { id: 'LOC-2', type: 'risk', severity: 'high', title: 'High Risk Area', location: 'Civil Lines', lat: 25.63, lng: 85.135 },
  { id: 'LOC-3', type: 'complaint', severity: 'warning', title: 'Waterlogging Reported', location: 'Naya Bazar', lat: 25.622, lng: 85.1 },
  { id: 'LOC-4', type: 'complaint', severity: 'normal', title: 'Drainage Cleared', location: 'Shastri Nagar', lat: 25.616, lng: 85.088 },
  { id: 'LOC-5', type: 'risk', severity: 'normal', title: 'Normal', location: 'Kankarbagh', lat: 25.596, lng: 85.142 },
  { id: 'LOC-6', type: 'complaint', severity: 'warning', title: 'Water Logged', location: 'Patliputra Road', lat: 25.605, lng: 85.079 },
  { id: 'LOC-7', type: 'emergency', severity: 'high', title: 'Emergency Response Active', location: 'MG Road', lat: 25.61, lng: 85.128 },
];

export const samplePredictions = [
  { areaId: 'RA-05', area: 'Danapur Riverside', floodProbability: 82, riskLevel: 'High', predictedWaterLevel: '1.8 m', expectedRainfall: '48 mm', predictionWindow: 'Next 3 Hours', confidence: 91, generatedAt: '2026-09-04T08:30:00Z' },
  { areaId: 'RA-01', area: 'Indrapuri Low Lying Area', floodProbability: 68, riskLevel: 'High', predictedWaterLevel: '1.5 m', expectedRainfall: '39 mm', predictionWindow: 'Next 3 Hours', confidence: 87, generatedAt: '2026-09-04T08:30:00Z' },
  { areaId: 'RA-03', area: 'Kankarbagh Circular Road', floodProbability: 41, riskLevel: 'Medium', predictedWaterLevel: '0.7 m', expectedRainfall: '22 mm', predictionWindow: 'Next 3 Hours', confidence: 78, generatedAt: '2026-09-04T08:30:00Z' },
  { areaId: 'RA-06', area: 'MG Road Junction', floodProbability: 12, riskLevel: 'Low', predictedWaterLevel: '0.2 m', expectedRainfall: '9 mm', predictionWindow: 'Next 3 Hours', confidence: 82, generatedAt: '2026-09-04T08:30:00Z' },
];

export const sampleAlerts = [
  { id: 'AL-1', severity: 'high', title: 'High rainfall alert for Sector 10, 11, 12', message: 'Continuous heavy rainfall expected over the next 3 hours. Residents advised to avoid low-lying roads.', affectedArea: 'Sector 10, 11, 12', time: '2026-09-04T06:30:00Z', status: 'Active' },
  { id: 'AL-2', severity: 'warning', title: 'Water logging reported in Indrapuri', message: 'Waterlogging observed near the main market. Pumping operations underway.', affectedArea: 'Indrapuri', time: '2026-09-04T05:30:00Z', status: 'Active' },
  { id: 'AL-3', severity: 'info', title: 'Inspection scheduled in Sector 5', message: 'Routine drainage inspection scheduled for this afternoon.', affectedArea: 'Sector 5', time: '2026-09-04T03:30:00Z', status: 'Scheduled' },
  { id: 'AL-4', severity: 'critical', title: 'Flood warning — Danapur Riverside', message: 'River level rising rapidly. Evacuation advisory issued for riverside colonies.', affectedArea: 'Danapur', time: '2026-09-04T08:10:00Z', status: 'Active' },
];

export const sampleInspections = [
  { id: 'INS-01', location: 'Sector 5 Drainage Line', officer: 'Insp. R. Sharma', date: '2026-09-04', status: 'Scheduled' },
  { id: 'INS-02', location: 'Danapur Riverside Embankment', officer: 'Insp. A. Verma', date: '2026-09-04', status: 'Pending' },
  { id: 'INS-03', location: 'MG Road Storm Drain', officer: 'Insp. M. Iqbal', date: '2026-09-03', status: 'Completed' },
  { id: 'INS-04', location: 'Kankarbagh Pumping Station', officer: 'Insp. R. Sharma', date: '2026-09-02', status: 'Completed' },
];

export const sampleNotices = [
  { id: 'NOT-01', title: 'Monsoon Preparedness Advisory', description: 'All residents in low-lying wards should keep emergency kits ready.', targetAudience: 'All Citizens', area: 'City-wide', priority: 'High', publishedDate: '2026-09-01', expiryDate: '2026-09-30', status: 'Published' },
  { id: 'NOT-02', title: 'Scheduled Drain Maintenance — Ward 8', description: 'Drain cleaning scheduled; expect temporary road closures.', targetAudience: 'Ward 8 Residents', area: 'Shastri Nagar', priority: 'Medium', publishedDate: '2026-09-02', expiryDate: '2026-09-10', status: 'Published' },
  { id: 'NOT-03', title: 'Emergency Helpline Update', description: 'Additional helpline lines opened for the monsoon season.', targetAudience: 'All Citizens', area: 'City-wide', priority: 'Low', publishedDate: '2026-08-20', expiryDate: '2026-09-01', status: 'Archived' },
];

export const sampleUsers = [
  { id: 'USR-01', name: 'Aman Verma', email: 'aman.verma@example.com', phone: '+91 98xxxxxx01', role: 'citizen', status: 'Active', registeredDate: '2026-01-12', lastActive: '2026-09-04T08:00:00Z' },
  { id: 'USR-02', name: 'Insp. R. Sharma', email: 'r.sharma@aquaalert.gov', phone: '+91 98xxxxxx02', role: 'admin', status: 'Active', registeredDate: '2025-11-04', lastActive: '2026-09-04T07:45:00Z' },
  { id: 'USR-03', name: 'Priya Nair', email: 'priya.nair@example.com', phone: '+91 98xxxxxx03', role: 'citizen', status: 'Active', registeredDate: '2026-02-20', lastActive: '2026-09-03T18:00:00Z' },
  { id: 'USR-04', name: 'Deepak Singh', email: 'deepak.singh@example.com', phone: '+91 98xxxxxx04', role: 'citizen', status: 'Inactive', registeredDate: '2025-12-10', lastActive: '2026-07-01T09:00:00Z' },
  { id: 'USR-05', name: 'Super Admin', email: 'superadmin@aquaalert.gov', phone: '+91 98xxxxxx05', role: 'super_admin', status: 'Active', registeredDate: '2025-06-01', lastActive: '2026-09-04T08:55:00Z' },
];

export const sampleNotifications = [
  { id: 'NTF-1', title: 'New high-priority complaint', message: 'Water logging reported in Indrapuri, Ward 11.', time: '2026-09-04T08:10:00Z', read: false, type: 'complaint' },
  { id: 'NTF-2', title: 'Flood warning issued', message: 'Critical flood warning for Danapur Riverside.', time: '2026-09-04T08:05:00Z', read: false, type: 'emergency' },
  { id: 'NTF-3', title: 'Inspection completed', message: 'MG Road Storm Drain inspection marked complete.', time: '2026-09-03T17:20:00Z', read: true, type: 'system' },
  { id: 'NTF-4', title: 'Notice published', message: 'Monsoon Preparedness Advisory is now live.', time: '2026-09-01T09:00:00Z', read: true, type: 'system' },
];

export const sampleReports = {
  complaintsOverTime: [
    { date: 'Aug 29', complaints: 62 }, { date: 'Aug 30', complaints: 74 }, { date: 'Aug 31', complaints: 58 },
    { date: 'Sep 1', complaints: 91 }, { date: 'Sep 2', complaints: 103 }, { date: 'Sep 3', complaints: 87 }, { date: 'Sep 4', complaints: 112 },
  ],
  statusDistribution: [
    { name: 'Pending', value: 320 }, { name: 'In Progress', value: 250 }, { name: 'Resolved', value: 930 }, { name: 'Closed', value: 150 },
  ],
  riskAreas: [
    { area: 'Danapur', risk: 82 }, { area: 'Indrapuri', risk: 68 }, { area: 'Shastri Nagar', risk: 61 }, { area: 'Kankarbagh', risk: 41 }, { area: 'MG Road', risk: 12 },
  ],
  rainfallTrend: [
    { date: 'Aug 29', mm: 12 }, { date: 'Aug 30', mm: 18 }, { date: 'Aug 31', mm: 9 },
    { date: 'Sep 1', mm: 31 }, { date: 'Sep 2', mm: 44 }, { date: 'Sep 3', mm: 38 }, { date: 'Sep 4', mm: 24 },
  ],
  resolvedVsPending: [
    { month: 'May', resolved: 210, pending: 90 }, { month: 'Jun', resolved: 260, pending: 110 },
    { month: 'Jul', resolved: 300, pending: 140 }, { month: 'Aug', resolved: 930, pending: 320 },
  ],
  emergencyAlerts: [
    { month: 'May', alerts: 4 }, { month: 'Jun', alerts: 7 }, { month: 'Jul', alerts: 9 }, { month: 'Aug', alerts: 14 },
  ],
  areaWiseComplaints: [
    { area: 'Ward 2', complaints: 145 }, { area: 'Ward 3', complaints: 98 }, { area: 'Ward 5', complaints: 187 },
    { area: 'Ward 6', complaints: 76 }, { area: 'Ward 8', complaints: 132 }, { area: 'Ward 9', complaints: 61 }, { area: 'Ward 11', complaints: 210 },
  ],
};
