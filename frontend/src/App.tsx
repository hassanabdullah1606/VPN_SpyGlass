import Home from './pages/home/Home';
import Faq from './pages/FAQ/Faq';
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import './styles/global.scss';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Signup from './pages/Signup/Signup';

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Outlet />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/settings',
          element: <Settings />,
        },
        {
          path: '/FAQ',
          element: <Faq />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <Signup />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
