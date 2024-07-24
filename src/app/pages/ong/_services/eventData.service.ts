import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { EventInterface } from '../_models/event.interface';
import { addDoc, collection, deleteDoc, DocumentData, getDocs, query, QuerySnapshot, setDoc, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {
  constructor(private firestore: Firestore) {}

  list () : Observable<EventInterface[]> {
    return from(getDocs(collection(this.firestore, "events")))
      .pipe(
        map(querySnapshot => {
            const dataList: EventInterface[] = [];
            querySnapshot.forEach(doc => {
                if (doc.exists()) {
                    const data = doc.data() as DocumentData;
                    console.log(data['date_at'])
                    const event: EventInterface = {
                        date_at: data['date_at'],
                        local: data['local'],
                        type: data['type']
                    };
                    dataList.push(event);
                }
            });
            return dataList;
        })
      )
  }

  async save (event: EventInterface) {
    await addDoc(collection(this.firestore, "events"), event);
  }

  async update (event: EventInterface, id: string) {
    await setDoc(doc(this.firestore, "events", id), event);
  }

  async delete (id: string) {
    await deleteDoc(doc(this.firestore, "events", id));
  }

  search (params : any) : Observable<EventInterface[]> {
    const searchPipe = query(collection(this.firestore, "events"), where(params.field, params.operator, params.value))

    console.log(searchPipe)

    return from(getDocs(searchPipe))
      .pipe(
        map(querySnapshot => {
            const dataList: EventInterface[] = [];
            querySnapshot.forEach(doc => {
                if (doc.exists()) {
                    const data = doc.data() as DocumentData;
                    const event: EventInterface = {
                        uid: doc.id,
                        date_at: data['date_at'].toDate(),
                        local: data['local'],
                        type: data['type']
                    };
                    dataList.push(event);
                }
            });
            return dataList;
        })
      )
  }

  async getByUser(uid: string | any) {
    const userDocRef = doc(collection(this.firestore, 'users'), uid);
    const userDocData = await getDoc(userDocRef)

    if (userDocData.exists()) {
        const userData = userDocData.data()
        const eventsData: any[] = userData['events'] || []
        return eventsData.map(event => ({
            type: event.type,
            local: event.local,
            date_at: new Date(event.date_at.seconds * 1000)
        }))
    }
    return null
  }

  async addByUser(uid: string | any, event: EventInterface) {
    const userDocRef = doc(collection(this.firestore, 'users'), uid);
    const userDocData = await getDoc(userDocRef)
    let events = []
    if (userDocData.exists()) {
        const userData = userDocData.data()
        events = userData['events'] || []
    }
    events.push(event)

    await setDoc(userDocRef, { events }, { merge: true})
  }
}
