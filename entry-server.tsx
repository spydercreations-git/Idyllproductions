import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppContent } from './App';

export { PAGE_SEO_MAP, NOT_FOUND_SEO } from './constants/seoConfig';

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <AppContent />
    </StaticRouter>
  );
}
