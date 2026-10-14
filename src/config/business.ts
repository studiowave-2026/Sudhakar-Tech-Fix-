// Centralized business configuration for Sudhakar Computer & Laptop Repairs.
// Any update to phone number, service area, or technician details here propagates across the entire site.

export interface LaunchChecklistItem {
  id: string;
  field: string;
  currentValue: string;
  questionForSudhakar: string;
  status: 'pending_verification' | 'confirmed';
}

export const BUSINESS_CONFIG = {
  technicianName: 'Sudhakar',
  businessName: 'Sudhakar Computer & Laptop Repairs',
  shortBrand: 'Sudhakar Repairs',
  tagline: 'Trusted Computer & Laptop Care Near SR Nagar, Hyderabad',
  category: 'Computer & Laptop Repair Services',
  
  // Centralized Temporary Contact Number
  // Note: Confirm with Sudhakar prior to external commercial printing
  phone: {
    display: '+91 1029384756',
    tel: '+911029384756',
    whatsappUrl: 'https://wa.me/911029384756',
    isTemporary: true,
    phoneNote: 'Temporary contact number (Verify before commercial marketing)',
  },

  // Location Context
  location: {
    primaryArea: 'SR Nagar',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    pincode: '500038',
    fullAreaDescription: 'Near SR Nagar, Hyderabad, Telangana, India',
    serviceRadiusDescription: 'Serving SR Nagar, Ameerpet, Sanath Nagar, Balkampet, and nearby Hyderabad areas',
    addressNote: 'Physical shop address / drop-off landmark to be confirmed directly with Sudhakar upon enquiry confirmation',
  },

  // Business Operational Commitments
  commitments: [
    {
      title: 'Direct Technician Access',
      description: 'You speak directly with Sudhakar, the technician diagnosing and fixing your machine.',
    },
    {
      title: 'Quotation Before Repair',
      description: 'No surprise charges. An assessment and estimate are shared before any repair proceeds.',
    },
    {
      title: 'Data Privacy Respected',
      description: 'Your personal files and data confidentiality are strictly respected and safeguarded.',
    },
    {
      title: 'Honest Feasibility Advice',
      description: 'If a repair is uneconomical or parts are unavailable, you will receive an honest appraisal.',
    },
  ],

  // Pre-Launch Verification Items
  launchChecklist: [
    {
      id: 'brand_name',
      field: 'Official Business Name',
      currentValue: 'Sudhakar Computer & Laptop Repairs',
      questionForSudhakar: 'Should the public brand be "Sudhakar Laptop Repairs", "Sudhakar Tech Solutions", or your registered shop name?',
      status: 'pending_verification' as const,
    },
    {
      id: 'phone_verification',
      field: 'Primary Phone & WhatsApp',
      currentValue: '+91 1029384756 (Temporary placeholder)',
      questionForSudhakar: 'Please verify the final official mobile number that will receive phone calls and WhatsApp enquiries.',
      status: 'pending_verification' as const,
    },
    {
      id: 'shop_address',
      field: 'Exact Shop / Drop-off Location',
      currentValue: 'Near SR Nagar, Hyderabad (General neighborhood)',
      questionForSudhakar: 'Provide the exact door number, lane, or landmark near SR Nagar so Google Maps directions can be published.',
      status: 'pending_verification' as const,
    },
    {
      id: 'services_pricing',
      field: 'Standard Diagnostics & Service Policy',
      currentValue: 'Assessment quotation model (Individual confirmation)',
      questionForSudhakar: 'Confirm which repairs you offer immediately, standard turnaround times, and if home pickup is available.',
      status: 'pending_verification' as const,
    },
  ],
};
