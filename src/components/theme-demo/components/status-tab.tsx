'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { ColorSwatch } from './color-swatch';

export function StatusTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Status Colors</CardTitle>
          <CardDescription>Semantic colors for different states and notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Status Indicators</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 rounded-md bg-success p-4 text-success-foreground">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Success Message</span>
                  <span className="ml-auto font-mono text-xs" id="success-hex"></span>
                </div>
                <div className="flex items-center gap-3 rounded-md bg-caution p-4 text-caution-foreground">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-medium">Caution Message</span>
                  <span className="ml-auto font-mono text-xs" id="caution-hex"></span>
                </div>
                <div className="flex items-center gap-3 rounded-md bg-danger p-4 text-danger-foreground">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">Danger Message</span>
                  <span className="ml-auto font-mono text-xs" id="danger-hex"></span>
                </div>
                <div className="flex items-center gap-3 rounded-md bg-info p-4 text-info-foreground">
                  <Info className="h-5 w-5" />
                  <span className="font-medium">Info Message</span>
                  <span className="ml-auto font-mono text-xs" id="info-hex"></span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Status Colors</h3>
              <div className="grid grid-cols-2 gap-4">
                <ColorSwatch className="bg-success" label="Success" />
                <ColorSwatch className="bg-caution" label="Caution" />
                <ColorSwatch className="bg-danger" label="Danger" />
                <ColorSwatch className="bg-info" label="Info" />
              </div>
              <h3 className="mt-6 text-lg font-medium">Status Buttons</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-success text-success-foreground hover:bg-success/90">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Success
                </Button>
                <Button className="bg-caution text-caution-foreground hover:bg-caution/90">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Caution
                </Button>
                <Button className="bg-danger text-danger-foreground hover:bg-danger/90">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Danger
                </Button>
                <Button className="bg-info text-info-foreground hover:bg-info/90">
                  <Info className="mr-2 h-4 w-4" />
                  Info
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
