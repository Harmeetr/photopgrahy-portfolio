# Gallery Experience Design

## Overview

A cinematic, film-inspired gallery that feels like flipping through a photographer's contact sheet or a high-end photography book. Users scroll horizontally through curated "scenes" - clusters of 2-3 images arranged in varied layouts. A subtle film grain overlay and warm color treatment gives everything an analog, Kodak Portra aesthetic.

## User Flow

1. Enter collection → horizontal scroll through scenes
2. Click any image → split-view lightbox opens (image left, reflection right)
3. Navigate with arrow keys or click prev/next
4. If image has no reflection → fullscreen centered view instead
5. Press Escape or click outside → return to gallery

---

## Horizontal Scroll & Scene Layout

### Scroll Behavior

- Container uses CSS `overflow-x: scroll` with `scroll-snap-type: x mandatory`
- Each scene snaps to viewport center for intentional viewing
- Smooth scroll with momentum on trackpad/touch
- Keyboard support: left/right arrow keys navigate between scenes
- Progress indicator dots or subtle bar at bottom

### Scene Layouts

Auto-assigned based on position in collection:

```
Scene A: Hero          Scene B: Duo           Scene C: Cluster
┌─────────────────┐    ┌────────┬────────┐    ┌──────────┬──────┐
│                 │    │        │        │    │          │  2   │
│                 │    │   1    │   2    │    │    1     ├──────┤
│        1        │    │        │        │    │          │  3   │
│                 │    │        │        │    │          │      │
└─────────────────┘    └────────┴────────┘    └──────────┴──────┘
```

### Distribution Logic

- Images cycle through layouts: Hero → Duo → Cluster → Hero...
- Adapts to image count (e.g., 4 images: Hero, Cluster with 3)
- Landscapes favor hero/wide slots, portraits favor cluster stacks

### Spacing & Sizing

- Scene width: 100vw with 80px padding on sides
- Gap between images in a scene: 16-24px
- Images maintain aspect ratio, max-height ~80vh
- Scenes separated by 40-60px of dark space

---

## Lightbox & Split View

### Opening Behavior

- Click image → lightbox fades in (300ms ease-out)
- Background dims to near-black (rgba 0,0,0,0.95)
- Image animates from its position to lightbox position
- Film grain overlay persists in lightbox

### Split View Layout (with reflection)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   ┌─────────────────────┐    ┌──────────────────┐  │
│   │                     │    │                  │  │
│   │                     │    │  "The morning    │  │
│   │       IMAGE         │    │   light caught   │  │
│   │                     │    │   the peaks..."  │  │
│   │                     │    │                  │  │
│   └─────────────────────┘    └──────────────────┘  │
│                                                     │
│         ←                                    →      │
└─────────────────────────────────────────────────────┘
```

- Image takes ~60% width, reflection panel ~35%, gap between
- Reflection panel: cream/warm off-white background (#FAF8F5), serif font
- Text fades in slightly after image settles (200ms delay)

### Fullscreen Layout (no reflection)

- Image centered, max 90vw × 90vh
- No side panel, just the image against dark backdrop

### Navigation

- Prev/next arrows at screen edges (fade in on hover)
- Arrow keys cycle through all images
- Escape or click backdrop → close lightbox
- Swipe gestures on touch devices

---

## Film Aesthetic

### Grain Overlay

- SVG noise filter or CSS background with tiled grain PNG
- Subtle opacity (~3-5%)
- Slightly animated (slow position shift) for organic feel
- Applied via pseudo-element on body

### Color Treatment

- CSS filter on images: `sepia(8%) saturate(105%) brightness(98%)`
- Subtle warmth - Portra/Kodak Gold feel
- Shadows push warm, highlights stay neutral

### Vignette

- Radial gradient overlay from transparent center to dark edges
- Subtle opacity (~10% at corners)
- Classic analog camera look

### Image Presentation

- Border-radius: 4-6px (like physical prints)
- Soft box-shadow (large blur, low opacity)
- Hover: subtle lift (translateY -2px) + shadow deepens

### Transitions

- All movements eased (ease-out or custom bezier)
- Scene transitions: 400-500ms
- Lightbox open/close: 300ms
- Unhurried, contemplative pace

### Typography (reflection panel)

- Serif font: Lora, Merriweather, or EB Garamond
- Background: warm off-white (#FAF8F5)
- Text: dark warm gray (#3D3833)
- Line-height: 1.7

---

## Technical Notes

### Components to Create/Modify

- `HorizontalGallery.tsx` - New component for scene-based horizontal scroll
- `Scene.tsx` - Individual scene with layout variants
- `Lightbox.tsx` - Replace/enhance existing Reflection modal
- `FilmOverlay.tsx` - Grain + vignette effects
- Modify `[slug]/page.tsx` to use new gallery system

### Dependencies

- Framer Motion (already installed) for animations
- May need image dimension detection for smart layout assignment
