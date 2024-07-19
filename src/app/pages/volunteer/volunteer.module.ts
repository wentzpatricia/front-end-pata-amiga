import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { EventsComponent } from './events/events.component';
import { MyVolunteeringComponent } from './my-volunteering/my-volunteering.component';

import { VolunteerRoutingModule } from './volunteer-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    EventsComponent, 
    MyVolunteeringComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule, 
    SharedModule, 
    VolunteerRoutingModule
  ],
})
export class VolunteerModule {}
