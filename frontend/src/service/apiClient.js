// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  // Pointing to your custom Node.js mock-server running on port 5000
  baseURL: import.meta.env.VITE_API_BASE_URL ||'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default apiClient;