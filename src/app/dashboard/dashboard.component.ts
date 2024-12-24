import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MoodLogComponent } from '../components/mood-log/mood-log.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgbNavModule, NgbNavModule, MoodLogComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}
  active = 'mood';
  logout() {
    console.log('clicked log out');
    this.authService.logout();
  }
}
