export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  condition: 'New' | 'Refurbished';
  description: string;
  price: number | null;
  currency: 'INR';
  image: string;
  specifications: Record<string, string>;
  availability: 'Demo Listing' | 'Contact for Information';
  isDemoData: true;
  dateAdded?: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  subject: string;
  message: string;
  productName?: string;
}

export interface QuoteRequestFormData {
  fullName: string;
  organizationName: string;
  businessEmail: string;
  contactNumber: string;
  equipmentCategory: string;
  manufacturerPreference: string;
  equipmentModel: string;
  conditionPreference: 'New' | 'Refurbished' | 'Any';
  quantity: number;
  deliveryLocation: string;
  additionalRequirements: string;
}
