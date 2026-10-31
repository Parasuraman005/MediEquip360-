# UI/UX Design Guidelines & Design System
## MediEquip360

---

## 1. Design Philosophy & Visual Identity
MediEquip360 is built on principles of clinical precision, trust, accessibility, and modern B2B clarity. The visual language uses clean whites, deep medical blues, slate grays, and high-contrast accent indicators to instill confidence among healthcare procurement professionals.

---

## 2. Color Palette
- **Primary Brand:** Deep Clinical Blue (`#0284c7` / Tailwind `sky-600` & `blue-700`)
- **Secondary Accent:** Teal Medical (`#0d9488` / Tailwind `teal-600`)
- **Background:** Crisp Light Neutral (`#f8fafc` / Tailwind `slate-50`)
- **Surface / Cards:** Pure White (`#ffffff`) with subtle border shadows (`border-slate-200`)
- **Text Primary:** Dark Slate (`#0f172a` / Tailwind `slate-900`)
- **Text Secondary:** Muted Slate (`#475569` / Tailwind `slate-600`)
- **Status Indicators:**
  - Success: Emerald (`#10b981`)
  - Warning: Amber (`#f59e0b`)
  - Error/Destructive: Rose (`#f43f5e`)

---

## 3. Typography
- **Font Family:** System Sans-Serif (`Inter`, `system-ui`, `-apple-system`, `sans-serif`)
- **Scale:**
  - H1 Display: 2.25rem (36px), Bold
  - H2 Section Header: 1.875rem (30px), Bold
  - H3 Card Title: 1.25rem (20px), Semi-bold
  - Body Text: 1rem (16px), Regular
  - Captions / Metadata: 0.875rem (14px), Medium

---

## 4. Component Design Standards
- **Buttons:** Generous touch targets (min 44px height on mobile), rounded corners (`rounded-lg`), clear hover states with smooth transitions.
- **Form Controls:** Clean borders, clear focus rings (`focus:ring-2 focus:ring-sky-500`), inline validation feedback.
- **Responsive Layouts:**
  - Desktop: Multi-column sidebars, split-screen support ticket page, persistent header.
  - Tablet & Mobile: Collapsible filter buttons, single-column stacked grids, touch-friendly navigation drawers.
- **Accessibility (a11y):** High color contrast ratios meeting WCAG AA standards, semantic HTML landmarks (`<header>`, `<main>`, `<footer>`), aria-labels on icon buttons.
