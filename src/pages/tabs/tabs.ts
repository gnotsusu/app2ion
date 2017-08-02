import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Document } from '../document/document';
import {HomePage} from "../home/home";
import {Report} from "../report/report";


/**
 * Generated class for the Tabs tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
@IonicPage()
export class Tabs {

  tab1Root: any = HomePage;
  tab2Root: any = Report;
  tab3Root: any = Document;

  constructor(public navCtrl: NavController) {}

}
