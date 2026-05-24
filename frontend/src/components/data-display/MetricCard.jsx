// src/components/data-display/MetricCard.jsx
import React from 'react';

export default function MetricCard({ title, value, change, status = 'default' }) {
  // Border indicators matching our role or status context
  const statusThemes = {
    default: 'border-l-portal-muted text-slate-900',
    success: 'border-l-emerald-500 text-emerald-700 bg-emerald-50/30',
    warning: 'border-l-amber-500 text-amber-700 bg-amber-50/30',
    info: 'border-l-blue-500 text-blue-700 bg-blue-50/30',
  };

  return (
    <div className={`bg-white p-6 rounded-xl border border-portal-border border-l-4 shadow-sm transition-transform hover:scale-[1.01] ${statusThemes[status]}`}>
      <p className="text-xs font-semibold text-portal-muted uppercase tracking-wider mb-1">
        {title}
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-portal-text">
          {value}
        </span>
        {change && (
          <span className="text-xs font-medium text-portal-muted">
            {change}
          </span>
        )}
      </div>
    </div>
  );
}