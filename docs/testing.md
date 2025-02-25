# Testing Infrastructure

This document outlines the testing infrastructure and best practices for the portfolio project.

## Overview

The project uses a comprehensive testing approach with multiple layers:

1. **Unit Tests**: Testing individual components and functions in isolation
2. **Integration Tests**: Testing interactions between components
3. **End-to-End Tests**: Testing complete user flows
4. **Accessibility Tests**: Ensuring WCAG compliance
5. **Visual Regression Tests**: Ensuring UI consistency

## Testing Tools

- **Jest**: JavaScript testing framework
- **React Testing Library**: Component testing utilities
- **Playwright**: End-to-end testing
- **jest-axe**: Accessibility testing
- **@axe-core/playwright**: Accessibility testing in E2E tests

## Directory Structure

```
├── src/
│   ├── lib/
│   │   └── testing/           # Testing utilities
│   │       ├── test-utils.tsx # Common test utilities
│   │       ├── a11y-utils.ts  # Accessibility testing utilities
│   │       └── visual-testing.ts # Visual testing utilities
│   └── types/
│       └── jest-axe.d.ts      # Type definitions for jest-axe
├── tests/
│   ├── e2e/                   # End-to-end tests
│   │   ├── smoke.test.ts      # Basic smoke tests
│   │   ├── a11y.test.ts       # Accessibility tests
│   │   └── visual.test.ts     # Visual regression tests
│   ├── integration/           # Integration tests
│   └── unit/                  # Unit tests
├── jest.config.ts             # Jest configuration
├── jest.setup.ts              # Jest setup file
└── playwright.config.ts       # Playwright configuration
```

## Running Tests

```bash
# Run unit and integration tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

## Writing Tests

### Unit Tests

Unit tests should focus on testing a single component or function in isolation. Use the custom render function from `@/lib/testing/test-utils` to ensure components are wrapped with necessary providers.

```tsx
import { render, screen } from '@/lib/testing/test-utils';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
```

### Accessibility Tests

Use the `checkA11y` function to test components for accessibility violations:

```tsx
import { checkA11y } from '@/lib/testing/a11y-utils';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('has no accessibility violations', async () => {
    await checkA11y(<MyComponent />);
  });
});
```

### Visual Regression Tests

Visual regression tests use Playwright's screenshot comparison:

```ts
test('component appearance', async ({ page }) => {
  await page.goto('/my-component');
  await expect(page).toHaveScreenshot('my-component.png', {
    threshold: 0.1,
  });
});
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Roles and Accessible Queries**: Prefer queries like `getByRole` over `getByTestId`
3. **Test Edge Cases**: Include tests for loading, error, and empty states
4. **Keep Tests Independent**: Each test should be able to run in isolation
5. **Maintain Coverage**: Aim for >80% test coverage for critical code paths
6. **Test Accessibility**: Include accessibility checks in component tests
7. **Visual Testing**: Use visual regression tests for UI-heavy components

## Continuous Integration

Tests are automatically run in the CI pipeline:

1. Unit and integration tests run on every PR
2. E2E tests run on every PR to main
3. Visual regression tests run on every PR to main
4. Accessibility tests run on every PR

## Coverage Requirements

- Unit test coverage: >80%
- Component test coverage: >80%
- E2E test coverage: Critical user flows
- Accessibility coverage: All components
