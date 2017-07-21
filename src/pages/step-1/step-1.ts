import { Step2 } from './../step-2/step-2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the Step1 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-step-1',
  templateUrl: 'step-1.html',
})
export class Step1 {
  step2Page = Step2;
  public complain_date:any = '' ;
  public recipient:string = '';
  public doc_receive_date: any = '';
  public doc_receive_no:string = '' ;
  public doc_send_date: any = '';
  public doc_send_no:string = '' ;
  public user_complain_type_id:string = '';
 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Step1');
  }

}
