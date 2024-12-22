import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router, private cookieService: CookieService) {}

  async onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required!';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    try {
      const response = await axios.post(`${environment.apiUrl}/login`, {
        username: this.username,
        password: this.password,
      });

      if (response.status === 200) {
        console.log('Login successful:', response.data);

        console.log('response id: ', response.data.id);
        localStorage.setItem('userId', response.data.id);

        this.cookieService.set(
          'token',
          response.data.token,
          undefined,
          '/',
          '',
          true,
          'Strict'
        );

        this.router.navigate(['/dashboard']);
      }
    } catch (error: any) {
      console.error('Login failed:', error);

      this.errorMessage =
        error.response?.data?.message || 'Login failed. Please try again.';
    }
  }
}
