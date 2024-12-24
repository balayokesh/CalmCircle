import { Component, OnInit } from '@angular/core';
import { MoodService } from '../../services/mood.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-mood-log',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './mood-log.component.html',
  styleUrl: './mood-log.component.css',
})
export class MoodLogComponent implements OnInit {
  moods = ['happy', 'excited', 'neutral', 'angry', 'anxious', 'sad'];
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
      this.initializeChart();
    } catch (error) {
      console.error('Error fetching mood history:', error);
    }
  }

  async logMood() {
    try {
      const newMood = await this.moodService.logMood(this.moodData);
      this.moodEntries.push(newMood.mood);
      console.log(this.moodEntries);
      this.moodData.mood = ''; // Reset form
      this.moodData.notes = '';
      this.updateChart();
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
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
            y: {
                type: 'category',
                labels: ['happy', 'excited', 'neutral', 'angry', 'anxious', 'sad'],
            }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem: any) => {
                const mood = tooltipItem.raw;
                const note = this.moodEntries[tooltipItem.dataIndex].notes;
                return `${note || 'No Note provided'}`;
              },
            },
          },
        },
      }
    });
  }

  updateChart() {
    if (this.moodChart) {
      this.moodChart.destroy();
    }
    this.initializeChart();
  }
}
