# State Management - Client

## Overview

The client application uses a **multi-tiered state management strategy** that separates concerns based on data source and scope:

1. **Server State** - TanStack Query (React Query)
2. **Local Component State** - React Hooks (useState, useReducer)
3. **Form State** - React Hook Form + Zod Validation
4. **Global UI State** - React Context (Provider Pattern)

---

## Architecture Summary

```
┌─────────────────────────────────────────────────────┐
│                  Application State                   │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────────┐  ┌────────────────────────┐   │
│  │  Server State   │  │   Local UI State       │   │
│  │  (TanStack      │  │   (React Hooks)        │   │
│  │   Query)        │  │                        │   │
│  │                 │  │   - Component state    │   │
│  │  - API data     │  │   - UI toggles         │   │
│  │  - Caching      │  │   - Temp calculations  │   │
│  │  - Sync         │  │   - View state         │   │
│  └─────────────────┘  └────────────────────────┘   │
│                                                       │
│  ┌─────────────────┐  ┌────────────────────────┐   │
│  │   Form State    │  │   Global UI State      │   │
│  │   (React Hook   │  │   (Context Providers)  │   │
│  │    Form)        │  │                        │   │
│  │                 │  │   - Theme              │   │
│  │  - Validation   │  │   - Toasts             │   │
│  │  - Submission   │  │   - Tooltips           │   │
│  │  - Errors       │  │   - Router             │   │
│  └─────────────────┘  └────────────────────────┘   │
│                                                       │
└─────────────────────────────────────────────────────┘
```

---

## 1. Server State (TanStack Query)

### Configuration

**Library:** `@tanstack/react-query` v5.84.2

**Setup Location:** `client/App.tsx`

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* app content */}
  </QueryClientProvider>
);
```

### Usage Pattern

#### Data Fetching (Queries)
```tsx
import { useQuery } from '@tanstack/react-query';

function useTours() {
  return useQuery({
    queryKey: ['tours'],
    queryFn: async () => {
      const response = await fetch('/api/tours');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000 // 10 minutes
  });
}

// In component
const { data: tours, isLoading, error } = useTours();
```

#### Data Mutations
```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useCreateTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await fetch('/api/tours', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    }
  });
}

// In component
const createTour = useCreateTour();
createTour.mutate(tourData);
```

### Benefits
- **Automatic Caching** - Reduces redundant API calls
- **Background Refetching** - Keeps data fresh
- **Optimistic Updates** - Instant UI feedback
- **Loading & Error States** - Built-in state management
- **Request Deduplication** - Prevents duplicate calls
- **Garbage Collection** - Automatic cache cleanup

### Query Key Strategy
```tsx
// Recommended query key patterns
['tours']                    // All tours
['tours', tourId]            // Specific tour
['tours', { status: 'active' }]  // Filtered tours
['venues']                   // All venues
['venues', { city: 'NYC' }]  // Filtered venues
```

---

## 2. Local Component State (React Hooks)

### useState for Simple State

**Usage:** UI toggles, temporary values, local calculations

```tsx
import { useState } from 'react';

function VenueCard({ venue }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      {isExpanded && (
        <div>
          {/* expanded content */}
        </div>
      )}
    </div>
  );
}
```

### useReducer for Complex State

**Usage:** Multi-step workflows, complex state transitions

```tsx
import { useReducer } from 'react';

type State = {
  step: number;
  data: TourData;
  errors: Record<string, string>;
};

type Action =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'UPDATE_DATA'; payload: Partial<TourData> }
  | { type: 'SET_ERROR'; field: string; message: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 };
    case 'PREV_STEP':
      return { ...state, step: state.step - 1 };
    case 'UPDATE_DATA':
      return { ...state, data: { ...state.data, ...action.payload } };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message }
      };
    default:
      return state;
  }
}

function TourWizard() {
  const [state, dispatch] = useReducer(reducer, {
    step: 1,
    data: {},
    errors: {}
  });

  return (
    <div>
      {/* wizard implementation */}
    </div>
  );
}
```

### Custom Hooks for Reusable Logic

**Location:** `client/hooks/`

**Example: useToggle**
```tsx
import { useState, useCallback } from 'react';

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse };
}

// Usage
const modal = useToggle();
<Button onClick={modal.toggle}>Open Modal</Button>
```

### Existing Custom Hooks

#### useMobile
**Location:** `client/hooks/use-mobile.tsx`
**Purpose:** Detect mobile viewport
**Returns:** Boolean indicating if viewport is mobile

#### useToast
**Location:** `client/hooks/use-toast.ts`
**Purpose:** Toast notification system
**Returns:** Toast management functions

---

## 3. Form State (React Hook Form)

### Configuration

**Libraries:**
- `react-hook-form` v7.62.0 - Form state management
- `@hookform/resolvers` v5.2.1 - Validation resolvers
- `zod` v3.25.76 - Schema validation

### Basic Usage Pattern

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define validation schema
const tourSchema = z.object({
  name: z.string().min(1, 'Tour name is required'),
  startDate: z.string().datetime(),
  endDate: z.string().datetime()
}).refine(
  (data) => new Date(data.endDate) > new Date(data.startDate),
  { message: 'End date must be after start date', path: ['endDate'] }
);

type TourFormData = z.infer<typeof tourSchema>;

function TourForm() {
  const form = useForm<TourFormData>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      name: '',
      startDate: '',
      endDate: ''
    }
  });

  const onSubmit = (data: TourFormData) => {
    console.log('Valid data:', data);
    // Submit to API
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('name')} />
      {form.formState.errors.name && (
        <span>{form.formState.errors.name.message}</span>
      )}

      <button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

### With UI Components

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

<Form {...form}>
  <FormField
    control={form.control}
    name="name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Tour Name</FormLabel>
        <FormControl>
          <Input placeholder="Enter tour name" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>
```

