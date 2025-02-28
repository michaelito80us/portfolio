'use client';

import * as React from 'react';
import { Copy, Check } from 'lucide-react';
import { useColorHex } from '../hooks/use-color-hex';

interface ColorSwatchProps {
  className: string;
  label: string;
  showHex?: boolean;
}

export function ColorSwatch({ className, label, showHex = true }: ColorSwatchProps) {
  const hex = useColorHex(className);
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${className} group relative h-12 w-full rounded-md ring-1 ring-border`}>
        {showHex && (
          <button
            onClick={copyToClipboard}
            className="absolute inset-0 flex items-center justify-center rounded-md bg-black/20 opacity-0 transition-opacity group-hover:opacity-100"
            aria-label={`Copy ${hex} to clipboard`}
          >
            {copied ? (
              <span className="text-xs font-medium text-white">Copied!</span>
            ) : (
              <Copy className="h-4 w-4 text-white" />
            )}
          </button>
        )}
      </div>
      <div className="mt-1 text-center">
        <div className="text-xs">{label}</div>
        {showHex && <div className="font-mono text-xs">{hex}</div>}
      </div>
    </div>
  );
}
