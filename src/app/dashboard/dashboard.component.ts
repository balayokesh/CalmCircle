import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgbNavModule, NgbNavModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}
  active = 'top';
  logout() {
    console.log('clicked log out');
    this.authService.logout();
  }
}
