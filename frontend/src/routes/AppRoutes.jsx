import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Import View Templates
import StudentAuth from '../features/auth/StudentAuth';
import StudentDashboard from '../features/student/views/StudentDashboard';
import FirmDashboard from '../features/firms/views/FirmDashboad';
import UniversityDashboard from '../features/university/views/UniversityDashboard';

// Remaining Auth Placeholders (To be replaced later when building their modules)
const LoginPlaceholder = ({ role }) => (
  <div className="flex h-screen items-center justify-center bg-slate-50">
    <div className="p-8 bg-white rounded-xl border border-portal-border shadow-sm max-w-sm w-full text-center">
      <h2 className="text-xl font-bold text-portal-text uppercase tracking-wider mb-2">{role} Portal</h2>
      <p className="text-sm text-portal-muted mb-6">Authentication Interface Placeholder</p>
      <a href={`/${role}`} className="block w-full py-2.5 px-4 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors">
        Bypass Login (Dev Mode)
      </a>
    </div>
  </div>
);

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
    element: <LoginPlaceholder role="firm" />,
  },
  {
    path: '/login/university',
    element: <LoginPlaceholder role="university" />,
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