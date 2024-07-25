import { Auth } from '@angular/fire/auth';
import { Component,  OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { EventDataService } from '../../ong/_services/eventData.service';
import { EventInterface } from '../../ong/_models/event.interface';
import { EventTypeEnum } from '../../../core/_utils/EventType.enum';
import { Firestore } from '@angular/fire/firestore';
import { EventFormComponent } from '../_components/event-form/event-form.component';
import { UserInterface } from '../../../auth/register/_models/user.interface';

@Component({ selector: 'app-ong-events', templateUrl: './ong-events.component.html', styleUrl: './ong-events.component.scss' })
export class OngEventsComponent {
  @ViewChild('content') modal!: EventFormComponent;
  constructor( private firebaseAuth: Auth, private firestore: Firestore, private eventDataService: EventDataService) {}
  EventTypeEnum = EventTypeEnum; 
  events : EventInterface[] = []

  ngOnInit () {
    if (this.firebaseAuth.currentUser?.uid) {
      this.eventDataService.nextEvents(this.firebaseAuth.currentUser?.uid).subscribe(events => {
        this.events = events;
      })
    }
  }

  openModal() {    
    this.modal.open();
  }

  openModalEdit(event: any) {    
    this.modal.open(event);
  }

  async delete (event: any) {
    if (event.volunteers !== undefined) {
      event.volunteers.forEach((user: UserInterface) => {
        this.eventDataService.removeByUser(user.uid, event)
      })
    }

    try {
      this.eventDataService.delete(event.uid)
      const element = document.getElementById(event.uid)
      if (element) {
        element.remove()
      }
    } catch (err) {
      console.log(err)
    }
  }
}