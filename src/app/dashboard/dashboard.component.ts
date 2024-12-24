import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgbAlertModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MoodLogComponent } from '../components/mood-log/mood-log.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgbNavModule, NgbAlertModule, MoodLogComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}
  active = 1;
  logout() {
    console.log('clicked log out');
    this.authService.logout();
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }
}
