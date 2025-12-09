import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './clients/queryClient';
import App from './App';
import '@jpx/shared/utils/i18n';
import '@jpx/shared/styles/index.css';

import { initMonitoring } from './clients/monitoring';
import ErrorBoundary from './components/ErrorBoundary';

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
