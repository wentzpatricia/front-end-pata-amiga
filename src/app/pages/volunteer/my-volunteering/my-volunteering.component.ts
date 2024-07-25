import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { EventDataService } from '../../ong/_services/eventData.service';
import { Auth, authState, User } from '@angular/fire/auth';
import { Observable, of, switchMap } from 'rxjs';
import { EventInterface } from '../../ong/_models/event.interface';
import { EventTypeEnum } from '../../../core/_utils/EventType.enum';

@Component({ selector: 'app-my-volunteering', templateUrl: './my-volunteering.component.html', styleUrl: './my-volunteering.component.scss' })

export class MyVolunteeringComponent implements OnInit {
    currentUser$: Observable<User | null>;
    EventTypeEnum = EventTypeEnum; 
    events: EventInterface[] = [];
    constructor( private firebaseAuth: Auth, private firestore: Firestore, private eventDataService: EventDataService) {
        this.currentUser$ = authState(this.firebaseAuth);
    }

    ngOnInit(): void {
      this.fetchPendingEvents()
    }

    fetchPendingEvents() {
      if (this.firebaseAuth.currentUser !== null) {
        if (this.firebaseAuth.currentUser.uid) {
          this.eventDataService.getByUser(this.firebaseAuth.currentUser.uid).then((data) => {
          if(data)
            this.events = data;
          })
        }
      }
    }

    async cancel (eventToCancel: EventInterface) {
      if (this.firebaseAuth.currentUser?.uid) {
        try {
          this.eventDataService.removeByUser(this.firebaseAuth.currentUser?.uid, eventToCancel)
          if(this.firebaseAuth.currentUser?.email)
            this.eventDataService.removeUserOnEvent(eventToCancel.uid, this.firebaseAuth.currentUser?.email)

          const element = document.getElementById(eventToCancel.uid)
          if (element) {
            element.remove()
          }
        } catch (err) {
          //
        }
      }
    }
}
