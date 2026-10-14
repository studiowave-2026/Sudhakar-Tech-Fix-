# Sudhakar Computer & Laptop Repairs — SR Nagar, Hyderabad

A production-grade, conversion-optimized, and customer-centric website for **Sudhakar**, an independent computer and laptop technician serving clients near **SR Nagar, Hyderabad, Telangana, India**.

---

## 1. Key Features

- **Apple-grade Visual Hierarchy & Domain-Native Design**:
  - Dark navy, clean slate, and electric blue accents.
  - Generous whitespace, zero decorative slop, and anti-pill metadata discipline.
  - Commercial workbench photography generated specifically for laptop and electronics repair.
- **Quick Problem Selector ("What do you need help with?")**:
  - 12 interactive problem cards (power failure, slow performance, broken screen, battery, keyboard, BSOD, virus, data recovery, etc.).
  - Instant diagnostic guidance and 1-tap prefilling into the repair booking form.
- **12 Comprehensive Diagnostic Services**:
  - Dedicated cards with real symptoms, bench check techniques, and "Request This Service" CTAs.
  - Transparent messaging that repair feasibility and quotations are confirmed after physical assessment.
- **Smart Repair Booking & Enquiry Engine**:
  - Progressive disclosure form with device type, brand, model, detailed symptoms, and preferred contact method (Phone, WhatsApp, Email).
  - Validation with inline error states and anti-duplicate submission protection.
  - Generates unique non-guessable tracking reference IDs (`HYD-SRN-XXXXX`).
  - Instant confirmation view with reference copy button and direct pre-filled WhatsApp link to Sudhakar.
- **Live Repair Tracking (Public & Authenticated)**:
  - Masked public tracking (protects customer phone and private data against enumeration).
  - Full authenticated history for customers.
  - Multi-step status timeline (`Request Received` → `Device Assessment` → `Awaiting Approval` → `Repair in Progress` → `Testing` → `Ready for Collection` → `Completed`).
  - Real-time customer-visible notes and activity logs from Sudhakar.
- **Technician Administration Dashboard (Sudhakar)**:
  - Real database metrics (enquiry counts, active assessments, pending customer approvals).
  - Search and filter by reference code, customer name, phone, and status.
  - 1-click status updates and quotation editor.
  - Customer-visible updates log vs. private internal technician bench notes.
  - Direct call and WhatsApp action shortcuts to customers.
- **Customer Account Portal**:
  - Email/password authentication with profile management and ticket overview.
- **Centralized Business Configuration**:
  - All phone numbers (`+91 1029384756`), locations, and technician details are centralized in `src/config/business.ts` so updating them propagates across the entire site instantly.
- **Local SEO & Schema.org Structured Data**:
  - Semantic HTML5 with `LocalBusiness` (`ComputerRepairService`), `WebSite`, and `FAQPage` JSON-LD schemas targeting SR Nagar, Ameerpet, Sanath Nagar, and Hyderabad.

---

## 2. Testing Credentials

You can test both the customer and admin experiences using the built-in top bar switcher or these credentials:

| Role | Email | Password | Access / Scope |
| :--- | :--- | :--- | :--- |
| **Technician / Admin (Sudhakar)** | `admin@sudhakarrepairs.in` | `admin123` | Full admin workbench: status updates, private bench notes, quotation adjustments |
| **Customer (Rahul Sharma)** | `rahul.sharma@example.com` | `password123` | Customer portal with active laptop ticket in `Device Assessment` |
| **Customer (Priya Reddy)** | `priya.reddy@example.com` | `password123` | Customer portal with `Completed` NVMe SSD upgrade ticket |
| **New Customer Registration** | Any valid email | Minimum 6 chars | Automatically registered with customer permissions |

---

## 3. Pre-Launch Verification Checklist (4 Items for Sudhakar)

Before commercial marketing or public distribution, verify these four items with Sudhakar:

1. **Official Business Name**: Confirm whether the official brand should remain *"Sudhakar Computer & Laptop Repairs"* or be updated to *"Sudhakar Laptop Care"*.
2. **Phone Number**: Replace the temporary contact number (`+91 1029384756`) with Sudhakar's official mobile and WhatsApp number in `src/config/business.ts`.
3. **Exact Drop-off Landmark**: Add the precise shop door number or landmark near SR Nagar so Google Maps directions can be embedded.
4. **Service & Diagnostic Pricing**: Confirm standard turnaround times, initial diagnostic check fees, and whether home pickup is offered.

---

## 4. Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Type check & lint
npm run lint

# 4. Production build
npm run build
```
