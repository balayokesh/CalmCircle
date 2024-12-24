import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css',
})
export class ExerciseComponent {
  exercises = [
    {
      name: 'Breath Bubble Exercise',
      type: 'breathing exercise',
      mediaURL: '/breath-bubble',
      imagePath: '../../../assets/images/Bubble breathing.png',
      description:
        'A guided breathing exercise that helps you focus on your breath using a visual bubble.',
      userStreak: 5,
      isAvailable: true
    },
    {
      name: 'Triangle Breathing',
      type: 'breathing exercise',
      mediaURL: 'https://example.com/triangle-breathing',
      imagePath: '../../../assets/images/triangle-breathing.jpeg',
      description:
        'A breathing technique that involves visualizing a triangle while you breathe.',
      userStreak: 3,
      isAvailable: false
    },
    {
      name: 'Morning Yoga Flow',
      type: 'workout',
      mediaURL: 'https://example.com/morning-yoga-flow',
      imagePath: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG1ra2prd3VjZzFmZTNibjRuNGEyN3Fxb3AzcHV1aXpmemxuZjJuZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DBbPjLMsQPruMkDcrd/giphy.gif',
      description:
        'A gentle yoga flow to start your day with energy and positivity.',
      userStreak: 0,
    },
    {
      name: 'Full Body Stretch Routine',
      type: 'stretching',
      mediaURL: 'https://example.com/full-body-stretch',
      imagePath: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjNwNXpwajM2cHZjcnN6NHp2NHkzbnBiZGhlc2VhdWU2c3N4ZGF0NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPavRPgJYaNI97W/giphy.gif',
      description:
        'A full-body stretching routine to improve flexibility and relieve tension.',
      userStreak: 0,
    },
    {
      name: 'Mindful Walking Exercise',
      type: 'meditation',
      mediaURL: 'https://example.com/mindful-walking',
      imagePath: '../../../assets/images/Mindfull walking.jpeg',
      description:
        'An exercise that combines walking with mindfulness techniques.',
      userStreak: 0,
    },
  ];

  filteredExercises = this.exercises;

  filterType = '';

  filterExercises() {
    this.filteredExercises = this.filterType
      ? this.exercises.filter((exercise) => exercise.type === this.filterType)
      : this.exercises;
  }
}
