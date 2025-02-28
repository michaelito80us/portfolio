import React from 'react';

export default function LocaleLayout({ children }: { children: React.ReactNode; params: { locale: string } }) {
  return <>{children}</>;
}
