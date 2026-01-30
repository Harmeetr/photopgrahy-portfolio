# Changelog

All notable changes to the photography portfolio will be documented in this file.

## [1.1.0] - 2025-01-30

### 🔍 Lightbox with Zoom/Pan Functionality
- **Click to zoom** - Single click on image zooms to 2.5x centered on click position
- **Drag to pan** - When zoomed, drag the image to explore different areas
- **Scroll to zoom** - Mouse wheel adjusts zoom level (1x to 4x range)
- **Keyboard controls** - Use `+`/`-` keys to zoom, `Escape` to reset or close
- **Touch support** - Touch drag for panning on mobile devices
- **Zoom controls** - Added zoom in/out buttons in bottom-right corner
- **Visual feedback** - Cursor changes to indicate zoom state, shows zoom instructions

### 🖼️ Lazy Loading Optimization
- **Blur placeholders** - All images now show a warm, dark blur placeholder while loading
- **Progressive loading** - Images fade in smoothly when loaded
- **Smart priority loading** - First visible images load eagerly, others lazy load
- **Memoized components** - Scene and Filmstrip components optimized to prevent unnecessary re-renders
- **Loading indicators** - Subtle pulse animation during image load

### 🔎 SEO Improvements
- **Enhanced metadata** - Comprehensive meta tags for all pages with proper titles and descriptions
- **Open Graph tags** - Full OG support with images for social sharing
- **Twitter Cards** - Large image cards for Twitter/X sharing
- **Canonical URLs** - Proper canonical links on all pages
- **Robots.txt** - Auto-generated robots.txt with sitemap reference
- **Sitemap.xml** - Dynamic sitemap including all static and collection pages
- **Web manifest** - PWA-ready manifest for add-to-homescreen
- **Structured data** - Semantic HTML with proper heading hierarchy

### ⚡ Performance Improvements
- **Image optimization** - AVIF/WebP format support, optimized device sizes
- **Font optimization** - Added `display: swap` to all fonts for faster rendering
- **Caching headers** - Static assets cached for 1 year, security headers added
- **React strict mode** - Enabled for better development practices
- **Content visibility** - Images use `content-visibility: auto` for render optimization

### 🎨 UX Improvements
- **Skip to content link** - Accessibility improvement for keyboard navigation
- **Focus visible styles** - Clear focus indicators for keyboard users
- **Reduced motion** - Respects `prefers-reduced-motion` user preference
- **Touch targets** - Minimum 44px touch targets on mobile
- **Selection styling** - Custom selection color matching theme
- **Semantic HTML** - Replaced divs with proper `article`, `header`, `nav`, `footer` elements
- **ARIA labels** - Improved screen reader support throughout
- **Better alt text** - Descriptive alt text for all images
- **Line clamping** - Text overflow handling for collection descriptions

### 📁 New Files
- `src/app/sitemap.ts` - Dynamic sitemap generation
- `src/app/robots.ts` - Robots.txt configuration
- `src/app/about/AboutClient.tsx` - Client component split for better SSR
- `src/components/OptimizedImage.tsx` - Reusable optimized image component
- `public/site.webmanifest` - PWA manifest
- `CHANGELOG.md` - This file

### 🔧 Technical Changes
- Updated `next.config.js` with security headers and caching
- Enhanced `globals.css` with accessibility utilities
- Split About page into server/client components for proper metadata
- Memoized gallery components for performance

---

## [1.0.0] - Initial Release

- Dark, contemplative photography portfolio
- Horizontal scrolling gallery with scene-based layouts
- Reflection system for image captions
- Framer Motion animations
- Tailwind CSS styling with warm color palette
