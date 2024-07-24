import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { environment } from '../environment/environment';

const firebaseConfig = {
  apiKey: environment.API_KEY,
  authDomain: environment.AUTH_DOMAIN,
  projectId: environment.PROJECT_ID,
  storageBucket: environment.STORAGE_BUCKET,
  messagingSenderId: environment.MESSAGING_SENDER_ID,
  appId: environment.APP_ID
}

console.log(firebaseConfig)

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(BrowserModule), 
    importProvidersFrom(BrowserAnimationsModule), 
    provideHttpClient(), provideFirebaseApp(() => initializeApp(firebaseConfig)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
