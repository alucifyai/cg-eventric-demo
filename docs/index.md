# Project Documentation Index

**Generated:** November 15, 2025
**Scan Level:** Deep (critical files read)
**Documentation Version:** 1.0.0

---

## Project Overview

### Eventric Demo - Tour Management Application

**Type:** Multi-Part (Integrated Client/Server)
**Primary Language:** TypeScript
**Architecture:** Full-stack web application with React SPA frontend and Express API backend

This project is a wizard-based tour management system for creating, planning, and validating concert tours. It features venue selection, rider document processing, and tour review workflows.

### Project Structure

- **Repository Type:** Multi-part with 2 distinct components
- **Part 1:** Client (Web Frontend) - React 18 + Vite
- **Part 2:** Server (Backend API) - Express 5 + Node.js
- **Shared:** TypeScript types for end-to-end type safety

---

## Quick Reference

### Client (Web Frontend)
- **Type:** Web Application (SPA)
- **Tech Stack:** React 18 + TypeScript + Vite + TailwindCSS + Radix UI
- **Root:** `client/`
- **Entry Point:** `client/App.tsx`
- **Architecture Pattern:** Component-based SPA with route-based code splitting

### Server (Backend API)
- **Type:** Backend API
- **Tech Stack:** Express 5 + TypeScript + Node.js
- **Root:** `server/`
- **Entry Point:** `server/index.ts`
- **Architecture Pattern:** Layered Express API with middleware pipeline

### Integration
- **Communication:** REST API over HTTP
- **Type Safety:** Shared TypeScript interfaces in `/shared/`
- **Development:** Single port (8080) with integrated dev server
- **Production:** Server serves both API and static files

---

## Generated Documentation

### Core Documentation

#### [Project Structure](./project-structure.md)
Complete overview of repository organization, directory layout, and project parts.

#### [Technology Stack](./technology-stack.md)
Comprehensive catalog of all technologies, frameworks, and libraries used across client and server.

#### [Architecture Patterns](./architecture-patterns.md)
Design patterns, architectural decisions, and implementation strategies for both frontend and backend.

#### [Source Tree Analysis](./source-tree-analysis.md)
Annotated directory tree with explanations of critical folders, entry points, and file organization.

#### [Development Guide](./development-guide.md)
Complete developer onboarding guide with setup instructions, common tasks, and development workflow.

### Client Documentation

#### [UI Component Inventory - Client](./ui-component-inventory-client.md)
Catalog of 53 UI components including 5 application components and 48 Radix UI-based design system primitives.

#### [State Management - Client](./state-management-client.md)
Multi-tiered state management strategy covering server state (TanStack Query), local state (React hooks), form state (React Hook Form), and global UI state (Context).

#### [API Contracts - Client](./api-contracts-client.md)
Client-side API integration guide including type-safe patterns, TanStack Query usage, and recommended implementation strategies.

### Server Documentation

#### [API Contracts - Server](./api-contracts-server.md)
Complete server API endpoint documentation including request/response schemas, authentication, validation, and expansion guide.

### Supporting Documentation

#### [Existing Documentation Inventory](./existing-documentation-inventory.md)
Catalog of pre-existing documentation files (CLAUDE.md, AGENTS.md) and identified documentation gaps.

#### [Project Parts Metadata](./project-parts-metadata.json)
Machine-readable JSON metadata about project structure, parts, and integration points.

---

## Existing Documentation

### CLAUDE.md
**Location:** `/CLAUDE.md`
**Purpose:** Claude Code AI assistant guidance document
**Size:** 5.6 KB
**Content:** Commands, architecture overview, working with the codebase, TypeScript configuration, package manager requirements.

### AGENTS.md
**Location:** `/AGENTS.md`
**Purpose:** Fusion Starter template documentation
**Size:** 4.9 KB
**Content:** Tech stack overview, project structure, key features, SPA routing, styling system, Express server integration, development commands.

---

## Getting Started

### For New Developers

1. **Prerequisites:** Install Node.js 22+, pnpm 10.14.0+
2. **Setup:**
   ```bash
   pnpm install
   cp .env.example .env  # Configure environment
   ```
