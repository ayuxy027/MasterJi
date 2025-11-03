# UI Design Guide for MasterJi Platform

## Overview
This document outlines the design principles and component guidelines for the MasterJi platform, ensuring consistency across all pages and features. The design follows a modern, clean educational platform aesthetic with a focus on accessibility and user engagement.

## Design Principles

### 1. Visual Hierarchy
- **Primary Focus**: Use the orange color (#F97316) for all primary actions and important elements
- **Secondary Elements**: Use orange-100 (#FFEDD5) for supporting elements and backgrounds
- **Text Hierarchy**: Clear distinction between headings (4xl-7xl), body text (sm-xl), and labels (sm)
- **Spacing**: Consistent 6px grid system with generous padding (4-8px) for content areas

### 2. Layout Structure
- **Grid System**: Responsive grid using Tailwind's 12-column grid system
- **Container Width**: Max-width of 7xl (896px) for content areas
- **Responsive Design**: Mobile-first approach with breakpoints at md (768px)
- **Card-based Layout**: Use rounded-2xl cards for content sections
- **Pattern Background**: Dashed grid background for hero sections only

### 3. Color Schema

#### Primary Colors
- **Orange 500** (#F97316) - Primary brand color, CTAs, important text
- **Orange 400** (#FB923C) - Secondary brand color, hover states
- **Orange 600** (#EA580C) - Darker variant for active states
- **Orange 100** (#FFEDD5) - Backgrounds, subtle highlights
- **Orange 50** (#FFFBEB) - Light background gradient

#### Neutral Colors
- **Gray 800** (#1F2937) - Dark text, content
- **Gray 100** (#F3F4F6) - Light text on dark backgrounds
- **White** (#FFFFFF) - Primary backgrounds
- **Black** (#000000) - High contrast elements

### 4. Typography

#### Font Family
- **Primary Font**: Plus Jakarta Sans (Google Fonts)
- **Font Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold), 800 (Extra-bold)
- **Letter Spacing**: -0.03em for all text

#### Typography Scale
- **Headings**: 4xl (2.25rem) for mobile, 7xl (6rem) for desktop
- **Body Text**: sm (0.875rem) to xl (1.25rem)
- **Labels**: [12px] to sm (0.875rem)
- **Buttons**: sm (0.875rem) font size with font-semibold
- **Headlines**: font-semibold or font-bold

### 5. Visual Elements

#### Icons
- Use react-icons for consistent iconography
- Size: text-lg to text-3xl depending on context
- Color: Match with text or brand colors
- Integration: Inline with text or as standalone elements

#### Images
- Aspect ratios: Maintain consistency across the platform
- Borders: Rounded-2xl for all images
- Positioning: Center-aligned in hero sections, grid-based in content sections
- Placeholder: Use consistent placeholder image format

#### Buttons
- **Primary**: bg-orange-400, text-white, px-6 py-3, rounded-lg, shadow-lg
- **Secondary**: border-2 border-orange-400, text-orange-400, px-8 py-3, rounded-lg
- **Hover**: bg-orange-100 for secondary, shadow-xl for primary
- **Transformations**: transition-all duration-300 for smooth interactions

### 6. Navigation
- **Header**: Fixed, centered, rounded-full with backdrop blur
- **Logo**: Orange-500 text with "MasterJi" branding
- **Navigation**: Centered links with orange-500 text
- **CTA Button**: bg-orange-400, white text, rounded-full
- **Mobile**: Hamburger menu with slide-in functionality

## Component Guidelines

### 1. Layout Components

#### Main Layout (Layout.tsx)
- Container div with minimum height of 100vh
- Pattern background for hero sections only (dashed grid)
- Content area with padding (px-4 sm:px-6 lg:px-8)
- Main content area (px-4 sm:px-6 lg:px-8 pt-6 pb-16)

#### Navigation (Navbar.tsx)
- Header with flex display, rounded-full container
- White/80 background with backdrop blur
- Orange 500 branding text
- Mobile-responsive with hamburger menu
- CTA button for "Join Challenge"

#### Background Pattern (Pattern.tsx)
- Dashed grid background using CSS linear gradients
- 20px spacing for grid
- Only applied to hero sections and landing page
- Intersected mask for dashed effect

### 2. Content Components

#### Hero Section (Hero.tsx)
- Responsive grid layout (1 column on mobile, 6 columns on desktop)
- Two large image cards with overlay gradients
- Center content with avatars and inspirational quotes
- Floating background elements on desktop
- Prominent CTA section with primary/secondary buttons

#### Card Components
- Rounded-2xl corners for all content cards
- Orange-100 and orange-400 background variants
- Shadow-md for subtle elevation
- Consistent padding (p-6) and spacing (gap-6)

#### Feature Cards
- Avatar groups with overlapping layout
- Text content with clear hierarchy
- Gradient overlays for image cards
- Consistent sizing and spacing

### 3. Interactive Elements

#### Buttons
- Primary: bg-orange-400, text-white, semi-bold font
- Secondary: border-orange-400, text-orange-400
- Hover states: shadow-xl for primary, bg-orange-100 for secondary
- Consistent padding (px-6 py-3 for primary, px-8 py-3 for secondary)

#### Links
- Text color: orange-500
- Hover state: orange-600
- Underline on hover for navigation links

#### Forms (to be implemented)
- Input fields with rounded-lg borders
- Orange-400 focus states
- Consistent spacing and validation styles

### 4. Page Components

#### Landing Page (Landing.tsx)
- Hero section with floating elements
- Responsive grid for content sections
- Image content with gradients
- CTA section with prominent buttons

#### Products Page
- Grid-based product showcase
- Consistent card components with product information
- Visual hierarchy with orange-400 accents
- Responsive layout with mobile-first approach

#### About Page
- Team highlights with avatar components
- Mission statement with orange-400 emphasis
- Timeline or story section with consistent spacing
- Brand values with icon integration

#### Challenge Page
- Challenge details in card format
- Timeline or progress elements
- Clear CTAs for participation
- Visual elements that reinforce the challenge theme

#### Documentation Page
- Clear navigation structure
- Well-spaced content sections
- Code blocks with consistent styling
- Search functionality integration

#### Signup Page
- Clean form layout with proper spacing
- Clear steps or progress indicators
- Consistent button and input styling
- Success/error messaging with appropriate colors

## Design Implementation Guidelines

### 1. Spacing System
- Use Tailwind's spacing scale (px, 1, 2, 3, 4, 5, 6, 8, etc.)
- Consistent padding: px-4 sm:px-6 lg:px-8 for content areas
- Consistent margins: mb-4, mb-8, mb-16 for section spacing
- Gap utilities: gap-4, gap-6, gap-8 for component spacing

### 2. Responsive Design
- Mobile-first approach with md (768px) breakpoint as primary
- Use responsive prefixes (sm:, md:, lg:, xl:) appropriately
- Maintain consistent padding and spacing across all breakpoints
- Ensure touch targets are at least 44px for mobile devices

### 3. Accessibility
- Sufficient color contrast (minimum 4.5:1 ratio)
- Semantic HTML elements for proper screen reader support
- Focus states for interactive elements
- Alt text for all images
- Proper heading hierarchy (h1-h6)

### 4. Performance
- Optimize images for web (appropriate file sizes)
- Use efficient CSS and avoid unnecessary complexity
- Minimize the use of heavy animations
- Ensure fast loading times for all components

## Figma Usage Guidelines

### 1. Document Structure
- Create separate frames for each component type
- Use consistent naming conventions:
  - Primary_Button
  - Hero_Section
  - Navbar_Desktop
  - Card_Component
- Organize by page or component type

### 2. Design System
- Create reusable components for buttons, cards, and navigation
- Use consistent spacing and typography styles
- Set up color variables matching the documented color schema
- Create text styles for headings, body text, and labels

### 3. Best Practices
- Use the 8px grid system for consistent spacing
- Maintain the same breakpoints as the codebase (md: 768px)
- Create variants for responsive layouts
- Use auto-layout for buttons and cards
- Export assets in appropriate formats (SVG for icons, WebP for images)

### 4. Component Libraries
- Create a MasterJi design system library
- Include all documented components
- Maintain version control with the codebase
- Share with team members for consistency

## Component Creation Checklist

When creating new components, ensure:

- [ ] Follows the documented color schema
- [ ] Uses proper typography hierarchy
- [ ] Responsive design principles applied
- [ ] Consistent spacing and padding
- [ ] Proper accessibility attributes
- [ ] Follows the same visual hierarchy as existing components
- [ ] Uses the same Tailwind utility classes
- [ ] Consistent border radius (rounded-2xl for cards)
- [ ] Proper shadow application (shadow-md for cards)
- [ ] Proper hover/focus states

This UI guide ensures consistency and scalability across the MasterJi platform while maintaining the established brand identity and user experience.