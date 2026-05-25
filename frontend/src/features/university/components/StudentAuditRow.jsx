import Button from '../../../components/common/Button';

export default function StudentAuditRow({ student }) {
  return (
    <tr className="hover:bg-slate-50/70 transition-colors border-b border-portal-border last:border-0 text-sm">
      <td className="px-6 py-4 font-semibold text-portal-text">
        {student.name}
      </td>
      <td className="px-6 py-4 text-portal-muted">
        {student.regNumber}
      </td>
      <td className="px-6 py-4">
        {student.assignedFirm ? (
          <div>
            <div className="font-medium text-portal-text">{student.assignedFirm}</div>
            <div className="text-xs text-portal-muted">{student.role}</div>
          </div>
        ) : (
          <span className="text-amber-600 font-medium text-xs bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
            Unattached
          </span>
        )}
      </td>
      <td className="px-6 py-4 text-portal-muted">
        {student.academicAdvisor || (
          <span className="text-red-500 font-medium text-xs">Unassigned</span>
        )}
      </td>
      <td className="px-6 py-4 text-right">
        <Button variant="outline" size="sm" className="text-xs">
          View Dossier
        </Button>
      </td>
    </tr>
  );
}