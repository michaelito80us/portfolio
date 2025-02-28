'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/components/theme-provider';

export function AccessibilityTab() {
  const { prefersReducedMotion } = useTheme();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Accessibility Features</CardTitle>
          <CardDescription>Our theme system is designed with accessibility in mind.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Keyboard Navigation</h3>
            <p>All interactive elements are keyboard accessible. Try navigating this page using only the Tab key.</p>
            <div className="flex flex-wrap gap-2">
              <Button>Focusable Button</Button>
              <Input placeholder="Focusable Input" className="max-w-xs" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Reduced Motion</h3>
            <p>
              The theme system respects user preferences for reduced motion.
              {prefersReducedMotion && (
                <span className="ml-2 inline-block rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                  Reduced motion enabled
                </span>
              )}
            </p>
            <div className="flex items-center space-x-2">
              <div className="animate-fade-in rounded-md bg-muted p-4">
                <p>This element has a fade-in animation that respects reduced motion preferences.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Color Contrast</h3>
            <p>All color combinations meet WCAG 2.1 AA contrast requirements.</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-md bg-primary p-4 text-primary-foreground">Primary</div>
              <div className="rounded-md bg-secondary p-4 text-secondary-foreground">Secondary</div>
              <div className="rounded-md bg-accent p-4 text-accent-foreground">Accent</div>
              <div className="rounded-md bg-destructive p-4 text-destructive-foreground">Destructive</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
