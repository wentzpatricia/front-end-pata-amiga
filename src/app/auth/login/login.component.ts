import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthGuard } from '../auth.guard';
import { LocalStorageUtils } from '../../core/_utils/localstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  errorMessage!: string;
  formLogIn!: FormGroup;
  hide: boolean = true;
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
      //acho que vai ter que adicionar um if pelo tipo de usuário e redirecionar certinho
      this.router.navigate(['/volunteering/my-volunteering']);
    }
  }

  createForm() {
    this.formLogIn = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  doLogin() {
    const email = this.formLogIn.get('email')?.value;
    const password = this.formLogIn.get('password')?.value;
    const localStorageUtils = new LocalStorageUtils();
    if (email === 'email@email.com.br' && password === '1234') {
      localStorageUtils.setItem('login', true);
    } else {
      this.errorMessage =
        'Email ou senha inválidos. Por favor, tente novamente.';
    }
    if (this.authService.canActivate()) {
      //acho que vai ter que adicionar um if pelo tipo de usuário e redirecionar certinho
      // this.router.navigate(['/volunteering/my-volunteering']);
      this.router.navigate(['/ong/events']);
    }
  }

  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  showHidePassword() {
    this.hide = !this.hide;
  }
}
