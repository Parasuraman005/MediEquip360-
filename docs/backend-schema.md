# Backend & Data Schema Specification
## MediEquip360

---

## 1. Data Architecture Overview
MediEquip360 operates as a client-side SPA with robust local persistence (`localStorage`) and structured mock data models mirroring enterprise database schemas.

---

## 2. Core Data Models (TypeScript Interfaces)

### A. Product Model (`src/types/product.ts`)
```typescript
export interface Product {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  price: number;
  condition: 'New' | 'Certified Refurbished' | 'Demo Unit';
  image: string;
  description: string;
  specifications: Record<string, string>;
  certifications: string[];
  inStock: boolean;
  warranty: string;
}
```

### B. Quote Request Model
```typescript
export interface QuoteItem {
  product: Product;
  quantity: number;
}

export interface QuoteRequest {
  id: string;
  items: QuoteItem[];
  hospitalName: string;
  department: string;
  contactName: string;
  email: string;
  phone: string;
  purchaseOrderNumber?: string;
  notes?: string;
  createdAt: string;
  status: 'Pending' | 'Reviewing' | 'Approved' | 'Fulfilled';
}
```

### C. Support Ticket Model
```typescript
export interface SupportTicket {
  id: string;
  subject: string;
  category: 'Technical Support' | 'Maintenance' | 'Calibration' | 'Warranty Claim' | 'General Inquiry';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  equipmentSerial?: string;
  description: string;
  contactEmail: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
}
```

---

## 3. Local Storage Persistence Keys
- `mediequip_quote_cart`: Stores current items in the quote cart.
- `mediequip_compare_list`: Stores product IDs selected for side-by-side comparison.
- `mediequip_support_tickets`: Stores user-submitted support tickets.
- `mediequip_analytics_events`: Logs user conversion actions and UTM parameters.
