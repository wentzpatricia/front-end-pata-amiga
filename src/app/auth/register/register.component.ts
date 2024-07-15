import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Validations } from '../../core/_utils/validations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  errorMessage: string | null = null;
  form!: FormGroup;
  hide: boolean = true;
  hideConfirm: boolean = true;
  image = './../../../assets/images/background-login.png';
  logo = './../../../assets/icons/logo-brown.svg';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();

    // if (this.isUserAuthenticated()) {
    //   this.router.navigate(['/dashboard']);
    // }
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
        // this.router.navigateByUrl('auth/login');
        console.log ('SUCESSO')
      },
      error: (err) => {
        this.errorMessage = err.code;
        console.error ('ERRO', err)
      }
    })
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
