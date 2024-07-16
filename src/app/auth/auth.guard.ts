import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { authState } from '@angular/fire/auth';

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
