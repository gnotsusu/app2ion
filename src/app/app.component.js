var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
var Pages = (function () {
    function Pages(title, icon, component) {
        this.title = title;
        this.icon = icon;
        this.component = component;
    }
    return Pages;
}());
export { Pages };
import { Login } from '../pages/login/login';
import { HomePage } from "../pages/home/home";
import { Complaint } from "../pages/complaint/complaint";
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, menu) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.menu = menu;
        this.rootPage = Login;
        this.initializeApp();
        this.pages = [
            new Pages('หน้าหลัก', 'home', HomePage),
            new Pages('บันทึกเรื่องราวร้องทุกข์', 'paper-airplane', Complaint),
            new Pages('ผลการดำเนินงาน', 'email-unread', HomePage),
            new Pages('รายงาน', 'paper', HomePage),
            new Pages('ออกจากระบบ', 'lock', Login)
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform,
        StatusBar,
        SplashScreen,
        MenuController])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map
