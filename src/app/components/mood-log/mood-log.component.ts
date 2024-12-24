import { Component, OnInit } from '@angular/core';
import { MoodService } from '../../services/mood.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-mood-log',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './mood-log.component.html',
  styleUrl: './mood-log.component.css',
})
export class MoodLogComponent implements OnInit {
  moods = ['happy', 'sad', 'anxious', 'angry', 'excited', 'neutral'];
  moodData = {
    userId: localStorage.getItem('userId') || '12345',
    mood: '',
    notes: '',
  };
  moodEntries: any[] = [];
  moodChart: any;

  constructor(private moodService: MoodService) {}

  ngOnInit() {
    this.getMoodHistory();
  }

  async getMoodHistory() {
    try {
      this.moodEntries = await this.moodService.getMoodHistory(
        this.moodData.userId
      );
    } catch (error) {
      console.error('Error fetching mood history:', error);
    }
  }

  async logMood() {
    try {
      const newMood = await this.moodService.logMood(this.moodData);
      this.moodEntries.unshift(newMood); // Add the new entry to the top of the list
      this.moodData.mood = ''; // Reset form
      this.moodData.notes = '';
    } catch (error) {
      console.error('Error logging mood:', error);
    }
  }

  initializeChart() {
    const labels = this.moodEntries.map((entry) =>
      new Date(entry.timestamp).toLocaleDateString()
    );
    const data = this.moodEntries.map((entry) => entry.mood);

    this.moodChart = new Chart('moodChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Mood Over Time',
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  }

  updateChart() {
    if (this.moodChart) {
      this.moodChart.destroy();
    }
    this.initializeChart();
  }
}
