import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './button/button.component';
import { HeaderComponent } from './header/header.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [ButtonComponent, HeaderComponent, NavbarMobileComponent, SpinnerComponent],
  imports: [CommonModule, RouterModule],
  exports: [ButtonComponent, HeaderComponent, SpinnerComponent],
})
export class SharedModule {}
