// src/features/university/views/UniversityDashboard.jsx
import  { useState, useEffect } from 'react';
import MetricCard from '../../../components/data-display/MetricCard';
import AssetPlaceholder from '../../../components/common/AssetPlaceholder';
import { universityService } from '../../../service/universityService'

export default function UniversityDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [pendingLogs, setPendingLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const [metricsData, logsData] = await Promise.all([
          universityService.getCoordinatorMetrics(),
          universityService.getPendingLogbooks()
        ]);
        setMetrics(metricsData);
        setPendingLogs(logsData);
      } catch (err) {
        console.error("Faculty audit logs pull breakdown:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFacultyData();
  }, []);

  const handleLogSignOff = async (id) => {
    try {
      await universityService.signOffLogbook(id, 'Approved');
      // Instantly optimize local state array matrix by filtering out the approved logbook row
      setPendingLogs(prev => prev.filter(log => log.id !== id));
      alert("Academic log verification stamp successfully committed!");
    } catch (err) {
      console.error("Failed to commit faculty sign-off evaluation:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-xs font-semibold text-portal-muted animate-pulse">
        Assembling institutional academic compliance registers...
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-portal-text tracking-tight">Faculty Coordinator Console</h1>
        <p className="text-xs text-portal-muted mt-0.5">Audit system compliance metrics, monitor placement ratios, and evaluate logbook diaries</p>
      </div>

      {/* Global Academic Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <MetricCard title="Total Enrolled" value={metrics?.totalEnrolled} change="Registered students" status="default" />
        <MetricCard title="Active Attachments" value={metrics?.placedInterns} change="Verified openings" status="success" />
        <MetricCard title="Unplaced Trainees" value={metrics?.unplacedStudents} change="Follow-up needed" status="warning" />
        <MetricCard title="Pending Review" value={pendingLogs.length} change="Action required" status="info" />
      </div>

      {/* Logbook Audit Pipeline Datatable */}
      <div className="bg-white rounded-xl border border-portal-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-portal-border bg-slate-50/60">
          <h3 className="font-bold text-portal-text text-sm">Industrial Diary Signature Pipeline</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/40 border-b border-portal-border text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3.5">Student Details</th>
                <th className="px-6 py-3.5">Assigned Attachment Firm</th>
                <th className="px-6 py-3.5">Log Target</th>
                <th className="px-6 py-3.5">Supervisor Status</th>
                <th className="px-6 py-3.5 text-right">Academic Sign-off</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-portal-border">
              {pendingLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-xs text-portal-muted font-medium">
                    🎉 All submitted logbooks have been reviewed and signed off.
                  </td>
                </tr>
              ) : (
                pendingLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <AssetPlaceholder type="avatar" name={log.studentName} className="h-8 w-8 text-[11px]" />
                      <div>
                        <span className="font-bold text-portal-text block text-xs">{log.studentName}</span>
                        <span className="text-[10px] text-portal-muted block font-medium">{log.regNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-portal-text">{log.companyName}</td>
                    <td className="px-6 py-4 text-xs text-portal-muted font-medium">Week {log.weekNumber} Log</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                        ✓ {log.firmStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleLogSignOff(log.id)}
                        className="px-3 py-1.5 text-[11px] font-bold bg-slate-950 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
                      >
                        Sign Off Logbook
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}