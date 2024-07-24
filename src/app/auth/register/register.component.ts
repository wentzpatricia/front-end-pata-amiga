import { Auth, authState } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, of, switchMap } from 'rxjs';
import { User } from 'firebase/auth';

import { AuthService } from '../auth.service';
import { UserService } from '../../core/_service/userData.service';
import { UserTypeEnum } from '../../core/_utils/UserType.enum';

import { Validations } from '../../core/_utils/validations';

@Component({ selector: 'app-register', templateUrl: './register.component.html', styleUrl: './register.component.scss' })
export class RegisterComponent {
  currentUser$!: Observable<User | null>;
  errorMessage: string | null = null;
  form!: FormGroup;
  hide: boolean = true;
  hideConfirm: boolean = true;
  image = './../../../assets/images/background-login.png';
  logo = './../../../assets/icons/logo-brown.svg';

  constructor(
    private authService: AuthService,
    private firebaseAuth: Auth,
    private formBuilder: FormBuilder,
    private router: Router,
    public userService: UserService, 
  ) {this.currentUser$ = authState(this.firebaseAuth);}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.email, Validators.required]],
        username: ['teste'],
        userType: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: Validations.verifyPassword,
      }
    );
  }

  createUser() {
    const rawForm = this.form.getRawValue();
    this.authService.register(rawForm.email, rawForm.username, rawForm.confirmPassword, rawForm.userType).subscribe({
      next: () => {
        this.handleUserRedirection();
      },
      error: (err) => {
        this.errorMessage = err.code;
        console.error ('ERRO', err)
      }
    })
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

  showHideConfirmPassword() {
    this.hideConfirm = !this.hideConfirm;
  }

  showHidePassword() {
    this.hide = !this.hide;
  }
}
