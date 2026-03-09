# Dynamic 3D Hotel Landing SPA

A React + Vite single-page app that renders 3D scrollable, SEO-conscious landing pages for multiple hotel clients. All content is driven from per-hotel JSON files; data is accessed via RTK Query.

## Tech stack

- **React 18** + **Vite** + **TypeScript**
- **Redux Toolkit** + **RTK Query** for data (static JSON as API)
- **Tailwind CSS** with semantic color tokens (`bg-primary-blue`, `text-accent-gold`, etc.)
- **React Three Fiber** + **@react-three/drei** for 3D hero; **Framer Motion** for scroll
- **React Router** with dynamic `/:hotelSlug` routes
- **react-helmet-async** for per-hotel SEO and JSON-LD

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The home page lists hotels; click one to open its landing page at `/:hotelSlug`.

## Adding a new hotel client

1. **Assets**  
   Create folder `public/assets/<hotel-slug>/` and add optimized images (WebP/AVIF recommended), e.g.:
   - `hero-1.webp`, `logo.webp`, `pool-sunset.webp`
   - `rooms/room-name-1.webp` for room images

2. **Hotel JSON**  
   Create `public/data/hotels/<hotel-slug>.json` using the same structure as existing files (e.g. `ocean-breeze-resort-goa.json`). Include:
   - `slug`, `name`, `tagline`, `shortDescription`
   - `location` (address, latitude, longitude, city, country, mapUrl)
   - `ratings` (google.score, google.reviewCount, overall, stars)
   - `topPositiveComments`, `highlights`, `amenities`
   - `gallery` (url, alt, category)
   - `rooms` (name, description, maxGuests, sizeSqm, highlights, images)
   - `channels` (name, url, label, rating) for OTAs
   - `seo` (title, metaDescription, keywords)
   - `3dScene` (style, primaryImage, cameraPath array with scroll/position/lookAt keyframes)

3. **Index**  
   Add an entry to `public/data/hotels/index.json`:
   ```json
   {
     "slug": "your-hotel-slug",
     "name": "Your Hotel Name",
     "primaryColor": "primary-blue",
     "secondaryColor": "accent-gold",
     "logoUrl": "/assets/your-hotel-slug/logo.webp"
   }
   ```

4. **Build & deploy**  
   Run `npm run build`. The app will serve the new hotel at `/#/your-hotel-slug` or `/your-hotel-slug` depending on your router/hosting setup. For a custom domain per client, point the domain to the same build and use path or hash routing to the slug.

## Project structure

- `src/services/baseApi.ts` – RTK Query base (baseUrl, headers)
- `src/services/hotelApi.ts` – `getHotelsIndex`, `getHotelBySlug`
- `src/store/store.ts` – Redux store with API middleware
- `src/router/AppRouter.tsx` – `/` (hotel list), `/:hotelSlug` (landing)
- `src/pages/HotelLandingPage.tsx` – Fetches hotel by slug, composes sections
- `src/components/Hero3DSection.tsx` – 3D/static hero with scroll-driven camera
- `src/components/3d/HeroScene.tsx` – R3F scene (plane + camera path)
- `src/components/HotelSEO.tsx` – Helmet + JSON-LD from hotel data
- Other sections: HighlightsSection, RoomsSection, ReviewsSection, LocationSection, ChannelsSection, FooterSection

## Conventions

- **Data**: All data via RTK Query; no axios/fetch in components.
- **Colors**: Use Tailwind semantic tokens from `tailwind.config.js` only (no hardcoded hex in components).
- **Responsive**: Mobile-first; sections stack on small screens and use grids on larger breakpoints.
- **3D**: Hero uses 3D on viewport ≥768px and when `prefers-reduced-motion` is not set; otherwise a static hero image is shown.
