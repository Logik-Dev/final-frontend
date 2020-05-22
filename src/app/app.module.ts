import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialDesignModule} from './material-design.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {GlobalErrorHandler} from './global-error-handler';
import { LoginPageComponent } from './login/login-page.component';
import {RequestInterceptorService} from './services/request-interceptor.service';
import {RouterModule, Routes} from '@angular/router';
import {ServerErrorInterceptor} from './server-error-interceptor';
import { ProfilPageComponent } from './profil/profil-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import {ExtendedModule, FlexModule, GridModule} from '@angular/flex-layout';
import { HomePageComponent } from './home/home-page.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {AuthGuardService} from './services/auth-guard.service';
import { RegisterPageComponent } from './register/register-page.component';
import { AddRoomPageComponent } from './profil/profil-room/add-room-page/add-room-page.component';
import { PhotoFormComponent } from './profil/profil-room/add-room-page/photo-form/photo-form.component';
import { RoomFormComponent } from './profil/profil-room/add-room-page/room-form/room-form.component';
import { AddressFormComponent } from './profil/profil-room/add-room-page/address-form/address-form.component';
import { BookingFormComponent } from './booking/booking-form.component';
import { ProfilRoomComponent } from './profil/profil-room/profil-room.component';
import { ProfilInfoComponent } from './profil/user-infos/profil-info.component';
import { ProfilBookingComponent } from './profil/profil-booking/profil-booking.component';
import { PaymentComponent } from './booking/payment/payment.component';
import { MapComponent } from './room-detail/map/map.component';
import { RoomListPageComponent } from './rooms/room-list-page.component';
import { RoomComponent } from './room-detail/room.component';
import { StickyBarComponent } from './room-detail/fixed-bar/sticky-bar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { ProfilFavoriteComponent } from './profil/user-favorites/profil-favorite.component';
import { RoomCardComponent } from './rooms/room-card/room-card.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { UserRoomsComponent } from './profil/user-rooms/user-rooms.component';
import { TestComponent } from './test/test.component';
import {MatHeaderRow, MatHeaderRowDef, MatRowDef, MatTableModule} from '@angular/material/table';
import { UserBookingsComponent } from './profil/user-bookings/user-bookings.component';


const routes: Routes = [
  {path: 'test', component: TestComponent},
  {path: '', component: HomePageComponent},
  {path: 'connexion', component: LoginPageComponent},
  {path: 'salles', component: RoomListPageComponent},
  {path: 'salles/:id', component: RoomComponent},
  {path: 'enregistrement', component: RegisterPageComponent},
  {path: 'ajouter', component: AddRoomPageComponent},
  {path: 'profil', component: ProfilPageComponent, canActivate: [AuthGuardService], children: [
      {path: '', redirectTo: 'infos', pathMatch: 'full'},
      {path: 'infos', component: ProfilInfoComponent},
      {path: 'favoris', component: ProfilFavoriteComponent},
      {path: 'salles', component: UserRoomsComponent},
      {path: 'réservations', component: UserBookingsComponent}
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
    RoomListComponent,
    UserRoomsComponent,
    TestComponent,
    UserBookingsComponent
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
        MatTableModule
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
