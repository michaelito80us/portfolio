import React from 'react';
import { render } from '@testing-library/react';
import { FocusIndicator } from './focus-indicator';

// Mock the jsx global function
jest.mock('styled-jsx/style', () => ({
  __esModule: true,
  default: (props: { children: string }) => <style data-testid="jsx-style">{props.children}</style>,
}));

describe('FocusIndicator', () => {
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    // Spy on event listeners
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    // Reset classList before each test
    document.documentElement.classList.remove('keyboard-user');
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('renders without crashing', () => {
    const { container } = render(<FocusIndicator />);
    expect(container).toBeTruthy();
  });

  it('adds event listeners on mount', () => {
    render(<FocusIndicator />);

    // Should add keydown and mousedown event listeners
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
  });

  it('removes event listeners on unmount', () => {
    const { unmount } = render(<FocusIndicator />);
    unmount();

    // Should remove keydown and mousedown event listeners
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
  });

  it('adds keyboard-user class on Tab keydown', () => {
    render(<FocusIndicator />);

    // Simulate Tab key press
    const keydownEvent = new KeyboardEvent('keydown', { key: 'Tab' });
    window.dispatchEvent(keydownEvent);

    expect(document.documentElement.classList.contains('keyboard-user')).toBe(true);
  });

  it('does not add keyboard-user class on non-Tab keydown', () => {
    render(<FocusIndicator />);

    // Simulate non-Tab key press
    const keydownEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    window.dispatchEvent(keydownEvent);

    expect(document.documentElement.classList.contains('keyboard-user')).toBe(false);
  });

  it('removes keyboard-user class on mousedown', () => {
    // Add the class first
    document.documentElement.classList.add('keyboard-user');

    render(<FocusIndicator />);

    // Simulate mouse down
    const mousedownEvent = new MouseEvent('mousedown');
    window.dispatchEvent(mousedownEvent);

    expect(document.documentElement.classList.contains('keyboard-user')).toBe(false);
  });

  it('renders global styles', () => {
    const { getByTestId } = render(<FocusIndicator />);

    // Check if the style element is rendered with our mock
    const styleElement = getByTestId('jsx-style');
    expect(styleElement).toBeTruthy();

    // Check if the style content includes focus-visible rules
    expect(styleElement.textContent).toContain('focus-visible');
    expect(styleElement.textContent).toContain('outline');
  });
});
