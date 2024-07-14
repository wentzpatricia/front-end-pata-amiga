import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { UserTypeEnum } from './core/_utils/UserType.enum';

let userType: UserTypeEnum = UserTypeEnum.ONG;

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'ong',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/ong/ong.module').then((m) => m.OngModule),
  },
  {
    path: 'volunteering',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/volunteer/volunteer.module').then(
        (m) => m.VolunteerModule
      ),
  },
  {
    path: '',
    redirectTo: userType === UserTypeEnum.ONG ? '/ong' : '/volunteering',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: userType === UserTypeEnum.ONG ? '/ong' : '/volunteering' }
];
