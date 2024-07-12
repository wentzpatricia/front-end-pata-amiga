import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyVolunteeringComponent } from './my-volunteering/my-volunteering.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  { path: 'my-volunteering', component: MyVolunteeringComponent },
  { path: 'events', component: EventsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteerRoutingModule {}
