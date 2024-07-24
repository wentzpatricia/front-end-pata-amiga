import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { OngEventsComponent } from './ong-events/ong-events.component';
import { OngRoutingModule } from './ong-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
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
