import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialDesignModule} from './material-design.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {GlobalErrorHandler} from '../utils/global-error-handler';
import {LoginPageComponent} from './login/login.component';
import {RequestInterceptorService} from '../services/request-interceptor.service';
import {RouterModule, Routes} from '@angular/router';
import {ServerErrorInterceptor} from '../utils/server-error-interceptor';
import {ProfilComponent} from './profil/profil.component';
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
import {BookingFormComponent} from './room-detail/booking/booking-form.component';

import {UserInfosComponent} from './profil/user-infos/user-infos.component';

import {PaymentComponent} from './room-detail/booking/payment/payment.component';
import {MapComponent} from './room-detail/map/map.component';

import {RoomDetailComponent} from './room-detail/room-detail.component';
import {StickyBarComponent} from './room-detail/fixed-bar/sticky-bar.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {UserFavoritesComponent} from './profil/user-favorites/user-favorites.component';

import {UserRoomsComponent} from './profil/user-rooms/user-rooms.component';
import {MatTableModule} from '@angular/material/table';
import {UserBookingsComponent} from './profil/user-bookings/user-bookings.component';
import {CommentDialogComponent} from './profil/user-bookings/comment-dialog/comment-dialog.component';
import {RoomInfosFormComponent} from './add-room/infos/room-infos-form.component';
import {PriceDialogComponent} from './add-room/infos/price-dialog/price-dialog.component';
import {EquipmentDialogComponent} from './add-room/infos/equipment-dialog/equipment-dialog.component';
import {EventTypeDialogComponent} from './add-room/infos/event-type-dialog/event-type-dialog.component';
import {DaysDialogComponent} from './add-room/infos/days-dialog/days-dialog.component';
import {RoomListPageComponent} from './room-list/room-list-page.component';
import {RoomCardComponent} from './room-list/room-card/room-card.component';
import {RoomListComponent} from './room-list/room-list/room-list.component';
import {UnitPricePipe} from '../pipes/unit-price.pipe';
import {TvaPipe} from '../pipes/tva.pipe';
import {CommissionPipe} from '../pipes/commission.pipe';
import {TotalPipe} from '../pipes/total.pipe';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'connexion', component: LoginPageComponent},
  {path: 'salles', component: RoomListPageComponent},
  {path: 'salles/:id', component: RoomDetailComponent},
  {path: 'enregistrement', component: RegisterComponent},
  {path: 'ajouter', component: AddRoomComponent},
  {path: 'profil', component: ProfilComponent, canActivate: [AuthGuardService], children: [
      {path: '', redirectTo: 'infos', pathMatch: 'full'},
      {path: 'infos', component: UserInfosComponent},
      {path: 'favoris', component: UserFavoritesComponent},
      {path: 'salles', component: UserRoomsComponent},
      {path: 'réservations', component: UserBookingsComponent}
    ]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProfilComponent,
    NavbarComponent,
    HomePageComponent,
    RegisterComponent,
    AddRoomComponent,
    PhotoFormComponent,
    AddressFormComponent,
    BookingFormComponent,
    UserInfosComponent,
    PaymentComponent,
    MapComponent,
    RoomListPageComponent,
    RoomDetailComponent,
    StickyBarComponent,
    SidenavComponent,
    UserFavoritesComponent,
    RoomCardComponent,
    RoomListComponent,
    UserRoomsComponent,
    UserBookingsComponent,
    CommentDialogComponent,
    RoomInfosFormComponent,
    PriceDialogComponent,
    EquipmentDialogComponent,
    EventTypeDialogComponent,
    DaysDialogComponent,
    UnitPricePipe,
    TvaPipe,
    CommissionPipe,
    TotalPipe
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
