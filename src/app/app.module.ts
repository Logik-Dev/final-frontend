import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialDesignModule} from './material-design.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {GlobalErrorHandler} from './global-error-handler';
import {LoginPageComponent} from './login/login.component';
import {RequestInterceptorService} from '../services/request-interceptor.service';
import {RouterModule, Routes} from '@angular/router';
import {ServerErrorInterceptor} from './server-error-interceptor';
import {ProfilPageComponent} from './profil/profil-page.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ExtendedModule, FlexModule, GridModule} from '@angular/flex-layout';
import {HomePageComponent} from './home/home-page.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {AuthGuardService} from '../services/auth-guard.service';
import {RegisterComponent} from './register/register.component';
import {AddRoomComponent} from './add-room/add-room.component';
import {PhotoFormComponent} from './add-room/photos/photo-form.component';

import {AddressFormComponent} from './add-room/address/address-form.component';
import {BookingFormComponent} from './room/booking/booking-form.component';

import {ProfilInfoComponent} from './profil/user-infos/profil-info.component';

import {PaymentComponent} from './room/booking/payment/payment.component';
import {MapComponent} from './room/map/map.component';

import {RoomComponent} from './room/room.component';
import {StickyBarComponent} from './room/fixed-bar/sticky-bar.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ProfilFavoriteComponent} from './profil/user-favorites/profil-favorite.component';

import {UserRoomsComponent} from './profil/user-rooms/user-rooms.component';
import {TestComponent} from './test/test.component';
import {MatTableModule} from '@angular/material/table';
import {UserBookingsComponent} from './profil/user-bookings/user-bookings.component';
import {CommentDialogComponent} from './profil/user-bookings/comment-dialog/comment-dialog.component';
import {RoomInfosFormComponent} from './add-room/infos/room-infos-form.component';
import {PriceDialogComponent} from './add-room/infos/price-dialog/price-dialog.component';
import {EquipmentDialogComponent} from './add-room/infos/equipment-dialog/equipment-dialog.component';
import {EventTypeDialogComponent} from './add-room/infos/event-type-dialog/event-type-dialog.component';
import {DaysDialogComponent} from './add-room/infos/days-dialog/days-dialog.component';
import {RoomListPageComponent} from './rooms/room-list-page.component';
import {RoomCardComponent} from './rooms/room-card/room-card.component';
import {RoomListComponent} from './rooms/room-list/room-list.component';


const routes: Routes = [
  {path: 'test', component: TestComponent},
  {path: '', component: HomePageComponent},
  {path: 'connexion', component: LoginPageComponent},
  {path: 'salles', component: RoomListPageComponent},
  {path: 'salles/:id', component: RoomComponent},
  {path: 'enregistrement', component: RegisterComponent},
  {path: 'ajouter', component: AddRoomComponent},
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
    RegisterComponent,
    AddRoomComponent,
    PhotoFormComponent,
    AddressFormComponent,
    BookingFormComponent,
    ProfilInfoComponent,
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
    UserBookingsComponent,
    CommentDialogComponent,
    RoomInfosFormComponent,
    PriceDialogComponent,
    EquipmentDialogComponent,
    EventTypeDialogComponent,
    DaysDialogComponent
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
