import { RepairRequest, SanitizedPublicRepair, RepairStatus, DeviceType } from '../types';

const STORAGE_KEY = 'sudhakar_repairs_db_v1';

const INITIAL_SEED_REPAIRS: RepairRequest[] = [
  {
    id: 'req_seed_1',
    referenceId: 'HYD-SRN-48219',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul.sharma@example.com',
    customerPhone: '+91 9876543210',
    deviceType: 'laptop',
    deviceBrand: 'Dell',
    deviceModel: 'Inspiron 15 3511',
    problemCategory: 'Slow Computer Troubleshooting',
    problemDescription: 'Laptop takes 4 minutes to boot up and hits 100% disk usage constantly. Also fan is loud when watching videos.',
    preferredContactMethod: 'whatsapp',
    preferredContactTime: 'morning',
    status: 'Device Assessment',
    estimatedCost: 'Assessment in progress',
    createdAt: '2026-10-12T10:30:00.000Z',
    updatedAt: '2026-10-13T14:15:00.000Z',
    customerVisibleNotes: [
      {
        id: 'note_1',
        createdAt: '2026-10-12T11:00:00.000Z',
        message: 'Device received at SR Nagar bench. Serial and cosmetic inspection logged.',
        author: 'Sudhakar',
      },
      {
        id: 'note_2',
        createdAt: '2026-10-13T14:15:00.000Z',
        message: 'Bench diagnosis confirmed mechanical 1TB hard drive has high read-latency sectors. Recommending NVMe SSD upgrade for instant speed.',
        author: 'Sudhakar',
      },
    ],
    internalNotes: [
      {
        id: 'int_1',
        createdAt: '2026-10-12T11:05:00.000Z',
        message: 'Checked DC-in jack: solid. Fan fins have lint buildup; needs compressed air cleaning and Arctic MX-4 thermal paste refresh.',
        author: 'Sudhakar',
      },
    ],
  },
  {
    id: 'req_seed_2',
    referenceId: 'HYD-SRN-51028',
    customerName: 'Anand Varma',
    customerEmail: 'anand.v@example.com',
    customerPhone: '+91 9700112233',
    deviceType: 'laptop',
    deviceBrand: 'HP',
    deviceModel: 'Pavilion 14-dv',
    problemCategory: 'Laptop Screen Replacement Enquiries',
    problemDescription: 'Screen received an accidental impact. Right half shows vertical colored lines and black ink spread.',
    preferredContactMethod: 'phone',
    preferredContactTime: 'evening',
    status: 'Awaiting Customer Approval',
    estimatedCost: '₹3,200',
    createdAt: '2026-10-13T09:00:00.000Z',
    updatedAt: '2026-10-14T08:20:00.000Z',
    customerVisibleNotes: [
      {
        id: 'note_3',
        createdAt: '2026-10-13T09:30:00.000Z',
        message: 'Device inspected. Motherboard and HDMI output are completely intact.',
        author: 'Sudhakar',
      },
      {
        id: 'note_4',
        createdAt: '2026-10-14T08:20:00.000Z',
        message: 'Compatible 14.0" FHD IPS 30-pin matte panel sourced from authorized distributor. Estimate shared for approval.',
        author: 'Sudhakar',
      },
    ],
    internalNotes: [
      {
        id: 'int_2',
        createdAt: '2026-10-13T10:00:00.000Z',
        message: 'Part number NV140FHM-N49. Double check bezel double-sided adhesive tape stock before installation.',
        author: 'Sudhakar',
      },
    ],
  },
  {
    id: 'req_seed_3',
    referenceId: 'HYD-SRN-39104',
    customerName: 'Priya Reddy',
    customerEmail: 'priya.reddy@example.com',
    customerPhone: '+91 9822334455',
    deviceType: 'laptop',
    deviceBrand: 'Lenovo',
    deviceModel: 'ThinkPad E14 Gen 2',
    problemCategory: 'RAM & SSD Upgrade Enquiries',
    problemDescription: 'Need 16GB RAM upgrade and 500GB SSD for software development work.',
    preferredContactMethod: 'whatsapp',
    preferredContactTime: 'anytime',
    status: 'Completed',
    estimatedCost: '₹4,100',
    createdAt: '2026-10-10T11:00:00.000Z',
    updatedAt: '2026-10-11T17:30:00.000Z',
    customerVisibleNotes: [
      {
        id: 'note_5',
        createdAt: '2026-10-10T16:00:00.000Z',
        message: 'DDR4 3200MHz RAM module and high-speed NVMe SSD installed.',
        author: 'Sudhakar',
      },
      {
        id: 'note_6',
        createdAt: '2026-10-11T17:30:00.000Z',
        message: 'Memory diagnostic pass (0 errors). Thermal paste refreshed. Device collected by customer.',
        author: 'Sudhakar',
      },
    ],
    internalNotes: [
      {
        id: 'int_3',
        createdAt: '2026-10-11T17:00:00.000Z',
        message: 'Payment settled. Customer requested copy of bill sent to WhatsApp.',
        author: 'Sudhakar',
      },
    ],
  },
];

