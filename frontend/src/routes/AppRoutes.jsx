// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import StudentDashboard from '../features/student/views/StudentDashboard';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<div>Login Page view placeholder</div>} />
        
        {/* Student Feature Tree Context */}
        <Route path="/student/*" element={
          <DashboardLayout role="student">
            <Routes>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="placements" element={<div>Placements Browser view</div>} />
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </DashboardLayout>
        } />

        {/* Dynamic Fallback Catchall */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}