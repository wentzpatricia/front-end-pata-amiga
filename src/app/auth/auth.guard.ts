import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LoginService } from './login/_services/login.service';

import { LocalStorageUtils } from '../core/_utils/localstorage';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate  {


  constructor(private authService: LoginService ,private router: Router) {}

  canActivate(): boolean {
    const localStorageUtils = new LocalStorageUtils();
    if(this.isAuthenticated())
      return true

    this.authService.logout();
    localStorageUtils.removeItem('login')
    return false;
  }

  isAuthenticated(): boolean {
    const localStorageUtils = new LocalStorageUtils();
    const login = localStorageUtils.getItem('login');
    return !!login;
  }
}
