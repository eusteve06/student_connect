// src/components/layout/navigationConfig.js
import { 
  Home, 
  Search, 
  Briefcase, 
  BookOpen, 
  PlusCircle, 
  Users, 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  BarChart3 
} from 'lucide-react';

export const navigationLinks = {
  student: [
    { name: 'Overview', href: '/student/dashboard', icon: Home },
    { name: 'Find Placements', href: '/student/placements', icon: Search },
    { name: 'My Applications', href: '/student/applications', icon: Briefcase },
    { name: 'Weekly Logbook', href: '/student/logbook', icon: BookOpen },
  ],
  firm: [
    { name: 'Overview', href: '/firm/dashboard', icon: Home },
    { name: 'Manage Vacancies', href: '/firm/vacancies', icon: PlusCircle },
    { name: 'Track Applicants', href: '/firm/applicants', icon: Users },
    { name: 'Assessments', href: '/firm/assessments', icon: Award },
  ],
  university: [
    { name: 'Admin Overview', href: '/university/dashboard', icon: Home },
    { name: 'Student Roster', href: '/university/students', icon: GraduationCap },
    { name: 'Vet Firms', href: '/university/firms', icon: ShieldCheck },
    { name: 'Placements Analytics', href: '/university/analytics', icon: BarChart3 },
  ]
};