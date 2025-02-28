'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ContrastRatio } from './contrast-ratio';

export function ContrastTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>WCAG Contrast Ratios</CardTitle>
          <CardDescription>
            WCAG 2.1 requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. AAA level
            requires 7:1 for normal text and 4.5:1 for large text.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Primary UI Elements</h3>
              <div className="grid grid-cols-1 gap-4">
                <ContrastRatio
                  background="bg-background"
                  foreground="text-foreground"
                  label="Background / Foreground"
                />
                <ContrastRatio background="bg-card" foreground="text-card-foreground" label="Card / Card Foreground" />
                <ContrastRatio
                  background="bg-primary"
                  foreground="text-primary-foreground"
                  label="Primary / Primary Foreground"
                />
                <ContrastRatio
                  background="bg-secondary"
                  foreground="text-secondary-foreground"
                  label="Secondary / Secondary Foreground"
                />
                <ContrastRatio
                  background="bg-muted"
                  foreground="text-muted-foreground"
                  label="Muted / Muted Foreground"
                />
                <ContrastRatio
                  background="bg-accent"
                  foreground="text-accent-foreground"
                  label="Accent / Accent Foreground"
                />
                <ContrastRatio
                  background="bg-destructive"
                  foreground="text-destructive-foreground"
                  label="Destructive / Destructive Foreground"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Status Colors</h3>
              <div className="grid grid-cols-1 gap-4">
                <ContrastRatio
                  background="bg-success"
                  foreground="text-success-foreground"
                  label="Success / Success Foreground"
                />
                <ContrastRatio
                  background="bg-caution"
                  foreground="text-caution-foreground"
                  label="Caution / Caution Foreground"
                />
                <ContrastRatio
                  background="bg-danger"
                  foreground="text-danger-foreground"
                  label="Danger / Danger Foreground"
                />
                <ContrastRatio background="bg-info" foreground="text-info-foreground" label="Info / Info Foreground" />
              </div>

              <h3 className="mt-6 text-lg font-medium">Text Elements</h3>
              <div className="grid grid-cols-1 gap-4">
                <ContrastRatio background="bg-background" foreground="text-header" label="Background / Header" />
                <ContrastRatio background="bg-background" foreground="text-body" label="Background / Body" />
                <ContrastRatio background="bg-background" foreground="text-link" label="Background / Link" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
