import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { EventTypeEnum } from '../../../core/_utils/EventTypeEnum.enum';
import { EventInterface } from './event.interface';
import { getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {

  constructor(private firestore: Firestore, private eventTypeEnum: EventTypeEnum) {}
  
  list (): Observable<EventInterface | null> {
    const docRef = doc(this.firestore, 'events');
    return from(getDocs(docRef)).pipe(
      map(doc => {
        if (doc.exists()) {
          const data = doc.data() as UserInterface;
          return { ...data, userType: data.userType }; 
        } else {
          return null;
        }
      }),
      catchError(error => {
        console.error('Error getting user document:', error);
        return of(null);
      })
    );
  }    
}
