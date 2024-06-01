import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider'
import { router } from './routes/Routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    {/* <div className='max-w-7xl mx-auto'> */}
     <QueryClientProvider client={queryClient} >
     <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
     </QueryClientProvider>
    {/* </div> */}
  </HelmetProvider>
)
