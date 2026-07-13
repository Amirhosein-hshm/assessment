# User Management Dashboard

A production-quality, **Feature-Sliced Design (FSD v2.1)** compliant single-page application for browsing, searching, sorting, and viewing user profiles — built as a reference architecture demo.

**Next.js 15** · **React 19** · **Tailwind CSS v4** · **TypeScript**

---

## Features

- **User Listing** — Fetches and displays 10 users from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users)
- **Search** — Client-side filtering by name and/or email with 400ms debounce
- **Sorting** — Sort by name or email in ascending/descending order
- **Virtualized Table** — Smooth scrolling via `@tanstack/react-virtual` (10-row overscan, 52px rows)
- **Loading Skeletons** — Matching placeholder rows eliminate Cumulative Layout Shift (CLS)
- **Micro-interactions** — Clickable rows with `active:scale-[0.98]` feedback
- **Tooltips** — Truncated cells reveal full content on hover
- **User Detail Modal** — shadcn Dialog with backdrop blur showing complete profile (contact, address, company)
- **URL State Sync** — Search query and sort preferences persisted in URL search params (shareable/bookmarkable)
- **Error & Empty States** — Dedicated fallback components for all data states
- **Responsive** — Fully functional down to 375px viewport width
- **Dark Mode** — Built-in dark theme support

---

## Tech Stack

| Category           | Technology                                                       |
| ------------------ | ---------------------------------------------------------------- |
| **Framework**      | [Next.js 15](https://nextjs.org/) (App Router)                   |
| **UI Library**     | [React 19](https://react.dev/)                                   |
| **Language**       | [TypeScript](https://www.typescriptlang.org/) (Strict Mode)      |
| **Styling**        | [Tailwind CSS v4](https://tailwindcss.com/)                      |
| **UI Primitives**  | [shadcn/ui](https://ui.shadcn.com/) (Base UI, `base-nova` style) |
| **Server State**   | [TanStack Query v5](https://tanstack.com/query/latest)           |
| **Virtualization** | [TanStack Virtual v3](https://tanstack.com/virtual/latest)       |
| **Icons**          | [Lucide React](https://lucide.dev/)                              |
| **Fonts**          | Fira Code (headings) · Fira Sans (body) via `next/font/google`   |

---

## Architecture

This project strictly follows **Feature-Sliced Design (FSD) v2.1** with three layers:

```
src/
├── app/          # Next.js routing, providers, global styles
├── views/        # Business logic & page compositions (the "pages" layer)
│   └── users/    #   Each slice has model/ + ui/ + public index.ts
└── shared/       # Pure infrastructure: API client, UI primitives, utilities
```

**Key rules enforced:**

- Strict downward-only imports (`app → views → shared`)
- No upward or cross-slice imports
- Every slice exposes a public API via `index.ts`
- Domain-based naming — no global `types/` or `hooks/` folders

---

## Project Structure

```
src/
├── app/
│   ├── globals.css                # Tailwind v4 theme (emerald/amber palette)
│   ├── layout.tsx                 # Root layout with fonts & providers
│   ├── page.tsx                   # Redirects to /users
│   ├── providers/
│   │   ├── query-provider.tsx     # TanStack Query provider (5min staleTime)
│   │   └── wdyr.ts                # Why Did You Render? (dev only)
│   └── users/
│       └── page.tsx               # Route page — wraps UsersPage in Suspense
├── shared/
│   ├── api/
│   │   └── api-client.ts          # Generic fetch wrapper for JSONPlaceholder
│   ├── lib/
│   │   ├── hooks/
│   │   │   └── use-debounce.ts    # Generic debounce hook
│   │   └── utils.ts               # cn() utility (clsx + tailwind-merge)
│   └── ui/                        # Pure shadcn/ui components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── skeleton.tsx
│       ├── table.tsx
│       └── tooltip.tsx
└── views/
    └── users/
        ├── index.ts               # Public API — exports UsersPage
        ├── model/
        │   ├── user.ts            # TypeScript interfaces
        │   ├── use-users.ts       # TanStack Query hook
        │   └── use-url-params.ts  # URL search params sync hook
        └── ui/
            ├── users-page.tsx     # Page orchestrator
            ├── users-search.tsx   # Search inputs + sort controls
            ├── users-table.tsx    # Virtualized table with skeletons
            └── user-modal.tsx     # Full user profile dialog
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** or **pnpm**

### Installation

```bash
git clone https://github.com/your-username/user-management.git
cd user-management
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

```bash
npm run build
npm start
```

### Type Check

```bash
npm run typecheck
```

### Lint

```bash
npm run lint
```

---

## Available Scripts

| Script      | Command        | Description                   |
| ----------- | -------------- | ----------------------------- |
| `dev`       | `next dev`     | Start development server      |
| `build`     | `next build`   | Production build              |
| `start`     | `next start`   | Start production server       |
| `lint`      | `next lint`    | Run ESLint                    |
| `typecheck` | `tsc --noEmit` | Run TypeScript compiler check |

---

## Design System

The full design token specification is available in [`design-system/usermanagement/MASTER.md`](./design-system/usermanagement/MASTER.md).

| Token               | Value                             |
| ------------------- | --------------------------------- |
| **Primary**         | `#059669` (Emerald)               |
| **Accent**          | `#D97706` (Amber)                 |
| **Background**      | `#ECFDF5`                         |
| **Font (Headings)** | Fira Code                         |
| **Font (Body)**     | Fira Sans                         |
| **Style**           | Flat Design, minimal, bold colors |

---

## License

This project is private and intended for demonstration purposes.
