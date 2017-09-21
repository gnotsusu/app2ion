import { Step1 } from '../step-1/step-1';
//import { Complaint } from './complaint';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Location } from '../location/location';



import { Geolocation } from '@ionic-native/geolocation';
declare var google;
/**
 * Generated class for the Complaint page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-complaint',
  templateUrl: 'complaint.html',
})
export class Complaint {
  public host = 'http://123.242.172.133/sysdamrongdham';
  public auth = this.host + '/api/complaint/key_in';
  public token: string;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public varLat: string = '';
  public varLng: string = '';
  public complain_date: any = '';
  public id_card: any = '';
  public recipient: string = '';
  public phone_number: any = '';
  public complaint_detail: string = '';
  public latitude: any = '';
  public longitude: any = '';
  stepPage = Step1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Complaint');
  }

  goToMap() {
    this.navCtrl.push(Location);
  }


  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();
    }, (err) => {
      console.log(err);
    });

  }

  getLocation() {
    this.loadMap();
  }

  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });


    this.varLat = marker.position.lat();
    this.varLng = marker.position.lng();
    console.log('Current Latitude:', marker.position.lat(), ':', marker.position.lng());
    //console.log('Var Lat:',this.varLat);
    let content = "<b>ตำแหน่งคุณ</b>";
    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

    google.maps.event.addListener(marker, 'dragend', () => {
      infoWindow.open(this.map, marker);
      this.varLat = marker.position.lat();
      this.varLng = marker.position.lng();
    });

  }

  saveMap() {
    console.log('saveMap Latitude:', this.varLat, ',', this.varLng);
  }

  saveData() {
    console.log(this.id_card)
    let Complaint_data = {
      id_card: this.id_card,
      complain_date: this.complain_date,
      recipient: this.recipient,
      phone_number: this.phone_number,
      complaint_detail: this.complaint_detail,
      latitude: this.latitude,
      longitude: this.longitude
    }

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiIxIiwidXNlcm5hbWUiOiJhZG1pbmlzdHJhdG9yIiwicGVybWlzc2lvbiI6WyIyIiwiNCIsIjUiLCI2IiwiNyIsIjgiLCI5IiwiMTAiLCIxMSIsIjEyIiwiMTMiLCIxNCIsIjE1IiwiMTYiLCIxNyIsIjE4IiwiMTkiLCIyMCJdLCJpYXQiOjE1MDAwNDMzNjYsImV4cCI6MTUwMDEyOTg2Nn0.4q-7fM5PeZrljTMkp8eIbsM5YXA8LFOdCplCBUyMEsQ');
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let body = "id_card=" + Complaint_data.id_card + "&complain_date=" + Complaint_data.complain_date + "&recipient=" + Complaint_data.recipient + "&phone_number=" + Complaint_data.phone_number + "&complaint_detail=" + Complaint_data.complaint_detail + "&latitude=" + Complaint_data.latitude + "&longitude=" + Complaint_data.longitude;
      let options = new RequestOptions({ headers: headers });
      console.log('test' + body);

      this.http.post(this.auth, body, options).map(res => res.json()).subscribe(
        data => {
          console.log('Http Success');
        },
        err => {
          console.log('Http Error');
          reject(err);
        }
      );

    });

  }
}
