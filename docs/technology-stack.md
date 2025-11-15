# Technology Stack

## Overview

This is a full-stack TypeScript application using modern tooling and frameworks across both client and server components.

## Shared Technologies

| Category | Technology | Version | Justification |
|----------|-----------|---------|---------------|
| Language | TypeScript | 5.9.2 | Type safety across full stack, improved developer experience |
| Module System | ES Modules | ESNext | Modern module system, tree-shaking support |
| Package Manager | pnpm | 10.14.0 | Fast, efficient, disk space optimized |
| Testing Framework | Vitest | 3.2.4 | Fast Vite-native test runner with TypeScript support |
| Code Formatting | Prettier | 3.6.2 | Consistent code style across team |
| TypeScript Target | ES2020 | - | Modern JavaScript features with broad browser support |
| Build Tool (Client) | Vite | 7.1.2 | Fast HMR, optimized builds, modern dev experience |
| Build Tool (Server) | Vite | 7.1.2 | Unified build system for both client and server |

### TypeScript Configuration
- **Target:** ES2020
- **Module Resolution:** Bundler mode
- **Strict Mode:** Disabled (relaxed type checking)
- **Path Aliases:**
  - `@/*` → `./client/*`
  - `@shared/*` → `./shared/*`
- **JSX:** React JSX transform

---

## Part 1: Client (Web Frontend)

### Core Framework

| Category | Technology | Version | Justification |
|----------|-----------|---------|---------------|
| UI Library | React | 18.3.1 | Component-based architecture, virtual DOM, large ecosystem |
| UI Framework | React DOM | 18.3.1 | React renderer for web applications |
| Routing | React Router DOM | 6.30.1 | SPA routing with modern API, code splitting support |
| Build Tool | Vite | 7.1.2 | Lightning-fast HMR, optimized production builds |
| Compiler | SWC | 1.13.3 | Fast TypeScript/JavaScript compilation |

### UI & Styling

| Category | Technology | Version | Justification |
|----------|-----------|---------|---------------|
| CSS Framework | TailwindCSS | 3.4.17 | Utility-first CSS, rapid UI development |
| CSS Processor | PostCSS | 8.5.6 | CSS transformations, autoprefixing |
| Component Library | Radix UI | Various | Accessible, unstyled primitives for building design systems |
| Animation | Framer Motion | 12.23.12 | Production-ready animations for React |
| Icons | Lucide React | 0.539.0 | Beautiful, consistent icon set |
| Theme Management | next-themes | 0.4.6 | Dark mode and theme switching |
| Class Utilities | clsx + tailwind-merge | 2.1.1 + 2.6.0 | Conditional class names with Tailwind optimization |
| Class Variants | class-variance-authority | 0.7.1 | Type-safe component variants |

### Radix UI Components
- Accordion, Alert Dialog, Aspect Ratio, Avatar
- Checkbox, Collapsible, Context Menu, Dialog
- Dropdown Menu, Hover Card, Label, Menubar
- Navigation Menu, Popover, Progress, Radio Group
- Scroll Area, Select, Separator, Slider
- Slot, Switch, Tabs, Toast, Toggle, Toggle Group, Tooltip

### State Management & Data Fetching

| Category | Technology | Version | Justification |
|----------|-----------|---------|---------------|
| Server State | TanStack React Query | 5.84.2 | Powerful data synchronization, caching, background updates |
| Form Management | React Hook Form | 7.62.0 | Performant form validation with minimal re-renders |
| Form Validation | Zod + Hookform Resolvers | 3.25.76 + 5.2.1 | TypeScript-first schema validation |

### Additional UI Libraries

| Category | Technology | Version | Justification |
|----------|-----------|---------|---------------|
| 3D Graphics | Three.js + React Three Fiber | 0.176.0 + 8.18.0 | WebGL 3D rendering in React |
| 3D Helpers | @react-three/drei | 9.122.0 | Useful helpers for Three.js in React |
| Charts | Recharts | 2.12.7 | Composable charting library for React |
| Date Picker | React Day Picker + date-fns | 9.8.1 + 4.1.0 | Flexible date picker with date utilities |
| Carousel | Embla Carousel React | 8.6.0 | Lightweight carousel with touch support |
| Resizable Panels | react-resizable-panels | 3.0.4 | Resizable split view panels |
| Command Menu | cmdk | 1.1.1 | Fast, composable command menu |
| OTP Input | input-otp | 1.4.2 | One-time password input component |
| Drawer | vaul | 1.1.2 | Unstyled drawer component |
| Toast | Sonner | 1.7.4 | Opinionated toast component |

