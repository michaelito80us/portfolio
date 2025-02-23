# Portfolio Website Project Plan

## 1. Project Scope

The goal of this project is to create a professional portfolio website that showcases the developer's skills, projects, and technical expertise. The website will include features such as internationalization (i18n), integration with a headless CMS, a performance and accessibility widget, and a CI/CD pipeline with comprehensive testing.

### Out of Scope (Optional for Future Phases)

- Blog functionality (can be added later).
- Advanced AI-powered features beyond the initial scope (e.g., chatbot, text generator).
- Additional languages beyond the initial set.

## 2. Deliverables

The following deliverables are expected from this project:

1. A fully functional, responsive portfolio website.
2. Key features including:
   - Homepage with interactive 3D elements or animations.
   - About Me section with a timeline and personal details.
   - Projects section with case studies and dynamic content.
   - My Mantra section showcasing coding philosophy.
   - Work section with case studies and optional interactive demos.
   - Testing & CI/CD section that explains the tools and frameworks used for testing and CI/CD pipeline.
   - Performance and Accessibility Widget.
   - Contact section with a form and social links.
3. A movable and placeable widget displaying test coverage, bundle size, and Lighthouse scores.
4. Comprehensive testing suite (unit, integration, and e2e tests).
5. CI/CD pipeline with GitHub Actions for automated testing and deployment.
6. Deployment to a live environment with a custom domain.
7. A public GitHub repository with the README.md file explaining the CI/CD pipeline and testing setup and badges for test coverage, build status, and Lighthouse scores (from Shields.io).

## 3. Milestones

The project will be divided into the following milestones:

1. Kickoff Meeting: Align on goals, deliverables, and timelines.
2. Design Approval: Finalize the visual mockups and layout.
3. Testing Framework Setup: Install and configure testing tools (e.g., Jest, React Testing Library, Cypress).
4. CI/CD Pipeline Setup: Configure GitHub Actions to automate testing, build, and deployment.
5. Widget Development: Build a widget to display test coverage, bundle size, and Lighthouse scores.
6. Testing Implementation: Write unit, integration, and e2e tests for the portfolio.
7. Testing Complete: All bugs are resolved, and the site is optimized for performance and accessibility.
8. Deployment: The site is live and ready to share.

## 4. Detailed Task Breakdown

The project tasks are broken down into the following phases:

### Phase 1: Planning & Setup

1. Set up the project repository with GitHub.
2. Choose and configure the tech stack (Next.js 15, react 19, Tailwind CSS 4, CMS, etc.).
3. Install dependencies (e.g., react-i18next, CMS SDK).
4. Create a basic folder structure for the project.
5. Install testing libraries:
   - Jest for unit and integration tests.
   - React Testing Library for component testing.
   - Cypress for e2e tests.
6. Install additional tools:
   - Lighthouse CI for automated Lighthouse audits.
   - Webpack Bundle Analyzer or Source Map Explorer for bundle size analysis.
   - Husky for Git hooks.
   - Prettier for code formatting.

### Phase 2: CI/CD Pipeline Setup

Configure GitHub Actions for the CI/CD pipeline:

