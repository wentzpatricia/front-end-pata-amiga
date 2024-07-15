import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { UserService } from './core/_service/userData.service';
import { User } from 'firebase/auth';
import { UserTypeEnum } from './core/_utils/UserType.enum';
import { authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  userType!: UserTypeEnum;
  currentUser$: Observable<User | null>;

  constructor(private authService: AuthService, private firebaseAuth: Auth, public userService: UserService, private router: Router) {
    this.currentUser$ = authState(this.firebaseAuth);
  }

  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.userService.getUserData(user.uid).subscribe(
          (item) => { 
            console.log(item);
            if(item && item.userType) this.userType = item.userType}
          );
        this.router.navigate(['/volunteering/my-volunteering']);
      } else {
        this.router.navigate(['/ong/events']);
      }
    });
  }

  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}