### Architecture Pattern
**Component-Based SPA with Route-Based Code Splitting**
- React component hierarchy
- Functional components with hooks
- Page-level components for routing
- Reusable UI component library (Radix UI)
- Utility-first styling with TailwindCSS
- Client-side routing with React Router

---

## Part 2: Server (Backend API)

### Core Framework

| Category | Technology | Version | Justification |
|----------|-----------|---------|---------------|
| Runtime | Node.js | 22+ | Server-side JavaScript execution |
| Framework | Express | 5.1.0 | Minimal, flexible web application framework |
| Module System | ES Modules | - | Modern import/export syntax |
| Environment | dotenv | 17.2.1 | Environment variable management |

### API & Middleware

| Category | Technology | Version | Justification |
|----------|-----------|---------|---------------|
| CORS | cors | 2.8.5 | Cross-origin resource sharing support |
| Validation | Zod | 3.25.76 | Runtime type validation for API requests |
| Serverless | serverless-http | 3.2.0 | Wrap Express app for serverless deployment |

### Document Processing

| Category | Technology | Version | Justification |
|----------|-----------|---------|---------------|
| Word Documents | mammoth | 1.11.0 | Convert .docx to HTML/text |
| Excel Spreadsheets | xlsx | 0.18.5 | Read and write Excel files |

### Architecture Pattern
**Layered Express API with Route-Based Organization**
- Express middleware pipeline
- Route handlers organized by domain
- RESTful API design
- Shared type contracts with client
- Environment-based configuration

---

## Development Tooling

| Category | Technology | Purpose |
|----------|-----------|---------|
| TSX | tsx 4.20.3 | Execute TypeScript files directly in Node.js |
| Type Definitions | @types/* | TypeScript definitions for JavaScript libraries |
| Vite React Plugin | @vitejs/plugin-react-swc | Fast React refresh with SWC compiler |
| TailwindCSS Typography | @tailwindcss/typography | Beautiful typographic defaults |
| TailwindCSS Animate | tailwindcss-animate | Animation utilities for Tailwind |

---

## Build & Deployment

### Development
- **Dev Server:** Vite dev server on port 8080
- **Hot Reload:** HMR for client, nodemon-style for server
- **Integration:** Express middleware in Vite dev server

### Production Build
- **Client Output:** `dist/spa/` - Static SPA files
- **Server Output:** `dist/server/` - Node.js ES module
- **Entry Point:** `dist/server/node-build.mjs`

### Deployment Targets
- **Netlify:** Configured with serverless functions
- **Standard Node.js:** Direct server execution
- **Binary Executables:** pkg-based builds for Linux, macOS, Windows

---

## Package Management

- **Manager:** pnpm 10.14.0
- **Lock File:** pnpm-lock.yaml (213 KB)
- **Dependencies:** 5 production, 71 development
- **Registry:** npm (default)

---

## Scripts

```bash
pnpm dev              # Start Vite dev server with integrated Express
pnpm build            # Build both client and server
pnpm build:client     # Build client SPA only
pnpm build:server     # Build server bundle only
pnpm start            # Start production server
pnpm test             # Run Vitest tests
pnpm typecheck        # TypeScript type checking
pnpm format.fix       # Format code with Prettier
```

---

## Architecture Summary

### Client Architecture
- **Pattern:** Component-based SPA
- **Routing:** React Router 6 (client-side)
- **Styling:** TailwindCSS utility-first + Radix UI components
- **State:** TanStack Query for server state, React state for local state
- **Build:** Vite with SWC compilation

### Server Architecture
- **Pattern:** Layered Express API
- **Routing:** Express route handlers
- **Middleware:** CORS, JSON parsing, URL encoding
- **Validation:** Zod schemas
- **Build:** Vite SSR build for Node.js target

### Integration
- **Protocol:** REST API over HTTP
- **Type Safety:** Shared TypeScript interfaces in `/shared/`
- **Development:** Single port with Express middleware
- **Production:** Server serves API + static files
