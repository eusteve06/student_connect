// src/routes/AppRoutes.jsx
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';

// Import Structural Shell Layout
import DashboardLayout from '../components/layouts/DashboardLayout';

// Import View Templates
import StudentAuth from '../features/auth/StudentAuth';
import FirmAuth from '../features/auth/FirmAuth';
import UniversityAuth from '../features/auth/UniversityAuth';
import StudentDashboard from '../features/student/views/StudentDashboard';
import StudentLogbook from '../features/student/views/StudentLogBook';
import StudentMarketplace from '../features/student/views/StudentMarketplace';
import FirmDashboard from '../features/firm/views/FirmDashboard';
import UniversityDashboard from '../features/university/views/UniversityDashboard';

// 🌟 Structural Layout Shells to provide React Router Context down to dashboards
const StudentShell = () => (
  <DashboardLayout role="student">
    <Outlet />
  </DashboardLayout>
);

const FirmShell = () => (
  <DashboardLayout role="firm">
    <Outlet />
  </DashboardLayout>
);

const UniversityShell = () => (
  <DashboardLayout role="university">
    <Outlet />
  </DashboardLayout>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login/student" replace />,
  },
  
  // 1. Authentication Portals Route Group (Unprotected, No Sidebar Layouts)
  {
    path: '/login/student',
    element: <StudentAuth />,
  },
  {
    path: '/login/firm',
    element: <FirmAuth />
  },
  {
    path: '/login/university',
    element: <UniversityAuth />,
  },
  
  // 2. Secured Multi-Tenant Dashboard View Groups (Wrapped cleanly in Shell Outlets)
  {
    path: '/student',
    element: <StudentShell />,
    children: [
      { path: '', element: <StudentDashboard /> },           // Maps to: /student
      { path: 'logbook', element: <StudentLogbook /> },       // Maps to: /student/logbook
      { path: 'placements', element: <StudentMarketplace /> } // Maps to: /student/placements
    ]
  },
  {
    path: '/firm',
    element: <FirmShell />,
    children: [
      { path: '', element: <FirmDashboard /> },
      
      { path: 'applicants', element: <FirmDashboard /> }// Maps to: /firm
    ]
  },
  {
    path: '/university',
    element: <UniversityShell />,
    children: [
      { path: '', element: <UniversityDashboard /> } ,        // Maps to: /university
      
      { path: 'audits', element: <UniversityDashboard /> },    // Maps to: /university/audits
    ]
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