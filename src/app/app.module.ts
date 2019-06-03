import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { RequestsInterceptor } from './helpers/requests-interceptor'
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ExtensionComponent } from './extension/extension.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DiscoverComponent } from './discover/discover.component';
import { PendingsComponent } from './pendings/pendings.component';
import { AdminComponent } from './admin/admin.component';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagsComponent } from './tags/tags.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    ExtensionComponent,
    DiscoverComponent,
    PendingsComponent,
    AdminComponent,
    CreateComponent,
    EditComponent,
    HeaderComponent,
    TagsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
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
        path: 'register',
        component: RegisterComponent
      },
      { 
        path: 'extension/:id', 
        component: ExtensionComponent
      },      
      { 
        path: 'profile/:id', 
        component: ProfileComponent
      },
      { 
        path: 'edit/:id', 
        component: EditComponent
      },
      { 
        path: 'tag/:tag', 
        component: TagsComponent
      },
      { 
        path: 'discover', 
        component: DiscoverComponent
      },
      { 
        path: 'create', 
        component: CreateComponent
      },
      { 
        path: 'pendings', 
        component: PendingsComponent
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
