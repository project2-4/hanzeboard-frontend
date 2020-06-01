import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SharedModule} from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthTokenGrabberInterceptor} from './shared/interceptors/authTokenGrabber.interceptor';
import {AuthTokenInjectInterceptor} from './shared/interceptors/authTokenInject.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    SharedModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenGrabberInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInjectInterceptor,
      multi: true
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
