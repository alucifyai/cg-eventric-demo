# UI Component Inventory - Client

## Overview

The client application includes **53 UI components** organized into two main categories:
1. **Application Components** (5) - Custom business logic components
2. **UI Primitives** (48) - Radix UI-based design system components

## Component Library Summary

- **Total Components:** 53
- **Application Components:** 5
- **UI Primitives (Radix-based):** 48
- **Design System:** Custom styled with TailwindCSS
- **Accessibility:** WCAG compliant via Radix UI
- **Theme Support:** Dark mode capable

---

## Application Components

### 1. Header
**Location:** `client/components/Header.tsx`
**Purpose:** Main application header with search and user actions
**Features:**
- Logo display
- Search bar with keyboard shortcut (⌘F)
- User avatar
- Calendar icon with notification badge
- User menu icon

**Used In:** All pages (global header)

### 2. WizardSteps
**Location:** `client/components/WizardSteps.tsx`
**Purpose:** Multi-step wizard progress indicator
**Features:**
- Step indicators (Create Tour, Select Venues, Validate Riders, Review)
- Current step highlighting
- Step numbering
- Visual progress tracking

**Used In:** All wizard pages (Index, SelectVenues, RiderValidation, TourReview)

### 3. Calendar
**Location:** `client/components/Calendar.tsx`
**Purpose:** Tour date visualization calendar
**Features:**
- Month view display
- Date selection
- Event markers for tour dates
- Venue information display

**Used In:** SelectVenues page

### 4. VenueList
**Location:** `client/components/VenueList.tsx`
**Purpose:** Searchable list of available venues
**Features:**
- Venue search/filter
- Venue card display
- Selection mechanism
- Capacity and location information

**Used In:** SelectVenues page

### 5. RiderSidebar
**Location:** `client/components/RiderSidebar.tsx`
**Purpose:** Rider requirements validation sidebar
**Features:**
- Rider requirement checklist
- Validation status indicators
- Expandable requirement details
- Venue compatibility checking

**Used In:** RiderValidation page

---

## UI Primitives (Radix-based Components)

All UI primitives are located in `client/components/ui/` and are built on Radix UI with custom TailwindCSS styling.

### Layout & Structure

| Component | Purpose | Radix Primitive |
|-----------|---------|----------------|
| **Card** | Container with header, content, footer sections | - |
| **Separator** | Visual divider between content | @radix-ui/react-separator |
| **Aspect Ratio** | Maintain consistent aspect ratios | @radix-ui/react-aspect-ratio |
| **Resizable** | Resizable split panels | react-resizable-panels |
| **Sidebar** | Collapsible sidebar navigation | @radix-ui/react-sidebar |

### Navigation

| Component | Purpose | Radix Primitive |
|-----------|---------|----------------|
| **Menubar** | Top-level menu bar | @radix-ui/react-menubar |
| **Navigation Menu** | Site navigation with dropdowns | @radix-ui/react-navigation-menu |
| **Breadcrumb** | Hierarchical navigation trail | - |
| **Pagination** | Page navigation controls | - |
| **Tabs** | Tabbed content navigation | @radix-ui/react-tabs |
| **Command** | Command palette (⌘K) | cmdk |

### Form Inputs

| Component | Purpose | Radix Primitive |
|-----------|---------|----------------|
| **Input** | Text input field | - |
| **Textarea** | Multi-line text input | - |
| **Button** | Action button with variants | @radix-ui/react-slot |
| **Checkbox** | Boolean selection | @radix-ui/react-checkbox |
| **Radio Group** | Single selection from options | @radix-ui/react-radio-group |
| **Select** | Dropdown selection | @radix-ui/react-select |
| **Switch** | Toggle switch | @radix-ui/react-switch |
| **Slider** | Numeric range input | @radix-ui/react-slider |
| **Calendar** | Date picker | react-day-picker |
| **Input OTP** | One-time password input | input-otp |
| **Form** | Form wrapper with validation | react-hook-form |
| **Label** | Accessible form labels | @radix-ui/react-label |

### Overlays & Modals

| Component | Purpose | Radix Primitive |
|-----------|---------|----------------|
| **Dialog** | Modal dialog | @radix-ui/react-dialog |
| **Alert Dialog** | Confirmation dialog | @radix-ui/react-alert-dialog |
| **Sheet** | Slide-out panel | @radix-ui/react-dialog |
| **Drawer** | Bottom sheet drawer | vaul |
| **Popover** | Floating content | @radix-ui/react-popover |
| **Hover Card** | Hover-triggered content | @radix-ui/react-hover-card |
| **Tooltip** | Hover hint text | @radix-ui/react-tooltip |
| **Context Menu** | Right-click menu | @radix-ui/react-context-menu |
| **Dropdown Menu** | Action menu | @radix-ui/react-dropdown-menu |

### Feedback & Status

