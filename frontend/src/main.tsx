import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "sonner";
import { Provider } from 'react-redux'

//Pages
import Home from './pages/Home.tsx';
import Auth from './pages/Auth.tsx';
import Signin from './pages/Signin.tsx';
import store from './redux/store.ts';
import Profile from './pages/Profile.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route index={true}  element={<Home />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='/signup' element={<Auth />} />
      <Route path='/signin' element={<Signin />} />
    </>
  )
);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <Toaster visibleToasts={1} position='top-right' richColors/>
    <RouterProvider router={router} />
  </QueryClientProvider>
  </Provider>
)
