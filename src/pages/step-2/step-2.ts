import { Pages } from './../../app/app.component';
import { Step5 } from './../step-5/step-5';
import { Step4 } from './../step-4/step-4';
import { Step1 } from './../step-1/step-1';
import { Step3 } from '../step-3/step-3';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Location } from '../location/location';
import { SelectAddress } from "../../providers/select-address";
import { Login } from '../login/login';
import { Auth } from '../../providers/auth';
import { RequestOptions, Http, Headers, URLSearchParams } from '@angular/http';
import { DashboardService } from "../../providers/dashboard-service";

/**
 * Generated class for the Step3 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-step-2',
  templateUrl: 'step-2.html',
  providers: [SelectAddress, DashboardService]
})
export class Step2 {
  step3Page = Step3;
  complaints: object[] = [];
  keyin_id: number;
  scene_date: any = '';
  place_scene: any = '';
  province_id: any = '';
  district_id: any = '';
  address_id: any = '';
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
  public host = 'http://123.242.172.133/sysdamrongdham';
  public api_keyin = this.host + '/api/complaint/key_in';
  public complain_type = this.host + '/api/complaint/key_in';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public selectAddress: SelectAddress,
    public loadCtrl: LoadingController,
    public auth: Auth,
    public http: Http,
    public formBuilder: FormBuilder,
    public dashboardService: DashboardService
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
    }).then((data) => {
      if (this.keyin_id != undefined) {
        this.dashboardService.getComplainData(this.keyin_id).then((data) => {
          console.log('data');
          console.log(data);
          if (data['scene_date'] != '' && data['scene_date'] !== null && data['scene_date'] != '0000-00-00 00:00:00') {
            let sd_tmp = data['scene_date'].toString().split(' ');
            let sd_tmp_splt = sd_tmp[0].split('-');
            this.scene_date = new Date(sd_tmp_splt[0] + '-' + sd_tmp_splt[1] + '-' + sd_tmp_splt[2]).toISOString();
          } else {
            this.scene_date = new Date().toISOString();
          }
          this.place_scene = data['place_scene'];
          if (data['address_id'] !== null && data['address_id'] != '' && typeof data['address_id'] != undefined) {
            this.province_id = data['address_id'].substring(0, 2) + '000000';
            this.onChangeProvince();
          } else {
            this.province_id = '20000000';
            this.onChangeProvince();
          }

          if (data['address_id'] !== null && data['address_id'] != '' && typeof data['address_id'] != undefined) {
            this.district_id = data['address_id'].substring(0, 4) + '0000';
            this.onChangeDistrict();
          }

          if (data['address_id'] !== null && data['address_id'] != '' && typeof data['address_id'] != undefined) {
            this.address_id = data['address_id'].substring(0, 6) + '00';
          }

          this.complaint_detail = data['complaint_detail'];
          this.latitude = data['latitude'];
          this.longitude = data['longitude'];
          this.complaints.push(data);
        });
      } else {
        return this.complaints;
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

  goTo(page, id) {
    if (typeof id != undefined && id != '') {
      if (page == 1) {
        this.navCtrl.push(Step1, { param1: id });
      } else if (page == 3 && this.complaints[0]['step'] >= 3) {
        let page_data3: Array<any> = [{ page: Step3, params: { param1: id } }];
        this.navCtrl.push(Step3, { param1: id });
      } else if (page == 4 && this.complaints[0]['step'] >= 4) {
        this.navCtrl.push(Step4, { param1: id });
      } else if (page == 5 && this.complaints[0]['step'] >= 4) {
        this.navCtrl.push(Step5, { param1: id });
      }
    }
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
        let scene_date_ex: string[] = [];
        headers.append('Authorization', 'Bearer ' + token_data);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let body = new URLSearchParams();
        body.set('step', '2');
        body.set('keyin_id', this.keyin_id.toString());

        //body.set('scene_date', '27/07/2560');
        if (this.scene_date != "") {
          scene_date_ex = this.scene_date.split("-");
          console.log('scence date');
          console.log(scene_date_ex);
          //body.set('complain_date', this.scene_date[2] + "/" + this.scene_date[1] + "/" + (parseInt(this.scene_date[0]) + 543) + " 00:00:00");
          body.set('scene_date', scene_date_ex[2] + "/" + scene_date_ex[1] + "/" + (parseInt(scene_date_ex[0]) + 543) + " 00:00:00");
          console.log(scene_date_ex[2] + "/" + scene_date_ex[1] + "/" + (parseInt(scene_date_ex[0]) + 543) + " 00:00:00");
        }
        body.set('place_scene', this.place_scene);
        body.set('address_id', this.address_id);
        body.set('complaint_detail', this.complaint_detail);
        body.set('latitude', this.latitude);
        body.set('longitude', this.longitude);

        let options = new RequestOptions({ headers: headers });
        this.http.put(this.api_keyin, body, options).map(res => res).subscribe(
          data => {
            console.log(data['_body']);
            this.navCtrl.push(Step3, { param1: data['_body'] });
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
