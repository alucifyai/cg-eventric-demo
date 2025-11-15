# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Eventric Demo is a full-stack tour management application built with React + Express. It's a wizard-based interface for creating and managing concert tours, including venue selection, rider validation, and tour review. The application uses the Fusion Starter template architecture.

## Commands

### Development
```bash
pnpm dev              # Start development server (http://localhost:8080) with HMR for both client and server
pnpm typecheck        # Run TypeScript type checking across the entire codebase
pnpm test             # Run all Vitest tests
```

### Building
```bash
pnpm build            # Build both client and server for production
pnpm build:client     # Build only the client SPA (outputs to dist/spa/)
pnpm build:server     # Build only the server (outputs to dist/server/)
pnpm start            # Run the production server (requires prior build)
```

### Code Quality
```bash
pnpm format.fix       # Format all files with Prettier
```

## Architecture

### Directory Structure

The codebase follows a monorepo-style structure with separate client, server, and shared code:

- **`client/`** - React SPA frontend
  - `pages/` - Route components (Index, SelectVenues, RiderValidation, TourReview, NotFound)
  - `components/` - Reusable React components (Header, WizardSteps, Calendar, VenueList, RiderSidebar)
  - `components/ui/` - Radix UI component library (50+ pre-built components)
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions (includes `cn()` for class merging)
  - `App.tsx` - Application entry point with React Router setup
  - `global.css` - TailwindCSS theme configuration and global styles

- **`server/`** - Express backend
  - `index.ts` - Server setup, middleware, and route registration
  - `routes/` - API endpoint handlers (demo.ts)
  - `node-build.ts` - Production server entry point

- **`shared/`** - Code shared between client and server
  - `api.ts` - Shared TypeScript interfaces for API contracts

- **`src/`** - Additional shared components and utilities
  - `components/` - Shared component library
  - `utils/` - Shared utility functions

### Key Architectural Patterns

**1. Dual Build System**
- Client build: Vite builds React SPA to `dist/spa/`
- Server build: Vite builds Express server to `dist/server/`
- Development: Single Vite dev server on port 8080 integrates Express via custom plugin (see `expressPlugin()` in vite.config.ts)

**2. Path Aliases**
- `@/*` → `./client/*` (client code)
- `@shared/*` → `./shared/*` (shared types/utilities)

These are configured in both `tsconfig.json` and vite configs.

**3. Type-Safe API Communication**
Define shared interfaces in `shared/api.ts` and import them in both client and server for end-to-end type safety.

**4. Routing**
- Uses React Router 6 in SPA mode
- Routes defined in `client/App.tsx`
- Page components in `client/pages/`
- Always add custom routes ABOVE the catch-all `*` route

**5. Styling System**
- Primary: TailwindCSS 3 utility classes
- Theme configuration: `client/global.css` and `tailwind.config.ts`
- Component library: Radix UI primitives in `client/components/ui/`
- Class merging: Use `cn()` utility from `client/lib/utils.ts` (combines clsx + tailwind-merge)

**6. Development vs Production**
- **Development**: Vite dev server (port 8080) with integrated Express middleware
- **Production**: Standalone Node server running the built Express app, serving static files from `dist/spa/`
- **Deployment options**:
  - Standard Node server
  - Netlify Functions (configured in `netlify.toml`)
  - Binary executables via pkg

## Application Flow

This is a wizard-based tour management system with the following flow:
1. **Index** (`/`) - Create new tour: enter tour name, dates, upload rider document
2. **SelectVenues** (`/select-venues`) - Select venues from a list, view on calendar
3. **RiderValidation** (`/rider-validation`) - Validate rider requirements against venues
4. **TourReview** (`/tour-review`) - Final review and confirmation

## Working with the Codebase

### Adding API Endpoints

1. Create interface in `shared/api.ts` (optional but recommended)
2. Create handler in `server/routes/[name].ts`
3. Register route in `server/index.ts` using `/api/` prefix
4. Call from client with type safety

**Important**: Only create server endpoints when strictly necessary (e.g., handling secrets, database operations). Prefer client-side logic when possible.

### Adding Pages

1. Create component in `client/pages/MyPage.tsx`
2. Import and add route in `client/App.tsx` ABOVE the catch-all `*` route
3. Use React Router's `useNavigate()` hook for navigation

### Working with UI Components

- Pre-built Radix UI components are in `client/components/ui/`
- Always use the `cn()` utility for conditional classes
- Theme tokens are defined in `client/global.css`
- Custom components go in `client/components/`

### Testing

- Tests are written with Vitest
- Test files use `.spec.ts` or `.test.ts` extension
- Example: `client/lib/utils.spec.ts`

## Environment Variables

Environment variables are managed via `.env` file:
- `VITE_PUBLIC_BUILDER_KEY` - Builder.io API key (client-side)
- `PING_MESSAGE` - Example server-side env var

Client-side variables must be prefixed with `VITE_PUBLIC_`.

## TypeScript Configuration

- **Strict mode disabled**: The project has `strict: false` and related flags disabled
- **Module resolution**: Uses "bundler" mode
- **Target**: ES2020 with DOM libraries
- **JSX**: React JSX transform

## Package Manager

Always use **pnpm** (version 10.14.0+). The project is configured with pnpm as the package manager.
