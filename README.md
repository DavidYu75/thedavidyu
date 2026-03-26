# David Yu — Personal Website

A personal portfolio website showcasing my background, work experience, projects, and contact information.

## Tech Stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS, CSS Modules
- **Animations:** Framer Motion, GSAP
- **Icons:** React Icons, Heroicons, Lucide React
- **Font:** DM Sans (Google Fonts via `next/font`)

## Features

- Custom loading screen with wavy water-fill animation
- Typewriter effect cycling through role descriptions
- Interactive scrollable video hero section
- Experience timeline with company logos and detail pages
- Project showcase grid with individual project pages
- Contact section with social links
- Responsive design with mobile navigation

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
  app/           — Pages and layouts (home, experience/[slug], projects/[slug])
  components/    — UI components (sections, layout, loading screen)
  data/          — Content data (experience, projects, about)
  styles/        — CSS Modules and global styles
public/
  images/        — Profile, project, and company images
  videos/        — Video assets
```
