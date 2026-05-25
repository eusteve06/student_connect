import DashboardLayout from  '../../../components/layouts/DashboardLayout'
import MetricCard from '../../../components/data-display/MetricCard';
import ApplicantRow from '../../firms/components/ApplicationRow';
import Button from  '../../../components/common/Button';

// Mock Dataset representing payloads from your future Axios service layer
const MOCK_APPLICANTS = [
  { id: 'app-01', studentName: 'Michael Mwangi', university: 'Strathmore University', targetRole: 'Frontend Developer Intern', appliedDate: 'May 24, 2026', status: 'Pending Review' },
  { id: 'app-02', studentName: 'Fatima Ali', university: 'JKUAT', targetRole: 'UI/UX Designer Trainee', appliedDate: 'May 22, 2026', status: 'Pending Review' },
  { id: 'app-03', studentName: 'Brian Omondi', university: 'University of Nairobi', targetRole: 'Full Stack Engineer Intern', appliedDate: 'May 19, 2026', status: 'Pending Review' },
];

const MOCK_VACANCIES = [
  { id: 'vac-1', title: 'Frontend Developer Intern', filledSlots: 1, totalSlots: 2, status: 'Active' },
  { id: 'vac-2', title: 'UI/UX Designer Trainee', filledSlots: 0, totalSlots: 1, status: 'Active' },
  { id: 'vac-3', title: 'Full Stack Engineer Intern', filledSlots: 2, totalSlots: 2, status: 'Closed' },
];

export default function FirmDashboard() {
  return (
    <DashboardLayout role="firm">
      {/* 1. Header View Layer */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-portal-text tracking-tight">
            Apex Tech Solutions
          </h1>
          <p className="text-sm text-portal-muted mt-1">
            Corporate Attachment Command Console
          </p>
        </div>
        <Button className="bg-firm-primary hover:bg-emerald-700 text-white shadow-sm border-0">
          + Create New Vacancy Slot
        </Button>
      </div>

      {/* 2. Operational Analytics Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <MetricCard title="Total Incoming Applicants" value="3" change="New profiles this week" status="info" />
        <MetricCard title="Active Vacancies" value="2" change="Open for applications" status="success" />
        <MetricCard title="Filled Positions" value="3" change="Students integrated" status="default" />
        <MetricCard title="Pending Appraisals" value="0" change="Logbooks up to date" status="default" />
      </div>

      {/* 3. Main Split View Layer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column Section (Takes 2 Slots): Main Applicant Roster Table Container */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-portal-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-portal-border bg-gray-50/50">
            <h3 className="font-semibold text-portal-text text-sm">Incoming Student Applications</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-portal-border text-xs font-semibold text-portal-muted uppercase tracking-wider">
                  <th className="px-6 py-3">Student Name</th>
                  <th className="px-6 py-3">Target Vacancy</th>
                  <th className="px-6 py-3">Submission Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_APPLICANTS.map((applicant) => (
                  <ApplicantRow key={applicant.id} applicant={applicant} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column Section (Takes 1 Slot): Quick Vacancy Tracker */}
        <div className="bg-white rounded-xl border border-portal-border shadow-sm overflow-hidden h-fit">
          <div className="px-6 py-4 border-b border-portal-border bg-gray-50/50 flex justify-between items-center">
            <h3 className="font-semibold text-portal-text text-sm">Vacancy Capacity</h3>
            <span className="text-xs font-medium text-firm-primary hover:underline cursor-pointer">Manage</span>
          </div>
          
          <div className="p-6 space-y-5">
            {MOCK_VACANCIES.map((vacancy) => (
              <div key={vacancy.id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-portal-text">{vacancy.title}</h4>
                    <p className="text-[11px] text-portal-muted mt-0.5">
                      Slots filled: <span className="font-semibold text-portal-text">{vacancy.filledSlots}/{vacancy.totalSlots}</span>
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wide
                    ${vacancy.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-gray-100 text-portal-muted'}`}>
                    {vacancy.status}
                  </span>
                </div>
                
                {/* Visual Capacity Progress Scale Bar */}
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${vacancy.status === 'Active' ? 'bg-firm-primary' : 'bg-gray-400'}`}
                    style={{ width: `${(vacancy.filledSlots / vacancy.totalSlots) * 180}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}