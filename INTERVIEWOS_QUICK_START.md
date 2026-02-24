# InterviewOS UI Upgrade - Quick Start Checklist

Use this checklist when upgrading InterviewOS to match EnableOS styling.

## 🎨 Essential Files to Copy/Reference

### 1. CSS & Theme Configuration
- [ ] Copy `app/globals.css` → Contains all CSS variables, animations, scrollbar styles
- [ ] Copy `tailwind.config.ts` → Tailwind theme configuration with color tokens
- [ ] Ensure `tailwindcss-animate` plugin is installed

### 2. Core UI Components
- [ ] Copy `app/components/ui/button.tsx` → Button component with all variants
- [ ] Copy `app/components/ui/input.tsx` → Input field component
- [ ] Copy `app/components/ui/select.tsx` → Select dropdown component
- [ ] Create utility function `lib/utils.ts` with `cn()` helper for className merging

### 3. Layout Patterns
- [ ] Reference `app/components/AuthenticatedLayout.tsx` → Main layout structure
- [ ] Reference `app/components/Sidebar.tsx` → Navigation sidebar pattern
- [ ] Reference `app/dashboard/page.tsx` → Page layout pattern

## 🎯 Key Design Tokens to Implement

### CSS Variables (from globals.css)
```css
/* Light Mode */
--primary: 250 60% 50%;           /* Purple-blue accent */
--background: 0 0% 100%;
--foreground: 240 10% 3.9%;
--muted-foreground: 240 3.8% 46.1%;
--border: 240 5.9% 90%;
--radius: 1rem;

/* Dark Mode */
--primary: 250 50% 60%;
--background: 240 10% 3.9%;
--foreground: 0 0% 98%;
--muted-foreground: 240 5% 64.9%;
--border: 240 3.7% 15.9%;
```

### Typography
- Font: Public Sans (or system font stack)
- Base size: 15px / 24px line-height
- Headings: Medium weight (500), never bold
- Scale: xs (11px) → 4xl (36px)

### Spacing
- Base unit: 8px (multiples of 4px)
- Section spacing: 48px minimum
- Component spacing: 24px minimum
- Element spacing: 12px minimum

## 🧩 Component Patterns to Implement

### Buttons
```tsx
// Primary (one per screen)
<Button size="lg" className="transition-colors duration-300 hover:bg-primary/90">
  Primary Action
</Button>

// Secondary
<Button variant="secondary">Secondary</Button>

// Ghost
<Button variant="ghost">Tertiary</Button>
```

### Cards
```tsx
// Default card
<div className="rounded-lg border border-border bg-card p-6">
  {/* Content */}
</div>

// Interactive card
<div className="rounded-lg border border-border bg-card p-4 
  transition-colors duration-300 hover:bg-accent/30 cursor-pointer">
  {/* Content */}
</div>

// Stat card
<div className="rounded-lg border border-border bg-card p-6 
  hover:bg-accent/5 transition-colors">
  <div className="flex items-center gap-2 mb-2">
    <Icon className="h-4 w-4 text-muted-foreground" />
    <h3 className="text-sm font-medium text-muted-foreground">Label</h3>
  </div>
  <p className="text-2xl font-medium text-foreground">Value</p>
</div>
```

### Page Layout
```tsx
<div className="min-h-screen bg-background">
  <div className="mx-auto max-w-7xl px-6 py-8">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl font-medium text-foreground mb-2">
        Page Title
      </h1>
      <p className="text-muted-foreground">Description</p>
    </div>
    {/* Content */}
  </div>
</div>
```

## ✅ Design Principles Checklist

Before implementing any UI, verify:
- [ ] **One primary action per screen** - No competing CTAs
- [ ] **No numeric scores** - Use descriptive text instead
- [ ] **No red/green semantics** - Use muted, calm colors
- [ ] **Generous whitespace** - Low-density layouts
- [ ] **Subtle animations only** - Fade-in, gentle transitions
- [ ] **Clear hierarchy** - Without urgency or pressure
- [ ] **Reduces anxiety** - Calm, supportive tone

## 🚫 What NOT to Include

- ❌ Numeric scoring visuals (charts, graphs, scores)
- ❌ Red/green success/failure indicators
- ❌ Leaderboards or comparison UI
- ❌ Gamification elements (badges, achievements, streaks)
- ❌ High-contrast alert colors
- ❌ Multiple primary buttons
- ❌ Celebratory animations
- ❌ Bold (700+) font weights

## 📝 Implementation Steps

1. **Setup Theme**
   - Copy `globals.css` and `tailwind.config.ts`
   - Install `tailwindcss-animate` if not already installed
   - Verify CSS variables are working

2. **Create Base Components**
   - Button component with variants
   - Input component
   - Card component patterns
   - Layout components

3. **Update Existing Pages**
   - Replace color classes with semantic tokens
   - Update spacing to use the scale
   - Ensure one primary action per screen
   - Add generous whitespace

4. **Test & Refine**
   - Verify light/dark mode works
   - Check accessibility (focus states, contrast)
   - Ensure animations are subtle
   - Validate against design principles

## 🔗 Reference Documents

- **Full Style Guide:** `ENABLEOS_STYLE_GUIDE.md` (comprehensive)
- **Design System JSON:** `design.json` (complete specification)
- **Component Examples:** See `app/components/` directory

## 💡 Quick Tips

1. **Use semantic color tokens:**
   - `text-foreground` (primary text)
   - `text-muted-foreground` (secondary text)
   - `bg-card` (card backgrounds)
   - `border-border` (borders)

2. **Spacing consistency:**
   - Use Tailwind spacing scale: `p-4`, `p-6`, `gap-4`, `mb-8`
   - Maintain 8px base unit

3. **Transitions:**
   - Always add `transition-colors duration-300` for interactive elements
   - Use `hover:bg-accent/30` for subtle hover states

4. **Icons:**
   - Use Lucide React icons
   - Size: `h-4 w-4` for small, `h-5 w-5` for medium
   - Color: `text-muted-foreground` for secondary icons

---

**Ready to start?** Begin with copying the CSS and Tailwind config, then work through components one by one.
