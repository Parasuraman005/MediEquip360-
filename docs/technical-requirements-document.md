# Technical Requirements Document (TRD)
## MediEquip360 - B2B Medical Equipment Procurement Platform

---

## 1. Project Technical Overview
MediEquip360 is a modern, high-performance Single Page Application (SPA) designed for B2B medical equipment procurement, quotation management, equipment comparison, support ticketing, and hospital/clinic asset management. Built with robust client-side routing, responsive state management, and accessibility best practices, MediEquip360 delivers an enterprise-grade web experience for healthcare facilities, biomedical engineers, and hospital administrators.

---

## 2. Technology Stack

### Frontend Architecture
- **Framework:** React 19 (Functional Components, Custom Hooks)
- **Language:** TypeScript (Strict type checking via `tsc`)
- **Build Tool:** Vite 8.x with `@vitejs/plugin-react`
- **Routing:** React Router v7 (`react-router-dom`) for declarative client-side routing and dynamic parameter handling (`/product/:id`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) utilizing utility-first design principles, CSS variables, and responsive modifiers
- **Icons & Visuals:** `lucide-react` for scalable, clean UI iconography

### State Management & Persistence
- **State Management:** React Local State (`useState`, `useEffect`, `useMemo`, `useCallback`)
- **Persistence Layer:** Browser LocalStorage (`localStorage`) for cart persistence, quote cart items, comparison lists, saved user preferences, form drafts, and support tickets
- **Analytics & Tracking:** Custom event dispatcher hook capturing CTA clicks, product views, quote submissions, support requests, and UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`)

---

## 3. Libraries, Packages, and Dependencies

### Production Dependencies
- `react` (^19.0.1): Core React library
- `react-dom` (^19.0.1): React DOM renderer
- `react-router-dom` (^7.18.5): Declarative routing for React SPAs
- `lucide-react` (^0.546.0): Comprehensive icon library
- `@tailwindcss/vite` (^4.3.3) & `tailwindcss` (^4.3.3): Modern Tailwind CSS styling engine

### Development & Build Dependencies
- `typescript` (^7.0.2) & `@types/react`, `@types/react-dom`: Type safety and definitions
- `vite` (^8.3.0): Lightning-fast bundler and dev server
- `tsx` (^4.21.0): TypeScript execution engine

---

## 4. Third-Party Integrations & APIs (Client-Side & Mock Capabilities)
- **Simulated Backend Services:** Mock database of medical equipment (`src/data/products.ts`), categories (`src/data/categories.ts`), and FAQs.
- **Form Submissions:** Asynchronous simulated network latency with loading spinners, inline validation, and toast notification confirmations.
- **SEO & Social Cards:** Dynamic `<title>`, meta descriptions, and OpenGraph/Twitter card injection via custom hooks.
- **Sitemap & Robots.txt:** Static XML sitemap (`/sitemap.xml`) and search crawler directives (`/robots.txt`) configured for Netlify deployment.

---

## 5. Hosting, Deployment, and Infrastructure
- **Hosting Platform:** Netlify (Static SPA hosting with client-side routing fallback)
- **Build Command:** `npm run build` (outputs to `/dist`)
- **Dev Server Command:** `npm run dev` (runs on port 3000, host `0.0.0.0`)
- **SEO & Crawler Configuration:** `public/robots.txt` and `public/sitemap.xml` served directly from the domain root.

---

## 6. Security, Performance, and Compatibility Requirements
- **Security:** Input sanitization on quote and support forms, secure local storage access, CSP-compatible asset loading.
- **Performance:** Optimized bundle size through Vite code splitting, lazy-loaded page components, memoized catalog filters, and responsive image scaling.
- **Browser & Device Support:** Fully responsive design supporting Desktop (1024px+), Tablet (768px - 1023px), and Mobile (<768px) viewports across Chrome, Safari, Firefox, and Edge.
