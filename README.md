# Barbershop SaaS

A multi-tenant SaaS application designed for barbershops to efficiently manage their daily operations, barbers, services, and clients, alongside a public-facing booking system for clients to schedule appointments.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS
- **Database & Backend:** Supabase (PostgreSQL, Auth, RLS)
- **Payments:** Stripe (Subscriptions)

## Project Structure

The project follows a modular architecture adhering to modern Next.js App Router best practices, strictly separating UI components, database logic, and utilities.

```text
.
├── public/                # Static assets (images, icons, etc.)
├── src/
│   ├── app/               # Next.js App Router (Pages, Layouts)
│   │   ├── (public)/      # Public facing pages (Landing, Pricing, Public booking page)
│   │   ├── (auth)/        # Authentication pages (Login, Register, Password Reset)
│   │   ├── (dashboard)/   # Tenant dashboard (Barbershop management interface)
│   │   └── api/           # API routes (e.g., Stripe webhooks, external integrations)
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # Basic UI building blocks (buttons, inputs, dialogs)
│   │   └── shared/        # Complex shared components used across features
│   ├── lib/               # Utility functions, shared constants, and configurations
│   │   └── supabase/      # Supabase client initialization (browser/server)
│   ├── types/             # TypeScript type definitions (Database models, application types)
│   └── actions/           # Next.js Server Actions (Database mutations and server logic)
├── supabase/
│   └── migrations/        # Database migration SQL files
└── README.md              # Project documentation
```

## Development Tasks Status

- [x] **Task 1:** Initialization, Database, and Documentation (PostgreSQL multi-tenant schema, RLS policies).
- [x] **Task 2:** Next.js Base Configuration and Supabase Connection (Env variables, Supabase Client/Server instances, Middleware).
- [x] **Task 3:** Authentication System (Login/Signup via Server Actions, UI with Tailwind, Protected Routes).
- [x] **Task 4:** Business Onboarding (Barbershop creation form, unique slug handling, dashboard view logic).
- [x] **Task 5:** Barbers & Services Management (Navigation Layout, create forms, listing tables, auto-revalidation).
- [x] **Task 6:** Public Booking Page (Dynamic route by slug, public RLS policies, Booking form & action).
- [x] **Task 7:** Appointments Management & Real Stats (Appointments table with joins, status updates, dynamic dashboard stats).
- [x] **Task 8:** Landing Page (SaaS marketing page, Hero section, Features, routing to Login).
- [x] **Task 9:** Manual Access Control (Subscription status handling, dashboard lock screen).
- [x] **Task 10:** Branding, Super Landing Page & Advanced Scheduling (Dynamic time slots, operating hours, manual time blocks).
- [x] **Task 11:** Premium UI Overhaul (Massive redesign with Dark Theme, Glassmorphism, Playfair fonts, and Card-based Booking UI).
- [x] **Task 12:** Full CRUD for Barbers and Services (Edit/Delete functionality with modals and active state).
