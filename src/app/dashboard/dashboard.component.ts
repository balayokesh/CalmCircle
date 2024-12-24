import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgbAlertModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MoodLogComponent } from '../components/mood-log/mood-log.component';
import { Router } from '@angular/router';
import { ResourcesComponent } from "../components/resources/resources.component";
import { ExerciseComponent } from "../components/exercise/exercise.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgbNavModule, NgbAlertModule, MoodLogComponent, ResourcesComponent, ExerciseComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}
  active = 3;
  logout() {
    console.log('clicked log out');
    this.authService.logout();
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }
}
