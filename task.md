# 📋 Project Implementation Tasks (FSD v2.1 Blueprint)

Follow this step-by-step roadmap strictly. Do NOT skip any step. Update this file by checking the boxes `[x]` as soon as a task or a sub-task is successfully completed.

---

## 🏗️ Phase 1: Infrastructure & App Setup (Shared & App Layers)

Before building features, ensure the core foundation is ready.

- [ ] **Task 1: Shared Utilities & Base API Client**
  - [ ] Implement `src/shared/lib/utils.ts` (Tailwind merge utility `cn`).
  - [ ] Implement `src/shared/api/api-client.ts` with base URL configured for JSONPlaceholder.
- [ ] **Task 2: App Shell & Global Providers**
  - [ ] Create `src/app/providers/query-provider.tsx` to initialize TanStack Query Client.
  - [ ] Wrap `src/app/layout.tsx` with the `QueryProvider`.
  - [ ] Ensure root `page.tsx` properly routes or redirects to the `/users` endpoint.

---

## 🧠 Phase 2: Domain Logic & State Architecture (Pages/Users/Model)

Establish the data contract, data fetching hooks, and state syncing before touching any UI component.

- [ ] **Task 3: Domain Types Definition**
  - [ ] Create `src/pages/users/model/user.ts` containing the exact TypeScript interfaces mapped to the API schema. Ensure strict mode (no `any`).
- [ ] **Task 4: TanStack Query Data Fetch Hook**
  - [ ] Create `src/pages/users/model/use-users.ts` to fetch and cache user data.
- [ ] **Task 5: URL State Synchronization Hook**
  - [ ] Create `src/pages/users/model/use-url-params.ts` to read, manage, and push global search/sort criteria directly to Next.js URL `searchParams`. Ensure stable debouncing.

---

## 🎨 Phase 3: Component Engineering & Elite UI/UX (Pages/Users/Ui)

Build localized UI segments applying Micro-interactions and CLS Prevention.

- [ ] **Task 6: Search, Filters & Sorting Controls**
  - [ ] Build `src/pages/users/ui/users-search.tsx`. Wire up text inputs and sort selectors with `use-url-params.ts`.
- [ ] **Task 7: Virtualized Data Table**
  - [ ] Build `src/pages/users/ui/users-table.tsx` merging shadcn `<Table />` tokens and `@tanstack/react-virtual`.
  - [ ] **UI/UX Maxim:** Implement a matching Skeleton loading state that perfectly matches row height to completely prevent Cumulative Layout Shift (CLS).
  - [ ] **UI/UX Maxim:** Apply micro-interactions (`active:scale-[0.98] transition-all`) to clickable table rows. Add tooltips for truncated texts (e.g., long emails).
- [ ] **Task 8: User Detail Dialog**
  - [ ] Build `src/pages/users/ui/user-modal.tsx` using shadcn `<Dialog />` to show complete, nested user objects on row selection.
  - [ ] **UI/UX Maxim:** Add elegant backdrop blur effects (`backdrop-blur-sm`).

---

## 🔗 Phase 4: Page Orchestration & Public API (Composition & Entry)

Connect all parts together at the page level and establish runtime boundaries.

- [ ] **Task 9: Page Level Orchestration**
  - [ ] Build `src/pages/users/ui/users-page.tsx` as the main client view. Synthesize the loading, error, empty, and data-ready states smoothly.
- [ ] **Task 10: Public API Configuration**
  - [ ] Create `src/pages/users/index.ts` to serve as the unified public gateway. Export `<UsersPage />` and close external direct file access.
- [ ] **Task 11: Route Gateway Wiring**
  - [ ] Edit `src/app/users/page.tsx` to act as a lightweight server component wrapper that only imports and returns `<UsersPage />` via the Public API.

---

## 🎯 Phase 5: Pre-Delivery Checklist

- [ ] No upward or cross-layer import violations.
- [ ] 100% Type-safe with zero TypeScript errors.
- [ ] Responsive UI verified down to 375px viewports.
