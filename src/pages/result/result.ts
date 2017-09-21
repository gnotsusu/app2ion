import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ResultDataSet, ResultService} from "../../providers/result-service";

/**
 * Generated class for the Result page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class Result {

  list:ResultDataSet[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public resultServ: ResultService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Result');
    this.resultServ.getReportList()
      .then((data:ResultDataSet[])=>{
      this.list = data;
    }).catch((err:ErrorEventHandler)=>{
      console.log(err);
    })
  }

  OpenResult(result:ResultDataSet):void{
    this.navCtrl.push(result.component);
  }

}
