import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './dropdown-menu';

// Mock Radix UI's Portal to make testing easier
jest.mock('@radix-ui/react-dropdown-menu', () => {
  const actual = jest.requireActual('@radix-ui/react-dropdown-menu');
  return {
    ...actual,
    Portal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('DropdownMenu Components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a basic dropdown menu', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="trigger">Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem data-testid="menu-item">Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByTestId('trigger');
    expect(trigger).toBeInTheDocument();

    // Click to open the menu
    await user.click(trigger);

    // Check if menu item is visible
    expect(screen.getByTestId('menu-item')).toBeInTheDocument();
  });

  it('renders dropdown menu with checkbox items', async () => {
    const onCheckedChange = jest.fn();
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="trigger">Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={false} onCheckedChange={onCheckedChange} data-testid="checkbox-item">
            Checkbox Item
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByTestId('trigger');
    await user.click(trigger);

    const checkboxItem = screen.getByTestId('checkbox-item');
    expect(checkboxItem).toBeInTheDocument();

    await user.click(checkboxItem);
    expect(onCheckedChange).toHaveBeenCalled();
  });

  it('renders dropdown menu with radio items', async () => {
    const onValueChange = jest.fn();
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="trigger">Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="option1" onValueChange={onValueChange}>
            <DropdownMenuRadioItem value="option1" data-testid="radio-item-1">
              Option 1
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option2" data-testid="radio-item-2">
              Option 2
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByTestId('trigger');
    await user.click(trigger);

    const radioItem1 = screen.getByTestId('radio-item-1');
    const radioItem2 = screen.getByTestId('radio-item-2');

    expect(radioItem1).toBeInTheDocument();
    expect(radioItem2).toBeInTheDocument();

    await user.click(radioItem2);
    expect(onValueChange).toHaveBeenCalledWith('option2');
  });

  it('renders dropdown menu with label and separator', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="trigger">Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel data-testid="menu-label">Menu Label</DropdownMenuLabel>
          <DropdownMenuSeparator data-testid="menu-separator" />
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByTestId('trigger');
    await user.click(trigger);

    expect(screen.getByTestId('menu-label')).toBeInTheDocument();
    expect(screen.getByTestId('menu-separator')).toBeInTheDocument();
  });

  it('renders dropdown menu with inset label', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="trigger">Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel inset data-testid="inset-label">
            Inset Label
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByTestId('trigger');
    await user.click(trigger);

    const insetLabel = screen.getByTestId('inset-label');
    expect(insetLabel).toBeInTheDocument();
    expect(insetLabel).toHaveClass('pl-8');
  });

  it('renders dropdown menu with inset menu item', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="trigger">Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem inset data-testid="inset-item">
            Inset Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByTestId('trigger');
    await user.click(trigger);

    const insetItem = screen.getByTestId('inset-item');
    expect(insetItem).toBeInTheDocument();
    expect(insetItem).toHaveClass('pl-8');
  });

  it('renders dropdown menu with shortcut', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="trigger">Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Item with Shortcut
            <DropdownMenuShortcut data-testid="shortcut">⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByTestId('trigger');
    await user.click(trigger);

    expect(screen.getByTestId('shortcut')).toBeInTheDocument();
    expect(screen.getByTestId('shortcut')).toHaveTextContent('⌘K');
  });

  it('renders dropdown menu with sub menu', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="trigger">Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger data-testid="sub-trigger">More Options</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem data-testid="sub-item">Sub Item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByTestId('trigger');
    await user.click(trigger);

    const subTrigger = screen.getByTestId('sub-trigger');
    expect(subTrigger).toBeInTheDocument();

    // Open the sub menu
    await user.click(subTrigger);

    // Check if sub menu item is visible
    expect(screen.getByTestId('sub-item')).toBeInTheDocument();
  });

  it('renders dropdown menu with inset sub trigger', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="trigger">Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger inset data-testid="inset-sub-trigger">
              More Options
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub Item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByTestId('trigger');
    await user.click(trigger);

    const insetSubTrigger = screen.getByTestId('inset-sub-trigger');
    expect(insetSubTrigger).toBeInTheDocument();
    expect(insetSubTrigger).toHaveClass('pl-8');
  });

  it('renders dropdown menu with group', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="trigger">Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup data-testid="menu-group">
            <DropdownMenuItem data-testid="group-item-1">Group Item 1</DropdownMenuItem>
            <DropdownMenuItem data-testid="group-item-2">Group Item 2</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByTestId('trigger');
    await user.click(trigger);

    expect(screen.getByTestId('menu-group')).toBeInTheDocument();
    expect(screen.getByTestId('group-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('group-item-2')).toBeInTheDocument();
  });
});
