import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

describe('Tabs Components', () => {
  it('renders a complete tabs component with all subcomponents', () => {
    render(
      <Tabs defaultValue="tab1" data-testid="tabs-root">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 content</TabsContent>
        <TabsContent value="tab2">Tab 2 content</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
    expect(screen.getByText('Tab 1 content')).toBeInTheDocument();

    // The active tabpanel should be visible
    const activeTabpanel = screen.getByRole('tabpanel');
    expect(activeTabpanel).toBeVisible();
    expect(activeTabpanel).toHaveTextContent('Tab 1 content');

    // The inactive tab content is in the DOM but hidden
    // We can't easily query it with testing-library since it has hidden attribute
    const tabsRoot = screen.getByTestId('tabs-root');
    expect(tabsRoot.querySelectorAll('[role="tabpanel"]')).toHaveLength(2);
  });

  it('switches tabs when clicking on tab triggers', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1" data-testid="tabs-root">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 content</TabsContent>
        <TabsContent value="tab2">Tab 2 content</TabsContent>
      </Tabs>
    );

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

    // Initially tab1 should be active
    expect(tab1).toHaveAttribute('data-state', 'active');
    expect(tab2).toHaveAttribute('data-state', 'inactive');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab 1 content');

    // Click on tab2
    await user.click(tab2);
    expect(tab1).toHaveAttribute('data-state', 'inactive');
    expect(tab2).toHaveAttribute('data-state', 'active');

    // After clicking, tab2 content should be visible
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab 2 content');
  });

  it('can be controlled externally', () => {
    const { rerender } = render(
      <Tabs value="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 content</TabsContent>
        <TabsContent value="tab2">Tab 2 content</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('data-state', 'active');
    expect(screen.getByText('Tab 1 content')).toBeVisible();

    rerender(
      <Tabs value="tab2">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 content</TabsContent>
        <TabsContent value="tab2">Tab 2 content</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('data-state', 'active');
    expect(screen.getByText('Tab 2 content')).toBeVisible();
  });

  it('calls onValueChange when tab is changed', async () => {
    const handleValueChange = jest.fn();
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="tab1" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 content</TabsContent>
        <TabsContent value="tab2">Tab 2 content</TabsContent>
      </Tabs>
    );

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(handleValueChange).toHaveBeenCalledWith('tab2');
  });

  describe('TabsList', () => {
    it('renders with default props', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList data-testid="tabs-list" />
        </Tabs>
      );
      const tabsList = screen.getByTestId('tabs-list');
      expect(tabsList).toBeInTheDocument();
      expect(tabsList).toHaveClass('inline-flex');
      expect(tabsList).toHaveClass('bg-muted');
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList className="custom-class" data-testid="tabs-list" />
        </Tabs>
      );
      const tabsList = screen.getByTestId('tabs-list');
      expect(tabsList).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Tabs defaultValue="tab1">
          <TabsList ref={ref} data-testid="tabs-list" />
        </Tabs>
      );
      expect(ref.current).not.toBeNull();
    });
  });

  describe('TabsTrigger', () => {
    it('renders with default props', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" data-testid="tab-trigger">
              Tab 1
            </TabsTrigger>
          </TabsList>
        </Tabs>
      );
      const trigger = screen.getByTestId('tab-trigger');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveClass('inline-flex');
      expect(trigger).toHaveClass('rounded-sm');
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" className="custom-class" data-testid="tab-trigger">
              Tab 1
            </TabsTrigger>
          </TabsList>
        </Tabs>
      );
      const trigger = screen.getByTestId('tab-trigger');
      expect(trigger).toHaveClass('custom-class');
    });

    it('respects disabled state', async () => {
      const handleValueChange = jest.fn();
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab1" onValueChange={handleValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" disabled data-testid="disabled-tab">
              Tab 2
            </TabsTrigger>
          </TabsList>
        </Tabs>
      );

      const disabledTab = screen.getByTestId('disabled-tab');
      expect(disabledTab).toBeDisabled();

      await user.click(disabledTab);
      expect(handleValueChange).not.toHaveBeenCalled();
    });
  });

  describe('TabsContent', () => {
    it('renders with default props', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" data-testid="tab-content">
            Content
          </TabsContent>
        </Tabs>
      );
      const content = screen.getByTestId('tab-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('mt-2');
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="custom-class" data-testid="tab-content">
            Content
          </TabsContent>
        </Tabs>
      );
      const content = screen.getByTestId('tab-content');
      expect(content).toHaveClass('custom-class');
    });

    it('is not visible when tab is not active', () => {
      render(
        <Tabs defaultValue="tab1" data-testid="tabs-root">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Tab 1 content</TabsContent>
          <TabsContent value="tab2" data-testid="inactive-content">
            Tab 2 content
          </TabsContent>
        </Tabs>
      );
      const inactiveContent = screen.getByTestId('inactive-content');
      expect(inactiveContent).not.toBeVisible();
    });
  });
});