| Component | Purpose | Radix Primitive |
|-----------|---------|----------------|
| **Alert** | Status message container | - |
| **Toast / Sonner** | Temporary notification | @radix-ui/react-toast / sonner |
| **Progress** | Progress indicator | @radix-ui/react-progress |
| **Skeleton** | Loading placeholder | - |
| **Badge** | Status or count indicator | - |

### Data Display

| Component | Purpose | Radix Primitive |
|-----------|---------|----------------|
| **Table** | Data table | - |
| **Chart** | Data visualization | recharts |
| **Avatar** | User image with fallback | @radix-ui/react-avatar |
| **Carousel** | Image/content carousel | embla-carousel-react |
| **Scroll Area** | Styled scrollable container | @radix-ui/react-scroll-area |

### Interactive

| Component | Purpose | Radix Primitive |
|-----------|---------|----------------|
| **Accordion** | Expandable content sections | @radix-ui/react-accordion |
| **Collapsible** | Show/hide content | @radix-ui/react-collapsible |
| **Toggle** | Binary toggle button | @radix-ui/react-toggle |
| **Toggle Group** | Mutually exclusive toggles | @radix-ui/react-toggle-group |

---

## Component Usage Patterns

### Button Variants
```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### Card Structure
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Main content
  </CardContent>
  <CardFooter>
    Actions
  </CardFooter>
</Card>
```

### Form Pattern with Validation
```tsx
<Form {...form}>
  <FormField
    control={form.control}
    name="fieldName"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Label</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormDescription>Helper text</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>
```

---

## Design System

### Color Palette
Defined in `tailwind.config.ts` using HSL CSS variables:
- **Primary** - Main brand color
- **Secondary** - Secondary actions
- **Destructive** - Danger/delete actions
- **Accent** - Highlights and emphasis
- **Muted** - Subdued text and backgrounds
- **Border** - Component borders
- **Coral** - Custom accent color
- **Neutral Dark/Darker** - Custom neutral shades

### Theme System
- **Light Mode** - Default theme
- **Dark Mode** - Automatic with `next-themes`
- **Theme Toggle** - User preference persistence

### Border Radius
- `sm` - Small radius
- `md` - Medium radius
- `lg` - Large radius
- Custom per theme (`--radius` CSS variable)

### Typography
- TailwindCSS typography plugin included
- Consistent font sizing and line heights
- Custom font family support

---

## Accessibility Features

All Radix UI components provide:
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader** - ARIA labels and roles
- **Focus Management** - Proper focus trapping and restoration
- **WCAG Compliance** - AA/AAA standards

---

## Animation & Motion

### Framer Motion
- **Library:** framer-motion (v12.23.12)
- **Usage:** Page transitions, component animations
- **Pattern:** Declarative animation with motion components

### TailwindCSS Animate
- **Plugin:** tailwindcss-animate
- **Custom Animations:**
  - `accordion-down` - Accordion expand
  - `accordion-up` - Accordion collapse
- **Usage:** Utility classes for simple animations

---

## Icon System

### Lucide React
- **Library:** lucide-react (v0.539.0)
- **Icons Used:**
  - Search, User, Calendar (Header)
  - Plus, CheckCircle, AlertCircle (Status indicators)
  - ChevronLeft, ChevronRight (Navigation)
  - Many more throughout the application

**Usage:**
```tsx
import { Search, User } from 'lucide-react';

<Search className="w-4 h-4" />
```

---

## Component Development Guidelines

### Creating New Components

1. **Use Existing Primitives First**
   - Check if a Radix UI component exists
   - Compose from existing UI primitives

2. **Follow Naming Conventions**
   - PascalCase for component names
   - Descriptive, domain-specific names

3. **Styling Pattern**
   - Use TailwindCSS utilities
   - Apply `cn()` utility for conditional classes
   - Use CSS variables for theme values

4. **TypeScript Props**
   - Define explicit prop interfaces
   - Extend HTML element props when applicable
   - Use React.ComponentProps for element extensions

5. **Accessibility**
   - Include ARIA labels
   - Support keyboard navigation
   - Provide focus indicators

### Example Component Template
```tsx
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

interface MyComponentProps extends ComponentProps<'div'> {
  variant?: 'default' | 'outline';
}

export function MyComponent({
  variant = 'default',
  className,
  children,
  ...props
}: MyComponentProps) {
  return (
    <div
      className={cn(
        'base-classes',
        variant === 'outline' && 'outline-classes',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

---

## Component Documentation

Each UI primitive includes:
- **TypeScript definitions** - Full type safety
- **Inline comments** - Usage examples
- **Radix UI docs** - Reference to original Radix primitive
- **Variants** - Available style variants via CVA

---

## Future Component Additions (Planned)

Based on tour management application needs:
- **Stepper** - Multi-step form navigation (alternative to WizardSteps)
- **File Upload** - Drag-and-drop file upload (for rider documents)
- **Data Grid** - Advanced table with sorting, filtering, pagination
- **Timeline** - Tour date timeline visualization
- **Map Integration** - Venue location display
- **Rich Text Editor** - For notes and descriptions
- **Split Button** - Combined action + dropdown
- **Color Picker** - Theme customization
