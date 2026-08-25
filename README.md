# Eterna — Luxury Wedding & Event Planning Website

A modern, component-driven, production-ready website foundation built for **Eterna**, an internationally acclaimed luxury wedding and event planning agency.

---

## 🏛️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Typography:** Google Fonts (`Cormorant Garamond` serif & `Plus Jakarta Sans`)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Images:** Next.js Image Component
- **Code Quality:** ESLint & TypeScript strict type checking

---

## 📁 Project Structure

```text
eterna/
├── app/
│   ├── layout.tsx            # Global layout, fonts, metadata, Navbar & Footer
│   ├── page.tsx              # Home page composing modular preview sections
│   ├── globals.css           # Global Tailwind tokens & typography
│   ├── about/page.tsx        # About page route
│   ├── services/page.tsx     # Services showcase page route
│   ├── portfolio/page.tsx    # Portfolio gallery page route
│   └── contact/page.tsx      # Contact & enquiry page route (Frappe-ready)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Responsive sticky navbar with mobile drawer
│   │   └── Footer.tsx        # Luxury editorial footer
│   ├── common/
│   │   ├── Container.tsx     # Reusable responsive container
│   │   ├── SectionHeading.tsx# Reusable luxury section heading
│   │   ├── Button.tsx        # Reusable button with variants
│   │   └── SocialLinks.tsx   # Social icons
│   ├── home/
│   │   ├── Hero.tsx          # Hero section
│   │   ├── AboutPreview.tsx  # About section preview
│   │   ├── ServicesPreview.tsx # Featured services preview
│   │   ├── PortfolioPreview.tsx# Featured projects preview
│   │   └── ContactCTA.tsx    # Luxury call-to-action banner
│   ├── portfolio/
│   │   └── PortfolioCard.tsx # Data-driven portfolio card
│   ├── services/
│   │   └── ServiceCard.tsx   # Data-driven service card
│   └── contact/
│       └── ContactForm.tsx   # Accessible enquiry form
│
├── data/
│   ├── navigation.ts         # Navigation items & social links
│   ├── services.ts           # Curated services data
│   ├── portfolio.ts          # Curated portfolio projects data
│   └── site.ts               # Site metadata & concierge contact info
│
├── types/
│   └── index.ts              # Domain TypeScript types
├── lib/
│   └── utils.ts              # cn helper utility (clsx + tailwind-merge)
└── public/
    └── images/               # High-res SVG & photo assets
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Quality & Build Checks
```bash
npm run lint
npx tsc --noEmit
npm run build
```

---

## 🔮 Future Frappe API Integration
The `ContactForm` component (`components/contact/ContactForm.tsx`) and data structures are designed to connect to a Frappe / ERPNext backend without altering presentation components.
