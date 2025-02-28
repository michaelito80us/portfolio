import React from 'react';

export default function LocalePage({ params }: { params: { locale: string } }) {
  return (
    <div>
      <h1>Locale: {params.locale}</h1>
      <p>This is a placeholder for localized content.</p>
    </div>
  );
}
