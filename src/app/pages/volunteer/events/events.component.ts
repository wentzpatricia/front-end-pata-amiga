import { Component } from '@angular/core';
import { EventDataService } from './eventData.service';
import { EventInterface } from './event.interface';
import { EventTypeEnum } from '../../../core/_utils/EventType.enum';

@Component({ selector: 'app-events', templateUrl: './events.component.html', styleUrl: './events.component.scss' })
export class EventsComponent {
  itens: EventInterface[] = []
  constructor(private eventDataService: EventDataService) {
  }

  ngOnInit() : void {
    // listar e deletar
    this.eventDataService.list().subscribe(events => {
        this.itens = events
        console.log(this.itens)
        this.eventDataService.delete(this.itens[0].uid as string)
    })

    // salvar 
    let event : EventInterface = {
      date_at: new Date(),
      local: 'Iguatemi',
      type: EventTypeEnum.BATH
    }
    this.eventDataService.save(event)

    let event2 : EventInterface = {
      date_at: new Date((new Date()).setDate((new Date()).getDate() + 2)),
      local: 'Shopping Total',
      type: EventTypeEnum.BATH
    }
    this.eventDataService.save(event2)

    let event3 : EventInterface = {
      date_at: new Date((new Date()).setDate((new Date()).getDate() + 5)),
      local: 'Shopping Total',
      type: EventTypeEnum.BATH
    }
    this.eventDataService.save(event3)

    let event4 : EventInterface = {
      date_at: new Date((new Date()).setDate((new Date()).getDate() + 7)),
      local: 'Shopping Total',
      type: EventTypeEnum.BATH
    }
    this.eventDataService.save(event4)

    // atualizar
    let eventToUpdate : EventInterface = {
      date_at: new Date(),
      local: 'Bourbon Country',
      type: EventTypeEnum.EVENT
    }
    this.eventDataService.update(eventToUpdate, 'fXvIqHqh0GSHqsfsuEm3')

    // pesquisar por data
    // listar e deletar
    let params = {
      field: 'date_at',
      operator: '==',
      value: new Date()
    }

    this.eventDataService.search(params).subscribe(events => {
      this.itens = events
      console.log(this.itens)
    })

    // eventos futuros
    params = {
      field: 'date_at',
      operator: '>',
      value: new Date()
    }

    this.eventDataService.search(params).subscribe(events => {
      this.itens = events
      console.log('proximos eventos')
      console.log(this.itens)
    })
  }
}
