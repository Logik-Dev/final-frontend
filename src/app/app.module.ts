import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialDesignModule} from './material-design.module';
import { SearchCityFormComponent } from './search-city-form/search-city-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginFormComponent} from './login-page/login-form/login-form.component';
import {GlobalErrorHandler} from './global-error-handler';
import { LoginPageComponent } from './login-page/login-page.component';
import {RequestInterceptorService} from './services/request-interceptor.service';
import {RouterModule} from '@angular/router';
import {ServerErrorInterceptor} from './server-error-interceptor';
import { ProfilPageComponent } from './profil-page/profil-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import {ExtendedModule, FlexModule, GridModule} from '@angular/flex-layout';
import { MenuComponent } from './menu/menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';


const routes: any[] = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'profil', component: ProfilPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SearchCityFormComponent,
    LoginFormComponent,
    LoginPageComponent,
    ProfilPageComponent,
    NavbarComponent,
    MenuComponent,
    HomePageComponent
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
    GridModule
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
