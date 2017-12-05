import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,ModalController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {  
  account: {key: string,  email: string, password: string } = {
    key:'login',
    email: '',
    password: ''
  };
  static  modalctrl:any;
  static showlogin(modalCtrl){
    if(LoginPage.modalctrl!=null)
     LoginPage.modalctrl.dismiss();
    LoginPage.modalctrl = modalCtrl.create(LoginPage,{respage:this},{enableBackdropDismiss:false});
    LoginPage.modalctrl.present();
  }

  private loginErrorString: string;

  constructor(public navCtrl: NavController,public user: User, public toastCtrl: ToastController,
   public translateService: TranslateService,public modalCtrl:ModalController) {
     
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  doLogin() {
    this.user.login(LoginPage.modalctrl,this,this.account)
  }

  onDismiss(){
    LoginPage.showlogin(this.modalCtrl);
  }

  signup() {
    SignupPage.showsignup(this.modalCtrl);
  }
}