3. **Start Development:**
   ```bash
   pnpm dev  # Starts on http://localhost:8080
   ```
4. **Read Documentation:**
   - [Development Guide](./development-guide.md) - Onboarding and common tasks
   - [Technology Stack](./technology-stack.md) - Understanding the tech choices
   - [Architecture Patterns](./architecture-patterns.md) - Design patterns used

### For Frontend Development

**Key Files:**
- Components: `client/components/` and `client/components/ui/`
- Pages: `client/pages/` (Index, SelectVenues, RiderValidation, TourReview)
- Styling: `client/global.css` + `tailwind.config.ts`
- State: TanStack Query for server state, React Hook Form for forms

**Resources:**
- [UI Component Inventory](./ui-component-inventory-client.md)
- [State Management](./state-management-client.md)
- [API Contracts - Client](./api-contracts-client.md)

### For Backend Development

**Key Files:**
- Server Setup: `server/index.ts`
- Route Handlers: `server/routes/`
- Shared Types: `shared/api.ts`

**Resources:**
- [API Contracts - Server](./api-contracts-server.md)
- [Architecture Patterns](./architecture-patterns.md)

### For Full-Stack Features

**Workflow:**
1. Define types in `shared/api.ts`
2. Implement server endpoint in `server/routes/`
3. Register route in `server/index.ts`
4. Create client API hook with TanStack Query
5. Use in React component

**Resources:**
- [API Contracts - Server](./api-contracts-server.md)
- [API Contracts - Client](./api-contracts-client.md)
- [State Management](./state-management-client.md)

---

## Development Commands

### Essential Commands

```bash
pnpm dev              # Start development server (port 8080)
pnpm build            # Build both client and server for production
pnpm start            # Run production server
pnpm test             # Run tests with Vitest
pnpm typecheck        # TypeScript type checking
pnpm format.fix       # Format code with Prettier
```

### Detailed Usage

See [Development Guide](./development-guide.md) for complete command reference and usage examples.

---

## Architecture Highlights

### Multi-Part Integration

```
┌─────────────────────────────────────────────┐
│           Browser (Client)                   │
│                                               │
│  React SPA (client/)                         │
│  ├── Components                              │
│  ├── Pages (Wizard Steps)                   │
│  └── State (TanStack Query)                 │
│                                               │
│         ↓ HTTP /api/* ↓                      │
└─────────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────────┐
│         Express Server (server/)             │
│                                               │
│  ├── Middleware (CORS, JSON)                │
│  ├── Routes (/api/ping, /api/demo)          │
│  └── Static Files (dist/spa/)               │
└─────────────────────────────────────────────┘
```

### Development vs Production

**Development:**
- Single Vite dev server on port 8080
- Express integrated as middleware
- Hot Module Replacement for both client and server
- No CORS issues (same origin)

**Production:**
- Express server serves everything
- API endpoints at `/api/*`
- Static client files from `dist/spa/`
- Optimized and minified builds

---

## Technology Summary

### Frontend Stack
- **UI:** React 18, Radix UI (48 components), TailwindCSS 3
- **Routing:** React Router 6 (SPA mode)
- **State:** TanStack Query (server), React Hook Form (forms)
- **Build:** Vite 7 with SWC compilation
- **Testing:** Vitest
- **Animation:** Framer Motion
- **Icons:** Lucide React

### Backend Stack
- **Framework:** Express 5
- **Runtime:** Node.js 22
- **Validation:** Zod
- **Middleware:** CORS, JSON parsing
- **Document Processing:** Mammoth (Word), XLSX (Excel)

### Shared
- **Language:** TypeScript 5.9.2
- **Module System:** ES Modules
- **Package Manager:** pnpm 10.14.0

---

## Application Flow

### Tour Management Wizard

1. **Step 1: Create Tour** (`/`)
   - Enter tour name
   - Select start/end dates
   - Upload rider document

2. **Step 2: Select Venues** (`/select-venues`)
   - Browse available venues
   - Search and filter venues
   - Select venues for tour

3. **Step 3: Rider Validation** (`/rider-validation`)
   - Review rider requirements
   - Validate against selected venues
   - Identify compatibility issues

