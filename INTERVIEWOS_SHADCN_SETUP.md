# InterviewOS - shadcn/ui Setup Guide

This guide provides instructions for setting up InterviewOS with shadcn/ui using the specified configuration.

## 🎨 Design System Configuration

**UI Framework:** [shadcn/ui](https://ui.shadcn.com) with the following settings:

### Configuration Parameters
- **Base:** Radix UI
- **Style:** Maia
- **Base Color:** Neutral
- **Theme:** Cyan
- **Icon Library:** Huge Icons
- **Font:** Outfit
- **Menu Accent:** Subtle
- **Menu Color:** Default
- **Border Radius:** Large

### Preview & Configuration URL
```
https://ui.shadcn.com/create?base=radix&style=maia&baseColor=neutral&theme=cyan&iconLibrary=hugeicons&font=outfit&menuAccent=subtle&menuColor=default&radius=large&item=preview
```

---

## 📋 Setup Instructions

### Step 1: Initialize shadcn/ui

1. **Install shadcn/ui CLI** (if not already installed):
```bash
npx shadcn@latest init
```

2. **Use the configuration wizard** with these settings:
   - Style: **Maia**
   - Base color: **Neutral**
   - Theme: **Cyan**
   - Border radius: **Large**
   - Font: **Outfit**

### Step 2: Configure components.json

Your `components.json` should include:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "maia",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

### Step 3: Install Required Dependencies

```bash
# Install Huge Icons
npm install @hugeicons/react

# Install Outfit font (via Google Fonts or npm)
# Add to your layout.tsx or _document.tsx
```

### Step 4: Add Outfit Font

**Option A: Google Fonts (Recommended)**
```tsx
// app/layout.tsx
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={outfit.className}>
        {children}
      </body>
    </html>
  )
}
```

**Option B: CSS Import**
```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
```

### Step 5: Update Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

### Step 6: Install shadcn/ui Components

Install the components you need:

```bash
# Core components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add sidebar
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add avatar
npx shadcn@latest add badge
npx shadcn@latest add tabs
npx shadcn@latest add table
```

---

## 🎯 Key Design Tokens

### Color System (Cyan Theme with Neutral Base)

The Maia style with Cyan theme provides:
- **Primary:** Cyan accent color for interactive elements
- **Base:** Neutral grays for backgrounds and surfaces
- **Subtle accents:** Soft, muted highlights
- **Large radius:** Rounded corners for modern aesthetic

### Typography
- **Font Family:** Outfit (400, 500, 600, 700 weights)
- **Base size:** 16px (adjustable via Tailwind)
- **Line height:** 1.5 (24px for base)

### Border Radius
- **Large:** Applied to all components for consistent rounded appearance

### Icons
- **Library:** Huge Icons (`@hugeicons/react`)
- **Usage:** Import and use consistently throughout the app

---

## 📦 Component Usage Examples

### Button Component
```tsx
import { Button } from "@/components/ui/button"
import { Phone } from "@hugeicons/react"

export function CallButton() {
  return (
    <Button size="lg" className="gap-2">
      <Phone size={20} />
      Start Call
    </Button>
  )
}
```

### Card Component
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export function CoachCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Coach Session</CardTitle>
        <CardDescription>Practice your interview skills</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Content */}
      </CardContent>
    </Card>
  )
}
```

### Sidebar Component
```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Home, Phone, History } from "@hugeicons/react"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Home size={20} />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Phone size={20} />
                  <span>Start Call</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
```

### Input Component
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function NameInput() {
  return (
    <div className="space-y-2">
      <Label htmlFor="name">Your Name</Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
  )
}
```

---

## 🎨 Styling Guidelines

### Color Usage
- **Primary actions:** Use cyan theme color for CTAs
- **Neutral backgrounds:** Use neutral base colors
- **Subtle accents:** Apply subtle menu accents for secondary elements

### Spacing
- Follow Tailwind's spacing scale (4px base unit)
- Use consistent padding: `p-4`, `p-6`, `p-8`
- Maintain generous whitespace for clean layouts

### Border Radius
- All components use **large** radius by default
- Consistent rounded corners throughout the app

### Icons
- Always use Huge Icons (`@hugeicons/react`)
- Standard size: `size={20}` for buttons, `size={24}` for headers
- Maintain consistent icon sizing across similar elements

---

## 🔧 Integration with HumeAI

For InterviewOS's AI coaching calls:

### Call Interface Components
```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PhoneCall, PhoneOff } from "@hugeicons/react"

export function CallControls() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-center gap-4">
        <Button size="lg" variant="default">
          <PhoneCall size={24} />
        </Button>
        <Button size="lg" variant="destructive">
          <PhoneOff size={24} />
        </Button>
      </div>
    </Card>
  )
}
```

---

## ✅ Checklist for CursorAI

When working with CursorAI, ensure:

- [ ] shadcn/ui is initialized with Maia style
- [ ] Cyan theme is applied
- [ ] Neutral base colors are used
- [ ] Outfit font is installed and configured
- [ ] Huge Icons library is installed (`@hugeicons/react`)
- [ ] Large border radius is applied
- [ ] All components use shadcn/ui components
- [ ] Subtle menu accents are implemented
- [ ] Consistent spacing and typography throughout

---

## 📝 Quick Reference

### Configuration Summary
```
Base: Radix UI
Style: Maia
Base Color: Neutral
Theme: Cyan
Icon Library: Huge Icons
Font: Outfit
Menu Accent: Subtle
Menu Color: Default
Radius: Large
```

### Key Commands
```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Add components
npx shadcn@latest add [component-name]

# Install Huge Icons
npm install @hugeicons/react
```

### Important Files
- `components.json` - shadcn/ui configuration
- `tailwind.config.ts` - Tailwind and theme config
- `app/globals.css` - Global styles and CSS variables
- `app/layout.tsx` - Font configuration

---

## 🚀 Next Steps

1. **Initialize shadcn/ui** with the configuration above
2. **Install Huge Icons** and configure Outfit font
3. **Add required components** using shadcn CLI
4. **Update existing components** to use shadcn/ui patterns
5. **Apply consistent styling** using the Maia style and Cyan theme

---

**Reference:** [shadcn/ui Documentation](https://ui.shadcn.com) | [Huge Icons](https://hugeicons.com) | [Outfit Font](https://fonts.google.com/specimen/Outfit)
