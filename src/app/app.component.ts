import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { SharedModule } from './shared/shared.module';
import { UserTypeEnum } from './core/_utils/UserType.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  //depois precisa vir da api
  userType!: UserTypeEnum;

  constructor(private authService: AuthGuard) {}

  ngOnInit(): void {
    this.userType = UserTypeEnum.ONG;
  }

  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
