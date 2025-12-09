# Project Context

## Purpose

A travel company website focussing on rail products. The project features static pages, interactive components, a blog system, and modern responsive design. It's designed to be easily customizable and extensible for travel/tourism businesses.

## Tech Stack

- **Astro 5.16.0** - Web framework with SSR (Server-Side Rendering) enabled
- **React 19.2.0** - For interactive UI components (Products filtering)
- **TypeScript** - Type safety across the project (strict mode enabled)
- **Tailwind CSS v4** - Utility-first CSS framework with Vite plugin
- **Astro DB** - Built-in database solution for blog articles

## Project Conventions

### Code Style

- TypeScript strict mode enabled (extends `astro/tsconfigs/strict`)
- JSX configured with `react-jsx` import source
- Component files use `.astro` extension for Astro components and `.tsx` for React components
- Utility-first styling approach with Tailwind CSS classes
- No explicit ESLint or Prettier configuration (project follows default conventions)

### Architecture Patterns

- **Server-Side Rendering (SSR)**: The project uses `output: 'server'` mode in Astro config
- **Islands Architecture**: React components embedded in Astro pages for interactivity (e.g., Products.tsx)
- **File-based routing**: Pages in `src/pages/` automatically become routes
- **Layout system**: Base layout template in `src/layouts/Layout.astro`
- **Database-driven content**: Blog articles stored in Astro DB, fetched dynamically on each request
- **Component organization**:
  - `.astro` files for static/server-rendered components
  - `.tsx` files for interactive React components
  - Shared layouts in `src/layouts/`
  - Reusable components in `src/components/`

### Testing Strategy

No formal testing framework is currently configured. This is a starter template intended for developers to add their own testing approach as needed.

### Git Workflow

- **Main branch**: `main`
- **Feature branches**: Team follows feature branch workflow (e.g., `team-glasgow-trains`)
- **Pull Requests**: Changes merged via PRs to main branch
- **Commit style**: Standard descriptive commits (e.g., "added server", "added image to readme")

## Domain Context

**Travel/Tourism Industry**: The application manages travel packages, blog articles about travel destinations, and company information. Key domain concepts:

- **Products**: Travel packages with categories (Beach, Mountain, City) and price ranges
- **Blog Articles**: Travel guides and destination information with categories, authors, and publication dates
- **Company Pages**: About, Contact, and general information pages

## Important Constraints

- **Database auto-seeding**: Astro DB is automatically created and seeded with sample data each time `npm run dev` runs
- **SSR requirement**: All pages are server-rendered; no static site generation is used for blog pages
- **No backend for contact form**: Contact form is HTML-only with no backend processing
- **Development port**: Local dev server runs on `localhost:4321`

## External Dependencies

- No external APIs or services currently integrated
- Database is self-contained using Astro DB (not an external service)
- Static assets served from `/public` and `/src/assets`
- Potential deployment platforms: Any Node.js-compatible hosting (Vercel, Netlify, etc.)
