/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { BackToTop } from './components/common/BackToTop';
import { ToastProvider } from './components/common/Toast';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { captureUTMParameters } from './utils/utm';
import { analytics } from './utils/analytics';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { RequestQuotePage } from './pages/RequestQuotePage';
import { ServicesPage } from './pages/ServicesPage';
import { SupportTicketPage } from './pages/SupportTicketPage';
import { FAQPage } from './pages/FAQPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ServerErrorPage } from './pages/ServerErrorPage';

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
      <ToastProvider>
        <BrowserRouter>
          <RouteObserver />
          <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#0f172a] pt-[116px] sm:pt-[120px]">
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
                <Route path="/500" element={<ServerErrorPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <SiteFooter />
            <BackToTop />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
}
