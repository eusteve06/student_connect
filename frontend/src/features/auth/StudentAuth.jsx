import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function StudentAuth() {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    regNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/student');
  };

  return (
    <div className="flex min-h-screen bg-[#F7F6F3] font-['Georgia',_serif]">

      {/* LEFT COLUMN: Brand Presentation Canvas */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0D1B2A] text-white p-14 flex-col justify-between relative overflow-hidden">

        {/* Decorative layered background */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#c8b89a_1px,transparent_1px),linear-gradient(to_bottom,#c8b89a_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#C9A96E]/10 blur-3xl -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-blue-400/5 blur-2xl translate-x-1/2" />

        {/* Top badge */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A96E] bg-[#C9A96E]/10 border border-[#C9A96E]/20 px-3.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
            Institutional Gateway
          </span>

          <h1 className="text-[2.15rem] font-bold tracking-tight mt-8 max-w-sm leading-snug text-white">
            Smart Attachment &<br />
            <span className="text-[#C9A96E]">Placement Portal</span>
          </h1>

          <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-xs font-['ui-sans-serif',_system-ui,_sans-serif]">
            A unified gateway connecting students, supervisors, and enterprise partners throughout the attachment lifecycle.
          </p>
        </div>

        {/* Decorative divider + quote */}
        <div className="relative z-10 max-w-sm">
          <div className="w-10 h-px bg-[#C9A96E] mb-6" />
          <blockquote className="text-base font-normal text-slate-300 leading-relaxed italic">
            "Streamlining the bridge between academic requirements and industrial excellence."
          </blockquote>
          <p className="text-[10px] text-slate-500 mt-4 font-semibold uppercase tracking-[0.18em] font-['ui-sans-serif',_system-ui,_sans-serif]">
            Strathmore University · Faculty of IT
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-[10px] text-slate-600 tracking-wide font-['ui-sans-serif',_system-ui,_sans-serif]">
          © 2026 Smart Attachment Portal. All rights reserved.
        </div>
      </div>

      {/* RIGHT COLUMN: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-14 bg-white">
        <div className="w-full max-w-md">

          {/* Mobile-only brand mark */}
          <div className="lg:hidden mb-8 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A96E]">
              Smart Attachment Portal
            </span>
          </div>

          {/* Header */}
          <div className="mb-9">
            <h2 className="text-2xl font-bold text-[#0D1B2A] tracking-tight leading-tight">
              {isRegistering ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-[13px] text-slate-400 mt-2 font-['ui-sans-serif',_system-ui,_sans-serif]">
              {isRegistering ? 'Already registered?' : 'New to the attachment cycle?'}{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="font-semibold text-[#1E4D8C] hover:text-[#C9A96E] underline underline-offset-2 decoration-dotted transition-colors focus:outline-none"
              >
                {isRegistering ? 'Sign in here' : 'Register an account'}
              </button>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {isRegistering && (
              <div className="group">
                <label className="block text-[10px] font-bold text-[#0D1B2A] uppercase tracking-[0.15em] mb-2 font-['ui-sans-serif',_system-ui,_sans-serif]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g., Alex Kamau"
                  className="w-full text-sm bg-[#F7F6F3] border border-[#E2DDD8] rounded-lg px-4 py-3 text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E4D8C]/15 focus:border-[#1E4D8C] focus:bg-white transition-all duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
                />
              </div>
            )}

            {isRegistering && (
              <div>
                <label className="block text-[10px] font-bold text-[#0D1B2A] uppercase tracking-[0.15em] mb-2 font-['ui-sans-serif',_system-ui,_sans-serif]">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="regNumber"
                  required
                  value={formData.regNumber}
                  onChange={handleInputChange}
                  placeholder="SU-2023-XXXX"
                  className="w-full text-sm bg-[#F7F6F3] border border-[#E2DDD8] rounded-lg px-4 py-3 text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E4D8C]/15 focus:border-[#1E4D8C] focus:bg-white transition-all duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-[#0D1B2A] uppercase tracking-[0.15em] mb-2 font-['ui-sans-serif',_system-ui,_sans-serif]">
                University Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="student@strathmore.edu"
                className="w-full text-sm bg-[#F7F6F3] border border-[#E2DDD8] rounded-lg px-4 py-3 text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E4D8C]/15 focus:border-[#1E4D8C] focus:bg-white transition-all duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold text-[#0D1B2A] uppercase tracking-[0.15em] font-['ui-sans-serif',_system-ui,_sans-serif]">
                  Password
                </label>
                {!isRegistering && (
                  <a href="#" className="text-[11px] text-slate-400 hover:text-[#C9A96E] transition-colors font-['ui-sans-serif',_system-ui,_sans-serif]">
                    Forgot password?
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
                className="w-full text-sm bg-[#F7F6F3] border border-[#E2DDD8] rounded-lg px-4 py-3 text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E4D8C]/15 focus:border-[#1E4D8C] focus:bg-white transition-all duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
              />
            </div>

            {isRegistering && (
              <div>
                <label className="block text-[10px] font-bold text-[#0D1B2A] uppercase tracking-[0.15em] mb-2 font-['ui-sans-serif',_system-ui,_sans-serif]">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full text-sm bg-[#F7F6F3] border border-[#E2DDD8] rounded-lg px-4 py-3 text-[#0D1B2A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E4D8C]/15 focus:border-[#1E4D8C] focus:bg-white transition-all duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
                />
              </div>
            )}

            <div className="pt-1">
              <Button
                type="submit"
                className="w-full bg-[#0D1B2A] hover:bg-[#1E4D8C] text-white text-[13px] font-semibold py-3 rounded-lg border-0 shadow-none tracking-wide transition-colors duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
              >
                {isRegistering ? 'Submit Registration' : 'Secure Sign In'}
              </Button>
            </div>
          </form>

          {/* Portal Switcher Footer */}
          <div className="border-t border-[#E2DDD8] mt-10 pt-7 text-center font-['ui-sans-serif',_system-ui,_sans-serif]">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Are you an enterprise partner or administrator?
            </p>
            <p className="text-[11px] mt-2">
              <span className="text-slate-500">Switch to{' '}</span>
              <a href="/login/firm" className="font-semibold text-[#C9A96E] hover:underline underline-offset-2 transition-colors">
                Firm Gate
              </a>
              <span className="text-slate-300 mx-2">·</span>
              <a href="/login/university" className="font-semibold text-indigo-500 hover:underline underline-offset-2 transition-colors">
                Admin Console
              </a>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
