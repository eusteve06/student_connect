// src/features/auth/UniversityAuth.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function UniversityAuth() {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    facultyName: '',
    staffId: '',
    department: 'Computer Science',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/university');
  };

  return (
    <div className="flex min-h-screen bg-[#F7F6F3] font-['Georgia',_serif] antialiased selection:bg-indigo-100 selection:text-indigo-900">

      {/* LEFT COLUMN: Academic Presentation Canvas */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#1A1438] text-white p-14 flex-col justify-between relative overflow-hidden">

        {/* Layered background */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#a5b4fc_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-violet-400/8 blur-3xl" />

        {/* Top badge */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-300 bg-indigo-400/10 border border-indigo-400/20 px-3.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Internal Operations
          </span>

          <h1 className="text-[2.15rem] font-bold tracking-tight mt-8 max-w-sm leading-snug text-white">
            Academic Operations &<br />
            <span className="text-indigo-300">Compliance Gateway</span>
          </h1>

          <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-xs font-['ui-sans-serif',_system-ui,_sans-serif]">
            Oversee attachment matrices, approve industrial partner credentials, and audit student–supervisor pairings.
          </p>
        </div>

        {/* Divider + quote */}
        <div className="relative z-10 max-w-sm">
          <div className="w-10 h-px bg-indigo-400 mb-6" />
          <blockquote className="text-base font-normal text-slate-300 leading-relaxed italic">
            "A unified administrative layer for every stage of the institutional attachment lifecycle."
          </blockquote>
          <p className="text-[10px] text-slate-500 mt-4 font-semibold uppercase tracking-[0.18em] font-['ui-sans-serif',_system-ui,_sans-serif]">
            Strathmore Administrative Registry
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-[10px] text-slate-600 tracking-wide font-['ui-sans-serif',_system-ui,_sans-serif]">
          © 2026 University Placement System · Official Use Only
        </div>
      </div>

      {/* RIGHT COLUMN: Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-14 bg-white">
        <div className="w-full max-w-md">

          {/* Mobile brand mark */}
          <div className="lg:hidden mb-8 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-500 font-['ui-sans-serif',_system-ui,_sans-serif]">
              Admin Console
            </span>
          </div>

          {/* Header */}
          <div className="mb-9">
            <h2 className="text-2xl font-bold text-[#1A1438] tracking-tight leading-tight">
              {isRegistering ? 'Create faculty console' : 'Administrative sign in'}
            </h2>
            <p className="text-[13px] text-slate-400 mt-2 font-['ui-sans-serif',_system-ui,_sans-serif]">
              {isRegistering ? 'Already have access?' : 'Need staff console access?'}{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="font-semibold text-indigo-600 hover:text-indigo-400 underline underline-offset-2 decoration-dotted transition-colors focus:outline-none"
              >
                {isRegistering ? 'Sign in here' : 'Request clearance'}
              </button>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {isRegistering && (
              <div>
                <label className="block text-[10px] font-bold text-[#1A1438] uppercase tracking-[0.15em] mb-2 font-['ui-sans-serif',_system-ui,_sans-serif]">
                  Full Name / Academic Title
                </label>
                <input
                  type="text"
                  name="facultyName"
                  required
                  value={formData.facultyName}
                  onChange={handleInputChange}
                  placeholder="e.g., Prof. Evans Kiprop"
                  className="w-full text-sm bg-[#F7F6F3] border border-[#E2DDD8] rounded-lg px-4 py-3 text-[#1A1438] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 focus:bg-white transition-all duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
                />
              </div>
            )}

            {isRegistering && (
              <div>
                <label className="block text-[10px] font-bold text-[#1A1438] uppercase tracking-[0.15em] mb-2 font-['ui-sans-serif',_system-ui,_sans-serif]">
                  Staff Identification Number
                </label>
                <input
                  type="text"
                  name="staffId"
                  required
                  value={formData.staffId}
                  onChange={handleInputChange}
                  placeholder="e.g., ST-XXXX"
                  className="w-full text-sm bg-[#F7F6F3] border border-[#E2DDD8] rounded-lg px-4 py-3 text-[#1A1438] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 focus:bg-white transition-all duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
                />
              </div>
            )}

            {isRegistering && (
              <div>
                <label className="block text-[10px] font-bold text-[#1A1438] uppercase tracking-[0.15em] mb-2 font-['ui-sans-serif',_system-ui,_sans-serif]">
                  Primary Faculty / Department
                </label>
                <div className="relative">
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full text-sm bg-[#F7F6F3] border border-[#E2DDD8] rounded-lg px-4 py-3 text-[#1A1438] appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 focus:bg-white transition-all duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
                  >
                    <option value="Computer Science">Faculty of IT (FIT)</option>
                    <option value="Business">Strathmore Business School (SBS)</option>
                    <option value="Engineering">School of Engineering</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-[#1A1438] uppercase tracking-[0.15em] mb-2 font-['ui-sans-serif',_system-ui,_sans-serif]">
                Institutional Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="username@strathmore.edu"
                className="w-full text-sm bg-[#F7F6F3] border border-[#E2DDD8] rounded-lg px-4 py-3 text-[#1A1438] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 focus:bg-white transition-all duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold text-[#1A1438] uppercase tracking-[0.15em] font-['ui-sans-serif',_system-ui,_sans-serif]">
                  Security Key
                </label>
                {!isRegistering && (
                  <a href="#" className="text-[11px] text-slate-400 hover:text-indigo-500 transition-colors font-['ui-sans-serif',_system-ui,_sans-serif]">
                    Recovery options?
                  </a>
                )}
              </div>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full text-sm bg-[#F7F6F3] border border-[#E2DDD8] rounded-lg px-4 py-3 text-[#1A1438] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 focus:bg-white transition-all duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
              />
            </div>

            <div className="pt-1">
              <Button
                type="submit"
                className="w-full bg-[#1A1438] hover:bg-indigo-700 text-white text-[13px] font-semibold py-3 rounded-lg border-0 shadow-none tracking-wide transition-colors duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
              >
                {isRegistering ? 'Submit Verification Request' : 'Authorize Console'}
              </Button>
            </div>
          </form>

          {/* Portal Switcher Footer */}
          <div className="border-t border-[#E2DDD8] mt-10 pt-7 text-center font-['ui-sans-serif',_system-ui,_sans-serif]">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Are you an attachment student or commercial partner?
            </p>
            <p className="text-[11px] mt-2">
              <span className="text-slate-500">Switch to{' '}</span>
              <a href="/login/student" className="font-semibold text-[#1E4D8C] hover:underline underline-offset-2 transition-colors">
                Student Hub
              </a>
              <span className="text-slate-300 mx-2">·</span>
              <a href="/login/firm" className="font-semibold text-emerald-700 hover:underline underline-offset-2 transition-colors">
                Corporate Gate
              </a>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
