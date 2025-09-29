import axios from 'axios';
import { PrioritizeResponse, ApiError } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL ;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for AI processing
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`Response received from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const taskApi = {
  /**
   * Prioritize tasks using AI
   */
  async prioritizeTasks(tasks: string[]): Promise<PrioritizeResponse> {
    try {
      const response = await api.post<PrioritizeResponse>('/api/prioritize', {
        tasks,
      });
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to prioritize tasks',
      };
      throw new Error(apiError.error);
    }
  },

  /**
   * Check server health
   */
  async checkHealth(): Promise<{ status: string; timestamp: string; aiService: string }> {
    try {
      const response = await api.get<{ status: string; timestamp: string; aiService: string }>('/api/health');
      return response.data;
    } catch (error: any) {
      throw new Error('Server is not responding');
    }
  },
};

export default api;
