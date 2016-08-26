/**
 * Cropy - Crop Share Store
 * @version v1.10.34
 * @link http://www.cropyapp.com/
 * @contact info@cropyapp.com
 * @license Cropy 2015
 * @date - Mon Aug 15 2016 13:56:35 GMT+0300 (EEST)
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
function handleCropyResourcesComplete(){loadedResCount++,2==loadedResCount&&console.log("Cropy Ready")}function loadCropShareScript(){loadScript("https://img-trkcllcropy.mncdn.com/assets/scripts/all.js?v1.10.34",handleCropyResourcesComplete)}function loadScript(e,t){var a=document.createElement("script");a.src=e;var o=document.getElementsByTagName("head")[0],r=!1;o.appendChild(a),a.onload=a.onreadystatechange=function(){r||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(r=!0,t(),a.onload=a.onreadystatechange=null)}}function loadStyle(e,t){var a=document.createElement("link");a.href=e,a.rel="stylesheet";var o=document.getElementsByTagName("head")[0],r=!1;o.appendChild(a),a.onload=a.onreadystatechange=function(){r||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(r=!0,t(),a.onload=a.onreadystatechange=null)}}var loadedResCount=0;if(loadStyle("https://img-trkcllcropy.mncdn.com/assets/styles/all.css?v1.10.34",handleCropyResourcesComplete),"undefined"==typeof jQuery)loadScript("https://code.jquery.com/jquery-1.9.1.min.js",loadCropShareScript);else{var jv=jQuery.fn.jquery.split("."),jvversion=1e4*parseInt(jv[0])+100*parseInt(jv[1])+parseInt(jv[2]);10901>jvversion?loadScript("https://code.jquery.com/jquery-1.9.1.min.js",loadCropShareScript):loadCropShareScript()}