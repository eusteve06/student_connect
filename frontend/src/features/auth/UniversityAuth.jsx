// src/features/auth/UniversityAuth.jsx
import  { useState } from 'react';
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
    // Academic vetting pipeline placeholder
    navigate('/university');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* LEFT COLUMN: Academic Presentation Canvas (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden border-r border-slate-800">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
            Internal Operations
          </span>
          <h1 className="text-3xl font-bold tracking-tight mt-6 max-w-md">
            Academic Operations & Compliance Gateway
          </h1>
        </div>

        <div className="relative z-10 max-w-md">
          <blockquote className="text-lg font-medium text-slate-300 italic">
            "Oversee university attachment matrices, approve industrial partner credentials, and audit student supervisor pairings."
          </blockquote>
          <p className="text-xs text-indigo-400 mt-3 font-bold uppercase tracking-wider">
            Strathmore Administrative Registry
          </p>
        </div>

        <div className="relative z-10 text-xs text-slate-600">
          © 2026 University Placement System. Official Use Only.
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Form Input Block */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header Context Switcher */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-portal-text tracking-tight">
              {isRegistering ? 'Register Faculty Console' : 'Administrative Sign In'}
            </h2>
            <p className="text-sm text-portal-muted mt-2">
              {isRegistering ? 'Already have access?' : 'Need staff console access?'}{' '}
              <button 
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="font-semibold text-indigo-600 hover:underline focus:outline-none"
              >
                {isRegistering ? 'Sign In here' : 'Request clearance'}
              </button>
            </p>
          </div>

          {/* Core Input Form Wrapper */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isRegistering && (
              <div>
                <label className="block text-xs font-bold text-portal-text uppercase tracking-wide mb-1.5">Full Name / Academic Title</label>
                <input
                  type="text"
                  name="facultyName"
                  required
                  value={formData.facultyName}
                  onChange={handleInputChange}
                  placeholder="e.g., Prof. Evans Kiprop"
                  className="w-full text-sm border border-portal-border rounded-lg px-3.5 py-2.5 bg-white text-portal-text focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>
            )}

            {isRegistering && (
              <div>
                <label className="block text-xs font-bold text-portal-text uppercase tracking-wide mb-1.5">Staff Identification Number</label>
                <input
                  type="text"
                  name="staffId"
                  required
                  value={formData.staffId}
                  onChange={handleInputChange}
                  placeholder="e.g., ST-XXXX"
                  className="w-full text-sm border border-portal-border rounded-lg px-3.5 py-2.5 bg-white text-portal-text focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>
            )}

            {isRegistering && (
              <div>
                <label className="block text-xs font-bold text-portal-text uppercase tracking-wide mb-1.5">Primary Faculty / Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full text-sm border border-portal-border rounded-lg px-3.5 py-2.5 bg-white text-portal-text focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                >
                  <option value="Computer Science">Faculty of IT (FIT)</option>
                  <option value="Business">Strathmore Business School (SBS)</option>
                  <option value="Engineering">School of Engineering</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-portal-text uppercase tracking-wide mb-1.5">Institutional Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="username@strathmore.edu"
                className="w-full text-sm border border-portal-border rounded-lg px-3.5 py-2.5 bg-white text-portal-text focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-portal-text uppercase tracking-wide">Security Key</label>
                {!isRegistering && (
                  <a href="#" className="text-xs text-portal-muted hover:text-indigo-600 hover:underline">Recovery options?</a>
                )}
              </div>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full text-sm border border-portal-border rounded-lg px-3.5 py-2.5 bg-white text-portal-text focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full bg-slate-950 hover:bg-slate-800 text-white text-sm font-semibold py-2.5 border-0 shadow-sm transition-colors"
              >
                {isRegistering ? 'Submit Verification Request' : 'Authorize Console'}
              </Button>
            </div>
          </form>

          {/* Quick Portal Switcher Footer Link */}
          <div className="border-t border-portal-border pt-6 text-center">
            <p className="text-xs text-portal-muted">
              Are you an attachment student or commercial partner? <br />
              <span className="inline-block mt-2 font-medium text-slate-700">
                Switch to <a href="/login/student" className="text-student-primary font-semibold hover:underline">Student Hub</a> or{' '}
                <a href="/login/firm" className="text-firm-primary font-semibold hover:underline">Corporate Gate</a>
              </span>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}