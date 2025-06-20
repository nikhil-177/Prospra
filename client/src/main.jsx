import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer
      position="top-center"
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      autoClose={3000}
    />
    <App />
  </QueryClientProvider>
);
