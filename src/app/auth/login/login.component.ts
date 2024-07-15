import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthGuard } from '../auth.guard';
import { LocalStorageUtils } from '../../core/_utils/localstorage';
import { AuthService } from '../auth.service';

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
    private authGuard: AuthGuard,
    private authService: AuthService,
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
    const rawForm = this.formLogIn.getRawValue()
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/volunteering/my-volunteering');
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

  showHidePassword() {
    this.hide = !this.hide;
  }
}
