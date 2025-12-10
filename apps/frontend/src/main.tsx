import '@jpx/shared/utils/i18n';
import '@jpx/shared/styles/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { initMonitoring } from './clients/monitoring';
import { queryClient } from './clients/queryClient';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';

// Initialize monitoring (Highlight) if configured
void initMonitoring();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
