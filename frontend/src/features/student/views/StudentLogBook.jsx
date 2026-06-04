// src/features/student/views/StudentLogbook.jsx
import { useState } from 'react';
import Button from '../../../components/common/Button';

export default function StudentLogbook() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [logEntries, setLogEntries] = useState({
    monday: '', tuesday: '', wednesday: '', thursday: '', friday: ''
  });
  const [weeklyReflection, setWeeklyReflection] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogEntries(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitLog = (e) => {
    e.preventDefault();
    console.log(`Submitting Week ${currentWeek} logbook data:`, { logEntries, weeklyReflection });
    alert(`Week ${currentWeek} log entry staged successfully!`);
  };

  return (
    <>
      {/* View Header */}
      <div className="mb-8 border-b border-[#E2DDD8] pb-6 relative">
        <div className="absolute bottom-0 left-0 h-px w-16 bg-[#1E4D8C]" />
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1E4D8C] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 font-['ui-sans-serif',_system-ui,_sans-serif]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1E4D8C]" />
          Daily Logbook Engine
        </span>
        <h1 className="text-[1.75rem] font-bold text-[#0D1B2A] tracking-tight mt-3 font-['Georgia',_serif]">
          Industrial Attachment Logbook
        </h1>
        <p className="text-[13px] text-slate-400 mt-1.5 font-['ui-sans-serif',_system-ui,_sans-serif]">
          Record daily system duties and weekly supervisor reviews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Form Entries (Takes 2 columns) */}
        <form onSubmit={handleSubmitLog} className="lg:col-span-2 space-y-6">

          {/* Week Selector Bar */}
          <div className="bg-white p-4 rounded-2xl border border-[#E2DDD8] flex items-center justify-between shadow-[0_2px_16px_0_rgba(13,27,42,0.04)]">
            <span className="text-sm font-bold text-[#0D1B2A] font-['Georgia',_serif]">Active Logging Window:</span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((wk) => (
                <button
                  key={wk}
                  type="button"
                  onClick={() => setCurrentWeek(wk)}
                  className={`w-9 h-9 text-xs font-bold rounded-lg border transition-all duration-150 font-['ui-sans-serif',_system-ui,_sans-serif] ${
                    currentWeek === wk
                      ? 'bg-[#0D1B2A] text-white border-[#0D1B2A]'
                      : 'bg-[#F7F6F3] text-slate-500 border-[#E2DDD8] hover:border-[#1E4D8C] hover:text-[#1E4D8C]'
                  }`}
                >
                  {wk}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Records Input Block */}
          <div className="bg-white rounded-2xl border border-[#E2DDD8] shadow-[0_2px_16px_0_rgba(13,27,42,0.04)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E2DDD8] bg-[#F7F6F3] flex items-center gap-3">
              <div className="w-0.5 h-5 rounded-full bg-[#1E4D8C]" />
              <h3 className="font-bold text-[#0D1B2A] text-sm tracking-tight font-['Georgia',_serif]">Daily Tasks Breakdown</h3>
            </div>

            <div className="p-6 space-y-4">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                <div key={day} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6 border-b border-[#F0EDE8] pb-4 last:border-0 last:pb-0">
                  <label className="w-full md:w-32 text-[10px] font-bold text-[#0D1B2A] uppercase tracking-[0.16em] pt-2 font-['ui-sans-serif',_system-ui,_sans-serif]">
                    {day}
                  </label>
                  <textarea
                    name={day}
                    rows="2"
                    value={logEntries[day]}
                    onChange={handleInputChange}
                    placeholder={`Describe technical assignments performed on ${day}...`}
                    className="w-full text-sm border border-[#E2DDD8] rounded-lg px-4 py-2.5 bg-[#F7F6F3] text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E4D8C]/15 focus:border-[#1E4D8C] focus:bg-white transition-all duration-200 resize-none font-['ui-sans-serif',_system-ui,_sans-serif] leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Synthesis Block */}
          <div className="bg-white rounded-2xl border border-[#E2DDD8] shadow-[0_2px_16px_0_rgba(13,27,42,0.04)] p-6 space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b border-[#E2DDD8]">
              <div className="w-0.5 h-5 rounded-full bg-[#1E4D8C] mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-[#0D1B2A] text-sm font-['Georgia',_serif]">Weekly Summary & Reflection</h3>
                <p className="text-[11px] text-slate-400 mt-0.5 font-['ui-sans-serif',_system-ui,_sans-serif]">Synthesize major challenges overcome and competencies acquired.</p>
              </div>
            </div>
            <textarea
              rows="4"
              value={weeklyReflection}
              onChange={(e) => setWeeklyReflection(e.target.value)}
              placeholder="Provide a comprehensive summary of this week's technical achievements..."
              className="w-full text-sm border border-[#E2DDD8] rounded-lg px-4 py-3 bg-[#F7F6F3] text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E4D8C]/15 focus:border-[#1E4D8C] focus:bg-white transition-all duration-200 resize-none font-['ui-sans-serif',_system-ui,_sans-serif] leading-relaxed"
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-[#0D1B2A] hover:bg-[#1E4D8C] text-white text-[12px] font-semibold py-2.5 px-6 border-0 shadow-none tracking-wide transition-colors duration-200 rounded-lg font-['ui-sans-serif',_system-ui,_sans-serif]"
              >
                Lock and Submit Week {currentWeek} Log
              </Button>
            </div>
          </div>

        </form>

        {/* Right Column: Sign-off & Audit Status Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E2DDD8] shadow-[0_2px_16px_0_rgba(13,27,42,0.04)] p-5 space-y-4">

            <div className="flex items-center gap-3 border-b border-[#E2DDD8] pb-4">
              <div className="w-0.5 h-5 rounded-full bg-[#1E4D8C]" />
              <h3 className="font-bold text-[#0D1B2A] text-sm font-['Georgia',_serif]">
                Verification Matrix
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium font-['ui-sans-serif',_system-ui,_sans-serif]">Industry Sign-Off:</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 font-semibold uppercase tracking-[0.14em] text-[9px] bg-amber-50 text-amber-700 border border-amber-200 rounded-md font-['ui-sans-serif',_system-ui,_sans-serif]">
                  <span className="w-1 h-1 rounded-full bg-amber-400" />
                  Pending Review
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium font-['ui-sans-serif',_system-ui,_sans-serif]">Faculty Evaluation:</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 font-semibold uppercase tracking-[0.14em] text-[9px] bg-[#F7F6F3] text-slate-400 border border-[#E2DDD8] rounded-md font-['ui-sans-serif',_system-ui,_sans-serif]">
                  <span className="w-1 h-1 rounded-full bg-[#E2DDD8]" />
                  Not Started
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}