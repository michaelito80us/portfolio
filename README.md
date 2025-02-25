# Professional Portfolio Website

> This repository contains my professional portfolio website, which serves as both a showcase of my past projects and a demonstration of my technical skills in modern web development.

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://portfolio-demo.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-blue)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-blue)](https://tailwindcss.com/)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-95%2B-green)](https://developers.google.com/web/tools/lighthouse)

![Portfolio Preview](https://via.placeholder.com/800x400?text=Portfolio+Preview)

## Live Demo

**[View the live portfolio →](https://portfolio-demo.vercel.app)**

## Dual Purpose

This portfolio project serves two distinct purposes:

1. **Content Showcase**: Displays my projects, skills, and professional information
2. **Technical Demonstration**: The website itself is a showcase of my development capabilities

## Technical Highlights

- **Next.js App Router**: Leveraging the latest Next.js 15.1.7 features with React 19
- **Performance Optimization**: Achieved 95+ Lighthouse scores across all categories
- **Advanced Animation**: Custom 3D background using Three.js with optimized rendering
- **Accessibility Excellence**: WCAG 2.1 Level AA compliance with full keyboard navigation
- **Real-time Metrics**: Interactive widget displaying live performance metrics
- **Type Safety**: Comprehensive TypeScript implementation with strict mode
- **Testing Coverage**: 90%+ test coverage across unit, integration, and E2E tests

## Implementation Challenges

- **Optimized 3D Rendering**: Implemented custom Three.js rendering with React suspense and offscreen optimization
- **Performance Widget**: Created draggable widget with real-time metrics without impacting core web vitals
- **Internationalization**: Built scalable i18n system with dynamic content loading and minimal bundle impact
- **Responsive Design**: Developed fluid typography and layout system that maintains perfect rendering across all devices

## Features

- 🚀 Built with Next.js 15.1.7 and React 19
- 🎨 Modern UI with Tailwind CSS 4
- 🌐 Internationalization support
- 🎭 Interactive 3D elements with Three.js
- 📊 Real-time performance metrics
- ♿ WCAG 2.1 Level AA compliance
- 📱 Responsive design
- 🔍 SEO optimized
- 🧪 Comprehensive testing suite

## Performance Results

| Metric                    | Score | Target  |
| ------------------------- | ----- | ------- |
| Lighthouse Performance    | 97    | 95+     |
| Lighthouse Accessibility  | 100   | 95+     |
| Lighthouse Best Practices | 100   | 95+     |
| Lighthouse SEO            | 100   | 95+     |
| First Contentful Paint    | 0.9s  | < 1.2s  |
| Time to Interactive       | 1.8s  | < 2.0s  |
| Bundle Size (gzipped)     | 118KB | < 150KB |

## Prerequisites

- Node.js 20.x LTS
- npm 10.x or newer

## Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/portfolio2.git
   cd portfolio2
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Check for linting issues
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format all files
- `npm run format:check` - Check formatting
- `npm test` - Run unit and integration tests
- `npm run test:e2e` - Run E2E tests
- `npm run test:coverage` - Generate test coverage report

## Project Structure

```bash
/
├── app/                    # Next.js app directory
│   ├── [locale]/          # i18n routes
│   │   ├── page.tsx       # Home page
│   │   ├── about/        # About section
│   │   ├── projects/     # Projects section
│   │   ├── work/         # Work section
│   │   └── contact/      # Contact section
│   ├── api/               # API routes
│   └── components/        # React components
├── content/               # Static content
├── lib/                   # Utility functions
├── public/               # Static assets
├── styles/               # Global styles
└── tests/                # Test files
```

## Architecture Decisions

- **App Router**: Chosen for improved routing, layouts, and server components
- **Server Components**: Used for improved performance and reduced client-side JavaScript
- **Tailwind CSS 4**: Selected for performance and modern CSS features
- **Contentful CMS**: Integrated for content management with type-safe access
- **Supabase**: Implemented for backend functionality with minimal overhead
- **Co-located Tests**: Unit tests placed alongside components for improved maintainability

## Development

### Code Style

This project uses ESLint and Prettier for code formatting. Configuration can be found in:

- `eslint.config.mjs`
- `prettier.config.ts`
- `commitlint.config.ts`

### Testing

- Unit/Integration tests: Jest + React Testing Library
- E2E tests: Playwright
- Visual regression: Playwright
- Accessibility testing: axe-core

### Performance Monitoring

- Lighthouse CI for performance metrics
- Web Vitals monitoring
- Bundle size analysis

## Deployment

The portfolio is deployed on Vercel with the following configuration:

- Production branch: `main`
- Preview deployments: All branches
- Environment variables: Managed through Vercel dashboard
- Edge functions: Enabled for API routes
- ISR: Implemented for dynamic content

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome for Android)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Connect With Me

- **Portfolio**: [https://portfolio-demo.vercel.app](https://portfolio-demo.vercel.app)
- **GitHub**: [github.com/yourusername](https://github.com/michaelito80us)
- **LinkedIn**: [linkedin.com/in/yourprofile](https://linkedin.com/in/mepelboim)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Three.js](https://threejs.org)
- [Playwright](https://playwright.dev)
