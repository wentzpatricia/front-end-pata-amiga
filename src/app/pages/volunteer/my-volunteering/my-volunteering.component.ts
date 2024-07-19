import { Component } from '@angular/core';
import { EventTypeEnum } from '../../../core/_utils/EventType.enum';

@Component({ selector: 'app-my-volunteering', templateUrl: './my-volunteering.component.html', styleUrl: './my-volunteering.component.scss' })
export class MyVolunteeringComponent {

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

