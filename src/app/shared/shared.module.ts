import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './button/button.component';
import { HeaderComponent } from './header/header.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';

@NgModule({
  declarations: [ButtonComponent, HeaderComponent, NavbarMobileComponent],
  imports: [CommonModule, RouterModule],
  exports: [ButtonComponent, HeaderComponent],
})
export class SharedModule {}
