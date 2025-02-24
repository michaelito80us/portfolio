# Professional Portfolio Website

A modern, high-performance portfolio website built with Next.js 15.1.7 and React 19, showcasing technical expertise and best practices in web development.

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

## Prerequisites

- Node.js 20.x LTS
- npm 10.x or newer

## Quick Start

1. Clone the repository:

   ```bash
   git clone [repository-url]
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

```
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

## Development

### Code Style

This project uses ESLint and Prettier for code formatting. Configuration can be found in:

- `.eslintrc.json`
- `.prettierrc.json`

### Testing

- Unit/Integration tests: Jest + React Testing Library
- E2E tests: Playwright
- Visual regression: Playwright
- Accessibility testing: axe-core

### Performance Monitoring

- Lighthouse CI for performance metrics
- Web Vitals monitoring
- Bundle size analysis

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Three.js](https://threejs.org)
- [Playwright](https://playwright.dev)
