# Development Tools

This document provides an overview of the development tools used in the project.

## Code Quality Tools

### ESLint and Prettier

- **ESLint**: JavaScript and TypeScript linter
- **Prettier**: Code formatter
- **Configuration**: `.eslintrc.js` and `.prettierrc.json`
- **Scripts**:
  - `npm run lint`: Check for linting issues
  - `npm run lint:fix`: Fix linting issues
  - `npm run format`: Format all files
  - `npm run format:check`: Check formatting

### TypeScript

- **Version**: 5.x
- **Configuration**: `tsconfig.json`
- **Strict Mode**: Enabled
- **Script**: `npm run typecheck`

## Git Hooks (Husky)

Husky is used to enforce code quality standards through Git hooks.

### Pre-commit Hook

Runs before each commit to ensure code quality:

- Linting with ESLint
- Formatting with Prettier

### Commit Message Hook

Validates commit messages using commitlint:

- Enforces conventional commit format
- Configuration in `commitlint.config.js`

### Pre-push Hook

Runs before pushing to remote:

- TypeScript type checking
- Unit tests

## Testing Tools

### Jest and React Testing Library

- **Jest**: JavaScript testing framework
- **React Testing Library**: React component testing
- **Configuration**: `jest.config.ts` and `jest.setup.ts`
- **Scripts**:
  - `npm test`: Run unit tests
  - `npm run test:watch`: Run tests in watch mode
  - `npm run test:coverage`: Run tests with coverage

### Playwright

- **Purpose**: End-to-end testing
- **Configuration**: `playwright.config.ts`
- **Scripts**:
  - `npm run test:e2e`: Run E2E tests
  - `npm run test:e2e:ui`: Run E2E tests with UI
  - `npm run test:e2e:debug`: Run E2E tests in debug mode

## CI/CD Tools

### GitHub Actions

- **Configuration**: `.github/workflows/`
- **Workflows**:
  - `ci.yml`: Main CI pipeline
  - `lighthouse.yml`: Lighthouse CI for performance testing
  - `bundle-analysis.yml`: Bundle size analysis

### Lighthouse CI

- **Purpose**: Performance, accessibility, and best practices testing
- **Configuration**: `lighthouse.config.ts`
- **Thresholds**:
  - Performance: 90
  - Accessibility: 95
  - Best Practices: 95
  - SEO: 95
  - PWA: 90

### Bundle Analyzer

- **Purpose**: JavaScript bundle size analysis
- **Configuration**: Next.js plugin in `next.config.ts`
- **Scripts**:
  - `npm run analyze`: Analyze both client and server bundles
  - `npm run analyze:server`: Analyze server bundle
  - `npm run analyze:browser`: Analyze client bundle

## Deployment

### Vercel

- **Configuration**: `vercel.json`
- **Features**:
  - Preview deployments
  - Production deployments
  - Custom security headers
  - Region-specific deployment

## Database

### Supabase

- **Purpose**: Backend as a Service (BaaS)
- **Features**:
  - PostgreSQL database
  - Authentication
  - Storage
  - Realtime subscriptions
- **Configuration**: Environment variables in `.env.local`
- **Type Safety**: Generated types in `src/types/supabase.ts`
