import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const Form = React.forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>(
  ({ className, ...props }, ref) => <form ref={ref} className={cn('space-y-6', className)} {...props} />
);
Form.displayName = 'Form';

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('space-y-2', className)} {...props} />
);
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => <Label ref={ref} className={cn('text-sm font-medium', className)} {...props} />);
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => <Slot ref={ref} {...props} />
);
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
  )
);
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-destructive text-sm font-medium', className)} {...props} />
  )
);
FormMessage.displayName = 'FormMessage';

export { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage };
