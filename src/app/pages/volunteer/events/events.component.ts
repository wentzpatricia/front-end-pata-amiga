import { Auth } from '@angular/fire/auth';
import { Component } from '@angular/core';

import { EventTypeEnum } from '../../../core/_utils/EventType.enum';

import { EventDataService } from '../../ong/_services/eventData.service';
import { EventInterface } from '../../ong/_models/event.interface';
import { UserService } from '../../../core/_service/userData.service';
import { UserInterface } from '../../../auth/register/_models/user.interface';
import { UserTypeEnum } from '../../../core/_utils/UserType.enum';

@Component({ selector: 'app-events', templateUrl: './events.component.html', styleUrl: './events.component.scss' })

export class EventsComponent {
    constructor( 
      private firebaseAuth: Auth,
      private eventDataService: EventDataService,
      private userService: UserService
    )
    {}

    EventTypeEnum = EventTypeEnum;
    data: EventInterface[] = [];

    ngOnInit () {
     this.fetchPendingEvents()
    }

    async submitEvent(event: EventInterface) {
      if (this.firebaseAuth.currentUser?.uid) {
        try {
          if (this.firebaseAuth.currentUser?.email) {
            const user: UserInterface = {
              uid: this.firebaseAuth.currentUser.uid,
              email: this.firebaseAuth.currentUser?.email,
              userType: UserTypeEnum.VOLUNTEER
            };

            this.eventDataService.addByUser(this.firebaseAuth.currentUser?.uid, event)
            this.eventDataService.addUserOnEvent(event.uid, user)

            const element = document.getElementById(event.uid)
            if (element) {
              element.remove()
            }
          }
        } catch (err) {
          //
        }
      }
    }

    fetchPendingEvents() {
      if(this.firebaseAuth.currentUser?.email)
      this.eventDataService.available(this.firebaseAuth.currentUser?.email).subscribe({
        next : (events) => {
          this.data = events
        },
        error: (err) => {
        //
       }
    })
  }
}
