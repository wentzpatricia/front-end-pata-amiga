import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { UserInterface } from '../../auth/register/_models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) {}

  getUserData(uid: string): Observable<UserInterface | null> {
    const userDocRef = doc(this.firestore, 'users', uid);
    return from(getDoc(userDocRef)).pipe(
      map(doc => {
        if (doc.exists()) {
          const data = doc.data() as UserInterface;
          return data;
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