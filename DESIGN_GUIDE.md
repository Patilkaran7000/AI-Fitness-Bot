# 🎨 Apple-Inspired Design System

## Overview
This application features a modern, premium design inspired by Apple's design language, featuring clean aesthetics, smooth animations, and glassmorphism effects.

## Design Principles

### 1. **Minimalism & Clarity**
- Clean, uncluttered interfaces
- Generous white space
- Clear visual hierarchy
- Focus on content

### 2. **Premium Feel**
- Subtle shadows and depth
- Smooth transitions (0.3s cubic-bezier)
- Glassmorphism effects (frosted glass)
- High-quality gradients

### 3. **Typography**
- **Font**: SF Pro Display (Apple system font)
- **Large, Bold Headings**: 800 weight for hero sections
- **Body Text**: 400-600 weight, 1.6 line height
- **Letter Spacing**: Tight (-0.02em to -0.01em) for large text

## Color Palette

### Primary Colors
- **Apple Blue**: `#007AFF` (Main brand color)
- **Light Blue**: `#5AC8FA` (Gradients, accents)
- **Apple Red**: `#FF375F` (Secondary actions, alerts)

### Neutral Colors
- **Text Black**: `#1D1D1F` (Primary text)
- **Text Gray**: `#86868B` (Secondary text)
- **Background**: `#F5F5F7` (Page background)
- **White**: `#FFFFFF` (Cards, papers)

### Gradients
```css
/* Blue Gradient */
linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)

/* Red Gradient */
linear-gradient(135deg, #FF375F 0%, #FF6482 100%)

/* Background Gradients */
linear-gradient(180deg, rgba(0, 122, 255, 0.03) 0%, rgba(245, 245, 247, 0.5) 100%)
```

## Components

### Navigation Bar
- **Style**: Frosted glass with blur effect
- **Position**: Sticky top
- **Background**: `rgba(255, 255, 255, 0.8)` + `blur(20px)`
- **Border**: `1px solid rgba(0, 0, 0, 0.05)`
- **Active State**: Blue background with 8% opacity

### Cards & Papers
- **Border Radius**: 18-24px (signature Apple curves)
- **Background**: `rgba(255, 255, 255, 0.9)` with backdrop-filter
- **Shadow**: Subtle `0 8px 32px rgba(0, 0, 0, 0.06)`
- **Hover**: Transform up 4px + deeper shadow

### Buttons
- **Border Radius**: 980px (pill shape)
- **Padding**: 10px 22px
- **Font Weight**: 500-600
- **Hover**: Transform up 2px + shadow
- **Primary**: Gradient background
- **Text Transform**: None (sentence case)

### Chat Interface
- **Messages**: Rounded corners (20px base, 4px for tail)
- **User Messages**: Blue gradient background
- **AI Messages**: White with subtle shadow
- **Avatar Icons**: 32px rounded squares with gradient
- **Input**: Rounded (20px), focus state with blue glow

### Form Elements
- **Border Radius**: 12px
- **Focus State**: Blue border + shadow glow
- **Hover**: Subtle lift (1-2px transform)
- **Transitions**: 0.3s cubic-bezier(0.4, 0, 0.2, 1)

## Animations

### Timing Function
```css
cubic-bezier(0.4, 0, 0.2, 1) /* Apple's standard easing */
```

### Common Animations
- **Fade In**: Opacity 0→1 + translateY 10px→0
- **Scale In**: Scale 0.95→1 + opacity 0→1
- **Hover Lift**: translateY 0→-4px
- **Button Click**: Scale 1→0.98

### Material-UI Transitions
- `<Fade>`: 800ms for hero sections
- `<Zoom>`: 300ms for chat messages
- Staggered delays: 50ms between items

## Responsive Design

### Breakpoints
- **xs**: 0-600px (Mobile)
- **sm**: 600-960px (Tablet)
- **md**: 960-1280px (Desktop)
- **lg**: 1280px+ (Large Desktop)

### Typography Scaling
```javascript
fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }
```

## Glassmorphism

### CSS Properties
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(20px) saturate(180%);
-webkit-backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(0, 0, 0, 0.05);
```

### Usage
- Navigation bar
- Chat interface
- Cards on hover
- Input fields

## Accessibility

### Focus States
- 2px blue outline with 2px offset
- Border radius 4px
- Clear visibility

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Color Contrast
- Text/Background: WCAG AA compliant
- Interactive elements: Clear hover/focus states

## Markdown Rendering

### Tables
- Border collapse
- Rounded corners (12px)
- Header background: `rgba(0, 122, 255, 0.08)`
- Row borders: `rgba(0, 0, 0, 0.06)`

### Typography
- **Bold**: `font-weight: 700`, color: `#007AFF`
- **Headings**: Blue color with tight letter-spacing
- **Lists**: 20px left margin, 8px bottom spacing
- **Code**: Background: `rgba(0, 122, 255, 0.08)`, rounded 6px

## Icons

### Style
- Material-UI Icons
- Gradient backgrounds for logo/avatars
- 32-40px for feature icons
- 20-24px for inline icons

### Logo
- 36x36px rounded square (10px radius)
- Blue gradient background
- White icon
- Drop shadow for depth

## Spacing System

### Scale
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px

### Container Padding
- Mobile: 16px (2)
- Tablet: 24px (3)
- Desktop: 32px (4)

## Best Practices

1. **Always use transitions** on interactive elements
2. **Maintain consistent border radius** (12px, 18px, 24px)
3. **Use gradients sparingly** for emphasis
4. **Keep shadows subtle** - less is more
5. **Test on light mode** - design optimized for light
6. **Ensure smooth animations** - 60fps target
7. **Mobile-first approach** - scale up for desktop

## Performance

### Optimizations
- Use `transform` over position changes
- GPU acceleration with `will-change` (sparingly)
- Debounce search inputs
- Lazy load images if added
- CSS transitions over JavaScript

## Future Enhancements

- [ ] Dark mode support
- [ ] Custom loading skeletons
- [ ] Micro-interactions on buttons
- [ ] Advanced table sorting/filtering
- [ ] Image support in chat
- [ ] Voice input UI

---

**Design System Version**: 1.0  
**Last Updated**: January 2026  
**Framework**: React + Material-UI v5
