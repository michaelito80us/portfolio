# Story 3: Testing Infrastructure

## Status: complete

## Epic: Setup & Infrastructure (Week 1-2)

## Description

Set up comprehensive testing infrastructure including Jest for unit and integration tests, React Testing Library for component testing, Playwright for E2E testing, and visual regression testing. Implement test utilities, custom matchers, and accessibility testing.

## Tasks

1. [x] Set up Jest with React Testing Library

   - Configure Jest with TypeScript support
   - Set up React Testing Library with custom renders
   - Create test utilities and helpers
   - Implement custom matchers
   - Configure code coverage reporting

2. [x] Implement E2E Testing with Playwright

   - Set up Playwright configuration
   - Create base test utilities
   - Implement device profiles
   - Configure CI integration
   - Add visual testing capabilities

3. [x] Create Accessibility Testing Framework

   - Implement axe-core integration
   - Create accessibility test utilities
   - Set up automated a11y checks
   - Add custom a11y assertions
   - Configure reporting

4. [x] Set up Visual Regression Testing
   - Configure screenshot comparison
   - Implement baseline management
   - Create visual test utilities
   - Set up CI integration
   - Add threshold configuration

## Acceptance Criteria

- Jest and React Testing Library are properly configured
- Playwright is set up for E2E testing
- Accessibility testing is integrated with automated checks
- Visual regression testing is working with baseline comparisons
- All test utilities and helpers are documented
- Test coverage reporting is configured
- CI integration is complete for all testing types

## Technical Notes

### Jest Configuration

```typescript
// Expected jest.config.ts
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/**/*.stories.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### React Testing Library Setup

```typescript
// Expected test utilities
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@/components/theme-provider';

const AllProviders = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### Playwright Configuration

```typescript
// Expected playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { browserName: 'chromium', viewport: { width: 1280, height: 720 } },
    },
    {
      name: 'Mobile Safari',
      use: { browserName: 'webkit', viewport: { width: 375, height: 667 } },
    },
  ],
};

export default config;
```

## Implementation Notes

### Test Utilities Setup (Completed)

1. Created custom test-utils.tsx with React Testing Library integration
2. Implemented provider wrapper for tests
3. Added user-event integration for interaction testing
4. Created custom render function with options
5. Added TypeScript types for better developer experience

### Accessibility Testing Framework (Completed)

1. Installed jest-axe and @axe-core/playwright
2. Created a11y-utils.ts with axe integration
3. Implemented checkA11y function for component testing
4. Added custom axe configurations for different scenarios
5. Created helper functions for ARIA roles and heading structure
6. Added type definitions for jest-axe matchers

### Visual Regression Testing (Completed)

1. Created visual-testing.ts with configuration and utilities
2. Implemented screenshot naming conventions
3. Added viewport configurations for responsive testing
4. Created threshold helpers based on component complexity
5. Added visual regression tests with Playwright

### E2E Testing (Completed)

1. Created example E2E tests for accessibility
2. Implemented visual regression tests
3. Added device profiles for responsive testing
4. Configured CI integration for E2E tests
5. Added artifact collection for test results

### CI Integration (Completed)

1. Updated GitHub Actions workflow with separate jobs
2. Added coverage reporting
3. Configured visual regression testing in CI
4. Added accessibility testing job
5. Set up artifact collection for all test types

### Documentation (Completed)

1. Created comprehensive testing documentation
2. Added examples for different test types
3. Documented best practices
4. Added directory structure overview
5. Included coverage requirements

### Files Created/Modified

- src/lib/testing/test-utils.tsx
- src/lib/testing/a11y-utils.ts
- src/lib/testing/visual-testing.ts
- src/types/jest-axe.d.ts
- tests/e2e/a11y.test.ts
- tests/e2e/visual.test.ts
- tests/unit/example.test.tsx
- docs/testing.md
- .github/workflows/ci.yml (updated)

### Commands Run

```bash
npm install --save-dev @testing-library/user-event @testing-library/jest-dom jest-axe @axe-core/playwright @types/jest-axe --legacy-peer-deps
```

## Test Coverage Requirements

- Unit test coverage > 80%
- Component test coverage > 80%
- E2E test coverage for critical paths
- Accessibility coverage for all components

## Documentation Requirements

- Update testing documentation ✅
- Add test utilities documentation ✅
- Create testing standards guide ✅
- Document accessibility testing approach ✅
