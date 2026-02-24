# EnableOS Design System & Style Guide

This document contains the complete design system, styling patterns, and component examples from EnableOS that can be used to replicate the UI style in InterviewOS.

## 📋 Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Patterns](#component-patterns)
6. [CSS Variables & Theme](#css-variables--theme)
7. [Tailwind Configuration](#tailwind-configuration)
8. [Key Components](#key-components)

---

## Design Philosophy

**Core Principle:** Psychological safety over visual flair

**Emotional Intent:** A quiet coaching room, not a sales floor or analytics console

**Design Goals:**
- Reduce anxiety
- Avoid judgment
- Encourage repetition without pressure
- Maintain privacy and calm
- Provide clear guidance without urgency

**Forbidden Patterns:**
- ❌ Numeric scoring visuals
- ❌ Red/green success/failure semantics
- ❌ Leaderboards or comparison UI
- ❌ Gamification elements
- ❌ High-contrast alert colors
- ❌ Multiple competing primary actions per screen

---

## Color System

### Light Mode Colors (HSL values)
```css
--background: 0 0% 100%;
--foreground: 240 10% 3.9%;
--card: 0 0% 100%;
--card-foreground: 240 10% 3.9%;
--primary: 250 60% 50%;        /* Purple-blue accent */
--primary-foreground: 0 0% 98%;
--secondary: 240 4.8% 95.9%;
--secondary-foreground: 240 5.9% 10%;
--muted: 240 4.8% 95.9%;
--muted-foreground: 240 3.8% 46.1%;
--accent: 240 4.8% 95.9%;
--accent-foreground: 240 5.9% 10%;
--destructive: 0 84.2% 60.2%;
--destructive-foreground: 0 0% 98%;
--border: 240 5.9% 90%;
--input: 240 5.9% 90%;
--ring: 250 60% 50%;
--radius: 1rem;
```

### Dark Mode Colors (HSL values)
```css
--background: 240 10% 3.9%;
--foreground: 0 0% 98%;
--card: 240 10% 3.9%;
--card-foreground: 0 0% 98%;
--primary: 250 50% 60%;         /* Slightly lighter purple-blue */
--primary-foreground: 0 0% 98%;
--secondary: 240 3.7% 15.9%;
--secondary-foreground: 0 0% 98%;
--muted: 240 3.7% 15.9%;
--muted-foreground: 240 5% 64.9%;
--accent: 240 3.7% 15.9%;
--accent-foreground: 0 0% 98%;
--destructive: 0 62.8% 30.6%;
--destructive-foreground: 0 0% 98%;
--border: 240 3.7% 15.9%;
--input: 240 3.7% 15.9%;
--ring: 250 50% 60%;
```

### Primary Accent Color
- **Primary:** `#5E6AD2` (HSL: 250 60% 50%)
- **Hover:** `#6B77E0` (HSL: 250 50% 60%)
- **Active:** `#525DBF`
- **Light:** `rgba(94, 106, 210, 0.15)`
- **Subtle:** `rgba(94, 106, 210, 0.08)`

**Usage:** Only for guidance, primary actions, and subtle emphasis. Never for alerts, errors, or status indicators.

---

## Typography

### Font Family
```css
font-family: var(--font-public-sans), -apple-system, BlinkMacSystemFont, 
  'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 
  'Droid Sans', 'Helvetica Neue', sans-serif;
```

### Type Scale
- **xs:** 11px / 16px line-height (Labels, captions, metadata)
- **sm:** 13px / 20px line-height (Secondary text, helper text)
- **base:** 15px / 24px line-height (Body text, default)
- **md:** 16px / 24px line-height (Emphasized body text)
- **lg:** 18px / 28px line-height (Large body text, intro text)
- **xl:** 20px / 30px line-height, weight 500 (Section headings, card titles)
- **2xl:** 24px / 36px line-height, weight 500 (Page headings, major sections)
- **3xl:** 30px / 40px line-height, weight 500 (Hero headings, feature titles)
- **4xl:** 36px / 48px line-height, weight 500 (Landing page hero - sparingly)

### Font Weights
- **Regular:** 400 (Body text)
- **Medium:** 500 (Headings, emphasis)
- **Semibold:** 600 (Rarely used)

**Principle:** Avoid bold (700+) except for extreme emphasis. Medium (500) is the primary emphasis weight.

---

## Spacing & Layout

### Spacing Scale (8px base unit)
- **0:** 0px
- **1:** 4px
- **2:** 8px
- **3:** 12px
- **4:** 16px
- **5:** 20px
- **6:** 24px
- **8:** 32px
- **10:** 40px
- **12:** 48px
- **16:** 64px
- **20:** 80px
- **24:** 96px

### Layout Containers
- **Container:** max-width 1200px, padding 24px (Main content)
- **Narrow:** max-width 800px, padding 24px (Forms, focused content)
- **Wide:** max-width 1600px, padding 32px (Dashboards, wide layouts)

### Spacing Rhythm
- **Section spacing:** Minimum 48px (12) between major sections
- **Component spacing:** Minimum 24px (6) between related components
- **Element spacing:** Minimum 12px (3) between related elements

**Principle:** Low-density layouts with generous whitespace

---

## Component Patterns

### Buttons

#### Primary Button
```tsx
<Button 
  size="lg" 
  className="transition-colors duration-300 hover:bg-primary/90"
>
  Primary Action
</Button>
```
- **Usage:** Single primary action per screen. Use sparingly.
- **Forbidden:** Multiple primary buttons, using for secondary actions

#### Secondary Button
```tsx
<Button variant="secondary">Secondary Action</Button>
```
- **Usage:** Secondary actions, alternative options

#### Ghost Button
```tsx
<Button variant="ghost">Tertiary Action</Button>
```
- **Usage:** Tertiary actions, cancel, close

#### Destructive Button
```tsx
<Button variant="destructive">Delete</Button>
```
- **Usage:** Delete, remove actions. Visually de-emphasized.

### Cards

#### Default Card
```tsx
<div className="rounded-lg border border-border bg-card p-6">
  {/* Content */}
</div>
```
- **Usage:** Content containers, practice sessions, feedback blocks

#### Interactive Card
```tsx
<div className="rounded-lg border border-border bg-card p-4 
  transition-colors duration-300 hover:bg-accent/30 cursor-pointer">
  {/* Content */}
</div>
```

#### Stat Card Pattern
```tsx
<div className="rounded-lg border border-border bg-card p-6 
  hover:bg-accent/5 transition-colors">
  <div className="flex items-center gap-2 mb-2">
    <Icon className="h-4 w-4 text-muted-foreground" />
    <h3 className="text-sm font-medium text-muted-foreground">
      Label
    </h3>
  </div>
  <p className="text-2xl font-medium text-foreground">
    Value
  </p>
</div>
```

### Input Fields
```tsx
<input 
  className="w-full rounded-md border border-input bg-background 
    px-3 py-2 text-sm ring-offset-background 
    focus-visible:outline-none focus-visible:ring-2 
    focus-visible:ring-ring focus-visible:ring-offset-2"
/>
```

### Navigation Sidebar Pattern
```tsx
<div className="flex h-screen w-64 flex-col border-r border-border 
  bg-secondary/20 transition-all duration-300">
  {/* Logo/Brand */}
  <div className="flex h-16 items-center justify-between 
    border-b border-border px-6">
    <h1 className="text-xl font-medium text-foreground">Brand</h1>
  </div>
  
  {/* Navigation */}
  <nav className="flex-1 overflow-y-auto space-y-1 px-3 py-4">
    <Link
      className="flex items-center gap-3 rounded-md px-3 py-2 
        text-sm font-medium transition-colors
        bg-accent text-accent-foreground" // Active state
    >
      <Icon className="h-4 w-4" />
      Label
    </Link>
  </nav>
</div>
```

### Page Layout Pattern
```tsx
<div className="min-h-screen bg-background">
  <div className="mx-auto max-w-7xl px-6 py-8">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl font-medium text-foreground mb-2">
        Page Title
      </h1>
      <p className="text-muted-foreground">
        Page description
      </p>
    </div>
    
    {/* Content */}
  </div>
</div>
```

---

## CSS Variables & Theme

### Complete globals.css Structure
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 250 60% 50%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 250 60% 50%;
    --radius: 1rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 250 50% 60%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 250 50% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-public-sans), -apple-system, BlinkMacSystemFont, 
      'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 
      'Droid Sans', 'Helvetica Neue', sans-serif;
  }
}

