import { render } from '@testing-library/react';
import RootLayout from './layout';

// Mock the fonts
jest.mock('@/fonts', () => ({
  inter: { className: 'mocked-inter-font' },
  source: { className: 'mocked-source-font' },
  plexMono: { className: 'mocked-plex-mono-font' },
}));

// Mock the ThemeProvider component
jest.mock('@/components/theme-provider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the SkipLink component
jest.mock('@/components/ui/skip-link', () => ({
  SkipLink: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the FocusIndicator component
jest.mock('@/components/ui/focus-indicator', () => ({
  FocusIndicator: () => <div data-testid="focus-indicator" />,
}));

describe('Root Layout', () => {
  it('renders children content', () => {
    const testContent = 'Test Content';
    const { getByText } = render(
      <RootLayout>
        <div>{testContent}</div>
      </RootLayout>
    );

    expect(getByText(testContent)).toBeInTheDocument();
  });
});
