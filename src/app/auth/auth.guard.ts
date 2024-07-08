import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.isUserAuthenticated()) return true;

    // this.authService.logout(false);
    return false;
  }

  isUserAuthenticated(): boolean {
    // const localStorageUtils = new LocalStorageUtils();
    // const user = localStorageUtils.getUser();
    // // return !!(user && user?.token);
    // if (user && user.token) {
    //   if (user.requiresMFA && user.mfaToken) {
    //     return true;
    //   } else if (!user.requiresMFA) {
    //     return true;
    //   }
    // }

     return false;
  }
}
