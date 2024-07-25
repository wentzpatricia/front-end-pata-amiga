import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { OngEventsComponent } from './ong-events/ong-events.component';
import { OngRoutingModule } from './ong-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EventFormComponent } from './_components/event-form/event-form.component';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ],
})
export class OngModule {}
