import { Step4 } from './../step-4/step-4';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Location} from '../location/location';
/**
 * Generated class for the Step3 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-step-3',
  templateUrl: 'step-3.html',
})
export class Step3 {
  step4Page = Step4;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Step3');
  }

  goToMap() {
    this.navCtrl.push(Location);
  }

}
