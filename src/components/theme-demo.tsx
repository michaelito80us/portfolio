import * as React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export function ThemeDemo() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Theme System Demo</h1>
        <ThemeToggle />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Light & Dark Mode</CardTitle>
            <CardDescription>
              Our theme system supports both light and dark modes with smooth transitions.
            </CardDescription>
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
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Submit</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
            <CardDescription>
              Our design system includes a comprehensive color palette with proper contrast ratios.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <div className="h-10 rounded-md bg-primary" aria-label="Primary color"></div>
                <div className="h-10 rounded-md bg-secondary" aria-label="Secondary color"></div>
                <div className="h-10 rounded-md bg-accent" aria-label="Accent color"></div>
                <div className="h-10 rounded-md bg-muted" aria-label="Muted color"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-10 rounded-md bg-destructive" aria-label="Destructive color"></div>
                <div className="h-10 rounded-md bg-card" aria-label="Card color"></div>
                <div className="h-10 rounded-md bg-popover" aria-label="Popover color"></div>
                <div className="h-10 rounded-md bg-border" aria-label="Border color"></div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">All colors meet WCAG 2.1 AA contrast requirements.</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accessibility Features</CardTitle>
            <CardDescription>Our theme system includes various accessibility features for all users.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-medium">Keyboard Navigation</h3>
              <p className="mb-3 text-sm text-muted-foreground">
                Try navigating with the Tab key to see focus indicators.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button tabIndex={0}>First</Button>
                <Button tabIndex={0}>Second</Button>
                <Button tabIndex={0}>Third</Button>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">Reduced Motion</h3>
              <p className="text-sm text-muted-foreground">
                Animations are automatically disabled for users who prefer reduced motion.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">All components meet WCAG 2.1 AA accessibility standards.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
