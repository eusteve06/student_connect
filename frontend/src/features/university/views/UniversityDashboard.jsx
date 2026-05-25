// src/features/university/views/UniversityDashboard.jsx
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import MetricCard from '../../../components/data-display/MetricCard';
import StudentAuditRow from '../components/StudentAuditRow';
import Button from '../../../components/common/Button';

const MOCK_ROSTER = [
  { id: 'st-01', name: 'Alex Kamau', regNumber: 'SU-2023-0892', assignedFirm: 'Apex Tech Solutions', role: 'Frontend Developer Intern', academicAdvisor: 'Dr. Jane Foster' },
  { id: 'st-02', name: 'Fatima Ali', regNumber: 'JK-2023-4412', assignedFirm: 'Global Finance Corp', role: 'UI/UX Designer Trainee', academicAdvisor: 'Prof. Evans Kiprop' },
  { id: 'st-03', name: 'Brian Omondi', regNumber: 'UN-2023-1004', assignedFirm: null, role: null, academicAdvisor: null },
];

const MOCK_FIRM_PIPELINE = [
  { id: 'f-1', name: 'Apex Tech Solutions', status: 'Vetted', openSlots: 2 },
  { id: 'f-2', name: 'Vanguard Cyber Security', status: 'Vetted', openSlots: 5 },
  { id: 'f-3', name: 'Nexus Labs', status: 'Pending Review', openSlots: 0 },
];

export default function UniversityDashboard() {
  return (
    <DashboardLayout role="university">
      {/* 1. Institutional Header Block */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-portal-text tracking-tight">
            Academic Operations Console
          </h1>
          <p className="text-sm text-portal-muted mt-1">
            Strathmore Faculty of Information Technology
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-xs">Export Compliance Report</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm border-0 text-xs">
            Assign Advisors Bulk
          </Button>
        </div>
      </div>

      {/* 2. Macro Placement Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <MetricCard title="Total Cohort Size" value="142" change="Students registered" status="default" />
        <MetricCard title="Successfully Attached" value="114" change="80.2% integration rate" status="success" />
        <MetricCard title="Awaiting Industry Slot" value="28" change="Requires intervention" status="warning" />
        <MetricCard title="Vetted Corporate Partners" value="18" change="Active MOUs" status="info" />
      </div>

      {/* 3. Main Data Core Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column Area (Takes 2 Slots): Master Cohort Monitoring Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-portal-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-portal-border bg-gray-50/50 flex justify-between items-center">
            <h3 className="font-semibold text-portal-text text-sm">Student Roster Audit Track</h3>
            <input 
              type="text" 
              placeholder="Filter by name or reg..." 
              className="text-xs border border-portal-border rounded-lg px-3 py-1.5 w-48 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-portal-border text-xs font-semibold text-portal-muted uppercase tracking-wider">
                  <th className="px-6 py-3">Full Name</th>
                  <th className="px-6 py-3">Registration ID</th>
                  <th className="px-6 py-3">Placement Context</th>
                  <th className="px-6 py-3">Academic Supervisor</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ROSTER.map((student) => (
                  <StudentAuditRow key={student.id} student={student} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column Area (Takes 1 Slot): Corporate Relationship Pipeline */}
        <div className="bg-white rounded-xl border border-portal-border shadow-sm overflow-hidden h-fit">
          <div className="px-6 py-4 border-b border-portal-border bg-gray-50/50">
            <h3 className="font-semibold text-portal-text text-sm">Corporate Vetting Pipeline</h3>
          </div>
          
          <div className="p-4 divide-y divide-portal-border">
            {MOCK_FIRM_PIPELINE.map((firm) => (
              <div key={firm.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-portal-text">{firm.name}</h4>
                  <p className="text-[11px] text-portal-muted">
                    {firm.openSlots > 0 ? `${firm.openSlots} vacant slots declared` : 'No open active slots'}
                  </p>
                </div>
                
                <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border
                  ${firm.status === 'Vetted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                  {firm.status === 'Vetted' ? 'Approved' : 'Pending Review'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}