import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user} from "@angular/fire/auth";
import { Observable, catchError, from, switchMap, throwError } from "rxjs";
import { signOut } from "firebase/auth";
import { Router } from "@angular/router";
import { UserTypeEnum } from "../core/_utils/UserType.enum";
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor( private firebaseAuth: Auth, private firestore: Firestore, private router: Router) {}

    register(email: string, username: string, password: string, userType: UserTypeEnum): Observable<void> {
        return from(createUserWithEmailAndPassword(this.firebaseAuth, email, password)).pipe(
            switchMap((response) => {
                return updateProfile(response.user, { displayName: username }).then(() => response.user);
            }),
            switchMap((user) => {
                const userDocRef = doc(collection(this.firestore, 'users'), user.uid);
                return setDoc(userDocRef, { userType });
            }),
            catchError((error) => {
                console.error('Error registering user:', error);
                return throwError(error);
            })
        );
    }
    
    login(email: string, password:string): Observable<void> {
        const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password  
        ).then(() => {})
        return from(promise);
      }

    logout(): Observable<void> {
        const promise = signOut(this.firebaseAuth);
        this.router.navigate(['/auth/login'], { queryParams: {} });
        return from(promise);
    }

    isAuthenticated(): boolean {
        return !!this.firebaseAuth.currentUser;
    }
}