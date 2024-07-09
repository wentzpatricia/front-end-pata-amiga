import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}