function loadRepairsFromStorage(): RepairRequest[] {
  if (typeof window === 'undefined') return INITIAL_SEED_REPAIRS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_REPAIRS));
      return INITIAL_SEED_REPAIRS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading repairs from storage:', err);
    return INITIAL_SEED_REPAIRS;
  }
}

function saveRepairsToStorage(repairs: RepairRequest[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(repairs));
  } catch (err) {
    console.error('Failed saving repairs to storage:', err);
  }
}

export function generateReferenceId(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `HYD-SRN-${randomNum}`;
}

export const RepairStore = {
  getAll(): RepairRequest[] {
    return loadRepairsFromStorage();
  },

  getByReference(referenceId: string): RepairRequest | undefined {
    const cleanRef = referenceId.trim().toUpperCase();
    const all = loadRepairsFromStorage();
    return all.find(r => r.referenceId.toUpperCase() === cleanRef);
  },

  // Masked public lookup for security & privacy:
  // Hides customer phone, email, and internal notes from public enumeration
  getPublicStatus(referenceId: string): SanitizedPublicRepair | null {
    const record = this.getByReference(referenceId);
    if (!record) return null;

    // Mask the model name partially for privacy if long
    const maskedModel = record.deviceModel
      ? record.deviceModel.length > 3
        ? `${record.deviceModel.slice(0, 3)}***`
        : record.deviceModel
      : undefined;

    return {
      referenceId: record.referenceId,
      deviceType: record.deviceType,
      deviceBrand: record.deviceBrand,
      deviceModelMasked: maskedModel,
      problemCategory: record.problemCategory,
      status: record.status,
      estimatedCost: record.estimatedCost,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      customerVisibleNotes: record.customerVisibleNotes,
    };
  },

  getByCustomerEmail(email: string): RepairRequest[] {
    const cleanEmail = email.trim().toLowerCase();
    const all = loadRepairsFromStorage();
    return all.filter(r => r.customerEmail.toLowerCase() === cleanEmail);
  },

  create(data: {
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
  }): RepairRequest {
    const all = loadRepairsFromStorage();
    const now = new Date().toISOString();
    const referenceId = generateReferenceId();

    const newRequest: RepairRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      referenceId,
      customerName: data.customerName.trim(),
      customerEmail: data.customerEmail.trim().toLowerCase(),
      customerPhone: data.customerPhone.trim(),
      deviceType: data.deviceType,
      deviceBrand: data.deviceBrand.trim(),
      deviceModel: data.deviceModel?.trim() || '',
      problemCategory: data.problemCategory,
      problemDescription: data.problemDescription.trim(),
      preferredContactMethod: data.preferredContactMethod,
      preferredContactTime: data.preferredContactTime || 'anytime',
      status: 'Request Received',
      estimatedCost: 'To be determined after assessment',
      createdAt: now,
      updatedAt: now,
      customerVisibleNotes: [
        {
          id: `note_${Date.now()}`,
          createdAt: now,
          message: 'Enquiry received online. Sudhakar will contact you to discuss next steps.',
          author: 'Sudhakar',
        },
      ],
      internalNotes: [],
    };

    all.unshift(newRequest);
    saveRepairsToStorage(all);
    return newRequest;
  },

  updateStatus(id: string, status: RepairStatus, estimatedCost?: string): RepairRequest | null {
    const all = loadRepairsFromStorage();
    const index = all.findIndex(r => r.id === id);
    if (index === -1) return null;

    const now = new Date().toISOString();
    all[index].status = status;
    all[index].updatedAt = now;
    if (estimatedCost !== undefined && estimatedCost.trim() !== '') {
      all[index].estimatedCost = estimatedCost.trim();
    }

    saveRepairsToStorage(all);
    return all[index];
  },

  addCustomerVisibleNote(id: string, message: string, author: string = 'Sudhakar'): RepairRequest | null {
    const all = loadRepairsFromStorage();
    const index = all.findIndex(r => r.id === id);
    if (index === -1) return null;

    const now = new Date().toISOString();
    const newNote = {
      id: `note_${Date.now()}`,
      createdAt: now,
      message: message.trim(),
      author,
    };

    all[index].customerVisibleNotes.push(newNote);
    all[index].updatedAt = now;
    saveRepairsToStorage(all);
    return all[index];
  },

  addInternalNote(id: string, message: string, author: string = 'Sudhakar'): RepairRequest | null {
    const all = loadRepairsFromStorage();
    const index = all.findIndex(r => r.id === id);
    if (index === -1) return null;

    const now = new Date().toISOString();
    const newNote = {
      id: `int_${Date.now()}`,
      createdAt: now,
      message: message.trim(),
      author,
    };

    all[index].internalNotes.push(newNote);
    all[index].updatedAt = now;
    saveRepairsToStorage(all);
    return all[index];
  },

  resetToDefaults(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_REPAIRS));
    }
  },
};