4. **Step 4: Tour Review** (`/tour-review`)
   - Review complete tour details
   - Confirm selections
   - Finalize tour

---

## Key Features

### Type Safety
- End-to-end type safety with shared TypeScript interfaces
- Compile-time validation of API contracts
- IDE autocomplete for client-server communication

### Component Library
- 48 pre-built Radix UI components
- Accessible, WCAG-compliant primitives
- Custom styled with TailwindCSS
- Dark mode support

### State Management
- Efficient server state caching with TanStack Query
- Performant form handling with React Hook Form
- Zod schema validation
- Optimistic updates capability

### Developer Experience
- Hot Module Replacement for instant feedback
- TypeScript for type safety and IDE support
- Prettier for consistent code formatting
- Vitest for fast testing
- Single command to start development

---

## Project Statistics

- **Total Source Files:** 66+ (excluding config)
- **UI Components:** 53 (5 application + 48 primitives)
- **Pages:** 5 (including 404)
- **API Endpoints:** 2 (with expansion patterns documented)
- **Lines of Code:** ~15,000+ (estimated)

---

## Documentation Navigation

### By Role

**Product Manager / Stakeholder:**
- [Project Structure](./project-structure.md) - High-level overview
- [Architecture Patterns](./architecture-patterns.md) - System design
- [Existing Documentation Inventory](./existing-documentation-inventory.md) - What already exists

**Frontend Developer:**
- [UI Component Inventory](./ui-component-inventory-client.md) - Available components
- [State Management](./state-management-client.md) - How to manage state
- [API Contracts - Client](./api-contracts-client.md) - How to call APIs
- [Development Guide](./development-guide.md) - How to develop

**Backend Developer:**
- [API Contracts - Server](./api-contracts-server.md) - API endpoints
- [Technology Stack](./technology-stack.md) - Server dependencies
- [Development Guide](./development-guide.md) - How to develop

**DevOps / Deployment:**
- [Technology Stack](./technology-stack.md) - Runtime requirements
- [Development Guide](./development-guide.md) - Build and deployment
- [Architecture Patterns](./architecture-patterns.md) - Deployment patterns

### By Task

**Adding a New Feature:**
1. [Architecture Patterns](./architecture-patterns.md) - Understand patterns
2. [API Contracts - Server](./api-contracts-server.md) - Define API endpoint
3. [API Contracts - Client](./api-contracts-client.md) - Implement client integration
4. [Development Guide](./development-guide.md) - Development workflow

**Styling & UI Work:**
1. [UI Component Inventory](./ui-component-inventory-client.md) - Available components
2. [Technology Stack](./technology-stack.md) - TailwindCSS configuration
3. [Source Tree Analysis](./source-tree-analysis.md) - Where to find styles

**Understanding the Codebase:**
1. [Project Structure](./project-structure.md) - Organization overview
2. [Source Tree Analysis](./source-tree-analysis.md) - Detailed file tree
3. [Architecture Patterns](./architecture-patterns.md) - Design patterns
4. [Technology Stack](./technology-stack.md) - Technologies used

---

## Maintenance

### Updating Documentation

This documentation was generated via the BMAD document-project workflow. To regenerate:

```bash
# From Claude Code
/bmad:bmm:workflows:document-project
```

**When to Regenerate:**
- Major architectural changes
- Significant new features added
- Technology stack updates
- After brownfield documentation phase

### Documentation Source

All documentation files are located in `/docs/` directory and are version controlled with the codebase.

---

## Additional Resources

- **Repository Root:** `/Users/chrismacomber/Code/eventric_demo`
- **Package Manager:** pnpm (required)
- **Node Version:** 22+
- **Dev Server:** http://localhost:8080

---

## Quick Links

- [Project Structure](./project-structure.md)
- [Technology Stack](./technology-stack.md)
- [Architecture Patterns](./architecture-patterns.md)
- [Development Guide](./development-guide.md)
- [Source Tree Analysis](./source-tree-analysis.md)

---

**Last Updated:** November 15, 2025
**Workflow Version:** 1.2.0
**Scan Mode:** initial_scan (deep)
