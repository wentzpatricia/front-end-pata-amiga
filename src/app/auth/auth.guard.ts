import { Auth } from '@angular/fire/auth';
import { authState } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate  {

  constructor(
    private authService: AuthService,
    private firebaseAuth: Auth,
    private router: Router) {}

  canActivate(): Observable<boolean> {
    return authState(this.firebaseAuth).pipe(
      switchMap(user => {
        if (user) {
          return of(true);
        } else {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
          return of(false);
        }
      })
    );
  }
}
