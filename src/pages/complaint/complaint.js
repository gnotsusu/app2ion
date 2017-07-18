var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Location } from '../location/location';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the Complaint page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Complaint = (function () {
    function Complaint(navCtrl, navParams, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.varLat = '';
        this.varLng = '';
    }
    Complaint.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Complaint');
    };
    Complaint.prototype.goToMap = function () {
        this.navCtrl.push(Location);
    };
    Complaint.prototype.loadMap = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            _this.addMarker();
        }, function (err) {
            console.log(err);
        });
    };
    Complaint.prototype.getLocation = function () {
        this.loadMap();
    };
    Complaint.prototype.addMarker = function () {
        var marker = new google.maps.Marker({
            map: this.map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        this.varLat = marker.position.lat();
        this.varLng = marker.position.lng();
        console.log('Current Latitude:', marker.position.lat(), ':', marker.position.lng());
        //console.log('Var Lat:',this.varLat);
        var content = "<b>ตำแหน่งคุณ</b>";
        this.addInfoWindow(marker, content);
    };
    Complaint.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
        google.maps.event.addListener(marker, 'dragend', function () {
            infoWindow.open(_this.map, marker);
            _this.varLat = marker.position.lat();
            _this.varLng = marker.position.lng();
        });
    };
    Complaint.prototype.saveMap = function () {
        console.log('saveMap Latitude:', this.varLat, ',', this.varLng);
    };
    return Complaint;
}());
__decorate([
    ViewChild('map'),
    __metadata("design:type", ElementRef)
], Complaint.prototype, "mapElement", void 0);
Complaint = __decorate([
    IonicPage(),
    Component({
        selector: 'page-complaint',
        templateUrl: 'complaint.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Geolocation])
], Complaint);
export { Complaint };
//# sourceMappingURL=complaint.js.map