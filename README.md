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
Get the "App ID" from the [Facebook Developers website](https://developers.facebook.com/) and run the following command to install the Cordova plugin, replacing the variables "MY_APP_ID" and "MY_APP_NAME":

```
ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="MY_APP_ID" --variable APP_NAME="MY_APP_NAME"
```
