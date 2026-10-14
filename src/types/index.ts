export type RepairStatus =
  | 'Request Received'
  | 'Awaiting Contact'
  | 'Device Assessment'
  | 'Awaiting Customer Approval'
  | 'Awaiting Parts'
  | 'Repair in Progress'
  | 'Testing & Quality Check'
  | 'Ready for Collection'
  | 'Completed'
  | 'Cancelled';

export type DeviceType = 'laptop' | 'desktop' | 'aio' | 'custom_pc' | 'macbook' | 'other';

export interface RepairNote {
  id: string;
  createdAt: string;
  message: string;
  author: string;
}

export interface RepairRequest {
  id: string;
  referenceId: string; // e.g. "HYD-SRN-49201"
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deviceType: DeviceType;
  deviceBrand: string;
  deviceModel?: string;
  problemCategory: string;
  problemDescription: string;
  preferredContactMethod: 'phone' | 'whatsapp' | 'email';
  preferredContactTime?: 'morning' | 'afternoon' | 'evening' | 'anytime';
  status: RepairStatus;
  estimatedCost?: string;
  createdAt: string;
  updatedAt: string;
  customerVisibleNotes: RepairNote[];
  internalNotes: RepairNote[];
}

export interface SanitizedPublicRepair {
  referenceId: string;
  deviceType: DeviceType;
  deviceBrand: string;
  deviceModelMasked?: string;
  problemCategory: string;
  status: RepairStatus;
  estimatedCost?: string;
  createdAt: string;
  updatedAt: string;
  customerVisibleNotes: RepairNote[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  commonSymptoms: string[];
  diagnosticApproach: string;
  iconName: string;
}

export interface QuickProblem {
  id: string;
  title: string;
  symptomTag: string;
  recommendedAction: string;
  serviceCategory: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'customer' | 'admin';
}
