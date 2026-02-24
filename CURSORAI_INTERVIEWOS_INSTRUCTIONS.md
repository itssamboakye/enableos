# Instructions for CursorAI - InterviewOS UI Upgrade

## 🎯 Objective
Upgrade InterviewOS UI to use shadcn/ui with a specific design system configuration.

## 📋 Configuration Details

Use this **exact configuration** from shadcn/ui:

**Configuration URL:**
```
https://ui.shadcn.com/create?base=radix&style=maia&baseColor=neutral&theme=cyan&iconLibrary=hugeicons&font=outfit&menuAccent=subtle&menuColor=default&radius=large&item=preview
```

**Settings:**
- **Base:** Radix UI
- **Style:** Maia
- **Base Color:** Neutral
- **Theme:** Cyan
- **Icon Library:** Huge Icons
- **Font:** Outfit
- **Menu Accent:** Subtle
- **Menu Color:** Default
- **Border Radius:** Large

## 🚀 Setup Steps

### 1. Initialize shadcn/ui
```bash
npx shadcn@latest init
```

When prompted, use these settings:
- Style: **Maia**
- Base color: **Neutral**
- Theme: **Cyan**
- Border radius: **Large**
- Font: **Outfit**

### 2. Install Dependencies
```bash
# Install Huge Icons
npm install @hugeicons/react

# Ensure Tailwind CSS is configured
npm install -D tailwindcss postcss autoprefixer
```

### 3. Configure Outfit Font

Add to `app/layout.tsx` or `_app.tsx`:
```tsx
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

// Apply to html/body
```

### 4. Install Required Components
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add sidebar
npx shadcn@latest add dialog
npx shadcn@latest add avatar
npx shadcn@latest add badge
npx shadcn@latest add tabs
npx shadcn@latest add table
```

## 🎨 Design System Requirements

### Colors
- **Primary:** Cyan theme color for interactive elements
- **Base:** Neutral grays for backgrounds
- **Accents:** Subtle, muted highlights

### Typography
- **Font:** Outfit (400, 500, 600, 700)
- **Base size:** 16px
- **Line height:** 1.5

### Icons
- **Library:** Huge Icons (`@hugeicons/react`)
- **Import pattern:** `import { IconName } from "@hugeicons/react"`
- **Standard sizes:** 20px for buttons, 24px for headers

### Border Radius
- **Size:** Large (applied consistently)

### Spacing
- Use Tailwind spacing scale (4px base unit)
- Generous whitespace for clean layouts

## 📦 Component Patterns

### Buttons
```tsx
import { Button } from "@/components/ui/button"
import { Phone } from "@hugeicons/react"

<Button size="lg" className="gap-2">
  <Phone size={20} />
  Start Call
</Button>
```

### Cards
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

### Sidebar
```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Home, Phone } from "@hugeicons/react"

<Sidebar>
  <SidebarContent>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <Home size={20} />
          <span>Home</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarContent>
</Sidebar>
```

## 🎯 InterviewOS Context

**Product:** InterviewOS - AI coaching interview platform
- Users have voice calls with AI coaches
- Uses HumeAI for voice analysis
- Focus on clean, accessible UI for call interfaces
- Coaching-oriented, supportive design

**Key Features to Style:**
- Call interface and controls
- Coach selection/management
- Session history
- User profile
- Dashboard/analytics

## ✅ Implementation Checklist

- [ ] Initialize shadcn/ui with Maia style and Cyan theme
- [ ] Install and configure Huge Icons
- [ ] Set up Outfit font
- [ ] Install core shadcn/ui components
- [ ] Update existing components to use shadcn/ui
- [ ] Apply consistent spacing and typography
- [ ] Use large border radius throughout
- [ ] Implement subtle menu accents
- [ ] Ensure all icons use Huge Icons library
- [ ] Test light/dark mode (if applicable)

## 📝 Important Notes

1. **Always use Huge Icons** - Don't mix icon libraries
2. **Consistent radius** - Large border radius on all components
3. **Cyan theme** - Use for primary actions and interactive elements
4. **Neutral base** - Use for backgrounds and surfaces
5. **Outfit font** - Apply consistently across the app
6. **Subtle accents** - Keep menu accents subtle, not bold

## 🔗 Reference Links

- **shadcn/ui:** https://ui.shadcn.com
- **Configuration Preview:** https://ui.shadcn.com/create?base=radix&style=maia&baseColor=neutral&theme=cyan&iconLibrary=hugeicons&font=outfit&menuAccent=subtle&menuColor=default&radius=large&item=preview
- **Huge Icons:** https://hugeicons.com
- **Outfit Font:** https://fonts.google.com/specimen/Outfit

## 💡 Quick Tips

1. Use the shadcn/ui CLI to add components - it handles all the setup
2. Check the preview URL to see the exact styling
3. Import icons from `@hugeicons/react` consistently
4. Follow the Maia style guidelines for spacing and layout
5. Use Tailwind utility classes with the configured theme

---

**Ready to start?** Begin with initializing shadcn/ui, then work through components systematically.
