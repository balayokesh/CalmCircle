import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class MoodService {
  private axiosInstance: AxiosInstance;
  private baseUrl = `${environment.apiUrl}/mood`;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use((config) => {
      const token = this.getTokenFromCookie();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
  }

  private getTokenFromCookie(): string | null {
    const matches = document.cookie.match(/(?:^|; )token=([^;]*)/);
    return matches ? decodeURIComponent(matches[1]) : null;
  }

  async logMood(moodData: any): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/log', moodData);
      return response.data;
    } catch (error) {
      console.error('Error logging mood:', error);
      throw error;
    }
  }

  async getMoodHistory(userId: string): Promise<any> {
    try {
      const response = await this.axiosInstance.get(`/history/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error(
        'Error fetching mood history:',
        error.message,
        error.response?.data
      );
      throw error;
    }
  }

  async updateNotes(moodId: string, notes: string): Promise<any> {
    try {
      const response = await this.axiosInstance.patch(`/${moodId}`, { notes });
      return response.data;
    } catch (error) {
      console.error('Error updating notes:', error);
      throw error;
    }
  }
}
