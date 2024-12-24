import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Notification {
  notificationType: string;
  reminder: string;
  timeInterval: number;
  optIn: boolean;
}

@Component({
  selector: 'app-notification-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification-manager.component.html',
  styleUrl: './notification-manager.component.css',
})
export class NotificationManagerComponent implements OnInit {
  notifications: Notification[] = [
    {
      notificationType: 'Eye Relax',
      reminder: 'Look at something 20 feet away for at least 20 seconds.',
      timeInterval: 30,
      optIn: true,
    },
    {
      notificationType: 'Sip Water',
      reminder: 'Drink a glass of water.',
      timeInterval: 30,
      optIn: true,
    },
    {
      notificationType: 'Stretch a Bit',
      reminder: 'Stand up and stretch your body.',
      timeInterval: 60,
      optIn: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleOptIn(index: number) {
    this.notifications[index].optIn = !this.notifications[index].optIn;
  }

  addNotification() {
    this.notifications.unshift({
      notificationType: 'New Notification',
      reminder: 'Enter your reminder here.',
      timeInterval: 30,
      optIn: false,
    });
  }
}
