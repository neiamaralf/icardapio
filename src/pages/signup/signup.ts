import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,ModalController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public passtype:string="password";
  account: { key: string,name: string, email: string, password: string, passwordconfirmation: string } = {
    key: 'adduser',
    name: '',
    email: '',
    password: '',
    passwordconfirmation:''
  };

   private signupErrorString: string;
   public SHOW: string;
   public HIDE: string;

  constructor(public navCtrl: NavController,public user: User,public toastCtrl: ToastController,public translateService: TranslateService,
    public modalCtrl:ModalController) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    });
    this.translateService.get('SHOW').subscribe((value) => {
      this.SHOW = value;
    })
    this.translateService.get('HIDE').subscribe((value) => {
      this.HIDE = value;
    })
  }

  showpassword(){
    if(this.passtype=="password")
     this.passtype="text";    
    else
     this.passtype="password";    

  }

  static  modalctrl:any=null;
  static showsignup(modalCtrl){
    if(SignupPage.modalctrl!=null)
     SignupPage.modalctrl.dismiss();
    SignupPage.modalctrl = modalCtrl.create(SignupPage,{respage:this},{enableBackdropDismiss:false});
    SignupPage.modalctrl.present();
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      SignupPage.showsignup(this.modalCtrl);
    });
  }
}
