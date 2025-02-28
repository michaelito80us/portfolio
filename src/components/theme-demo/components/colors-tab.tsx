'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ColorSwatch } from './color-swatch';

export function ColorsTab() {
  return (
    <div className="space-y-6">
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
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => (
                  <div key={shade} className="flex flex-col items-center">
                    <div
                      className={`bg-primary-${shade} relative h-12 w-full rounded-md ring-1 ring-border`}
                      aria-label={`Primary ${shade}`}
                    />
                    <div className="mt-1 text-center">
                      <div className="text-xs">{shade}</div>
                      <div className="font-mono text-xs" id={`primary-${shade}-hex`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Semantic Colors</h3>
              <div className="grid grid-cols-2 gap-4">
                <ColorSwatch className="bg-background" label="Background" />
                <div className="flex flex-col items-center">
                  <div className="relative h-12 w-full rounded-md bg-foreground text-background ring-1 ring-border">
                    <span className="flex h-full items-center justify-center text-xs">Text</span>
                  </div>
                  <div className="mt-1 text-center">
                    <div className="text-xs">Foreground</div>
                    <div className="font-mono text-xs" id="foreground-hex"></div>
                  </div>
                </div>
                <ColorSwatch className="bg-card" label="Card" />
                <ColorSwatch className="bg-muted" label="Muted" />
                <ColorSwatch className="bg-accent" label="Accent" />
                <ColorSwatch className="bg-destructive" label="Destructive" />
                <ColorSwatch className="bg-header" label="Header" />
                <ColorSwatch className="bg-body" label="Body" />
                <ColorSwatch className="bg-link" label="Link" />
                <ColorSwatch className="bg-border" label="Border" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
