import { Component } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css'
})
export class ResourcesComponent {
  resources: any[] = [];
  errorMessage: string | null = null;
  
  keywords: string[] = [
    'Mindfulness',
    'Meditation',
    'Stress Reduction',
    'Self-Care',
    'Mental Wellness',
    'Journaling',
    'Gratitude Practices',
    'Breathwork',
    'Mindful Eating',
    'Emotional Resilience',
    'Cognitive Behavioral Therapy (CBT)',
    'Mindful Movement',
    'Intermittent Fasting',
    'Nature Therapy',
    'Digital Detox'
  ];

  constructor(private resourceService: ResourceService) {}

  async onKeywordChange(event: Event) {
    const selectedKeyword = (event.target as HTMLSelectElement).value;
    if (selectedKeyword) {
      this.errorMessage = null;
      try {
        this.resources = await this.resourceService.searchResources(selectedKeyword);
      } catch (error) {
        this.handleError(error);
      }
    } else {
      this.resources = [];
    }
  }

  private handleError(error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 429:
          this.errorMessage = "API limit exceeded. Please try again later.";
          break;
        case 404:
          this.errorMessage = "Resources not found.";
          break;
        case 500:
          this.errorMessage = "Internal server error. Please try again later.";
          break;
        default:
          this.errorMessage = "An unexpected error occurred.";
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received
      this.errorMessage = "No response received from the server.";
    } else {
      // Something happened in setting up the request that triggered an Error
      this.errorMessage = "Error in setting up request.";
    }
  }
}
