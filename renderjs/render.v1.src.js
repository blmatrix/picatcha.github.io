/* ==========================================================
 * render.v1.js -- API wrapper for serving native ads.
 *
 * Copyright (c) 2013, Adsnative.
 * ========================================================== */

 //IE Quirks: Start ****************

if(typeof console === "undefined") {
    var console = {
        log: function() { },
        time: function() { },
        timeEnd: function() { }
    };
}

(function(str) {
    if (typeof(str.prototype.trim) === 'undefined') {
        str.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, '');
        }
    }
})(String);

if (!Object.prototype.hasOwnProperty) {
    Object.prototype.hasOwnProperty = function(prop) {
        var proto = this.__proto__ || this.constructor.prototype;
        return (prop in this) && (!(prop in proto) || proto[prop] !== this[prop]);
    };
}

if (typeof Object.getOwnPropertyNames !== "function") {
    Object.getOwnPropertyNames = function (obj) {
        var keys = [];
        if (typeof obj === "object" && obj !== null) {
            for (var x in obj) {
                if (obj.hasOwnProperty(x)) {
                    keys.push(x);
                }
            }
        }
        return keys;
    }
}

String.prototype.positiveIntegerHash = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

//IE Quirks: End ****************


/*
    AdsNative version of subset of JQuery utility functions
*/

(function() {
var an_jQuery = function( selector, context ) {
    },
    _an_jQuery = window.an_jQuery,
    _$an = window.$an,

    rootan_jQuery,
    readyBound = false,
    readyList = [],
    DOMContentLoaded;

an_jQuery.fn = {
    ready: function( fn ) {
        an_jQuery.bindReady();
        if ( an_jQuery.isReady ) {
            fn.call( document, an_jQuery );
        } else if ( readyList ) {
            readyList.push( fn );
        }
        return this;
    }
};
an_jQuery.isReady = false;
an_jQuery.ready = function() {
        if ( !an_jQuery.isReady ) {
            if ( !document.body ) {
                return setTimeout( an_jQuery.ready, 13 );
            }
            an_jQuery.isReady = true;
            if ( readyList ) {
                var fn, i = 0;
                while ( (fn = readyList[ i++ ]) ) {
                    fn.call( document, an_jQuery );
                }
                readyList = null;
            }
            if ( an_jQuery.fn.triggerHandler ) {
                an_jQuery( document ).triggerHandler( "ready" );
            }
        }
    };
an_jQuery.bindReady = function() {
        if ( readyBound ) {
            return;
        }
        readyBound = true;

        if ( document.readyState === "complete" ) {
            return an_jQuery.ready();
        }
        if ( document.addEventListener ) {
            document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
            window.addEventListener( "load", an_jQuery.ready, false );
        } else if ( document.attachEvent ) {

            document.attachEvent("onreadystatechange", DOMContentLoaded);
            window.attachEvent( "onload", an_jQuery.ready );

            var toplevel = false;
            try {
                toplevel = window.frameElement == null;
            } catch(e) {}
            if ( document.documentElement.doScroll && toplevel ) {
                doScrollCheck();
            }
        }
    };
rootan_jQuery = an_jQuery(document);
if ( document.addEventListener ) {
    DOMContentLoaded = function() {
        document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
        an_jQuery.ready();
    };
} else if ( document.attachEvent ) {
    DOMContentLoaded = function() {
        if ( document.readyState === "complete" ) {
            document.detachEvent( "onreadystatechange", DOMContentLoaded );
            an_jQuery.ready();
        }
    };
}
function doScrollCheck() {
    if ( an_jQuery.isReady ) {
        return;
    }
    try {
        document.documentElement.doScroll("left");
    } catch(e) {
        setTimeout( doScrollCheck, 1 );
        return;
    }
    an_jQuery.ready();
}
window.an_jQuery = window.$an = an_jQuery;
})();

