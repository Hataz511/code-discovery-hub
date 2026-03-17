import type { Chemical, ChemicalRequest, Alert, AuditLogEntry, User, DashboardStats, Experiment, Equipment } from '@/types/clms';

export const currentUser: User = {
  id: 'u-001',
  fullName: 'Dr. Elena Hoxha',
  email: 'elena.hoxha@uni.edu',
  role: 'lab_manager',
  department: 'Chemistry',
  isActive: true,
  createdAt: '2024-09-01',
  lastLogin: '2026-03-17T08:30:00',
  hazardClearanceLevel: 'critical',
};

export const mockUsers: User[] = [
  currentUser,
  { id: 'u-002', fullName: 'Prof. Arben Krasniqi', email: 'arben.k@uni.edu', role: 'professor', department: 'Chemistry', isActive: true, createdAt: '2024-09-01', hazardClearanceLevel: 'high' },
  { id: 'u-003', fullName: 'Blerta Morina', email: 'blerta.m@uni.edu', role: 'lab_technician', department: 'Chemistry', isActive: true, createdAt: '2024-10-15', hazardClearanceLevel: 'high' },
  { id: 'u-004', fullName: 'Driton Berisha', email: 'driton.b@uni.edu', role: 'student', department: 'Chemistry', isActive: true, createdAt: '2025-02-01', hazardClearanceLevel: 'medium' },
  { id: 'u-005', fullName: 'Fjolla Gashi', email: 'fjolla.g@uni.edu', role: 'student', department: 'Biology', isActive: true, createdAt: '2025-02-01', hazardClearanceLevel: 'low' },
  { id: 'u-006', fullName: 'Admin Sistemi', email: 'admin@uni.edu', role: 'admin', department: 'IT', isActive: true, createdAt: '2024-01-01', hazardClearanceLevel: 'critical' },
];

export const mockChemicals: Chemical[] = [
  { id: 'c-001', name: 'Hydrochloric Acid', casNumber: '7647-01-0', formula: 'HCl', hazardLevel: 'high', quantity: 2500, unit: 'mL', minimumStock: 500, location: 'Cabinet A-1', expiryDate: '2026-04-15', supplier: 'Sigma-Aldrich', createdAt: '2025-01-10', updatedAt: '2026-03-15' },
  { id: 'c-002', name: 'Sodium Hydroxide', casNumber: '1310-73-2', formula: 'NaOH', hazardLevel: 'high', quantity: 1200, unit: 'g', minimumStock: 300, location: 'Cabinet A-2', expiryDate: '2027-01-20', supplier: 'Merck', createdAt: '2025-01-10', updatedAt: '2026-03-14' },
  { id: 'c-003', name: 'Ethanol', casNumber: '64-17-5', formula: 'C₂H₅OH', hazardLevel: 'medium', quantity: 4500, unit: 'mL', minimumStock: 1000, location: 'Cabinet B-1', expiryDate: '2026-12-01', supplier: 'Fisher Scientific', createdAt: '2025-02-05', updatedAt: '2026-03-10' },
  { id: 'c-004', name: 'Sulfuric Acid', casNumber: '7664-93-9', formula: 'H₂SO₄', hazardLevel: 'critical', quantity: 800, unit: 'mL', minimumStock: 200, location: 'Hazard Vault', expiryDate: '2026-06-30', supplier: 'Sigma-Aldrich', createdAt: '2025-01-15', updatedAt: '2026-03-12' },
  { id: 'c-005', name: 'Acetone', casNumber: '67-64-1', formula: '(CH₃)₂CO', hazardLevel: 'medium', quantity: 3000, unit: 'mL', minimumStock: 800, location: 'Cabinet B-2', expiryDate: '2026-11-15', supplier: 'VWR', createdAt: '2025-03-01', updatedAt: '2026-03-16' },
  { id: 'c-006', name: 'Potassium Permanganate', casNumber: '7722-64-7', formula: 'KMnO₄', hazardLevel: 'high', quantity: 150, unit: 'g', minimumStock: 200, location: 'Cabinet C-1', expiryDate: '2026-08-20', supplier: 'Merck', createdAt: '2025-04-10', updatedAt: '2026-03-15' },
  { id: 'c-007', name: 'Methanol', casNumber: '67-56-1', formula: 'CH₃OH', hazardLevel: 'high', quantity: 1800, unit: 'mL', minimumStock: 500, location: 'Cabinet B-3', expiryDate: '2026-04-01', supplier: 'Fisher Scientific', createdAt: '2025-05-20', updatedAt: '2026-03-14' },
  { id: 'c-008', name: 'Sodium Chloride', casNumber: '7647-14-5', formula: 'NaCl', hazardLevel: 'low', quantity: 5000, unit: 'g', minimumStock: 1000, location: 'Cabinet D-1', expiryDate: '2028-01-01', supplier: 'VWR', createdAt: '2025-01-05', updatedAt: '2026-03-16' },
  { id: 'c-009', name: 'Phenolphthalein', casNumber: '77-09-8', formula: 'C₂₀H₁₄O₄', hazardLevel: 'low', quantity: 50, unit: 'g', minimumStock: 20, location: 'Cabinet C-2', expiryDate: '2027-06-15', supplier: 'Sigma-Aldrich', createdAt: '2025-06-01', updatedAt: '2026-03-10' },
  { id: 'c-010', name: 'Hydrogen Peroxide 30%', casNumber: '7722-84-1', formula: 'H₂O₂', hazardLevel: 'high', quantity: 400, unit: 'mL', minimumStock: 500, location: 'Hazard Vault', expiryDate: '2026-03-25', supplier: 'Merck', createdAt: '2025-07-15', updatedAt: '2026-03-17' },
];

