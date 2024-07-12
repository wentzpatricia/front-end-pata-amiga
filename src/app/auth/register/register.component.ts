import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthGuard } from '../auth.guard';
import { Validations } from '../../core/_utils/validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  errorMessage!: string;
  form!: FormGroup;
  hide: boolean = true;
  hideConfirm: boolean = true;
  image = './../../../assets/images/background-login.png';
  logo = './../../../assets/icons/logo-brown.svg';

  constructor(
    private authService: AuthGuard,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();

    if (this.isUserAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.email, Validators.required]],
        userType: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: Validations.verifyPassword,
      }
    );
  }

  createUser() {}

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