### Benefits
- **Performant** - Minimal re-renders (uncontrolled components)
- **Type-Safe** - Full TypeScript support with Zod inference
- **Validation** - Schema-based validation with custom rules
- **Error Handling** - Field-level and form-level errors
- **Submission State** - Built-in loading/submitting states
- **Field Arrays** - Dynamic form fields
- **Watch Values** - React to field changes

---

## 4. Global UI State (Context Providers)

### Provider Stack

**Location:** `client/App.tsx`

```tsx
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* routes */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
```

### Active Providers

| Provider | Library | Purpose |
|----------|---------|---------|
| **QueryClientProvider** | @tanstack/react-query | Server state management |
| **TooltipProvider** | @radix-ui/react-tooltip | Tooltip context for all tooltips |
| **BrowserRouter** | react-router-dom | Client-side routing context |
| **Toaster** | @/components/ui/toaster | Toast notifications (Radix) |
| **Sonner** | @/components/ui/sonner | Toast notifications (Sonner) |

### Theme Provider (Not Yet Implemented)

**Recommended Addition:**
```tsx
import { ThemeProvider } from 'next-themes';

<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {/* app */}
</ThemeProvider>
```

---

## State Management Decision Tree

```
┌─────────────────────────────────────────┐
│         Need to manage state?            │
└────────────────┬─────────────────────────┘
                 │
                 ├─ Is it data from API? ───────────► TanStack Query
                 │
                 ├─ Is it form input? ──────────────► React Hook Form + Zod
                 │
                 ├─ Needed across many components? ─► React Context
                 │
                 └─ Local to one component? ────────► useState / useReducer
```

---

## Current State Usage in Application

### Index Page (`/`)
**State:**
- Form inputs: `useState` for tour name, dates, file name
- Upload progress: `useState` for progress tracking
- File handling: `useState` for file selection

**Recommended:**
- Migrate to React Hook Form + Zod for validation
- Use TanStack Mutation for file upload

### SelectVenues Page (`/select-venues`)
**State:**
- Selected venues: `useState` for venue selection
- Search filter: `useState` for search query
- Mock venue data: Hard-coded array

**Recommended:**
- Use TanStack Query for venue fetching
- Move selection to URL params or parent state

### RiderValidation Page (`/rider-validation`)
**State:**
- Validation status: `useState` for requirement checks
- Selected items: `useState` for requirement selection
- Mock rider data: Hard-coded object

**Recommended:**
- Use TanStack Query for rider data fetching
- Real-time validation via API

### TourReview Page (`/tour-review`)
**State:**
- Tour summary: Local state with mock data
- Confirmation: `useState` for submission state

**Recommended:**
- Use TanStack Query for tour details
- Optimistic update on confirmation

---

## Best Practices

### 1. State Colocation
Keep state as close as possible to where it's used:
```tsx
// ✅ Good - State in component that uses it
function VenueCard() {
  const [expanded, setExpanded] = useState(false);
  // ...
}

// ❌ Bad - State lifted unnecessarily
function Parent() {
  const [expanded, setExpanded] = useState(false);
  return <VenueCard expanded={expanded} />;
}
```

### 2. Avoid Prop Drilling
Use Context for data needed by many distant components:
```tsx
// ✅ Good - Context for theme
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* deeply nested components can access theme */}
    </ThemeContext.Provider>
  );
}
```

### 3. Separate Server and UI State
Never duplicate server data in local state:
```tsx
// ❌ Bad - Duplicating server state
const { data } = useQuery({ queryKey: ['tours'] });
const [tours, setTours] = useState(data); // Unnecessary!

// ✅ Good - Use server state directly
const { data: tours } = useQuery({ queryKey: ['tours'] });
```

### 4. Use Derived State
Compute values instead of storing them:
```tsx
// ❌ Bad - Storing derived state
const [items, setItems] = useState([...]);
const [count, setCount] = useState(items.length);

// ✅ Good - Compute on render
const [items, setItems] = useState([...]);
const count = items.length;
```

---

## Testing State

### React Query Testing
```tsx
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

test('fetches tours', async () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  const { result } = renderHook(() => useTours(), { wrapper });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toHaveLength(5);
});
```

### Form Testing
```tsx
import { render, screen, fireEvent } from '@testing-library/react';

test('validates form', async () => {
  render(<TourForm />);

  const submitButton = screen.getByRole('button', { name: /submit/i });
  fireEvent.click(submitButton);

  expect(await screen.findByText(/tour name is required/i)).toBeInTheDocument();
});
```

---

## Future Enhancements

### Planned Improvements
1. **Persistent State** - localStorage sync for user preferences
2. **Optimistic UI** - Instant feedback for mutations
3. **Offline Support** - Queue mutations when offline
4. **State Debugging** - React Query Devtools in development
5. **Error Boundaries** - Graceful error recovery
6. **State Snapshots** - Save/restore application state
7. **Undo/Redo** - Command pattern for reversible actions
