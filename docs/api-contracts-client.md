# API Contracts - Client

## Overview

The client application is configured to consume the Express backend API. The integration uses native `fetch` API with TypeScript types from shared contracts.

## API Client Configuration

### Base URL
- **Development:** `http://localhost:8080/api` (proxied through Vite dev server)
- **Production:** `/api` (relative, served by same Express server)

### Type Safety
All API calls use shared TypeScript interfaces from `@shared/api` module for compile-time type checking.

---

## Implemented API Integration

### Shared Type Contracts

**Location:** `shared/api.ts`

```typescript
export interface DemoResponse {
  message: string;
}
```

---

## API Client Pattern (Recommended)

### With TanStack Query

The project includes `@tanstack/react-query` (v5.84.2) for server state management.

**Recommended Pattern:**
```typescript
import { useQuery } from '@tanstack/react-query';
import { DemoResponse } from '@shared/api';

function useDemo() {
  return useQuery({
    queryKey: ['demo'],
    queryFn: async () => {
      const response = await fetch('/api/demo');
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json() as Promise<DemoResponse>;
    }
  });
}

// Usage in component
const { data, isLoading, error } = useDemo();
```

**Benefits:**
- Automatic caching
- Background refetching
- Loading and error states
- Optimistic updates
- Type-safe responses

---

## Current Implementation Status

### API Integration Points

**Status:** The current client application is primarily UI mockups with simulated state. No live API integration is currently implemented.

**Evidence:**
- No fetch/axios calls found in page components
- Pages use local React state with mock data
- Forms simulate upload/validation without API calls

### Pages and Expected API Integration

#### 1. Index Page (`/`)
**Current:** Local form state for tour creation
**Expected API Calls:**
- `POST /api/tours` - Create new tour
- `POST /api/riders/upload` - Upload rider document

#### 2. Select Venues Page (`/select-venues`)
**Current:** Mock venue list in component
**Expected API Calls:**
- `GET /api/venues` - Fetch available venues
- `GET /api/venues?search={query}` - Search venues
- `POST /api/tours/:id/venues` - Add venues to tour

#### 3. Rider Validation Page (`/rider-validation`)
**Current:** Mock rider data and validation UI
**Expected API Calls:**
- `GET /api/tours/:id/rider` - Get rider details
- `POST /api/riders/validate` - Validate rider requirements
- `GET /api/venues/:id/capabilities` - Get venue capabilities

#### 4. Tour Review Page (`/tour-review`)
**Current:** Mock tour summary data
**Expected API Calls:**
- `GET /api/tours/:id` - Get complete tour details
- `PUT /api/tours/:id` - Update tour
- `POST /api/tours/:id/submit` - Finalize tour

---

## API Client Implementation Guide

### 1. Create API Client Module

**Recommended Location:** `client/lib/api.ts`

```typescript
import { DemoResponse } from '@shared/api';

const API_BASE = import.meta.env.DEV ? 'http://localhost:8080/api' : '/api';

export const api = {
  demo: {
    get: async (): Promise<DemoResponse> => {
      const response = await fetch(`${API_BASE}/demo`);
      if (!response.ok) throw new Error('Failed to fetch demo');
      return response.json();
    }
  },

  tours: {
    create: async (data: CreateTourRequest): Promise<TourResponse> => {
      const response = await fetch(`${API_BASE}/tours`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create tour');
      return response.json();
    }
  }
};
```

### 2. Create React Query Hooks

**Recommended Location:** `client/hooks/api/`

```typescript
// client/hooks/api/useTours.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useCreateTour() {
  return useMutation({
    mutationFn: api.tours.create,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    }
  });
}

export function useTour(id: string) {
  return useQuery({
    queryKey: ['tours', id],
    queryFn: () => api.tours.get(id),
    enabled: !!id
  });
}
```

### 3. Use in Components

```typescript
import { useCreateTour } from '@/hooks/api/useTours';

export function TourForm() {
  const createTour = useCreateTour();

  const handleSubmit = async (data: FormData) => {
    try {
      await createTour.mutateAsync(data);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={createTour.isPending}>
        {createTour.isPending ? 'Creating...' : 'Create Tour'}
      </button>
    </form>
  );
}
```

---

## Error Handling Pattern

### Global Error Handling

```typescript
// client/lib/api-error.ts
export class APIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new APIError(response.status, response.statusText, error.message);
  }
  return response.json();
}
```

### Component Error Display

```typescript
const { data, error, isLoading } = useTour(tourId);

if (error) {
  return <ErrorBoundary error={error} />;
}
```

---

## Request/Response Validation

### Zod Integration

```typescript
import { z } from 'zod';

// Define schema
const tourSchema = z.object({
  name: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime()
});

// Validate response
const validateTourResponse = (data: unknown): Tour => {
  return tourSchema.parse(data);
};

// In API client
const response = await fetch('/api/tours');
const data = await response.json();
return validateTourResponse(data);
```

---

## State Management Strategy

### Server State (TanStack Query)
- **Purpose:** API data, remote state
- **Features:** Caching, background sync, optimistic updates
- **Usage:** All API-driven data

### Local State (React hooks)
- **Purpose:** UI state, form inputs, local interactions
- **Features:** Component-scoped, simple
- **Usage:** Form values, modals, toggles

### Form State (React Hook Form + Zod)
- **Purpose:** Form validation and submission
- **Features:** Performant, validated, type-safe
- **Usage:** All forms

---

## API Development Checklist

When adding new API integration:

- [ ] Define TypeScript interface in `shared/api.ts`
- [ ] Implement server endpoint in `server/routes/`
- [ ] Register route in `server/index.ts`
- [ ] Create API client method in `client/lib/api.ts`
- [ ] Create React Query hook in `client/hooks/api/`
- [ ] Implement error handling
- [ ] Add loading states in UI
- [ ] Test with real data
- [ ] Update this documentation

---

## Future Enhancements

### Planned Improvements
1. **API Client Layer** - Centralized fetch wrapper with interceptors
2. **Error Boundary** - Global error handling for API failures
3. **Retry Logic** - Automatic retry for failed requests
4. **Request Cancellation** - Cancel in-flight requests on component unmount
5. **Optimistic Updates** - Update UI before server confirms
6. **Offline Support** - Queue requests when offline
7. **Authentication** - Token-based auth with refresh
8. **Request Deduplication** - Prevent duplicate simultaneous requests
