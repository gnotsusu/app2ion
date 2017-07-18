var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Complaint } from '../complaint/complaint';
import { Location } from '../location/location';
import { Document } from '../document/document';
/**
 * Generated class for the Tabs tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
var Tabs = (function () {
    function Tabs(navCtrl) {
        this.navCtrl = navCtrl;
        this.tab1Root = Complaint;
        this.tab2Root = Location;
        this.tab3Root = Document;
    }
    return Tabs;
}());
Tabs = __decorate([
    Component({
        selector: 'page-tabs',
        templateUrl: 'tabs.html'
    }),
    IonicPage(),
    __metadata("design:paramtypes", [NavController])
], Tabs);
export { Tabs };
//# sourceMappingURL=tabs.js.map