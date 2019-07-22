# ClientSideCaching

This project was initated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.0.
The projects shows how an HttpInterceptor can be used in Angular (Angular 8 is being uses here)
to support a client side cache. This allows for saving round trips to the server by caching data locally on the client.

# Solution build up
The src/app/core folder contains the CacheService and the DataService. The CacheService will cache responses from the API on the client looking at the route url and the caching is done in-memory. The DataService performs the API call to the backend. The backend is to be found in server.js file, which is a simple Express.js server. This backend contains a json file with our data of population data of towns in Norway. 
The HttpInterceptor is found in the file cache.interceptor.ts. The interceptor is added into the app module as shown below. 

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
<b>import { CacheInterceptor } from './core/cache.interceptor';</b>
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from  '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule
  ],
   <b>providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
  ]</b>,
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you
change the contents of certain files, primarily the .ts and .js files included, plus markup files such as .htm(l).
This sample also includes an Express.js backend running at port 3000. 
