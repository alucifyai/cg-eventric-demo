# Source Tree Analysis

## Project Root Structure

```
eventric_demo/
├── client/                         # Part 1: Web Frontend (React SPA)
│   ├── components/                 # Reusable UI components
│   │   ├── Calendar.tsx            # Tour date calendar widget
│   │   ├── Header.tsx              # Global application header
│   │   ├── RiderSidebar.tsx        # Rider validation sidebar
│   │   ├── VenueList.tsx           # Venue selection list
│   │   ├── WizardSteps.tsx         # Multi-step wizard progress indicator
│   │   └── ui/                     # Radix UI-based design system (48 components)
│   │       ├── button.tsx          # Button primitive with variants
│   │       ├── card.tsx            # Card container component
│   │       ├── dialog.tsx          # Modal dialog primitive
│   │       ├── form.tsx            # Form wrapper with React Hook Form
│   │       ├── input.tsx           # Text input primitive
│   │       ├── select.tsx          # Dropdown select primitive
│   │       ├── toast.tsx           # Toast notification system
│   │       └── [43 more UI primitives]
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── use-mobile.tsx          # Mobile viewport detection
│   │   └── use-toast.ts            # Toast notification management
│   │
│   ├── lib/                        # Client utilities
│   │   ├── utils.ts                # Helper functions (cn() class merger)
│   │   └── utils.spec.ts           # Unit tests for utilities
│   │
│   ├── pages/                      # Route-based page components
│   │   ├── Index.tsx               # Home: Create new tour (Step 1)
│   │   ├── SelectVenues.tsx        # Venue selection (Step 2)
│   │   ├── RiderValidation.tsx     # Rider validation (Step 3)
│   │   ├── TourReview.tsx          # Tour review and finalization (Step 4)
│   │   └── NotFound.tsx            # 404 error page
│   │
│   ├── App.tsx                     # ⚡ Entry point: Router + Providers
│   ├── global.css                  # TailwindCSS theme and global styles
│   └── vite-env.d.ts               # Vite environment type definitions
│
├── server/                         # Part 2: Backend API (Express)
│   ├── routes/                     # API endpoint handlers
│   │   └── demo.ts                 # Example demo endpoint handler
│   │
│   ├── index.ts                    # ⚡ Server factory: Express setup + middleware
│   └── node-build.ts               # ⚡ Production entry: Server bootstrap
│
├── shared/                         # Shared TypeScript types
│   └── api.ts                      # API contracts (DemoResponse interface)
│
├── src/                            # Additional shared resources
│   ├── components/                 # Shared component library
│   └── utils/                      # Shared utilities
│
├── public/                         # Static assets
│   └── [images, icons, etc.]
│
├── docs/                           # Generated documentation (this directory)
│   ├── index.md                    # Master index (primary entry point)
│   ├── project-structure.md        # Project organization overview
│   ├── technology-stack.md         # Complete tech stack catalog
│   ├── architecture-patterns.md    # Design patterns and architecture
│   ├── api-contracts-server.md     # Server API endpoint documentation
│   ├── api-contracts-client.md     # Client API integration guide
│   ├── ui-component-inventory-client.md  # UI component catalog
│   ├── state-management-client.md  # State management strategies
│   └── source-tree-analysis.md     # This file
│
├── .claude/                        # Claude Code AI assistant configuration
│   ├── agents/                     # BMAD workflow agent definitions
│   └── commands/                   # Custom slash commands
│
├── bmad/                           # BMAD workflow system (separate module)
│   └── .bmad/                      # BMAD core and BMM workflows
│
├── netlify/                        # Netlify deployment configuration
│   └── functions/                  # Serverless functions
│       └── api.ts                  # Serverless Express wrapper
│
├── node_modules/                   # npm dependencies (excluded from docs)
├── dist/                           # Build output (excluded from docs)
│   ├── spa/                        # Client production build
│   └── server/                     # Server production build
│
├── Configuration Files (Root)
│   ├── package.json                # ⚡ Project dependencies and scripts
│   ├── tsconfig.json               # ⚡ TypeScript configuration with path aliases
│   ├── vite.config.ts              # ⚡ Client build configuration
│   ├── vite.config.server.ts       # ⚡ Server build configuration
│   ├── tailwind.config.ts          # TailwindCSS theme and plugins
│   ├── postcss.config.js           # PostCSS configuration
│   ├── components.json             # Radix UI component configuration
│   ├── netlify.toml                # Netlify deployment settings
│   ├── .env                        # Environment variables
│   ├── .gitignore                  # Git ignore rules
│   ├── .prettierrc                 # Prettier formatting config
│   ├── .dockerignore               # Docker ignore rules
│   └── .npmrc                      # npm configuration
│
└── Documentation Files (Root)
    ├── CLAUDE.md                   # Claude Code AI assistant guide
    └── AGENTS.md                   # Fusion Starter template documentation
```

