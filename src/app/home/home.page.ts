import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isUserLoggedIn: any = false;
  userInfo: any = {};

  constructor(public navCtrl: NavController, public fb: Facebook) {

  }

  FBLogin() {
    this.fb.login(["public_profile","email"])
      .then( (res: FacebookLoginResponse) => {
        console.log("Logged into Facebook!", res);
        this.fb.api('me/?fields=id,email,name,birthday,picture.type(large)',["public_profile","email","user_birthday"])
          .then( apiRes => {
            this.userInfo = apiRes;
            this.isUserLoggedIn = true;
      }).catch( apiErr => console.log(apiErr));
    }).catch( loginErr => console.log(loginErr) )
  }

  FBLogout() {
    this.fb.logout().then( logoutRes => 
      this.isUserLoggedIn = false
    ).catch( logoutErr => 
      console.log(logoutErr));
  }
}
