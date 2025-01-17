import { Auth } from '@angular/fire/auth';
import { Component, ViewChild } from '@angular/core';

import { EventDataService } from '../../ong/_services/eventData.service';
import { EventInterface } from '../../ong/_models/event.interface';
import { EventTypeEnum } from '../../../core/_utils/EventType.enum';

import { EventFormComponent } from '../_components/event-form/event-form.component';
import { UserInterface } from '../../../auth/register/_models/user.interface';

@Component({ selector: 'app-ong-events', templateUrl: './ong-events.component.html', styleUrl: './ong-events.component.scss' })
export class OngEventsComponent {
  @ViewChild('content') modal!: EventFormComponent;

  EventTypeEnum = EventTypeEnum; 
  events : EventInterface[] = []

  constructor( 
    private firebaseAuth: Auth, 
    private eventDataService: EventDataService
  ) {}

  ngOnInit () {
    if (this.firebaseAuth.currentUser?.uid) {
      this.eventDataService.nextEvents(this.firebaseAuth.currentUser?.uid).subscribe(events => {
        this.events = events;
      })
    }
  }

  async delete (event: EventInterface) {
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

  openModal() {    
    this.modal.open();
  }

  openModalEdit(event: EventInterface) {    
    this.modal.open(event);
  }

  onEventSaved(event: EventInterface) {
    this.events.push(event);
  }

  onEventUpdated(updatedEvent: EventInterface) {
    const index = this.events.findIndex(e => e.uid === updatedEvent.uid);
    if (index !== -1) {
      this.events[index] = updatedEvent;
    }
  }
}