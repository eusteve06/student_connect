// src/features/student/views/StudentDashboard.jsx
import  { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import MetricCard from '../../../components/data-display/MetricCard';
import { studentService } from '../../../services/studentServices';

export default function StudentDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Execute asynchronous fetch requests concurrently
        const [metricsData, applicationsData] = await Promise.all([
          studentService.getMetrics(),
          studentService.getApplications()
        ]);
        
        setMetrics(metricsData);
        setApplications(applicationsData);
      } catch (err) {
        console.error("API Fetch operational failure:", err);
        setError("Failed to load live portal data from mock engine.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="flex h-64 items-center justify-center text-sm font-medium text-portal-muted animate-pulse">
          Querying secure datastore pipeline...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout role="student">
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {error} — Verify your terminal running `npm run api` on port 5000.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-portal-text tracking-tight">Student Hub</h1>
        <p className="text-xs text-portal-muted mt-0.5">Track attachment approvals and review compliance status</p>
      </div>

      {/* Dynamic Network Metric Matrix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <MetricCard title="Profile Status" value={metrics?.profileCompletion} change="Complete mandatory files" status="info" />
        <MetricCard title="Submissions" value={metrics?.applicationsSubmitted} change="Active partner review" status="default" />
        <MetricCard title="Interviews/Offers" value={metrics?.offersReceived} change="Action required" status="success" />
        <MetricCard title="Logbook Marks" value={metrics?.logbookProgress} change="Cycle not started" status="default" />
      </div>

      {/* Dynamic Applications Datatable Container */}
      <div className="bg-white rounded-xl border border-portal-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-portal-border bg-slate-50/60">
          <h3 className="font-bold text-portal-text text-sm">Active Placement Requests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/40 border-b border-portal-border text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3.5">Company Name</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Submission Date</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-portal-border">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-portal-text">{app.companyName}</td>
                  <td className="px-6 py-4 text-portal-muted">{app.role}</td>
                  <td className="px-6 py-4 text-portal-muted">{app.appliedDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${
                      app.status === 'Shortlisted' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}