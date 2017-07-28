import { Step4 } from './../step-4/step-4';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {Location} from '../location/location';
import {SelectAddress} from "../../providers/select-address";
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
  providers:[SelectAddress]
})
export class Step3 {
  step4Page = Step4;
  scene_date:any;
  place_scene:any;
  province_id:any;
  district_id:any;
  address_id:any;
  complaint_detail:any;
  latitude:any;
  longitude :any;
  provinces:any;
  districts:any;
  sub_districts:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public selectAddress:SelectAddress
  ) {
    this.selectAddress.Province().then((data)=>{
      this.provinces = data;
    });

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad Step3');
    // console.log('latitude : '+this.latitude);
    // console.log('longitude : '+this.longitude);
  }

  goToMap() {
    let modal = this.modalCtrl.create(Location,{
      latitude: this.latitude,
      longitude: this.longitude
    });
    modal.onDidDismiss(data => {
      this.latitude = data.latitude;
      this.longitude = data.longitude;
    });
    modal.present();
  }

  onChangeProvince() {
    this.selectAddress.District(this.province_id).then((data)=>{
      this.districts = data;
      this.sub_districts = [];
    });
  }

  onChangeDistrict() {
    this.selectAddress.SubDistrict(this.district_id).then((data)=>{
      this.sub_districts = data;
    });
  }

}