export const mockRequests: ChemicalRequest[] = [
  { id: 'r-001', chemicalId: 'c-001', chemicalName: 'Hydrochloric Acid', requesterId: 'u-004', requesterName: 'Driton Berisha', quantity: 100, unit: 'mL', justification: 'Titration experiment for acid-base analysis', experimentRef: 'EXP-2026-042', status: 'pending', hazardLevel: 'high', createdAt: '2026-03-16T14:00:00', updatedAt: '2026-03-16T14:00:00' },
  { id: 'r-002', chemicalId: 'c-004', chemicalName: 'Sulfuric Acid', requesterId: 'u-004', requesterName: 'Driton Berisha', quantity: 50, unit: 'mL', justification: 'Dehydration reaction demonstration', experimentRef: 'EXP-2026-043', status: 'approved_level1', hazardLevel: 'critical', reviewerComment: 'Approved with caution — use fume hood', reviewerId: 'u-002', reviewerName: 'Prof. Arben Krasniqi', createdAt: '2026-03-15T09:30:00', updatedAt: '2026-03-15T16:00:00' },
  { id: 'r-003', chemicalId: 'c-003', chemicalName: 'Ethanol', requesterId: 'u-005', requesterName: 'Fjolla Gashi', quantity: 200, unit: 'mL', justification: 'DNA extraction protocol', experimentRef: 'EXP-2026-040', status: 'approved', hazardLevel: 'medium', reviewerComment: 'Standard procedure approved', reviewerId: 'u-002', reviewerName: 'Prof. Arben Krasniqi', createdAt: '2026-03-14T10:00:00', updatedAt: '2026-03-14T15:00:00' },
  { id: 'r-004', chemicalId: 'c-008', chemicalName: 'Sodium Chloride', requesterId: 'u-005', requesterName: 'Fjolla Gashi', quantity: 500, unit: 'g', justification: 'Saline solution preparation', experimentRef: 'EXP-2026-041', status: 'dispensed', hazardLevel: 'low', reviewerComment: 'OK', reviewerId: 'u-002', reviewerName: 'Prof. Arben Krasniqi', createdAt: '2026-03-13T08:00:00', updatedAt: '2026-03-13T14:00:00' },
  { id: 'r-005', chemicalId: 'c-007', chemicalName: 'Methanol', requesterId: 'u-004', requesterName: 'Driton Berisha', quantity: 150, unit: 'mL', justification: 'GC-MS sample preparation', experimentRef: 'EXP-2026-044', status: 'rejected', hazardLevel: 'high', reviewerComment: 'Insufficient safety training for this chemical', reviewerId: 'u-002', reviewerName: 'Prof. Arben Krasniqi', createdAt: '2026-03-12T11:00:00', updatedAt: '2026-03-12T16:30:00' },
];

export const mockAlerts: Alert[] = [
  { id: 'a-001', type: 'expiry', title: 'Skadim i afërt', message: 'Hydrogen Peroxide 30% skadon në 8 ditë (25 Mars 2026)', severity: 'critical', isRead: false, relatedId: 'c-010', createdAt: '2026-03-17T06:00:00' },
  { id: 'a-002', type: 'expiry', title: 'Skadim i afërt', message: 'Methanol skadon në 15 ditë (1 Prill 2026)', severity: 'warning', isRead: false, relatedId: 'c-007', createdAt: '2026-03-17T06:00:00' },
  { id: 'a-003', type: 'low_stock', title: 'Stok i ulët', message: 'Potassium Permanganate: 150g / 200g minimum', severity: 'warning', isRead: false, relatedId: 'c-006', createdAt: '2026-03-15T12:00:00' },
  { id: 'a-004', type: 'low_stock', title: 'Stok i ulët', message: 'Hydrogen Peroxide 30%: 400mL / 500mL minimum', severity: 'critical', isRead: true, relatedId: 'c-010', createdAt: '2026-03-17T06:00:00' },
  { id: 'a-005', type: 'hazard', title: 'Tentativë e paautorizuar', message: 'Fjolla Gashi tentoi akses në Sulfuric Acid pa autorizim', severity: 'critical', isRead: false, relatedId: 'u-005', createdAt: '2026-03-16T10:30:00' },
];

