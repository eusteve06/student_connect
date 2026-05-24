// src/features/student/views/StudentDashboard.jsx
import React from 'react';
import { useStudentDashboardData } from '../hooks/useStudentDashboardData';
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import MetricCard from '../../../components/data-display/MetricCard';
import Button from '../../../components/common/Button';

export default function StudentDashboard() {
        const { metrics, applications, isLoading, error } = useStudentDashboardData();

        if (isLoading) return <div className="p-8">Loading your workspace...</div>;
        if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  return (
        <DashboardLayout role="student">
       {/* Render your UI elements cleanly mapping through actual live database records */}
       <MetricCard title="Total Applications" value={metrics?.totalApplications} />
       
       {/* Loop live applications */}
       {applications.map(app => (
         <li key={app.id}>{app.role} at {app.firm}</li>
       ))}
    </DashboardLayout>
  );
}