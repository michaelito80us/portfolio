'use client';

import * as React from 'react';
import { Check, X } from 'lucide-react';
import { useColorHex } from '../hooks/use-color-hex';
import { getContrastRatio, getWCAGCompliance, getSuggestion, formatHexDisplay } from '../utils/color-utils';

interface ContrastRatioProps {
  background: string;
  foreground: string;
  label: string;
}

export function ContrastRatio({ background, foreground, label }: ContrastRatioProps) {
  const bgHex = useColorHex(background);
  const fgHex = useColorHex(foreground);
  const [ratio, setRatio] = React.useState(0);
  const [compliance, setCompliance] = React.useState({ aa: false, aaa: false, aaLarge: false, aaaLarge: false });
  const [suggestion, setSuggestion] = React.useState('');

  React.useEffect(() => {
    if (bgHex && fgHex) {
      // For contrast calculation, use only the RGB part if there's opacity
      const bgHexForContrast = bgHex.length > 7 ? bgHex.substring(0, 7) : bgHex;
      const fgHexForContrast = fgHex.length > 7 ? fgHex.substring(0, 7) : fgHex;

      const contrastRatio = getContrastRatio(bgHexForContrast, fgHexForContrast);
      setRatio(contrastRatio);
      const wcagCompliance = getWCAGCompliance(contrastRatio);
      setCompliance(wcagCompliance);

      // Generate suggestion if AA fails
      if (!wcagCompliance.aa) {
        setSuggestion(getSuggestion(bgHexForContrast, fgHexForContrast, label));
      } else {
        setSuggestion('');
      }
    }
  }, [bgHex, fgHex, label]);

  // Extract color names for display
  const bgName = background.replace(/^bg-/, '');
  const fgName = foreground.replace(/^text-/, '');
  const bgNameDisplay = bgName.charAt(0).toUpperCase() + bgName.slice(1);
  const fgNameDisplay = fgName.charAt(0).toUpperCase() + fgName.slice(1);

  // Create a style object for the colored section to ensure all text elements inherit the color
  const coloredSectionStyle = {
    backgroundColor: bgHex,
    color: fgHex,
    '--text-color': fgHex,
  } as React.CSSProperties;

  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-border">
      <div style={coloredSectionStyle} className="flex flex-col p-4 [&_*]:!text-[color:var(--text-color)]">
        <div className="flex items-center justify-between">
          <span className="font-medium">{label}</span>
          <span className="font-mono text-xs">{ratio.toFixed(2)}:1</span>
        </div>
        <div className="mt-3 space-y-2">
          <p className="text-sm">This is normal text (16px)</p>
          <p className="text-xs">This is small text (12px)</p>
          <p className="text-lg font-semibold">This is large text (18px, bold)</p>
        </div>
      </div>

      <div className="bg-card p-3">
        <div className="mb-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div style={{ backgroundColor: bgHex }} className={`h-4 w-4 rounded-sm`}></div>
              <span className="text-xs">
                Background: <span className="font-medium">{bgNameDisplay}</span>
              </span>
            </div>
            <span className="font-mono text-xs">{formatHexDisplay(bgHex)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div style={{ backgroundColor: fgHex }} className={`h-4 w-4 rounded-sm`}></div>
              <span className="text-xs">
                Foreground: <span className="font-medium">{fgNameDisplay}</span>
              </span>
            </div>
            <span className="font-mono text-xs">{formatHexDisplay(fgHex)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1 text-xs">
            {compliance.aa ? <Check className="h-3 w-3 text-success" /> : <X className="h-3 w-3 text-danger" />}
            <span>AA {compliance.aa ? 'Pass' : 'Fail'}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            {compliance.aaa ? <Check className="h-3 w-3 text-success" /> : <X className="h-3 w-3 text-danger" />}
            <span>AAA {compliance.aaa ? 'Pass' : 'Fail'}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            {compliance.aaLarge ? <Check className="h-3 w-3 text-success" /> : <X className="h-3 w-3 text-danger" />}
            <span>AA Large {compliance.aaLarge ? 'Pass' : 'Fail'}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            {compliance.aaaLarge ? <Check className="h-3 w-3 text-success" /> : <X className="h-3 w-3 text-danger" />}
            <span>AAA Large {compliance.aaaLarge ? 'Pass' : 'Fail'}</span>
          </div>
        </div>

        {!compliance.aa && (
          <div className="mt-2 rounded border border-danger/20 bg-danger p-2 text-xs text-danger-foreground">
            <strong>Suggestion:</strong> {suggestion}
          </div>
        )}
      </div>
    </div>
  );
}
