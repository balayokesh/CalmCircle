import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breath-bubble-exercise',
  standalone: true,
  imports: [],
  templateUrl: './breath-bubble-exercise.component.html',
  styleUrl: './breath-bubble-exercise.component.css',
})
export class BreathBubbleExerciseComponent implements OnInit {
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;
  bubbleRadius: number = 50; // Initial bubble size
  growing: boolean = true; // Flag to indicate if bubble is growing
  animationFrameId!: number;
  timerId: any;
  elapsedTime: number = 0;

  ngOnInit(): void {
    this.canvas = document.getElementById('bubbleCanvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d')!;
    this.startBreathingAnimation();
    this.startTimer();
  }

  startTimer() {
    this.timerId = setInterval(() => {
      this.elapsedTime += 1; // Increment elapsed time by one second
      console.log(`Elapsed Time: ${this.elapsedTime} seconds`); // Log elapsed time (or update UI)
    }, 1000); // Update every second
  }

  exitExercise() {
    window.close(); 
  }

  startBreathingAnimation() {
    const growDuration = 5000; // 5ms
    const shrinkDuration = 5000; // 5ms

    const animate = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear canvas

      // Draw breathing bubble
      this.drawBubble();

      // Draw instructions
      this.drawInstructions();

      if (this.growing) {
        this.bubbleRadius += this.canvas.width / 3 / (growDuration / 16); // Increase size
        if (this.bubbleRadius >= this.canvas.width / 3) {
          this.growing = false; // Switch to shrinking
        }
      } else {
        this.bubbleRadius -= this.canvas.width / 2 / (shrinkDuration / 16); // Decrease size
        if (this.bubbleRadius <= 50) {
          this.growing = true; // Switch to growing
        }
      }

      this.animationFrameId = requestAnimationFrame(animate); // Request next frame
    };

    animate(); // Start animation loop
  }

  drawInstructions() {
    const instructionText = this.growing ? 'Breathe In' : 'Breathe Out';
    this.context.fillStyle = 'black';
    this.context.font = '34px Arial';
    this.context.fillText(
      instructionText,
      this.canvas.width / 2 - 90,
      this.canvas.height / 2
    ); // Draw instruction text
  }

  drawBubble() {
    this.context.beginPath();
    this.context.arc(
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.bubbleRadius,
      0,
      Math.PI * 2
    );
    const gradient = this.context.createRadialGradient(
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.bubbleRadius * 0.5,
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.bubbleRadius
    );
    gradient.addColorStop(0, 'rgba(105, 0, 0, 0.8)');
    gradient.addColorStop(1, 'rgba(216, 50, 50, 0.5)');

    this.context.fillStyle = gradient;
    this.context.fill();
    this.context.strokeStyle = 'red';
    this.context.lineWidth = 5;
    this.context.stroke();
    this.context.closePath();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId); // Clean up animation frame on destroy
    clearInterval(this.timerId);
  }
}
