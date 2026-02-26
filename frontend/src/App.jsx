import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardShell from './pages/DashboardShell';
import DashboardOverview from './pages/DashboardOverview';
import Practice from './pages/Practice';
import Assessments from './pages/Assessments';
import Resources from './pages/Resources';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardShell />,
    children: [
      {
        index: true,
        element: <DashboardOverview />,
      },
      {
        path: 'practice',
        element: <Practice />,
      },
      {
        path: 'assessments',
        element: <Assessments />,
      },
      {
        path: 'resources',
        element: <Resources />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
