import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable, of, switchMap } from 'rxjs';
import { User } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { authState } from '@angular/fire/auth';
import { UserService } from '../../core/_service/userData.service';
import { UserTypeEnum } from '../../core/_utils/UserType.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  currentUser$: Observable<User | null>;
  errorMessage!: string;
  formLogIn!: FormGroup;
  hide: boolean = true;
  image = './../../../assets/images/background-login.png';
  logo = './../../../assets/icons/logo-brown.svg';

  constructor(
    private authService: AuthService,
    private firebaseAuth: Auth,
    private formBuilder: FormBuilder,
    private router: Router,
    public userService: UserService, 
  ) { this.currentUser$ = authState(this.firebaseAuth); }

  ngOnInit(): void {
    this.createForm();

    if (this.isUserAuthenticated()) {
      this.handleUserRedirection();
    }
  }

  createForm() {
    this.formLogIn = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  doLogin() {
    const rawForm = this.formLogIn.getRawValue();
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.handleUserRedirection();
      },
      error: (err) => {
        this.errorMessage = err.code;
        console.error('ERRO', err);
      }
    });
  }

  handleUserRedirection() {
    this.currentUser$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.getUserData(user.uid);
        } else {
          return of(null);
        }
      })
    ).subscribe(item => {
      if (item && item.userType === UserTypeEnum.ONG) {
        this.router.navigate(['/ong/events']);
      } else if (item && item.userType === UserTypeEnum.VOLUNTEER) {
        this.router.navigate(['/volunteering/my-volunteering']);
      }
    });
  }

  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  showHidePassword() {
    this.hide = !this.hide;
  }
}
