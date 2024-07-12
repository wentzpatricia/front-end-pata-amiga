import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsComponent } from './events/events.component';
import { MyVolunteeringComponent } from './my-volunteering/my-volunteering.component';

import { VolunteerRoutingModule } from './volunteer-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [EventsComponent, MyVolunteeringComponent],
  imports: [CommonModule, SharedModule, VolunteerRoutingModule],
})
export class VolunteerModule {}
