// src/features/student/views/StudentLogbook.jsx
import  { useState } from 'react';
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
      <div className="mb-8 border-b border-portal-border pb-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-student-primary bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          Daily Logbook Engine
        </span>
        <h1 className="text-2xl font-bold text-portal-text tracking-tight mt-3">
          Industrial Attachment Logbook
        </h1>
        <p className="text-xs text-portal-muted mt-1">
          Record daily system duties and weekly supervisor reviews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Entries (Takes 2 columns) */}
        <form onSubmit={handleSubmitLog} className="lg:col-span-2 space-y-6">
          
          {/* Week Selector Bar */}
          <div className="bg-white p-4 rounded-xl border border-portal-border flex items-center justify-between shadow-sm">
            <span className="text-sm font-bold text-portal-text">Active Logging Window:</span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((wk) => (
                <button
                  key={wk}
                  type="button"
                  onClick={() => setCurrentWeek(wk)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    currentWeek === wk
                      ? 'bg-slate-950 text-white border-slate-950'
                      : 'bg-white text-portal-text border-portal-border hover:bg-slate-50'
                  }`}
                >
                  Week {wk}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Records Input Block */}
          <div className="bg-white rounded-xl border border-portal-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-portal-border bg-slate-50/60">
              <h3 className="font-bold text-portal-text text-sm">Daily Tasks Breakdown</h3>
            </div>
            
            <div className="p-6 space-y-4">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                <div key={day} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <label className="w-full md:w-32 text-xs font-bold text-portal-text uppercase tracking-wide pt-2">
                    {day}
                  </label>
                  <textarea
                    name={day}
                    rows="2"
                    value={logEntries[day]}
                    onChange={handleInputChange}
                    placeholder={`Describe technical assignments performed on ${day}...`}
                    className="w-full text-sm border border-portal-border rounded-lg px-3 py-2 bg-white text-portal-text placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Synthesis Blocks */}
          <div className="bg-white rounded-xl border border-portal-border shadow-sm p-6 space-y-4">
            <div>
              <h3 className="font-bold text-portal-text text-sm">Weekly Summary & Reflection</h3>
              <p className="text-[11px] text-portal-muted mt-0.5">Synthesize major challenges overcome and competencies acquired.</p>
            </div>
            <textarea
              rows="4"
              value={weeklyReflection}
              onChange={(e) => setWeeklyReflection(e.target.value)}
              placeholder="Provide a comprehensive summary of this week's technical achievements..."
              className="w-full text-sm border border-portal-border rounded-lg px-3 py-2 bg-white text-portal-text placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
            />
            
            <div className="flex justify-end">
              <Button type="submit" className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold h-10 px-6 border-0 shadow-sm transition-colors">
                Lock and Submit Week {currentWeek} Log
              </Button>
            </div>
          </div>

        </form>

        {/* Right Column: Sign-off & Audit Status Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-portal-border shadow-sm p-5 space-y-4">
            <h3 className="font-bold text-portal-text text-sm border-b border-portal-border pb-2">
              Verification Matrix
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-portal-muted font-medium">Industry Sign-Off:</span>
                <span className="px-2 py-0.5 font-bold uppercase tracking-wide text-[10px] bg-amber-50 text-amber-800 border border-amber-200 rounded">
                  Pending Review
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-portal-muted font-medium">Faculty Evaluation:</span>
                <span className="px-2 py-0.5 font-bold uppercase tracking-wide text-[10px] bg-slate-50 text-slate-400 border border-slate-200 rounded">
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