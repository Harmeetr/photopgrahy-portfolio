# Photography Portfolio Design

## Overview

A contemplative photography portfolio for `photos.harmeetrai.com` - a dark, intimate gallery experience that showcases photography and cinematography capturing human connection and the beauty of the world.

## Vision & Principles

**Core feeling:** Calm, sacred, unhurried. Like viewing work in a dimly lit gallery at night.

**Design principles:**
- Dark and intimate - images emerge from shadow
- Quiet minimalism - generous whitespace, sparse typography
- The work speaks first - your voice is present but never intrusive
- Video as ambient texture - moving photographs, not "videos to watch"

## User Experience

### Entry

Visitors arrive at a near-black landing page. Your name or a simple mark, perhaps a single slowly-fading-in image. A gentle invitation to enter ("Enter" or "View Work") that fades in after a moment. No flashy hero section.

### Navigation

Minimal and unobtrusive. A small, fixed element (top corner or side) with:
- Collections
- About

Navigation fades to near-invisible when scrolling through a gallery, reappearing on hover or pause.

### Collections Page

A quiet grid or staggered layout. Each collection represented by a single cover image emerging from darkness, with the title in understated type. Hover reveals a soft glow or slight zoom - nothing jarring.

### Inside a Collection (Gallery Flow)

Fluid vertical scroll. Images appear one at a time, full-width or near-full-width, floating in darkness.

- Images fade and softly scale in as they enter the viewport
- Generous vertical spacing between images (30-50vh gaps)
- Video clips appear identically to photos - autoplaying, muted, looping seamlessly, no controls
- Subtle progress indicator (thin line or dots) showing position in the journey

### Hidden Reflections

A small, subtle icon on images that have writing attached (faint `+` or `◦`). On click/tap, your words fade in - overlaid on the darkened image or sliding in from the side. Dismissable with another click or scroll.

### About Section

Same dark atmosphere. A photo of you or representing you. A few paragraphs about your philosophy - why you shoot, what connection means to you. Sparse, honest. A simple way to reach you (email or Instagram icon).

## Technical Architecture

### Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14 (App Router) | Image optimization, static generation, Vercel-native |
| Styling | Tailwind CSS | Utility-first, easy to learn, co-located styles |
| Animations | Framer Motion | Smooth fade/scale transitions, scroll-triggered reveals |
| Content | Markdown + local images | Folders per collection, frontmatter for metadata |
| Video | MP4/WebM in repo | Autoplay muted loops, no external hosting needed |
| Deployment | Vercel | Auto-deploys on git push, image optimization |
| Domain | photos.harmeetrai.com | Subdomain pointed to Vercel |

### Folder Structure

```
photography-portfolio/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout (dark theme, fonts)
│   ├── collections/
│   │   ├── page.tsx          # Collections grid
│   │   └── [slug]/
│   │       └── page.tsx      # Individual collection gallery
│   └── about/
│       └── page.tsx          # About page
├── components/
│   ├── Navigation.tsx        # Minimal nav, fades on scroll
│   ├── CollectionCard.tsx    # Cover image + title for grid
│   ├── GalleryImage.tsx      # Image with fade-in animation
│   ├── GalleryVideo.tsx      # Looping video (moving photograph)
│   ├── Reflection.tsx        # Hidden text overlay component
│   └── ProgressIndicator.tsx # Scroll position indicator
├── content/
│   └── collections/
│       ├── tokyo-2023/
│       │   ├── meta.md       # title, date, cover, description
│       │   └── media/
│       │       ├── 01.jpg
│       │       ├── 01.md     # Optional reflection for this image
│       │       ├── 02.mp4    # Looping video clip
│       │       └── 03.jpg
│       └── strangers/
│           ├── meta.md
│           └── media/
│               └── ...
├── lib/
│   └── collections.ts        # Functions to read/parse collections
├── public/
│   └── fonts/                # Custom fonts if needed
├── docs/
│   └── plans/
│       └── this file
├── tailwind.config.js
├── next.config.js
└── package.json
```

### Content Format

**Collection metadata (`meta.md`):**

```yaml
---
title: "Tokyo, 2023"
date: "2023-11-15"
cover: "media/01.jpg"
description: "A week wandering through quiet mornings and neon nights."
order: 1
---
```

**Image reflection (`01.md`):**

```yaml
---
image: "01.jpg"
---

I found this corner at 5am. The city was still asleep but the light was already awake.
```

### Image Handling

- Next.js `<Image>` component for automatic optimization
- WebP/AVIF conversion, lazy loading, responsive srcsets
- Blur placeholder generated for fade-in-from-shadow effect
- Images stored in repo (manageable at ~100 images)

### Video Handling

- MP4 (H.264) or WebM format
- Compressed: 1080p max, optimized bitrate
- `<video autoplay muted loop playsinline>` - no controls
- Styled identically to images
- Lazy-loaded via Intersection Observer

### Animations

Using Framer Motion + Intersection Observer:
- Images/videos start slightly transparent and scaled down (0.95)
- Fade up and scale to full as they enter viewport
- Slow easing: 0.8-1.2s duration
- Creates "emerging from darkness" feeling

## Visual Specifications

### Colors

```
Background:    #0a0a0a (near-black)
Surface:       #141414 (subtle elevation)
Text primary:  #e5e5e5 (off-white)
Text muted:    #737373 (soft gray)
Accent:        #a3a3a3 (for hover states)
```

### Typography

- Primary: Inter or similar refined sans-serif
- Alternative: Cormorant for a subtle serif option
- Sizes: Sparse, mostly body text. Titles understated.
- Weight: Light to regular. Nothing bold or shouty.

### Spacing

- Generous vertical gaps between gallery images (30-50vh)
- Comfortable padding on all sides
- Let the darkness be part of the composition

## What We're Not Building

- No CMS or admin dashboard
- No image upload interface
- No comments, likes, or social features
- No e-commerce or print sales
- No blog
- No search functionality
- No complex filtering or tags
- No analytics dashboard (Vercel Analytics can be added later)

## Future Considerations (Not Now)

- Cloudinary migration if library grows significantly
- Contact form for inquiries
- Password-protected collections for client work

## Sources & Inspiration

Research conducted on photography portfolio best practices:
- [Pixpa - Photography Portfolio Examples](https://www.pixpa.com/blog/photography-portfolio-websites)
- [Site Builder Report - Photography Portfolios](https://www.sitebuilderreport.com/inspiration/photography-portfolios)
- [Siteinspire - Minimal Photography Portfolios](https://www.siteinspire.com/websites/categories/minimal/photography/portfolio)
- [Framer - Parallax Scrolling Examples](https://www.framer.com/blog/parallax-scrolling-examples/)
- [Cloudinary + Next.js Integration](https://cloudinary.com/guides/front-end-development/integrating-cloudinary-with-next-js)
- [Vercel - Fast Animated Image Gallery](https://vercel.com/customers/building-a-fast-animated-image-gallery-with-next-js)
