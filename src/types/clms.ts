// ==================== CLMS Type Definitions ====================

export type UserRole = 'admin' | 'lab_manager' | 'professor' | 'lab_technician' | 'lab_supervisor' | 'student' | 'auditor';

export type HazardLevel = 'low' | 'medium' | 'high' | 'critical';

export type ChemicalUnit = 'mL' | 'L' | 'g' | 'kg' | 'mol';

export type RequestStatus = 'pending' | 'approved_level1' | 'approved' | 'rejected' | 'dispensed';

export type AlertType = 'expiry' | 'low_stock' | 'hazard' | 'maintenance' | 'anomaly';

export type EquipmentStatus = 'available' | 'in_use' | 'maintenance' | 'out_of_order';

export type IncidentSeverity = 'minor' | 'moderate' | 'major' | 'critical';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  department: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  hazardClearanceLevel: HazardLevel;
}

export interface Chemical {
  id: string;
  name: string;
  casNumber: string;
  formula: string;
  hazardLevel: HazardLevel;
  quantity: number;
  unit: ChemicalUnit;
  minimumStock: number;
  location: string;
  expiryDate: string;
  supplier: string;
  msdsUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChemicalRequest {
  id: string;
  chemicalId: string;
  chemicalName: string;
  requesterId: string;
  requesterName: string;
  quantity: number;
  unit: ChemicalUnit;
  justification: string;
  experimentRef: string;
  status: RequestStatus;
  hazardLevel: HazardLevel;
  reviewerComment?: string;
  reviewerId?: string;
  reviewerName?: string;
  secondReviewerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Experiment {
  id: string;
  title: string;
  description: string;
  studentId: string;
  studentName: string;
  supervisorId: string;
  chemicals: { chemicalId: string; chemicalName: string; quantityUsed: number; unit: ChemicalUnit }[];
  status: 'draft' | 'in_progress' | 'completed' | 'confirmed';
  date: string;
  createdAt: string;
}

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  isRead: boolean;
  relatedId?: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface Equipment {
  id: string;
  name: string;
  model: string;
  status: EquipmentStatus;
  location: string;
  lastCalibration: string;
  nextCalibration: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  reportedBy: string;
  involvedUsers: string[];
  involvedChemicals: string[];
  date: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  createdAt: string;
}

export interface DashboardStats {
  totalChemicals: number;
  lowStockCount: number;
  expiringCount: number;
  pendingRequests: number;
  activeExperiments: number;
  openIncidents: number;
  monthlyUsage: { month: string; usage: number }[];
}
