import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { UserTypeEnum } from './core/_utils/UserType.enum';

let userType: UserTypeEnum = UserTypeEnum.VOLUNTEER;
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
    redirectTo: '/volunteering/my-volunteering',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/volunteering/my-volunteering' }
];
