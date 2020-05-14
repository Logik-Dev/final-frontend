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
import { HomePageComponent } from './home-page/home-page.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {AuthGuardService} from './services/auth-guard.service';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AddRoomPageComponent } from './profil-page/profil-room/add-room-page/add-room-page.component';
import { PhotoFormComponent } from './profil-page/profil-room/add-room-page/photo-form/photo-form.component';
import { RoomFormComponent } from './profil-page/profil-room/add-room-page/room-form/room-form.component';
import { AddressFormComponent } from './profil-page/profil-room/add-room-page/address-form/address-form.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { ProfilRoomComponent } from './profil-page/profil-room/profil-room.component';
import { ProfilInfoComponent } from './profil-page/profil-info/profil-info.component';
import { ProfilBookingComponent } from './profil-page/profil-booking/profil-booking.component';
import { PaymentComponent } from './payment/payment.component';
import { MapComponent } from './room/map/map.component';
import { RoomListPageComponent } from './room-list-page/room-list-page.component';
import { RoomComponent } from './room/room.component';
import { StickyBarComponent } from './sticky-bar/sticky-bar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { ProfilFavoriteComponent } from './profil-favorite/profil-favorite.component';
import { RoomCardComponent } from './room-card/room-card.component';
import { RoomListComponent } from './room-list/room-list.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'connexion', component: LoginPageComponent},
  {path: 'salles', component: RoomListPageComponent},
  {path: 'salles/:id', component: RoomComponent},
  {path: 'enregistrement', component: RegisterPageComponent},
  {path: 'profil', component: ProfilPageComponent, canActivate: [AuthGuardService], children: [
      {path: '', redirectTo: 'infos', pathMatch: 'full'},
      {path: 'infos', component: ProfilInfoComponent},
      {path: 'favoris', component: ProfilFavoriteComponent}
    ]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProfilPageComponent,
    NavbarComponent,
    HomePageComponent,
    RegisterPageComponent,
    AddRoomPageComponent,
    PhotoFormComponent,
    RoomFormComponent,
    AddressFormComponent,
    BookingFormComponent,
    ProfilRoomComponent,
    ProfilInfoComponent,
    ProfilBookingComponent,
    PaymentComponent,
    MapComponent,
    RoomListPageComponent,
    RoomComponent,
    StickyBarComponent,
    SidenavComponent,
    ProfilFavoriteComponent,
    RoomCardComponent,
    RoomListComponent
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
        CdkAccordionModule,
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
