import 'reflect-metadata';
import { QueryClient, QueryClientProvider } from '@repo/core-sdk-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

const queryClient = new QueryClient();

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
