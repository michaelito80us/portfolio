'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/theme-toggle';
import { OverviewTab } from './components/overview-tab';
import { ColorsTab } from './components/colors-tab';
import { StatusTab } from './components/status-tab';
import { ComponentsTab } from './components/components-tab';
import { AccessibilityTab } from './components/accessibility-tab';
import { ContrastTab } from './components/contrast-tab';

export function ThemeDemo() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Theme System Demo</h1>
        <ThemeToggle />
      </div>

      <Tabs defaultValue="overview" className="mb-10">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="status">Status Colors</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="contrast">Contrast Ratios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="colors">
          <ColorsTab />
        </TabsContent>

        <TabsContent value="status">
          <StatusTab />
        </TabsContent>

        <TabsContent value="components">
          <ComponentsTab />
        </TabsContent>

        <TabsContent value="accessibility">
          <AccessibilityTab />
        </TabsContent>

        <TabsContent value="contrast">
          <ContrastTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
