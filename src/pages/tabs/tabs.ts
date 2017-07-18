import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Complaint } from '../complaint/complaint';
import { Location } from '../location/location';
import { Document } from '../document/document';


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

  tab1Root: any = Complaint;
  tab2Root: any = Location;
  tab3Root: any = Document;

  constructor(public navCtrl: NavController) {}

}
