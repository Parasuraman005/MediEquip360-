/**
 * Reusable Analytics & Conversion Tracking Service
 */

export interface AnalyticsEvent {
  eventName: string;
  category?: string;
  label?: string;
  value?: number;
  params?: Record<string, any>;
}

class AnalyticsService {
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window !== 'undefined') {
      this.isInitialized = true;
    }
  }

  public trackEvent(event: AnalyticsEvent) {
    if (!this.isInitialized) return;

    const payload = {
      event: event.eventName,
      category: event.category || 'General',
      label: event.label,
      value: event.value,
      timestamp: new Date().toISOString(),
      ...event.params,
    };

    // Log to console for demonstration / debugging
    console.log('[Analytics Event]:', payload);

    // Call window.gtag or window.dataLayer if present
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.eventName, payload);
    }
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push(payload);
    }
  }

  public trackPageView(path: string, title: string) {
    this.trackEvent({
      eventName: 'page_view',
      category: 'Navigation',
      label: title,
      params: { path },
    });
  }

  public trackHomepageCTA(ctaName: string) {
    this.trackEvent({
      eventName: 'homepage_cta_click',
      category: 'Conversion',
      label: ctaName,
    });
  }

  public trackProductView(productId: string, productName: string, category: string) {
    this.trackEvent({
      eventName: 'product_view',
      category: 'E-commerce',
      label: productName,
      params: { productId, productCategory: category },
    });
  }

  public trackProductInquiryClick(productName: string) {
    this.trackEvent({
      eventName: 'product_inquiry_click',
      category: 'Lead',
      label: productName,
    });
  }

  public trackContactFormSubmit(subject: string) {
    this.trackEvent({
      eventName: 'contact_form_submit',
      category: 'Lead',
      label: subject,
    });
  }

  public trackComplaintFormSubmit(complaintCategory: string) {
    this.trackEvent({
      eventName: 'complaint_form_submit',
      category: 'Support',
      label: complaintCategory,
    });
  }

  public trackQuoteRequestSubmit(productName: string, category: string) {
    this.trackEvent({
      eventName: 'quote_request_submit',
      category: 'Conversion',
      label: productName || category,
    });
  }
}

export const analytics = new AnalyticsService();
