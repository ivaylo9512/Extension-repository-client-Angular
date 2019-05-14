import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { RequestsInterceptor } from './helpers/requests-interceptor'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      { 
        path: '**', 
        redirectTo: '' 
      },
    ],{onSameUrlNavigation : 'reload'})
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, useClass: RequestsInterceptor, multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }