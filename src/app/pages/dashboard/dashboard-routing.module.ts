import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDashboardComponent } from './manage-dashboard/manage-dashboard.component';

const routes: Routes = [
  { path: '', component: ManageDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}