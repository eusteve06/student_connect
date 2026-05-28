// src/features/student/views/StudentMarketplace.jsx
import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import AssetPlaceholder from '../../../components/common/AssetPlaceholder';
import { studentService } from  '../../../service/studentService'

// 🌟 THE WORKAROUND: Pure utility function placed completely OUTSIDE the component.
// React's render engine never scans this block during component lifecycles.
const buildApplicationPayload = (job) => {
  const dateString = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
  const randomId = 'app-gen-' + Math.floor(100000 + Math.random() * 900000);

  return {
    id: randomId,
    companyName: job.companyName,
    role: job.role,
    appliedDate: dateString,
    status: 'Pending Review'
  };
};

export default function StudentMarketplace() {
  const [vacancies, setVacancies] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  let isMounted = true;

  const fetchMarketplace = async () => {
    try {
      const data = await studentService.getPlacements();
      if (isMounted) {
        // Fallback to empty array if response data is structurally null
        setVacancies(data || []); 
      }
    } catch (err) {
      console.error("Marketplace fetch failure:", err);
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  fetchMarketplace();

  return () => {
    isMounted = false; // Prevents memory leak state calls
  };
}, []); 

  const handleApply = async (job) => {
    // Invoke our external pure data builder safely inside the event click macro
    const applicationPayload = buildApplicationPayload(job);

    try {
      await studentService.applyForPlacement(applicationPayload);
      setAppliedIds(prev => [...prev, job.id]);
      alert(`Success! Application submitted to ${job.companyName}.`);
    } catch (err) {
      console.error("Application processing error:", err);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="flex h-64 items-center justify-center text-xs font-semibold text-portal-muted animate-pulse">
          Sifting through active industry vacancies...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <div className="mb-8 border-b border-portal-border pb-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
          Placement Matrix
        </span>
        <h1 className="text-2xl font-bold text-portal-text tracking-tight mt-3">
          Industrial Attachment Marketplace
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vacancies.map((job) => {
          const hasApplied = appliedIds.includes(job.id);

          return (
            <div key={job.id} className="bg-white rounded-xl border border-portal-border p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <AssetPlaceholder type="logo" name={job.companyName} className="h-10 w-10 text-xs font-black" />
                  <div>
                    <h3 className="font-bold text-portal-text text-sm leading-snug">{job.role}</h3>
                    <p className="text-xs font-semibold text-slate-500">{job.companyName}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded">📍 {job.location}</span>
                  <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded">⏱️ {job.duration}</span>
                </div>

                <p className="text-xs text-portal-muted leading-relaxed mb-6">{job.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  disabled={hasApplied}
                  onClick={() => handleApply(job)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    hasApplied ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-950 text-white'
                  }`}
                >
                  {hasApplied ? '✓ Application Filed' : 'Submit Application'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}