import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function DashboardLayout({ children, role = 'student' }) {
  return (
    <div className="flex min-h-screen bg-slate-50 text-portal-text">
      {/* Sidebar navigation panel */}
      <Sidebar role={role} />

      {/* Content canvas wrapper */}
      <div className="pl-64 w-full flex flex-col min-h-screen">
        {/* Top header bar */}
        <Navbar role={role} />

        {/* Core page workspace views */}
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}