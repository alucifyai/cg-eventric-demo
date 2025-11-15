# Development Guide

## Prerequisites

### Required Software

| Software | Version | Purpose |
|----------|---------|---------|
| **Node.js** | 22+ | Runtime for server and build tools |
| **pnpm** | 10.14.0+ | Package manager (faster than npm/yarn) |
| **Git** | Latest | Version control |

### Recommended Tools

- **VS Code** - IDE with TypeScript support
- **Chrome/Firefox** - Browser with React DevTools
- **Postman/Thunder Client** - API testing

---

## Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd eventric_demo
```

### 2. Install Dependencies
```bash
pnpm install
```

**Note:** The project uses `pnpm` (specified in `packageManager` field). If you don't have pnpm:
```bash
npm install -g pnpm@10.14.0
```

### 3. Environment Setup

Create `.env` file in project root (or use existing):
```bash
# Server Configuration
PING_MESSAGE="ping pong"

# Builder.io (if using)
VITE_PUBLIC_BUILDER_KEY=__BUILDER_PUBLIC_KEY__
```

**Important:** Variables prefixed with `VITE_PUBLIC_` are exposed to the client.

---

## Development Commands

### Start Development Server
```bash
pnpm dev
```

- **URL:** http://localhost:8080
- **Hot Reload:** Enabled for both client and server
- **Port:** 8080 (configurable in `vite.config.ts`)

**What Happens:**
1. Vite dev server starts on port 8080
2. Express backend runs as Vite middleware
3. Client code served with HMR (Hot Module Replacement)
4. API endpoints available at `/api/*`
5. File changes trigger automatic reloading

### Type Checking
```bash
pnpm typecheck
```

Runs TypeScript compiler in check mode (no output, just validation).

**Recommended:** Run before committing code.

### Run Tests
```bash
pnpm test
```

Runs Vitest in run mode (single pass).

**For Watch Mode:**
```bash
pnpm test --watch
```

### Code Formatting
```bash
pnpm format.fix
```

Formats all files with Prettier.

**Recommended:** Set up Prettier in your IDE for format-on-save.

---

## Building for Production

### Build Everything
```bash
pnpm build
```

Runs both client and server builds sequentially.

### Build Client Only
```bash
pnpm build:client
```

**Output:** `dist/spa/`
- Static SPA files
- `index.html` entry point
- Hashed assets in `assets/` directory

### Build Server Only
```bash
pnpm build:server
```

**Output:** `dist/server/`
- `node-build.mjs` entry point
- Bundled ES module for Node.js

---

## Running Production Build

### Start Production Server
```bash
pnpm start
```

**Requirements:**
- `dist/` directory must exist (run `pnpm build` first)
- Environment variables configured

**What It Does:**
- Runs `node dist/server/node-build.mjs`
- Starts Express server
- Serves API at `/api/*`
- Serves static files from `dist/spa/`

---

## Project Structure for Development

### Frontend Development

#### Adding a New Page

1. **Create Page Component:** `client/pages/MyPage.tsx`
```tsx
export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
    </div>
  );
}
```

2. **Register Route:** `client/App.tsx`
```tsx
import MyPage from './pages/MyPage';

<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/my-page" element={<MyPage />} />
  {/* ADD ABOVE THE CATCH-ALL */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

3. **Navigate to Page:**
```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/my-page');
```

#### Creating Components

**Location:** `client/components/MyComponent.tsx`

```tsx
import { cn } from '@/lib/utils';

interface MyComponentProps {
  className?: string;
  children: React.ReactNode;
}

export function MyComponent({ className, children }: MyComponentProps) {
  return (
    <div className={cn('base-classes', className)}>
      {children}
    </div>
  );
}
```

#### Using UI Components

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function MyForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text..." />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

#### Styling with TailwindCSS

```tsx
// Use utility classes
<div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
  <Button className="bg-blue-500 hover:bg-blue-600">Click Me</Button>
</div>

// Conditional classes with cn()
import { cn } from '@/lib/utils';

<div className={cn(
  'base-class',
  isActive && 'active-class',
  'conditional-class'
)}>
  Content
</div>
```

---

### Backend Development

#### Adding API Endpoint

1. **Define Shared Interface:** `shared/api.ts`
```typescript
export interface MyResponse {
  data: string;
  count: number;
}
```

2. **Create Route Handler:** `server/routes/my-route.ts`
```typescript
import { RequestHandler } from 'express';
import { MyResponse } from '@shared/api';

export const handleMyRoute: RequestHandler = (req, res) => {
  const response: MyResponse = {
    data: 'example',
    count: 42
  };
  res.json(response);
};
```

3. **Register Route:** `server/index.ts`
```typescript
import { handleMyRoute } from './routes/my-route';

export function createServer() {
  const app = express();

  // ... middleware ...

  app.get('/api/my-endpoint', handleMyRoute);

  return app;
}
```

4. **Test Endpoint:**
```bash
curl http://localhost:8080/api/my-endpoint
```

#### Using Environment Variables

**Server:**
```typescript
const value = process.env.MY_VAR ?? 'default';
```

**Client:**
```typescript
const value = import.meta.env.VITE_PUBLIC_MY_VAR;
```

**Note:** Client variables must be prefixed with `VITE_PUBLIC_`.

