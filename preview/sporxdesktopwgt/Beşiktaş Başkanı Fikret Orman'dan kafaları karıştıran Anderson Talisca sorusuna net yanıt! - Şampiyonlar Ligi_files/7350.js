(function() {	
		"use strict";
		var OGO =  (window._$OGO$_ || (window._$OGO$_ = {}));
		var RosettaFramework = (OGO.Rosetta || (OGO.Rosetta = {}));
		var Rosetta = (RosettaFramework.v3_60 || (RosettaFramework.v3_60 = {}))
		var creatives = (RosettaFramework.creatives || (RosettaFramework.creatives = []))

		var trace = (Rosetta.trace || (Rosetta.trace = (function() {try {if (window && window.console && window.console.log){return function(tmp){window.console.log("R: " + tmp)}}} catch(e){}return function(tmp){};}())));
		
		function Creative(dmo) {
			this.dmo = dmo;
			this.prefix = "";
			this.parentDivName;
			this.display;
			//Stores the JSON data in a object after parsing
			this.creativeConfig;

			this.json = '';
			
			this.Settings;
			this.DisplayUtils
			this.EventBus;
			this.Analytics
			
			this.USE_RAC = false;
			this._environmentTotals = 2;
			
			
			this._width = Number(this.dmo.mediaWidth);
			this._height =  Number(this.dmo.mediaHeight);
			this._externalURL = this.dmo.externalURL || "http://usweb.dotomi.com/renderer";
			this._atomSuffix = this.dmo.atomSuffix
			this._gsAnalytics = this.dmo.gsAnalytics
			var debug = this.dmo.spDebug || false;

			this.platformConfig = {
				queryVars:this.dmo.flashVars || "",
				clickFunc:this.dmo.handleCommand,
				clickFuncScope:this.dmo, 
				eventLog:this.dmo.logEvent,
				eventLogScope: this.dmo,
				errorLog:this.dmo.logError,
				errorLogScope:this.dmo
			}

			this.creativeConfig = {
					width:this._width,
					height:this._height,
					setup: {
						baseURL:"http://opslocal-c01.dotomi.com/update/local/images/2623/",
						clientID:"2623",
						companyID:"2623",
						cssBase:"http://usweb.dotomi.com/resources/fonts/html/",
						defaultTimeout:5,
						isSecure:false,
						enableRetina:true,
						forceRetinaUserAgent:false,
						frame:0,
						multiframe:false,
						pauseStart:false,
						subdirectory:"21652LCH_LS",
						totalFrames:1,
						useLegacyDirectory:false,
						useNonRetinaSource:false,
						useEvergreen: true,
						useRelativePaths: false,
						fixFontFace: true
					},
					resources:{js:[{name:"Modernizr", type:"include", src:"/thirdparty/Modernizr", version:"2.6.2"}, {name:"TweenMax", type:"include", src:"/thirdparty/TweenMax.min", version:"1.11.8"}, {name:"PIE", type:"ie10", src:"/thirdparty/PIE_uncompressed", version:"1.0.0"}, {name:"PIE9", type:"ie9", src:"/thirdparty/PIE_IE9_uncompressed", version:"2.0beta1"}, {name:"PIE678", type:"ie7ie8", src:"/thirdparty/PIE_IE678_uncompressed", version:"2.0beta1"}, {name:"webfont", type:"include", src:"/thirdparty/webfont", version:"1.4.2"}, {name:"BasicEvents", type:"include", src:"/events/BasicEvents", version:"3.60"}, {name:"XMLPush", type:"include", src:"/utils/XMLPush", version:"3.60"}, {name:"Utils", type:"include", src:"/utils/Utils", version:"3.60"}, {name:"ImageUtils", type:"include", src:"/utils/ImageUtils", version:"3.60"}, {name:"ColorUtils", type:"include", src:"/utils/ColorUtils", version:"3.60"}, {name:"FontManager", type:"include", src:"/utils/FontManager", version:"3.60"}, {name:"BitmapTextUtils", type:"include", src:"/utils/BitmapTextUtils", version:"3.60"}, {name:"BitmapFontLoader", type:"include", src:"/loaders/BitmapFontLoader", version:"3.60"}, {name:"Settings", type:"include", src:"/Settings", version:"3.60"}, {name:"TimelineUtils", type:"timeline", src:"/utils/TimelineUtils", version:"3.60"}, {name:"EventDispatcher", type:"include", src:"/events/EventDispatcher", version:"3.60"}, {name:"DisplayObject", type:"include", src:"/display/DisplayObject", version:"3.60"}, {name:"BitmapTextField", type:"include", src:"/display/BitmapTextField", version:"3.60"}, {name:"Detector", type:"include", src:"/utils/Detector", version:"3.60"}, {name:"TextUtils", type:"include", src:"/utils/TextUtils", version:"3.60"}, {name:"AdInfo", type:"include", src:"/display/AdInfo", version:"3.60"}, {name:"Shape", type:"include", src:"/display/Shape", version:"3.60"}, {name:"Container", type:"include", src:"/display/Container", version:"3.60"}, {name:"ImageLoader", type:"include", src:"/loaders/ImageLoader", version:"3.60"}, {name:"ImageRenderer", type:"include", src:"/display/ImageRenderer", version:"3.60"}, {name:"TextField", type:"include", src:"/display/TextField", version:"3.60"}, {name:"BrowserDetect", type:"include", src:"/detection/BrowserDetect", version:"3.60"}, {name:"ModernizrAddOn", type:"include", src:"/detection/ModernizrAddOn", version:"3.60"}, {name:"Analytics", type:"include", src:"/analytics/Analytics", version:"3.60"}, {name:"FontLoader", type:"include", src:"/loaders/FontLoader", version:"3.60"}, {name:"Display", type:"include", src:"/Display", version:"3.60"}, {name:"DisplayUtils", type:"include", src:"/utils/DisplayUtils", version:"3.60"}, {name:"EFUtils", type:"include", src:"/utils/EFUtils", version:"3.60"}, {name:"EF", type:"ef", src:"/display/EF", version:"3.60"}, {name:"Bridge", type:"include", src:"/utils/Bridge", version:"3.60"}]},
					framework:[{name:"Rosetta", version:"3.60", adFormat:"20"}, {name:"ImageLoader", version:"3.70", adFormat:"20"}],
					timeline:{
						tweens:[
							{method:"to",name:"legal_container",alpha:1,delay:0,duration:0,frame:0,overwrite:"auto",trigger:"myLegalTrigger"}, 
							{method:"to",name:"legal_container",alpha:0,delay:0,duration:0,frame:0,overwrite:"auto",trigger:"myLegalTriggerClose"}
						]
					}
				}	

			this._fontStatusArray = [];
			this._environmentStatusArray = []
			this._doRequire;
			this._isEnvironmentReady = true;
			this._registeredCallbacks = [];
			this._startTime;

			if (debug !== true){
				trace = function (tmp){};
			}
		}
		
		var p = Creative.prototype;

		var BasicEvent;
		var TweenMax;
		var TimelineMax;
		var R;
		
		//Public
		p.init = function(parentDivName, doRequire) {
			this._startTime = new Date().getTime();
			this._doRequire = doRequire;
			Rosetta.trace = trace;
			if (parentDivName){
				this.prefix	 = parentDivName + "_";
			}
			this.parentDivName = parentDivName;
			this._setup();
			if (this.USE_RAC == true){
				this._environmentTotals = 3;
				if (window["RAC"]){
					var context = this;
					//START GS CUSTOMIZE
					RAC.setInitialOrientation(RAC.ORIENTATION.PORTRAIT);
					//END GS CUSTOMIZE
					RAC.addEventListener("displayed", function(){context._checkEnvironmentStatus("RAC", "displayed")});
				} else {
					this._checkEnvironmentStatus("RAC", "skip")
				}
			} else {
				if (this._isEnvironmentReady == true){
					this._checkEnvironmentStatus("parentEnvironment", this._isEnvironmentReady);
				}
			}			
		}
		//Public
		p.environmentReady = function(isReady){
			this._isEnvironmentReady = isReady;
			if (isReady == true){
				this._checkEnvironmentStatus("parentEnvironment", this._isEnvironmentReady);
			}
		}

		// re-assign misspelled function name so OGO will work
		p.enviromentReady = function(isReady){
			this.environmentReady(isReady);	
		}
		

		//Public
		p.registerCallback = function(evt, callback, scope){
			this._registeredCallbacks.push({evt:evt, callback:callback, scope:scope})
		}
		p._checkForCallback = function(evt){
			if (!evt){return;}
			var arr = this._registeredCallbacks;
			for (var i=0; i<arr.length; i++){
				if (arr[i].evt == evt){
					if (arr[i].callback){
						try{
							arr[i].callback.call(arr[i].scope);
						} catch(e){  trace("Callback failed");   }
	                } 
				}
			}
		}
		p._setup = function (){
			this._addResources();
			//this.json = null;
			this._loadAllResources();
		}			
		
		p._loadAllResources = function(){
			var scriptBasePath = this._externalURL;
			var resourcesPath =  "cnvr";	
			var ie = (function(){ var undef, v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
						    while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]); 
						    return v > 4 ? v : undef; 
							}());

			var tmpArray = [];
			if (this.creativeConfig.resources){
				var totalResources = this.creativeConfig.resources.js.length;
				var tmpPath = "";
				var res;
				for (var i=0; i<totalResources; i++){
					res = this.creativeConfig.resources.js[i];	
					tmpPath = resourcesPath + res.src;
					if(ie && res.name.indexOf("PIE") > -1){
						if (ie == 9 && res.type.indexOf(ie) > -1 ){
							tmpArray.push(tmpPath);
						} else if(ie < 9 && res.type.indexOf(ie) > -1 ){
							tmpArray.push(tmpPath);
						} else if (res.type.indexOf(ie) > -1) {
							tmpArray.push(tmpPath);
						}
					} else if (res.name.indexOf("PIE") == -1){
						tmpArray.push(tmpPath);
					}
				}
			} else {
				tmpArray = [];
			}
			if (ie < 9){
				for (var n=0; n<tmpArray.length; n++){
					if (tmpArray[n].indexOf("hammer") > -1){
						tmpArray.splice(n, 1);
						break;
					}
				}
			}
			
			var context = this;
			var atomSuffix = "";
			var errorFunc = function(e){
				if (context && context.platformConfig && context.platformConfig.errorLog){
					context.platformConfig.errorLog.call(context.platformConfig.errorLogScope, e);
				} else {
					trace("RequireJS Resource Failed")
				}
			};			
			if (this._atomSuffix){
				atomSuffix = this._atomSuffix;
				errorFunc = function(e){throw e;} 
			}
			
				this._doRequire([
			    scriptBasePath + "/atom/3.60/2.1.0/?scripts=" + tmpArray.join(",") + atomSuffix],
			function(){context._resourcesReady.call(context);}, errorFunc);
		}
		


		//Called when all scripts are dont loaded and ready to be used
		p._resourcesReady = function(){	
			trace("resourcesReady"); 
			this.display = new Rosetta.Display(this);
			this.display.name = this.parentDivName;
			this.display.allResourcesReady.call(this.display, this._doRequire, this._assignUtils, this.platformConfig, this.creativeConfig, this.prefix);
		}		
		//Checks to make sure all assets are ready before creating ad. Length must be three
		p._pageReady = function (defaultLogic){
			//this._setGroups();
			this._setAdditionalDependencies();
			//Page is ready				
			var parentDiv = document.getElementById(this.parentDivName);
			if (!parentDiv){
				parentDiv= document.body;
				parentDiv.style.margin = '0px';
			} else if (this.USE_RAC == true){
				parentDiv.style.marginTop = -(Number(this._height) * .5) + "px";
				parentDiv.style.marginLeft = -(Number(this._width) * .5) + "px";
				parentDiv.style.top = "50%";
				parentDiv.style.left = "50%";
				parentDiv.style.position = "absolute";
			}
			this.display.createStage.call(this.display, parentDiv, defaultLogic);
			this.stage = R.getStage();
		}
			
		p._assignUtils = function(ref){
			this.Settings = ref.Settings;
			this.DisplayUtils = ref.DisplayUtils;
			this.EventBus = ref.EventBus;
			this.Analytics = ref.Analytics;
			BasicEvent = ref.BasicEvent;
			TweenMax = ref.TweenMax;
			TimelineMax = ref.TimelineMax;
			this.UtilsReference = ref;
			//

			//
			R = ref.Bridge;
			R.init(this, this.creativeConfig, this.display, this.prefix);
			
			this._assignResourceReference(ref);
			this._addVars();
			//CF
			this._addElements();
			this._setGroups();
			this._addComponents();
			this._setElementProperties();
			this._setRequired();
			//CF
			
			//
			this.EventBus.addEventListener(this.display, BasicEvent.CREATIVE_FONTS_READY, this._fontsReady, this);
			//CF
			//this.EventBus.addEventListener(this.display, BasicEvent.CREATIVE_ADD_COMPONENTS, this._addComponents, this);
			//CF
			this.EventBus.addEventListener(this.display, BasicEvent.CREATIVE_ADD_LISTENERS, this._addListeners, this);
			this.EventBus.addEventListener(this.display, BasicEvent.CREATIVE_PREPARE, this._prepare, this);
			this.EventBus.addEventListener(this.display, BasicEvent.CREATIVE_ANIMATE, this._animate, this);
			this.EventBus.addEventListener(this.display, BasicEvent.STATUS, this._statusUpdate, this);
			this.EventBus.addEventListener(this.display, BasicEvent.CREATIVE_FALLBACK, this._creativeFallback, this)
			//
			this.display.startConfiguration.call(this.display);
		}

		// Hook for custom code immediately before animateCreative()
		p._fontsReady = function(e){
			//trace("Creative fonts ready, p._fontsReady" + e.fontFace + " , " + e.bitmapFont);
			var tmp = [];
			tmp.push({src:"fontFace", val:e.fontFace, failure:e.failure})
			tmp.push({src:"bitmapFont", val:e.bitmapFont, failure:e.failure})
			var defaultLogic = checkForFontFail(tmp);
			
			this._pageReady(defaultLogic);
		}
		function checkForFontFail(fontStatusArray){
			var defaultLogic = {isDefault:false, reason: ""};
			while (fontStatusArray.length > 0){
				if (fontStatusArray[0].val == false){
					defaultLogic =  {isDefault:true, reason:fontStatusArray[0].failure};
					break;		
				}
				fontStatusArray.shift();
			}
			fontStatusArray = null;
			return defaultLogic;
		}
		p._checkEnvironmentStatus = function(src, val){
			//trace("src=" + src + " val=" + val);
			for (var i=0; i<this._environmentStatusArray.length; i++){
				if (this._environmentStatusArray[i].src == src){
					return;	
				}
			}
			//trace("src=" + src + " val=" + val);
			this._environmentStatusArray.push({src:src, val:val});
			if (this._environmentStatusArray.length == this._environmentTotals){
				this._showCreative();
			}
		}
		p._prepare = function(e){
			this._prepareAnimation(e);
			this._checkForCallback("creative_ready")
			this._checkEnvironmentStatus("creative", "animation");
		}
		p._showCreative = function(){
			//Wait for MRAID before firing
			if (this.USE_RAC == true){
				fireGSAnalytics(this._gsAnalytics)
			}
			this._checkForCallback("creative_shown")
			this.EventBus.dispatchEvent(this, BasicEvent.CREATIVE_ANIMATE,{})
		}
		function fireGSAnalytics(tmp){
			var fired = false;
			try {
				if (window["gs"] && window["gs"].Stats){
					gs.Stats.init(tmp);
					gs.Stats.set("Impression", 1);
					fired = true;
				} 
			} catch (e){}
			if (fired == false){
				trace("Error: No GS Analytics found");
			}
		}


		/* ---------------------BEGIN CUSTOMIZATION------------------------------------------------------------------------------------- */


		/**
		 * Dynamically add a var (flashvar). The var will appear in the CTT
		 * Note: The var will appear in the CTT if 'expose' is set to true
		 */
		p._addVars = function(){
			//R.addVar("custom_var", "String", {expose:true, parse:false})
			
		}

		p._addElements = function(){
			var BITMAP_TEXT = "bitmapText";
			var TEXT = "text";
			var CONTAINER = "container";
			var SHAPE = "shape";
			var IMAGE = "image";
			var HIT_AREA = "hitArea";
			//R.addElement("headline_text", BITMAP_TEXT, {zIndex:10, dependency:true, font:10101})

			R.addElement("adInfo", HIT_AREA, {
			  zIndex: 0,
			  left: 0,
			  top: 0,
			  width: 728,
			  height: 90,
			  defValue: "",
			  visible: true
			});
			R.addElement("border", SHAPE, {
			  zIndex: 150,
			  left: 0,
			  top: 0,
			  width: 728,
			  height: 90,
			  borderColor: "0xCCCCCC",
			  borderStyle: "solid",
			  borderThickness: 1,
			  color: "",
			  pointerEvents: "none",
			  roundedCorners: 0,
			  visible: true
			});
			R.addElement("headline_text", BITMAP_TEXT, {
			  dependency: true,
			  zIndex: 34,
			  left: 17,
			  top: 9,
			  width: 321,
			  height: 26,
			  color: "0x000000",
			  font: "11287",
			  fontSize: 19,
			  hAlign: "left",
			  lineHeight: 0,
			  pointerEvents: "none",
			  text: "",
			  tracking: 0,
			  vAlign: "middle",
			  visible: true
			});
			R.addElement("subhead_text", BITMAP_TEXT, {
			  dependency: true,
			  zIndex: 33,
			  left: 17,
			  top: 35,
			  width: 321,
			  height: 20,
			  color: "0x000000",
			  font: "11287",
			  fontSize: 12,
			  hAlign: "left",
			  lineHeight: 0,
			  pointerEvents: "none",
			  text: "",
			  tracking: 0,
			  vAlign: "middle",
			  visible: true
			});
			R.addElement("promo_text", BITMAP_TEXT, {
			  dependency: true,
			  zIndex: 29,
			  left: 17,
			  top: 55,
			  width: 321,
			  height: 16,
			  color: "0x000000",
			  font: "10746",
			  fontSize: 9,
			  hAlign: "left",
			  lineHeight: 0,
			  pointerEvents: "none",
			  text: "",
			  tracking: 0,
			  vAlign: "middle",
			  visible: true
			});
			R.addElement("cta_text", BITMAP_TEXT, {
			  zIndex: 24,
			  left: 476,
			  top: 33,
			  width: 77,
			  height: 15,
			  color: "0x000000",
			  font: "10101",
			  fontSize: 14,
			  hAlign: "center",
			  lineHeight: 0,
			  pointerEvents: "none",
			  text: "",
			  tracking: 0,
			  vAlign: "middle",
			  visible: true
			});
			R.addElement("details_text", BITMAP_TEXT, {
			  zIndex: 28,
			  left: 456,
			  top: 56,
			  width: 113,
			  height: 25,
			  color: "0x000000",
			  font: "10123",
			  fontSize: 8,
			  hAlign: "center",
			  lineHeight: -0.12,
			  pointerEvents: "auto",
			  text: "",
			  tracking: 1,
			  vAlign: "middle",
			  visible: true
			});
			R.addElement("fg_img", IMAGE, {
			  zIndex: 100,
			  left: 0,
			  top: 0,
			  width: 728,
			  height: 90,
			  color: "",
			  hAlign: "left",
			  image: "",
			  location: "size",
			  pointerEvents: "none",
			  scale: "inside",
			  vAlign: "top",
			  visible: true
			});
			R.addElement("logo_img", IMAGE, {
			  zIndex: 41,
			  left: 0,
			  top: 0,
			  width: 728,
			  height: 90,
			  color: "",
			  hAlign: "left",
			  image: "",
			  location: "size",
			  pointerEvents: "none",
			  scale: "inside",
			  vAlign: "top",
			  visible: true
			});
			R.addElement("cta_img", IMAGE, {
			  zIndex: 22,
			  left: 0,
			  top: 0,
			  width: 728,
			  height: 90,
			  color: "",
			  hAlign: "left",
			  image: "",
			  location: "size",
			  pointerEvents: "none",
			  scale: "inside",
			  vAlign: "top",
			  visible: true
			});
			R.addElement("style_img", IMAGE, {
			  zIndex: 3,
			  left: 0,
			  top: 0,
			  width: 728,
			  height: 90,
			  color: "",
			  hAlign: "left",
			  image: "",
			  location: "size",
			  pointerEvents: "none",
			  scale: "inside",
			  vAlign: "top",
			  visible: true
			});
			R.addElement("bg_img", IMAGE, {
			  zIndex: 2,
			  left: 0,
			  top: 0,
			  width: 728,
			  height: 90,
			  color: "",
			  hAlign: "left",
			  image: "",
			  location: "size",
			  pointerEvents: "none",
			  scale: "inside",
			  vAlign: "top",
			  visible: true
			});
			R.addElement("bg", SHAPE, {
			  zIndex: 1,
			  left: 0,
			  top: 0,
			  width: 728,
			  height: 90,
			  borderColor: "",
			  borderThickness: "0",
			  color: "0xFFFFFF",
			  gradientAngle: -90,
			  pointerEvents: "none",
			  roundedCorners: "0",
			  visible: true
			});
			R.addElement("cta", SHAPE, {
			  zIndex: 23,
			  left: 476,
			  top: 30,
			  width: 77,
			  height: 15,
			  borderColor: "",
			  borderThickness: "2",
			  color: "",
			  gradientAngle: -90,
			  pointerEvents: "none",
			  roundedCorners: "0",
			  visible: true
			});
			R.addElement("legal_bg", SHAPE, {
			  zIndex: 120,
			  left: 0,
			  top: 0,
			  width: 728,
			  height: 90,
			  alpha: 1,
			  borderColor: "",
			  borderThickness: 0,
			  color: "0x9999991",
			  gradientAngle: -90,
			  pointerEvents: "none",
			  roundedCorners: 0,
			  visible: true
			});
			R.addElement("legal_text", TEXT, {
			  zIndex: 121,
			  left: 12,
			  top: 32,
			  width: 722,
			  height: 70,
			  color: "0xFFFFFF",
			  font: "OpenSans",
			  fontSize: 11,
			  hAlign: "left",
			  lineHeight: 0.3,
			  minFontSize: 11,
			  overflowY: "auto",
			  pointerEvents: "auto",
			  text: "",
			  tracking: 0,
			  vAlign: "top",
			  visible: true
			});
			R.addElement("legal_close", SHAPE, {
			  zIndex: 122,
			  left: 5,
			  top: 5,
			  width: 16,
			  height: 16,
			  borderColor: "",
			  borderThickness: 0,
			  color: "0xffffff",
			  gradientAngle: -90,
			  pointerEvents: "none",
			  roundedCorners: 100,
			  visible: true
			});
			R.addElement("legal_close_x", TEXT, {
			  zIndex: 123,
			  left: 7,
			  top: 2,
			  width: 12,
			  height: 12,
			  color: "0xFFFFFF",
			  font: "OpenSans",
			  fontSize: 22,
			  fontWeight: "bold",
			  hAlign: "center",
			  lineHeight: 0,
			  minFontSize: 11,
			  overflowY: "visible",
			  pointerEvents: "auto",
			  text: "<div style='color:#999999; position:relative; top:4pt; font-size: 16pt; font-weight: bold'>&times;</div>",
			  tracking: 0,
			  vAlign: "middle",
			  visible: true
			});
			R.addElement("legal_close_text", TEXT, {
			  zIndex: 122,
			  left: 25,
			  top: 9,
			  width: 60,
			  height: 20,
			  color: "0xFFFFFF",
			  font: "OpenSans",
			  fontSize: 9,
			  hAlign: "left",
			  lineHeight: 0,
			  minFontSize: 11,
			  overflowY: "auto",
			  pointerEvents: "auto",
			  text: "<u>CLOSE</u>",
			  tracking: 0,
			  vAlign: "top",
			  visible: true
			});
			R.addElement("legal_close_container", CONTAINER, {
			  zIndex: 122,
			  left: 0,
			  top: 0,
			  width: 70,
			  height: 15,
			  children: ["legal_close", "legal_close_x", "legal_close_text"],
			  pointerEvents: "auto",
			  visible: true,
			  overflowY:"visible",
			  overflowX:"visible"
			});
			R.addElement("legal_container", CONTAINER, {
			  dependency: true,
			  zIndex: 123,
			  left: 0,
			  top: 0,
			  width: 728,
			  height: 90,
			  children: ["legal_bg", "legal_text", "legal_close_container"],
			  pointerEvents: "auto",
			  visible: false
			});
			R.addElement("cta_container", CONTAINER, {
			  zIndex: 21,
			  left: 0,
			  top: 0,
			  width: 728,
			  height: 90,
			  children: ["cta_text", "cta_img", "cta"],
			  pointerEvents: "none",
			  visible: true
			});

		}

		p._setElementProperties = function(){
			/*switch (R.getCreativeSizeID()){
				case "300":
					break;
			}*/

			R.setOverwrite("setup", "clientID", "client_id");
			R.setOverwrite("setup", "evergreen", "evergreen_img");
			R.setOverwrite("setup", "hasLinks", "has_links", {parse:false, type:"Boolean", expose:false});
			R.setOverwrite("setup", "bypassCache", "bypass_cache", {parse:false, type:"Boolean", expose:true});
			R.setOverwrite("setup", "defaultTimeout", "default_timeout", {parse:false, type:"Number", expose:true});
			R.setOverwrite("setup", "frame", "frame", {parse:false, type:"Int", expose:false});
			R.setOverwrite("setup", "pauseStart", "pauseStart", {parse:false, type:"Boolean", expose:false});
			R.setOverwrite("setup", "baseURL", "base_url", {parse:false, type:"String", expose:false});
			R.setOverwrite("setup", "companyID", "company_id", {parse:false, type:"String", expose:false});
			R.setOverwrite("setup", "dtmSecure", "dtm_secure", {parse:false, type:"Boolean", expose:false});
			R.setOverwrite("setup", "cssBase", "css_base", {parse:false, type:"String", expose:false});
			R.setOverwrite("setup", "enableRetina", "enable_retina", {parse:false, type:"Boolean", expose:false});
			R.setOverwrite("setup", "forceRetinaUserAgent", "force_retina_user_agent", {parse:false, type:"Boolean", expose:false});
			R.setOverwrite("setup", "useLegacyDirectory", "use_legacy_directory", {parse:false, type:"Boolean", expose:false});
			R.setOverwrite("setup", "useNonRetinaSource", "use_nonretina_source", {parse:false, type:"Boolean", expose:false});
			R.setOverwrite("setup", "subdirectory", "subdirectory");
			R.setOverwrite("setup", "multiframe", "multiframe", {parse:false, type:"Boolean", expose:false});
			R.setOverwrite("setup", "totalFrames", "total_frames", {parse:false, type:"Int", expose:false});
			R.setOverwrite("border", "borderColor", "border_color", {parse:true, type:"String", expose:true});
			R.setOverwrite("headline_text", "text", "headline_text");
			R.setOverwrite("headline_text", "color", "headline_text_color", {parse:true, type:"String", expose:true});
			R.setOverwrite("headline_text", "font", "headline_text_font", {parse:false, type:"String", expose:false});
			R.setOverwrite("headline_text", "fontSize", "headline_text_size", {parse:true, type:"Int", expose:false});
			R.setOverwrite("subhead_text", "text", "subhead_text");
			R.setOverwrite("subhead_text", "color", "subhead_text_color", {parse:true, type:"String", expose:true});
			R.setOverwrite("subhead_text", "font", "subhead_text_font", {parse:false, type:"String", expose:false});
			R.setOverwrite("subhead_text", "fontSize", "subhead_text_size", {parse:true, type:"Int", expose:false});
			R.setOverwrite("promo_text", "text", "promo_text");
			R.setOverwrite("promo_text", "color", "promo_text_color", {parse:true, type:"String", expose:true});
			R.setOverwrite("promo_text", "font", "promo_text_font", {parse:false, type:"String", expose:false});
			R.setOverwrite("promo_text", "fontSize", "promo_text_size", {parse:true, type:"Int", expose:false});
			R.setOverwrite("cta_text", "text", "cta_text");
			R.setOverwrite("cta_text", "color", "cta_text_color", {parse:true, type:"String", expose:true});
			R.setOverwrite("cta_text", "font", "cta_text_font", {parse:false, type:"String", expose:false});
			R.setOverwrite("cta_text", "fontSize", "cta_text_size", {parse:true, type:"Int", expose:false});
			R.setOverwrite("details_text", "text", "details_text");
			R.setOverwrite("details_text", "color", "details_text_color", {parse:true, type:"String", expose:true});
			R.setOverwrite("details_text", "font", "details_text_font", {parse:false, type:"String", expose:false});
			R.setOverwrite("details_text", "fontSize", "details_text_size", {parse:true, type:"Int", expose:false});
			R.setOverwrite("fg_img", "image", "fg_img");
			R.setOverwrite("fg_img", "color", "fg_img_tint", {parse:true, type:"String", expose:true});
			R.setOverwrite("logo_img", "image", "logo_img");
			R.setOverwrite("logo_img", "color", "logo_img_tint", {parse:true, type:"String", expose:true});
			R.setOverwrite("cta_img", "image", "cta_img");
			R.setOverwrite("style_img", "image", "style_img");
			R.setOverwrite("style_img", "color", "style_img_tint", {parse:true, type:"String", expose:true});
			R.setOverwrite("bg_img", "image", "bg_img");
			R.setOverwrite("bg", "color", "bg_color", {parse:true, type:"String", expose:true});
			R.setOverwrite("cta", "color", "cta_bg_color", {parse:true, type:"String", expose:true});
			R.setOverwrite("cta", "borderColor", "cta_border_color", {parse:true, type:"String", expose:true});
			R.setOverwrite("legal_text", "text", "legal_text");	
		}
		

		p._setRequired = function(){
			R.setRequiredVar("logo_img");
			R.setRequiredElement("logo_img");
			
		}
		/**
		 * Add a dependency to tell the framework to wait for certain assets to download before calling any animation functions.
		 * Note: Make sure all display objects in which you are writing custom code for is a dependency. 
		 */
		p._setGroups = function(){
			this._groups = {};
			
			this._groups.g1 = R.setGroup(["headline_text","subhead_text","promo_text"], [0,6,3], {alignment:"middle", renderOnStart:true, alignmentMethod:"y", frames:[0]});
			
			
			R.addTrigger({type:"click", action:"tween", frames:[0], id:["details_text"], rules:{condition:"exist",flashvars:{id:"legal_text",overwrite:"val"},val:""}, trigger:"myLegalTrigger"});
			R.addTrigger({type:"click", action:"tween", frames:[0], id:["legal_close_container"], trigger:"myLegalTriggerClose"});
			R.addTrigger({type:"click", action:"hit", id:["legal_bg","legal_text"], trigger:"0", frames:[0]});
		}

		p._setAdditionalDependencies = function(){
			R.setDependency(["headline_text","subhead_text","promo_text"],[0]);
			
		}

		p._addComponents = function(e){
			var groups = this._groups;
			R.addComponent("ef", "EF", {zIndex:301, left:0, top:0, width:728, height:90});
			
		}
		
		
		/**
		 * Animate creative. Called for the first time after the internal animate function is called and for every frame change
		 * @param {Object} e {currentFrame:1, isMultiframe:false, isOutro:false, isAuto:false, isIntro:false, duration:{intro:0.3, frame:2, outro:0.6}}
		 **/
		p._animate = function(e) {
			//trace("Creative._animate");
			/*switch (e.currentFrame){
				case 1:
					break;
				case 2:
					break;
			}*/
			
		}


		/**
		 * Allows the ability to setup display objects before the internal animation function is called.
		 * 
		 */
		p._prepareAnimation = function (e){
				
		}

		/**
		 * Called if the creative should fallback. 
		 * Note: This is useful when wanting to fall back to something other than an evergreen.
		 * @param {Object} e {reason:defaultReason, params:defaultParams}
		 **/
		p._creativeFallback = function (e){

		}

		/**
		 * Add additional event listeners.
		 * Note: This is useful when writing custom code for components
		 */
		p._addListeners = function(e) {
	
		}

		/**
		 * Ability to add a resource without manually editing JSON.
		 * Note: 'unshift' for thirdparties, 'push' for cnvr scripts
		 */
		p._addResources = function(){
		}

		/**
		 * Assign the resource to a var for use.
		 * Note: There is no need to do it for TweenMax/TimelineMax
		 * @param {Object} e {myClass:classInstance}
		 */
		p._assignResourceReference = function(reference){
			//this.myClass = reference.myClass;
		}

		/**
		 * Called at certain 'checkpoints' in the creative rendering process. 
		 * Note: Useful mainly for troubleshooting and analytics.
		 * @param {Object} e {msg:status}
		 **/
		p._statusUpdate = function(e){
			/*if (this.display.isCreativeFallback !== true){
				var currentTime = Number(new Date().getTime());
				switch (e.msg){
					case "REQUIRED-ASSETS-LOADED":
						this.Analytics.sendEvent(e.msg, "", currentTime - Number(this._startTime) );
						break;
					case "CREATIVE-RENDERED":
						this.Analytics.sendEvent(e.msg, "", currentTime - Number(this._startTime) );
						break;
				};
			}*/	
		}

		

		

		/* ---------------------END CUSTOMIZATION------------------------------------------------------------------------------------- */

		creatives.push(Creative);
	}());