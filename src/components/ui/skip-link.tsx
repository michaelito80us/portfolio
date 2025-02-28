'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SkipLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const SkipLink = React.forwardRef<HTMLAnchorElement, SkipLinkProps>(({ className, children, href, ...props }, ref) => {
  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-md focus:border focus:border-ring focus:bg-background focus:p-3 focus:text-foreground focus:shadow-md focus:outline-none',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
});

SkipLink.displayName = 'SkipLink';

export { SkipLink };
