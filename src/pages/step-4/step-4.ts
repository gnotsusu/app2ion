import { Step5 } from './../step-5/step-5';
import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { AddPhoto } from '../add-photo/add-photo';

/**
 * Generated class for the Step4 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-step-4',
  templateUrl: 'step-4.html',
})
export class Step4 {
  step5Page = Step5;

  public host = 'http://122.155.197.104/sysdamrongdham/Result_attach_file/getPhoto/';
  public keyid_id = 176;
  imageURL;
  base64Image:any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,public camera:Camera,public http: Http) {

    //this.showListImage();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Step4');

    //console.log(itemList);
  }
  /*
  goToAddPhoto(){
    this.navCtrl.push(AddPhoto);
  }*/
  showListImage() {

    this.icons = ['http://th.seaicons.com/wp-content/uploads/2016/07/PNG-Image-icon.png', 'http://th.seaicons.com/wp-content/uploads/2016/07/PNG-Image-icon.png'];

    /*this.items = [{title:'Item 1', note:'This is item #1',icon:'http://th.seaicons.com/wp-content/uploads/2016/07/PNG-Image-icon.png'},
                  {title:'Item 2', note:'This is item #2',icon:'http://th.seaicons.com/wp-content/uploads/2016/07/PNG-Image-icon.png'}
                  ];*/
    return new Promise((resolve, reject) => {
            this.http.get(this.host+this.keyid_id).map(res => res.json()).subscribe(
            data => {
                  this.items = data;
                  console.log(this.items);
            },
            err => {
                  reject(err);
            })
    })
    /*for(let i = 1; i <= this.icons.length; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[(i-1)]
      });
    }*/

  }

  openModal() {
    let myModal = this.modalCtrl.create(AddPhoto, {id: this.keyid_id});
    myModal.onDidDismiss(data => {
      //this.icons.push(data);
      console.log(data);
    });
    myModal.present();
  }


}
