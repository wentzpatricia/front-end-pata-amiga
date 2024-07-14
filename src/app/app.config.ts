import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAGQ9IiMX9iNfEIpzBZSUpY8EcBbEc-SfM",
  authDomain: "patas-amigass.firebaseapp.com",
  projectId: "patas-amigass",
  storageBucket: "patas-amigass.appspot.com",
  messagingSenderId: "48281540392",
  appId: "1:48281540392:web:321fd35ed8566acf94221d"
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(BrowserModule), 
    importProvidersFrom(BrowserAnimationsModule), 
    // importProvidersFrom([
    //   provideFirebaseApp(()=> initializeApp(firebaseConfig)),
    //   provideAuth(()=> getAuth())
    // ]),
    provideHttpClient(), provideFirebaseApp(() => initializeApp(firebaseConfig)), provideAuth(() => getAuth())]
};
