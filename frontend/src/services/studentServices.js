// src/services/studentServices.js
import apiClient from './apiClient';

export const studentService = {
  getMetrics: async () => {
    // Explicit path declaration bypasses string truncation bugs
    const response = await apiClient.get('/api/v1/student/metrics');
    return response.data;
  },

  getApplications: async () => {
    // Explicit path declaration bypasses string truncation bugs
    const response = await apiClient.get('/api/v1/student/applications');
    return response.data;
  }
};