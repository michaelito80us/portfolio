'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from '@/components/theme-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';

export function ThemeDemo() {
  const { prefersReducedMotion } = useTheme();

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
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme System Overview</CardTitle>
              <CardDescription>
                Our theme system is built on Tailwind CSS and Radix UI, providing a robust foundation for creating
                accessible, responsive, and visually consistent user interfaces.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The theme system supports both light and dark modes with smooth transitions and follows WCAG 2.1 AA
                accessibility standards. It includes a comprehensive set of design tokens for colors, typography,
                spacing, and more.
              </p>
              <div className="flex items-center gap-4">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>
                Our color system uses HSL values for better control over lightness and saturation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Primary Colors</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => (
                      <div key={shade} className="flex flex-col items-center">
                        <div
                          className={`h-12 w-12 rounded-md bg-primary-${shade} ring-border ring-1`}
                          aria-label={`Primary ${shade}`}
                        />
                        <span className="mt-1 text-xs">{shade}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Semantic Colors</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-background ring-border h-12 w-full rounded-md ring-1" />
                      <span className="mt-1 text-xs">Background</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-foreground text-background ring-border h-12 w-full rounded-md ring-1">
                        <span className="flex h-full items-center justify-center text-xs">Text</span>
                      </div>
                      <span className="mt-1 text-xs">Foreground</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-card ring-border h-12 w-full rounded-md ring-1" />
                      <span className="mt-1 text-xs">Card</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-muted ring-border h-12 w-full rounded-md ring-1" />
                      <span className="mt-1 text-xs">Muted</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-accent ring-border h-12 w-full rounded-md ring-1" />
                      <span className="mt-1 text-xs">Accent</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-destructive ring-border h-12 w-full rounded-md ring-1" />
                      <span className="mt-1 text-xs">Destructive</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Card Component</CardTitle>
                <CardDescription>Cards are used to group related content and actions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>This is a card component with header, content, and footer sections.</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Submit</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Controls</CardTitle>
                <CardDescription>Accessible form controls with proper labeling.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" />
                  <Label htmlFor="notifications">Enable notifications</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>Different button styles for various contexts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Features</CardTitle>
              <CardDescription>Our theme system is designed with accessibility in mind.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Keyboard Navigation</h3>
                <p>
                  All interactive elements are keyboard accessible. Try navigating this page using only the Tab key.
                </p>
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
                    <span className="bg-primary text-primary-foreground ml-2 inline-block rounded-full px-2 py-1 text-xs">
                      Reduced motion enabled
                    </span>
                  )}
                </p>
                <div className="flex items-center space-x-2">
                  <div className="animate-fade-in bg-muted rounded-md p-4">
                    <p>This element has a fade-in animation that respects reduced motion preferences.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Color Contrast</h3>
                <p>All color combinations meet WCAG 2.1 AA contrast requirements.</p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="bg-primary text-primary-foreground rounded-md p-4">Primary</div>
                  <div className="bg-secondary text-secondary-foreground rounded-md p-4">Secondary</div>
                  <div className="bg-accent text-accent-foreground rounded-md p-4">Accent</div>
                  <div className="bg-destructive text-destructive-foreground rounded-md p-4">Destructive</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
