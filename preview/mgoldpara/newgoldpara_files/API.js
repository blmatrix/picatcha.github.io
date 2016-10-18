var NATIVE = new function () {

    this.apiCall = function(type, method, headers, parameters, callback){

        this.apiInfo = {
            type: type,
            apiName: method,
            headers: headers,
            parameters: parameters,
            jsCallbackFunction: callback
        };
        if ( getDeviceVersion() == "iOS8" || getDeviceVersion() == "iOS9" ) {
            window.webkit.messageHandlers.restApi.postMessage(this.apiInfo);
        } else if( getDeviceVersion() == "iOS7"){
            this.callNativeAction("restApi", this.apiInfo);
        } else if (checkAndroidDevice() == true){
            android.navigateTo(reqUrl);
        } else{
            return false;
        };

    };

    this.navigateTo = function(type, url, title, setLogo){
        this.navigateInfo = {
            type: type,
            url: url,
            title: title,
            showsLogo: setLogo
        }

        if ( getDeviceVersion() == "iOS8" || getDeviceVersion() == "iOS9" ) {
            window.webkit.messageHandlers.navigateTo.postMessage(this.navigateInfo);
        } else if( getDeviceVersion() == "iOS7"){
            this.callNativeAction("navigateTo", this.navigateInfo);
        } else if (checkAndroidDevice() == true){
            android.navigateTo(url);
        } else{
            return false;
        };
    }

    this.setScrollbarState = function(arg){
        this.state = {
            status: arg
        };

        if ( getDeviceVersion() == "iOS8" || getDeviceVersion() == "iOS9" ) {
            window.webkit.messageHandlers.scrollState.postMessage(this.state);
        } else if( getDeviceVersion() == "iOS7"){
            this.callNativeAction("scrollState", this.state);
        } else{
            return false;
        };

    }

    this.refreshStarted = function(){
       if ( getDeviceVersion() == "iOS8" || getDeviceVersion() == "iOS9" ) {
          window.webkit.messageHandlers.refreshStarted.postMessage("");
       } else if( getDeviceVersion() == "iOS7"){
           this.callNativeAction("refreshStarted", "");
       } else{
           return false;
       };
   };

    this.refreshEnded = function(){

        if ( getDeviceVersion() == "iOS8" || getDeviceVersion() == "iOS9" ) {
          window.webkit.messageHandlers.refreshEnded.postMessage("");
       } else if( getDeviceVersion() == "iOS7"){
           this.callNativeAction("refreshEnded", "");
       } else{
           return false;
       };
    };

    this.callNativeAction = function(actionName, actionParameters) {
        var action = {
            actionName: actionName,
            actionParameters: actionParameters
        };
        nativeAction(action);
    }


}
function callback(response) {
  console.log(response);
}
