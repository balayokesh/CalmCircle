import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  userName: string = ''; // User's actual name
  stayAnonymous: boolean = false; // Checkbox state

  constructor(private router: Router) { } // Inject Router

  startChat() {
    if (this.stayAnonymous) {
      // Redirect to /chat/anonymous if staying anonymous
      this.router.navigate(['/chat', 'Anonymous']);
    } else {
      // Redirect to /chat/:username if userName is provided
      this.router.navigate(['/chat', this.userName.trim() || 'Anonymous']); // Default to 'Anonymous' if userName is empty
    }
  }
}
