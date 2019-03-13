![](https://cdn-images-1.medium.com/focal/1600/480/79/47/1*_YS8s1rCbGqeexIHl6LzHg.jpeg)

# Overview

After messing around with Ionic Framework, I found out that there wasn't a good tutorial on how to add Facebook Login to your applications using Ionic. So here is a tutorial based on the main issues I had.

# Step by Step

### 1. Create an Ionic App

Start by creating a blank Ionic project. In this example, we are creating a project with the name "fblogin".
```
ionic start fblogin blank
```

### 2. Create the Facebook App

Adding Facebook Login requires the creation of a Facebook App under the Facebook Developers platform.
In order to do this, open the [Facebook Developers website](https://developers.facebook.com/), navigate to "My Apps" > "Add New App", which is located on the top right dropdown menu.

Now we need to add the platforms we want to use with Facebook SDK.. Since I'm working with Android platform, I'm only adding that one. Click on "Settings" > "Basic" and then, at the bottom of the page click on "+ Add Platform".

Next, we need to get the "Google Play Package Name" and the "Key Hashes".

To find out the package name, open the "config.xml" file located in the root of the newly created Ionic project. In this case, in the "fblogin" folder.

```xml
<widget id="io.ionic.starter" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
```

For the hash key, simply run this command in the terminal and type "android" when asked for the password:

```
keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
```

From this point forward, your Facebook App is up and running.

### 3. Integrate Facebook with Ionic

In order to get integration with Facebook, we need to install a few plugins.
Get the "App ID" from the [Facebook Developers website](https://developers.facebook.com/) and run the following command to install the Cordova plugin, replacing the variables **MY_APP_ID** and **MY_APP_NAME**. Make sure you are in your Ionic App directory:

```
ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="MY_APP_ID" --variable APP_NAME="MY_APP_NAME"
```

Then, install the Facebook Cordova plugin:

```
npm install --save @ionic-native/facebook
```

### 4. Code

For this tutorial, we are going to use the home page of the generated code.

First of all, open the **app.module.ts**. 
> ***.ts** files contains all the programming logic for the Ionic App.

Add the missing code, so the file looks like this:

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Facebook } from '@ionic-native/facebook/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    Facebook,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Next, we are going to create the Login logic. For that, we're going to edit the **home.page.ts** so it looks like the following:

```javascript
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
    this.fb.login(["public_profile","email"]).then( (res: FacebookLoginResponse) => { 
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
```

Lastly, edit the **home.page.html**. In this example, the code goes like this:

```html
<ion-header>
  <ion-toolbar>
    <ion-title>
      Test Facebook Login
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content padding>
  <div *ngIf="isUserLoggedIn" style="text-align:center">
    <br>
    <br>
    <br>
    <img src="{{userInfo.picture.data.url}}">
    <h3>{{userInfo.name}}</h3>
    <p>{{userInfo.email}}</p>
    <p>{{userInfo.birthday}}</p>
    <ion-button fill="outline" (click)="FBLogout()">Logout</ion-button>
  </div>
</ion-content>

<ion-footer *ngIf="!isUserLoggedIn">
  <ion-button expand="block" (click)="FBLogin()">Login with Facebook</ion-button>
</ion-footer>
```

# Compiling and testing

Run the app on your device. Make sure you are in your Ionic App directory.

```
ionic cordova run android
```

# Output

<img src="https://imgur.com/QsRabxx.png" width="150" height="400" />

