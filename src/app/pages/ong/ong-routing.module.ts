import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OngEventsComponent } from './ong-events/ong-events.component';

const routes: Routes = [{ path: 'events', component: OngEventsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OngRoutingModule {}
