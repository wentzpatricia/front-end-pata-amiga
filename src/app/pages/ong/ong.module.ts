import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { OngEventsComponent } from './ong-events/ong-events.component';
import { OngRoutingModule } from './ong-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EventFormComponent } from './_components/event-form/event-form.component';

@NgModule({
  declarations: [
    EventFormComponent,
    OngEventsComponent    
  ],
  imports: [
    CommonModule,
    OngRoutingModule,
    SharedModule,
    NgbDropdownModule, 
  ],
})
export class OngModule {}
