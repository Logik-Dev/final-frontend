import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialDesignModule} from './material-design.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {GlobalErrorHandler} from './global-error-handler';
import { LoginPageComponent } from './login-page/login-page.component';
import {RequestInterceptorService} from './services/request-interceptor.service';
import {RouterModule, Routes} from '@angular/router';
import {ServerErrorInterceptor} from './server-error-interceptor';
import { ProfilPageComponent } from './profil-page/profil-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import {ExtendedModule, FlexModule, GridModule} from '@angular/flex-layout';
import { MenuComponent } from './menu/menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { RoomListPageComponent } from './room-list-page/room-list-page.component';
import {AuthGuardService} from './services/auth-guard.service';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RoomFormComponent } from './room-form/room-form.component';
import {MatSelectModule} from '@angular/material/select';
import { AddRoomPageComponent } from './add-room-page/add-room-page.component';
import { PhotoFormComponent } from './add-room-page/photo-form/photo-form.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'connexion', component: LoginPageComponent},
  {path: 'profil', component: ProfilPageComponent, canActivate: [AuthGuardService]},
  {path: 'salles', component: RoomListPageComponent},
  {path: 'enregistrement', component: RegisterPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProfilPageComponent,
    NavbarComponent,
    MenuComponent,
    HomePageComponent,
    RoomListPageComponent,
    RegisterPageComponent,
    RoomFormComponent,
    AddRoomPageComponent,
    PhotoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FlexModule,
    ExtendedModule,
    GridModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true},
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