- Run unit and integration tests using Jest.
- Run e2e tests using Cypress.
- Generate test coverage reports.
- Build the application and analyze the bundle size.
- Run Lighthouse audits and generate scores.
- Deploy to staging or production (e.g., Vercel or Netlify).

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20
      - name: Install dependencies
        run: npm install
      - name: Run unit and integration tests
        run: npm test -- --coverage
      - name: Run e2e tests
        run: npx cypress run

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm install
      - name: Build application
        run: npm run build
      - name: Analyze bundle size
        run: npx source-map-explorer build/static/js/*.js

  lighthouse:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Run Lighthouse CI
        run: npx lhci autorun
```

### Phase 3: Widget Development

#### Core features

1. Draggable Widget:
   - The widget can be dragged and dropped anywhere on the screen.
   - It remains fixed on top of the page content (using a higher z-index).
2. Snapping to Anchors:
   - The widget can snap to predefined anchor points (e.g., corners of the screen or specific sections of the page).
3. Persistent Position:
   - The widget’s position is saved (e.g., in localStorage or a database) so that it remains in the same place when the user revisits the site.
4. Responsive Behavior:
   - On smaller screens (e.g., mobile), the widget could switch to a fixed position or a minimized version to avoid cluttering the UI.

#### Implementation plan

1. Design the widget to display:
   - Test coverage percentage.
   - Bundle size of the application.
   - Lighthouse scores (performance, accessibility, SEO, and best practices).
   - Web Vitals (LCP, TBT, CLS, and FID).
2. Fetch metrics from CI/CD pipeline outputs.
   - Use GitHub Actions artifacts or APIs to fetch test coverage, bundle size, and Lighthouse scores.
   - Example:
     - Test coverage: Parse the coverage-summary.json file generated by Jest.
     - Bundle size: Use the output from source-map-explorer or webpack-bundle-analyzer or `@next/bundle-analyzer` plugin.
     - Lighthouse scores: Use the Lighthouse CI output.
     - Web Vitals: Use the `useReportWebVitals` hook from Next.js.
3. Use a library like React Draggable to implement the draggable functionality.
   - Example:

   ```jsx
   import Draggable from 'react-draggable';

   const MetricsWidget = ({ coverage, bundleSize, lighthouseScores, webVitals }) => (
     <Draggable>
       <div className="metrics-widget">
         <h4>Metrics</h4>
       <p>Test Coverage: {coverage}%</p>
       <p>Bundle Size: {bundleSize} KB</p>
       <p>Lighthouse Scores:</p>
       <ul>
         <li>Performance: {lighthouseScores.performance}</li>
         <li>Accessibility: {lighthouseScores.accessibility}</li>
         <li>SEO: {lighthouseScores.seo}</li>
         <li>Best Practices: {lighthouseScores.bestPractices}</li>
       </ul>
       <p>Web Vitals:</p>
       <ul>
         <li>LCP: {webVitals.LCP}</li>
         <li>TBT: {webVitals.TBT}</li>
         <li>CLS: {webVitals.CLS}</li>
         <li>FID: {webVitals.FID}</li>
       </ul>
     </div>
     </Draggable>
   );
   ```

4. Implement snapping to predefined anchor points.
   - Use logic to detect when the widget is dragged near an anchor and snap it into place.
   - Define anchor points on the page (e.g., top-left, top-right, bottom-left, bottom-right).
   - Example:

   ```javascript
   const anchors = [
     { x: 0, y: 0 }, // Top-left
     { x: window.innerWidth - 200, y: 0 }, // Top-right
     { x: 0, y: window.innerHeight - 200 }, // Bottom-left
     { x: window.innerWidth - 200, y: window.innerHeight - 200 }, // Bottom-right
   ];

   const snapToAnchor = (position) => {
     const threshold = 50; // Snap threshold in pixels
     for (const anchor of anchors) {
     if (
       Math.abs(position.x - anchor.x) < threshold &&
       Math.abs(position.y - anchor.y) < threshold
     ) {
       return anchor; // Snap to this anchor
     }
   }
      return position; // No snapping
   };
   ```

5. Save and retrieve the widget’s position using localStorage.
   - On page load, retrieve the saved position and set the widget’s initial position.
   - Example:

   ```javascript
   const [position, setPosition] = useState(() => {
     const savedPosition = localStorage.getItem('widgetPosition');
     return savedPosition ? JSON.parse(savedPosition) : { x: 0, y: 0 };
   });

   const handleDragStop = (e, data) => {
     const snappedPosition = snapToAnchor({ x: data.x, y: data.y });
     setPosition(snappedPosition);
     localStorage.setItem('widgetPosition', JSON.stringify(snappedPosition));
   };

   return (
     <Draggable position={position} onStop={handleDragStop}>
       <div className="widget">...</div>
     </Draggable>
   );
   ```

6. Ensure the widget is responsive and works well on all screen sizes.
   - Example:

   ```javascript
   const isMobile = window.innerWidth < 768;

   return (
     <Draggable disabled={isMobile}>
       <div className={`widget ${isMobile ? 'fixed-widget' : ''}`}>...</div>
     </Draggable>
   );
   ```

7. Add animations when the widget snaps to an anchor or is minimized/expanded, accessibility features, and styling.
   - Example:

   ```css
   .widget {
     position: absolute;
     width: 200px;
     padding: 10px;
     background: #1e1e1e;
     color: #fff;
     border: 1px solid #444;
     border-radius: 8px;
     z-index: 1000;
     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
   }

   .fixed-widget {
     position: fixed;
     bottom: 10px;
     right: 10px;
   }
   ```

8. Add minimization and expansion functionality.
   - Example:

   ```jsx
   const [isMinimized, setIsMinimized] = useState(false);
   ```

9. Ensure the widget is keyboard-navigable and screen-reader friendly.
   - Example:

   ```jsx
   const MetricsWidget = ({ coverage, bundleSize, lighthouseScores, webVitals }) => (
     <Draggable>
       <div className="widget">
         <h4>Metrics</h4>
         <p>Test Coverage: {coverage}%</p>
         <p>Bundle Size: {bundleSize} KB</p>
         <p>Lighthouse Scores:</p>
         <ul>
           <li>Performance: {lighthouseScores.performance}</li>
           <li>Accessibility: {lighthouseScores.accessibility}</li>
           <li>SEO: {lighthouseScores.seo}</li>
           <li>Best Practices: {lighthouseScores.bestPractices}</li>
         </ul>
         <p>Web Vitals:</p>
         <ul>
           <li>LCP: {webVitals.LCP}</li>
           <li>TBT: {webVitals.TBT}</li>
           <li>CLS: {webVitals.CLS}</li>
           <li>FID: {webVitals.FID}</li>
         </ul>
      </div> 
     </Draggable>
   );
   ```

### Phase 4: Testing Implementation

1. Write unit tests for individual components and functions.
   - Example:

   ```jsx
   import { render, screen } from '@testing-library/react';
   import MetricsWidget from './MetricsWidget';

   test('renders metrics widget', () => {
     render(<MetricsWidget coverage={85} bundleSize={250} lighthouseScores={{ performance: 95, accessibility: 100, seo: 90, bestPractices: 95 }} />);
     expect(screen.getByText(/Test Coverage: 85%/)).toBeInTheDocument();
   });
   ```

2. Write integration tests for interactions between components.
   - Example:

   ```jsx
   test('navigates to projects page', () => {
     render(<App />);
     fireEvent.click(screen.getByText(/Projects/));
     expect(screen.getByText(/My Projects/)).toBeInTheDocument();
   });
   ```

3. Write end-to-end (e2e) tests for user flows using Playwright.
   - Example:

   ```javascript
   describe('Portfolio Navigation', () => {
     it('should navigate to the About Me page', () => {
       cy.visit('/');
       cy.get('nav').contains('About Me').click();
       cy.url().should('include', '/about');
       cy.contains('About Me').should('be.visible');
     });
   });
   ```

## 5. Deployment Plan

The deployment plan includes the following steps:

1. Deploy the site to Vercel or Netlify.
2. Set up a custom domain (e.g., yourname.dev).
3. Test the live site to ensure everything works as expected.

## 6. Roles and Responsibilities

### Developer Responsibilities

1. Implement the frontend and backend of the portfolio.
2. Integrate i18n and the headless CMS.
3. Ensure the site is responsive, accessible, and performant.
4. Test and debug the site.
5. Deploy the site to a live environment.

### Project Manager Responsibilities

1. Provide clear requirements and documentation for each feature.
2. Create and manage the project timeline and tasks.
3. Facilitate communication and resolve blockers.
4. Review progress and provide feedback.
5. Ensure the project stays on track and within scope.

## 7. Tools to Be Used

1. Frontend Framework: Next.js or React.
2. Styling: Tailwind CSS or Styled Components.
3. i18n Library: react-i18next or next-i18next.
4. Headless CMS: Strapi, Contentful, or Sanity.
5. Testing Tools: Jest, React Testing Library, Cypress.
6. CI/CD: GitHub Actions.
7. Deployment: Vercel or Netlify.

## 8. Timeline

The project is expected to be completed in 6-8 weeks, with the following timeline:

1. Planning & Setup: 1 week.
2. Design Mockups: 1 week.
3. Development - Core Features: 2-3 weeks.
4. Development - Advanced Features: 1-2 weeks.
5. Testing & Optimization: 1 week.
6. Deployment & Handover: 1 week.
