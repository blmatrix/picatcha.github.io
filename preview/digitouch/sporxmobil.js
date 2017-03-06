var pathArray = window.location.pathname.split('/');


var _AdsNativeOpts = {
  adUnits: [
  {
    apiKey: "DAXN8Yuk0sWp3-jfs0JaT_U79o5FE-Y7JajR2m4o", 
    numAds: 1,
    callback: function(status, adData) { 
      debugger; 
      if (adData && adData.actionTrackingUrls && adData.actionTrackingUrls.widgetloaded) { 
        var pxl = document.createElement('img'); 
        pxl.src = adData.actionTrackingUrls.widgetloaded[0]; 
        pxl.width = pxl.height = 0; 
        document.body.appendChild(pxl);
      }
    }
  },
  {
    apiKey: "kxvenXOjUlPJibewha5OHL28nYHa2y-RXi0yP3NH", numAds: 4, 
    callback: function(status, adData) { 
      debugger; 
      if (adData && adData.actionTrackingUrls && adData.actionTrackingUrls.widgetloaded) { 
        var pxl = document.createElement('img'); 
        pxl.src = adData.actionTrackingUrls.widgetloaded[0]; 
        pxl.width = pxl.height = 0; 
        document.body.appendChild(pxl);
      }
    }
  }
  ], autoPosition: true
};


var scriptElem = document.createElement("SCRIPT");
scriptElem.type = "text/javascript";
scriptElem.src = "//static.adsnative.com/static/js/render.v1.js";
document.body.appendChild(scriptElem);
