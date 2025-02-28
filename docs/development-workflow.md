# Development Workflow

## Overview

This document outlines the development workflow and practices for the portfolio project.

## Branch Strategy

- `main` - Production branch, protected
- `develop` - Development branch, protected
- Feature branches: `feature/{feature-name}`
- Bug fixes: `fix/{bug-description}`
- Releases: `release/v{version}`

## Development Process

1. **Starting New Work**

   - Create branch from `develop`
   - Follow branch naming convention
   - Update task status in relevant story file

2. **Development**

   - Follow TDD approach where applicable
   - Ensure all tests pass locally
   - Meet code coverage requirements
   - Follow code style guidelines
   - Run `npm run typecheck` for type safety

3. **Pre-commit Checklist**

   - Run `npm run lint:fix` for linting
   - Run `npm run format` for formatting
   - Run `npm test` for unit tests
   - Run `npm run test:e2e` for E2E tests
   - Run `npm run build` to verify build

4. **Commit Guidelines**

   - Use conventional commits format:
     - `feat:` for new features
     - `fix:` for bug fixes
     - `docs:` for documentation
     - `test:` for test additions/modifications
     - `refactor:` for code refactoring
     - `style:` for formatting changes
     - `chore:` for maintenance tasks

   > **Note:** Commit messages are automatically validated using commitlint to ensure they follow the conventional commits format. The pre-commit hook will run linting and formatting, while the pre-push hook will run type checking and tests.

5. **Pull Request Process**

   - Create PR against `develop`
   - Fill out PR template
   - Request review from team members
   - Address review comments
   - Squash and merge when approved

6. **Deployment**
   - Automated deployment to staging from `develop`
   - Release branches for production deployments
   - Tag releases with semantic versioning

### Vercel Deployment

The project is configured for deployment on Vercel with the following features:

- Preview deployments for all branches and PRs
- Production deployment from the `main` branch
- Custom security headers
- Region-specific deployment (SFO1)
- Legacy peer dependencies support for React 19

To deploy manually:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Quality Standards

- TypeScript strict mode enabled
- 90%+ test coverage for new code
- All accessibility tests must pass
- Zero linting errors
- Successful build required
- Performance budget adherence

## Available Scripts

```bash
# Development
npm run dev         # Start development server
npm run build      # Build for production
npm run start      # Start production server

# Quality Checks
npm run lint       # Check for linting issues
npm run lint:fix   # Fix linting issues
npm run format     # Format code
npm run typecheck  # Check TypeScript types

# Testing
npm test          # Run unit tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:e2e     # Run E2E tests
npm run test:e2e:ui  # Run E2E tests with UI
```

## CI/CD Pipeline

The GitHub Actions workflow includes:

1. Code quality checks
2. Unit tests
3. E2E tests
4. Build verification
5. Automated deployment to staging
6. Production deployment (manual trigger)
