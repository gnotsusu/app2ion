import {Step4} from '../step-4/step-4';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IonicPage, NavController, NavParams, ModalController, LoadingController} from 'ionic-angular';
import {Location} from '../location/location';
import {SelectAddress} from "../../providers/select-address";
import {Login} from '../login/login';
import {Auth} from '../../providers/auth';
import {RequestOptions, Http, Headers, URLSearchParams} from '@angular/http';

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
  providers: [SelectAddress]
})
export class Step3 {
  step4Page = Step4;
  keyin_id: number;
  scene_date: any = '';
  place_scene: any = '';
  province_id: any = '';
  district_id: any = '';
  address_id: any ='';
  complaint_detail: string = '';
  latitude: any = '';
  longitude: any = '';
  provinces: any;
  districts: any;
  sub_districts: any;
  myForm: any;
  token: any;
  loading: any;
  complainForm: FormGroup;
  submitAttempt: boolean = false;
  public host = 'http://122.155.197.104/sysdamrongdham';
  public api_keyin = this.host + '/api/complaint/key_in';
  public complain_type = this.host + '/api/complaint/key_in';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public selectAddress: SelectAddress,
              public loadCtrl: LoadingController,
              public auth: Auth,
              public http: Http,
              public formBuilder: FormBuilder
              ) {
    this.keyin_id = this.navParams.get('param1');
    this.complainForm = formBuilder.group({
      place_scene: ['', Validators.required],
      province_id: ['', Validators.required],
      district_id: ['', Validators.required],
      address_id: ['', Validators.required],
      complaint_detail: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    this.authen();
    this.selectAddress.Province().then((data) => {
      this.provinces = data;
    });
  }

  authen() {

    this.showLoading();

    this.auth.isCheck().then((data) => {
      this.token = data;

      return data;
    }).then((token: string) => {
      return this.auth.isExpire(token);
    }).then((isExpire: Boolean) => {
      if (isExpire) {
        this.loading.dismiss();
        this.navCtrl.pop(Login);
      } else {
        this.loading.dismiss();
      }
    }).catch(err => {
      this.loading.dismiss();
      console.error(err.message);
    });
  }

  showLoading() {
    this.loading = this.loadCtrl.create({
      content: 'กำลังยื่นยันตัวตน...'
    });
    this.loading.present();
  }

  goToMap() {
    let modal = this.modalCtrl.create(Location, {
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
    this.selectAddress.District(this.province_id).then((data) => {
      this.districts = data;
      this.sub_districts = [];
    });
  }

  onChangeDistrict() {
    this.selectAddress.SubDistrict(this.district_id).then((data) => {
      this.sub_districts = data;
    });
  }

  saveData() {
    this.submitAttempt = true;
    let token_data = this.token;
    let keyin_id = this.keyin_id;
    let Complaint_data = {
      scene_date: this.scene_date,
      place_scene: this.place_scene,
      address_id: this.address_id,
      complaint_detail: this.complaint_detail,
      latitude: this.latitude,
      longitude: this.longitude,
    };
    console.log(Complaint_data);

    if (this.complainForm.valid) {
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token_data);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let body = new URLSearchParams();
        body.set('step', '3');
        body.set('keyin_id', this.keyin_id.toString());
        body.set('scene_date', this.scene_date);
        //body.set('scene_date', '27/07/2560');
        body.set('place_scene', this.place_scene);
        body.set('address_id', this.address_id);
        body.set('complaint_detail', this.complaint_detail);
        body.set('latitude', this.latitude);
        body.set('longitude', this.longitude);

        let options = new RequestOptions({headers: headers});
        this.http.put(this.api_keyin, body, options).map(res => res).subscribe(
          data => {
            console.log(data['_body']);
            this.navCtrl.push(Step4, {param1: data['_body']});
          },
          err => {
            console.log('Http Error');
            reject(err);
          }
        );

      });
    }

  }
}
