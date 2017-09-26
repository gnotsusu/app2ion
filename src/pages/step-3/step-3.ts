import { Step5 } from './../step-5/step-5';
import { Step2 } from './../step-2/step-2';
import { Step1 } from './../step-1/step-1';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from './../login/login';
import { Auth } from './../../providers/auth';
import { SelectorComplaint, Wish } from './../../providers/selector-complaint';
import { Complaint } from './../complaint/complaint';
import { Step4 } from './../step-4/step-4';
import { RequestOptions, Http, Headers, URLSearchParams } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DashboardService } from "../../providers/dashboard-service";



export class ComplaintType {

  id: number;
  name: string;

  public constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

}

/**
 * Generated class for the Step2 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-step-3',
  templateUrl: 'step-3.html',
  providers: [DashboardService]
})
export class Step3 {
  step4Page = Step4;
  keyin_id: string;
  complaints: object[] = [];
  public complain_type_id_sel: any;
  public accused_type_id_sel: any;
  public channel_id_sel: any;
  public subject_id_sel: any;
  public wish_id_sel: any;
  public complain_type_id: any;
  public complain_type_id_1: any;
  public complain_type_id_2: any;
  public complain_type_1: any;
  public complain_type_2: any;
  public complain_name: string = '';
  public channel_id: any = '';
  public subject_id: string = '';
  public accused_type_id: any = '';
  public accused_type_id_1: any = '';
  public accused_type_id_2: any = '';
  public accused_type_1: any = '';
  public accused_type_2: any = '';
  public accused_name: string = '';
  public wish: any = '';
  public wish_detail: string = '';
  public host = 'http://123.242.172.133/sysdamrongdham';
  public api_keyin = this.host + '/api/complaint/key_in';
  public complain_type = this.host + '/api/complaint/key_in';
  public token: any;
  public selectOptions: any;
  loading: any;
  complainForm: FormGroup;
  submitAttempt: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public RequestOptions: RequestOptions,
    public http: Http,
    public SelectorComplaint: SelectorComplaint,
    public auth: Auth,
    public loadCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public dashboardService: DashboardService
  ) {
    this.keyin_id = this.navParams.get('param1');
    console.log('keyin_id = ' + this.keyin_id);
    this.complainForm = formBuilder.group({
      complain_type_id: ['', Validators.required],
      complain_name: ['', Validators.required],
      channel_id: ['', Validators.required],
      subject_id: ['', Validators.required],
      accused_type_id: ['', Validators.required]
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad Step3');
    this.authen();
    this.SelectorComplaint.getComplaintTypeListByParent('0').then((data) => {
      this.complain_type_id_sel = data;
    });

    this.SelectorComplaint.getAccusedTypeListByParent('0').then((data) => {
      this.accused_type_id_sel = data;
    });

    this.SelectorComplaint.getChannelList().then((data) => {
      this.channel_id_sel = data;
    });

    this.SelectorComplaint.getSubjectList().then((data) => {
      this.subject_id_sel = data;
    });

    this.SelectorComplaint.getWishList().then((data) => {
      console.log(data);
      this.wish_id_sel = data;
    });
    //  this.getComplainType().then((data:ComplaintType[]) => {
    //      this.complain_type_id = data;
    //   });

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
          console.log(data);
          this.SelectorComplaint.getComplaintTypeListById(data['complain_type_id']).then((cpl_data) => {
            console.log('cpl data');
            console.log(cpl_data);
            let cpl_data_tmp: Array<any> = [];
            for (let index_cpl in cpl_data) {
              if (index_cpl == '0') {
                this.complain_type_id = cpl_data[index_cpl]['id'];
                this.onChangeComplainType();
                console.log('change type');
              } else {
                cpl_data_tmp.push(cpl_data[index_cpl]['id']);
              }
            }
            return cpl_data_tmp;
          }).then((data) => {
            console.log('cpl data 2');
            console.log(data);
            let cpl_data_tmp: Array<any> = [];
            if (typeof data != undefined && data !== null && data.length != 0) {
              for (let index_cpl in data) {
                if (index_cpl == '0') {
                  this.complain_type_id_1 = data[index_cpl];
                  this.onChangeComplainType1();
                } else {
                  cpl_data_tmp.push(data[index_cpl]);
                }
              }
            } else {
              console.log('cpl2 false');
            }
            return cpl_data_tmp;
          }).then((data) => {
            let cpl_data_tmp: Array<any> = [];
            if (typeof data != undefined && data !== null && data.length != 0) {
              for (let index_cpl in data) {
                if (index_cpl == '0') {
                  this.complain_type_id_2 = data[index_cpl];
                }
              }
            }
          }).catch(err => {

          });
          // this.complain_type_id
          // this.complain_type_id_1
          // this.complain_type_id_2
          this.complain_name = data['complain_name'];
          this.channel_id = data['channel_id'];
          this.subject_id = data['subject_id'];
          this.SelectorComplaint.getAccusedTypeListById(data['accused_type_id']).then((acl_data) => {
            let alc_data_temp: Array<any> = [];
            for (let index_acl in acl_data) {
              if (index_acl == '0') {
                this.accused_type_id = acl_data[index_acl]['id'];
                this.onChangeAccusedType();
              } else {
                alc_data_temp.push(acl_data[index_acl]['id']);
              }
            }
            return alc_data_temp;
          }).then((data) => {
            this.onChangeAccusedType();
            let alc_data_temp: Array<any> = [];
            if (typeof data != undefined && data !== null && data.length != 0) {
              for (let index_acl in data) {
                if (index_acl == '0') {
                  this.accused_type_id_1 = data[index_acl];
                  this.onChangeAccusedType1();
                } else {
                  alc_data_temp.push(data[index_acl]);
                }
              }
            }
            return alc_data_temp;


          }).then((data) => {
            if (typeof data != undefined && data !== null && data.length != 0) {
              for (let index_acl in data) {
                if (index_acl == '0') {
                  this.accused_type_id_2 = data[index_acl];
                }
              }
            }
          }).catch(err => {

          });
          // this.accused_type_id
          // this.accused_type_1
          // this.accused_type_2
          this.accused_name = data['accused_name'];
          console.log(data['wish']);
          let wish_select = [];
          // Object.keys(data['wish']).forEach((key) => {
          //   wish_select.push(data['wish'][key]['']);
          // });
          for (let wish_data in data['wish']) {
            //console.log(data['wish'][wish_data]['wish_id']);
            wish_select.push(data['wish'][wish_data]['wish_id']);
          }
          //console.log('data length');
          //console.log(data['wish'].length);
          console.log(wish_select);
          this.wish = wish_select;
          this.wish_detail = data['wish_detail'];
          this.complaints.push(data);
          // Object.keys(data).forEach((key) => {
          //   this.complaints.push(data[key]);
          // });
        });
        // console.log('complain data');
        // console.log(this.complaints);
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

  getComplainType() {
    return new Promise((resolve, reject) => {
      this.http.get(this.complain_type).map(res => res.json()).subscribe((data) => {
        let complainType: ComplaintType[];
        for (let comp of data) {
          complainType.push(new ComplaintType(comp.id, comp.name));
        }

        resolve(complainType);
      })
    });
  }


  goTo(page, id) {
    if (typeof id != undefined && id != '') {
      if (page == 1) {
        this.navCtrl.push(Step1, { param1: id });
      } else if (page == 2) {
        this.navCtrl.push(Step2, { param1: id });
      } else if (page == 4 && this.complaints[0]['step'] >= 4) {
        this.navCtrl.push(Step4, { param1: id });
      } else if (page == 5 && this.complaints[0]['step'] >= 5) {
        this.navCtrl.push(Step5, { param1: id });
      }
    }
  }

  saveData() {
    this.submitAttempt = true;
    let token_data = this.token;
    let keyin_id = this.keyin_id;
    let complain_type_id;
    let accused_type_id;
    if (this.complain_type_id_2 != '' && this.complain_type_id_2 != undefined) {
      complain_type_id = this.complain_type_id_2;
    } else if (this.complain_type_id_1 != '' && this.complain_type_id_1 != undefined) {
      complain_type_id = this.complain_type_id_1;
    } else {
      complain_type_id = this.complain_type_id;
    }
    if (this.accused_type_id_2 != '' && this.accused_type_id_2 != undefined) {
      accused_type_id = this.accused_type_id_2;
    } else if (this.accused_type_id_1 != '' && this.accused_type_id_1 != undefined) {
      accused_type_id = this.accused_type_id_1;
    } else {
      accused_type_id = this.accused_type_id;
    }


    let Complaint_data = {
      complain_type_id: complain_type_id,
      complain_name: this.complain_name,
      channel_id: this.channel_id,
      subject_id: this.subject_id,
      accused_type_id: accused_type_id,
      accused_name: this.accused_name,
      wish_detail: this.wish_detail
    }
    //console.log(this.wish);
    //console.log(Complaint_data);
    if (this.complainForm.valid) {
      return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token_data);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let body = new URLSearchParams();

        if (typeof this.wish != undefined) {
          for (var i = 0; i < this.wish.length; i++) {
            body.append('wish[]', this.wish[i]);
          }
          // body.set('wish', test);
          // console.log('wish data');
          // console.log('type = ' + typeof this.wish);
          // console.log(this.wish);
        }
        body.set('complain_type_id', Complaint_data.complain_type_id);
        body.set('complain_name', Complaint_data.complain_name);
        body.set('channel_id', Complaint_data.channel_id);
        body.set('subject_id', Complaint_data.subject_id);
        body.set('accused_type_id', Complaint_data.accused_type_id);
        body.set('accused_name', Complaint_data.accused_name);
        body.set('wish_detail', Complaint_data.wish_detail);
        body.set('step_now', '3');
        body.set('step', '3');
        body.set('keyin_id', keyin_id);
        // let body = "complain_type_id=" + Complaint_data.complain_type_id + "&complain_name=" + Complaint_data.complain_name + "&channel_id=" + Complaint_data.channel_id + "&subject_id=" + Complaint_data.subject_id + "&accused_type_id=" + Complaint_data.accused_type_id + "&accused_name=" + Complaint_data.accused_name + "&wish_detail=" + Complaint_data.wish_detail + "&step=2&keyin_id=" + keyin_id;
        let options = new RequestOptions({ headers: headers });

        this.http.put(this.api_keyin, body, options).map(res => res).subscribe(
          data => {
            console.log(data['_body']);
            this.navCtrl.push(Step4, { param1: data['_body'] });
          },
          err => {
            console.log(body);
            console.log('Http Error');
            reject(err);
          }
        );

      });
    }

  }

  onChangeComplainType() {
    console.log('on change type');
    console.log(this.complain_type_id);
    this.SelectorComplaint.getComplaintTypeListByParent(this.complain_type_id).then((data) => {
      console.log('on change data true');
      console.log(data);
      var link = document.getElementById('complain_type_1');
      console.log('link');
      console.log(link);
      link.style.display = 'block';
      var link2 = document.getElementById('complain_type_2');
      link2.style.display = 'none';
      console.log('link2');
      console.log(link2);
      this.complain_type_1 = data;
      this.complain_type_2 = [];
    }, function (err) {
      console.log('on change data false');
      var link = document.getElementById('complain_type_1');
      link.style.display = 'none';
      var link2 = document.getElementById('complain_type_2');
      link2.style.display = 'none';
    });
  }
  onChangeComplainType1() {
    this.SelectorComplaint.getComplaintTypeListByParent(this.complain_type_id_1).then((data) => {
      var link2 = document.getElementById('complain_type_2');
      link2.style.display = 'block';
      this.complain_type_2 = data;
    }, function (err) {
      var link2 = document.getElementById('complain_type_2');
      link2.style.display = 'none';
    });
  }

  onChangeAccusedType() {
    this.SelectorComplaint.getAccusedTypeListByParent(this.accused_type_id).then((data) => {
      var link = document.getElementById('accused_type_1');
      link.style.display = 'block';
      var link2 = document.getElementById('accused_type_2');
      link2.style.display = 'none';
      this.accused_type_1 = data;
      this.accused_type_2 = [];
    }, function (err) {
      var link = document.getElementById('accused_type_1');
      link.style.display = 'none';
      var link2 = document.getElementById('accused_type_2');
      link2.style.display = 'none';
    });
  }

  onChangeAccusedType1() {
    this.SelectorComplaint.getAccusedTypeListByParent(this.accused_type_id_1).then((data) => {
      var link2 = document.getElementById('accused_type_2');
      link2.style.display = 'block';
      this.accused_type_2 = data;
    }, function (err) {
      var link2 = document.getElementById('accused_type_2');
      link2.style.display = 'none';
    });
  }


}

