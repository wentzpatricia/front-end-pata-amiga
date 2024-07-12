import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OngEventsComponent } from './ong-events/ong-events.component';
import { OngRoutingModule } from './ong-routing.module';

@NgModule({
  declarations: [OngEventsComponent],
  imports: [CommonModule, OngRoutingModule],
})
export class OngModule {}
