'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function OverviewTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme System Overview</CardTitle>
          <CardDescription>
            This theme system is built on Tailwind CSS and Radix UI, providing a robust foundation for creating
            accessible, responsive, and visually consistent user interfaces.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The theme system supports both light and dark modes with smooth transitions and follows WCAG 2.1 AA
            accessibility standards. It includes a comprehensive set of design tokens for colors, typography, spacing,
            and more.
          </p>
          <div className="flex items-center gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
