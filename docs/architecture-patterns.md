# Architecture Patterns

## Repository Architecture

**Type:** Multi-Part Integrated Application
**Pattern:** Frontend-Backend Separation with Shared Types

This project employs a clear separation of concerns between frontend and backend while maintaining type safety through shared TypeScript interfaces.

---

## Part 1: Client (Web Frontend)

### Primary Pattern: Component-Based Single Page Application (SPA)

#### Component Hierarchy
```
App (Root)
├── Router (React Router)
├── QueryClientProvider (TanStack Query)
├── TooltipProvider (Radix UI)
└── Pages (Route-based)
    └── Components (Reusable UI)
        └── UI Primitives (Radix + Custom)
```

### Design Patterns

#### 1. **Composition Pattern**
- **Usage:** UI components composed from smaller, reusable primitives
- **Example:** Pages → Components → UI Primitives → Radix UI
- **Benefits:** Code reuse, consistent design, maintainability

#### 2. **Render Props & Custom Hooks**
- **Usage:** Logic separation and reuse
- **Example:** `client/hooks/` for shared logic
- **Benefits:** Decoupled business logic from presentation

#### 3. **Container/Presentational Pattern**
- **Usage:** Pages act as containers, components as presentational
- **Example:** Pages in `client/pages/` manage state, components in `client/components/` render UI
- **Benefits:** Clear separation of concerns, testability

#### 4. **Provider Pattern**
- **Usage:** Context providers for global state
- **Examples:**
  - `QueryClientProvider` for server state
  - `TooltipProvider` for UI context
  - `BrowserRouter` for routing context
- **Benefits:** Prop drilling avoidance, global state management

### State Management Strategy

#### Server State (TanStack Query)
- **Pattern:** Cache-first with background synchronization
- **Usage:** API data, asynchronous operations
- **Benefits:** Automatic caching, refetching, optimistic updates

#### Local State (React Hooks)
- **Pattern:** Component-level useState/useReducer
- **Usage:** UI state, form inputs, local interactions
- **Benefits:** Simple, colocated with component

#### Form State (React Hook Form)
- **Pattern:** Uncontrolled components with validation
- **Usage:** Form inputs with Zod schema validation
- **Benefits:** Performant, minimal re-renders

### Styling Strategy

#### Utility-First CSS (TailwindCSS)
- **Pattern:** Composition of utility classes
- **Usage:** All component styling
- **Benefits:** No CSS files, rapid development, consistency

#### Component Variants (CVA)
- **Pattern:** Type-safe component variants
- **Usage:** Button states, size variants, color schemes
- **Benefits:** Reusable variants, type safety

#### Design System (Radix UI)
- **Pattern:** Unstyled primitives with custom styling
- **Usage:** Accessible component foundation
- **Benefits:** Accessibility, customization, consistency

### Routing Pattern

#### Client-Side Routing (React Router 6)
- **Pattern:** Route-based code splitting
- **Structure:**
  ```
  / → Index page
  /select-venues → Venue selection
  /rider-validation → Rider validation
  /tour-review → Tour review
  * → 404 Not Found
  ```
- **Benefits:** Fast navigation, preserved state, SEO with meta management

---

## Part 2: Server (Backend API)

### Primary Pattern: Layered RESTful API

#### Layer Structure
```
HTTP Request
└── Express Middleware Pipeline
    ├── CORS
    ├── JSON Parser
    └── URL Encoder
        └── Route Handlers
            └── Business Logic
                └── HTTP Response
```

### Design Patterns

#### 1. **Middleware Chain Pattern**
- **Usage:** Request processing pipeline
- **Example:**
  ```typescript
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded())
  ```
- **Benefits:** Separation of concerns, composability

#### 2. **Route Handler Pattern**
- **Usage:** Organized API endpoints
- **Example:** `server/routes/demo.ts` exports handler functions
- **Benefits:** Modular, testable, maintainable

#### 3. **Factory Pattern**
- **Usage:** Server creation
- **Example:** `createServer()` function returns configured Express app
- **Benefits:** Testability, reusability, configuration flexibility

#### 4. **Configuration Pattern**
- **Usage:** Environment-based configuration
- **Example:** dotenv with `.env` file
- **Benefits:** Environment separation, security

### API Architecture