---

## State Management

### Server State (TanStack Query)

```tsx
import { useQuery } from '@tanstack/react-query';

function useMyData() {
  return useQuery({
    queryKey: ['myData'],
    queryFn: async () => {
      const res = await fetch('/api/my-endpoint');
      return res.json();
    }
  });
}

// In component
const { data, isLoading, error } = useMyData();
```

### Form Management

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Required')
});

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('name')} />
      {form.formState.errors.name && (
        <span>{form.formState.errors.name.message}</span>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Testing

### Running Tests

```bash
# Run once
pnpm test

# Watch mode
pnpm test --watch

# Coverage
pnpm test --coverage
```

### Writing Tests

**Location:** Next to the file being tested with `.spec.ts` or `.test.ts` suffix

**Example:** `client/lib/utils.spec.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('merges classes', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    expect(cn('base', true && 'conditional')).toBe('base conditional');
  });
});
```

---

## Common Development Tasks

### Adding a Dependency

```bash
# Production dependency
pnpm add package-name

# Dev dependency
pnpm add -D package-name

# Specific version
pnpm add package-name@1.2.3
```

### Updating Dependencies

```bash
# Update all to latest (within semver range)
pnpm update

# Update specific package
pnpm update package-name

# Interactive update
pnpm update -i
```

### Path Aliases

Use TypeScript path aliases for cleaner imports:

```typescript
// ✅ Good
import { Button } from '@/components/ui/button';
import { DemoResponse } from '@shared/api';

// ❌ Avoid
import { Button } from '../../components/ui/button';
import { DemoResponse } from '../../../shared/api';
```

**Configured in:** `tsconfig.json` → `paths`

### Hot Reload Issues

If hot reload stops working:

1. **Restart dev server:** Ctrl+C, then `pnpm dev`
2. **Clear Vite cache:** Delete `node_modules/.vite` and restart
3. **Check file watchers:** Some systems have file watcher limits

---

## Debugging

### Client Debugging

1. **Browser DevTools:** F12 or Cmd+Option+I
2. **React DevTools:** Install browser extension
3. **Console Logging:**
```typescript
console.log('Debug:', data);
console.table(arrayData);
console.error('Error:', error);
```

### Server Debugging

1. **Console Logging:**
```typescript
console.log('Request received:', req.path);
```

2. **VS Code Debugger:**
Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Server",
  "program": "${workspaceFolder}/server/index.ts",
  "runtimeExecutable": "tsx",
  "restart": true
}
```

### Network Debugging

Use browser DevTools Network tab to inspect:
- API requests/responses
- Status codes
- Response times
- Headers

---

## Performance Optimization

### Client

- **Code Splitting:** React Router handles automatic code splitting by route
- **Lazy Loading:** Use `React.lazy()` for heavy components
- **Image Optimization:** Use `<img loading="lazy" />`
- **Bundle Analysis:** Add `vite-plugin-visualizer`

### Server

- **Caching:** Add caching headers for static assets
- **Compression:** Add compression middleware
- **Database:** Add connection pooling (when database is added)

---

## Troubleshooting

### Common Issues

#### Port 8080 Already in Use
```bash
# Kill process using port 8080
lsof -ti:8080 | xargs kill -9

# Or use different port in vite.config.ts
```

#### TypeScript Errors
```bash
# Clear and reinstall
rm -rf node_modules
pnpm install

# Restart TypeScript server in VS Code
Cmd+Shift+P → "TypeScript: Restart TS Server"
```

#### Build Fails
```bash
# Clear dist and rebuild
rm -rf dist
pnpm build
```

#### Module Not Found
Check that:
1. Package is installed: `pnpm list package-name`
2. Import path is correct
3. TypeScript paths are configured

---

## IDE Configuration

### VS Code Recommended Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag"
  ]
}
```

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## Git Workflow

### Branch Strategy

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "Add my feature"

# Push to remote
git push origin feature/my-feature
```

### Commit Messages

Follow conventional commit format:
- `feat: Add new feature`
- `fix: Fix bug in component`
- `docs: Update documentation`
- `style: Format code`
- `refactor: Refactor component`
- `test: Add tests`
- `chore: Update dependencies`

---

## Deployment

### Netlify (Configured)

The project is configured for Netlify deployment:

1. Connect repository to Netlify
2. Build settings are in `netlify.toml`
3. Deploy automatically on push to main

**Build Command:** `npm run build:client`
**Publish Directory:** `dist/spa`
**Functions:** `netlify/functions`

### Standard Node.js Server

```bash
# Build
pnpm build

# Set environment variables
export NODE_ENV=production
export PORT=3000

# Start server
pnpm start
```

---

## Next Steps

- Review [Technology Stack](./technology-stack.md) for complete dependencies
- Check [Architecture Patterns](./architecture-patterns.md) for design patterns
- Explore [API Contracts](./api-contracts-server.md) for API documentation
- See [UI Component Inventory](./ui-component-inventory-client.md) for available components

---

## Getting Help

- **Documentation:** Check files in `docs/` directory
- **CLAUDE.md:** AI assistant guidance
- **AGENTS.md:** Fusion Starter template documentation
- **TypeScript Errors:** Hover over error in VS Code for details
- **React Errors:** Check browser console for component stack trace
