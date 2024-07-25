import { Component } from '@angular/core';
import { EventDataService } from '../../ong/_services/eventData.service';
import { EventInterface } from '../../ong/_models/event.interface';
import { EventTypeEnum } from '../../../core/_utils/EventType.enum';

@Component({ selector: 'app-ong-events', templateUrl: './ong-events.component.html', styleUrl: './ong-events.component.scss' })
export class OngEventsComponent { 
    events: EventInterface[] = []
    EventTypeEnum = EventTypeEnum;
    constructor(private eventDataService: EventDataService) {
    }

    ngOnInit() : void {
      // salvar
      let event : EventInterface = {
        uid: '1',
        date_at: new Date((new Date()).setDate((new Date()).getDate() + 2)),
        local: 'Iguatemi',
        type: EventTypeEnum.BATH
      }
      this.eventDataService.save(event)

      let event2 : EventInterface = {
        uid: '2',
        date_at: new Date((new Date()).setDate((new Date()).getDate() + 3)),
        local: 'Shopping Total',
        type: EventTypeEnum.EVENT
      }
      this.eventDataService.save(event2)

      let event3 : EventInterface = {
        uid: '3',
        date_at: new Date((new Date()).setDate((new Date()).getDate() + 5)),
        local: 'Bourbon Country',
        type: EventTypeEnum.TRANSPORT
      }
      this.eventDataService.save(event3)

      let event4 : EventInterface = {
        uid: '4',
        date_at: new Date((new Date()).setDate((new Date()).getDate() + 7)),
        local: 'Shopping Praia de Belas',
        type: EventTypeEnum.BATH
      }
      this.eventDataService.save(event4)

      // eventos futuros
      let params = {
        field: 'date_at',
        operator: '>',
        value: new Date()
      }
  
      this.eventDataService.search(params).subscribe(events => {
        this.events = events
      })
    }
}