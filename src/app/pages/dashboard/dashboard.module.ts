import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageDashboardComponent } from './manage-dashboard/manage-dashboard.component';
import { OngDashboardComponent } from './ong-dashboard/ong-dashboard.component';
import { VoluntaryDashboardComponent } from './voluntary-dashboard/voluntary-dashboard.component';



@NgModule({
  declarations: [ManageDashboardComponent, OngDashboardComponent, VoluntaryDashboardComponent],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
