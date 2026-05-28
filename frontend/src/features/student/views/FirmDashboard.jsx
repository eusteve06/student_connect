// src/features/firm/views/FirmDashboard.jsx
import { useState, useEffect } from 'react';
import MetricCard from '../../../components/data-display/MetricCard';
import AssetPlaceholder from '../../../components/common/AssetPlaceholder';
import { firmService } from '../../../services/firmService';

export default function FirmDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFirmData = async () => {
      try {
        const [metricsData, applicantsData] = await Promise.all([
          firmService.getFirmMetrics(),
          firmService.getApplicants()
        ]);
        setMetrics(metricsData);
        setApplicants(applicantsData);
      } catch (err) {
        console.error("Firm operational data fetch breakdown:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFirmData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await firmService.updateApplicantStatus(id, newStatus);
      // Locally optimize state mapping arrays to reflect changes instantly
      setApplicants(prev => 
        prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
      );
    } catch (err) {
      console.error("Failed to commit status modifications:", err);
    }
  };

  if (loading) {
    return (
      <>
        <div className="flex h-64 items-center justify-center text-xs font-semibold text-portal-muted animate-pulse">
          Streaming corporate registry records...
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-portal-text tracking-tight">Partner Dashboard</h1>
        <p className="text-xs text-portal-muted mt-0.5">Manage industrial attachments, evaluate logs, and issue placement offers</p>
      </div>

      {/* Corporate Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <MetricCard title="New Requests" value={metrics?.newApplications} change="Needs review" status="info" />
        <MetricCard title="Interviews Staged" value={metrics?.interviewsPending} change="Calendar updates" status="default" />
        <MetricCard title="Active Placements" value={metrics?.activeInterns} change="On-site check" status="success" />
        <MetricCard title="Pending Logbooks" value={metrics?.unverifiedLogbooks} change="Sign-off required" status="warning" />
      </div>

      {/* Applicants Datatable View Layout */}
      <div className="bg-white rounded-xl border border-portal-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-portal-border bg-slate-50/60">
          <h3 className="font-bold text-portal-text text-sm">Incoming Attachment Applications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/40 border-b border-portal-border text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3.5">Student Details</th>
                <th className="px-6 py-3.5">Target Role</th>
                <th className="px-6 py-3.5">Submission Date</th>
                <th className="px-6 py-3.5">Status Tracking</th>
                <th className="px-6 py-3.5 text-right">Actions Matrix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-portal-border">
              {applicants.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <AssetPlaceholder type="avatar" name={app.studentName} className="h-8 w-8 text-[11px]" />
                    <div>
                      <span className="font-bold text-portal-text block text-xs">{app.studentName}</span>
                      <span className="text-[10px] text-portal-muted block font-medium">{app.university}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-portal-muted">{app.role}</td>
                  <td className="px-6 py-4 text-xs text-portal-muted">{app.appliedDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded border ${
                      app.status === 'Approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                      app.status === 'Interviewing' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                      'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-1.5">
                    <button 
                      onClick={() => handleStatusChange(app.id, 'Interviewing')}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-portal-border text-portal-text rounded hover:bg-slate-50 transition-colors"
                    >
                      📅 Interview
                    </button>
                    <button 
                      onClick={() => handleStatusChange(app.id, 'Approved')}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-slate-950 text-white rounded hover:bg-slate-800 transition-colors"
                    >
                      ✓ Accept
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}