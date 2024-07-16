import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


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
  // {
  //   path: '',
  //   redirectTo: '/auth/login',
  //   pathMatch: 'full',
  // },
  // { path: '**', redirectTo: '/auth/login' }
];
