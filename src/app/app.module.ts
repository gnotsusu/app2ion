import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Complaint } from  '../pages/complaint/complaint';
import { Document } from '../pages/document/document';
import { Location } from '../pages/location/location';
import { Tabs } from '../pages/tabs/tabs';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';

/*Provider*/
import { Auth } from '../providers/auth';
import {ChartsModule} from "ng2-charts";
import {Report} from "../pages/report/report";
import {Result} from "../pages/result/result";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    Complaint,
    Document,
    Location,
    Report,
    Result,
    Tabs
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    Complaint,
    Document,
    Location,
    Report,
    Result,
    Tabs
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Auth,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
