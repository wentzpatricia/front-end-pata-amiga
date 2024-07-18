import { Auth } from '@angular/fire/auth';
import { authState } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from 'firebase/auth';

import { AuthService } from './auth/auth.service';
import { UserService } from './core/_service/userData.service';

import { Observable, switchMap } from 'rxjs';

import { SharedModule } from './shared/shared.module';
import { UserTypeEnum } from './core/_utils/UserType.enum';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  currentUser$: Observable<User | null>;
  mdq: MediaQueryList;
  mediaQueryListener: () => void;
  userType!: UserTypeEnum;
  constructor(
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private firebaseAuth: Auth,
    private media: MediaMatcher,
    public userService: UserService,
  ) {
    this.currentUser$ = authState(this.firebaseAuth);

    this.mdq = media.matchMedia('(max-width: 992px)');
    this.mediaQueryListener = () => changeDetectorRef.detectChanges();
    this.mdq.addListener(this.mediaQueryListener);
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
