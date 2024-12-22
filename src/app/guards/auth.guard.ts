import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(): boolean {
    const token = this.cookieService.get('token');
    if (token) {
      return true; // User is authenticated
    } else {
      console.log('user not authenticated');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
