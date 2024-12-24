import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiKey = `${environment.apiKey}`;
  private apiHost = 'google-search72.p.rapidapi.com';

  constructor() {}

  async searchResources(query: string) {
    const options = {
      method: 'GET',
      url: 'https://google-search72.p.rapidapi.com/search',
      params: {
        q: query,
        lr: 'en-US',
        num: '12'
      },
      headers: {
        'x-rapidapi-key': this.apiKey,
        'x-rapidapi-host': this.apiHost
      }
    };

    try {
      const response = await axios.request(options);
      return response.data.items; // Return the search results
    } catch (error) {
      throw error; // Rethrow the error for handling in the component
    }
  }
}
