import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation'

declare var google;

/**
 * Generated class for the Location page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class Location {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  varLat: string = '';
  varLng: string = '';
  oldLatitude:string;
  oldLongitude:string;

  //callback:any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public navParams: NavParams, public viewCtrl: ViewController) {
    this.oldLatitude = this.navParams.get("latitude");
    this.oldLongitude = this.navParams.get("longitude");
    //console.log(this.location);
  }


  ionViewDidLoad() {
    this.loadMap();
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
    //console.log('Current Latitude:', marker.position.lat(), ':', marker.position.lng());
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

  saveMap(event: any): void {
    this.viewCtrl.dismiss({
      latitude: this.varLat,
      longitude: this.varLng
    });
    //console.log('saveMap Latitude:',this.varLat,',',this.varLng);
  }

  goBack() {
    this.viewCtrl.dismiss({
      latitude: this.oldLatitude,
      longitude: this.oldLongitude
    });
  }
}