/* Custom animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.recording-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

.spinner {
  animation: spin 1s linear infinite;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar - hidden by default, shows on hover */
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

*:hover {
  scrollbar-color: hsl(var(--muted-foreground) / 0.3) transparent;
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  opacity: 0;
  transition: opacity 0.2s;
}

*:hover::-webkit-scrollbar {
  opacity: 1;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
  transition: background 0.2s;
}

*:hover::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
}

*::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}

/* Focus visible improvements */
*:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Subtle animations */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fade-in 0.3s ease-out;
}

@keyframes subtle-lift {
  from { transform: translateY(0); }
  to { transform: translateY(-1px); }
}
```

---

## Tailwind Configuration

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-public-sans)", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

---

## Key Components

### Button Component
```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
            "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            "text-primary underline-offset-4 hover:underline": variant === "link",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
```

### Authenticated Layout Pattern
```tsx
<div className="flex h-screen overflow-hidden">
  {/* Left Navigation Sidebar */}
  <Sidebar />
  
  {/* Main Content Area */}
  <div className="flex-1 flex flex-col overflow-hidden min-w-0">
    <TopHeader />
    <main className="flex-1 overflow-hidden bg-background">
      {children}
    </main>
  </div>
</div>
```

---

## Design Constraints

### Hard Constraints
- ❌ No numeric scoring visuals
- ❌ No red/green success/failure semantics
- ❌ No leaderboards or comparison UI
- ❌ No gamification elements
- ❌ No high-contrast alert colors
- ❌ One primary action per screen

### Soft Constraints
- Prefer subtle over bold
- Prefer calm over urgent
- Prefer descriptive over evaluative
- Prefer guidance over instruction

---

## Validation Checklist

Before implementing any UI component, ask:
- ✅ Does this reduce anxiety?
- ✅ Does this avoid judgment?
- ✅ Does this encourage repetition?
- ✅ Is this calm and private?
- ✅ Does this avoid evaluation semantics?
- ✅ Is there only one primary action?
- ✅ Is the hierarchy clear without urgency?
- ✅ Does this scale to new features?

**Principle:** If any answer is 'no', redesign until all are 'yes'.

---

## Additional Resources

### Design System JSON
The complete design system specification is available in `design.json` in the EnableOS repository, which includes:
- Complete color palette
- Typography scale
- Component specifications
- Motion guidelines
- Accessibility requirements

### Key Files to Reference
- `app/globals.css` - Global styles and CSS variables
- `tailwind.config.ts` - Tailwind configuration
- `app/components/ui/button.tsx` - Button component example
- `app/components/Sidebar.tsx` - Navigation sidebar pattern
- `app/dashboard/page.tsx` - Dashboard page pattern
- `app/components/admin/AdminDashboard.tsx` - Stat cards pattern

---

## Implementation Notes

1. **Use CSS variables** for all colors to support light/dark mode
2. **Follow the spacing scale** (multiples of 4px/8px base unit)
3. **Use semantic color tokens** (`text-foreground`, `text-muted-foreground`, etc.)
4. **Maintain generous whitespace** - low density layouts
5. **One primary action per screen** - clear hierarchy
6. **Subtle animations only** - fade-in, gentle transitions
7. **Custom scrollbars** - hidden by default, appear on hover
8. **Focus visible** - always provide clear focus indicators

---

**Last Updated:** Based on EnableOS codebase as of latest commit
