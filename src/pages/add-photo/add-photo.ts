import { Component } from '@angular/core';
import { ViewController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import {Http, Headers, RequestOptions} from '@angular/http';
/**
 * Generated class for the AddPhotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-photo',
  templateUrl: 'add-photo.html',
})
export class AddPhoto {
  base64Image:any;
  public keyid_id = 0;
  public host = 'http://122.155.197.104/sysdamrongdham/Result_attach_file/addPhoto/';

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams,public http: Http,public camera:Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPhoto');
    this.keyid_id = this.navParams.get('id');
  }

  takePhoto(){
    this.camera.getPicture({
     sourceType: this.camera.PictureSourceType.CAMERA,
     destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
     }, (err) => {
      console.log(err);
    });
  }

  accessGallery(){
    this.camera.getPicture({
     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
     }, (err) => {
      console.log(err);
    });
  }

  savePhoto(){
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({headers: headers});
        //res.json()
        this.http.post(this.host, {id: this.keyid_id, data_image: this.base64Image}).map(res => res.text()).subscribe(
              data => {
                console.log('Http Success:'+data);
                if(data){
                    this.closeModal();
                }
              },
              err => {
                console.log('Http Error:'+err);
              }
        );
      });
  }

  closeModal() {
      this.viewCtrl.dismiss();
      //this.viewCtrl.dismiss();
  }

}