Legend: ⚡ = Entry point or critical configuration file

---

## Critical Directories

### `/client/`
**Purpose:** React single-page application frontend
**Type:** Web application (project_type_id: "web")
**Entry Points:**
- `App.tsx` - Application root with routing and providers
- `pages/Index.tsx` - Home page (default route `/`)

**Key Subdirectories:**
- `components/` - Business logic components specific to tour management
- `components/ui/` - Reusable UI primitives (Radix-based)
- `pages/` - Route-level components (Index, SelectVenues, RiderValidation, TourReview)
- `hooks/` - Custom React hooks for reusable logic
- `lib/` - Utility functions and helpers

**Architecture Pattern:** Component-based SPA with route-based code splitting

---

### `/server/`
**Purpose:** Express REST API backend
**Type:** Backend API (project_type_id: "backend")
**Entry Points:**
- `index.ts` - Express server factory function (`createServer()`)
- `node-build.ts` - Production server bootstrap

**Key Subdirectories:**
- `routes/` - API endpoint handlers organized by resource

**Architecture Pattern:** Layered Express API with middleware pipeline

---

### `/shared/`
**Purpose:** Type-safe contracts between client and server
**Contents:** TypeScript interfaces for API requests/responses
**Key Files:**
- `api.ts` - Shared TypeScript interfaces (e.g., `DemoResponse`)

**Integration Point:** Imported by both `@/` (client) and server for type safety

---

### `/client/components/ui/`
**Purpose:** Design system primitives
**Component Count:** 48 Radix UI-based components
**Categories:**
- Layout: Card, Separator, Aspect Ratio, Resizable, Sidebar
- Navigation: Menubar, Navigation Menu, Breadcrumb, Pagination, Tabs
- Forms: Input, Textarea, Button, Checkbox, Radio, Select, Switch, Slider, Calendar
- Overlays: Dialog, Alert Dialog, Sheet, Drawer, Popover, Tooltip, Context Menu
- Feedback: Alert, Toast, Progress, Skeleton, Badge
- Data: Table, Chart, Avatar, Carousel, Scroll Area
- Interactive: Accordion, Collapsible, Toggle, Toggle Group

**Design System:** Custom TailwindCSS styling on Radix UI primitives

---

### `/client/pages/`
**Purpose:** Route-level components (containers)
**Routing:** React Router 6 SPA mode
**Pages:**
1. **Index.tsx** (`/`) - Tour creation wizard step 1
2. **SelectVenues.tsx** (`/select-venues`) - Venue selection step 2
3. **RiderValidation.tsx** (`/rider-validation`) - Rider validation step 3
4. **TourReview.tsx** (`/tour-review`) - Tour review and finalization step 4
5. **NotFound.tsx** (`*`) - 404 error page (catch-all route)

**Pattern:** Page components are containers that compose reusable components

---

### `/server/routes/`
**Purpose:** API endpoint handlers
**Pattern:** One file per resource or domain
**Current Routes:**
- `demo.ts` - Example demo endpoint (`GET /api/demo`)

**Registration:** Routes registered in `server/index.ts` via `app.get()`, `app.post()`, etc.

---

## Integration Points

### Client → Server Communication
```
Client (Browser)
    ↓
Fetch API calls to /api/*
    ↓
Express Server
    ↓
Route Handlers (server/routes/)
    ↓
Business Logic
    ↓
JSON Response
    ↓
Client (React Components)
```

**Type Safety:** Shared interfaces from `@shared/api` ensure compile-time type checking

### Development Mode Integration
```
Vite Dev Server (Port 8080)
    ├── Client HMR (Hot Module Replacement)
    └── Express Middleware (API routes)
```

**Implementation:** `vite.config.ts` → `expressPlugin()` integrates Express as middleware

