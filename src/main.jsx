// index.js

import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AuthProvider from './providers/AuthProvider';
import { router } from './routes/Routes';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

// Create a QueryClient instance
const queryClient = new QueryClient();

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'light', // Change to 'dark' if needed
  },
});

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);
