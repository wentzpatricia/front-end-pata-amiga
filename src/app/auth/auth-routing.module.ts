import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      //   { path: 'auth/login', component: LoginComponent, data: { returnUrl: window.location.pathname } },
      //   { path: 'auth/mfa', component: MfaLoginComponent, data: { returnUrl: window.location.pathname } },
      //   { path: 'auth/register', component: RegisterComponent, data: { returnUrl: window.location.pathname } },
      //   { path: 'password/recovery', component: ForgetPasswordComponent, data: { returnUrl: window.location.pathname } },
      //   { path: 'password/:guid/reset', component: NewPasswordComponent, data: { returnUrl: window.location.pathname } }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
