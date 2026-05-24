import React from 'react';
import { navigationLinks } from './navigationConfig';

export default function Sidebar({ role = 'student', currentPath = '' }) {
  const links = navigationLinks[role] || [];

  // Map role profiles to active indicator accent classes from tailwind.config
  const activeColorThemes = {
    student: 'bg-student-light text-student-primary border-student-primary',
    firm: 'bg-firm-light text-firm-primary border-firm-primary',
    university: 'bg-university-light text-university-primary border-university-primary',
  };

  return (
    <aside className="w-64 bg-white border-r border-portal-border min-h-screen hidden md:flex flex-col sticky top-0">
      {/* Branding Header Area */}
      <div className="h-16 flex items-center px-6 border-b border-portal-border bg-portal-bg/50">
        <span className="text-xl font-bold text-portal-text tracking-tight">
          Plug<span className="text-blue-600">.</span>Portal
        </span>
        <span className="ml-2 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-gray-100 rounded text-portal-muted">
          {role}
        </span>
      </div>

      {/* Dynamic Nav link Items list */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        {links.map((link) => {
          const isActive = currentPath === link.href;
          return (
            <a
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border-l-4 border-transparent
                ${isActive 
                  ? activeColorThemes[role]
                  : 'text-portal-muted hover:bg-gray-50 hover:text-portal-text'
                }`}
            >
              {/* Fallback geometric block placeholder for simple icon packs */}
              <div className={`h-4 w-4 rounded-sm flex-shrink-0 ${isActive ? 'bg-current' : 'bg-gray-300'}`} />
              {link.name}
            </a>
          );
        })}
      </nav>

      {/* User Session Action Footer footer area */}
      <div className="p-4 border-t border-portal-border bg-gray-50/50">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <div className="h-4 w-4 rounded-sm bg-red-400 flex-shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}