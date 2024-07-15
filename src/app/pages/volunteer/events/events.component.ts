import { Component } from '@angular/core';
import { EventDataService } from './eventData.service';

@Component({ selector: 'app-events', templateUrl: './events.component.html', styleUrl: './events.component.scss' })
export class EventsComponent {
  constructor(private eventDataService: EventDataService) {
  }

  ngOnInit(): void {  
    
  }
}

