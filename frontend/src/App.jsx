import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import ResumeHome from './pages/resume/ResumeHome';
import ResumeBuilder from './pages/resume/ResumeBuilder';
import ResumePreview from './pages/resume/ResumePreview';
import ResumeProof from './pages/resume/ResumeProof';
import ResumeShell from './pages/resume/ResumeShell';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ResumeHome />,
  },
  {
    element: <ResumeShell />,
    children: [
      { path: '/builder', element: <ResumeBuilder /> },
      { path: '/preview', element: <ResumePreview /> },
      { path: '/proof', element: <ResumeProof /> }
    ]
  }
]);

function App() {
  return (
    <ResumeProvider>
      <RouterProvider router={router} />
    </ResumeProvider>
  );
}

export default App;
