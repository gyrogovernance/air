import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import Infrastructure from './pages/Infrastructure';
import Craft from './pages/Craft';
import Superintelligence from './pages/Superintelligence';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import FormPage from './pages/FormPage';
import CraftSubmit from './pages/CraftSubmit';
import FellowshipJoin from './pages/FellowshipJoin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'infrastructure', element: <Infrastructure /> },
      { path: 'craft', element: <Craft /> },
      { path: 'craft/form', element: <CraftSubmit /> },
      { path: 'superintelligence', element: <Superintelligence /> },
      { path: 'superintelligence/form', element: <FellowshipJoin /> },
      { path: 'superintelligence/fund', element: <FormPage /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'cookies', element: <Cookies /> },
      /* Legacy Index → Craft */
      { path: 'index', element: <Navigate to="/craft" replace /> },
      { path: 'index/form', element: <Navigate to="/craft/form" replace /> },
    ],
  },
]);