export const mockAuditLog: AuditLogEntry[] = [
  { id: 'al-001', userId: 'u-004', userName: 'Driton Berisha', action: 'REQUEST_CREATED', module: 'Chemical Requests', details: 'Kërkesë për 100mL HCl', ipAddress: '192.168.1.45', timestamp: '2026-03-16T14:00:00' },
  { id: 'al-002', userId: 'u-002', userName: 'Prof. Arben Krasniqi', action: 'REQUEST_APPROVED_L1', module: 'Chemical Requests', details: 'Aprovoi kërkesën r-002 për H₂SO₄', ipAddress: '192.168.1.22', timestamp: '2026-03-15T16:00:00' },
  { id: 'al-003', userId: 'u-003', userName: 'Blerta Morina', action: 'CHEMICAL_UPDATED', module: 'Inventory', details: 'Përditësoi sasinë e Ethanol: 4700mL → 4500mL', ipAddress: '192.168.1.30', timestamp: '2026-03-14T15:30:00' },
  { id: 'al-004', userId: 'u-005', userName: 'Fjolla Gashi', action: 'ACCESS_DENIED', module: 'Security', details: 'Tentativë aksesi në H₂SO₄ — clearance e pamjaftueshme', ipAddress: '192.168.1.55', timestamp: '2026-03-16T10:30:00' },
  { id: 'al-005', userId: 'u-006', userName: 'Admin Sistemi', action: 'USER_CREATED', module: 'User Management', details: 'Krijoi llogari për Fjolla Gashi', ipAddress: '192.168.1.10', timestamp: '2026-02-01T09:00:00' },
  { id: 'al-006', userId: 'u-001', userName: 'Dr. Elena Hoxha', action: 'LOGIN', module: 'Auth', details: 'Hyrje e suksesshme me 2FA', ipAddress: '192.168.1.15', timestamp: '2026-03-17T08:30:00' },
];

export const mockExperiments: Experiment[] = [
  { id: 'exp-001', title: 'Titrimi acid-bazë', description: 'Përcaktimi i koncentrimit të HCl me NaOH', studentId: 'u-004', studentName: 'Driton Berisha', supervisorId: 'u-002', chemicals: [{ chemicalId: 'c-001', chemicalName: 'Hydrochloric Acid', quantityUsed: 50, unit: 'mL' }, { chemicalId: 'c-002', chemicalName: 'Sodium Hydroxide', quantityUsed: 30, unit: 'g' }], status: 'completed', date: '2026-03-15', createdAt: '2026-03-15T10:00:00' },
  { id: 'exp-002', title: 'Ekstraktimi i ADN-së', description: 'Izolimi i ADN-së nga qelizat bimore', studentId: 'u-005', studentName: 'Fjolla Gashi', supervisorId: 'u-002', chemicals: [{ chemicalId: 'c-003', chemicalName: 'Ethanol', quantityUsed: 200, unit: 'mL' }, { chemicalId: 'c-008', chemicalName: 'Sodium Chloride', quantityUsed: 50, unit: 'g' }], status: 'in_progress', date: '2026-03-17', createdAt: '2026-03-17T09:00:00' },
];

export const mockEquipment: Equipment[] = [
  { id: 'eq-001', name: 'Spektrofotometër UV-Vis', model: 'Shimadzu UV-1800', status: 'available', location: 'Lab 201', lastCalibration: '2026-02-15', nextCalibration: '2026-05-15' },
  { id: 'eq-002', name: 'pH Meter', model: 'Mettler Toledo FE20', status: 'in_use', location: 'Lab 201', lastCalibration: '2026-03-01', nextCalibration: '2026-06-01' },
  { id: 'eq-003', name: 'Centrifugë', model: 'Eppendorf 5424R', status: 'maintenance', location: 'Lab 202', lastCalibration: '2026-01-10', nextCalibration: '2026-04-10' },
  { id: 'eq-004', name: 'Peshore analitike', model: 'Sartorius QUINTIX224', status: 'available', location: 'Lab 201', lastCalibration: '2026-03-10', nextCalibration: '2026-06-10' },
];

export const mockDashboardStats: DashboardStats = {
  totalChemicals: 10,
  lowStockCount: 2,
  expiringCount: 2,
  pendingRequests: 2,
  activeExperiments: 1,
  openIncidents: 0,
  monthlyUsage: [
    { month: 'Tet', usage: 45 }, { month: 'Shk', usage: 62 }, { month: 'Mar', usage: 38 },
    { month: 'Pri', usage: 71 }, { month: 'Maj', usage: 55 }, { month: 'Qer', usage: 89 },
    { month: 'Kor', usage: 23 }, { month: 'Gus', usage: 12 }, { month: 'Sht', usage: 67 },
    { month: 'Tet', usage: 78 }, { month: 'Nën', usage: 84 }, { month: 'Dhj', usage: 56 },
  ],
};
