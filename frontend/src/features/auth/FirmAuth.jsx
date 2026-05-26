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
    // Auth pipeline integration goes here
    navigate('/firm');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* LEFT COLUMN: Corporate Brand Canvas (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-950 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            Corporate Gateway
          </span>
          <h1 className="text-3xl font-bold tracking-tight mt-6 max-w-md">
            Recruit Premier Technical Talent
          </h1>
        </div>

        <div className="relative z-10 max-w-md">
          <blockquote className="text-lg font-medium text-slate-300 italic">
            "Manage attachments, evaluate logbooks, and discover your organization's future engineering pillars."
          </blockquote>
          <p className="text-xs text-emerald-400 mt-3 font-bold uppercase tracking-wider">
            Industry Partner Network Portal
          </p>
        </div>

        <div className="relative z-10 text-xs text-slate-600">
          © 2026 Corporate Attachment Hub. Secure Infrastructure.
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Form Input Block */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header Context Switcher */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-portal-text tracking-tight">
              {isRegistering ? 'Register Corporate Profile' : 'Firm Command Sign In'}
            </h2>
            <p className="text-sm text-portal-muted mt-2">
              {isRegistering ? 'Already a partner?' : 'Want to source attachments?'}{' '}
              <button 
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="font-semibold text-emerald-600 hover:underline focus:outline-none"
              >
                {isRegistering ? 'Sign In here' : 'Join the network'}
              </button>
            </p>
          </div>

          {/* Core Input Form Wrapper */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isRegistering && (
              <div>
                <label className="block text-xs font-bold text-portal-text uppercase tracking-wide mb-1.5">Company / Registered Name</label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g., Apex Tech Solutions"
                  className="w-full text-sm border border-portal-border rounded-lg px-3.5 py-2.5 bg-white text-portal-text focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                />
              </div>
            )}

            {isRegistering && (
              <div>
                <label className="block text-xs font-bold text-portal-text uppercase tracking-wide mb-1.5">Industry Sector</label>
                <select
                  name="industrySector"
                  value={formData.industrySector}
                  onChange={handleInputChange}
                  className="w-full text-sm border border-portal-border rounded-lg px-3.5 py-2.5 bg-white text-portal-text focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                >
                  <option value="Technology">Technology & Software</option>
                  <option value="Finance">Banking & Finance</option>
                  <option value="Telecommunications">Telecommunications</option>
                  <option value="CyberSecurity">Cyber Security</option>
                </select>
              </div>
            )}

            {isRegistering && (
              <div>
                <label className="block text-xs font-bold text-portal-text uppercase tracking-wide mb-1.5">Lead HR / Representative Name</label>
                <input
                  type="text"
                  name="contactPerson"
                  required
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  placeholder="e.g., Jane Doe"
                  className="w-full text-sm border border-portal-border rounded-lg px-3.5 py-2.5 bg-white text-portal-text focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-portal-text uppercase tracking-wide mb-1.5">Corporate Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="recruitment@company.com"
                className="w-full text-sm border border-portal-border rounded-lg px-3.5 py-2.5 bg-white text-portal-text focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-portal-text uppercase tracking-wide">Account Password</label>
                {!isRegistering && (
                  <a href="#" className="text-xs text-portal-muted hover:text-emerald-600 hover:underline">Reset key?</a>
                )}
              </div>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full text-sm border border-portal-border rounded-lg px-3.5 py-2.5 bg-white text-portal-text focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
              />
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full bg-slate-950 hover:bg-slate-800 text-white text-sm font-semibold py-2.5 border-0 shadow-sm transition-colors"
              >
                {isRegistering ? 'Submit Verification Request' : 'Secure Sign In'}
              </Button>
            </div>
          </form>

          {/* Quick Portal Switcher Footer Link */}
          <div className="border-t border-portal-border pt-6 text-center">
            <p className="text-xs text-portal-muted">
              Are you a student or institutional administrator? <br />
              <span className="inline-block mt-2 font-medium text-slate-700">
                Switch to <a href="/login/student" className="text-student-primary font-semibold hover:underline">Student Hub</a> or{' '}
                <a href="/login/university" className="text-indigo-600 font-semibold hover:underline">Admin Console</a>
              </span>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}