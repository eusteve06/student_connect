import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function StudentAuth() {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  // Form Field States
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
    // Auth pipeline integration placeholder
    // On success, route directly to the student workspace dashboard
    navigate('/student');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* LEFT COLUMN: Brand Presentation Canvas (Hidden on Mobile viewports) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative grid background element */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-student-primary bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
            Institutional Gateway
          </span>
          <h1 className="text-3xl font-bold tracking-tight mt-6 max-w-md">
            Smart Attachment & Placement Portal
          </h1>
        </div>

        <div className="relative z-10 max-w-md">
          <blockquote className="text-lg font-medium text-slate-300 italic">
            "Streamlining the bridge between academic requirements and industrial excellence."
          </blockquote>
          <p className="text-xs text-slate-400 mt-3 font-semibold uppercase tracking-wider">
            Strathmore University Faculty of IT
          </p>
        </div>

        <div className="relative z-10 text-xs text-slate-500">
          © 2026 Smart Attachment Portal. All rights reserved.
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Form Input Block */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header Context Switcher */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-portal-text tracking-tight">
              {isRegistering ? 'Create your student account' : 'Sign in to your portal'}
            </h2>
            <p className="text-sm text-portal-muted mt-2">
              {isRegistering ? 'Already registered?' : 'New to the attachment cycle?'}{' '}
              <button 
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="font-semibold text-student-primary hover:underline focus:outline-none"
              >
                {isRegistering ? 'Sign In here' : 'Register an account'}
              </button>
            </p>
          </div>

          {/* Core Input Form Wrapper */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isRegistering && (
              <div>
                <label className="block text-xs font-bold text-portal-text uppercase tracking-wide mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g., Alex Kamau"
                  className="w-full text-sm border border-portal-border rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-student-primary/20 focus:border-student-primary transition-all"
                />
              </div>
            )}

            {isRegistering && (
              <div>
                <label className="block text-xs font-bold text-portal-text uppercase tracking-wide mb-1.5">Registration Number</label>
                <input
                  type="text"
                  name="regNumber"
                  required
                  value={formData.regNumber}
                  onChange={handleInputChange}
                  placeholder="SU-2023-XXXX"
                  className="w-full text-sm border border-portal-border rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-student-primary/20 focus:border-student-primary transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-portal-text uppercase tracking-wide mb-1.5">University Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="student@strathmore.edu"
                className="w-full text-sm border border-portal-border rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-student-primary/20 focus:border-student-primary transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-portal-text uppercase tracking-wide">Password</label>
                {!isRegistering && (
                  <a href="#" className="text-xs text-portal-muted hover:text-student-primary hover:underline">Forgot password?</a>
                )}
              </div>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full text-sm border border-portal-border rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-student-primary/20 focus:border-student-primary transition-all"
              />
            </div>

            {isRegistering && (
              <div>
                <label className="block text-xs font-bold text-portal-text uppercase tracking-wide mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full text-sm border border-portal-border rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-student-primary/20 focus:border-student-primary transition-all"
                />
              </div>
            )}

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full bg-student-primary hover:bg-blue-700 text-white text-sm font-semibold py-2.5 border-0 shadow-sm"
              >
                {isRegistering ? 'Submit Registration' : 'Secure Sign In'}
              </Button>
            </div>
          </form>

          {/* Quick Portal Switcher Footer Link */}
          <div className="border-t border-portal-border pt-6 text-center">
            <p className="text-xs text-portal-muted">
              Are you an enterprise partner or administrator? <br />
              <span className="inline-block mt-2 font-medium text-slate-700">
                Switch to <a href="/login/firm" className="text-firm-primary font-semibold hover:underline">Firm Gate</a> or{' '}
                <a href="/login/university" className="text-indigo-600 font-semibold hover:underline">Admin Console</a>
              </span>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}