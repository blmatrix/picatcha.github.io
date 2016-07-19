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

var utils = new function() {
    'use strict';

    var hostname = '',
    urlParams = null;

    this.activeWindow = function(){
        var win = window;
        try {
            //this.isPreview() is to check for adsnative mobile immulator, which uses iframe
            if(window.top.document && !this.isPreview() && window.top != window.self){
                win = window.top;
                //Access the document just to force check the access
                var doc = win.document;
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
        try {
            if(window.top.document)
                hostname = window.top.document.location.host;
            else
                hostname = window.document.location.host;
        } catch(err){
            hostname = window.document.location.host;
        }
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
        if(this.isPreview() && this.isPreviewGenerator()){
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
        return null
    };

    this.getURLParams = function() {
        if(urlParams)
            return urlParams
        var match,
            pl     = /\+/g,
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query;

        try {
            query = this.activeWindow().location.search.substring(1);
        } catch(err){
            query = window.location.search.substring(1);
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

    this.checkCSSPath = function(cssPath){
        var win_doc = this.activeWindowDocument();

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
                currentTag.style.cssText = 'margin:0;padding:0;height:1px;width:1px;border:none;float:left;display:block;';
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

    this.getWindowSize = function(Name) {
        /*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
        var size;
        var name = Name.toLowerCase();
        var win = this.activeWindow();
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
        ifrm.contentWindow.postMessage(msg, url);
    }

}

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

    this.getJSONP = function(url, callback, callback_handle) {
        var rand;
        if(arguments.length > 2){
            rand = callback_handle;
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

var AdsNativeCookieDrop = new function(){
    this.dropCookieMatchingPixel = function(){
        var pixel = document.createElement('img');
        pixel.src = utils.urlPrefix() + '//rudy.adsnative.com/cm.gif';
        pixel.style.cssText = 'height:1px;width:1px;border:none;display:block;';
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
        apiUrl: utils.urlPrefix() + '//api.adsnative.com',
        apiEndpoint: '/v1/ad-template.json',
        domainLookupUrl: utils.urlPrefix() + '//d2b3uqm49lqeua.cloudfront.net',
        domainLookupEndpoint: '/v1/host/',
        apiKey: '',
        apiData: null,
        staticUrl: utils.urlPrefix() + '//static.adsnative.com/static/',
        version: '1.0',
        subversion: '1.411',
        onready: null,
        userCallbackOnAdLoad: null,
        processNativeAdElement: null,
        numAds: 0,
        forceMobile: false,
        callbackOnNoAds: null,
        blockAdLoad: false,
        blockAdDisplay: false,
        nativeAdElementId: null,
        keywords: null,
        autoPosition: false,
        preview: false,
        /* Enterprise Integration Options */
        networkKey: null,
        currentPageUrl: null,
        categories: null,
        widgetId: null,
        safetyLevel: null,
        inviewEvent: null,
        outviewEvent: null,
        templateKey: null,
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

    var tracker = new function(){
        function _isElementInViewport(el) {
            // Original solution from http://stackoverflow.com/a/7557433/5628
            // Mod:  Return true if el is 50% in view port.
            var rect = el.getBoundingClientRect();

            var area = rect.height * rect.width;
            var inview_height = Math.min(rect.height, rect.bottom, (window.innerHeight || document.documentElement.clientHeight) - rect.top);
            var inview_width = Math.min(rect.width, rect.right, (window.innerWidth || document.documentElement.clientWidth) - rect.left);

            var inview_area = inview_height * inview_width;
            return ((inview_area / area) >= 0.5);
        };

        function _isVisible(el, t, r, b, l, w, h) {
            var p = el.parentNode,
                    VISIBLE_PADDING = 2;

            if ( !_elementInDocument(el) ) {
                return false;
            }

            //-- Return true for document node
            if ( "BODY" === p.tagName ) {
                return true;
            }

            //-- Return false if our element is invisible
            if (
                 '0' === _getStyle(el, 'opacity') ||
                 'none' === _getStyle(el, 'display') ||
                 'hidden' === _getStyle(el, 'visibility')
            ) {
                return false;
            }

            if (
                'undefined' === typeof(t) ||
                'undefined' === typeof(r) ||
                'undefined' === typeof(b) ||
                'undefined' === typeof(l) ||
                'undefined' === typeof(w) ||
                'undefined' === typeof(h)
            ) {
                t = el.offsetTop;
                l = el.offsetLeft;
                b = t + el.offsetHeight;
                r = l + el.offsetWidth;
                w = el.offsetWidth;
                h = el.offsetHeight;
            }
            //-- If we have a parent, let's continue:
            if ( p ) {
                //-- Check if the parent can hide its children.
                if ( ('hidden' === _getStyle(p, 'overflow') || 'scroll' === _getStyle(p, 'overflow')) ) {
                    //-- Only check if the offset is different for the parent
                    if (
                        //-- If the target element is to the right of the parent elm
                        l + VISIBLE_PADDING > p.offsetWidth + p.scrollLeft ||
                        //-- If the target element is to the left of the parent elm
                        l + w - VISIBLE_PADDING < p.scrollLeft ||
                        //-- If the target element is under the parent elm
                        t + VISIBLE_PADDING > p.offsetHeight + p.scrollTop ||
                        //-- If the target element is above the parent elm
                        t + h - VISIBLE_PADDING < p.scrollTop
                    ) {
                        //-- Our target element is out of bounds:
                        return false;
                    }
                }
                //-- Add the offset parent's left/top coords to our element's offset:
                if ( el.offsetParent === p ) {
                    l += p.offsetLeft;
                    t += p.offsetTop;
                }
                //-- Let's recursively check upwards:
                return _isVisible(p, t, r, b, l, w, h);
            }
            return true;
        }

        //-- Cross browser method to get style properties:
        function _getStyle(el, property) {
            if ( window.getComputedStyle ) {
                return document.defaultView.getComputedStyle(el,null)[property];
            }
            if ( el.currentStyle ) {
                return el.currentStyle[property];
            }
        }

        function _elementInDocument(element) {
            while (element = element.parentNode) {
                if (element == document) {
                    return true;
                }
            }
            return false;
        }

        this.inViewCheck = function(el, viewTag) {
            var count = 0;
            var timer = setInterval(function() {
                if (_isElementInViewport(el) && _isVisible(el)) {
                    count++;
                } else {
                    count = 0;
                }
                if (count >= 9) {
                    utils.dropTags(el, viewTag);
                    clearInterval(timer);
                    logger.log('console', 'view logged!');
                }
            }, 100);
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

    }();

    function isMobile(){
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || settings.forceMobile);
    }

    function PlacementProcessor(_content){
        this.status = false;
        this.apiKey = null;
        this.current_network_index = 0;
        this.placement_finished_processing = false;

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

            //logger.log('console', that.content);

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

    PlacementProcessor.prototype.outputAd = function(ad){
        var tempElement = document.createElement('div');
        tempElement.innerHTML = ad.html;
        var nativeAdElement;
        if(tempElement.childNodes.length > 1){
            nativeAdElement = tempElement;
            if (ad.backgroundColor) {
                nativeAdElement.style.backgroundColor = ad.backgroundColor;
            }
            this.referenceElement.parentNode.insertBefore(nativeAdElement, this.referenceElement);
        } else {
            nativeAdElement = tempElement.firstChild;
            if (ad.backgroundColor) {
                nativeAdElement.style.backgroundColor = ad.backgroundColor;
            }
            this.referenceElement.parentNode.insertBefore(nativeAdElement, this.referenceElement);
        }

        if(ad.hasOwnProperty('trackingTags'))
            utils.dropTags(nativeAdElement, ad.trackingTags);

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

        this.setupClick(ad, nativeAdElement);

        //Track viewability
        if(ad.hasOwnProperty('viewableTags') && !(settings.inviewEvent && settings.outviewEvent))
            tracker.inViewCheck(nativeAdElement, ad.viewableTags);

        this.nativeAdElement = nativeAdElement;

        this.addVideoDetectiveListner(nativeAdElement);
    };

    PlacementProcessor.prototype.setupClick = function(ad, adElement){
        var origClientHeight = this.origClientHeight;
        var that = this;
        adElement.onclick = function (event) {
            if (event.target.className.indexOf("adsnative-privacy-button") > -1) {
                return true;
            }
            else if (event.target.className.indexOf("adsnative-share-button") === -1 && event.target.className.indexOf("adsnative-cta-button") === -1 && event.target.className.indexOf("adsnative-read-more") === -1) {
                return that.onUserClick(ad, adElement, origClientHeight);
            }
        };
        if(!utils.anyClickTags(adElement) && (ad.url || (ad.type == "video" && !ad.inlineVideo))) {
            adElement.style.cursor = "pointer";
        }
    };

    PlacementProcessor.prototype.onUserClick = function(ad, adElement, origClientHeight){
        // This is for a legacy approach (Cheezeburger approach)
        if(ad.type == "video" && session.apiData && session.adUnits.hasOwnProperty(session.apiData.zid) && session.adUnits[session.apiData.zid].hasOwnProperty('onclick')){
            session.adUnits[session.apiData.zid]['onclick']({
                    "type": ad.type,
                    "url": ad.url,
                    "embedUrl": ad.embedUrl,
                    "title": ad.title,
                    "summary": ad.summary,
                    "brand_name": ad.promotedBy,
                    "image": ad.imageSrc
                }
            );
            return false;
        }

        if(ad.type == "video" && !ad.inlineVideo){
            if(ad.videoExperience == 'autoplay_lightbox'){
                lightbox.open(ad, true);
                return false;
            }
        } else if((isMobile() || !utils.anyClickTags(adElement)) && !ad.inlineVideo && ad.url){
            /* Make whole ad clickable on mobile or when there is no clickable tag in placement,
                when video is not inline
            */

            // support for proxy/networks requiring a javascript callback on click
            if(typeof ad.clickCallback !== 'undefined') {
                var clickCallbackFn = ad.clickCallback['function'],
                    clickCallbackArgs = ad.clickCallback['args'];
                if (typeof window[clickCallbackFn] === 'function') {
                    window[clickCallbackFn].apply(this, clickCallbackArgs)
                }
            }

            var win = utils.activeWindow();
            if(ad.target == '_blank') {
                var window_instance = win.open(ad.url, '_blank');
                window_instance.focus();
            } else {
                win.location.href = ad.url;
            }
            return false;
        } else if(!ad.url){
            return false;
        }
        return true;
    };

    PlacementProcessor.prototype.outputHTML = function(html){
        var tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        for(var i=0;i<tempElement.childNodes.length;i++){
            var htmlElement = tempElement.childNodes[i];
            this.referenceElement.parentNode.insertBefore(htmlElement, this.referenceElement);
        }
    };

    PlacementProcessor.prototype.renderNativeAd = function(){
        if(this.content.hasOwnProperty('ads') && !utils.isEmpty(this.content.ads)){
            this.applyCommonStyle(this.content.ads[0].ad.style);
            this.outputHTML(this.content.htmlWrapperTop)
            for(var i=0;i<this.content.ads.length;i++){
                this.outputAd(this.content.ads[i].ad);
            }
            this.outputHTML(this.content.htmlWrapperBottom)
        } else if(this.content.hasOwnProperty('ad') && Object.getOwnPropertyNames(this.content.ad).length) {
            this.applyCommonStyle(this.content.ad.style);
            this.outputAd(this.content.ad);
        }
        this.filledWithAdsNativeAd = true;
    };

    PlacementProcessor.prototype.renderNetworkAd = function(ad){
        var that = this;
        var triplelift_fallback = false, fm_fallback = false, sharethrough_network_filled = false,
            saymedia_fallback = false, nativo_fallback = false;
        var feedsArray = ["ntent_feed", "inmobi_feed", "aol_feed", "ebay_feed",
                "gravity_feed", "kixer_feed", "admarketplace_feed", "criteo_feed"];

        this.thirdPartyElement = document.createElement('div');
        this.referenceElement.parentNode.insertBefore(this.thirdPartyElement, this.referenceElement);
        this.nativeAdElement = this.thirdPartyElement;

        var whitelisted_networks = ['ntent_feed', 'aol_feed', 'ebay_feed',
            'gravity_feed', 'inmobi_feed', 'kixer_feed', 'triple_lift', 'federated_media',
            'kixer', 'saymedia', 'contentad', 'connatix', 'outbrain',
            'sharethrough', 'taboola', 'nativo', 'other', 'admarketplace_feed',
            'medianet', 'dianomi', 'criteo_feed', 'openx', 'mobilemajority', 'nativeads', 'urx',
            'rubiconproject', 'answermedia', 'distroscale', 'motiveinteractive',
            'aol_marketplace'];

        var standard_integrations = ['openx', 'mobilemajority', 'nativeads',
            'kixer', 'urx', 'rubiconproject', 'answermedia', 'distroscale',
            'motiveinteractive', 'aol_marketplace', 'zergnet', 'taboola'];

        if(utils.indexOf.call(whitelisted_networks, ad.providerName) > -1){
            var tagHTML = '<img src="'+ ad.trackingUrls.requests[0] +'" height="1" width="1" style="margin:0;padding:0;height:1px;width:1px;border:none;display:block;"/>';
            utils.dropTags(this.thirdPartyElement, tagHTML);
        }

        /* Not an ideal implementation since we dont know for which placement
            this callback was called for.
        */
        window._an_adFill = function(network_handle){
            if(utils.indexOf.call(standard_integrations, network_handle) > -1 && network_handle == ad.providerName){
                logger.log('console', 'filled and done: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')');
                if(ad.hasOwnProperty('trackingTags'))
                    utils.dropTags(that.thirdPartyElement, ad.trackingTags);
                network_response_flag = true;
                that.finish();
            }
        }

        window._an_adNoFill = function(network_handle){
            if(utils.indexOf.call(standard_integrations, network_handle) > -1 && network_handle == ad.providerName){
                logger.log('console', 'fallback: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')');
                network_response_flag = true;
                that.fallbackNetwork();
            }
        }

        if(utils.indexOf.call(standard_integrations, ad.providerName) > -1){
            var network_response_flag = false;
            setTimeout(function(){
                /* Fallback regardless if we don't hear back from the network */
                if(!network_response_flag){
                    logger.log('console', 'fallback: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')');
                    that.fallbackNetwork();
                }
            }, 1000);
        }

        var add_script_attribute = null;
        if(ad.providerName == 'connatix'){
            // Since connatix changed their location of tags from HEAD to BODY
            if (ad.headerTags) {
                ad.html = ad.headerTags;
                ad.headerTags = '';
            }

            utils.bindEvent(window, 'connatix_no_content', function() {
                logger.log('console', 'fallback: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')');
                that.fallbackNetwork();
            });

            utils.bindEvent(window, 'connatix_content_fill', function() {
                logger.log('console', 'filled and done: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')');
                if(ad.hasOwnProperty('trackingTags'))
                    utils.dropTags(that.thirdPartyElement, ad.trackingTags)
                that.finish();
            });

            add_script_attribute = { 'data-connatix-event': 'connatix_content_fill' };
        }

        if(feedsArray.indexOf(ad.providerName) > -1) {
            var custom_fields = {};
            if(ad.hasOwnProperty('customFields') && !utils.isEmpty(ad.customFields)) {
                custom_fields = ad.customFields;
            }
            this.fetchNetworkCreative(ad.sid, ad.providerName, custom_fields);
        } else {
            utils.dropTags(this.thirdPartyElement, ad.html, function(){
                if(ad.providerName == 'medianet' || ad.providerName == 'dianomi'){
                    logger.log('console', 'filled and done: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')')
                    if(ad.hasOwnProperty('trackingTags'))
                        utils.dropTags(that.thirdPartyElement, ad.trackingTags)
                    that.finish();
                } else if(ad.providerName == 'kixer'){
                    if (typeof __kx_ad_start == 'function') {
                        __kx_ad_start();
                        if(ad.hasOwnProperty('trackingTags'))
                            utils.dropTags(that.thirdPartyElement, ad.trackingTags)
                    }
                } else if(ad.providerName == 'triple_lift'){
                    // tlif_1: Presumably, _1 signifies the placement sequence number, if there are multiple placements
                    // then there could be more than one iframes on the page
                    if(document.getElementById('tlif_' + String(window._tl.getTlSN()))) {
                        var win = document.getElementById('tlif_1').contentWindow || document.getElementById('tlif_1');
                        var tl_no_ad_callback = win.serveDefault;
                        //When there is no fill TL calls this
                        win.serveDefault = function(){
                            logger.log('console', 'fallback: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')');
                            that.fallbackNetwork();
                            triplelift_fallback = true;
                            tl_no_ad_callback.apply(this, arguments);

                        }
                        var tl_ad_fill_callback = win.generic_get_unit;
                        var tl_ad_filled = false;
                        //When there is an ad to be served TL calls this
                        win.generic_get_unit = function(){
                            if(!triplelift_fallback){
                                logger.log('console', 'filled and done: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')')
                                tl_ad_filled = true;
                                if(ad.hasOwnProperty('trackingTags'))
                                    utils.dropTags(that.thirdPartyElement, ad.trackingTags)
                                that.finish();
                                tl_ad_fill_callback.apply(this, arguments);
                            }
                        }

                        // When a campaign is forced (for TL) this function is called
                        var tl_ad_fill_callback2 = win.tl_advertiser_json;
                        win.tl_advertiser_json = function(){
                            if(!tl_ad_filled && !triplelift_fallback){
                                logger.log('console', 'filled and done: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')')
                                if(ad.hasOwnProperty('trackingTags'))
                                    utils.dropTags(that.thirdPartyElement, ad.trackingTags)
                                that.finish();
                            }
                            tl_ad_fill_callback2.apply(this, arguments);
                        }

                    } else {
                        logger.log('console', 'filled and done: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')')
                        if(ad.hasOwnProperty('trackingTags'))
                            utils.dropTags(that.thirdPartyElement, ad.trackingTags)
                        that.finish();
                    }
                }
                else if(ad.providerName == 'federated_media'){
                    setTimeout(function(){
                        if(!fm_fallback){
                            logger.log('console', 'filled and done: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')')
                            if(ad.hasOwnProperty('trackingTags'))
                                utils.dropTags(that.thirdPartyElement, ad.trackingTags)
                            // We don't know for sure that FM didnt fill the inventory yet. Finishing for safety reasons though
                            that.finish();
                        }
                    }, 2000);
                }
                else if(ad.providerName == 'saymedia'){
                    setTimeout(function(){
                        if(!saymedia_fallback){
                            logger.log('console', 'filled and done: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')')
                            if(ad.hasOwnProperty('trackingTags'))
                                utils.dropTags(that.thirdPartyElement, ad.trackingTags)
                            // We don't know for sure that SM didnt fill the inventory yet. Finishing for safety reasons though
                            that.finish();
                        }
                    }, 2000);
                }
                else if(ad.providerName == 'contentad'){
                    if(ad.hasOwnProperty('trackingTags'))
                        utils.dropTags(that.thirdPartyElement, ad.trackingTags)
                    that.finish();
                }
            }, add_script_attribute)
        }

        if(ad.providerName == 'saymedia'){
            window._an_noSayMediaAdFill = function(){
                logger.log('console', 'fallback: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')');
                that.fallbackNetwork();
                saymedia_fallback = true;
            }
        }

        if(ad.providerName == 'federated_media'){
            window._an_noFMAdFill = function(){
                logger.log('console', 'fallback: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')');
                that.fallbackNetwork();
                fm_fallback = true;
            }
        }

        if(ad.providerName == 'other') {
            if(ad.hasOwnProperty('trackingTags'))
                utils.dropTags(this.thirdPartyElement, ad.trackingTags);
            this.finish();
        }

        if(ad.providerName == 'sharethrough'){
            //Event handler
            var handler = function(e){
                var message = e.message || e.data;
                if(e.origin == 'http://btlr.sharethrough.com' && message){
                    var message_json = (window.JSON && window.JSON.parse) ? window.JSON.parse( message.trim() ) : (new Function("return " + message.trim()))();
                    if(message_json.response.creatives.length){
                        logger.log('console', 'filled and done: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')')
                        if(ad.hasOwnProperty('trackingTags'))
                            utils.dropTags(that.thirdPartyElement, ad.trackingTags)
                        that.finish();
                        sharethrough_network_filled = true;
                    } else {
                        logger.log('console', 'fallback: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')');
                        that.fallbackNetwork();
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
                    logger.log('console', 'filled and done: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')')
                    if(ad.hasOwnProperty('trackingTags'))
                        utils.dropTags(that.thirdPartyElement, ad.trackingTags)
                    that.finish();
                } else if(ad.providerName == 'nativo') {
                    var _an_nativo_fallback = _pr.prototype.Render_TemplateAd;
                    that.an_nativo_fill = false;
                    _pr.prototype.Render_TemplateAd = function(a){
                        if(!nativo_fallback && !that.placement_finished_processing){
                            that.an_nativo_fill = true;
                            logger.log('console', 'filled and done: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')');
                            if(ad.hasOwnProperty('trackingTags'))
                                utils.dropTags(that.thirdPartyElement, ad.trackingTags);
                            that.finish();
                            _an_nativo_fallback(a);
                        }
                    }
                    var _an_nativo_fallback2 = _pr.prototype.PushAd;
                    _pr.prototype.PushAd = function(a){
                        if(!nativo_fallback && !that.placement_finished_processing){
                            that.an_nativo_fill = true;
                            logger.log('console', 'filled and done: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')');
                            if(ad.hasOwnProperty('trackingTags'))
                                utils.dropTags(that.thirdPartyElement, ad.trackingTags);
                            that.finish();
                            _an_nativo_fallback2.call(PostRelease, a);
                        }
                    }
                    // Nativo tags make an API call to their ad server and we need to wait till the response is received
                    setTimeout(function(){
                        if(!that.an_nativo_fill && !that.placement_finished_processing){
                            nativo_fallback = true;
                            logger.log('console', 'fallback: ' + that.current_network_index + ' - ' + ad.providerName + ' (zid: ' + that.apiKey + ')');
                            that.fallbackNetwork();
                        }
                    }, 800);
                }
            }, add_script_attribute)
        }
        if(ad.hasOwnProperty('footerTags') && ad.footerTags){
            utils.dropTags(document.getElementsByTagName('body')[0], ad.footerTags);
        }
    };

    PlacementProcessor.prototype.fallbackNetwork = function(){
        if(this.content.networks){
            var ad = this.content.networks[this.current_network_index];
            var tagHTML = '<img src="'+ ad.trackingUrls.nofills[0] +'" height="1" width="1" style="margin:0;padding:0;height:1px;width:1px;border:none;display:block;"/>';
            utils.dropTags(this.thirdPartyElement, tagHTML);
        }
        // Due to race condition with network's fill and no_fill callbacks it may end up calling
        // fallbackNetwork despite the network is filled, so this is the safety check to avoid double ads
        if(!this.placement_finished_processing){
            if(this.content.networks &&
                this.content.networks.length > (this.current_network_index + 1)){
                this.cleanupNetwork();
                this.current_network_index ++;
                this.renderNetworkAd(this.content.networks[this.current_network_index]);
            } else if(!utils.isEmpty(this.content.ad) && this.content.ad.hasOwnProperty('html')) {
                this.cleanupNetwork();
                this.renderNativeAd();
                this.finish();
            } else {
                this.finish(false);
            }
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
                that.fallbackNetwork();
            }
        };

        if(providerName == 'admarketplace_feed'){
            var k = utils.get_document_keywords(4);
            if(k == ''){
                this.fallbackNetwork();
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
                if (that.apiKey in window.clientSideData){
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
                    that.fallbackNetwork();
                    return false;
                } else {
                    if(counter >= maxIterations) {
                        profiler.end('CRITEO EXTRA WAIT TIME');
                        logger.log('console', 'Criteo failed to respond in time: using fallback');
                        that.fallbackNetwork();
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

    PlacementProcessor.prototype.processAd = function(){
        //This is for video lightbox
        //ANResponses.addResponse(content.zid, content)

        logger.log('console', this.content);

        //Don't callback yet if status = OK since network ads may not fill
        if(settings.userCallbackOnAdLoad && this.content.status != 'OK'){
            settings.userCallbackOnAdLoad(( this.content.status != 'OK'));
        }

        if(this.content.hasOwnProperty('zid') && session.adUnits.hasOwnProperty(this.content.zid)) {
            var adObject = {};
            if(this.status){
                adObject = {
                    "type": this.content.ad.type,
                    "url": this.content.ad.url,
                    "embedUrl": this.content.ad.embedUrl,
                    "title": this.content.ad.title,
                    "summary": this.content.ad.summary,
                    "brand_name": this.content.ad.promotedBy,
                    "image": this.content.ad.imageSrc
                }
            }

            session.adUnits[this.content.zid]['content'] = this.content;
            if(session.adUnits[this.content.zid].hasOwnProperty('callback'))
                session.adUnits[this.content.zid]['callback']((this.content.status == 'OK'), this.apiKey, adObject);
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
        } else {
            if(settings.autoPosition) {
                var cssPath;
                if(this.content.hasOwnProperty('cssPath') && this.content.cssPath){
                    cssPath = this.content.cssPath;
                } else {
                    logger.log('warning', 'No CSS path configured for this page.');
                    return;
                }

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
                return;
            } else {
                if(session.adUnits.hasOwnProperty(this.apiKey) && session.adUnits[this.apiKey].hasOwnProperty('nativeAdElementId')){
                    this.referenceElement = utils.activeWindowDocument().getElementById(session.adUnits[this.apiKey]['nativeAdElementId']);
                    if(!this.referenceElement){
                        logger.log('warning', 'Given nativeAdElementId not found for apiKey');
                        return;
                    }
                }
                else {
                    if(settings.apiKey)
                        this.referenceElement = document.getElementById('adsnative-dummy-' + this.apiKey);
                    else
                        this.referenceElement = document.getElementById('adsnative-dummy-' + settings.widgetId);
                }
            }
        }

        this.startRender();
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
        var status = this.insertReferenceElement(cssPath);
        if(!status) {
            logger.log('warning', 'Configured CSS path not found on this page.');
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
            this.renderNativeAd();
            this.finish();
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
    }

    function _getAdData(tag_settings, numAds, keywords, callback) {
        var that = this;
        var _callback;
        if(arguments.length > 3){
            _callback = function(callbackData){
                profiler.end('GET AD DATA');
                //Catch-all try-catch so we can send any error we get to sentry
                try {
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
                    _callAdData(null, numAds, keywords, _callback);
                else
                    _callAdData(adUnits, numAds, keywords, _callback);
            } else if(arguments.length > 2 && is_widget_network_case) {
                logger.log('console', 'Placements not found in criteo lookup. Fetching ad directly');
                _callAdData(null, numAds, keywords, _callback);
            } else {
                logger.log('console', 'No valid placements found for this domain');
            }
        };

        profiler.start('HOST FILE FETCH');
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

    function _preloadClientAdData(adUnits, data){
        window.clientSideData = window.clientSideData || {};

        var _fetchClientSideAdData = function(zid, url){
            profiler.start('PRELOAD CLIENT-SIDE AD DATA: ' + zid);
            async.getJSONP(url, function(clientData){
                profiler.end('PRELOAD CLIENT-SIDE AD DATA: ' + zid);
                window.clientSideData[zid] = clientData;
                //console.log(clientData);
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

    function _callAdData(adUnits, numAds, keywords, callback){
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
            if(settings.templateKey)
                data.template_key = settings.templateKey;
            data.url = settings.currentPageUrl;
            for(var i=0;i<settings.categories.length;i++){
                queryString.push('cat=' + settings.categories[i]);
            }
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

        if (adunits_content instanceof Array) {
            for(var i=0;i<adunits_content.length;i++){
                var p = new PlacementProcessor(adunits_content[i]);
                p.processAd();
            }
        } else {
            var p = new PlacementProcessor(adunits_content);
            p.processAd();
        }

        profiler.end('TOTAL RENDER');
        profiler.end('TOTAL CLIENT');
        profiler.timeSincePageStart('TOTAL OVERALL');
    }

    //**** JS API: Start ****//

    window.AdsNative = function(_apiKey, _keywords){
        var __construct = function(that) {
            that.apiKey = _apiKey;
            if(_keywords !== 'undefined')
                that.keywords = _keywords;
            else
                that.keywords = '';
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
            callback(that.status, that.callbackData);
        });
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
                    var numAds = settings.numAds;
                    if(adUnit.hasOwnProperty('numAds'))
                        numAds = adUnit.numAds;
                    var keywords = '';
                    if(adUnit.hasOwnProperty('keywords') && adUnit.keywords)
                        keywords = adUnit.keywords.join();
                    if(adUnit.hasOwnProperty('nativeAdElementId') && utils.activeWindowDocument().getElementById(adUnit.nativeAdElementId)){
                        if(!session.adUnits.hasOwnProperty(adUnit.apiKey)){
                            session.adUnits[adUnit.apiKey] = {};
                        }
                        session.adUnits[adUnit.apiKey]['nativeAdElementId'] = adUnit.nativeAdElementId;
                    }
                    _getAdData({ 'apiKey': adUnit.apiKey }, numAds, keywords);
                }
            }
        } else {
            if((settings.apiKey || (settings.widgetId && settings.networkKey)) && !settings.nativeAdElementId && !settings.autoPosition){
                _writeDummyDiv();
            }
            _getAdData(settings, settings.numAds, settings.keywords);
        }
    };

    //**** JS API (Legacy): Start ****//

    this.fetchAds = function(_apiKeys, _keywords, _callback){
        settings.blockAdDisplay = true;
        for(var i=0; i < _apiKeys.length; i++){
            if(!session.adUnits.hasOwnProperty(_apiKeys[i])){
                session.adUnits[_apiKeys[i]] = {};
            }
            session.adUnits[_apiKeys[i]]['callback'] = _callback;
            _getAdData({ 'apiKey': _apiKeys[i] }, 1, (settings.keywords ? settings.keywords : _keywords));
        }
    };

    this.displayAd = function(_apiKey, _elementId){
        if(!session.adUnits.hasOwnProperty(_apiKey) || !session.adUnits[_apiKey].hasOwnProperty('content'))
            return;

        var content = session.adUnits[_apiKey]['content'];
        var referenceElement = document.getElementById(_elementId);
        var p = new PlacementProcessor(content);
        p.referenceElement = referenceElement;
        p.startRender();

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

    this.onClickHandler = function(_apiKey, _callback){
        if(!session.adUnits.hasOwnProperty(_apiKey)){
            session.adUnits[_apiKey] = {};
        }
        session.adUnits[_apiKey]['onclick'] = _callback;
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

if(typeof window._AdsNativeOpts === 'undefined'){
    window._AdsNativeOpts = { autoPosition: true };
} else if ( !window._AdsNativeOpts.hasOwnProperty('apiKey') && !window._AdsNativeOpts.hasOwnProperty('widgetId') && !window._AdsNativeOpts.hasOwnProperty('adUnits') && !window._AdsNativeOpts.hasOwnProperty('blockAdLoad') ){
    window._AdsNativeOpts.autoPosition = true;
}

_AdsNativeOptsQ.push(window._AdsNativeOpts);
_AdsNativeQ.push(new AdsNativeMaster(_AdsNativeOptsQ[_AdsNativeOptsQ.length - 1]));
_AdsNativeQ[_AdsNativeQ.length - 1].load();

//This instance is for out facing JS SDK API
if(typeof window._AdsNative === 'undefined'){
    window._AdsNative = new AdsNativeMaster({ blockAdLoad: true });
    window._AdsNative.load();
}

AdsNativeCookieDrop.dropCookieMatchingPixel();

}());