---

## Entry Points Summary

### Development
```bash
pnpm dev
  ├── Vite Dev Server starts on http://localhost:8080
  ├── Client code served with HMR
  └── Express routes available at /api/*
```

### Production Build
```bash
pnpm build
  ├── pnpm build:client → dist/spa/
  └── pnpm build:server → dist/server/
```

### Production Execution
```bash
pnpm start
  └── node dist/server/node-build.mjs
      ├── Express server starts
      ├── Serves API at /api/*
      └── Serves static files from dist/spa/
```

---

## File Count Summary

| Directory | Files | Purpose |
|-----------|-------|---------|
| `client/pages/` | 5 | Route-level page components |
| `client/components/` | 5 | Application-specific components |
| `client/components/ui/` | 48 | Design system primitives |
| `client/hooks/` | 2 | Custom React hooks |
| `client/lib/` | 2 | Client utilities + tests |
| `server/routes/` | 1 | API endpoint handlers |
| `server/` (root) | 2 | Server setup and bootstrap |
| `shared/` | 1 | Shared TypeScript types |
| **Total Source Files** | **66** | Excluding config and docs |

---

## Path Aliases

TypeScript path mappings defined in `tsconfig.json`:

```typescript
"paths": {
  "@/*": ["./client/*"],           // Client code
  "@shared/*": ["./shared/*"]      // Shared types
}
```

**Usage Examples:**
```typescript
// Client imports
import { Button } from '@/components/ui/button';
import { useMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

// Shared imports (both client and server)
import { DemoResponse } from '@shared/api';
```

---

## Build Output Structure

### Production Build

```
dist/
├── spa/                    # Client build (static files)
│   ├── index.html          # Entry HTML
│   ├── assets/             # JS, CSS, images
│   │   ├── index-[hash].js
│   │   ├── index-[hash].css
│   │   └── [other chunks]
│   └── [static assets]
│
└── server/                 # Server build (Node.js module)
    ├── node-build.mjs      # Entry point
    └── [bundled dependencies]
```

---

## Ignored Directories

The following directories are excluded from version control and documentation:

- `node_modules/` - npm dependencies (managed by pnpm)
- `dist/` - Build artifacts (generated by Vite)
- `.git/` - Git version control data
- `build/` - Alternative build output
- `coverage/` - Test coverage reports

---

## Special Directories

### `.claude/`
**Purpose:** Claude Code AI assistant configuration
**Contents:**
- `agents/` - BMAD workflow agent definitions
- `commands/` - Custom slash commands for workflows

**Usage:** Configuration for AI-assisted development workflows

### `bmad/`
**Purpose:** BMAD (BMad Method) workflow system
**Status:** Separate module, not part of core application
**Contents:** Complete workflow system for product development

### `netlify/`
**Purpose:** Netlify serverless deployment
**Key File:** `functions/api.ts` wraps Express app for serverless execution
**Configuration:** `netlify.toml` defines build and redirect rules

---

## Navigation Guide

### For New Developers
1. Start with `CLAUDE.md` for project overview
2. Review `package.json` for available scripts
3. Explore `client/App.tsx` to understand application structure
4. Check `server/index.ts` to see API setup
5. Browse `client/components/ui/` for available UI components

### For Frontend Work
- Components: `client/components/`
- Pages: `client/pages/`
- Hooks: `client/hooks/`
- Utilities: `client/lib/`
- Styles: `client/global.css` + `tailwind.config.ts`

### For Backend Work
- Server setup: `server/index.ts`
- Routes: `server/routes/`
- Shared types: `shared/api.ts`

### For Full-Stack Features
1. Define types in `shared/api.ts`
2. Implement route in `server/routes/`
3. Register route in `server/index.ts`
4. Create API client hook in `client/hooks/`
5. Use in page/component

---

## Quick File Access

**Most Frequently Modified:**
- `client/pages/*.tsx` - Adding new pages
- `client/components/*.tsx` - Creating custom components
- `server/routes/*.ts` - Adding API endpoints
- `shared/api.ts` - Defining API contracts
- `tailwind.config.ts` - Customizing theme

**Configuration (Less Frequent):**
- `package.json` - Adding dependencies
- `tsconfig.json` - TypeScript settings
- `vite.config.ts` - Build configuration
- `.env` - Environment variables
