import { Component } from '@angular/core';
import axios from 'axios';
import sha256 from 'js-sha256';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    const password = this.user.password;
    const hashedPassword = sha256(password);
    const payload = {
      username: this.user.username,
      passwordHash: hashedPassword,
      email: this.user.email,
      profilePicture: this.user.profilePicture,
      isAnonymous: this.user.isAnonymous,
    };

    axios
      .post('https://znjxgg-3000.csb.app/signup', payload)
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
