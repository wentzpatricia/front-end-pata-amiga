import { Injectable, inject, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user} from "@angular/fire/auth";
import { Observable, from } from "rxjs";
import { UserInterface } from "./register/_models/user.interface";
import { signOut } from "firebase/auth";
import { LocalStorageUtils } from "../core/_utils/localstorage";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {
    firebaseAuth = inject(Auth)
    user$ = user(this.firebaseAuth);
    currentUserSig = signal<UserInterface | null | undefined>(undefined);

    constructor( private router: Router) {}

    register(email: string, username: string, password:string): Observable<void> {
        const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then( response => updateProfile(response.user, {displayName: username}));
        return from(promise);
    }

    login(email: string, password:string): Observable<void> {
        const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password  
        ).then(() => {})
        return from(promise);
    }

    logout(): Observable<void> {
        const promise = signOut(this.firebaseAuth);
        const localStorageUtils = new LocalStorageUtils();
        localStorageUtils.clearLoggedData('login');

        this.router.navigate(['/auth/login'], { queryParams: {} });
        return from(promise);
    }

    isAuthenticated(): boolean {
        return this.firebaseAuth.currentUser !== null;
    }

}