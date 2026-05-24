import apiClient from './api-client';

export const studentService = {
  // Fetches statistics metrics for the top cards of the student dashboard
  getDashboardMetrics: async () => {
    const response = await apiClient.get('/student/metrics');
    return response.data; // e.g., { totalApplications: 3, interviews: 1, offers: 1 }
  },

  // Fetches applications specific to the logged-in student
  getRecentApplications: async () => {
    const response = await apiClient.get('/student/applications');
    return response.data; // Returns list array of application objects
  },

  // Fetches available job attachment openings across all vetted firms
  getAvailablePlacements: async (searchQuery = '') => {
    const response = await apiClient.get('/placements', {
      params: { search: searchQuery } // Appends query strings like ?search=frontend
    });
    return response.data;
  },

  // Submits a new placement application request to a specific firm vacancy
  applyForPlacement: async (vacancyId, coverNote = '') => {
    const response = await apiClient.post(`/placements/${vacancyId}/apply`, {
      coverNote: coverNote
    });
    return response.data;
  }
};