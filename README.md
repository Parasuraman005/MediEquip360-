# MediEquip360 – B2B Medical Equipment Procurement Platform

> **Smarter Medical Equipment. Better Healthcare.**

MediEquip360 is a modern, enterprise-grade B2B medical equipment procurement and product discovery platform built for hospitals, clinical laboratories, healthcare centers, and medical professionals. It streamlines discovering medical devices, requesting instant quotes, booking service support tickets, and tracking procurement campaigns with full SEO and UTM analytics support.

---

## 📚 Project Documentation

Detailed technical and architectural documentation is available in the [`/docs`](./docs) directory:

| Document | Description | Direct Link |
| :--- | :--- | :--- |
| **Technical Requirements Document** | Architecture, technology stack, security, hosting, & system specifications | [🔗 `./docs/technical-requirements-document.md`](./docs/technical-requirements-document.md) |
| **Product Requirements Document (PRD)** | Business goals, feature set, user personas, & functional specs | [🔗 `./docs/product-requirements-document.md`](./docs/product-requirements-document.md) |
| **Application Flow Document** | Route navigation hierarchy, user journeys, & state machine flows | [🔗 `./docs/app-flow.md`](./docs/app-flow.md) |
| **UI/UX Design Guidelines** | Design tokens, typography, component library, & accessibility rules | [🔗 `./docs/ui-ux-design-guidelines.md`](./docs/ui-ux-design-guidelines.md) |
| **Backend Data Schema** | Entity relationships, TypeScript models, & Firestore/SQL schemas | [🔗 `./docs/backend-schema.md`](./docs/backend-schema.md) |
| **Implementation Plan** | Engineering milestones, feature rollout, & optimization roadmap | [🔗 `./docs/implementation-plan.md`](./docs/implementation-plan.md) |

---

## 🌟 Key Features

- 🏥 **Comprehensive Product Catalog**: 40 clinical devices across 8 medical categories (Diagnostic Imaging, Patient Monitoring, Surgical Equipment, Respiratory Care, Laboratory Equipment, Hospital Furniture, Emergency Care, Rehabilitation Equipment).
- 🔍 **Real-Time Search & Filtering**: Instant search by device name, model, brand, condition, and category.
- 📋 **Request a Quote Engine**: Streamlined multi-step B2B quote request system with instant inline validation and duplicate prevention.
- 🛠️ **Customer Support Portal**: Support ticket submission system for maintenance, repairs, and product inquiries.
- 📍 **SEO, Sitemap & Robots Setup**: XML sitemap (`/sitemap.xml`) indexing 50 public routes with `robots.txt` crawler rules tailored for Netlify deployment.
- 🎯 **UTM Campaign Tracking**: Automated capture and retention of `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content` parameters across sessions.
- 🛡️ **Error Handling & Resilience**: React Error Boundary, custom 404 Not Found page, and 500 Server Error page with retry capabilities.
- 📱 **Fully Responsive UI**: Mobile-first design built with Tailwind CSS, supporting fixed navigation and smooth scroll-to-top controls.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 (SPA), TypeScript
- **Styling**: Tailwind CSS, Lucide React icons
- **Routing**: React Router v7
- **Build Tool & Dev Server**: Vite
- **Deployment & SEO**: Netlify ready (`public/_redirects`, `public/sitemap.xml`, `public/robots.txt`)

---

## 📁 Directory Structure

```text
MediEquip360/
├── docs/                                  # Complete Technical Documentation
│   ├── technical-requirements-document.md # Technical & Architecture Spec
│   ├── product-requirements-document.md   # PRD & Product Roadmap
│   ├── app-flow.md                        # User Journeys & Route Navigation
│   ├── ui-ux-design-guidelines.md         # UI Tokens & Design System
│   ├── backend-schema.md                  # Data Models & Schemas
│   └── implementation-plan.md             # Implementation Plan & Tasks
├── public/                                # Static Production Assets
│   ├── _redirects                         # Netlify SPA Rewrites
│   ├── sitemap.xml                        # Production XML Sitemap (50 URLs)
│   └── robots.txt                         # Search Engine Crawler Rules
├── src/
│   ├── components/                        # Reusable React UI Components (common, layout, products)
│   │   ├── common/                        # Toast, ErrorBoundary, BackToTop, Skeleton, OfflineDetector
│   │   ├── layout/                        # SiteHeader, SiteFooter
│   │   └── products/                      # ProductCard, ProductGrid, ProductFilters
│   ├── data/                              # Product Listings & Category Data (categories, products)
│   ├── hooks/                             # Custom React Hooks (useOffline, useSEO)
│   ├── pages/                             # Route Page Components by Domain
│   │   ├── company/                       # AboutPage, FAQPage, ServicesPage
│   │   ├── errors/                        # NotFoundPage, ServerErrorPage, GatewayTimeoutPage, OfflinePage
│   │   ├── home/                          # HomePage
│   │   ├── legal/                         # PrivacyPolicyPage, TermsPage
│   │   ├── products/                      # CatalogPage, ProductDetailsPage
│   │   └── support/                       # ContactPage, RequestQuotePage, SupportTicketPage
│   ├── types/                             # TypeScript Data Interfaces & Models
│   ├── utils/                             # Analytics, UTM Tracking Utilities
│   ├── App.tsx                            # Application Router & Layout Wrapper
│   ├── main.tsx                           # Vite Entrypoint
│   └── index.css                          # Tailwind CSS Configuration & Custom Scrollbars
├── index.html                             # HTML Shell with OpenGraph & Schema Metadata
├── package.json                           # Dependencies & Scripts
└── README.md                              # Project Overview & Documentation Links
```

---



## 🌐 Deployment (Netlify)

The project includes pre-configured root files for Netlify deployment:
- `public/_redirects`: Ensures single-page application routing (`/* /index.html 200`) works seamlessly without 404 errors on browser refresh.
- `public/sitemap.xml`: Accessible at `https://mediequip360.com/sitemap.xml`.
- `public/robots.txt`: Accessible at `https://mediequip360.com/robots.txt`.

---

## 📄 License

This project is licensed under the **MIT License** - see the full text below for details:

```text
MIT License

Copyright (c) 2026 Parasuraman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

**Developed by [Parasuraman](https://github.com/Parasuraman005)**

*Building technology-driven solutions for healthcare equipment procurement.*
