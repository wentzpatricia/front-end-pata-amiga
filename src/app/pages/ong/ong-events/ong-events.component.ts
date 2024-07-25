import { Auth } from '@angular/fire/auth';
import { Component,  OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { EventDataService } from '../../ong/_services/eventData.service';
import { EventInterface } from '../../ong/_models/event.interface';
import { EventTypeEnum } from '../../../core/_utils/EventType.enum';
import { Firestore } from '@angular/fire/firestore';
import { EventFormComponent } from '../_components/event-form/event-form.component';

@Component({ selector: 'app-ong-events', templateUrl: './ong-events.component.html', styleUrl: './ong-events.component.scss' })
export class OngEventsComponent {
  @ViewChild('content') modal!: EventFormComponent;
  constructor( private firebaseAuth: Auth, private firestore: Firestore, private eventDataService: EventDataService) {}

  data : any[] = [
        
    {
        date_at: '25 de julho às 18h',
        local: 'Avenida João Wallig, 1800,Jardim Europa, Porto Alegre - RS',
        type: EventTypeEnum.BATH,
        volunteer: 'Mariana'
    },
    {
      date_at: '25 de julho às 18h',      
      local: 'Avenida João Wallig, 1800,Jardim Europa, Porto Alegre - RS',
      type: EventTypeEnum.BATH,
      volunteer: 'Mariana'
    },
    {
      date_at: '25 de julho às 18h',      
      local: 'Avenida João Wallig, 1800,Jardim Europa, Porto Alegre - RS',
      type: EventTypeEnum.BATH,
      volunteer: 'Mariana'
    },
    {
      date_at: '25 de julho às 18h',      
      local: 'Avenida João Wallig, 1800,Jardim Europa, Porto Alegre - RS',
      type: EventTypeEnum.BATH,
      volunteer: 'Mariana'
    }
];
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
  openModal() {    
    this.modal.open();
  }

  async submitEvent(event: any) {
      if (this.firebaseAuth.currentUser?.uid) {
          this.eventDataService.addByUser(this.firebaseAuth.currentUser?.uid, event)
      }
  }
}

// export class OngEventsComponent implements OnInit {
//   constructor( private firebaseAuth: Auth, private firestore: Firestore, private eventDataService: EventDataService) {}
//   events: EventInterface[] | any = [];
  
//     // itens: EventInterface[] = []
//     // constructor(private eventDataService: EventDataService) {
//     // }
  
//     ngOnInit() : void {
//       // listar e deletar
//       if (this.firebaseAuth.currentUser !== null) {
//         if (this.firebaseAuth.currentUser.uid) {
//             this.eventDataService.getByUser(this.firebaseAuth.currentUser.uid).then((data) => {
//                 this.events = data
//       // this.eventDataService.list().subscribe(events => {
//       //     this.itens = events
//       //     console.log(this.itens)
//       //     this.eventDataService.delete(this.itens[0].uid as string)
//       })
//     }
//       }
//     }
//   } // salvar 
//   //     let event : EventInterface = {
//   //       date_at: new Date(),
//   //       local: 'Iguatemi',
//   //       type: EventTypeEnum.BATH
//   //     }
//   //     this.eventDataService.save(event)
  
//   //     let event2 : EventInterface = {
//   //       date_at: new Date((new Date()).setDate((new Date()).getDate() + 2)),
//   //       local: 'Shopping Total',
//   //       type: EventTypeEnum.BATH
//   //     }
//   //     this.eventDataService.save(event2)
  
//   //     let event3 : EventInterface = {
//   //       date_at: new Date((new Date()).setDate((new Date()).getDate() + 5)),
//   //       local: 'Shopping Total',
//   //       type: EventTypeEnum.BATH
//   //     }
//   //     this.eventDataService.save(event3)
  
//   //     let event4 : EventInterface = {
//   //       date_at: new Date((new Date()).setDate((new Date()).getDate() + 7)),
//   //       local: 'Shopping Total',
//   //       type: EventTypeEnum.BATH
//   //     }
//   //     this.eventDataService.save(event4)
  
//   //     // atualizar
//   //     let eventToUpdate : EventInterface = {
//   //       date_at: new Date(),
//   //       local: 'Bourbon Country',
//   //       type: EventTypeEnum.EVENT
//   //     }
//   //     this.eventDataService.update(eventToUpdate, 'fXvIqHqh0GSHqsfsuEm3')
  
//   //     // pesquisar por data
//   //     // listar e deletar
//   //     let params = {
//   //       field: 'date_at',
//   //       operator: '==',
//   //       value: new Date()
//   //     }
  
//   //     // this.eventDataService.search(params).subscribe(events => {
//   //     //   this.itens = events
//   //     //   console.log(this.itens)
//   //     // })
  
//   //     // eventos futuros
//   //     params = {
//   //       field: 'date_at',
//   //       operator: '>',
//   //       value: new Date()
//   //     }
  
//   //     this.eventDataService.search(params).subscribe(events => {
//   //       this.itens = events
//   //     })
//   //   }
//   // }