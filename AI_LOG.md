# AI Log

## Tools Used
- Next.js 15 (App Router)
- TypeScript for type safety
- Tailwind CSS v4 for styling
- Framer Motion for premium animations
- Lucide React for modern icons
- TMDB API for movie data
- `localStorage` for state persistence

## Best Prompts
1. **"Implement custom pagination logic to serve exactly 12 items per page from a 20-item TMDB API response."**
   *Why it worked:* By explicitly asking for the mathematical mapping between custom page sizes and API page sizes, the model correctly generated a reliable approach using offset tracking across multiple API requests to guarantee exactly 12 items without breaking Next.js server-side rendering.

2. **"Create a glassmorphism movie card with hover effects using Framer Motion and Tailwind."**
   *Why it worked:* Providing exact design tokens (glassmorphism, Framer Motion, hover effects) gave the AI clear aesthetic constraints. This resulted in a premium Apple TV/Netflix inspired card design out-of-the-box instead of a generic HTML element.

3. **"Implement a debounced search bar hook in React that updates Next.js URL params."**
   *Why it worked:* Instead of just asking for a search bar, explicitly requesting a "hook" and "URL param updates" guided the AI to separate state logic from UI, resulting in a cleaner architecture and shareable URL state.

## What I Fixed Manually
1. **Pagination Alignment:** Manually tweaked the pagination logic within `lib/tmdb.ts`. The AI initially tried to fetch only one page from TMDB and slice it, which caused gaps on boundary pages. I manually corrected the mathematical mapping to fetch `startTMDBPage` and `endTMDBPage` and combine them.
2. **Next.js 15 searchParams Promise:** The AI generated Next.js 14-style synchronous `searchParams` usage. I manually fixed `page.tsx` and `search/page.tsx` to explicitly `await` the `searchParams` promise, resolving Next 15 build errors.
3. **Tailwind v4 CSS Resets:** The AI attempted to use `@tailwind base;` but Tailwind v4 uses `@import "tailwindcss";` and `@theme`. I manually fixed the `globals.css` file syntax to work perfectly with the newly initialized Next.js Tailwind configuration.
