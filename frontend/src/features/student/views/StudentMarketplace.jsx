// src/features/student/views/StudentMarketplace.jsx
import { useState, useEffect } from 'react';
import AssetPlaceholder from '../../../components/common/AssetPlaceholder';
import { studentService } from '../../../service/studentService';

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
      isMounted = false;
    };
  }, []);

  const handleApply = async (job) => {
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
      <div className="flex h-64 items-center justify-center">
        <span className="text-[10px] font-semibold text-slate-400 animate-pulse uppercase tracking-[0.2em] font-['ui-sans-serif',_system-ui,_sans-serif]">
          Sifting through active industry vacancies…
        </span>
      </div>
    );
  }

  return (
    <>
      {/* View Header */}
      <div className="mb-8 border-b border-[#E2DDD8] pb-6 relative">
        <div className="absolute bottom-0 left-0 h-px w-16 bg-[#1E4D8C]" />
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1E4D8C] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 font-['ui-sans-serif',_system-ui,_sans-serif]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1E4D8C]" />
          Placement Matrix
        </span>
        <h1 className="text-[1.75rem] font-bold text-[#0D1B2A] tracking-tight mt-3 font-['Georgia',_serif]">
          Industrial Attachment Marketplace
        </h1>
        <p className="text-[13px] text-slate-400 mt-1.5 font-['ui-sans-serif',_system-ui,_sans-serif]">
          Browse and apply to active industry placement vacancies.
        </p>
      </div>

      {/* Vacancy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {vacancies.map((job) => {
          const hasApplied = appliedIds.includes(job.id);

          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-[#E2DDD8] p-6 shadow-[0_2px_16px_0_rgba(13,27,42,0.04)] flex flex-col justify-between hover:border-[#1E4D8C]/30 hover:shadow-[0_4px_24px_0_rgba(30,77,140,0.08)] transition-all duration-200 group"
            >
              <div>
                {/* Company / Role Header */}
                <div className="flex items-center gap-4 mb-4">
                  <AssetPlaceholder
                    type="logo"
                    name={job.companyName}
                    className="h-10 w-10 text-xs font-black rounded-xl shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-[#0D1B2A] text-sm leading-snug group-hover:text-[#1E4D8C] transition-colors duration-150 font-['Georgia',_serif]">
                      {job.role}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5 font-['ui-sans-serif',_system-ui,_sans-serif]">
                      {job.companyName}
                    </p>
                  </div>
                </div>

                {/* Meta tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 text-[10px] font-semibold bg-[#F7F6F3] text-slate-500 border border-[#E2DDD8] rounded-md font-['ui-sans-serif',_system-ui,_sans-serif]">
                    📍 {job.location}
                  </span>
                  <span className="px-2.5 py-1 text-[10px] font-semibold bg-[#F7F6F3] text-slate-500 border border-[#E2DDD8] rounded-md font-['ui-sans-serif',_system-ui,_sans-serif]">
                    ⏱️ {job.duration}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed mb-6 font-['ui-sans-serif',_system-ui,_sans-serif]">
                  {job.description}
                </p>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-[#F0EDE8] flex justify-end">
                <button
                  type="button"
                  disabled={hasApplied}
                  onClick={() => handleApply(job)}
                  className={`px-5 py-2 text-[12px] font-semibold rounded-lg transition-all duration-150 font-['ui-sans-serif',_system-ui,_sans-serif] ${
                    hasApplied
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                      : 'bg-[#0D1B2A] text-white hover:bg-[#1E4D8C]'
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