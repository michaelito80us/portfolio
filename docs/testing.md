# Testing Documentation

This document outlines the testing strategy, infrastructure, and best practices for the portfolio project.

## Overview

The project uses a comprehensive testing approach with multiple layers to ensure code quality and reliability:

1. **Unit Tests**: Testing individual components and functions in isolation
2. **Integration Tests**: Testing interactions between components
3. **End-to-End Tests**: Testing complete user flows
4. **Accessibility Tests**: Ensuring WCAG compliance
5. **Visual Regression Tests**: Ensuring UI consistency
6. **Performance Tests**: Ensuring optimal performance

## Testing Layers

### 1. Unit Tests (Jest + React Testing Library)

- Test individual components and functions in isolation
- Focus on business logic and component behavior
- Mock external dependencies
- Coverage requirements: 90%+ for new code

#### Component Testing Guidelines

```tsx
// Example component test
import { render, screen } from '@/lib/testing/test-utils';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
```

### 2. Integration Tests

- Test component interactions
- Test data flow between components
- Test hooks and context integration
- Focus on user workflows

### 3. E2E Tests (Playwright)

- Test complete user journeys
- Cross-browser testing
- Mobile responsiveness
- Accessibility compliance

#### Browser Coverage

- Chromium
- Firefox
- WebKit
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

#### E2E Test Example

```typescript
test('user can navigate through main sections', async ({ page }) => {
  await page.goto('/');
  await page.click('a[href="#about"]');
  await expect(page.getByRole('heading')).toBeVisible();
});
```

### 4. Accessibility Testing

- WCAG 2.1 Level AA compliance
- Automated checks via Playwright and jest-axe
- Manual testing with screen readers
- Color contrast verification
- Keyboard navigation testing

```tsx
import { checkA11y } from '@/lib/testing/a11y-utils';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('has no accessibility violations', async () => {
    await checkA11y(<MyComponent />);
  });
});
```

### 5. Visual Regression Tests

Visual regression tests use Playwright's screenshot comparison:

```ts
test('component appearance', async ({ page }) => {
  await page.goto('/my-component');
  await expect(page).toHaveScreenshot('my-component.png', {
    threshold: 0.1,
  });
});
```

### 6. Performance Testing

- Lighthouse scores
- Web Vitals monitoring
- Bundle size analysis
- Load testing for API endpoints

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
│   ├── unit/               # Unit tests
│   │   ├── components/    # Component tests
│   │   ├── hooks/        # Hook tests
│   │   └── utils/        # Utility function tests
│   ├── integration/       # Integration tests
│   └── e2e/              # End-to-end tests
│       ├── specs/        # Test specifications
│       ├── smoke.test.ts      # Basic smoke tests
│       ├── a11y.test.ts       # Accessibility tests
│       └── visual.test.ts     # Visual regression tests
├── jest.config.ts             # Jest configuration
├── jest.setup.ts              # Jest setup file
└── playwright.config.ts       # Playwright configuration
```

## Testing Tools

1. **Jest**
   - Test runner
   - Assertion library
   - Mocking framework

2. **React Testing Library**
   - Component testing
   - User-centric testing
   - Accessibility checks

3. **Playwright**
   - E2E testing
   - Cross-browser testing
   - Mobile testing
   - Visual regression
   - Network interception

4. **Accessibility Testing**
   - jest-axe
   - @axe-core/playwright

## Running Tests

```bash
# Unit and Integration Tests
npm test                # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report

# E2E Tests
npm run test:e2e      # Run all E2E tests
npm run test:e2e:ui   # Run with UI mode
npm run test:e2e:debug # Debug mode
```

## Best Practices

### Test Organization

- One test file per component/feature
- Clear test descriptions
- Consistent naming conventions

### Test Quality

- Test behavior, not implementation
- Use meaningful assertions
- Avoid testing implementation details
- Keep tests focused and atomic
- Use roles and accessible queries (prefer `getByRole` over `getByTestId`)
- Test edge cases (loading, error, empty states)
- Keep tests independent (each test should run in isolation)

### Test Data

- Use factories for test data
- Avoid sharing state between tests
- Clean up after tests

## Continuous Integration

Tests are automatically run in the CI pipeline:

1. Unit and integration tests run on every PR
2. E2E tests run on every PR to main
3. Visual regression tests run on every PR to main
4. Accessibility tests run on every PR
5. Regular test metrics review

## Coverage Requirements

- Statements: 90%
- Branches: 85%
- Functions: 90%
- Lines: 90%
- Unit test coverage: 90%+
- Component test coverage: 90%+
- E2E test coverage: Critical user flows
- Accessibility coverage: All components

## Reporting

- Jest coverage reports
- Playwright HTML reports
- CI/CD test results
- Regular test metrics review
