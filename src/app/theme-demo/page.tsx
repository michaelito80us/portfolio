import { ThemeDemo } from '@/components/theme-demo/index';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Theme System Demo',
  description: 'A demonstration of our theme system with Tailwind CSS and Radix UI',
};

export default function ThemeDemoPage() {
  return <ThemeDemo />;
}
