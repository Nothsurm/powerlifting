import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

//Pages
import Home from './pages/Home.tsx';
import Auth from './pages/Auth.tsx';
import Signin from './pages/Signin.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route index={true}  element={<Home />} />
      </Route>
      <Route path='/signup' element={<Auth />} />
      <Route path='/signin' element={<Signin />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
