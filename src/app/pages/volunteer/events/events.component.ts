import { Auth } from '@angular/fire/auth';
import { Component } from '@angular/core';

import { EventTypeEnum } from '../../../core/_utils/EventType.enum';

import { EventDataService } from '../../ong/_services/eventData.service';
import { EventInterface } from '../../ong/_models/event.interface';
@Component({ selector: 'app-events', templateUrl: './events.component.html', styleUrl: './events.component.scss' })

export class EventsComponent {
    constructor( 
      private firebaseAuth: Auth,
      private eventDataService: EventDataService) 
    {}

    data : EventInterface[] = [];
    EventTypeEnum = EventTypeEnum; 

    ngOnInit () {
      let params = {
        field: 'date_at',
        operator: '>=',
        value: new Date()
      }
  
      this.eventDataService.search(params).subscribe(events => {
        this.data = events
      })
    }

    async submitEvent(event: any) {
        if (this.firebaseAuth.currentUser?.uid) {
            this.eventDataService.addByUser(this.firebaseAuth.currentUser?.uid, event)
        }
    }
}
