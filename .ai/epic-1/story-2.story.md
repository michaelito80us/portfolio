# Story 2: Advanced Infrastructure Setup

## Status: complete

## Epic: Setup & Infrastructure (Week 1-2)

## Description

Set up advanced infrastructure components including Supabase integration, enhanced CI/CD pipeline with Lighthouse CI and Bundle Analyzer, development tooling with Husky and commit hooks, and Vercel deployment configuration.

## Tasks

1. [x] Set up Supabase

   - Initialize Supabase project
   - Configure database schema for user preferences and analytics
   - Set up type-safe client with generated types
   - Add environment variables
   - Create basic connection test

2. [x] Enhance CI/CD Pipeline

   - Add Lighthouse CI configuration
   - Configure Bundle Analyzer
   - Set up size limits and performance budgets
   - Add artifact collection for reports
   - Configure branch protection rules

3. [x] Configure Development Tooling

   - Set up Husky for git hooks
   - Configure commit-lint for conventional commits
   - Add pre-commit formatting and linting
   - Add commit message validation
   - Configure pre-push test running

4. [x] Set up Vercel Deployment
   - Initialize Vercel project
   - Configure environment variables
   - Set up preview deployments
   - Configure domain settings
   - Add deployment protection rules

## Acceptance Criteria

- Supabase integration is working with type safety
- CI pipeline includes Lighthouse scores and bundle analysis
- Git hooks are properly configured and working
- Vercel deployments are successful with proper environment configuration
- All new infrastructure components are documented
- Development workflow documentation is updated with new tools

## Technical Notes

### Supabase Setup

```typescript
// Expected schema types
interface UserPreferences {
  id: string;
  theme: 'light' | 'dark' | 'system';
  widget_position: { x: number; y: number };
  created_at: string;
  updated_at: string;
}

interface AnalyticsEvent {
  id: string;
  event_type: string;
  event_data: Record<string, unknown>;
  created_at: string;
}
```

### CI/CD Enhancements

```yaml
# Lighthouse CI thresholds
thresholds:
  performance: 90
  accessibility: 95
  best-practices: 95
  seo: 95
  pwa: 90

# Bundle size limits
limits:
  - path: '/.next/static/chunks/*.js'
    maxSize: '150kB'
```

### Husky Configuration

```json
{
  "hooks": {
    "pre-commit": "npm run lint:fix && npm run format",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
    "pre-push": "npm run typecheck && npm test"
  }
}
```

## Implementation Notes

### Supabase Setup (Completed)

1. Installed @supabase/supabase-js
2. Created environment variables in .env.local
3. Implemented type-safe Supabase client
4. Created database types for tables
5. Added utility functions for preferences and analytics
6. Added comprehensive tests for client and utilities

### CI/CD Pipeline Enhancements (Completed)

1. Added Lighthouse CI configuration in lighthouse.config.ts
2. Set up GitHub Actions workflow for Lighthouse CI in .github/workflows/lighthouse.yml
3. Configured Bundle Analyzer in next.config.ts
4. Added GitHub Actions workflow for bundle analysis in .github/workflows/bundle-analysis.yml
5. Set up performance budgets and thresholds

### Development Tooling Configuration (Completed)

1. Installed Husky and configured it with npm run prepare
2. Set up pre-commit hook for linting and formatting
3. Configured commit-lint with conventional commits standard
4. Added commit message validation in commit-msg hook
5. Set up pre-push hook for type checking and testing
6. Created documentation in docs/development-tools.md

### Vercel Deployment Setup (Completed)

1. Created vercel.json with deployment configuration
2. Set up security headers and region configuration
3. Configured GitHub integration settings
4. Added environment variable handling
5. Updated documentation with deployment information

### Files Created/Modified

- src/lib/supabase/supabase.ts
- src/lib/supabase/supabase.test.ts
- src/types/supabase.ts
- src/lib/supabase/preferences.ts
- src/lib/supabase/preferences.test.ts
- .env.local
- lighthouse.config.ts
- .github/workflows/lighthouse.yml
- .github/workflows/bundle-analysis.yml
- next.config.ts (updated)
- .husky/pre-commit
- .husky/commit-msg
- .husky/pre-push
- commitlint.config.js
- docs/development-tools.md
- vercel.json
- package.json (updated)

### Commands Run

```bash
npm install @supabase/supabase-js --legacy-peer-deps
npm install -D @commitlint/cli @commitlint/config-conventional husky
npx husky init
```

## Commands to Run

To be filled during implementation.

## Test Coverage Requirements

- Supabase connection and type generation tests
- CI pipeline verification tests
- Git hook integration tests
- Vercel deployment smoke tests

## Documentation Requirements

- Update development workflow with new tools
- Add Supabase integration guide
- Document CI/CD pipeline enhancements
- Add git hooks documentation
- Create deployment guide
