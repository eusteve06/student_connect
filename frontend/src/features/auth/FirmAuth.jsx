// src/features/auth/FirmAuth.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function FirmAuth() {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '',
    industrySector: 'Technology',
    contactPerson: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/firm');
  };

  return (
    <div className="flex min-h-screen bg-[#F7F6F3] font-['Georgia',_serif]">

      {/* LEFT COLUMN: Corporate Brand Canvas */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0A1F14] text-white p-14 flex-col justify-between relative overflow-hidden">

        {/* Layered background */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#a3c4a8_1px,transparent_1px),linear-gradient(to_bottom,#a3c4a8_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-400/8 blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl -translate-x-1/3 translate-y-1/4" />

        {/* Top badge */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Corporate Gateway
          </span>

          <h1 className="text-[2.15rem] font-bold tracking-tight mt-8 max-w-sm leading-snug text-white">
            Secure the Future of<br />
            <span className="text-emerald-400">Technical Excellence</span>
          </h1>

          <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-xs font-['ui-sans-serif',_system-ui,_sans-serif]">
            Connect with top-tier talent, manage institutional attachments, and evaluate the next generation of industry leaders.
          </p>
        </div>

        {/* Divider + quote */}
        <div className="relative z-10 max-w-sm">
          <div className="w-10 h-px bg-emerald-500 mb-6" />
          <blockquote className="text-base font-normal text-slate-300 leading-relaxed italic">
            "Bridging the gap between academic innovation and commercial scale."
          </blockquote>
          <p className="text-[10px] text-slate-500 mt-4 font-semibold uppercase tracking-[0.18em] font-['ui-sans-serif',_system-ui,_sans-serif]">
            Official Industry Partner Network
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-[10px] text-slate-600 tracking-wide font-['ui-sans-serif',_system-ui,_sans-serif]">
          © 2026 Smart Attachment Portal · Enterprise Infrastructure
        </div>
      </div>

      {/* RIGHT COLUMN: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-14 bg-white">
        <div className="w-full max-w-md">

          {/* Mobile brand mark */}
          <div className="lg:hidden mb-8 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600 font-['ui-sans-serif',_system-ui,_sans-serif]">
              Corporate Gateway
            </span>
          </div>

          {/* Header */}
          <div className="mb-9">
            <h2 className="text-2xl font-bold text-[#0A1F14] tracking-tight leading-tight">
              {isRegistering ? 'Register firm profile' : 'Partner sign in'}
            </h2>
            <p className="text-[13px] text-slate-400 mt-2 font-['ui-sans-serif',_system-ui,_sans-serif]">
              {isRegistering ? 'Already a registered partner?' : 'New to the placement network?'}{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="font-semibold text-emerald-700 hover:text-emerald-500 underline underline-offset-2 decoration-dotted transition-colors focus:outline-none"
              >
                {isRegistering ? 'Sign in here' : 'Request access'}
              </button>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {isRegistering && (
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-[#0A1F14] uppercase tracking-[0.15em] mb-2 font-['ui-sans-serif',_system-ui,_sans-serif]">
                    Company / Registered Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g., Apex Tech Solutions"
                    className="w-full text-sm bg-[#F7F6F3] border border-[#E2DDD8] rounded-lg px-4 py-3 text-[#0A1F14] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 focus:bg-white transition-all duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#0A1F14] uppercase tracking-[0.15em] mb-2 font-['ui-sans-serif',_system-ui,_sans-serif]">
                    Industry Sector
                  </label>
                  <select
                    name="industrySector"
                    value={formData.industrySector}
                    onChange={handleInputChange}
                    className="w-full text-sm bg-[#F7F6F3] border border-[#E2DDD8] rounded-lg px-4 py-3 text-[#0A1F14] focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 focus:bg-white transition-all duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
                  >
                    <option value="Technology">Technology &amp; Software</option>
                    <option value="Finance">Banking &amp; Finance</option>
                    <option value="Telecommunications">Telecommunications</option>
                    <option value="CyberSecurity">Cyber Security</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#0A1F14] uppercase tracking-[0.15em] mb-2 font-['ui-sans-serif',_system-ui,_sans-serif]">
                    Lead HR / Representative Name
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="e.g., Jane Doe"
                    className="w-full text-sm bg-[#F7F6F3] border border-[#E2DDD8] rounded-lg px-4 py-3 text-[#0A1F14] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 focus:bg-white transition-all duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-[#0A1F14] uppercase tracking-[0.15em] mb-2 font-['ui-sans-serif',_system-ui,_sans-serif]">
                Corporate Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="recruitment@company.com"
                className="w-full text-sm bg-[#F7F6F3] border border-[#E2DDD8] rounded-lg px-4 py-3 text-[#0A1F14] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 focus:bg-white transition-all duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold text-[#0A1F14] uppercase tracking-[0.15em] font-['ui-sans-serif',_system-ui,_sans-serif]">
                  Account Password
                </label>
                {!isRegistering && (
                  <a href="#" className="text-[11px] text-slate-400 hover:text-emerald-600 transition-colors font-['ui-sans-serif',_system-ui,_sans-serif]">
                    Reset key?
                  </a>
                )}
              </div>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full text-sm bg-[#F7F6F3] border border-[#E2DDD8] rounded-lg px-4 py-3 text-[#0A1F14] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 focus:bg-white transition-all duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
              />
            </div>

            <div className="pt-1">
              <Button
                type="submit"
                className="w-full bg-[#0A1F14] hover:bg-emerald-700 text-white text-[13px] font-semibold py-3 rounded-lg border-0 shadow-none tracking-wide transition-colors duration-200 font-['ui-sans-serif',_system-ui,_sans-serif]"
              >
                {isRegistering ? 'Submit Verification Request' : 'Secure Authorization'}
              </Button>
            </div>
          </form>

          {/* Portal Switcher Footer */}
          <div className="border-t border-[#E2DDD8] mt-10 pt-7 text-center font-['ui-sans-serif',_system-ui,_sans-serif]">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.18em] mb-3">
              Switch Authentication Portal
            </p>
            <div className="flex justify-center items-center gap-5">
              <a href="/login/student" className="text-[11px] font-semibold text-slate-500 hover:text-[#1E4D8C] transition-colors">
                Student Hub
              </a>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <a href="/login/university" className="text-[11px] font-semibold text-slate-500 hover:text-indigo-500 transition-colors">
                Admin Console
              </a>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
