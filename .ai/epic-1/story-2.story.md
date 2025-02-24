# Story 2: Advanced Infrastructure Setup

## Status: in_progress

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

2. [ ] Enhance CI/CD Pipeline
   - Add Lighthouse CI configuration
   - Configure Bundle Analyzer
   - Set up size limits and performance budgets
   - Add artifact collection for reports
   - Configure branch protection rules

3. [ ] Configure Development Tooling
   - Set up Husky for git hooks
   - Configure commit-lint for conventional commits
   - Add pre-commit formatting and linting
   - Add commit message validation
   - Configure pre-push test running

4. [ ] Set up Vercel Deployment
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
  - path: "/.next/static/chunks/*.js"
    maxSize: "150kB"
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

### Files Created/Modified

- src/lib/supabase.ts
- src/lib/supabase.test.ts
- src/types/supabase.ts
- src/lib/preferences.ts
- src/lib/preferences.test.ts
- .env.local

### Commands Run

```bash
npm install @supabase/supabase-js --legacy-peer-deps
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
