import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService, private router: Router) {}

  logout() {
    this.cookieService.delete('token', '/', '', true, 'Strict');
    this.router.navigate(['/login']);
  }
}
