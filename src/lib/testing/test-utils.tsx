import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Custom render options that extend React Testing Library's options
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
}

/**
 * Provider wrapper for tests
 */
const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {/* Add providers here as they are implemented */}
      {children}
    </>
  );
};

/**
 * Custom render function that includes providers and user-event setup
 */
function customRender(ui: ReactElement, options?: CustomRenderOptions) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { route, ...renderOptions } = options || {};

  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: AllProviders,
      ...renderOptions,
    }),
  };
}

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render method
export { customRender as render };
