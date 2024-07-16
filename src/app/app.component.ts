import { Auth } from '@angular/fire/auth';
import { authState } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from 'firebase/auth';

import { AuthService } from './auth/auth.service';
import { UserService } from './core/_service/userData.service';

import { Observable, switchMap } from 'rxjs';

import { SharedModule } from './shared/shared.module';
import { UserTypeEnum } from './core/_utils/UserType.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userType!: UserTypeEnum;
  currentUser$: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private firebaseAuth: Auth,
    public userService: UserService,
  ) {
    this.currentUser$ = authState(this.firebaseAuth);
  }

  ngOnInit(): void {
    this.currentUser$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.getUserData(user.uid);
        } else {
          return new Observable<{ userType: UserTypeEnum | null }>(observer => {
            observer.next({ userType: null });
            observer.complete();
          });
        }
      })
    ).subscribe(item => {
      if (item && item.userType) {
        this.userType = item.userType;
      }
    });
  }

  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
