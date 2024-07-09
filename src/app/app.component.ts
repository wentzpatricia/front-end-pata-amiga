import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';


@Component({ selector: 'app-root', standalone: true, imports: [CommonModule, RouterOutlet], templateUrl: './app.component.html', styleUrl: './app.component.scss' })
export class AppComponent {

  constructor(
    private authService: AuthGuard,
  ) { }

  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  
}