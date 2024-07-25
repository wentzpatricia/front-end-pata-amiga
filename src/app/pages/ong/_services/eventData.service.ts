import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { EventInterface } from '../_models/event.interface';
import { addDoc, collection, deleteDoc, DocumentData, getDocs, query, QuerySnapshot, setDoc, where } from 'firebase/firestore';
import { UserInterface } from '../../../auth/register/_models/user.interface';

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
                    const event: EventInterface = {
                        uid: data['uid'],
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

  nextEvents (userUid: string) : Observable<EventInterface[]> {
    const eventsRef = collection(this.firestore, "events")
    const searchPipe = query(eventsRef,
      where('user', '==', userUid),
      where('date_at', '>=', new Date())
    );

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
                type: data['type'],
                volunteers: data['volunteers'] 
              };
              dataList.push(event);
            }
          });
        return dataList;
      })
    )
  }

  // busca apenas eventos que o usuário NÃO tenha se voluntariado
  available (emailUser : string | any) : Observable<EventInterface[]> {
    const eventsRef = collection(this.firestore, "events")

    const searchPipe = query(eventsRef, 
      where('date_at', '>', new Date()),
    );

    return from(getDocs(searchPipe))
      .pipe(
        map(querySnapshot => {
            const dataList: EventInterface[] = [];
            querySnapshot.forEach(doc => {
                if (doc.exists()) {
                    const data = doc.data() as DocumentData;
                    let userJaSeInscreveu = false
                    if (data['volunteers'] !== undefined) {
                      for (let i = 0; i < data['volunteers'].length; i++) {
                        if (data['volunteers'][i].email === emailUser) {
                          userJaSeInscreveu = true
                        }
                      }
                    }

                    if (!userJaSeInscreveu) {
                      const event: EventInterface = {
                          uid: doc.id,
                          date_at: data['date_at'].toDate(),
                          local: data['local'],
                          type: data['type']
                      };
                      dataList.push(event);
                    }
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
            uid: event.uid,
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

  async removeByUser(uid: string | any, eventToCancel: EventInterface) {
    const userDocRef = doc(collection(this.firestore, 'users'), uid);
    const userDocData = await getDoc(userDocRef)
    let events : EventInterface[] = []
    if (userDocData.exists()) {
      const userData = userDocData.data()
      userData['events'].forEach((event: EventInterface) => {
        if (event.uid !== eventToCancel.uid) {
          events.push(event)
        }
      })
    }

    await setDoc(userDocRef, { events }, { merge: true})
  }

  async addUserOnEvent(uid: string | any, user: UserInterface) {
    const eventDocRef = doc(collection(this.firestore, 'events'), uid);
    const eventDocData = await getDoc(eventDocRef)
    let volunteers = []
    if (eventDocData.exists()) {
        const eventData = eventDocData.data()
        volunteers = eventData['volunteers'] || []
    }
    volunteers.push(user)

    await setDoc(eventDocRef, { volunteers }, { merge: true})
  }

  async removeUserOnEvent(uid: string | any, email: string | any) {
    const eventDocRef = doc(collection(this.firestore, 'events'), uid);
    const eventDocData = await getDoc(eventDocRef)
    let users : UserInterface[] = []

    if (eventDocData.exists()) {
      const eventData = eventDocData.data()
      eventData['users'].forEach((user: UserInterface) => {
        if (email !== user.email) {
          users.push(user)
        }
      })
    }

    await setDoc(eventDocRef, { users }, { merge: true})
  }
}