#### RESTful Endpoints
- **Pattern:** Resource-based URLs with HTTP verbs
- **Examples:**
  - `GET /api/ping` - Health check
  - `GET /api/demo` - Demo endpoint
- **Benefits:** Standard, predictable, cacheable

#### Request/Response Type Safety
- **Pattern:** Shared TypeScript interfaces
- **Location:** `shared/api.ts`
- **Example:**
  ```typescript
  export interface DemoResponse {
    message: string;
  }
  ```
- **Benefits:** End-to-end type safety, contract enforcement

### Build Pattern

#### Server-Side Bundling (Vite SSR)
- **Pattern:** Bundle Express app as ES module
- **Output:** `dist/server/node-build.mjs`
- **Target:** Node.js 22
- **Benefits:** Optimized bundle, tree-shaking, fast startup

---

## Integration Architecture

### Communication Pattern: REST API

#### Development Mode
```
Browser → http://localhost:8080
          ├── /api/* → Express (Vite middleware)
          └── /* → Vite Dev Server (HMR)
```

#### Production Mode
```
Browser → Express Server
          ├── /api/* → Express Routes
          └── /* → Static Files (dist/spa/)
```

### Type Safety Pattern

#### Shared Contracts
```
Client                    Shared                  Server
┌─────────┐              ┌────────────┐          ┌────────┐
│ Fetch   │─────────────→│ Interfaces │←─────────│ Routes │
│ API call│              │ Types      │          │ Handler│
└─────────┘              └────────────┘          └────────┘
```

**Location:** `shared/api.ts`

**Example:**
```typescript
// Shared
export interface DemoResponse {
  message: string;
}

// Server
const response: DemoResponse = { message: 'Hello' };

// Client
const data: DemoResponse = await fetch('/api/demo').then(r => r.json());
```

**Benefits:**
- Compile-time type checking
- Refactoring safety
- IDE autocomplete
- API contract documentation

---

## Development Workflow Pattern

### Unified Development Server

#### Pattern: Express as Vite Middleware
```
Vite Dev Server (Port 8080)
├── Vite Middleware (Client HMR)
└── Express Middleware (API Routes)
```

**Implementation:** `vite.config.ts` → `expressPlugin()`

**Benefits:**
- Single port for development
- No CORS issues
- Unified experience
- Hot reload for both client and server

---

## Deployment Patterns

### 1. **Netlify Functions**
- **Pattern:** Serverless Express wrapper
- **File:** `netlify/functions/api.ts`
- **Config:** `netlify.toml`
- **Benefits:** Auto-scaling, zero ops, global CDN

### 2. **Node.js Server**
- **Pattern:** Direct Express server
- **Command:** `node dist/server/node-build.mjs`
- **Benefits:** Full control, traditional hosting

### 3. **Static + API Separation**
- **Pattern:** Client on CDN, server on compute
- **Benefits:** Optimized delivery, independent scaling

---

## Security Patterns

### 1. **Environment Variables**
- **Pattern:** `.env` file with dotenv
- **Usage:** API keys, secrets, configuration
- **Client Exposure:** `VITE_PUBLIC_*` prefix required

### 2. **CORS Configuration**
- **Pattern:** cors middleware
- **Usage:** Cross-origin API access control

### 3. **Type Validation**
- **Pattern:** Zod schemas for runtime validation
- **Usage:** API request/response validation
- **Benefits:** Runtime type safety, input sanitization

---

## Testing Strategy

### Unit Testing (Vitest)
- **Pattern:** Component and function testing
- **Location:** `*.spec.ts`, `*.test.ts` files
- **Runner:** Vitest with Vite integration
- **Benefits:** Fast, TypeScript support, watch mode

---

## Code Organization Patterns

### Path Aliases
```typescript
@/*        → client/*      (Frontend code)
@shared/*  → shared/*      (Shared types)
```

**Benefits:**
- Clean imports
- Refactoring safety
- Clear boundaries

### Directory Structure
```
client/
├── pages/       # Route-based pages (containers)
├── components/  # Reusable UI components
├── hooks/       # Custom React hooks
└── lib/         # Utilities and helpers

server/
├── routes/      # API route handlers
└── index.ts     # Server setup and configuration

shared/
└── api.ts       # Type contracts between client/server
```

**Pattern:** Feature-based organization with shared concerns
**Benefits:** Scalability, clear ownership, discoverability
