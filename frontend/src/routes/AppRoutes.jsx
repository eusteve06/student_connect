import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Import View Templates
import StudentAuth from '../features/auth/StudentAuth';
import FirmAuth from '../features/auth/FirmAuth';
import UniversityAuth from '../features/auth/UniversityAuth';
import StudentDashboard from '../features/student/views/StudentDashboard';
import FirmDashboard from '../features/firms/views/FirmDashboad';
import UniversityDashboard from '../features/university/views/UniversityDashboard';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login/student" replace />,
  },
  // 1. Authentication Portals Route Group
  {
    path: '/login/student',
    element: <StudentAuth />, // Wired directly
  },
  {
    path: '/login/firm',
    element: <FirmAuth />
  },
  {
    path: '/login/university',
    element: <UniversityAuth />,
  },
  
  // 2. Secured Multi-Tenant Dashboard View Group
  {
    path: '/student',
    element: <StudentDashboard />,
  },
  {
    path: '/firm',
    element: <FirmDashboard />,
  },
  {
    path: '/university',
    element: <UniversityDashboard />,
  },

  // 3. Fallback Catch-All Route (404 Handling)
  {
    path: '*',
    element: (
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-portal-text">404</h1>
        <p className="text-sm text-portal-muted mt-2 mb-4">The requested workspace path does not exist.</p>
        <a href="/" className="text-xs font-semibold text-indigo-600 hover:underline">Return to safety</a>
      </div>
    ),
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}