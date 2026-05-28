// src/features/student/views/StudentDashboard.jsx
import { useState, useEffect } from 'react';
import MetricCard from '../../../components/data-display/MetricCard';
import AssetPlaceholder from '../../../components/common/AssetPlaceholder';
import { studentService } from '../../../service/studentService';

const STATUS_CONFIG = {
  Approved:     { dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  Interviewing: { dot: 'bg-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  default:      { dot: 'bg-slate-300',   badge: 'bg-[#F7F6F3] text-slate-500 border-[#E2DDD8]' },
};

export default function StudentDashboard() {
  const [metrics, setMetrics]           = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const [metricsData, appsData] = await Promise.all([
          studentService.getMetrics(),
          studentService.getApplications(),
        ]);
        setMetrics(metricsData);
        setApplications(appsData || []);
      } catch (err) {
        console.error('Dashboard data extraction breakdown:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center gap-3">
          <span className="h-1 w-6 rounded-full bg-[#1E4D8C]/20 animate-pulse" />
          <span className="text-[10px] font-semibold text-slate-400 animate-pulse uppercase tracking-[0.22em] font-['ui-sans-serif',_system-ui,_sans-serif]">
            Hydrating workspace analytics…
          </span>
          <span className="h-1 w-6 rounded-full bg-[#1E4D8C]/20 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="font-['Georgia',_serif] space-y-8">

      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="relative pb-7 border-b border-[#E2DDD8]">

        {/* Faint decorative rule accent */}
        <div className="absolute bottom-0 left-0 h-px w-16 bg-[#1E4D8C]" />

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1E4D8C] bg-blue-50 border border-blue-100 font-['ui-sans-serif',_system-ui,_sans-serif] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1E4D8C] animate-ping" />
              Real-time Audit
            </span>
            <h1 className="text-[1.75rem] font-bold text-[#0D1B2A] tracking-tight leading-tight">
              Trainee Overview Console
            </h1>
            <p className="text-[13px] text-slate-400 mt-1.5 font-['ui-sans-serif',_system-ui,_sans-serif]">
              Your placement pipeline at a glance.
            </p>
          </div>

          {/* Timestamp chip */}
          <div className="mt-1 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#F7F6F3] border border-[#E2DDD8] self-start">
            <svg className="w-3 h-3 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.15em] font-['ui-sans-serif',_system-ui,_sans-serif]">
              Live Feed
            </span>
          </div>
        </div>
      </div>

      {/* ── Metrics Row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Profile Completion"
          value={metrics?.profileCompletion}
          change="Profile Vetted"
          status="success"
        />
        <MetricCard
          title="Applications Cast"
          value={metrics?.totalApplications}
          change="Staged in portal"
          status="default"
        />
        <MetricCard
          title="Interviews Booked"
          value={metrics?.interviewsScheduled}
          change="Response pending"
          status="warning"
        />
        <MetricCard
          title="Logbooks Pending"
          value={metrics?.pendingReview}
          change="Awaiting sign-off"
          status="info"
        />
      </div>

      {/* ── Application Track Panel ──────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#E2DDD8] overflow-hidden shadow-[0_2px_16px_0_rgba(13,27,42,0.04)]">

        {/* Panel Header */}
        <div className="px-6 py-4 bg-[#F7F6F3] border-b border-[#E2DDD8] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Left accent bar */}
            <div className="w-0.5 h-5 rounded-full bg-[#1E4D8C]" />
            <h3 className="font-bold text-[#0D1B2A] text-sm tracking-tight">
              Active Placement Applications
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-white border border-[#E2DDD8] text-slate-500 tabular-nums font-['ui-sans-serif',_system-ui,_sans-serif]">
              {applications.length} Staged
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2DDD8] bg-white">
                {[
                  { label: 'Corporate Entity',      align: '' },
                  { label: 'Target Workspace Role', align: '' },
                  { label: 'Timeline Sent',         align: '' },
                  { label: 'Pipeline Status',       align: 'text-right' },
                ].map(({ label, align }) => (
                  <th
                    key={label}
                    className={`px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.16em] font-['ui-sans-serif',_system-ui,_sans-serif] ${align}`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-16 text-center">
                    {/* Empty state illustration */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F7F6F3] border border-[#E2DDD8] flex items-center justify-center">
                        <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-xs text-slate-400 font-medium font-['ui-sans-serif',_system-ui,_sans-serif]">
                        No attachment applications launched inside this tracking cycle.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                applications.map((app, idx) => {
                  const cfg = STATUS_CONFIG[app.status] ?? STATUS_CONFIG.default;
                  return (
                    <tr
                      key={app.id}
                      className="group border-b border-[#F0EDE8] last:border-0 hover:bg-[#F7F6F3]/70 transition-colors duration-150"
                    >
                      {/* Company */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <AssetPlaceholder
                            type="avatar"
                            name={app.companyName}
                            className="h-8 w-8 text-[10px] font-bold rounded-lg shrink-0"
                          />
                          <div>
                            <span className="block text-xs font-bold text-[#0D1B2A] group-hover:text-[#1E4D8C] transition-colors duration-150 font-['ui-sans-serif',_system-ui,_sans-serif]">
                              {app.companyName}
                            </span>
                            <span className="block text-[10px] text-slate-400 mt-0.5 font-['ui-sans-serif',_system-ui,_sans-serif]">
                              Application #{String(idx + 1).padStart(2, '0')}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-slate-600 font-['ui-sans-serif',_system-ui,_sans-serif]">
                          {app.role}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-400 font-['ui-sans-serif',_system-ui,_sans-serif] tabular-nums">
                          {app.appliedDate}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-semibold text-[9px] uppercase tracking-[0.14em] rounded-md border font-['ui-sans-serif',_system-ui,_sans-serif] ${cfg.badge}`}>
                          <span className={`w-1 h-1 rounded-full ${cfg.dot}`} />
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Panel Footer */}
        {applications.length > 0 && (
          <div className="px-6 py-3 bg-[#F7F6F3] border-t border-[#E2DDD8] flex justify-between items-center">
            <span className="text-[10px] text-slate-400 font-['ui-sans-serif',_system-ui,_sans-serif]">
              Showing all {applications.length} application{applications.length !== 1 ? 's' : ''}
            </span>
            <button className="text-[10px] font-semibold text-[#1E4D8C] hover:text-[#0D1B2A] uppercase tracking-[0.15em] transition-colors font-['ui-sans-serif',_system-ui,_sans-serif]">
              View Full History →
            </button>
          </div>
        )}
      </div>

    </div>
  );
}