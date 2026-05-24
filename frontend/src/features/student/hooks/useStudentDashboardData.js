import { useState, useEffect } from 'react';
import { studentService } from '../../../services/student.services';

export function useStudentDashboardData() {
  const [metrics, setMetrics] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllDashboardData() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch data concurrently using Promise.all to save network time
        const [metricsData, applicationsData] = await Promise.all([
          studentService.getDashboardMetrics(),
          studentService.getRecentApplications()
        ]);

        setMetrics(metricsData);
        setApplications(applicationsData);
      } catch (err) {
        // Automatically catches the normalized error structure from our Axios interceptor
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllDashboardData();
  }, []);

  return { metrics, applications, isLoading, error };
}