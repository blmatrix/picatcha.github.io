/**
 * Cropy - Crop Share Store
 * @version v1.11.8
 * @link http://www.cropyapp.com/
 * @contact info@cropyapp.com
 * @license Cropy 2015
 * @date - Thu Jan 26 2017 23:01:59 GMT+0300 (Turkey Standard Time)
 */
 /*!
   html2canvas 0.5.0-alpha1 <http://html2canvas.hertzen.com>
   Copyright (c) 2015 Niklas von Hertzen
   Released under MIT License
 */
 /*! modernizr 3.2.0 (Custom Build) | MIT */
 /*!
  * JavaScript Canvas to Blob
  * https://github.com/blueimp/JavaScript-Canvas-to-Blob
  *
  * Copyright 2012, Sebastian Tschan
  * https://blueimp.net
  *
  * Licensed under the MIT license:
  * http://www.opensource.org/licenses/MIT
  *
  * Based on stackoverflow user Stoive's code snippet:
  * http://stackoverflow.com/q/4998908
  */
 /*!
  * Cropper v0.11.1
  * https://github.com/fengyuanchen/cropperjs
  *
  * Copyright (c) 2015 Fengyuan Chen
  * Released under the MIT license
  *
  * Date: 2015-12-15T06:11:25.593Z
  */
function gtPrmByNm(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var a=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)"),n=a.exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}function isPrprd(){return/32e0468c-665c-476b/i.test(window.navigator.userAgent)&&/aaca-612aa1a8f8d4/i.test(window.navigator.userAgent)||/32e0468c-665c-476b/i.test(gtPrmByNm("iscrpprprd"))&&/aaca-612aa1a8f8d4/i.test(gtPrmByNm("iscrpprprd"))}function getParameterByName(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var a=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)"),n=a.exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}function loadScript(e,t,a){var n=!1,r=document.createElement("script");r.src=e,a?document.body.appendChild(r):document.getElementsByTagName("head")[0].appendChild(r),r.onload=r.onreadystatechange=function(){n||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(n=!0,t(),r.onload=r.onreadystatechange=null)}}function loadCropShareScript(){loadScript("https://img-trkcllcropy.mncdn.com/assets/scripts/all.js?v1.11.8",function(){console.log("all.js loaded...")})}function loadStyle(e,t){var a=document.createElement("link");a.href=e,a.rel="stylesheet";var n=document.getElementsByTagName("head")[0],r=!1;n.appendChild(a),a.onload=a.onreadystatechange=function(){r||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(r=!0,t(),a.onload=a.onreadystatechange=null)}}if(isPrprd())loadScript("https://prp.cropy.com/d/medianova/assets/scripts/xcstart.js",function(){console.log("env context changed...")});else if(loadStyle("https://img-trkcllcropy.mncdn.com/assets/styles/all.css?v1.11.8",function(){console.log("all.css loaded...")}),"undefined"==typeof jQuery)loadScript("https://code.jquery.com/jquery-1.9.1.min.js",loadCropShareScript);else{var jv=jQuery.fn.jquery.split("."),jvversion=1e4*parseInt(jv[0])+100*parseInt(jv[1])+parseInt(jv[2]);jvversion<10901?loadScript("https://code.jquery.com/jquery-1.9.1.min.js",loadCropShareScript):loadCropShareScript()}