import { Component } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  user = {
    username: '',
    password: '',
    email: '',
    profilePicture: '',
    isAnonymous: false,
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor() {}

  onSubmit() {
    const payload = {
      username: this.user.username,
      password: this.user.password,
      email: this.user.email,
      profilePicture: this.user.profilePicture,
      isAnonymous: this.user.isAnonymous,
    };

    axios
      .post(`${environment.apiUrl}/signup`, payload)
      .then((response) => {
        console.log(response.data);
        this.successMessage = 'User created successfully! You can now log in.';
        this.errorMessage = '';
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        this.errorMessage =
          error.error?.message ||
          'An error occurred during registration. Please try again.';
        this.successMessage = '';
      });
  }
}
