# Project Structure

## Repository Type
**Multi-part** - Integrated Client/Server Architecture

## Overview
This is a full-stack TypeScript application with a clear separation between frontend and backend concerns. The project follows a monorepo-style structure with client and server code in distinct directories, sharing TypeScript types and utilities.

## Project Parts

### Part 1: Client (Web Frontend)
- **Location:** `/client/`
- **Type:** Web Application
- **Primary Technology:** React 18 + TypeScript
- **Build Tool:** Vite
- **UI Framework:** Radix UI + TailwindCSS

### Part 2: Server (Backend API)
- **Location:** `/server/`
- **Type:** Backend API
- **Primary Technology:** Express 5 + Node.js
- **Runtime:** Node.js (ES Modules)

## Shared Resources
- **Location:** `/shared/`
- **Purpose:** TypeScript interfaces and types used by both client and server
- **Key File:** `api.ts` - API contract definitions

## Root Configuration
- **Package Manager:** pnpm
- **TypeScript:** Shared tsconfig.json with path aliases
- **Build Scripts:** Coordinated client + server builds
- **Development:** Single dev server (port 8080) with integrated Express

## Directory Layout

```
eventric_demo/
├── client/                 # React SPA Frontend (Part 1: Web)
│   ├── pages/              # Route-based page components
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Client utilities
│   └── App.tsx             # Application entry point
│
├── server/                 # Express API Backend (Part 2: Backend)
│   ├── routes/             # API endpoint handlers
│   ├── index.ts            # Server setup and configuration
│   └── node-build.ts       # Production server entry
│
├── shared/                 # Shared TypeScript definitions
│   └── api.ts              # API contracts and interfaces
│
├── public/                 # Static assets
├── src/                    # Additional shared components
├── docs/                   # Generated documentation (this file)
│
└── Root Config Files
    ├── package.json        # Project dependencies and scripts
    ├── tsconfig.json       # TypeScript configuration
    ├── vite.config.ts      # Client build configuration
    ├── vite.config.server.ts  # Server build configuration
    └── tailwind.config.ts  # TailwindCSS configuration
```

## Build Architecture

### Development Mode
- Single Vite dev server on port 8080
- Express backend integrated as Vite middleware
- Hot Module Replacement (HMR) for both client and server
- Unified development experience

### Production Mode
- **Client Build:** Vite → `dist/spa/` (static SPA files)
- **Server Build:** Vite → `dist/server/` (Node.js module)
- **Deployment:** Server serves API + static client files

## Integration Points

The client and server communicate through:
- **REST API:** Client makes HTTP requests to `/api/*` endpoints
- **Type Safety:** Shared interfaces in `/shared/api.ts`
- **Development:** Seamless proxy through Vite dev server
- **Production:** Server serves both API and static frontend

## Key Files

### Client Entry Points
- `client/App.tsx` - React application root
- `client/pages/Index.tsx` - Home page

### Server Entry Points
- `server/index.ts` - Express server configuration
- `server/node-build.ts` - Production server bootstrap

### Configuration
- `vite.config.ts` - Client + dev server configuration
- `vite.config.server.ts` - Server build configuration
- `tsconfig.json` - TypeScript compiler settings with path aliases
