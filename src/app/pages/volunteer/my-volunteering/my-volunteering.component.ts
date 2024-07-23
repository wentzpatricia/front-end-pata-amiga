import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { EventDataService } from '../../ong/_services/eventData.service';
import { Auth } from '@angular/fire/auth';
import { EventInterface } from '../../ong/_models/event.interface';
import { EventTypeEnum } from '../../../core/_utils/EventType.enum';

@Component({ selector: 'app-my-volunteering', templateUrl: './my-volunteering.component.html', styleUrl: './my-volunteering.component.scss' })

export class MyVolunteeringComponent implements OnInit {
    constructor( private firebaseAuth: Auth, private firestore: Firestore, private eventDataService: EventDataService) {}
    events: EventInterface[] | any = [];

    ngOnInit(): void {
        if (this.firebaseAuth.currentUser !== null) {
            if (this.firebaseAuth.currentUser.uid) {
                this.eventDataService.getByUser(this.firebaseAuth.currentUser.uid).then((data) => {
                    this.events = data
                })
            }
        }
    }

    EventTypeEnum = EventTypeEnum; 

    date = [
        {
            date_at: '25 de julho às 18h',
            local: 'Avenida João Wallig, 1800,Jardim Europa, Porto Alegre - RS',
            type: EventTypeEnum.BATH
        },
        {
            date_at: '25 de julho às 18h',
            local: 'Avenida João Wallig, 1800,Jardim Europa, Porto Alegre - RS',
            type: EventTypeEnum.EVENT
        },
        {
            date_at: '25 de julho às 18h',
            local: 'Avenida João Wallig, 1800,Jardim Europa, Porto Alegre - RS',
            type: EventTypeEnum.TRANSPORT
        },
        {
            date_at: '25 de julho às 18h',
            local: 'Avenida João Wallig, 1800,Jardim Europa, Porto Alegre - RS',
            type: EventTypeEnum.BATH
        }
    ]
}

