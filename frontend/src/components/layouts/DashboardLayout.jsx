import React from 'react';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children, role = 'student', currentPath = '' }) {
  return (
    <div className="flex bg-portal-bg min-h-screen text-portal-text font-sans antialiased">
      {/* 1. Structural Fixed Left Column Sidebar Panel */}
      <Sidebar role={role} currentPath={currentPath} />

      {/* Right Column Layout Wrapper Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. Horizontal Top Navbar Utility Header */}
        <header className="h-16 bg-white border-b border-portal-border flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Mobile Navigation Menu Menu Toggle Trigger (Hidden on Desktop views) */}
            <button className="md:hidden p-1.5 text-portal-muted hover:bg-gray-100 rounded-lg">
              <div className="w-5 h-0.5 bg-current mb-1" />
              <div className="w-5 h-0.5 bg-current mb-1" />
              <div className="w-5 h-0.5 bg-current" />
            </button>
            <div className="text-sm text-portal-muted font-medium hidden sm:block">
              Academic Term Placement Track: <span className="font-semibold text-portal-text">2026/2027</span>
            </div>
          </div>

          {/* Profile Badge Actions Dropdown item metadata */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-portal-text">Alex Chambers</p>
              <p className="text-[11px] text-portal-muted font-medium capitalize">{role} Account</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center font-bold text-xs text-portal-muted">
              AC
            </div>
          </div>
        </header>

        {/* 3. Central Application Feature Main Canvas Node View Sheet */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}