import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContrastRatio } from './contrast-ratio';
import * as colorUtils from '../utils/color-utils';
import * as useColorHexModule from '../hooks/use-color-hex';

// Mock the useColorHex hook
jest.mock('../hooks/use-color-hex', () => ({
  useColorHex: jest.fn(),
}));

// Mock the color utility functions
jest.mock('../utils/color-utils', () => ({
  getContrastRatio: jest.fn(),
  getWCAGCompliance: jest.fn(),
  getSuggestion: jest.fn(),
  formatHexDisplay: jest.fn(),
}));

describe('ContrastRatio', () => {
  // Setup default mocks
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Default mock implementations
    (useColorHexModule.useColorHex as jest.Mock).mockImplementation(color => {
      if (color === 'bg-primary') return '#1a1a1a';
      if (color === 'text-primary') return '#ffffff';
      return '#000000';
    });

    (colorUtils.getContrastRatio as jest.Mock).mockReturnValue(10.5);
    (colorUtils.getWCAGCompliance as jest.Mock).mockReturnValue({
      aa: true,
      aaa: true,
      aaLarge: true,
      aaaLarge: true,
    });
    (colorUtils.formatHexDisplay as jest.Mock).mockImplementation(hex => hex);
    (colorUtils.getSuggestion as jest.Mock).mockReturnValue('');
  });

  it('renders with passing contrast ratio', () => {
    render(<ContrastRatio background="bg-primary" foreground="text-primary" label="Primary / Primary" />);

    // Check if the component renders correctly
    expect(screen.getByText('Primary / Primary')).toBeInTheDocument();
    expect(screen.getByText('10.50:1')).toBeInTheDocument();
    expect(screen.getByText('This is normal text (16px)')).toBeInTheDocument();

    // Check if the background and foreground info is displayed
    expect(screen.getByText('Background:')).toBeInTheDocument();
    // Use getAllByText instead of getByText since 'Primary' appears multiple times
    expect(screen.getAllByText('Primary')[0]).toBeInTheDocument();
    expect(screen.getByText('Foreground:')).toBeInTheDocument();

    // Check if all compliance indicators are shown
    expect(screen.getByText('AA Pass')).toBeInTheDocument();
    expect(screen.getByText('AAA Pass')).toBeInTheDocument();
    expect(screen.getByText('AA Large Pass')).toBeInTheDocument();
    expect(screen.getByText('AAA Large Pass')).toBeInTheDocument();

    // Suggestion should not be shown for passing contrast
    expect(screen.queryByText('Suggestion:')).not.toBeInTheDocument();
  });

  it('renders with failing contrast ratio and shows suggestion', () => {
    // Mock failing contrast ratio
    (colorUtils.getContrastRatio as jest.Mock).mockReturnValue(2.5);
    (colorUtils.getWCAGCompliance as jest.Mock).mockReturnValue({
      aa: false,
      aaa: false,
      aaLarge: false,
      aaaLarge: false,
    });
    (colorUtils.getSuggestion as jest.Mock).mockReturnValue('Consider darkening the primary color.');

    render(<ContrastRatio background="bg-primary" foreground="text-primary" label="Primary / Primary" />);

    // Check if the component renders with failing contrast
    expect(screen.getByText('2.50:1')).toBeInTheDocument();

    // Check if all compliance indicators show failure
    expect(screen.getByText('AA Fail')).toBeInTheDocument();
    expect(screen.getByText('AAA Fail')).toBeInTheDocument();
    expect(screen.getByText('AA Large Fail')).toBeInTheDocument();
    expect(screen.getByText('AAA Large Fail')).toBeInTheDocument();

    // Suggestion should be shown for failing contrast
    expect(screen.getByText('Suggestion:')).toBeInTheDocument();
    expect(screen.getByText('Consider darkening the primary color.')).toBeInTheDocument();
  });

  it('handles colors with opacity correctly', () => {
    // Mock colors with opacity
    (useColorHexModule.useColorHex as jest.Mock).mockImplementation(color => {
      if (color === 'bg-primary') return '#1a1a1a80'; // With opacity
      if (color === 'text-primary') return '#ffffff';
      return '#000000';
    });

    (colorUtils.formatHexDisplay as jest.Mock).mockImplementation(hex => {
      if (hex === '#1a1a1a80') return '#1a1a1a (50% opacity)';
      return hex;
    });

    render(<ContrastRatio background="bg-primary" foreground="text-primary" label="Primary / Primary" />);

    // Check if opacity is displayed correctly
    expect(screen.getByText('#1a1a1a (50% opacity)')).toBeInTheDocument();
  });

  it('handles partial WCAG compliance correctly', () => {
    // Mock partial compliance (passes large text but fails normal text)
    (colorUtils.getContrastRatio as jest.Mock).mockReturnValue(3.5);
    (colorUtils.getWCAGCompliance as jest.Mock).mockReturnValue({
      aa: false,
      aaa: false,
      aaLarge: true,
      aaaLarge: false,
    });
    (colorUtils.getSuggestion as jest.Mock).mockReturnValue('Consider darkening the primary color.');

    render(<ContrastRatio background="bg-primary" foreground="text-primary" label="Primary / Primary" />);

    // Check mixed compliance indicators
    expect(screen.getByText('AA Fail')).toBeInTheDocument();
    expect(screen.getByText('AAA Fail')).toBeInTheDocument();
    expect(screen.getByText('AA Large Pass')).toBeInTheDocument();
    expect(screen.getByText('AAA Large Fail')).toBeInTheDocument();

    // Suggestion should be shown since AA fails
    expect(screen.getByText('Suggestion:')).toBeInTheDocument();
  });

  it('updates when color values change', () => {
    const { rerender } = render(
      <ContrastRatio background="bg-primary" foreground="text-primary" label="Primary / Primary" />
    );

    // Initial render
    expect(useColorHexModule.useColorHex).toHaveBeenCalledWith('bg-primary');
    expect(useColorHexModule.useColorHex).toHaveBeenCalledWith('text-primary');

    // Update props
    rerender(<ContrastRatio background="bg-secondary" foreground="text-secondary" label="Secondary / Secondary" />);

    // Check if hook was called with new values
    expect(useColorHexModule.useColorHex).toHaveBeenCalledWith('bg-secondary');
    expect(useColorHexModule.useColorHex).toHaveBeenCalledWith('text-secondary');
    expect(screen.getByText('Secondary / Secondary')).toBeInTheDocument();
  });
});
