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
import { Step1 } from '../pages/step-1/step-1';
import { Step2 } from '../pages/step-2/step-2';
import { Step3 } from '../pages/step-3/step-3';
import { Step4 } from '../pages/step-4/step-4';
import { Step5 } from '../pages/step-5/step-5';


/*Provider*/
import { Auth } from '../providers/auth';
import {ChartsModule} from "ng2-charts";
import {Report} from "../pages/report/report";
import {Result} from "../pages/result/result";
import {DonusCharts} from "../pages/donus-charts/donus-charts";
import {ReportService} from "../providers/report-service";
import {ResultService} from "../providers/result-service";
import {ResultState} from "../pages/result-state/result-state";
import {SelectAddress} from "../providers/select-address";

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
    Tabs,
    Step1,
    Step2,
    Step3,
    Step4,
    Step5


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
    Tabs,
    Step1,
    Step2,
    Step3,
    Step4,
    Step5
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Auth,
    Geolocation,
    ReportService,
    ResultService,
    SelectAddress,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
