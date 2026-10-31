/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import {
  SiteHeader,
  SiteFooter,
  BackToTop,
  ToastProvider,
  ErrorBoundary,
  OfflineDetector,
} from './components';
import { OfflineProvider } from './hooks';
import { captureUTMParameters, analytics } from './utils';

import {
  HomePage,
  CatalogPage,
  ProductDetailsPage,
  AboutPage,
  ContactPage,
  RequestQuotePage,
  ServicesPage,
  SupportTicketPage,
  FAQPage,
  PrivacyPolicyPage,
  TermsPage,
  NotFoundPage,
  ServerErrorPage,
  GatewayTimeoutPage,
  OfflinePage,
} from './pages';

function RouteObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    captureUTMParameters();
    analytics.trackPageView(pathname, document.title || 'MediEquip360');
  }, [pathname]);

  return null;
}

export default function App() {
  useEffect(() => {
    captureUTMParameters();
  }, []);

  return (
    <ErrorBoundary>
      <OfflineProvider>
        <ToastProvider>
          <BrowserRouter>
            <RouteObserver />
            <OfflineDetector>
              <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#0f3b6c] pt-[116px] sm:pt-[120px]">
                <SiteHeader />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/product/:slug" element={<ProductDetailsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/request-quote" element={<RequestQuotePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/support-ticket" element={<SupportTicketPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms-of-use" element={<TermsPage />} />
                    <Route path="/offline" element={<OfflinePage />} />
                    <Route path="/500" element={<ServerErrorPage />} />
                    <Route path="/504" element={<GatewayTimeoutPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
                <SiteFooter />
                <BackToTop />
              </div>
            </OfflineDetector>
          </BrowserRouter>
        </ToastProvider>
      </OfflineProvider>
    </ErrorBoundary>
  );
}
