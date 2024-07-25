import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { EventFormComponent } from './_components/event-form/event-form.component';
import { OngEventsComponent } from './ong-events/ong-events.component';

import { CoreModule } from '../../core/core.module';
import { OngRoutingModule } from './ong-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    EventFormComponent,
    OngEventsComponent    
  ],
  imports: [
    CommonModule,
    CoreModule,
    OngRoutingModule,
    SharedModule,
    NgbDropdownModule, 
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class OngModule {}
