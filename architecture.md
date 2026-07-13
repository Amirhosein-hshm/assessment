Project Architecture Guidelines (FSD v2.1)

This project strictly follows Feature-Sliced Design (FSD) v2.1 architecture adapted for Next.js App Router. Follow this directory structure and rules strictly:

1.  Layer Structure

    src/app/ (App Layer): Only for Next.js routing, global providers (QueryProvider), and global styles. Keep files here extremely lightweight.

        Example: src/app/users/page.tsx should only import and render the actual page component from the pages layer.

    src/pages/users/ (Pages Layer): Contains the actual composition and logic of the Users Management page.

        ui/: Contains page-specific UI components (users-table.tsx, users-search.tsx, user-modal.tsx).

        model/: Page-specific state hooks, TanStack Query hooks (useUsers.ts), and URL sync logic.

    src/shared/ (Shared Layer): Pure infrastructure with NO business logic.

        ui/: Generic reusable UI elements (shadcn/ui components like Button, Input, Table, Dialog).

        api/: Base API client configuration (fetch/axios setup).

        lib/: Generic utilities (e.g., cn helper for Tailwind).

2.  Architectural Rules (Strict)

    Directional Imports: A layer can only import from layers strictly below it (app → pages → shared). Upward imports are strictly forbidden.

    Public API (index.ts): Every segment or slice must expose its public API through an index.ts file. External consumers must never reach into internal folders.

        Good: import { UsersPage } from "@/pages/users"

        Bad: import { UsersTable } from "@/pages/users/ui/users-table"

    Domain-Based Naming: Name files after the domain they represent, not technical roles. Do not create top-level types.ts or utils.ts. Keep them scoped (e.g., model/user.ts)
