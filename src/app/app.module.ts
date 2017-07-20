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
import {DonusCharts} from "../pages/donus-charts/donus-charts";
import {ReportService} from "../providers/report-service";
import {ResultService} from "../providers/result-service";
import {ResultState} from "../pages/result-state/result-state";

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
    ResultState,
    DonusCharts,
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
    DonusCharts,
    Result,
    ResultState,
    Tabs
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Auth,
    Geolocation,
    ReportService,
    ResultService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