(function(){

/*(function () {
    "use strict";

    function getStackTraceString() {
      var callstack_string = '';
      var isCallstackPopulated = false;
      try {
        i.dont.exist+=0; //doesn't exist- that's the point
      } catch(e) {
        if (e.stack) { //Firefox
            callstack_string = e.stack;
            isCallstackPopulated = true;
        }
        else if (window.opera && e.message) { //Opera
            callstack_string = e.message;
            isCallstackPopulated = true;
        }
      }
      if (!isCallstackPopulated) { //IE and Safari
        callstack_string = ''
      }
      return callstack_string;
    }

    var doc = document,
    nativeDocWrite = document.write;
    doc.write = function () {
        var stackTraceString = getStackTraceString();
        var index = -1;
        if(typeof window.an_doc_write_scripts !== "undefined" && window.an_doc_write_scripts){
            for(var i=0;i<window.an_doc_write_scripts.length;i++){
                if(stackTraceString.indexOf(window.an_doc_write_scripts[i]) > -1){
                    index=i;
                    break;
                }
            }
        }
        if(index > -1){
            var markup = Array.prototype.slice.call(arguments).join("");
            utils.dropTags(window.an_doc_write_referenceElement[index], markup);
        } else {
            nativeDocWrite.apply(doc, arguments);
        }
    };
}());*/


/*
    Utility functions
*/

var utils = new function() {
    'use strict';

    var hostname = '',
    urlParams = null,
    isFriendlyIframe = null,
    win = null,
    frameDoc = null;

    this.isFriendlyIframe = function(){
        if(isFriendlyIframe)
            return isFriendlyIframe
        var oFrame = window, 
            exception = false;

        try {
            if(window.top != window.self){
                //Check if document property is accessible.
                if (oFrame.top.document) {
                    oFrame = oFrame.top;
                }
                else {
                    //If document was not set, break the loop and set exception flag.
                    exception = true;
                }
            }
        } catch (e) {
            exception = true;
        }

        if(exception) {
            isFriendlyIframe = false;
        } else {
            isFriendlyIframe = true;
        }
        return isFriendlyIframe;
    };

    this.activeWindow = function(){
        if(win)
            return win;
        win = window;
        try {
            if(window.top != window.self){
                win = window.top;
                //Access the document just to force check the access
                var doc = win.document;
                if(!doc){
                    win = window;
                }
            } else {
                win = window;
            }
        } catch(err){
            win = window;
        }
        return win;
    };

    this.activeWindowDocument = function(){
        var win = this.activeWindow();
        var doc;
        try {
            doc = win.document;
            if(!doc){
                doc = window.document;
            }
        } catch(err){
            doc = window.document;
        }
        return doc;
    }

    this.isPreviewGenerator = function(){
        if(this.isPreview()){
            document.domain = 'adsnative.com';
            try {
                if(window.top.document && window.top != window.self && window.top.document.location.href.indexOf("adsnative.com/preview/") != -1)
                    return true;
                else
                    return false;
            } catch(err){
                return false;
            }
        }
        return false;
    };

    this.isPreview = function(){
        var hostname = this.getPageHostName();
        if(hostname.indexOf("adsnative.com") != -1)
            return true;
        return false;
    };

    this.getLocationHostname = function(href) {
        var l = document.createElement("a");
        l.href = href;
        return l.hostname;
    };

    this.getPageHostName = function(url){
        if(arguments.length > 0 && url !== 'undefined' && url)
            return this.getLocationHostname(url)
        if(hostname)
            return hostname;
        hostname = this.activeWindowDocument().location.host;
        return hostname;
    };

    this.isPreviewMode = function(){
        var urlParams = this.getURLParams();
        if(this.isPreview() || urlParams.hasOwnProperty('adsnative_preview'))
            return true;
        return false;
    };

    this.isProfilingMode = function(){
        var urlParams = this.getURLParams();
        if(this.isPreviewMode() && urlParams.hasOwnProperty('profile') && urlParams['profile'])
            return true;
        return false;
    };

    this.urlPrefix = function(){
        if(location.protocol == 'https:')
            return 'https:';
        else
            return 'http:';
    }

    this.getPreviewModeHost = function(){
        if(this.isPreview()){
            var hostname = this.getPageHostName();
            if(hostname == 'dev-www.adsnative.com')
                return 'http://dev-api.adsnative.com';
            if(hostname == 'stage.adsnative.com')
                return this.urlPrefix() + '//stage-api.adsnative.com';
            if(hostname == 'demo2.adsnative.com')
                return this.urlPrefix() + '//demo-api2.adsnative.com';
            if(hostname == 'demo.adsnative.com')
                return this.urlPrefix() + '//demo-api.adsnative.com';
            if(hostname == 'console.adsnative.com' || hostname == 'adsnative.com')
                return this.urlPrefix() + '//api.adsnative.com';
        } else {
            var urlParams = this.getURLParams();
            if(urlParams.hasOwnProperty('server')){
                if(urlParams['server'] == 'prod'){
                    return this.urlPrefix() + "//api.adsnative.com";
                }
                if(urlParams['server'] == 'stage'){
                    return this.urlPrefix() + "//stage-api.adsnative.com";
                }
                if(urlParams['server'] == 'demo'){
                    return this.urlPrefix() + "//demo-api.adsnative.com"
                }
                if(urlParams['server'] == 'local'){
                    return "http://dev-api.adsnative.com";
                }
            }
        }
        return this.urlPrefix() + "//api.adsnative.com";
    };

    this.getURLParams = function() {
        if(urlParams)
            return urlParams
        var match,
            pl     = /\+/g,
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query,
            ref = document.referrer;

        try {
            query = this.activeWindow().location.search.substring(1);
        } catch(err){
            query = window.location.search.substring(1);
        }

        if (!query && ref.indexOf('?') > 0) {
            query = ref.substring(ref.indexOf('?') + 1);
        }

        urlParams = {};
        while (match = search.exec(query))
           urlParams[decode(match[1])] = decode(match[2]);
        return urlParams;
    };

    this.encodeQueryData = function(data) {
       var ret = [];
       for (var d in data)
          ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
       return ret.join("&");
    };

    this.get_document_keywords = function(max_keywords){
        if(!arguments.length)
            var max_keywords = 100
        var keywords = '';
        var metas = document.getElementsByTagName('meta');
        if (metas) {
            for (var x=0,y=metas.length; x<y; x++) {
                if (metas[x].name.toLowerCase() == "keywords") {
                    keywords += metas[x].content;
                }
            }
        }
        var keywords_arr = [];
        var keywords_str = '';
        if(keywords != ''){
            keywords_str = '['
            keywords_arr = keywords.split(",");
            for(var i=0;i<keywords_arr.length && i<max_keywords;i++){
                keywords_str += '"' + keywords_arr[i].trim() + '"';
                if(i!=keywords_arr.length-1 && i!=max_keywords-1)
                    keywords_str += ', ';
            }
            keywords_str += ']';
        }
        return keywords_str
    }

    this.extend = function(a, b){
        for(var key in b) {
            if(b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    };

    this.isEmpty = function(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    };

    this.removeClickEvents = function(elem){
        var anchors = elem.getElementsByTagName("a");
        for (var i=0; i < anchors.length; i++) {
            if(anchors[i].className.indexOf("adsnative-share-button") === -1 && anchors[i].className.indexOf("adsnative-cta-button") === -1){
                anchors[i].onclick = function() { return(false); };
            }
        }
    };

    this.anyClickTags = function(elem){
        var anchors = elem.getElementsByTagName("a");
        var clickFlag = false;
        for (var i=0; i < anchors.length; i++) {
            if(anchors[i].className.search("adsnative") === -1 && anchors[i].getAttribute("href") != null){
                clickFlag = true;
                break;
            }
        }
        return clickFlag;
    };

    this.isScriptInBody = function(){
        var arrScripts = document.getElementsByTagName('script');
        var currScript = arrScripts[arrScripts.length - 1];
        for(var curElem = currScript; curElem; curElem=curElem.parentNode){
            if(curElem.tagName == 'BODY')
                return true;
            else if(curElem.tagName == 'HEAD')
                return false;
        }
        return false;
    };

    this.activeFrameDocument = function(){
        if(frameDoc)
            return frameDoc;
        frameDoc = window.document;
        try {
            if(this.getWindowSize('Width', window) <= 1 || this.getWindowSize('Height', window) <=1)
                frameDoc = this.activeWindowDocument();
        } catch(e){
            frameDoc = this.activeWindowDocument();
        }
        return frameDoc;
    }

    this.checkCSSPath = function(cssPath){
        var win_doc = this.activeFrameDocument();

        var response = {
            "status": false
        }

        var currentElement = win_doc;
        var nodes = cssPath.trim().split('>');
        var index = 0, position='before';
        for(var i=0;i<nodes.length;i++){
            var node = nodes[i].trim();
            var node_found = false;
            if(node[0] == '#'){
                var parts = node.split(':');
                currentElement = win_doc.getElementById(parts[0].slice(1));
                if(parts.length > 1){
                    position = parts[1];
                }
                if(!currentElement)
                    return false;
            } else {
                var parts = node.split(':');
                if(parts.length > 1){
                    var match = /eq\((\d+)\)/g.exec(parts[1].trim());
                    if(match && match.length > 1)
                        index = parseInt(match[1]);
                } else
                    return false;

                if(parts.length > 2){
                    position = parts[2];
                }
                parts = parts[0].split('.');
                var elementName=parts[0], matchClass=null, count=0, elems=currentElement.childNodes;
                if(parts.length > 1)
                    matchClass = parts[1];

                if(elementName)
                    elems = currentElement.getElementsByTagName(elementName);
                if (matchClass && 'getElementsByClassName' in document) {
                    elems = currentElement.getElementsByClassName(matchClass);
                }
                for(var j=0;j<elems.length;j++){
                    if (elems[j].nodeType != 1)
                        continue;
                    if(!matchClass || (' ' + elems[j].className + ' ').indexOf(' ' + matchClass + ' ') > -1){
                        if(count == index){
                            currentElement = elems[j];
                            node_found = true
                            break;
                        }
                        count++;
                    }
                }
                if(node_found == false)
                    return false;
            }
        }

        response.status = true;
        response.currentElement = currentElement
        response.position = position;
        return response;
    };

    this.dropTags = function(referenceElement, tagsHTML, callback, add_script_attribute){
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = tagsHTML;
        var tags = tempDiv.childNodes;
        for(var i=0,j=0;tags.length && j<tags.length;i++){
            var currentTag = tags[j];
            if(currentTag.tagName == 'IMG'){
                currentTag.style.cssText = 'margin:0;padding:0;height:1px;width:1px;border:none;float:left;display:none;';
                referenceElement.appendChild(currentTag);
            } else if(currentTag.tagName == 'SCRIPT'){
                renderScript(referenceElement, currentTag);
                j++;
            } else if(currentTag.tagName == 'IFRAME') {
                if(arguments.length > 2){
                    currentTag.onload = callback;
                }
                referenceElement.appendChild(currentTag);
            } else {
                referenceElement.appendChild(currentTag);
                //Make sure scripts in child elements get executed
                renderScripts(currentTag);
            }
        }

        function renderScripts(curTag){
            for(var k=0;k<curTag.childNodes.length;k++){
                if(curTag.childNodes[k].tagName == 'SCRIPT'){
                    var tempElem = curTag.childNodes[k];
                    curTag.removeChild(curTag.childNodes[k]);
                    renderScript(curTag, tempElem, callback);
                } else if(curTag.childNodes[k].childNodes.length) {
                    renderScripts(curTag.childNodes[k]);
                }
            }
        }

        function renderScript(refElem, currentTag){
            var done = false;
            var oScript= document.createElement("script");
            oScript.type = currentTag.type;
            if(currentTag.src){
                oScript.src = currentTag.src;
                if(typeof window.an_doc_write_scripts === "undefined"){
                    window.an_doc_write_scripts = [];
                    window.an_doc_write_referenceElement = [];
                }
                window.an_doc_write_scripts.push(oScript.src)
                window.an_doc_write_referenceElement.push(refElem)
            }
            oScript.async = "true";
            if(currentTag.innerHTML)
                oScript.innerHTML = currentTag.innerHTML;
            if(typeof add_script_attribute !== "undefined" && add_script_attribute){
                for (var key in add_script_attribute) {
                    if (add_script_attribute.hasOwnProperty(key)) {
                        oScript.setAttribute(key, add_script_attribute[key]);
                    }
                }
            }
            if(typeof callback !== "undefined"){
                if(currentTag.innerHTML && !currentTag.src){
                    // Better to not call callback for inline source
                    //callback();
                } else {
                    oScript.onload = oScript.onreadystatechange = function(){
                        //Catch-all try-catch so we can send any error we get to sentry
                        try {
                            if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
                                done = true;
                                callback();
                                // Handle memory leak in IE
                                oScript.onload = oScript.onreadystatechange = null;
                            }
                        } catch(e){
                            console.log(e);
                            //logger.log('error', "name: " + e.name + " message: " + e.message, e);
                        }
                    };
                }
            }
            for(var k=0;k<currentTag.attributes.length;k++){
                if(currentTag.attributes[k].value && !(currentTag.attributes[k].value in {'null':'', 'false':'','0':''}) && currentTag.attributes[k].name != "src")
                    oScript.setAttribute(currentTag.attributes[k].name, currentTag.attributes[k].value);
            }
            refElem.appendChild(oScript);
        }
    };

    this.indexOf = function(needle) {
        var indexOf;
        if(typeof Array.prototype.indexOf === 'function') {
            indexOf = Array.prototype.indexOf;
        } else {
            indexOf = function(needle) {
                var i = -1, index = -1;

                for(i = 0; i < this.length; i++) {
                    if(this[i] === needle) {
                        index = i;
                        break;
                    }
                }

                return index;
            };
        }

        return indexOf.call(this, needle);
    };

    this.getWindowSize = function(Name, refWindow) {
        /*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
        var size;
        var name = Name.toLowerCase();
        var win = refWindow || this.activeWindow();
        var doc = win.document;
        var documentElement = doc.documentElement;
        if (win["inner" + Name] === undefined) {
            // IE6 & IE7 don't have window.innerWidth or innerHeight
            size = documentElement["client" + Name];
        }
        else if (win["inner" + Name] != documentElement["client" + Name]) {
            // WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy

            // Insert markup to test if a media query will match document.doumentElement["client" + Name]
            try {
                var bodyElement = document.createElement("body");
                bodyElement.id = "vpw-test-b";
                bodyElement.style.cssText = "overflow:scroll";
                var divElement = document.createElement("div");
                divElement.id = "vpw-test-d";
                divElement.style.cssText = "position:absolute;top:-1000px";
                // Getting specific on the CSS selector so it won't get overridden easily
                divElement.innerHTML = "<style>@media(" + name + ":" + documentElement["client" + Name] + "px){body#vpw-test-b div#vpw-test-d{" + name + ":7px!important}}</style>";
                bodyElement.appendChild(divElement);
                documentElement.insertBefore(bodyElement, document.head);

                if (divElement["offset" + Name] == 7) {
                    // Media query matches document.documentElement["client" + Name]
                    size = documentElement["client" + Name];
                }
                else {
                    // Media query didn't match, use window["inner" + Name]
                    size = win["inner" + Name];
                }
                // Cleanup
                documentElement.removeChild(bodyElement);
            } catch(e){
                size = win["inner" + Name];
            }
        }
        else {
            // Default to use window["inner" + Name]
            size = win["inner" + Name];
        }
        return size;
    };

    this.isBot = function() {
        var check = false;
        (function(a){if(/bot|googlebot|crawler|spider|robot|crawling/i.test(a)) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    this.bindEvent = function(element, type, handler) {
       if(element.addEventListener) {
          element.addEventListener(type, handler, false);
       } else {
          element.attachEvent('on'+type, handler);
       }
    }

    this.broadcastEvent = function(element, event_string){
        var evnt; // The custom event that will be created

        if (document.createEvent) {
            evnt = document.createEvent("HTMLEvents");
            evnt.initEvent(event_string, true, true);
            evnt.eventName = event_string;
            element.dispatchEvent(evnt);
        } else {
            evnt = document.createEventObject();
            evnt.eventType = event_string;
            evnt.eventName = event_string;
            element.fireEvent("on" + evnt.eventType, evnt);
        }
    }

    this.sendPostMessage = function(ifrm, url, msg){
        if(ifrm)
            ifrm.contentWindow.postMessage(msg, url);
    }
}


var async = new function(){

    this.postRequest = function(url, params, success, failure){
        var xmlhttp;

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 ) {
                if(xmlhttp.status == 200){
                    if(arguments.length > 2)
                        success(xmlhttp.responseText);
                }
                else {
                    if(arguments.length > 3)
                        failure();
                }
            }
        }
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(params);
    };

    this.getJSONP = function(url, callback, callbackHandler) {
        var rand;

        if(arguments.length > 2){
            rand = callbackHandler;
        } else {
            //For concealing callback function so no one else can intecept it
            rand = Math.floor((Math.random()*1000000000) + 10000 );
        }

        window['an_callback_'+rand] = function(data){
            callback(data);
        }

        var script = document.createElement('script');
        script.src = url + '&callback=an_callback_' + rand;
        document.getElementsByTagName('head')[0].appendChild(script);
    };
};
/*
    Session helper to store and maintain placement settings and responses
*/

var session_helper = new function() {
    'use strict';

    var placements = {};

    /*
        config = {
            apiKey: "",
            numAds: 1,
            keywords: [],
            keyValues: {},
            nativeAdElementId: "",
            clickTags: "",
            impressionTags: "",
            viewabilityTags: "",
            callback: function(){},
            onClick: function(){}
        }
    */
    this.pushPlacementConfig = function(config){
        if(!placements.hasOwnProperty(config.apiKey)){
            //Array allows us to store multiple responses from same placement
            placements[config.apiKey] = [];
        }
        placements[config.apiKey].push(config);
    };

    this.popPlacementConfig = function(apiKey){
        if(placements.hasOwnProperty(apiKey)){
            return placements[apiKey].pop();
        }
        return null;
    }

}

/*
    Ad viewability tracking
*/

// TODO: Track untrackable viewability metric

function OpenAdViewability() {

    /*
        This implementation is according to MRC Viewability guidelines - 
        http://mediaratingcouncil.org/081815%20Viewable%20Ad%20Impression%20Guideline_v2.0_Final.pdf
    */

    var geometryViewabilityCalculator = new OAVGeometryViewabilityCalculator();
    var effectiveWindow = window;

    var check = {
        percentObscured: 0,
        percentViewable: 0,
        acceptedViewablePercentage: 50,
        viewabiltyAchieved: false,
        inView: false,
        duration: 0
    };

    this.DEBUG_MODE = false;

    this.checkViewability = function(ad, callbackOnViewabilityAchived, callbackInViewToggleInstant, contextWindow){
        if(arguments.length > 2)
            effectiveWindow = contextWindow;

        if(!utils.isFriendlyIframe()){
            console.log('AN: Unable to track viewability. Unfriendly Iframe Error');
            return;
        }

        var count = 0;
        var that = this;
        var timer = setInterval(function() {
            if (checkViewable(ad)) {
                count++;
                if(!check.inView){
                    check.inView = true;
                    callbackInViewToggleInstant(true);
                }
            } else {
                count = 0;
                if(check.inView){
                    check.inView = false;
                    callbackInViewToggleInstant(false);
                }
            }
            check.duration = count*100;
            if (count >= 9) {
                if(!check.viewabiltyAchieved){
                    check.viewabiltyAchieved = true;
                    callbackOnViewabilityAchived();
                }
            }
        }, 100);
    }

    var checkViewable = function(ad) {
        var adRect = ad.getBoundingClientRect();
        var totalArea = adRect.width * adRect.height;
        // According to MRC standards, larget ad unit size have only 30% viewable requirements
        if(totalArea >= 242500)
            check.acceptedViewablePercentage = 30;

        if (checkCssInvisibility(ad) === true){
            return false;
        }

        if (checkDomObscuring(ad) === true){
            return false;
        }

        checkGeometry(ad);

        if(check.percentViewable && check.percentViewable < check.acceptedViewablePercentage){
            return false;
        }

        if(!check.percentViewable)
            return false;

        return true;
    };

    /**
    * Performs the geometry technique to determine viewability. First gathers
    * information on the viewport and on the ad. Then compares the two to
    * determine what percentage, if any, of the ad is within the bounds
    * of the viewport.
    * @param {Element} ad The HTML Element to measure
    */
    var checkGeometry = function (ad) {
        check.percentObscured = check.percentObscured || 0; 
        var viewabilityResult = geometryViewabilityCalculator.getViewabilityState(ad, effectiveWindow);
        if (!viewabilityResult.error) {
            check.percentViewable = viewabilityResult.percentViewable - check.percentObscured;
        }
        return viewabilityResult;
    };

    /**
     * Checks if the ad is made invisible by css attribute 'visibility:hidden'
     * or 'display:none'.
     * Is so, viewability at the time of this check is 'not viewable' and no further check
     * is required.
     * These properties are inherited, so no need to parse up the DOM hierarchy.
     * If the ad is in an iframe inheritance is restricted to elements within
     * the DOM of the iframe document
     * @param {Element} ad The HTML Element to measure
     */
    var checkCssInvisibility = function (ad) {
        var style = effectiveWindow.getComputedStyle(ad, null);
        var visibility = style.getPropertyValue('visibility');
        var display = style.getPropertyValue('display');
        if ( visibility == 'hidden' || display == 'none' ){
            return true;
        }
        return false;
    };

    /**
     * Checks if the ad is more then 50% obscured by another dom element.
     * Is so, viewability at the time of this check is 'not viewable' and no further check
     * is required.
     * If the ad is in an iframe this check is restricted to elements within
     * the DOM of the iframe document
     * @param {Element} ad The HTML Element to measure
     */
    var checkDomObscuring = function(ad){
        var adRect = ad.getBoundingClientRect(),
            offset = 12, // This offset apparently eliminates parent element of the ad
            xLeft = adRect.left+offset,
            xRight = adRect.right-offset,
            yTop = adRect.top+offset,
            yBottom = adRect.bottom-offset,
            xCenter = Math.floor(adRect.left+adRect.width/2),
            yCenter = Math.floor(adRect.top+adRect.height/2),
            testPoints = [
                { x:xLeft,   y:yTop },
                { x:xCenter, y:yTop },
                { x:xRight,  y:yTop },
                { x:xLeft,   y:yCenter },
                { x:xCenter, y:yCenter },
                { x:xRight,  y:yCenter },
                { x:xLeft,   y:yBottom },
                { x:xCenter, y:yBottom },
                { x:xRight,  y:yBottom }
            ];

        for (var p in testPoints) {
            if (testPoints[p] && testPoints[p].x >= 0 && testPoints[p].y >= 0) {
                elem = document.elementFromPoint(testPoints[p].x, testPoints[p].y);

                if (elem != null && elem != ad && !ad.contains(elem)) {
                    overlappingArea = overlapping(adRect, elem.getBoundingClientRect());
                    if (overlappingArea > 0) {
                        check.percentObscured = 100 * overlapping(adRect, elem.getBoundingClientRect());
                        if (check.percentObscured > check.acceptedViewablePercentage) {
                            check.percentViewable = 100 - check.percentObscured;
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    var overlapping = function(adRect, elem ){
        var adArea = adRect.width * adRect.height;
        var  x_overlap = Math.max(0, Math.min(adRect.right, elem.right) - Math.max(adRect.left, elem.left));
        var  y_overlap = Math.max(0, Math.min(adRect.bottom, elem.bottom) - Math.max(adRect.top, elem.top));
        return (x_overlap * y_overlap) / adArea;
    }

}


function OAVGeometryViewabilityCalculator() {

    this.getViewabilityState = function (element, contextWindow) {
        var minViewPortSize = getMinViewPortSize(),
            viewablePercentage;
        if (minViewPortSize.area == Infinity) {
            return { error: 'Failed to determine viewport'};
        }
        var assetRect = element.getBoundingClientRect();
        var adArea = assetRect.width * assetRect.height;
        var viewPortSize = {};
        viewPortSize.width = null;
        viewPortSize.height = null;
        if ((minViewPortSize.area / adArea) < 0.5) {
            // no position testing required if viewport is less than half the area of the ad
            viewablePercentage = Math.floor(100 * minViewPortSize.area / adArea);
        }else{
            try {
                //If we are in unfriendly iframe, this will throw an exception  
                var testFriendlyIframe = window.top.document;

                viewPortSize = getViewPortSize(window.top),
                visibleAssetSize = getAssetVisibleDimension(element, contextWindow);
                //var viewablePercentage = getAssetViewablePercentage(assetSize, viewPortSize);
                //Height within viewport:
                if ( visibleAssetSize.bottom > viewPortSize.height ) {
                    //Partially below the bottom
                    visibleAssetSize.height -= (visibleAssetSize.bottom - viewPortSize.height);
                }
                if ( visibleAssetSize.top < 0 ) {
                    //Partially above the top
                    visibleAssetSize.height += visibleAssetSize.top;
                }
                if ( visibleAssetSize.left < 0 ) {
                    visibleAssetSize.width += visibleAssetSize.left;
                }
                if ( visibleAssetSize.right > viewPortSize.width ) {
                    visibleAssetSize.width -= ( visibleAssetSize.right - viewPortSize.width );
                }
                // Viewable percentage is the portion of the ad that's visible divided by the size of the ad
                viewablePercentage = Math.floor( 100 * ( visibleAssetSize.width * visibleAssetSize.height ) / adArea );
            } catch(err){
                //console.log('AN: ' + err);
            }
        }
        /*
        //Get ad dimensions:
        var assetRect = element.getBoundingClientRect();
        */
        return {
            clientWidth: viewPortSize.width,
            clientHeight: viewPortSize.height,
            objTop: assetRect.top,
            objBottom: assetRect.bottom,
            objLeft: assetRect.left,
            objRight: assetRect.right,
            percentViewable: viewablePercentage
        };
    };

    ///////////////////////////////////////////////////////////////////////////
    // PRIVATE FUNCTIONS
    ///////////////////////////////////////////////////////////////////////////

    // Check nested iframes
    var getMinViewPortSize = function (){
        var minViewPortSize = getViewPortSize(window),
            minViewPortArea = minViewPortSize.area,
            currentWindow = window;

        while (currentWindow != window.top){
            try {
                //If we are in unfriendly iframe, this will throw an exception  
                var testFriendlyIframe = window.top.document;
                currentWindow = currentWindow.parent;
            } catch(err){
                //console.log('AN: ' + err);
                break;
            }
            viewPortSize = getViewPortSize(currentWindow);
            if (viewPortSize.area < minViewPortArea){
                minViewPortArea = viewPortSize.area;
                minViewPortSize = viewPortSize;
            }
        }
        return minViewPortSize;
    }


    /**
     * Get the viewport size by taking the smallest dimensions
     */
    var getViewPortSize = function (contextWindow) {
        var viewPortSize = {
            width: Infinity,
            height: Infinity,
            area:Infinity
        };

        //document.body  - Handling case where viewport is represented by documentBody
        //.width
        if (!isNaN(contextWindow.document.body.clientWidth) && contextWindow.document.body.clientWidth > 0) {
            viewPortSize.width = contextWindow.document.body.clientWidth;
        }
        //.height
        if (!isNaN(contextWindow.document.body.clientHeight) && contextWindow.document.body.clientHeight > 0) {
            viewPortSize.height = contextWindow.document.body.clientHeight;
        }
        //document.documentElement - Handling case where viewport is represented by documentElement
        //.width
        if (!!contextWindow.document.documentElement && !!contextWindow.document.documentElement.clientWidth && !isNaN(contextWindow.document.documentElement.clientWidth)) {
            viewPortSize.width = contextWindow.document.documentElement.clientWidth;
        }
        //.height
        if (!!contextWindow.document.documentElement && !!contextWindow.document.documentElement.clientHeight && !isNaN(contextWindow.document.documentElement.clientHeight)) {
            viewPortSize.height = contextWindow.document.documentElement.clientHeight;
        }
        //window.innerWidth/Height - Handling case where viewport is represented by window.innerH/W
        //.innerWidth
        if (!!contextWindow.innerWidth && !isNaN(contextWindow.innerWidth)) {
            viewPortSize.width = Math.min(viewPortSize.width, contextWindow.innerWidth);
        }
        //.innerHeight
        if (!!contextWindow.innerHeight && !isNaN(contextWindow.innerHeight)) {
            viewPortSize.height = Math.min(viewPortSize.height, contextWindow.innerHeight);
        }
        viewPortSize.area = viewPortSize.height * viewPortSize.width;
        return viewPortSize;
    };

    /**
     * Recursive function that return the asset (element) visible dimension
     * @param {element} The element to get his visible dimension
     * @param {contextWindow} The relative window
     */

    var getAssetVisibleDimension = function (element, contextWindow) {
        var currWindow = contextWindow;
        //Set parent window for recursive call
        var parentWindow = contextWindow.parent;
        var resultDimension = { width: 0, height: 0, left: 0, right: 0, top: 0, bottom: 0 };

        if (element) {
            var elementRect = getPositionRelativeToViewPort(element, contextWindow);
            elementRect.width = elementRect.right - elementRect.left;
            elementRect.height = elementRect.bottom - elementRect.top;
            resultDimension = elementRect;
            //Calculate the relative element dimension if we clime to a parent window
            if (currWindow != parentWindow) {
                //Recursive call to get the relative element dimension from the parent window
                var parentDimension = getAssetVisibleDimension(currWindow.frameElement, parentWindow);
                //The asset is partially below the parent window (asset bottom is below the visible window)
                if (parentDimension.bottom < resultDimension.bottom) {
                    if (parentDimension.bottom < resultDimension.top) {
                        //The entire asset is below the parent window
                        resultDimension.top = parentDimension.bottom;
                    }
                    //Set the asset bottom to be the visible part
                    resultDimension.bottom = parentDimension.bottom;
                }
                //The asset is partially right to the parent window
                if (parentDimension.right < resultDimension.right) {
                    if (parentDimension.right < resultDimension.left) {
                        //The entire asset is to the right of the parent window
                        resultDimension.left = parentDimension.right;
                    }
                    //Set the asset right to be the visible
                    resultDimension.right = parentDimension.right;
                }

                resultDimension.width = resultDimension.right - resultDimension.left;
                resultDimension.height = resultDimension.bottom - resultDimension.top;
            }
        }
        return resultDimension;
    };

    var getPositionRelativeToViewPort = function (element, contextWindow) {
        var currWindow = contextWindow;
        var parentWindow = contextWindow.parent;
        var resultPosition = { left: 0, right: 0, top: 0, bottom: 0 };

        if (element) {
            var elementRect = element.getBoundingClientRect();
            if (currWindow != parentWindow) {
                resultPosition = getPositionRelativeToViewPort(currWindow.frameElement, parentWindow);
            }
                resultPosition = {
                    left: elementRect.left + resultPosition.left,
                    right: elementRect.right + resultPosition.left,
                    top: elementRect.top + resultPosition.top,
                    bottom: elementRect.bottom + resultPosition.top
                };
        }
        return resultPosition;
    };
    /**
     * Calculate asset viewable percentage given the asset size and the viewport
     * @param {effectiveAssetRect} the asset viewable rect; effectiveAssetRect = {left :, top :,bottom:,right:,}
     * @param {viewPortSize} the browser viewport size;
     */
    var getAssetViewablePercentage = function (effectiveAssetRect, viewPortSize) {
        // holds the asset viewable surface
        var assetVisibleHeight = 0, assetVisibleWidth = 0;
        var asset = {
            width: effectiveAssetRect.right - effectiveAssetRect.left,
            height: effectiveAssetRect.bottom - effectiveAssetRect.top
        };

        // Ad is 100% out off-view
        if (effectiveAssetRect.bottom < 0 // the entire asset is above the viewport
            || effectiveAssetRect.right < 0 // the entire asset is left to the viewport
            || effectiveAssetRect.top > viewPortSize.height // the entire asset bellow the viewport
            || effectiveAssetRect.left > viewPortSize.width // the entire asset is right to the viewport
            || asset.width <= 0 // the asset width is zero
            || asset.height <= 0)  // the asset height is zero
        {
            return 0;
        }
        // ---- Handle asset visible height ----
        // the asset is partially above the viewport
        if (effectiveAssetRect.top < 0) {
            // take the visible part
            assetVisibleHeight = asset.height + effectiveAssetRect.top;
            //if the asset height is larger then the viewport height, set the asset height to be the viewport height
            if (assetVisibleHeight > viewPortSize.height) {
                assetVisibleHeight = viewPortSize.height;
            }
        }
        // the asset is partially below the viewport
        else if (effectiveAssetRect.top + asset.height > viewPortSize.height) {
            // take the visible part
            assetVisibleHeight = viewPortSize.height - effectiveAssetRect.top;
        }
        // the asset is in the viewport
        else {
            assetVisibleHeight = asset.height;
        }
        // ---- Handle asset visible width ----
        // the asset is partially left to the viewport
        if (effectiveAssetRect.left < 0) {
            // take the visible part
            assetVisibleWidth = asset.width + effectiveAssetRect.left;
            //if the asset width is larger then the viewport width, set the asset width to be the viewport width
            if (assetVisibleWidth > viewPortSize.width) {
                assetVisibleWidth = viewPortSize.width;
            }
        }
        // the asset is partially right to the viewport
        else if (effectiveAssetRect.left + asset.width > viewPortSize.width) {
            // take the visible part
            assetVisibleWidth = viewPortSize.width - effectiveAssetRect.left;
        }
        // the asset is in the viewport
        else {
            assetVisibleWidth = asset.width;
        }
        // Divied the visible asset area by the full asset area to the the visible percentage
        return Math.round((((assetVisibleWidth * assetVisibleHeight)) / (asset.width * asset.height)) * 100);
    };
}


/*
    Ad behavior related classes
*/

var expander = new function(){

    var expandElementsHeight,
        expanded = false,
        embed,
        summary,
        shareButtons,
        ctaButton;

    function createExpandElements(ad, width, height, storyElement, origClientHeight){
        embed = document.createElement('iframe');
        embed.width = width;
        embed.height = height;
        embed.setAttribute('src', ad.embedUrl);
        embed.style.margin = '20px auto 10px';
        embed.style.border = 'none';
        embed.className = 'adsnative-video-embed';
        summary = document.createElement('div');
        summary.innerHTML = ad.summary;
        if(ad.type == "story")
            summary.innerHTML = summary.innerHTML + '&#32;' + '<a href="'+ ad.url +'" class="adsnative-read-more" '+ ((ad.target == '_blank') ? 'target="_blank"' : '') +'>Read more</a>'
        summary.className = 'adsnative-video-summary';
        summary.style.cssText = 'line-height:120%; font-size:14px; margin:10px auto 20px;';
        // var labels = storyElement.children[storyElement.children.length - 2];
        // if(labels.className == 'adsnative-labels'){
        //  labels.parentNode.insertBefore(summary, labels);
        //  if(ad.type == "video")
        //      labels.parentNode.insertBefore(embed, labels);
        // }
        if(ad.type == "video")
            storyElement.appendChild(embed);
        storyElement.appendChild(summary);
        expandElementsHeight = origClientHeight + embed.offsetHeight + summary.offsetHeight;
        summary.style.display = 'none';
        embed.style.display = 'none';
    }

    function toggleEmbed(){
        if(!expanded){
            embed.style.display = 'block';
            summary.style.display = 'block';
            // shareButtons.style.display = 'block';
            // ctaButton.style.display = 'block';
        } else {
            // shareButtons.style.display = 'none';
            // ctaButton.style.display = 'none';
            embed.style.display = 'none';
            summary.style.display = 'none';
        }
    }

    this.expandStoryElement = function(ad, storyElement, origClientHeight){
        if(!expandElementsHeight){
            createExpandElements(ad, storyElement.clientWidth, 180, storyElement, origClientHeight);
        }
        if(expanded) {
            toggleEmbed();
        }
        var maxheight = expandElementsHeight;
        var minheight = origClientHeight;
        var time = 300;
        var init = (new Date()).getTime();
        var instanceheight = parseInt(storyElement.clientHeight);
        var height = (expanded ? minheight : maxheight);
        var disp = height - instanceheight;
        storyElement.style.height = height;
        var timer = setInterval(function() {
            var instance = (new Date()).getTime() - init; //animating time
            if(instance <= time ) { //0 -> time seconds
                var pos = instanceheight + Math.floor(disp * instance / time);
                storyElement.style.height = pos + 'px';
            } else {
                clearInterval(timer);
                storyElement.style.height = height + 'px';
                if(!expanded) {
                    toggleEmbed();
                }
                expanded = !expanded;
            }
        }, 1);
    };
};

var lightbox = new function(){

    this.overlay = null;
    this.lightbox_elem = null;
    var self = this;
    this.ad = null;

    var w = utils.activeWindow(),
        window_width = utils.getWindowSize("Width"),
        window_height = utils.getWindowSize("Height");

    function display_overlay(){
        if(!this.overlay){
            var win = utils.activeWindow();
            this.overlay = win.document.createElement('div');
            this.overlay.style.cssText = 'position:fixed;z-index:999999;width:100%;height:100%;text-align:center;top:0;left:0;background:rgba(0,0,0,0.7);';
            this.overlay.id = 'an-lightbox-overlay';
            var that = this;
            this.overlay.onclick = function(){
                close_lightbox();
                return false;
            }
            win.document.getElementsByTagName('body')[0].appendChild(this.overlay);
        } else {
            this.overlay.style.display = 'block';
        }
    }

    function hide_overlay(){
        this.overlay.style.display = 'none';
    }

    function display_lightbox(html){
        display_overlay();
        var p_w, p_h;
        var win = utils.activeWindow();
        if(window_height>window_width){
            p_w = Math.floor(window_width * 0.8);
            p_h = Math.floor((p_w * 3) / 4);
        } else {
            p_h = Math.floor(window_height * 0.8);
            p_w = Math.floor((p_h * 4) / 3);
        }

        if(!this.lightbox_elem){
            this.lightbox_elem = win.document.createElement('div');
            this.lightbox_elem.style.cssText = 'background-color:#FFF;position:fixed;z-index:9999999;box-shadow:0px 0px 30px rgba(0,0,0,0.8);';
            this.lightbox_elem.style.width = p_w + 'px';
            this.lightbox_elem.style.height = (p_h - 50) + 'px';
            this.lightbox_elem.style.left = Math.floor((window_width-p_w) / 2) + 'px';
            this.lightbox_elem.style.top = Math.floor((window_height-p_h) / 2) + 'px';
            this.lightbox_elem.id = 'an-lightbox';
        }

        var header_html;
        header_html = '<style>#an-lightbox-header a:hover h2 { color:#4775FF; }</style><div id="an-lightbox-header" style="text-align:center;margin:10px;"><a href="'+self.ad.url+'" target="_blank" style="text-decoration:none;color:#000000;"><h2 style="font-size: 20px; font-family:Georgia,sans-serif; padding: 0;margin: 10px;">' + self.ad.title + '</h2></a><span style="font-size: 15px;color: #666;">'+ self.ad.promotedByTag + ' ' + self.ad.promotedBy +'</span></div>';
        this.lightbox_elem.innerHTML = header_html + html;
        win.document.getElementsByTagName('body')[0].appendChild(this.lightbox_elem);

        this.close_button = win.document.createElement('div');
        this.close_button.style.cssText = 'width:32px;height:32px;cursor:pointer;position:fixed;z-index:99999999;background:url(http://static.adsnative.com/static/img/nativead/close3.png) 0px 0px no-repeat;display: inline-block;';
        this.close_button.style.marginLeft = '-16px';
        this.close_button.style.top = Math.floor((window_height-p_h) / 2) -  16 + 'px';
        this.close_button.onclick = function(){
            close_lightbox();
            return false;
        };
        this.lightbox_elem.appendChild(this.close_button);
        this.lightbox_elem.style.display = 'block';
    }

    function clear_lightbox(){
        this.lightbox_elem.style.display = 'none';
        this.lightbox_elem.innerHTML = '';
    }

    function close_lightbox(){
        hide_overlay();
        clear_lightbox();
    }

    this.open = function(ad, autoplay){
        autoplay = 1 ? Boolean(autoplay) : 0;
        self.ad = ad;
        display_lightbox('<iframe id="an-lightbox-player-iframe" src="' + ad.embedUrl + '&auto_play='+autoplay+'" style="width:100%;height:100%;overflow:hide;" frameborder="0" allowfullscreen="true" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe');
    };

    this.close = function(){
        close_lightbox();
    }
};

var AdsNativeCookieDrop = new function(){
    this.dropCookieMatchingPixel = function(){
        var pixel = document.createElement('img');
        pixel.src = utils.urlPrefix() + '//rudy.adsnative.com/cm.gif';
        pixel.style.cssText = 'height:1px;width:1px;border:none;display:none;';
        if(document.getElementsByTagName('body').length)
            document.getElementsByTagName('body')[0].appendChild(pixel);
        else {
            $an.fn.ready(function() {
                document.getElementsByTagName('body')[0].appendChild(pixel);
            });
        }
    };
}


var AdsNativeMaster = function(_options) {
    'use strict';

    // Extendable settings
    var settings = {
        /* Private settings */
        version: '1.0',
        subversion: '1.47',
        apiUrl: utils.urlPrefix() + '//api.adsnative.com',
        apiEndpoint: '/v1/ad-template.json',
        domainLookupUrl: utils.urlPrefix() + '//api-cache.adsnative.com',
        domainLookupEndpoint: '/v1/host/',
        staticUrl: utils.urlPrefix() + '//static.adsnative.com/static/',
        /* Global settings */
        preview: false,
        onready: null,
        blockAdLoad: false,
        blockAdDisplay: false,
        forceMobile: false,
        //adUnits: [],
        currentPageUrl: null,
        /* Placement specific settings */
        apiKey: '',
        userCallbackOnAdLoad: null,
        processNativeAdElement: null, /* This allows publisher to tinker with the native ad element when its rendered */
        numAds: 0,
        callbackOnNoAds: null, /* Legacy: Deprecate at some point */
        nativeAdElementId: null,
        cssPath: null,
        keywords: null,
        keyValues: null,
        autoPosition: false,
        templateKey: null,
        inviewEvent: null,
        outviewEvent: null,
        onClick: null,
        /* Enterprise Integration Options */
        networkKey: null,
        categories: null,
        widgetId: null,
        safetyLevel: null,
    };

    var session = {
        isScriptInBody: false,
        isPreviewMode: false,
        isProfilingMode: false,
        forceCampaignID: null,
        forceCreativeID: null,
        forceBidUrl: null,
        apiData: null,
        adUnits: {}
    };

    var constants = {

        whitelistedNetworks: ['ntent_feed', 'aol_feed', 'ebay_feed',
            'gravity_feed', 'inmobi_feed', 'kixer_feed', 'triple_lift', 'federated_media',
            'kixer', 'saymedia', 'contentad', 'connatix', 'outbrain',
            'sharethrough', 'taboola', 'nativo', 'other', 'admarketplace_feed',
            'medianet', 'dianomi', 'criteo_feed', 'criteo_secondary', 'openx', 'mobilemajority', 'nativeads',
            'urx','rubiconproject', 'answermedia', 'distroscale', 'motiveinteractive',
            'aol_marketplace', 'virool'],

        standardIntegrations: ['openx', 'mobilemajority', 'nativeads',
            'kixer', 'urx', 'rubiconproject', 'answermedia', 'distroscale',
            'motiveinteractive', 'aol_marketplace', 'zergnet', 'taboola', 'virool',
            'criteo_secondary', 'google_dfp', 'optimatic', 'allscreen', 'genesis', 'super_awesome'],

        feedsArray: ["ntent_feed", "inmobi_feed", "aol_feed", "ebay_feed",
            "gravity_feed", "kixer_feed", "admarketplace_feed", "criteo_feed"],

        criteoExceptions: ["7d73dc363b2b42598976e36cf5d52888"]

    }

    var logger = new function(){

        function _postErrorMessage(message, jsonData, level) {
            var url = settings.apiUrl + '/v1/log/error/?'
            var params = 'level=' + level + '&message_type=' + encodeURIComponent(message) + '&data=' + encodeURIComponent(jsonData);
            async.postRequest(url, params);
        }

        this.log = function(type, message, errObj){
            if(session.isPreviewMode){
                if(typeof message === "string" || message instanceof String){
                    console.log('[AN] ' + message);
                } else {
                    console.log(message);
                }

                if(arguments.length > 2)
                    console.log(errObj);
            }
            if(type == 'error'){
                var id_str = ((settings.apiKey) ? settings.apiKey : utils.getPageHostName());
                var responseObj = {
                    'settings' : settings,
                    'session': session,
                    'pageURL': utils.activeWindow().location.href,
                    'userAgent': navigator.userAgent
                };
                if(arguments.length > 2)
                    responseObj['error'] = errObj;
                if(message == "name: TypeError message: null is not an object (evaluating 'this.referenceElement.parentNode')" || message == "name: TypeError message: 'null' is not an object (evaluating 'this.referenceElement.parentNode')" || message == "name: TypeError message: Cannot read property 'parentNode' of null")
                    return;
                _postErrorMessage(message, JSON.stringify(responseObj), type);
            }
        };
    };

    var profiler = new function(){

        this.timeSincePageStart = function(identifier){
            if(session.isProfilingMode){
                try {
                    console.debug('[AN] ' + identifier + ': ' + (Date.now() - utils.activeWindow().performance.timing.navigationStart) + 'ms');
                } catch(err){

                }
            }
        }

        this.start = function(identifier){
            if(session.isProfilingMode)
                console.time('[AN] '+ identifier);
        };

        this.end = function(identifier){
            if(session.isProfilingMode)
                console.timeEnd('[AN] '+ identifier);
        };
    };

    // private constructor
    var __construct = function() {
        settings = utils.extend(settings, _options);
        session.isScriptInBody = utils.isScriptInBody();
        session.isPreviewMode = utils.isPreviewMode() || settings.preview;
        session.isProfilingMode = utils.isProfilingMode();
        session.previewModeHost = utils.getPreviewModeHost();
        session.urlParams = utils.getURLParams();

        profiler.timeSincePageStart('TIME SINCE PAGE START');
        profiler.start('TOTAL CLIENT');

        if(session.isPreviewMode){
            if(session.previewModeHost){
                settings.apiUrl = session.previewModeHost;
                settings.domainLookupUrl = session.previewModeHost;
            }
            else
                session.previewModeHost = settings.apiUrl;
            if(session.urlParams.hasOwnProperty('zid'))
                settings.apiKey = session.urlParams['zid'];
            if(session.urlParams.hasOwnProperty('force_mobile'))
                settings.forceMobile = Boolean(session.urlParams['force_mobile']);
            if(session.urlParams.hasOwnProperty('cid'))
                session.forceCampaignID = session.urlParams['cid'];
            if(session.urlParams.hasOwnProperty('crid'))
                session.forceCreativeID = session.urlParams['crid'];
            if(session.urlParams.hasOwnProperty('bid_url'))
                session.forceBidUrl = session.urlParams['bid_url'];
            if(session.urlParams.hasOwnProperty('bid_version'))
                session.forceBidVersion = session.urlParams['bid_version'];
        }

        if(settings.currentPageUrl)
            settings.currentPageUrl = decodeURIComponent(settings.currentPageUrl);

    }();

    function isMobile(){
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || settings.forceMobile);
    }



    /*
        Placement Processor
    */

    function PlacementProcessor(_content, _config){
        this.status = false;
        this.apiKey = null;
        this.current_network_index = 0;
        this.placement_finished_processing = false;
        this.config = null;

        this.addVideoDetectiveListner = function(nativeAdElement){
            //Event handler
            var handler = function(e) {
                var message = e.message || e.data;
                if(message.hasOwnProperty('video_detective') && e.origin == settings.apiUrl){
                    try {
                        nativeAdElement.getElementsByTagName('vd_title')[0].outerHTML = message.title;
                        nativeAdElement.getElementsByTagName('vd_summary')[0].outerHTML = message.description;
                    } catch(err){

                    }
                }
            };

            if(window.addEventListener){
                // Listen to message from child window
                window.addEventListener("message", handler, false);
            } else if(window.attachEvent) {
                window.attachEvent("onmessage", handler);
            }

        };

        // private constructor
        var __construct = function(that) {
            that.content = _content;
            if(typeof _config !== 'undefined')
                that.config = _config;

            if(that.content.hasOwnProperty('zid'))
                that.apiKey = that.content.zid;
            else if(settings.apiKey)
                that.apiKey = settings.apiKey;
            if(that.content.status == 'OK')
                that.status = true;

            that.win = utils.activeWindow();
            that.win_doc = utils.activeWindowDocument();
            that.inview = false;
            that.nativeAdElement = null;
            that.viewTracked = false;
            that.filledWithAdsNativeAd = false;

            if(settings.inviewEvent && settings.outviewEvent){
                //Event handler
                var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
                var eventer = window[eventMethod];
                var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

                // Listen to message from parent window
                eventer(messageEvent, function(e) {
                    var message = e.message || e.data;
                    if(message == settings.inviewEvent){
                        that.inview = true;
                        utils.broadcastEvent(document, 'adsnative.mrc50.view:in');
                        if(that.content.hasOwnProperty('ad') && that.nativeAdElement && that.filledWithAdsNativeAd){
                            if(that.nativeAdElement.getElementsByTagName('iframe').length){
                                // Send postMessage to our video iframe on videwability events for autoplay in view implementation
                                utils.sendPostMessage(that.nativeAdElement.getElementsByTagName('iframe')[0], utils.urlPrefix() + "//api.adsnative.com", 'disqus.view:50in');
                                utils.sendPostMessage(that.nativeAdElement.getElementsByTagName('iframe')[0], utils.urlPrefix() + "//api.adsnative.com", 'adsnative.mrc50.view:in');
                            }
                            if(that.content.ad.hasOwnProperty('viewableTags') && !that.viewTracked){
                                utils.dropTags(that.nativeAdElement, that.content.ad.viewableTags);
                                that.viewTracked = true;
                            }
                        }
                    } else if(message == settings.outviewEvent) {
                        that.inview = false;
                        utils.broadcastEvent(document, 'adsnative.mrc50.view:out');
                        if(that.content.hasOwnProperty('ad') && that.nativeAdElement && that.filledWithAdsNativeAd && that.nativeAdElement.getElementsByTagName('iframe').length){
                            // Send postMessage to our video iframe on videwability events for autoplay in view implementation
                            utils.sendPostMessage(that.nativeAdElement.getElementsByTagName('iframe')[0], utils.urlPrefix() + "//api.adsnative.com", 'disqus.view:50out');
                            utils.sendPostMessage(that.nativeAdElement.getElementsByTagName('iframe')[0], utils.urlPrefix() + "//api.adsnative.com", 'adsnative.mrc50.view:out');
                        }
                    }
                });
            }


        }(this);
    }

    PlacementProcessor.prototype.applyCommonStyle = function(additional_style){
        var style = document.createElement('style');
        style.setAttribute("type", "text/css");
        var adsnativeStyle = 'div.adsnative-labels { } ' +
            'div.adsnative-powered-by { margin-right:5px !important; font-size: 11px; color: #777; float: right; text-align: right; margin-right: 0px; }' +
            'div.adsnative-powered-by a { text-decoration: none; color: #333; font-size:14px;  font-family: "BenchNine", sans-serif; }' +
            'div.adsnative-powered-by a:hover { color: #cc0033; }' +
            '.adsnative-sponsored-label { font-size:12px; color: #999; margin-bottom:5px; }' +
            '.adsnative-share-buttons { float: left; margin-left:8px; margin-bottom:5px; }' +
            '.adsnative-share-button { text-decoration:none; display:block; height:24px; float:left; margin-right:10px; padding-left:25px; line-height:21px; font-size:14px; font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;  }' +
            '.adsnative-fb-share { background:url(' + settings.staticUrl + 'img/facebook.png) no-repeat; color:#3a5899; }' +
            '.adsnative-tw-share { background:url(' + settings.staticUrl + 'img/twitter.png) no-repeat; color:#40aceb; }' +
            '.adsnative-cta-button { display:block; float:left; width:100%; margin:8px 0px auto; border-radius: 0px; background:-webkit-gradient( linear, left top, left bottom, color-stop(5%, #ededed), color-stop(100%, #dfdfdf) ); border:1px solid #DDD; padding:8px 0; font-size:14px; font-family:Helvetica, Arial, sans-serif; text-decoration:none; text-align:center; text-shadow:none; color:#004276; text-shadow:0 1px 0 rgba(255,255,255, 1); }' +
            'div.adsnative-reset { clear: both; }';
        adsnativeStyle += '[class^="adsnative-icon-"], [class*=" adsnative-icon-"] { display:none; }';

        var doc = document;
        if(settings.autoPosition)
            doc = this.win_doc;
        //append first as it fails in some versions of Fireox and Chrome with NO_MODIFICATION_ALLOWED_ERR error
        doc.getElementsByTagName("head")[0].appendChild(style);
        if(Object.prototype.hasOwnProperty.call(style, 'styleSheet'))
            style.styleSheet.cssText = adsnativeStyle + additional_style;
        else {
            try {
                style.innerHTML = adsnativeStyle + additional_style;
            } catch(e) {
                try {
                    style.textContent = adsnativeStyle + additional_style;
                } catch(e) {
                    style.innerText = adsnativeStyle + additional_style;
                }
            }
        }
    };

    PlacementProcessor.prototype.outputAd = function(ad, wrapperRefElem){
        var refElem = this.referenceElement;
        if(arguments.length > 1)
            refElem = wrapperRefElem;
        var tempElement = document.createElement('div');
        tempElement.innerHTML = ad.html;
        var nativeAdElement;
        if(tempElement.childNodes.length > 1){
            nativeAdElement = tempElement;
            if (ad.backgroundColor) {
                nativeAdElement.style.backgroundColor = ad.backgroundColor;
            }
            refElem.parentNode.insertBefore(nativeAdElement, refElem);
        } else {
            nativeAdElement = tempElement.firstChild;
            if (ad.backgroundColor) {
                nativeAdElement.style.backgroundColor = ad.backgroundColor;
            }
            refElem.parentNode.insertBefore(nativeAdElement, refElem);
        }

        //Drop impression tags
        if(ad.hasOwnProperty('trackingTags'))
            utils.dropTags(nativeAdElement, ad.trackingTags);
        //Drop third-party impressions tags configured in _AdsNativeOpts
        if(this.config && this.config.hasOwnProperty('impressionTags')){
            utils.dropTags(nativeAdElement, this.config['impressionTags']);
        }

        if(settings.processNativeAdElement)
            settings.processNativeAdElement(nativeAdElement);

        this.ctaButton = document.createElement('div');
        this.ctaButton.innerHTML = '<a href="'+ ad.ctaUrl +'" class="adsnative-cta-button" target="_blank">'+ ad.ctaTitle +'</a>';
        //Sponsored labels & powered by
        this.shareButtons = document.createElement('div');
        this.shareButtons.innerHTML = '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(ad.url) + '" class="adsnative-fb-share adsnative-share-button" target="_blank">Share</a><a href="https://twitter.com/intent/tweet/?text=' + encodeURIComponent(ad.title) + '&url=' + ad.url + '" class="adsnative-tw-share adsnative-share-button" target="_blank">Tweet</a><div class="adsnative-reset"></div>';
        this.shareButtons.style.cssText = 'display:block;margin-top:10px;';
        this.shareButtons.className = 'adsnative-share-buttons';

        if(ad.hasOwnProperty('privacy')){
            var privacyIcon = document.createElement('div');
            privacyIcon.style.cssText = 'position: absolute;top: 0px;right: 0px;z-index:9999999;';
            privacyIcon.innerHTML = '<a href="'+ ad.privacy.optOutClickUrl +'" target="_blank"><img class="adsnative-privacy-button" src="'+ ad.privacy.optOutImageUrl +'"></a>';
            nativeAdElement.style.position = 'relative';
            nativeAdElement.appendChild(privacyIcon);
        }

        // if(ad.showShareButtonsOnDesktop){
        //     this.shareButtons.style.cssText = 'display:block;margin-top:10px;';
        // }

        var clearElem = document.createElement('div');
        clearElem.className = 'adsnative-reset';
        var labels = document.createElement('div');
        labels.style.cssText = '';
        if(ad.ctaUrl && ad.ctaTitle && ad.ctaTitle != "")
            nativeAdElement.appendChild(this.ctaButton);
        else
            labels.appendChild(this.shareButtons);
        labels.appendChild(clearElem);
        labels.className = 'adsnative-labels';
        try {
            this.origClientHeight = (window.getComputedStyle(nativeAdElement).getPropertyValue('height')) ? parseInt(window.getComputedStyle(nativeAdElement).getPropertyValue('height').slice(0, -2)) : nativeAdElement.clientHeight;
        } catch(err){
            origClientHeight = nativeAdElement.getBoundingClientRect().bottom - nativeAdElement.getBoundingClientRect().top;
        }
        //Put back share buttons on a condition from ad.json
        //nativeAdElement.appendChild(labels);

        this.setupClick(ad, nativeAdElement, this.apiKey);

        //Track viewability
        var that = this;
        if(ad.hasOwnProperty('viewableTags') && !(settings.inviewEvent && settings.outviewEvent)){
            var oav = new OpenAdViewability();
            oav.checkViewability(nativeAdElement, function() {
                    utils.dropTags(nativeAdElement, ad.viewableTags);
                    logger.log('console', that.apiKey + ': Viewable!');

                    //Drop third-party viewability tags configured in _AdsNativeOpts
                    if(that.config && that.config.hasOwnProperty('viewabilityTags')){
                        utils.dropTags(nativeAdElement, that.config['viewabilityTags']);
                    }
                }, function(status){
                    // Send postMessage to our video iframe on videwability events for autoplay in view implementation
                    if(that.nativeAdElement.getElementsByTagName('iframe').length){
                        if(status){
                            utils.sendPostMessage(that.nativeAdElement.getElementsByTagName('iframe')[0], utils.getPreviewModeHost(), 'adsnative.mrc50.view:in');
                        } else {
                            utils.sendPostMessage(that.nativeAdElement.getElementsByTagName('iframe')[0], utils.getPreviewModeHost(), 'adsnative.mrc50.view:out');
                        }
                    }
                }, utils.activeWindow());
        }

        this.nativeAdElement = nativeAdElement;

        this.addVideoDetectiveListner(nativeAdElement);

    };

    PlacementProcessor.prototype.setupClick = function(ad, adElement, apiKey){
        var origClientHeight = this.origClientHeight;
        var that = this;
        adElement.onclick = function (event) {
            if (event.target.className.indexOf("adsnative-privacy-button") > -1) {
                return true;
            }
            else if (event.target.className.indexOf("adsnative-share-button") === -1 && event.target.className.indexOf("adsnative-cta-button") === -1 && event.target.className.indexOf("adsnative-read-more") === -1) {
                return that.onUserClick(ad, adElement, origClientHeight, apiKey);
            }
        };
        if(!utils.anyClickTags(adElement) && (ad.url || (ad.type == "video" && !ad.inlineVideo))) {
            adElement.style.cursor = "pointer";
        }
    };

    PlacementProcessor.prototype.onUserClick = function(ad, adElement, origClientHeight, apiKey){

        var status = true;

        if(ad.type == "video" && !ad.inlineVideo){
            if(ad.videoExperience == 'autoplay_lightbox'){
                lightbox.open(ad, true);
                status = false;
            }
        } else if(!ad.inlineVideo && ad.url){
            /* Make whole ad clickable when video is not inline */

            // support for proxy/networks requiring a javascript callback on click
            if(typeof ad.clickCallback !== 'undefined') {
                var clickCallbackFn = ad.clickCallback['function'],
                    clickCallbackArgs = ad.clickCallback['args'];
                if (typeof window[clickCallbackFn] === 'function') {
                    window[clickCallbackFn].apply(this, clickCallbackArgs)
                }
            }

            var win = utils.activeWindow();
            var window_instance = null;
            if(ad.target == '_blank') {
                window_instance = win.open(ad.url, '_blank');
                if(window_instance){
                    window_instance.focus();
                    status = false;
                } else {
                    /* Most likely popup blocked*/
                    status = true;
                }
            } else {
                win.location.href = ad.url;
                window_instance = true;
                status = false;
            }

            if(!utils.isBot()){
                if(this.config && this.config.hasOwnProperty('clickTags')){
                    utils.dropTags(adElement, this.config['clickTags']);
                }
            }

            
        } else if(!ad.url){
            status = false;
        }

        try {
            if(this.config && this.config.hasOwnProperty('onClick')){
                this.config.onClick();
            } else if(settings.onClick) {
                settings.onClick();
            }
        } catch(e){
            
        }

        return status;
    };

    PlacementProcessor.prototype.outputHTML = function(html){
        var tempElement = utils.activeWindowDocument().createElement('div');
        tempElement.innerHTML = html;
        for(var i=0;i<tempElement.childNodes.length;i++){
            var htmlElement = tempElement.childNodes[i];
            this.referenceElement.parentNode.insertBefore(htmlElement, this.referenceElement);
        }
    };

    PlacementProcessor.prototype.renderNativePlacement = function(){
        if(this.content.hasOwnProperty('ads') && !utils.isEmpty(this.content.ads)){
            this.applyCommonStyle(this.content.ads[0].ad.style);
            var wrapperHTML = this.content.htmlWrapperTop + "<div id='wrapper-"+ this.apiKey + "'></div>" + this.content.htmlWrapperBottom;
            this.outputHTML(wrapperHTML);
            var wrapperRefElem = utils.activeFrameDocument().getElementById("wrapper-" + this.apiKey);
            for(var i=0;i<this.content.ads.length;i++){
                this.outputAd(this.content.ads[i].ad, wrapperRefElem);
            }
            wrapperRefElem.parentNode.removeChild(wrapperRefElem);
        } else if(this.content.hasOwnProperty('ad') && Object.getOwnPropertyNames(this.content.ad).length) {
            this.applyCommonStyle(this.content.ad.style);
            this.outputAd(this.content.ad);
        }
        this.filledWithAdsNativeAd = true;
        this.finish();
    };

    PlacementProcessor.prototype.renderNetworkAd = function(ad){
        var that = this;
        var triplelift_fallback = false, fm_fallback = false, sharethrough_network_filled = false,
            saymedia_fallback = false, nativo_fallback = false;

        this.thirdPartyElement = document.createElement('div');
        this.referenceElement.parentNode.insertBefore(this.thirdPartyElement, this.referenceElement);
        this.nativeAdElement = this.thirdPartyElement;

        var tagHTML = '<img src="'+ ad.trackingUrls.requests[0] +'" height="1" width="1" style="margin:0;padding:0;height:1px;width:1px;border:none;display:none;"/>';
        utils.dropTags(this.thirdPartyElement, tagHTML);

        /* Not an ideal implementation since we dont know for which placement
            this callback was called for.
        */
        window._an_adFill = function(network_handle){
            if(utils.indexOf.call(constants.standardIntegrations, network_handle) > -1 
                && network_handle == ad.providerName) {
                
                network_response_flag = true;
                that.networkAdFillListerner(network_handle);
            }
        }

        window._an_adNoFill = function(network_handle){
            if(utils.indexOf.call(constants.standardIntegrations, network_handle) > -1 
                && network_handle == ad.providerName) {

                network_response_flag = true;
                that.fallbackNetwork(network_handle);
            }
        }

        if(utils.indexOf.call(constants.standardIntegrations, ad.providerName) > -1){
            var network_response_flag = false,
                network_response_timeout = (ad.providerData && ad.providerData.timeout) ? ad.providerData.timeout : 1000;
            setTimeout(function(){
                /* Fallback regardless if we don't hear back from the network */
                if(!network_response_flag){
                    that.networkTimedout();
                }
            }, network_response_timeout);
        }

        var add_script_attribute = null;
        if(ad.providerName == 'connatix'){
            // Since connatix changed their location of tags from HEAD to BODY
            if (ad.headerTags) {
                ad.html = ad.headerTags;
                ad.headerTags = '';
            }

            utils.bindEvent(window, 'connatix_no_content', function() {
                that.fallbackNetwork('connatix');
            });

            utils.bindEvent(window, 'connatix_content_fill', function() {
                that.networkAdFillListerner('connatix');
            });

            add_script_attribute = { 'data-connatix-event': 'connatix_content_fill' };
        }

        if(constants.feedsArray.indexOf(ad.providerName) > -1) {
            var custom_fields = {};
            if(ad.hasOwnProperty('customFields') && !utils.isEmpty(ad.customFields)) {
                custom_fields = ad.customFields;
            }
            this.fetchNetworkCreative(ad.sid, ad.providerName, custom_fields);
        } else {
            utils.dropTags(this.thirdPartyElement, ad.html, function(){
                if(ad.providerName == 'medianet' || ad.providerName == 'dianomi'){
                    that.networkAdFillListerner(ad.providerName);
                } else if(ad.providerName == 'kixer'){
                    if (typeof __kx_ad_start == 'function') {
                        __kx_ad_start();
                        that.networkAdFillListerner('kixer');
                    }
                } else if(ad.providerName == 'triple_lift'){
                    window._an_noTripleLiftAdFill = function(){
                        triplelift_fallback = true;
                        that.fallbackNetwork('triple_lift');
                    }

                    setTimeout(function(){
                        if(!triplelift_fallback){
                            that.networkAdFillListerner('triple_lift');
                        }
                    }, 2000);
                }
                else if(ad.providerName == 'federated_media'){
                    setTimeout(function(){
                        if(!fm_fallback){
                            // We don't know for sure that FM didnt fill the inventory yet. Finishing for safety reasons though
                            that.networkAdFillListerner('federated_media');
                        }
                    }, 2000);
                }
                else if(ad.providerName == 'saymedia'){
                    setTimeout(function(){
                        if(!saymedia_fallback){
                            // We don't know for sure that SM didnt fill the inventory yet. Finishing for safety reasons though
                            that.networkAdFillListerner('saymedia');
                        }
                    }, 2000);
                }
                else if(ad.providerName == 'contentad'){
                    that.networkAdFillListerner('contentad');
                }
            }, add_script_attribute)
        }

        if(ad.providerName == 'saymedia'){
            window._an_noSayMediaAdFill = function(){
                that.fallbackNetwork('saymedia');
                saymedia_fallback = true;
            }
        }

        if(ad.providerName == 'federated_media'){
            window._an_noFMAdFill = function(){
                that.fallbackNetwork('federated_media');
                fm_fallback = true;
            }
        }

        if(ad.providerName == 'other') {
            that.networkAdFillListerner('other');
        }

        if(ad.providerName == 'sharethrough'){
            //Event handler
            var handler = function(e){
                var message = e.message || e.data;
                if(e.origin == 'http://btlr.sharethrough.com' && message){
                    var message_json = (window.JSON && window.JSON.parse) ? window.JSON.parse( message.trim() ) : (new Function("return " + message.trim()))();
                    if(message_json.response.creatives.length){
                        that.networkAdFillListerner('sharethrough');
                        sharethrough_network_filled = true;
                    } else {
                        that.fallbackNetwork('sharethrough');
                    }
                }
            };

            if(window.addEventListener){
                // Listen to message from child window
                window.addEventListener("message", handler, false);
            } else if(window.attachEvent) {
                window.attachEvent("onmessage", handler);
            }
        }

        if(ad.hasOwnProperty('headerTags') && ad.headerTags){
            utils.dropTags(document.getElementsByTagName('head')[0], ad.headerTags, function(){
                //Check if done
                if(ad.providerName == 'outbrain' || ad.providerName == 'taboola'){
                    that.networkAdFillListerner(ad.providerName);
                } else if(ad.providerName == 'nativo') {
                    var _an_nativo_fallback = _pr.prototype.Render_TemplateAd;
                    that.an_nativo_fill = false;
                    _pr.prototype.Render_TemplateAd = function(a){
                        if(!nativo_fallback && !that.placement_finished_processing){
                            that.an_nativo_fill = true;
                            that.networkAdFillListerner('nativo');
                            _an_nativo_fallback(a);
                        }
                    }
                    var _an_nativo_fallback2 = _pr.prototype.PushAd;
                    _pr.prototype.PushAd = function(a){
                        if(!nativo_fallback && !that.placement_finished_processing){
                            that.an_nativo_fill = true;
                            that.networkAdFillListerner('nativo');
                            _an_nativo_fallback2.call(PostRelease, a);
                        }
                    }
                    // Nativo tags make an API call to their ad server and we need to wait till the response is received
                    setTimeout(function(){
                        if(!that.an_nativo_fill && !that.placement_finished_processing){
                            nativo_fallback = true;
                            that.networkTimedout('nativo');
                        }
                    }, 800);
                }
            }, add_script_attribute)
        }
        if(ad.hasOwnProperty('footerTags') && ad.footerTags){
            utils.dropTags(document.getElementsByTagName('body')[0], ad.footerTags);
        }
    };

    PlacementProcessor.prototype.fallbackNetwork = function(network_handle){
        // Due to race condition with network's fill and no_fill callbacks it may end up calling
        // fallbackNetwork despite the network is filled, so this is the safety check to avoid double ads
        if(this.content.hasOwnProperty('networks') && this.content.networks && this.content.networks.length > this.current_network_index){
            var ad = this.content.networks[this.current_network_index];

            if(!this.placement_finished_processing 
                && ad.providerName == network_handle /* this is not the best way to check current provider in waterfall */ ){

                logger.log('console', 'fallback: ' + this.current_network_index + ' - ' + ad.providerName + ' (zid: ' + this.apiKey + ')');

                var tagHTML = '<img src="'+ ad.trackingUrls.nofills[0] +'" height="1" width="1" style="margin:0;padding:0;height:1px;width:1px;border:none;display:none;"/>';
                utils.dropTags(this.thirdPartyElement, tagHTML);
                
                if(this.content.networks.length > (this.current_network_index + 1)){
                    this.cleanupNetwork();
                    this.current_network_index ++;
                    this.renderNetworkAd(this.content.networks[this.current_network_index]);
                } else if(!utils.isEmpty(this.content.ad) && this.content.ad.hasOwnProperty('html')) {
                    this.cleanupNetwork();
                    this.renderNativePlacement();
                } else {
                    this.finish(false);
                }
            }
        }
    };

    PlacementProcessor.prototype.networkAdFillListerner = function(network_handle){
        if(this.content.hasOwnProperty('networks') && this.content.networks && this.content.networks.length > this.current_network_index){
            var ad = this.content.networks[this.current_network_index];

            if(!this.placement_finished_processing 
                && ad.providerName == network_handle){

                logger.log('console', 'filled and done: ' + this.current_network_index + ' - ' + ad.providerName + ' (zid: ' + this.apiKey + ')');
                if(ad.hasOwnProperty('trackingTags'))
                    utils.dropTags(this.thirdPartyElement, ad.trackingTags);
                this.finish();
            }
        }
    }

    PlacementProcessor.prototype.networkTimedout = function(){
        if(this.content.networks && this.content.networks.length > this.current_network_index){        
            var ad = this.content.networks[this.current_network_index];
            var tagHTML = '<img src="'+ ad.trackingUrls.timeout[0] +'" height="1" width="1" style="margin:0;padding:0;height:1px;width:1px;border:none;display:none;"/>';
            utils.dropTags(this.thirdPartyElement, tagHTML);

            utils.broadcastEvent(document, ad.providerName + '_timeout');
            logger.log('console', 'timeout: ' + this.current_network_index + ' - ' + ad.providerName + ' (zid: ' + this.apiKey + ')');
            this.fallbackNetwork(ad.providerName);
        }
    };

    PlacementProcessor.prototype.fetchNetworkCreative = function(sid, providerName, custom_fields){
        var that = this;
        var providerData = '';

        var renderNetworkFeedAd = function(callbackData){
            logger.log('console', callbackData);
            if(callbackData && callbackData.status == 'OK'
                && callbackData.ads && callbackData.ads.length > 0) {
                that.applyCommonStyle(callbackData.ads[0].style);
                that.outputAd(callbackData.ads[0]);
                that.finish();
            } else {
                that.fallbackNetwork(providerName);
            }
        };

        if(providerName == 'admarketplace_feed'){
            var k = utils.get_document_keywords(4);
            if(k == ''){
                this.fallbackNetwork(providerName);
                return;
            }
            custom_fields['kw'] = k;
        }

        var data = {
            'sid': sid,
            'kw': (custom_fields.hasOwnProperty('kw')) ? custom_fields['kw'] : '',
            'pub_id': (custom_fields.hasOwnProperty('pub_id')) ? custom_fields['pub_id'] : '',
            'placement_id': (custom_fields.hasOwnProperty('placement_id')) ? custom_fields['placement_id'] : '',
            'platform': (custom_fields.hasOwnProperty('platform')) ? custom_fields['platform'] : '',
            'device': (custom_fields.hasOwnProperty('device')) ? custom_fields['device'] : '',
            'num_ads': (custom_fields.hasOwnProperty('num_ads')) ? custom_fields['num_ads'] : 1,
            'ip': session.urlParams.hasOwnProperty('ip') ? session.urlParams['ip'] : ''
        }

        if(providerName == 'criteo_feed'){
            var counter = 0,
                sleepTime = 10,
                maxIterations = 40;
            window.checkClientSideResponse = function() {
                if(counter == 0) profiler.start('CRITEO EXTRA WAIT TIME');

                counter++;
                if (typeof window.clientSideData !=='undefined' && that.apiKey in window.clientSideData){
                    profiler.end('CRITEO EXTRA WAIT TIME');
                    var clientAd = window.clientSideData[that.apiKey];
                    logger.log('console', clientAd);
                    if(clientAd.response_status == 0) {
                        data['provider_data'] = btoa(JSON.stringify(clientAd));
                        async.getJSONP(
                            settings.apiUrl + '/v1/proxy/'+providerName+'/?' + utils.encodeQueryData(data),
                            renderNetworkFeedAd
                        );
                        return true;
                    }
                    logger.log('console', 'Criteo returned 0 ads: using fallback');
                    that.fallbackNetwork(providerName);
                    return false;
                } else {
                    if(counter >= maxIterations) {
                        profiler.end('CRITEO EXTRA WAIT TIME');
                        logger.log('console', 'Criteo failed to respond in time: using fallback');
                        that.networkTimedout()
                        return false;
                    }
                    window.setTimeout('window.checkClientSideResponse();', sleepTime);
                }
            };
            window.checkClientSideResponse();
        } else {
            async.getJSONP(
                settings.apiUrl + '/v1/proxy/'+providerName+'/?' + utils.encodeQueryData(data),
                renderNetworkFeedAd
            )
        }
    };

    PlacementProcessor.prototype.cleanupNetwork = function(){
        if(this.thirdPartyElement && this.thirdPartyElement.parentNode) {
            this.thirdPartyElement.parentNode.removeChild(this.thirdPartyElement);
        }
    };

    PlacementProcessor.prototype.finish = function(ad_filled_status){

        if(arguments.length == 0)
            var ad_filled_status = true;
        if(settings.userCallbackOnAdLoad)
            settings.userCallbackOnAdLoad(ad_filled_status);
        if(this.inview){
            utils.broadcastEvent(document, 'adsnative.mrc50.view:in');
        }
        logger.log('console', 'Finished: ');
        if(this && this.referenceElement && this.referenceElement.parentNode){
            this.referenceElement.parentNode.removeChild(this.referenceElement);
        } else {
            logger.log('console', 'No reference element found');
        }
        this.placement_finished_processing = true;
    };

    PlacementProcessor.prototype.getAdObject = function(){
        var adObject = null;
        if(this.status && this.content.hasOwnProperty('ad')){
            /* Warning: This doesn't handle num_ads > 1 use case. */
            adObject = {
                "cid": this.content.cid,
                "crid": this.content.crid,
                "zid": this.content.zid,
                "sid": this.content.ad.sid,
                "type": this.content.ad.type
            }
            if(this.content.ad.trackingUrls.hasOwnProperty('actions'))
                adObject['actionTrackingUrls'] = this.content.ad.trackingUrls.actions;
            if(this.content.ad.hasOwnProperty('customFields') && !utils.isEmpty(this.content.ad.customFields))
                adObject['customFields'] = this.content.ad.customFields;
            if(this.content.ad.hasOwnProperty('leadGenUrl'))
                adObject['leadGenUrl'] = this.content.ad.leadGenUrl;
        } 

        return adObject;
    }

    PlacementProcessor.prototype.processPlacement = function(){
        //This is for video lightbox
        //ANResponses.addResponse(content.zid, content)

        logger.log('console', this.content);

        //Don't callback yet if status = OK since network ads may not fill
        if(settings.userCallbackOnAdLoad && this.content.status != 'OK'){
            settings.userCallbackOnAdLoad(( this.content.status == 'OK'), null);
        }

        if(this.config) {
            if(this.config.hasOwnProperty('callback'))
                this.config['callback']((this.content.status == 'OK'), this.getAdObject());
        }

        if(settings.blockAdDisplay)
            return;

        if (!this.status){
            //*** Will be deprecated
            if(settings.callbackOnNoAds)
                settings.callbackOnNoAds();
            //***
            if(this.content.hasOwnProperty('message')){
                if(this.content.message != 'no active campaigns found' && this.content.message != 'ad-unit is not active')
                    logger.log('warning', this.content.message);
            } else
                logger.log('warning', 'An unknown error occurred.');
            return;
        }

        if(settings.nativeAdElementId){
            this.referenceElement = utils.activeWindowDocument().getElementById(settings.nativeAdElementId);
            if(!this.referenceElement){
                logger.log('warning', 'Given nativeAdElementId not found.');
                return;
            }
        } else if(settings.cssPath){
            this.checkCSSPathAndRender(settings.cssPath);
            return;
        } else {
            if(settings.autoPosition) {
                var cssPath;
                if(this.content.hasOwnProperty('cssPath') && this.content.cssPath){
                    cssPath = this.content.cssPath;
                } else {
                    logger.log('warning', 'No CSS path configured for this page.');
                    return;
                }

                this.checkCSSPathAndRender(cssPath);
                return;
            } else {
                if(this.config) {
                    if(this.config.hasOwnProperty('nativeAdElementId') && this.config.nativeAdElementId){
                        this.referenceElement = utils.activeWindowDocument().getElementById(this.config['nativeAdElementId']);
                        if(!this.referenceElement){
                            logger.log('warning', 'Given nativeAdElementId not found for apiKey');
                            return;
                        }
                    } else if(this.config.hasOwnProperty('cssPath') && this.config.cssPath) {
                        this.checkCSSPathAndRender(this.config.cssPath);
                        return;
                    }
                } else {
                    if(settings.apiKey)
                        this.referenceElement = document.getElementById('adsnative-dummy-' + this.apiKey);
                    else
                        this.referenceElement = document.getElementById('adsnative-dummy-' + settings.widgetId);
                }
            }
        }

        this.startRender();
    };

    PlacementProcessor.prototype.checkCSSPathAndRender = function(cssPath){
        if(session.isScriptInBody){
            var status = this.insertReferenceElement(cssPath);
            if(!status) {
                this.waitPositionAdAndRender(cssPath);
            } else {
                this.startRender();
            }
        } else {
            this.waitPositionAdAndRender(cssPath);
        }
    };

    PlacementProcessor.prototype.waitPositionAdAndRender = function(cssPath){
        var that = this;
        profiler.start('WAIT TO RENDER');
        //Wait till DOM is ready
        $an.fn.ready(function() {
            profiler.end('WAIT TO RENDER');
            that.positionAdAndRender(cssPath);
        });
    };

    PlacementProcessor.prototype.positionAdAndRender = function(cssPath){
        var status = this.insertReferenceElement(cssPath),
            that = this;

        if(!status) {
            that.reTryCounter = 0;
            // If CSS path not found on first try. Retry for the next 4 seconds with 200ms intervals before giving up
            var reTryCssPathTimer = setInterval(function() {
                status = that.insertReferenceElement(cssPath);

                if(status) {
                    clearInterval(reTryCssPathTimer);
                    that.startRender();
                } else {
                    that.reTryCounter++;
                    if(that.reTryCounter >= 20) {
                        clearInterval(reTryCssPathTimer);
                        logger.log('warning', 'Configured CSS path not found on this page.');
                    }
                }
            }, 200);
            return;
        }
        this.startRender();
    };

    PlacementProcessor.prototype.startRender = function(){
        if(this.content.hasOwnProperty('networks') && this.content.networks.length)
            this.renderNetworkAd(this.content.networks[0]);
        else if(this.content.hasOwnProperty('ad') && this.content.ad.hasOwnProperty('customFields') && this.content.ad.customFields.hasOwnProperty('network_feed')){
            //TODO: This case should be deprecated once AOL campaign settings are changed.
            var custom_fields = {};
            if(this.content.ad.hasOwnProperty('customFields') && !utils.isEmpty(this.content.ad.customFields)) {
                custom_fields = this.content.ad.customFields;
            }
            this.fetchNetworkCreative(this.content.sid, this.content.ad.customFields.network_feed, custom_fields);
        } else {
            this.renderNativePlacement();
        }
    };

    PlacementProcessor.prototype.insertReferenceElement = function(cssPath){
        profiler.start('CSS PATH SEARCH');
        //Let's anchor an element so we can hold on to our position
        var tempElement = this.win_doc.createElement('div');

        var response = utils.checkCSSPath(cssPath);
        if(!response)
            return false

        if(response.position == 'after'){
            response.currentElement.parentNode.insertBefore(tempElement, response.currentElement.nextSibling);
        } else if (response.position == 'append'){
            response.currentElement.appendChild(tempElement);
        } else
            response.currentElement.parentNode.insertBefore(tempElement, response.currentElement);

        this.referenceElement = tempElement;

        profiler.end('CSS PATH SEARCH');
        return true;
    };

    
    function _writeDummyDiv(){
        var arrScripts = document.getElementsByTagName('script');
        var currScript = arrScripts[arrScripts.length - 1];
        var dummyElem = document.createElement('div');
        var elemId = 'adsnative-dummy-';
        if(settings.apiKey)
            elemId += settings.apiKey;
        else if(settings.widgetId)
            elemId += settings.widgetId;
        dummyElem.id = elemId;
        currScript.parentNode.insertBefore(dummyElem, currScript.nextSibling);
        return elemId;
    }

    function _getApplicablePlacements(apiKey, callback){
        if(utils.getPageHostName(settings.currentPageUrl)){
            var url = settings.domainLookupUrl +
                    settings.domainLookupEndpoint +
                    utils.getPageHostName(settings.currentPageUrl) + '/?';

            if(apiKey && (typeof apiKey === "string" || apiKey instanceof String)){
                var callbackHandler = 'lookup_' + apiKey.positiveIntegerHash();
            } else {
                var callbackHandler = 'lookup';
            }
            logger.log('console', 'Loading host file from: ' + url + 'callback=' + callbackHandler);
            async.getJSONP(url, callback, callbackHandler);
        } else {
            callback([]);
        }
    }

    function _getAdData(tag_settings, numAds, keywords, callback, keyValues) {
        var that = this;
        var _callback;
        if(arguments.length > 3 && callback){
            _callback = function(callbackData){
                profiler.end('GET AD DATA');
                //Catch-all try-catch so we can send any error we get to sentry
                try {
                    if(callback)
                        callback(callbackData);
                } catch(e){
                    logger.log('error', "name: " + e.name + " message: " + e.message, e);
                }
            };
        } else {
            _callback = function(callbackData){
                profiler.end('GET AD DATA');
                //Catch-all try-catch so we can send any error we get to sentry
                //try {
                    _render(callbackData);
                // } catch(e){
                //     logger.log('error', "name: " + e.name + " message: " + e.message, e);
                // }
            };
        }

        var getAdUnitsByCSSPath = function(data){
            profiler.start('DOMAIN LOOKUP CHECK');
            var adUnits = [];
            for(var i=0;i<data.length;i++){
                if(utils.checkCSSPath(data[i].cssPath)){
                    adUnits.push(data[i].zid);
                }
            }
            logger.log('console', 'CSS path found: ');
            logger.log('console', adUnits);
            return adUnits;
        }

        var getAdUnitsAndLoadAds = function(apiKey, data){
            var adUnits = [];
            if(apiKey || !utils.getPageHostName(settings.currentPageUrl)){
                _loadAds([apiKey], data);
            } else {
                if(tag_settings.widgetId && tag_settings.networkKey){
                    var adUnits = [];
                    for(var i=0;i<data.length;i++){
                        if(data[i].hasOwnProperty('widgetId')
                            && data[i].widgetId == tag_settings.widgetId
                            && data[i].hasOwnProperty('networkKey')
                            && data[i].networkKey == tag_settings.networkKey){
                            adUnits.push(data[i].zid);
                            break;
                        }
                    }
                    _loadAds(adUnits, data, true);
                } else {
                    if(!session.isScriptInBody){
                        profiler.start('SCRIPT IN BODY WAIT');
                        $an.fn.ready(function(){
                            profiler.end('SCRIPT IN BODY WAIT');
                            _loadAds(getAdUnitsByCSSPath(data), data);
                        });
                    } else {
                        _loadAds(getAdUnitsByCSSPath(data), data)
                    }
                }
            }
        };

        var _loadAds = function(adUnits, data, is_widget_network_case){
            if(adUnits.length){
                _preloadClientAdData(adUnits, data);
                if(arguments.length > 2 && is_widget_network_case)
                    _callAdData(null, numAds, keywords, _callback, keyValues);
                else
                    _callAdData(adUnits, numAds, keywords, _callback, keyValues);
            } else if(arguments.length > 2 && is_widget_network_case) {
                logger.log('console', 'Placements not found in criteo lookup. Fetching ad directly');
                _callAdData(null, numAds, keywords, _callback, keyValues);
            } else {
                logger.log('console', 'No valid placements found for this domain');
            }
        };

        profiler.start('HOST FILE FETCH');
        if(tag_settings.widgetId && tag_settings.networkKey && constants.criteoExceptions.indexOf(tag_settings.networkKey) > -1){
            /* No need to do domain lookup */
            _callAdData(null, numAds, keywords, _callback, keyValues);
        } else { 
            /* Do domain lookup for all since we also need to check whether to run criteo */
            _getApplicablePlacements(tag_settings.apiKey, function(data){
                profiler.end('HOST FILE FETCH');
                if(!data || !data.length){
                    logger.log('console', 'No active placements in host file');
                }
                logger.log('console', 'Domain placements: ');
                logger.log('console', data);
                getAdUnitsAndLoadAds(tag_settings.apiKey, data);
            });
        }
    }

    function _preloadClientAdData(adUnits, data){
        window.clientSideData = window.clientSideData || {};

        var _fetchClientSideAdData = function(zid, url){
            profiler.start('PRELOAD CLIENT-SIDE AD DATA: ' + zid);
            async.getJSONP(url, function(clientData){
                profiler.end('PRELOAD CLIENT-SIDE AD DATA: ' + zid);
                window.clientSideData[zid] = clientData;
            });
        };

        for(var i=0;i<data.length;i++){
            if(adUnits.indexOf(data[i].zid) > -1 && data[i].clientUrl) {
                _fetchClientSideAdData(data[i].zid, data[i].clientUrl);
            } else {
                window.clientSideData[data[i].zid] = {}
            }
        }
    }

    function _callAdData(adUnits, numAds, keywords, callback, keyValues){
        var data = {'force_mobile': (settings.forceMobile ? 1 : 0)},
            queryString = [],
            apiKeyQuery = '',
            len;

        if(adUnits) {
            len = adUnits.length;
            while(len--) {
                queryString.push('zid=' + adUnits[len]);
            }
        } else {
            data.widget_id = settings.widgetId;
            data.network_key = settings.networkKey;
            if(settings.safetyLevel)
                data.safety_level = settings.safetyLevel;
            data.url = settings.currentPageUrl;
            for(var i=0;i<settings.categories.length;i++){
                queryString.push('cat=' + settings.categories[i]);
            }
        }

        if(settings.templateKey)
            data.template_key = settings.templateKey;

        function addKeyValues(keyValues){
            for (var key in keyValues) {
                var values = keyValues[key].split(",");
                key = (key.indexOf('ck_') === 0) ? key : 'ck_' + key;
                for(var i=0;i<values.length;i++)
                    queryString.push(key + '=' + values[i].trim());
            }
        }

        if(arguments.length > 4 && typeof keyValues !== 'undefined' && keyValues){
            addKeyValues(keyValues);
        } 
        if(settings.keyValues){
           addKeyValues(settings.keyValues);
        }

        apiKeyQuery = queryString.join('&');

        if(keywords)
            data.kw = keywords;

        if(numAds > 0)
            data.num_ads = numAds;

        if(!data.hasOwnProperty('url') || !data.url){
            try {
                if(window.top.document && window.top != window.self && typeof window.top.location.href !== 'undefined' && window.top.location.href){
                    data.url = window.top.location.href;
                    data.ref = window.top.document.referrer;
                } else {
                    data.url = window.location.href;
                    data.ref = document.referrer;
                }
            } catch(err) {
                data.url = window.location.href;
                data.ref = document.referrer;
            }
        }

        if(session.isPreviewMode){
            if(session.forceCampaignID){
                data.preview = 1;
                data.cid = session.forceCampaignID;
            }
            if(session.forceCreativeID){
                data.crid = session.forceCreativeID;
            }
            if(session.forceBidUrl){
                data.mock_bid_urls = session.forceBidUrl;
                data.mock_api_version = (session.forceBidVersion) ? session.forceBidVersion : 'v23';
            }
        }

        var url = settings.apiUrl +
            settings.apiEndpoint + '?' +
            apiKeyQuery + '&' +
            utils.encodeQueryData(data);

        logger.log('console', 'Loading ad data from: ' + url);
        profiler.start('GET AD DATA');
        async.getJSONP(url, callback);
    }

    function _render(callbackData){
        session.apiData = callbackData;
        _processResponse(callbackData);
    };

    function _processResponse(adunits_content){
        profiler.start('TOTAL RENDER');

        if(adunits_content instanceof Array) {
            for(var i=0;i<adunits_content.length;i++){
                var config = null;
                if(adunits_content[i].hasOwnProperty('zid')){
                    config = session_helper.popPlacementConfig(adunits_content[i].zid)
                }
                var p = new PlacementProcessor(adunits_content[i], config);
                p.processPlacement();
            }
        } else {
            var config = null;
            if(adunits_content.hasOwnProperty('zid')){
                config = session_helper.popPlacementConfig(adunits_content.zid)
            }
            var p = new PlacementProcessor(adunits_content, config);
            p.processPlacement();
        }

        profiler.end('TOTAL RENDER');
        profiler.end('TOTAL CLIENT');
        profiler.timeSincePageStart('TOTAL OVERALL');
    }

    //**** JS API: Start ****//

    window.AdsNative = function(_apiKey, _keywords, _keyValues){
        var __construct = function(that) {
            that.apiKey = _apiKey;
            if(_keywords !== 'undefined')
                that.keywords = _keywords;
            else
                that.keywords = '';
            if(_keyValues !== 'undefined')
                that.keyValues = _keyValues;
            else
                that.keyValues = null;
            that.status = false;
            that.adRendered = false;
        }(this);
    };

    window.AdsNative.prototype.fetchAd = function(callback){
        var that = this;
        _getAdData({ 'apiKey': this.apiKey }, 1, (settings.keywords ? settings.keywords : this.keywords), function(callbackData){
            that.callbackData = callbackData;
            that.placementProcessor = new PlacementProcessor(that.callbackData);
            if(callbackData.hasOwnProperty('status') && callbackData.status == 'OK'){
                that.status = true;
                that.adRendered = false;
            }
            callback(that.status, that.placementProcessor.getAdObject());
        }, (settings.keyValues ? settings.keyValues : this.keyValues));
    };

    window.AdsNative.prototype.displayAd = function(elementId){
        if(!this.status){
            logger.log('console', 'Placement ' + this.apiKey + ' : No valid campaign returned');
            return false;
        }
        if(this.adRendered){
            logger.log('console', 'Placement ' + this.apiKey + ' : This ad unit already rendered. A placement can be rendered only once.');
            return false;
        }

        this.elementId = document.getElementById(elementId);
        if(!this.elementId){
            logger.log('console', 'Placement ' + this.apiKey + ' : Element not found');
            return false;
        }

        this.placementProcessor.referenceElement = this.elementId;
        this.placementProcessor.startRender();
        this.adRendered = true;
        return true;
    }

    window.AdsNative.prototype.refresh = function(){
        var placementElement;
        var that = this;
        if(this.status && this.adRendered){
            placementElement = this.placementProcessor.nativeAdElement;
        } else if(this.elementId){
            placementElement = this.elementId;
        } else {
            logger.log('console', 'Placement ' + this.apiKey + ' : The placement was never fetched so cannot be refreshed.');
            return false;
        }

        this.fetchAd(function(status){
            that.placementProcessor.referenceElement = placementElement;
            that.placementProcessor.startRender();
        });
        return true;
    }

    //**** JS API: End ****//

    this.load = function(){
        logger.log('console', 'RenderJS Loaded!');

        if(settings.onready)
            settings.onready();

        if(settings.blockAdLoad)
            return;

        if(settings.hasOwnProperty('adUnits')){
            for(var i in settings.adUnits){
                var adUnit = settings.adUnits[i];
                if(adUnit.hasOwnProperty('apiKey') && adUnit.apiKey){
                    session_helper.pushPlacementConfig(adUnit);
                    var keywords=[],keyValues={},numAds=1; 
                    if(adUnit.hasOwnProperty('keywords') && adUnit.keywords){
                        keywords = adUnit.keywords;
                    }
                    if(adUnit.hasOwnProperty('keyValues') && adUnit.keyValues){
                        keyValues = adUnit.keyValues;
                    }
                    if(adUnit.hasOwnProperty('numAds') && adUnit.numAds){
                        numAds = adUnit.numAds;
                    }
                    _getAdData({ 'apiKey': adUnit.apiKey }, numAds, keywords, null, keyValues);
                }
            }
        } else {
            if((settings.apiKey || (settings.widgetId && settings.networkKey)) && !settings.nativeAdElementId && !settings.cssPath && !settings.autoPosition){
                _writeDummyDiv();
            }
            _getAdData(settings, settings.numAds, settings.keywords);
        }
    };

    //**** JS API (Legacy): Start ****//

    this.fetchAds = function(_apiKeys, _keywords, _callback){
        var that = this;
        settings.blockAdDisplay = true;
        for(var i=0; i < _apiKeys.length; i++){
            _getAdData({ 'apiKey': _apiKeys[i] }, 1, (settings.keywords ? settings.keywords : _keywords), function(callbackData){
                var status = false;
                var apiKey = null;
                var adObject = {};
                if(callbackData.hasOwnProperty('zid'))
                    apiKey = callbackData.zid;
                if(callbackData.hasOwnProperty('status') && callbackData.status == 'OK'){
                    status = true;
                    if(!session.adUnits.hasOwnProperty(apiKey)){
                        session.adUnits[apiKey] = new PlacementProcessor(callbackData);
                    }
                    adObject = {
                        "type": callbackData.ad.type,
                        "url": callbackData.ad.url,
                        "embedUrl": callbackData.ad.embedUrl,
                        "title": callbackData.ad.title,
                        "summary": callbackData.ad.summary,
                        "brand_name": callbackData.ad.promotedBy,
                        "image": callbackData.ad.imageSrc
                    }
                }
                _callback(status, apiKey, adObject);
            });
        }
    };

    this.displayAd = function(_apiKey, _elementId){
        var placementProcessor;
        if(session.adUnits.hasOwnProperty(_apiKey) && session.adUnits[_apiKey])
            placementProcessor = session.adUnits[_apiKey];
        else {
            logger.log('console', 'Unable to display placement. Ad response is not available.')
            return
        }
        var element = document.getElementById(_elementId);
        placementProcessor.referenceElement = element;
        placementProcessor.startRender();
    };

    this.renderAd = function(_elementId, _keywords, _callback, _apiKey){
        var that = this;
        this.fetchAds([_apiKey], _keywords, function(status, apiKey){
            if(status){
                that.displayAd(apiKey, _elementId);
            }
            _callback(status);
        })
    };

    this.getVersion = function (){
        return settings.version;
    };

    //**** JS API (Legacy): End ****//
};

// Start the default processes

//This instance is for default behaviour and it queues all instances in case there are multiple tags on the page
if(typeof _AdsNativeQ === 'undefined'){
    var _AdsNativeQ = [];
    var _AdsNativeOptsQ = [];
}

function startProcessing(opts){
    _AdsNativeOptsQ.push(opts);
    _AdsNativeQ.push(new AdsNativeMaster(_AdsNativeOptsQ[_AdsNativeOptsQ.length - 1]));
    _AdsNativeQ[_AdsNativeQ.length - 1].load();
}

/* _AdRenderOpts is for white-labelled clients */
if(typeof window._AdsNativeOpts === 'undefined' && typeof window._AdRenderOpts === 'undefined'){
    window._AdsNativeOpts = { autoPosition: true };
    startProcessing(window._AdsNativeOpts);
} else {
    if (typeof window._AdsNativeOpts !== 'undefined'){
        if(!window._AdsNativeOpts.hasOwnProperty('apiKey') && !window._AdsNativeOpts.hasOwnProperty('widgetId') && !window._AdsNativeOpts.hasOwnProperty('adUnits') && !window._AdsNativeOpts.hasOwnProperty('blockAdLoad') ){
            window._AdsNativeOpts.autoPosition = true;
        }
        startProcessing(window._AdsNativeOpts);
    } else if(typeof window._AdRenderOpts !== 'undefined'){
        if(!window._AdRenderOpts.hasOwnProperty('apiKey') && !window._AdRenderOpts.hasOwnProperty('widgetId') && !window._AdRenderOpts.hasOwnProperty('adUnits') && !window._AdRenderOpts.hasOwnProperty('blockAdLoad') ){
            window._AdRenderOpts.autoPosition = true;
        }
        startProcessing(window._AdRenderOpts);
    }
}


//This instance is for out facing Legacy JS SDK API
if(typeof window._AdsNative === 'undefined'){
    window._AdsNative = new AdsNativeMaster({ blockAdLoad: true });
    window._AdsNative.load();
}

AdsNativeCookieDrop.dropCookieMatchingPixel();

}());
