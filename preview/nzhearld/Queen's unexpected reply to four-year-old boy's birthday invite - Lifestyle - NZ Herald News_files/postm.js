//*****PostMessage-v3.4.7****//
// Begin Fastlane
var adop_currs = document.querySelector('script[src*="postm.js"]');

if(adop_currs){

	var adop_flP = false;
	var adop_flU = false;

	var adop_qs = adop_currs.src.replace(/^[^\?]+\??/,'');
	var adop_args = adop_qs.split('&');

	if(adop_args.indexOf("fl=y") > -1){
		adop_flP = true;
	}

	if(adop_flP){

		//var adop_url_path = window.location.pathname;

		var adop_url_host = window.location.hostname;

		var adop_flUrls = [
			'www.nzherald.co.nz'
		];
		for (var i = adop_flUrls.length - 1; i >= 0; i--) {
			// if(adop_url_path == adop_flUrls[i]){
			// 	adop_flU = true;
			// }
			if(adop_url_host == adop_flUrls[i]){
				adop_flU = true;
			}
		}
	}

	if(adop_flP === true && adop_flU === true){

		if(typeof(aimRenderAd) !== 'undefined' && aimRenderAd.length === 7){

			var ntag = ntag || {};
			var rubicontag = rubicontag || {};
			rubicontag.cmd = rubicontag.cmd || [];

			var adSlots = [];

			aimRenderAd(728, 90, 'BIGBANNER','BigBanner','',bb_object,'y');

			aimRenderAd(300, 250, 'RECTANGLE','HeadlineRect','/POS=1',bb_object,'y');

			aimRenderAd(300, 250, 'RECTANGLE','ContentRect','/POS=2',bb_object,'y');

			aimRenderAd(300, 250, 'RECTANGLE','DirectRect','/POS=3',bb_object,'y');

			ntag.loadFastLane();
			ntag.loadSlots(adSlots);
			setTimeout(ntag.sasrun, 5000);
			//ntag.sasrun();

		}


	}

}
///////////////////// End Fastlane //////////////////////


var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
// Begin GlobalFunctions
var startT;
function adopNgmShow(e){
	document.getElementById('ngmlauncher').style.display = 'block';
	startT = new Date().getTime();
}
/////////////// End Global Functions ///////////////
// Now...
// if
//    "attachEvent", then we need to select "onmessage" as the event.
// if
//    "addEventListener", then we need to select "message" as the event

var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child IFrame window
eventer(messageEvent, function (e) {
	//check for SAS iframe
	if (e.origin == 'http://data.apn.co.nz') {

		//if data is being passed through
		if(e.data){
			var edata;

			if(typeof e.data === 'string') {
				if(e.data.indexOf("nzmeAdID") > -1){
					edata = JSON.parse(e.data);
				}else{
					return false;
				}
			} else {
				return false;
			}

			var i;
			var iframeID;
			var iframeP;
			var newW, newH;
			var tomatch;
			var ifs = document.getElementsByTagName("iframe");


			// Begin iframe resize
			if(edata["resize"]){
				//run through iframes and match the adID
				tomatch = edata["nzmeAdID"];

				for (i = 0; i < ifs.length; i++) {
					if (ifs[i].src.indexOf(tomatch) > -1) {
						iframeID = ifs[i];
						break;
					}
				}

				//if iframe is matched
				if(iframeID){
					//resize as required
					newW = edata["resize"]["width"];
					newH = edata["resize"]["height"];

					iframeID.height = newH;
					iframeID.width = newW;

					iframeP = iframeID.parentNode;
					iframeP.style.setProperty("width", newW+"px", "important");
					iframeP.style.setProperty("height", newH+"px", "important");

					iframeID.style.setProperty("width", newW+"px", "important");
					iframeID.style.setProperty("height", newH+"px", "important");

				}
			}
			// End iframe resize


			// Begin CSS Injection
			if(edata["css"]){
				function applyCSS(c){
					var styleEl = document.createElement('style'), styleSheet;

					// Append style element to head
					document.head.appendChild(styleEl);

					// Grab style sheet
					styleSheet = styleEl.sheet;

					for (var key in c) {
						if (c.hasOwnProperty(key)) {
							//$(key).css('cssText', c[key]);
							styleSheet.insertRule(key + "{ "+c[key]+" }", 0);
						}
					}
				}
				applyCSS(edata["css"]);
			}
			///////////////////// End CSS Injection //////////////////////

			// Begin Collapser Utility
			/**
			 * NOTE: only for new NZH
			 */
			if(edata["collapse"]){
				function collapse(c){
					var target = iframeID;
					do {
						target = target.parentElement;
					} while (target.classList.contains('pb-f-ads-ad') === false);
					target = target.id;
					var intent = c["intent"];
					if(intent == 'up'){
						$('#'+target).slideUp();
					} else if(intent == 'down'){
						$('#'+target).slideDown();
					}
				}
				collapse(edata["collapse"]);
			}

			///////////////////// End Collapser Utility //////////////////////

			// Begin NGM Launcher
			if(edata["ngmlauncher"]){
				function ngmLauncher(c){

					// GA
					(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
					(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
					m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
					})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
					ga('create', 'UA-8669708-15', 'auto', {'siteSpeedSampleRate': 10});

					var lmedia = c["lmedia"];
					lmedia = decodeURIComponent(lmedia);
					var lcurl = c["lcurl"];
					lcurl = decodeURIComponent(lcurl);
					var lprecurl = c["lprecurl"];
					lprecurl = decodeURIComponent(lprecurl);
					var limptrk = c["limptrk"];
					limptrk = decodeURIComponent(limptrk);
					var sasimp = lcurl.replace('adclick', 'count/act=1');
					sasimp = '<img src="'+sasimp+'" style="display:none;width:1px;height:1px;">';
					if(limptrk){ limptrk = '<img src="'+limptrk+'" style="display:none;width:1px;height:1px;">'; }else{ limptrk = ''; }
					// Var to stop multiclicks on GA timeSinceLaucher
					var j = false;

					function clickOTP(e){
						var stopT = new Date().getTime();
						var timeSinceLaucher = (stopT - startT);
						if(timeSinceLaucher >= 1000 && j === false){
							ga('send', 'timing', 'user_interactions', 'time-to-click', timeSinceLaucher);
							j = true;
						}
						if(timeSinceLaucher < 1000){
							e.preventDefault();
						} else{
							closeOTP();
							return true;
						}
					}

          // DOUBLECLICK MARKUP
          var dcid = c["ldcid"];
					var dcOrd = Math.round(Math.random()*100000000);
          var dcMarkup = '<div id="ngmlauncher" style="display:none;"><a id="launcherclose"><img src="http://media.nzherald.co.nz/nzmeads/img/rsz_close.png" width="55" style="z-index: 3;"><p style="color: white;position: absolute;right: 16px;z-index: 2;font-size: 12px;">[X]Close</p></a><a id="launchercreative"  href="'+lprecurl+'https://ad.doubleclick.net/ddm/jump/'+dcid+';sz=320x480;ord='+dcOrd+'?" target="_blank">'+'<IMG onload="adopNgmShow()" SRC="https://ad.doubleclick.net/ddm/ad/'+dcid+';sz=320x480;ord='+dcOrd+';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?" BORDER=0 WIDTH=320 HEIGHT=480 ALT="Advertisement" id="showimage"></a>'+limptrk+sasimp+'</div>';

					// SAS IA MARKUP
					var launchermarkup = '<div id="ngmlauncher" style="display:none;"><a id="launcherclose"><img src="http://media.nzherald.co.nz/nzmeads/img/rsz_close.png" width="55" style="z-index: 3;"><p style="color: white;position: absolute;right: 16px;z-index: 2;font-size: 12px;">[X]Close</p></a><a id="launchercreative" href="'+lcurl+'" target="_blank"><img onload="adopNgmShow()" src="'+lmedia+'"></a>'+limptrk+sasimp+'</div>';

					// Celtra MARKUP
					var cplacement = c["cplacementID"];
					var preclickurl = c["preclickurl"];

					var celtraMarkup="";
					celtraMarkup += "<div class=\"celtra-ad-v3\">";
					celtraMarkup += "    <img src=\"data:image\/png,celtra\" style=\"display: none\" onerror=\"";
					celtraMarkup += "        (function(img) {";
					celtraMarkup += "            var params = {'clickUrl':'"+preclickurl+"','expandDirection':'undefined','preferredClickThroughWindow':'new','clickEvent':'advertiser','externalAdServer':'Custom','tagVersion':'4'};";
					celtraMarkup += "            var req = document.createElement('script');";
					celtraMarkup += "            req.id = params.scriptId = 'celtra-script-' + (window.celtraScriptIndex = (window.celtraScriptIndex||0)+1);";
					celtraMarkup += "            params.clientTimestamp = new Date\/1000;";
					celtraMarkup += "            params.clientTimeZoneOffsetInMinutes = new Date().getTimezoneOffset();";
					celtraMarkup += "            params.hostPageLoadId = window.celtraHostPageLoadId = (window.celtraHostPageLoadId || (Math.random()+'').slice(2));";
					celtraMarkup += "            var src = (window.location.protocol == 'https:' ? 'https' : 'http') + ':\/\/ads.celtra.com\/"+cplacement+"\/web.js?';";
					celtraMarkup += "            for (var k in params) {";
					celtraMarkup += "                src += '&amp;' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);";
					celtraMarkup += "            }";
					celtraMarkup += "            req.src = src;";
					celtraMarkup += "            img.parentNode.insertBefore(req, img.nextSibling);";
					celtraMarkup += "        })(this);";
					celtraMarkup += "    \"\/>";
					celtraMarkup += "<\/div>";

					// Insert Showcase Markup
					if(cplacement){
						document.body.insertAdjacentHTML('afterbegin', celtraMarkup);
					} else {
						document.body.style.overflow = 'hidden';
						if(dcid){
							document.body.insertAdjacentHTML('afterbegin', dcMarkup);
						} else if(lmedia) {
							document.body.insertAdjacentHTML('afterbegin', launchermarkup);
						}
						document.getElementById('launchercreative').addEventListener('click', clickOTP);
						document.getElementById('launcherclose').addEventListener('click', closeOTP);
					}
          // Insert Showcase Markup
					function closeOTP() {
						var stopT = new Date().getTime();
						var otp = document.getElementById('ngmlauncher');
						otp.parentElement.removeChild(otp);
						document.body.style.overflow = 'auto';
						// Sends the timing hit to GA
						var timeSinceLaucher = (stopT - startT);
						if(j === false){
							ga('send', 'timing', 'user_interactions', 'time-to-close', timeSinceLaucher);
							j = true;
						}
					}
				}
				ngmLauncher(edata["ngmlauncher"]);
			}
			/////////////////////////////// End NGM Launcher ///////////////////////////////


			/**
			 * Viewroll
			 */
			 if (edata["viewroll"]) {
					 function renderVideo(a, adspot) {
							 $(document).ready(function() {
									 var vsiteVer = a["vsiteVer"];
									 console.log('sitever = ',vsiteVer);
									 var vmedia = a["vmedia"];
									 vmedia = decodeURIComponent(vmedia);
									 var vcomp = a["vcomp"];
									 vcomp = decodeURIComponent(vcomp);
									 var vcurl = a["vcurl"];
									 vcurl = decodeURIComponent(vcurl);
									 var vsimp = a["vsimp"];
									 vsimp = decodeURIComponent(vsimp);
									 var veimp = a["veimp"];
									 veimp = decodeURIComponent(veimp);
									 var vpos = a["vpos"];
									 var vwide = a["vwide"];
									 var vfcid = a["vfcid"];
									 var sasimp = vcurl.replace('adclick', 'count/act=1');
									 var sasact = vcurl.replace('adclick', 'count/act=3');
									 var vwidth, vheight, vban, voffsetD = 210,
											 vCRlab = '',
											 vCRcount = '',
											 vname, vClass, vskip = -1,
											 video, firstplay = true;
									 var vscripts, vindex = 0;
									 vscripts = ['http://vjs.zencdn.net/4.7.1/video.js', '//cdn.jsdelivr.net/viewability/latest/viewability.min.js', '//media.nzherald.co.nz/nzmeads/dev/iphone-inline-video.min.js'];

									 function load_script() {
											 if (vindex < vscripts.length) {
													 $.getScript(vscripts[vindex], function() {
															 vindex++;
															 load_script();
													 });
											 } else {
													 startVR();
											 }
									 }
									 load_script();

									 function startVR() {
											 $('head').append('<link rel="stylesheet" href="http://vjs.zencdn.net/4.7/video-js.css" type="text/css" />');
											 $('head').append('<link rel="stylesheet" href="http://media.nzherald.co.nz/nzmeads/viewroll/viewroll.css" type="text/css" />');
											 if (vpos == 1) {
													 vClass = 'vr_block';
													 vwidth = 300;
													 if (vcomp) {
															 vheight = 200;
															 vClass = 'vr_block vr_comp';
													 } else {
															 vheight = 250;
													 }
											 }
											 if (vpos == 2) {
													 if (vwide) {
															 vwidth = 540;
															 vheight = 305;
															 vCRlab = '<div id="vlab">&dtrif; Advertising &dtrif;</div>';
															 vCRcount = '<div id="vcount"><p>Close ad in <span id="vtime">5</span></p></div>';
															 voffsetD = 260;
															 vClass = 'vr_wide';
															 vskip = 5;
													 } else {
															 vClass = 'vr_block advert';
															 vwidth = 300;
															 if (vcomp) {
																	 vheight = 200;
																	 vClass = 'vr_block advert vr_comp';
															 } else {
																	 vheight = 250;
															 }
													 }
											 }
											 if (vpos == 3) {
													 vClass = 'vr_block';
													 vwidth = 300;
													 if (vcomp) {
															 vheight = 200;
															 vClass = 'vr_block vr_comp';
													 } else {
															 vheight = 250;
													 }
											 }

											 var vmutebutton = '<img id="vunmutebtn" src="//media.nzherald.co.nz/nzmeads/img/viewroll-mute.png" style=" display:none; position: absolute; z-index: 10; right: 7px; width: 30px;">'
											 var vunmutebutton = '<img id="vmutebtn" src="//media.nzherald.co.nz/nzmeads/img/viewroll-unmute.png" style=" display: inline-block; position: absolute; z-index: 10; right: 7px; width: 30px;">';

											 vname = 'vblock' + vpos;
											 if (vcomp) {
													 vban = '<p style="margin:0; height:50px; display:inline-block;"><a target="_blank" href="' + vcurl + '"><img src="' + vcomp + '"></a></p>';
											 }
											 video = vCRlab + '<div class="vidcont ' + vClass + '">' + vCRcount + '<div id="vctr" class="vctr">' + vunmutebutton + vmutebutton + '<a target="_blank" href="' + vcurl + '"></a></div><video id="' + vname + '" class="video-js vjs-default-skin vjs-big-play-centered" playsinline muted controls volume webkit-playsinline preload="auto" width="' + vwidth + '" height="' + vheight + '" data-setup=\'{ "techOrder":["flash", "html5"] }\'> <source src="' + vmedia + '" type="video/mp4"><p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p></video>' + vban;

											 $(video).insertAfter(adspot);
											 $(adspot).remove();

											 /* New site magic */
											 if(vpos==2 && vwide){
												 //modify parent div with class ad-container has-text max-width-300 - max-width:540px; margin-top: 14px;
												 if(vsiteVer){
													 var vhaxVideoCont = $('.vr_wide')[0];
													 do {
														 vhaxVideoCont = vhaxVideoCont.parentElement;
													 } while(vhaxVideoCont.classList.contains('max-width-300') === false);
													 vhaxVideoCont.style.maxWidth = '540px';
													 //remove ad label - a sibling div with class ad-text-before. assuming the container has been found above
													 var vhaxVideoCC = $(vhaxVideoCont).children();
													 for (var i=0; i < vhaxVideoCC.length; i++){
														 console.log('looping through vhaxVideoCC');
														 if (vhaxVideoCC[i].classList.contains('ad-text-before')){
															 $(vhaxVideoCC[i]).remove();
														 }
													 }
													 $('#vlab')[0].style.position  = 'absolute';
													 $('#vlab')[0].style.top  = '-16px';
												 }
												 // applies to new and old site
												 $('#vmutebtn')[0].style.bottom = '0px';
												 $('#vunmutebtn')[0].style.bottom = '0px';
											 }
											 /* END of new site magic */
											 var myPlayer = videojs(vname);
											 var $vidcont = $('.vidcont');
											 var vidcont = document.getElementsByClassName('vidcont')[0];
											 var firstend = true;
											 $vidcont.append('<img style="display:none;" src="' + sasact + '">');

											 var vr_unmutebtn = document.getElementById('vunmutebtn');
											 var vr_mutebtn = document.getElementById('vmutebtn');
											 vr_unmutebtn.addEventListener('click', vr_soundToggle);
											 vr_mutebtn.addEventListener('click', vr_soundToggle);

											 function vr_soundToggle() {
													 if (myPlayer.muted() == true) {
															 myPlayer.muted(false);
															 vr_unmutebtn.style.display = "inline-block";
															 vr_mutebtn.style.display = "none";
													 } else if (myPlayer.muted() == false) {
															 myPlayer.muted(true);
															 vr_unmutebtn.style.display = "none";
															 vr_mutebtn.style.display = "inline-block";
													 }
											 }
											 myPlayer.ready(function() {



													 var vctime, vdur, vprc;
													 var vtime25 = false;
													 var vtime50 = false;
													 var vtime75 = false;
													 var vtime5sec = false;
													 /****timeupdate Event****/
													 var timeEvent = function() { // event for the timeupdate, which gets fired every 15-250ms automatically while playing
															 vctime = Math.round(myPlayer.currentTime()); // where is the video currently at, and what is it's duration
															 vdur = Math.round(myPlayer.duration());
															 vprc = Math.round(vctime / vdur * 100); // what percent is it at of the total video duration
															 if (vctime >= 5 && !vtime5sec) { // if it reaches 5sec
																	 vtime5sec = true;
																	 $vidcont.append('<img style="display:none;" src="' + sasimp + '">');

																	 if (vsimp) {
																			 $vidcont.append('<img style="display:none;" src="' + vsimp + '">');
																	 }
															 }
															 if (vprc >= 25 && !vtime25) { // if it reaches 25%
																	 vtime25 = true;
																	 $vidcont.append('<img style="display:none;" src="http://data.apn.co.nz/apnnz/count/actname=AdFirstQuartile/fcid=' + vfcid + '">');
															 }
															 if (vprc >= 50 && !vtime50) { // if it reaches 50%
																	 vtime50 = true;
																	 $vidcont.append('<img style="display:none;" src="http://data.apn.co.nz/apnnz/count/actname=AdMidPoint/fcid=' + vfcid + '">');
															 }
															 if (vprc >= 75 && !vtime75) { //if it reaches 75%
																	 vtime75 = true;
																	 $vidcont.append('<img style="display:none;" src="http://data.apn.co.nz/apnnz/count/actname=AdThirdQuartile/fcid=' + vfcid + '">');
															 }

													 };
													 myPlayer.on("timeupdate", timeEvent); //call the timeupdate function when the event fires (every 15-250ms)
													 this.on("firstplay", function() {
															 if (firstplay) {
																	 $vidcont.append('<img style="display:none;" src="http://data.apn.co.nz/apnnz/count/actname=AdStart/fcid=' + vfcid + '">');
																	 firstplay = false;
															 }
															 if (vpos == 2 && vwide) {
																	 var $vcount = $('#vcount');
																	 (function() {
																			 var timeLeft = 5,
																					 cinterval;
																			 var timeDec = function() {
																					 timeLeft--;
																					 if (timeLeft > 0) {
																							 document.getElementById('vtime').innerHTML = timeLeft;
																					 }
																					 if (timeLeft === 0) {
																							 clearInterval(cinterval);
																							 $vcount.html('<p>Close ad<span id="vclose"></span></p>');
																							 // $vcount.find('p').css('padding-right', '20px');
																							 $vcount.on('click', function(event) {
																									 event.preventDefault();
																									 myPlayer.off();
																									 var vhaxToBeRemoved = $('.vr_wide')[0];
																									 if (vsiteVer) {
																										 do {
																											 vhaxToBeRemoved = vhaxToBeRemoved.parentElement;
																										 } while (vhaxToBeRemoved.classList.contains('max-width-300') === false);
																									 }
																									 $(vhaxToBeRemoved).slideUp(function() {
																											 myPlayer.dispose();
																									 });
																									 $('#vlab').slideUp();
																							 });
																					 }
																			 };
																			 cinterval = setInterval(timeDec, 1000);
																	 })();
															 }
													 });
													 this.on("ended", function() {
															 if (firstend) {
																	 $vidcont.append('<img style="display:none;" src="http://data.apn.co.nz/apnnz/count/actname=AdComplete/fcid=' + vfcid + '">');
																	 if (veimp) {
																			 $vidcont.append('<img style="display:none;" src="' + veimp + '">');
																	 }
																	 firstend = false;
																	 window.removeEventListener("scroll", vr_checkScroll);
																	 window.removeEventListener("touchend", vr_checkScroll);
															 }
													 });
											 });
											 var vr_view;
											 window.addEventListener("scroll", vr_checkScroll);
											 window.addEventListener("touchend", vr_checkScroll);

											 function vr_checkScroll() {
													 vr_view = viewability.vertical(vidcont);
													 console.log(vr_view.state);
													 if (vr_view.state == 'EL_IS_WITHIN_VERTICAL_VIEW') {
															 myPlayer.play();
													 } else {
															 myPlayer.pause();
													 }
											 }
											 vr_checkScroll();
									 }
							 });
					 }
					 renderVideo(edata["viewroll"], iframeP);
			 }
			/**
			 * End ViewRoll
			 */

			// Begin Interscroller
			if(edata["interscroller"]){
				var adid = edata["interscroller"]["adid"];
				var curl = edata["interscroller"]["curl"];
				curl = decodeURIComponent(curl);
				var limptrk = edata["interscroller"]["imptrk"];
				limptrk = decodeURIComponent(limptrk);
				var celtra = "<div class=\"celtra-ad-v3\">"+
				limptrk+
				"<img src=\"data:image/png,celtra\" style=\"display: none\" onerror=\""+
				"(function(img) {"+
				"var params = {'clickUrl':'"+curl+"','expandDirection':'undefined','preferredClickThroughWindow':'new','textColor':'#FFFFFF','barColor':'#000000','advertisementMessage':'Advertisement','scrollMessage':'Scroll to continue with content','useFullWidth':'1','offsetTop':'44','clickEvent':'advertiser','externalAdServer':'Custom','tagVersion':'3','useScreenFixation':'1'};"+
				"var req = document.createElement('script');"+
				"req.id = params.scriptId = 'celtra-script-' + (window.celtraScriptIndex = (window.celtraScriptIndex||0)+1);"+
				"params.clientTimestamp = new Date/1000;"+
				"params.clientTimeZoneOffsetInMinutes = new Date().getTimezoneOffset();"+
				"var src = (window.location.protocol == 'https:' ? 'https' : 'http') + '://ads.celtra.com/"+adid+"/web.js?';"+
				"for (var k in params) {"+
				"src += '&amp;' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);"+
				"}"+
				"req.src = src;"+
				"img.parentNode.insertBefore(req, img.nextSibling);"+
				"})(this);"+
				"\"/>"+
				"</div>";
				var bodyAd = document.getElementById('bodyAd');
				if(bodyAd){
					bodyAd.style.width = '100%';
					bodyAd.insertAdjacentHTML('afterbegin', celtra);
				}
			}
			// End Interscroller

			// Begin Desktop Slider
			if(edata["NZHSlider"]){
				function SliderLauncherD(c){
					var lmedia = c["lmedia"];
					lmedia = decodeURIComponent(lmedia);
					var lcurl = c["lcurl"];
					lcurl = decodeURIComponent(lcurl);
					var limptrk = c["limptrk"];
					limptrk = decodeURIComponent(limptrk);
					if(limptrk){ limptrk = '<img src="'+limptrk+'" style="display:none;width:1px;height:1px;">'; }else{ limptrk = ''; }
					var sasimp = lcurl.replace('adclick', 'count/act=1');
					sasimp = '<img src="'+sasimp+'" style="display:none;width:1px;height:1px;">';
					var zoomtrack = lcurl.replace('adclick', 'count/act=3');
					zoomtrack = '<img src="'+zoomtrack+'" style="display:none;width:1px;height:1px;">';
					var zoomTracked = false;
					var lotameZoom = c["lotamezoom"];
					lotameZoom = decodeURIComponent(lotameZoom);
					lotameZoom = '<img src="'+lotameZoom+'" style="display:none;width:1px;height:1px;">';
					var markup = '<div id="sldr_div">'+
						'<div id="sldr_clip">'+
							'<div id="sldr_crtv">'+
									'<img id="sldr_img" src="'+lmedia+'">'+
							'</div>'+
						'</div>'+
						'<span id="sldr_lbltop">&#9660; Advertisement &#9660;</span>'+
						'<span id="sldr_lblbot" style="bottom: 0px;">Click Ad to Expand</span>'+
						limptrk+sasimp+
					'</div>';
					var divCR = document.getElementById('DivContentRect');
					if(divCR){
							divCR.innerHTML = markup;
							divCR.style.margin = 0;
							divCR.style.padding = 0;
							divCR.style.float = 'none';
							divCR.style.removeProperty('height');
					}
					var zoom = ''+
					'<div id="sldr_zm">'+
						'<div id="sldr_zm_container">'+
							'<a id="sldr_close" href="##">'+
								'<img src="http://media.nzherald.co.nz/nzmeads/img/rsz_close.png" width="50">'+
							'</a>'+
							'<a href="'+lcurl+'" target="_blank">'+
								'<img id="sldr_zm_img" src="'+lmedia+'">'+
							'</a>'+
						'</div>'+
					'</div>';
					var zoomIns = document.getElementsByTagName('body')[0]
					if(zoomIns){
						zoomIns.insertAdjacentHTML('afterbegin', zoom);
					}
					var zoomState = false;

					function togZoom(){
						if (!zoomState){
							document.getElementById("sldr_zm").style.opacity = 1;
							document.getElementById("sldr_zm").style.height = '100vh';
							document.getElementById("sldr_zm_img").style.height = '90vh';
							var sldrLMargin = ((document.getElementById('sldr_zm_img').width - 20)+'px');
							document.getElementById("sldr_close").style.marginLeft = sldrLMargin;
							document.getElementById("sldr_close").style.display = 'block';
							document.getElementById("sldr_crtv").style.display = 'none';
							zoomState = !zoomState;
							if (!zoomTracked){
								// NOTE: this is for tracking expands either with a 3rd-party endpoint or Lotame. This is an unused feature but will be kept here for future campaigns.
								document.body.insertAdjacentHTML('afterbegin', zoomtrack);
								document.body.insertAdjacentHTML('afterbegin', lotameZoom);
								zoomTracked = true;
							}
						} else if (zoomState){
							document.getElementById("sldr_zm").style.opacity = 0;
							document.getElementById("sldr_zm").style.height = 0;
							document.getElementById("sldr_zm_img").style.height = 0;
							document.getElementById("sldr_close").style.display = 'none';
							document.getElementById("sldr_crtv").style.display = 'block';
							zoomState = !zoomState;
						}
					}
					document.getElementById('sldr_clip').addEventListener('click', togZoom);
					document.getElementById('sldr_zm').addEventListener('click', togZoom);
				}
				SliderLauncherD(edata["NZHSlider"]);
			}
			/////////////////////// End Desktop Slider ///////////////////////////

			// Begin Mobile Slider
			if(edata["NZHMNGMSlider"]){
				function SliderLauncherM(c){
					var lmedia = c["lmedia"];
					lmedia = decodeURIComponent(lmedia);
					var lcurl = c["lcurl"];
					lcurl = decodeURIComponent(lcurl);
					var limptrk = c["limptrk"];
					limptrk = decodeURIComponent(limptrk);
					if(limptrk){ limptrk = '<img src="'+limptrk+'" style="display:none;width:1px;height:1px;">'; }else{ limptrk = ''; }
					var sasimp = lcurl.replace('adclick', 'count/act=1');
					sasimp = '<img src="'+sasimp+'" style="display:none;width:1px;height:1px;">';
					var zoomtrack = lcurl.replace('adclick', 'count/act=3');
					zoomtrack = '<img src="'+zoomtrack+'" style="display:none;width:1px;height:1px;">';
					var zoomTracked = false;
					var lotameZoom = c["lotamezoom"];
					lotameZoom = decodeURIComponent(lotameZoom);
					lotameZoom = '<img src="'+lotameZoom+'" style="display:none;width:1px;height:1px;">';
					var lotameZoomTracked = false;
					var markup = '<div id="sldr_div" class="m_sldr">'+
							'<div id="sldr_clip" class="m_sldr">'+
								'<div id="sldr_crtv" class="m_sldr">'+
										'<img id="sldr_img" class="m_sldr" src="'+lmedia+'">'+
								'</div>'+
							'</div>'+
							'<span id="sldr_lbltop" class="m_sldr">&#9660; Advertisement &#9660;</span>'+
							'<span id="sldr_lblbot" class="m_sldr">Tap Ad to Expand</span>'+
							limptrk+sasimp+
						'</div>';
					var launchermarkup = '<div id="ngmlauncher"><a id="launcherclose"><img src="http://media.nzherald.co.nz/nzmeads/img/rsz_close.png" width="50"></a><a id="launchercreative" href="'+lcurl+'" target="_blank"><img src="'+lmedia+'"></a>'+limptrk+sasimp+'</div>';
					document.body.insertAdjacentHTML('afterbegin', launchermarkup);
					var divCR = document.getElementById('bodyAd');
					if(divCR){
						divCR.innerHTML = markup;
						divCR.style.maxWidth = '300px';
						divCR.style.margin = 'auto auto';
						divCR.style.clear = 'both';
					}
					var sldr_div = document.getElementById('sldr_div');
					if(sldr_div){
						sldr_div.style.width = '100%';
					}
					var sldr_img = document.getElementById('sldr_img');
					if(sldr_img){
						sldr_img.style.width = '100%';
					}
					divCR.style.setProperty ("float", "none","important");
					var zoomState = false;
					function togZoom() {
						if(zoomState === false){
							document.getElementById('ngmlauncher').style.display = 'block';
							document.getElementById("sldr_crtv").style.display = 'none';
							zoomState = true;
							if (zoomTracked === false){
								document.body.insertAdjacentHTML('afterbegin', zoomtrack);
								zoomTracked = true;
							}
							if (lotameZoomTracked === false){
								document.body.insertAdjacentHTML('afterbegin', lotameZoom);
								lotameZoomTracked = true;
							}
						} else if(zoomState === true){
							document.getElementById('ngmlauncher').style.display = 'none';
							document.getElementById("sldr_crtv").style.display = 'block';
							zoomState = false;
						}
					}
					document.getElementById('sldr_crtv').addEventListener('click', togZoom);
					document.getElementById('launcherclose').addEventListener('click', togZoom);
				}
				SliderLauncherM(edata["NZHMNGMSlider"]);
			}
			/////////////////////////////////// END Mobile Slider ///////////////////////////////////

			// Begin Viva Billboard desktop slider v1.0
			if(edata["VIVABBSlider"]){
				function setCreative(img, cont, adj){
					var ratio = findRatio(img.clientWidth,img.clientHeight);
					if(ratio > 1 && ratio != 1){
						img.style.width = cont.clientWidth+'px';
						img.style.top = (((window.innerHeight + adj) - img.clientHeight)/2)+'px';
					}
					else if(ratio < 1 && ratio != 1){
						img.style.height = (window.innerHeight - adj)+'px';
						img.style.left = ((cont.clientWidth - img.clientWidth)/2)+'px';
						img.style.top = adj+'px';
					}
					else if(ratio == 1){
						var inRatio = cont.clientWidth/(window.innerHeight - adj);
						if(inRatio > 1){
							img.style.height = (window.innerHeight - adj)+'px';
							img.style.left = ((cont.clientWidth - img.clientWidth)/2)+'px';
							img.style.top = adj+'px';
						}
						else if(inRatio < 1){
							img.style.width = cont.clientWidth+'px';
							img.style.top = ((window.innerHeight - img.clientHeight)/2)+'px';
						}
						else if(inRatio == 1){
							img.style.width = cont.clientWidth+'px';
							img.style.top = adj+'px';
						}
					}
				}
				function setBGWidth(img, cont){
					var contW = cont.clientWidth;
					var innerH = window.innerHeight;
					var ratio = findRatio(img.clientWidth,img.clientHeight);
					if((ratio > 1 && ratio != 1) || ratio == 1){
						img.style.height = innerH+'px';
					}
					else if(ratio < 1 && ratio != 1){
						img.style.width = contW+'px';
					}
				}
				function findRatio(w,h) {
					var ratio = w/h;
					return ratio;
				}
				function startVivaSldr(c){ // entry point
					var lmedia = c["lmedia"];
					lmedia = decodeURIComponent(lmedia);
					var lcurl = c["lcurl"];
					lcurl = decodeURIComponent(lcurl);
					var limptrk = c["limptrk"];
					limptrk = decodeURIComponent(limptrk);
					if(limptrk){ limptrk = '<img src="'+limptrk+'" style="display:none;width:1px;height:1px;">'; }else{ limptrk = ''; }
					var sasimp = lcurl.replace('adclick', 'count/act=1');
					sasimp = '<img src="'+sasimp+'" style="display:none;width:1px;height:1px;">';
					var zoomtrack = lcurl.replace('adclick', 'count/act=3');
					zoomtrack = '<img src="'+zoomtrack+'" style="display:none;width:1px;height:1px;">';
					var zoomTracked = false;
					var lotameZoom = c["lotamezoom"];
					lotameZoom = decodeURIComponent(lotameZoom);
					lotameZoom = '<img src="'+lotameZoom+'" style="display:none;width:1px;height:1px;">';
					var lotameZoomTracked = false;
					var newCSS = edata["lcss"];
					newCSS = decodeURIComponent(newCSS);
					document.querySelector('style').textContent += newCSS;
					var markup = '<div id="cubecont">'+
					'<div class="cssload-thecube">'+
						'<div class="cssload-cube cssload-c1"></div>'+
						'<div class="cssload-cube cssload-c2"></div>'+
						'<div class="cssload-cube cssload-c4"></div>'+
						'<div class="cssload-cube cssload-c3"></div>'+
					'</div>'+
					'</div>'+
					'<div id="sldr_div">'+
						'<div id="sldr_clip">'+
							'<div id="sldr_crtv">'+
									'<img id="sldr_bg" src="'+lmedia+'">'+
									'<img id="sldr_img" src="'+lmedia+'">'+
							'</div>'+
						'</div>'+
						'<span id="sldr_lbltop">&#9660; Advertisement &#9660;</span>'+
						'<span id="sldr_lblbot">Click Ad to Expand</span>'+
						limptrk+sasimp+
					'</div>';
					var divBB = document.getElementById('DivBillboard');
					if(divBB){
							divBB.innerHTML = markup;
							divBB.style.margin = 0;
							divBB.style.padding = 0;
							divBB.style.float = 'none';
							divBB.style.removeProperty('height');
					}
					var zoom = '<a id="sldr_close" href="##">'+
						'<img src="http://media.nzherald.co.nz/nzmeads/img/rsz_close.png" width="50">'+
					'</a>'+
					'<div id="sldr_zm">'+
						'<a href="'+lcurl+'" target="_blank">'+
							'<img id="sldr_zm_img" src="'+lmedia+'">'+
						'</a>'+
					'</div>';
					var zoomIns = document.getElementsByTagName('body')[0]
					if(zoomIns){
						zoomIns.insertAdjacentHTML('afterbegin', zoom);
					}
					var zoomState = false;
					function togZoom(){
						if (zoomState === false){
							document.getElementById("sldr_zm").style.opacity = 1;
							document.getElementById("sldr_zm").style.height = '100vh';
							document.getElementById("sldr_zm").style.display = 'inline-block';
							document.getElementById("sldr_zm_img").style.height = 'auto';
							document.getElementById("sldr_close").style.display = 'block';
							document.getElementById("sldr_img").style.display = 'none';
							zoomState = true;
							if (zoomTracked === false){
								document.body.insertAdjacentHTML('afterbegin', zoomtrack);
								zoomTracked = true;
							}
							if (lotameZoomTracked === false){
								document.body.insertAdjacentHTML('afterbegin', lotameZoom);
								lotameZoomTracked = true;
							}
						} else if (zoomState === true){
							document.getElementById("sldr_zm").style.opacity = 0;
							document.getElementById("sldr_zm").style.height = 0;
							document.getElementById("sldr_zm").style.display = 'none';
							document.getElementById("sldr_zm_img").style.height = 0;
							document.getElementById("sldr_close").style.display = 'none';
							document.getElementById("sldr_img").style.display = 'block';
							zoomState = false;
						}
					}
					document.getElementById('sldr_clip').addEventListener('click', togZoom);
					document.getElementById('sldr_close').addEventListener('click', togZoom);
					document.getElementById('sldr_zm').addEventListener('click', togZoom);
					var bg = document.getElementById('sldr_bg');
					var img = document.getElementById('sldr_img');
					var cont = document.getElementById('sldr_div');
					var sldrzm = document.getElementById('sldr_zm');
					var sldrzmimg = document.getElementById("sldr_zm_img");
					$('img#sldr_bg').on('load',function(){
						setCreative(img, cont, 64);
						setBGWidth(bg, cont);
						setTimeout(function() {
							$( "#cubecont" ).slideUp( "slow", function() {
							document.getElementById("cubecont").style.height = 0;
							});
						}, 500);
					});
				}
				startVivaSldr(edata["VIVABBSlider"]);
			}
			///////////////// End Viva desktop slider /////////////////

			// Begin Sidepush
			if(edata["sidepush"]){
			  var adtag = edata["adtag"];
			  adtag = decodeURIComponent(adtag);
			  var bodyAd = document.getElementById('DivRectangle1');
			  if(bodyAd){
			    bodyAd.style.width = '100%';
			      bodyAd.insertAdjacentHTML('afterbegin', adtag);
			  }
			}
			///////////////// End Sidepush/////////////////




			/* ========================= FORMATS IN TESTING BELOW THIS LINE ==================================*/

			// Begin Pushdown
            if(edata["pushdown"]){

              (function() {

                console.log('PM PD PROD v1.33');

                var curl = edata["pushdown"]["curl"];
                curl = decodeURIComponent(curl);
                var imptrk = edata["pushdown"]["imptrk"];
                imptrk = decodeURIComponent(imptrk);
                var videoHq = edata["pushdown"]["videoHq"];
                videoHq = decodeURIComponent(videoHq);
								var videoLq = edata["pushdown"]["videoLq"];
                videoLq = decodeURIComponent(videoLq);
                var cta = edata["pushdown"]["cta"];
                cta = decodeURIComponent(cta);
                var logo = edata["pushdown"]["logo"];
                logo = decodeURIComponent(logo);
                var backupHq = edata["pushdown"]["backupHq"];
                backupHq = decodeURIComponent(backupHq);
                var backupLq = edata["pushdown"]["backupLq"];
                backupLq = decodeURIComponent(backupLq);
                var sasact = curl.replace('adclick', 'count/act=3');
                sasact = '<img src="'+sasact+'" style="display:none;width:1px;height:1px;">';
                var fcid = edata["fcid"];
                var pdEnv = edata["pushdown"]["pdEnv"];

                var pdcss = document.createElement('link');
                pdcss.type = 'text/css';
                pdcss.rel = 'stylesheet';
                pdcss.href = '//media.nzherald.co.nz/nzmeads/dev/pushdown/pushdown.css?24';
                document.head.appendChild(pdcss);

                var vjcss = document.createElement('link');
                vjcss.type = 'text/css';
                vjcss.rel = 'stylesheet';
                vjcss.href = 'http://vjs.zencdn.net/5.8.8/video-js.css';
                document.head.appendChild(vjcss);

                function loadScript(url, callback){

                    var script = document.createElement("script");
                    script.type = "text/javascript";

                    if (script.readyState){  //IE
                        script.onreadystatechange = function(){
                            if (script.readyState == "loaded" ||
                                    script.readyState == "complete"){
                                script.onreadystatechange = null;
                                if(callback){ callback(); }
                            }
                        };
                    } else {  //Others
                        script.onload = function(){
                            if(callback){ callback(); }
                        };
                    }

                    script.src = url;
                    document.getElementsByTagName("head")[0].appendChild(script);
                }

                loadScript("//cdn.jsdelivr.net/viewability/latest/viewability.min.js", function(){
                  loadScript("//vjs.zencdn.net/4.7.1/video.js", pd_DR);
                });

                var pd_cont = document.createElement('div');
                pd_cont.setAttribute('id', 'pd_div');

								/**
								 * NOTE: autoplay logic hack is in place. would have to approach this differently if we want to optimize performance. e.g. cut down on unused functions and trackers.
								 */
                var pd_markup;
                pd_markup += '    <div id="pd_controls">';
                pd_markup += '        <div id="pd_closebtn"></div>';
                pd_markup += '        <div id="pd_volumebtn">';
                pd_markup += '            <img id="pd_mutebtn" src="//media.nzherald.co.nz/nzmeads/dev/pushdown/mute.png">';
                pd_markup += '            <img id="pd_unmutebtn" src="//media.nzherald.co.nz/nzmeads/dev/pushdown/vol.png">';
                pd_markup += '        </div>';
                pd_markup += '    </div>';
                pd_markup += '    <div id="pd_logo">';
                pd_markup += '        <a target="_blank" href="'+curl+'"><img src="'+logo+'"></a>';
                pd_markup += '    </div>';
                pd_markup += '    <div id="pd_overlay">';
                pd_markup += '        <a target="_blank" href="'+curl+'"><img src="'+cta+'"></a>';
                pd_markup += '    </div>';
                pd_markup += '    <div id="pd_up">';
                pd_markup += '        <span id="pd_uptext">ADVERTISEMENT</span>';
                pd_markup += '    </div>';
                pd_markup += '    <div id="pd_down">';
                pd_markup += '        <div id="pd_downarrow">';
                pd_markup += '            <a href="#">';
                pd_markup += '              <span id="pd_bottom"></span>';
                pd_markup += '            </a>';
                pd_markup += '        </div>';
                pd_markup += '        <br>';
                pd_markup += '        <span id="pd_downtext">CONTINUE TO NZ HERALD</span>';
                pd_markup += '    </div>';
                pd_markup += '    <div id="pd_shadow"></div>';
                pd_markup += '    <div id="pd_clip">';
                pd_markup += '        <div id="pd_crtv" style="display: block;">';

								var pdAutoplayEnvs = ['desktop','mobile-wifi','wifi-ios-10'];
								if (pdAutoplayEnvs.indexOf(pdEnv) > -1){
									console.log('PUSHDOWN: autoplay environment');
									pd_markup += '          <video id="pd_video" class="video-js" playsinline autoplay preload loop muted';
								} else {
									console.log('PUSHDOWN: non-autoplay environment');
									pd_markup += '          <video id="pd_video" class="video-js" playsinline preload loop';
								}

								var pdHqAssetEnvs = ['desktop'];
								if (pdHqAssetEnvs.indexOf(pdEnv) > -1){
									console.log('PUSHDOWN: HQ environment');
									pd_markup += '          poster="'+backupHq+'" data-setup="{}" width="100%" height="100%">';
	                pd_markup += '            <source src="'+videoHq+'" type="video/mp4">';
								} else {
									console.log('PUSHDOWN: LQ environment');
									pd_markup += '          poster="'+backupLq+'" data-setup="{}" width="100%" height="100%">';
	                pd_markup += '            <source src="'+videoLq+'" type="video/mp4">';
								}
                pd_markup += '          </video>';
                pd_markup += '        </div>';
                pd_markup += '    </div>';

                pd_cont.innerHTML = pd_markup;


                var pd_video;
                var pd_rdy;
                var pd_video_rdy;
                var pd_playing;
                var window_sY;
                var window_w;
                var nzh_hamnav;
                var main;
                var pd_div;
                var pd_clip;
                var pd_crtv;
                var pd_closebtn;
                var pd_volumebtn;
                var pd_mutebtn;
                var pd_unmutebtn;
                var pd_down;

                var main_w;
                var main_h;
                var main_x;

                var pd_view;
                var pd_firstRun = true;

                function pd_DR(){

                    main = document.getElementById('main');
                    main.insertBefore(pd_cont, main.firstChild);

                    pd_video = videojs('pd_video');

                    pd_rdy = false;
                    pd_video_rdy = false;
                    pd_playing = false;
                    nzh_hamnav = document.querySelector('.compressed .site-logo-wrapper');

                    pd_div = document.getElementById('pd_div');
                    pd_clip = document.getElementById('pd_clip');
                    pd_crtv = document.getElementById('pd_crtv');
                    pd_closebtn = document.getElementById('pd_closebtn');
                    pd_volumebtn = document.getElementById('pd_volumebtn');
                    pd_mutebtn = document.getElementById('pd_mutebtn');
                    pd_unmutebtn = document.getElementById('pd_unmutebtn');
                    pd_down = document.getElementById('pd_down');

                    main_w = main.offsetWidth;
                    main_h = main_w / 1.78;
                    main_x = main.getBoundingClientRect();

                    main_x = main_x.left;

                    videojs("pd_video").ready(function(){

                        var firstplay = true;
                        var firstend = true;

                        var vctime, vdur, vprc;
                        var vtime25 = false;
                        var vtime50 = false;
                        var vtime75 = false;
                        var vtime100 = false;
                        var vtime5sec = false;
                        /****timeupdate Event****/
                        var timeEvent = function(){
                          vctime = Math.round(pd_video.currentTime());
                          vdur = Math.round(pd_video.duration());
                          vprc = Math.round(vctime/vdur*100);

                          if(!vtime25){
                              if(vprc>=25){
                                  console.log('vtime25');
                                  vtime25=true;
                                  pd_cont.insertAdjacentHTML('afterend','<img style="display:none;" src="http://data.apn.co.nz/apnnz/count/actname=AdFirstQuartile/fcid='+fcid+'">');
                              }
                          }
                          if(!vtime50){
                              if(vprc>=50){
                                  console.log('vtime50');
                                  vtime50=true;
                                  pd_cont.insertAdjacentHTML('afterend','<img style="display:none;" src="http://data.apn.co.nz/apnnz/count/actname=AdMidPoint/fcid='+fcid+'">');
                              }
                          }
                          if(!vtime75){
                              if(vprc>=75){
                                  console.log('vtime75');
                                  vtime75=true;
                                  pd_cont.insertAdjacentHTML('afterend','<img style="display:none;" src="http://data.apn.co.nz/apnnz/count/actname=AdThirdQuartile/fcid='+fcid+'">');
                              }
                          }
                          if(!vtime100){
                              if(vprc>=100){
                                  console.log('vtime100');
                                  vtime100=true;
                                  pd_cont.insertAdjacentHTML('afterend','<img style="display:none;" src="http://data.apn.co.nz/apnnz/count/actname=AdComplete/fcid='+fcid+'">');
                              }
                          }
                        };
                        pd_video.on("timeupdate", timeEvent);

                        pd_video.on("firstplay", function(){
                          console.log('first play0!');
                          if(firstplay){
                              console.log('first play1!');
                              pd_cont.insertAdjacentHTML('afterend','<img style="display:none;" src="http://data.apn.co.nz/apnnz/count/actname=AdStart/fcid='+fcid+'">');
                              pd_cont.insertAdjacentHTML('afterend',sasact);
                              firstplay = false;
                          }
                        });

                        pd_video_rdy = true;
                        pd_play();

                    });

                    window.addEventListener("resize", pd_adjust);
                    window.addEventListener("scroll", pd_checkScroll);
                    pd_volumebtn.addEventListener("click", pd_soundToggle);
                    window.removeEventListener("onresize", pd_adjust);
                    pd_closebtn.addEventListener("click", pd_remove);
                    pd_down.addEventListener("click", pd_remove);

                    pd_checkScroll();
                }

                function pd_adjust(){

                    main_w = main.offsetWidth;
                    main_h = main_w / 1.78;
                    main_x = main.getBoundingClientRect();
                    main_x = main_x.left;

                    pd_div.style.height = main_h+"px";
                    pd_clip.style.height = main_h+"px";
                    pd_crtv.style.height = main_h+"px";

                    pd_clip.style.width = main_w+"px";
                    pd_crtv.style.width = main_w+"px";

                    pd_crtv.style.left = main_x+"px";

                    window_w = window.innerWidth;

                    if(window_w < 567){
                        nzh_hamnav.style.marginTop = (main_h + 10)+"px";
                    }else{
                        nzh_hamnav.style.removeProperty('margin-top');
                    }

                }

                function pd_checkScroll(){
                    pd_view = viewability.vertical(pd_div);
                    pd_view = pd_view["value"];
                    pd_div.style.opacity = pd_view;

                    window_sY = window.pageYOffset;

                    if(window_sY < main_h && pd_playing == false){
                        pd_init();
                        window.scrollTo(0, 0);
                    }

                    if(pd_playing == true && pd_view <= 0.29 && pd_firstRun == false){
                        pd_video.muted(true);
                        pd_unmutebtn.style.display = "none";
                        pd_mutebtn.style.display = "inline-block";
                        pd_video.pause();
                    }

                    if(pd_view >= 0.3){
                        pd_play();
                    }

                    pd_firstRun = false;
                }

                function pd_remove(){
                    pd_div.style.height = "0px";
                    pd_clip.style.height = "0px";
                    window.removeEventListener("scroll", pd_checkScroll);
                    window.removeEventListener("resize", pd_adjust);
                    nzh_hamnav.style.removeProperty('margin-top');
                    pd_video.pause();
                    pd_cont.insertAdjacentHTML('afterend','<img style="display:none;" src="http://data.apn.co.nz/apnnz/count/actname=AdClosed/fcid='+fcid+'">');
                }

                function pd_soundToggle(){
                    if(pd_video.muted() == true){
                        pd_video.muted(false);
                        pd_unmutebtn.style.display = "inline-block";
                        pd_mutebtn.style.display = "none";
                    }else if(pd_video.muted() == false){
                        pd_video.muted(true);
                        pd_unmutebtn.style.display = "none";
                        pd_mutebtn.style.display = "inline-block";
                    }
                }

                function pd_init(){
                    pd_div.style.display = "block";
                    pd_adjust();
                    pd_div.style.opacity = "1";
                    pd_rdy = true;

                    pd_play();
                }

                function pd_play(){
                    if(pd_video_rdy == true && pd_rdy == true){
                        pd_video.play();
                        pd_playing = true;

                    }
                }


              })();

            }
            ///////////////// End Pushdown/////////////////

			//check if Miniscroller
			if(edata["miniscroller"]){
				var adid = edata["miniscroller"];
				var celtra = "<div class=\"celtra-ad-v3\">"+
				"<img src=\"data:image/png,celtra\" style=\"display:none\" onerror=\""+
				"(function(img) {"+
				"var s = document.createElement('script');"+
				"s.src = 'https://campaigns.celtra.com/prototypes/interscroller/desktop.js';"+
				"s.id = 'celtra-prototype-interscroller';"+
				"s.setAttribute('data-creativeId', 'c002652b');"+
				"s.setAttribute('data-placementId', '39bbba83');"+
				"s.setAttribute('data-dismissAfterSeen', 'no');"+
				"s.setAttribute('data-placementHeight', '250');"+
				"s.setAttribute('data-unlockAfterCentered', 'yes');"+
				"s.setAttribute('data-snappingDistance', '0');"+
				// "s.setAttribute('data-params', '{clickUrl:\'http://www.nzme.co.nz\'}');"+
				"s.setAttribute('data-topMessage', 'Advertisement');"+
				"s.setAttribute('data-barColor', '#000000');"+
				"s.setAttribute('data-topBarStyle', 'background:#000000; padding:3px; font-size:10px;');"+
				"s.setAttribute('data-bottomMessage', 'Scroll To Continue');"+
				"s.setAttribute('data-overlayImage', 'https://cache-ssl.celtra.com/api//blobs/f57b1a604d021f8238188cf05c1b7bbb731eb89eb271bbc9291e9a44448e67b7/miniscroller-logo.png?transform=crush');"+
				"img.parentNode.insertBefore(s, img.nextSibling);"+
				"})(this);"+
				"\"/>"+
				"</div>";

				var bodyAd = document.getElementById('bodyAd');
				if(bodyAd){
					bodyAd.style.width = '100%';
					bodyAd.insertAdjacentHTML('afterbegin', celtra);
				}
			}

			// Begin Mobile Skin DEV 0.1
			if(edata["mobileskin"]){
				console.log('PM MS V2.2');

				var media = edata["mobileskin"]["media"];

				var imptrk = edata["mobileskin"]["imptrk"];
				if(imptrk){
					imptrk = decodeURIComponent(imptrk);
					imptrk = '<img src="'+imptrk+'" style="display:none;width:1px;height:1px;">';
				}
				else{
					imptrk = '';
				}

				var curl = edata["mobileskin"]["curl"];
				if(curl){
					curl = decodeURIComponent(curl);
				}
				else{
					curl = '##';
				}

				var sasimp = curl.replace('adclick', 'count/act=1');
				sasimp = '<img src="'+sasimp+'" style="display:none;width:1px;height:1px;">';

				var calltoact = edata["mobileskin"]["calltoact"];
				var mskinrmarkup = '<div id="skinLink">';
				mskinrmarkup += '<a id="skinToggle" href="##">';
				mskinrmarkup += '<img src="' + calltoact + '"></a>';
				mskinrmarkup += '<a id="skinClose" href="##"><img src="http://media.nzherald.co.nz/nzmeads/img/rsz_close.png" width="25"></a>';
				mskinrmarkup += '<a id="skinClick" target="_blank" href="'+curl+'"><img src="'+media+'"></a></div>';
				mskinrmarkup += imptrk+sasimp+'</div>';

				//check if we're being called in an index page with a secondary nav e.g. Business or Life and Style
				var targetEle = document.getElementsByClassName('secondaryNav')[0];
				if(targetEle){
					targetEle.insertAdjacentHTML('beforebegin', mskinrmarkup);
					targetEle.style.margin = '0px auto';
					var targetAlso = document.getElementById('container');
				} else {
					targetEle = document.getElementById('container');
					targetEle.insertAdjacentHTML('beforebegin', mskinrmarkup);
					var targetAlso = document.getElementById('container');
				}

				var skinClose = document.getElementById('skinClose');
				skinClose.addEventListener('click', closeSkin);

				var skinToggle = document.getElementById('skinToggle');
				skinToggle.addEventListener('click', showSkin);

				var skinOn = false;

				//stock ticker fix for business index - change the margin on the ticker
				var ticker = document.getElementsByClassName('smallStockBelt')[0];
				if(ticker){
					ticker.style.margin = '-5px 0';
				}

				//breaking news fix - clone the element into a var then insert that as a sibling to #container
				var breakingNews = document.getElementById('breakingNewsWrap');
				if(breakingNews){
					breakingNewsPrime = breakingNews.cloneNode(true);
					$('#breakingNewsWrap').insertAfter(targetEle);
				}

				function showSkin(event) {
					event.preventDefault();
					if(!skinOn){
						skinOn = true;
						targetAlso.style.transform = 'translateY(250px)';
						targetAlso.style.webkitTransform = 'translateY(250px)';
						targetEle.style.transform = 'translateY(250px)';
						targetEle.style.webkitTransform = 'translateY(250px)';
						skinClose.style.display = 'block';
					}
				}

				function closeSkin(event) {
					event.preventDefault();
					if(skinOn){
						skinOn = false;
						targetAlso.style.transform = 'translateY(0)';
						targetAlso.style.webkitTransform = 'translateY(0)';
						targetEle.style.transform = 'translateY(0)';
						targetEle.style.webkitTransform = 'translateY(0)';
						skinClose.style.display = 'none';
					}
				}

			}
			// End Mobile Skin

			// Begin Outstream Vertical Video Pagebreak
			if(edata["vvpgbrk"]){
				var celtra="";
				celtra += "<div class=\"celtra-ad-v3\">";
				celtra += "    <img src=\"data:image\/png,celtra\" style=\"display: none\" onerror=\"";
				celtra += "        (function(img) {";
				celtra += "            var params = {'placementId':'7797d2da','clickUrl':'','expandDirection':'undefined','preferredClickThroughWindow':'','clickEvent':'advertiser','externalAdServer':'Custom','tagVersion':'3'};";
				celtra += "            var req = document.createElement('script');";
				celtra += "            req.id = params.scriptId = 'celtra-script-' + (window.celtraScriptIndex = (window.celtraScriptIndex||0)+1);";
				celtra += "            params.clientTimestamp = new Date\/1000;";
				celtra += "            params.clientTimeZoneOffsetInMinutes = new Date().getTimezoneOffset();";
				celtra += "            var src = (window.location.protocol == 'https:' ? 'https' : 'http') + ':\/\/ads.celtra.com\/7c99e34d\/web.js?';";
				celtra += "            for (var k in params) {";
				celtra += "                src += '&amp;' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);";
				celtra += "            }";
				celtra += "            req.src = src;";
				celtra += "            img.parentNode.insertBefore(req, img.nextSibling);";
				celtra += "        })(this);";
				celtra += "    \"\/>";
				celtra += "<\/div>";


				var bodyAd = document.getElementById('bodyAd');
				if(bodyAd){
					bodyAd.style.width = '100%';
					bodyAd.insertAdjacentHTML('afterbegin', celtra);
				}
				document.getElementById('Rectangle1').style.display = 'none';
			}
			// End Outstream Vertical Video Pagebreak

			// Begin Outstream Interscroller
			if(edata["otstrmintrscrlr"]){
				var celtra="";
				celtra += "<div class=\"celtra-ad-v3\">";
				celtra += "    <img src=\"data:image\/png,celtra\" style=\"display: none\" onerror=\"";
				celtra += "        (function(img) {";
				celtra += "            var params = {'placementId':'7797d2da','clickUrl':'','expandDirection':'undefined','preferredClickThroughWindow':'','useFullWidth':'1','clickEvent':'advertiser','externalAdServer':'Custom','tagVersion':'3'};";
				celtra += "            var req = document.createElement('script');";
				celtra += "            req.id = params.scriptId = 'celtra-script-' + (window.celtraScriptIndex = (window.celtraScriptIndex||0)+1);";
				celtra += "            params.clientTimestamp = new Date\/1000;";
				celtra += "            params.clientTimeZoneOffsetInMinutes = new Date().getTimezoneOffset();";
				celtra += "            var src = (window.location.protocol == 'https:' ? 'https' : 'http') + ':\/\/ads.celtra.com\/85e58d80\/web.js?';";
				celtra += "            for (var k in params) {";
				celtra += "                src += '&amp;' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);";
				celtra += "            }";
				celtra += "            req.src = src;";
				celtra += "            img.parentNode.insertBefore(req, img.nextSibling);";
				celtra += "        })(this);";
				celtra += "    \"\/>";
				celtra += "<\/div>";

				var bodyAd = document.getElementById('bodyAd');
				if(bodyAd){
					bodyAd.style.width = '100%';
					bodyAd.insertAdjacentHTML('afterbegin', celtra);
				}
				document.getElementById('Rectangle1').style.display = 'none';
			}
			// End Outstream Interscroller

			// check if Vertical Video Pagebreak Full width
			if(edata["vvpagebrkfullw"]){
				var celtra="";
				celtra += "<div class=\"celtra-ad-v3\">";
				celtra += "    <img src=\"data:image\/png,celtra\" style=\"display: none\" onerror=\"";
				celtra += "        (function(img) {";
				celtra += "            var params = {'placementId':'7797d2da','clickUrl':'','expandDirection':'undefined','preferredClickThroughWindow':'','clickEvent':'advertiser','externalAdServer':'Custom','tagVersion':'3'};";
				celtra += "            var req = document.createElement('script');";
				celtra += "            req.id = params.scriptId = 'celtra-script-' + (window.celtraScriptIndex = (window.celtraScriptIndex||0)+1);";
				celtra += "            params.clientTimestamp = new Date\/1000;";
				celtra += "            params.clientTimeZoneOffsetInMinutes = new Date().getTimezoneOffset();";
				celtra += "            var src = (window.location.protocol == 'https:' ? 'https' : 'http') + ':\/\/ads.celtra.com\/bb6e5bca\/web.js?';";
				celtra += "            for (var k in params) {";
				celtra += "                src += '&amp;' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);";
				celtra += "            }";
				celtra += "            req.src = src;";
				celtra += "            img.parentNode.insertBefore(req, img.nextSibling);";
				celtra += "        })(this);";
				celtra += "    \"\/>";
				celtra += "<\/div>";

				var bodyAd = document.getElementById('bodyAd');
				if(bodyAd){
					bodyAd.style.width = '100%';
					bodyAd.insertAdjacentHTML('afterbegin', celtra);
				}
				document.getElementById('Rectangle1').style.display = 'none';
			}
			// End Vertical Video Pagebreak Full width

			// check if vertical video interstitial
			if(edata["vvinterstitial"]){
				var celtra="";
				celtra += "<div class=\"celtra-ad-v3\">";
				celtra += "    <img src=\"data:image\/png,celtra\" style=\"display: none\" onerror=\"";
				celtra += "        (function(img) {";
				celtra += "            var params = {'placementId':'7797d2da','clickUrl':'','expandDirection':'undefined','preferredClickThroughWindow':'','clickEvent':'advertiser','externalAdServer':'Custom','tagVersion':'3'};";
				celtra += "            var req = document.createElement('script');";
				celtra += "            req.id = params.scriptId = 'celtra-script-' + (window.celtraScriptIndex = (window.celtraScriptIndex||0)+1);";
				celtra += "            params.clientTimestamp = new Date\/1000;";
				celtra += "            params.clientTimeZoneOffsetInMinutes = new Date().getTimezoneOffset();";
				celtra += "            var src = (window.location.protocol == 'https:' ? 'https' : 'http') + ':\/\/ads.celtra.com\/823bb64f\/web.js?';";
				celtra += "            for (var k in params) {";
				celtra += "                src += '&amp;' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);";
				celtra += "            }";
				celtra += "            req.src = src;";
				celtra += "            img.parentNode.insertBefore(req, img.nextSibling);";
				celtra += "        })(this);";
				celtra += "    \"\/>";
				celtra += "<\/div>";

				var bodyAd = document.getElementById('bodyAd');
				if(bodyAd){
					bodyAd.style.width = '100%';
					bodyAd.insertAdjacentHTML('afterbegin', celtra);
				}
				document.getElementById('Rectangle1').style.display = 'none';
			}
			// End vertical video interstitial

			// Begin 300x250 outstream
			if(edata["outstreamrec"]){
				var celtra="";
				celtra += "<div class=\"celtra-ad-v3\">";
				celtra += "    <img src=\"data:image\/png,celtra\" style=\"display: none\" onerror=\"";
				celtra += "        (function(img) {";
				celtra += "            var params = {'placementId':'7797d2da','clickUrl':'','expandDirection':'undefined','preferredClickThroughWindow':'','clickEvent':'advertiser','externalAdServer':'Custom','tagVersion':'3'};";
				celtra += "            var req = document.createElement('script');";
				celtra += "            req.id = params.scriptId = 'celtra-script-' + (window.celtraScriptIndex = (window.celtraScriptIndex||0)+1);";
				celtra += "            params.clientTimestamp = new Date\/1000;";
				celtra += "            params.clientTimeZoneOffsetInMinutes = new Date().getTimezoneOffset();";
				celtra += "            var src = (window.location.protocol == 'https:' ? 'https' : 'http') + ':\/\/ads.celtra.com\/f9e6a08a\/web.js?';";
				celtra += "            for (var k in params) {";
				celtra += "                src += '&amp;' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);";
				celtra += "            }";
				celtra += "            req.src = src;";
				celtra += "            img.parentNode.insertBefore(req, img.nextSibling);";
				celtra += "        })(this);";
				celtra += "    \"\/>";
				celtra += "<\/div>";

				var bodyAd = document.getElementById('bodyAd');
				if(bodyAd){
					bodyAd.style.width = '100%';
					bodyAd.insertAdjacentHTML('afterbegin', celtra);
				}
				document.getElementById('Rectangle1').style.display = 'none';
			}
			// End 300x250 Outstream

			// Begin Mobile Swiper v0.5 - Side or Tap to dismiss
			if(edata["swiper"]){
				var imptrk = edata["swiper"]["imptrk"];
				if(imptrk){
					imptrk = decodeURIComponent(imptrk);
					imptrk = '<img src="'+imptrk+'" style="display:none;width:1px;height:1px;">';
				}
				else{
					imptrk = '';
				}

				var curl = edata["swiper"]["curl"];
				if(curl){
					curl = decodeURIComponent(curl);
				}
				else{
					curl = '##';
				}

				// Insert interact.min.js to head
				var intjs = document.createElement('script');
				intjs.type = 'text/javascript';
				intjs.src = 'https://npmcdn.com/draggabilly@2.1/dist/draggabilly.pkgd.min.js';
				document.getElementsByTagName("head")[0].appendChild(intjs);

				// Enable SAS beacon count
				var sasimp = curl.replace('adclick', 'count/act=1');
				sasimp = '<img src="'+sasimp+'" style="display:none;width:1px;height:1px;">';

				// Insert drag container element
				var swiperOpenMarkup = '<div id="dragcont" style="position:fixed; right:-100vw; z-index:9999; top:9vh;"></div>';
				document.body.insertAdjacentHTML('afterbegin', swiperOpenMarkup);

				// Insert the swiper container in the DOM
				var calltoact = edata["swiper"]["calltoact"];
				var lmedia = edata["swiper"]["lmedia"];
				lmedia = decodeURIComponent(lmedia);
				var swiperMarkup = '<div id="swiperContainer" class="draggable">'+
					'<div id="swiperTab" class="draggable">'+
						'<div id="swiperDismiss">&times;</div>'+
						'<div id="swiperText">'+
							calltoact + '<br><span>&larr; Swipe Here</span>' +
						'</div>'+
					'</div>'+
					'<div id="swiperCreative">'+
						'<a id="swiperClick" target="_blank" href="' + curl + '">'+
							'<img id="swiperImg" src="'+lmedia+'">'+
						'</a>'+
					'</div>'+
					'<a id="swiperClose" style="position: absolute;top: 1px;right: 1px;"><img src="http://media.nzherald.co.nz/nzmeads/img/rsz_close.png" width="30"></a>'+
					imptrk + sasimp +
				'</div>';
				document.getElementById("dragcont").insertAdjacentHTML('afterbegin', swiperMarkup);

				function closeSwiper() {
					var otp = document.getElementById('dragcont');
					otp.style.display = 'none';
				}
				var swiperClose = document.getElementById('swiperClose');
				swiperClose.addEventListener('touchstart', closeSwiper, false);
				swiperClose.addEventListener('click', closeSwiper, false);
				var swiperDismiss = document.getElementById('swiperDismiss');
				swiperDismiss.addEventListener('touchstart', closeSwiper, false);
				swiperDismiss.addEventListener('click', closeSwiper, false);

				function ctrSwiper() {
					window.location.href = curl;
				}
				var swiperClick = document.getElementById('swiperClick');
				swiperClick.addEventListener('touchstart', ctrSwiper, false);
				swiperClick.addEventListener('click', ctrSwiper, false);

				// declare repeatedly used elements as global variables for better performance
				var swiperTab = document.getElementById('swiperTab');
				var swiperCon = document.getElementById('swiperContainer');
				function makeFullScreen(){
					swiperCon.style.transition = '1s';
					setTimeout(function() {
						swiperCon.style.left = '-100vw';
						swiperTab.style.display = 'none';
					}, 5);
					swiperCon.style.boxShadow = '0px 10px 35px #000000';
				}

				// target elements with the "draggable" class
				window.onload = function() {
					// Change the slider open position based on scroll direction
					var lastScrollTop = 0;
					var upscrollPos = window.innerHeight * 0.7;
					window.addEventListener("scroll", function(){
						 var st = window.pageYOffset || document.documentElement.scrollTop;
						 if (st - 50 > lastScrollTop){
							// downscroll
								swiperTab.style.top = '40px';
								lastScrollTop = st;
								return false;
						 } else if (st + 50 < lastScrollTop){
								swiperTab.style.top = upscrollPos + 'px';
								lastScrollTop = st;
								return false;
						 }
					}, false);
					swiperTab.style.display = 'block';
					var draggie = new Draggabilly( '.draggable', {
						axis: 'x'
					});
					// swipe to dismiss
					var swiperPositionX = 0;
					var lastSwiperPositionX = 0;

					draggie.on( 'pointerUp', function() {
						setTimeout(function() {
							swiperPositionX = draggie.position.x;
							if(swiperPositionX > 50){
								closeSwiper()
							} else if (swiperPositionX < 51 && swiperPositionX > -1){
								swiperCon.style.left = '0vw';
							} else if (swiperPositionX < -1){
								draggie.disable()
								makeFullScreen();
							}
						}, 500);
					})
				};
			}
			///////////////////// End Mobile Swiper /////////////////////

			// Begin Top & Tail
			if(edata["topAndTail"]){
				var xyz = '<div class="xyz-ad-content">'+
				'<img src="data:image/png,xyz" style="display:none" onerror="'+
				'(function(img) {'+
				"var params = {'clickUrl':'%%CLICKURL%%','ent':'e30=','tok': 'e30=','z':'%%RANDOM%%', 'env':'xyz'};"+
				'var ref;'+
				"try { params.ref = window.top.location.href;} catch (ex) { console.log('cross-domain iframe prevented host detection'); }"+
				"var src = 'https://ads.playground.xyz/render/samples/top-tail-banner/320x50?';for (var k in params) {src += '&amp;' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);}"+
				"var req = document.createElement('script');req.src = src;"+
				"img.parentNode.insertBefore(req, img.nextSibling);"+
				'})(this);'+
				'"/>'+
				'</div>'+
				'<img src="https://ads.playground.xyz/log/tag?data=eyJwcm9qZWN0IjpbInNhbXBsZXMiXSwiY3JlYXRpdmUiOiJ0b3AtdGFpbC1iYW5uZXIiLCJzaXplIjoiMzIweDUwIiwiZXZlbnQiOiJpbXByZXNzaW9uIiwiZW50aXRpZXMiOnt9fQ==&z=%%RANDOM%%" style="position:absolute;top:0px;left:0px;width=1px;height=1px">'+
				'<img src="https://api.keen.io/3.0/projects/5648599b59949a0741fbc683/events/tag?api_key=fb8c3c6c36d169df0ce5661fd9e62ad357e876ca6f6ff93a832c0939f9f2e16bc267951b758cabc1391712afbd2b048fe29e9008fdd26e110d02a70c057788b74942240c466f2544ac357cfbcf2f88099c6ad0af7164c2a62547b28305c9bb4c67599a064ad70dd0a32979db66bcd9bd&data=eyJwcm9qZWN0IjpbInNhbXBsZXMiXSwiY3JlYXRpdmUiOiJ0b3AtdGFpbC1iYW5uZXIiLCJzaXplIjoiMzIweDUwIiwiZXZlbnQiOiJpbXByZXNzaW9uIiwiZW50aXRpZXMiOnt9fQ==&z=%%RANDOM%%" style="position:absolute;top:0px;left:0px;width=1px;height=1px">';
				var bodyAd = document.getElementById('DivRectangle1');
				if(bodyAd){
					bodyAd.style.width = '100%';
					bodyAd.insertAdjacentHTML('afterbegin', xyz);
				}
			}
			// End Top & Tail


			// Begin CommBreak

			if(edata["commbreak"]){
			  function sasia_adcreative(c){
			    var sas_nw = c["sas_nw"];
			    if(sas_nw){ sas_nw = sas_nw.toUpperCase(); }
			    var sas_site = c["sas_site"];
			    if(sas_site){ sas_site.toUpperCase(); }else{ sas_site="OTHER"; }
			    var elhtml = document.getElementsByTagName('html')[0];
			    if (elhtml.classList){
			      elhtml.classList.add('hasTakeover');
			      elhtml.classList.add('wideTakeover');
			    } else {
			      elhtml.className += ' hasTakeover wideTakeover';
			    }
					$('.hasTakeover').css('cursor','default');
			    var sas_clickurl = c["sas_clickurl"];
			    sas_clickurl = decodeURIComponent(sas_clickurl);
			    var sas_preClickurl = c["sas_preClickurl"];
			    sas_preClickurl = decodeURIComponent(sas_preClickurl);
			    var sas_rClick = '#';
			    if(c["sas_rClick"]){sas_rClick = c["sas_rClick"];sas_rClick = decodeURIComponent(sas_rClick);}
			    var sas_lClick = '#';
			    if(c["sas_lClick"]){sas_lClick = c["sas_lClick"];sas_lClick = decodeURIComponent(sas_lClick);}
			    var sas_rHeight = c["sas_rHeight"];
			    var sas_lHeight = c["sas_lHeight"];
			    var sas_rTop = c["sas_rTop"];
			    var sas_lTop = c["sas_lTop"];

			    sas_rClick = (sas_rClick === '' ? sas_clickurl : sas_preClickurl + sas_rClick);
			    sas_lClick = (sas_lClick === '' ? sas_clickurl : sas_preClickurl + sas_lClick);
			    sas_rHeight = (sas_rHeight === '' ? '900' : sas_rHeight);
			    sas_lHeight = (sas_lHeight === '' ? '900' : sas_lHeight);
			    sas_rTop = (sas_rTop === '' ? '0' : sas_rTop);
			    sas_lTop = (sas_lTop === '' ? '0' : sas_lTop);

			    if(sas_site == 'DRIVEN' && sas_lTop == '0'){ sas_lTop = '120'; }
			    if(sas_site == 'DRIVEN' && sas_rTop == '0'){ sas_rTop = '120'; }

			    var sas_site_list = {
			      'NZH': {
			        site_css: "#topBanner{display: none !important;}\n .topBanner{margin:0px auto;}\n #DivExtendedBanner{display:block;}",
			        site_container: '#siteWrapper'
			      },
			      'VIVA': {
			        site_css: ".page-wrapper{ max-width:1000px; padding: 0 7px; }\n .page-content{ margin-right:0; }\n .page-side{ display:none; }\n #DivExtendedBanner{ margin-left: -7px; } #CTAL{ margin-left:-137px; } #CTAR{ margin-left:993px; }",
			        site_container: '.page-wrapper'
			      },
			      'DRIVEN': {
			        site_css: ".main-container .wrapper{ max-width:1000px!important; } .ad-container.bannerTakeover{ height:130px; } .main-container{ padding-top:0px!important; } html.hasTakeover { background-position: center 120px!important;} body {background:transparent!important;}",
			        site_container: '.wrapper'
			      },
			      'BITE': {
			        site_css: "@media only screen and (min-width:680px){ body{ width: 1000px; margin: 0 auto; position: relative; } }",
			        site_container: '#mobile-wrap'
			      },
			      'CH': {
			        site_css: "@media only screen and (min-width:680px){ body{ width: 1000px; margin: 0 auto; position: relative; } }\n .push-wrap{width:1000px !important;} \n #SiteHeader{width: 1000px;} \n #ExtendedBanner{left: 0px;}\n @media screen and (max-width: 767px) { .push-wrap { width: 100% !important; } #SiteHeader { width: 100% !important; } }",
			        site_container: '#page-wrap'
			      },
			      'OTHER': {
			        site_css: "",
			        site_container: ''
			      }
			    };

			    var sasad_style = document.createElement('style');
			    var sas_bgcolor = c["sas_bgcolor"];
			    var sas_wallpaper = c["sas_wallpaper"];
			    sas_wallpaper = decodeURIComponent(sas_wallpaper);
			    var sasad_css = "html{background:#"+sas_bgcolor+" url('"+sas_wallpaper+"') no-repeat fixed top center!important;}";
			    sasad_css += "#CTAL{width: 130px; cursor: pointer; margin-left: -130px; top: "+sas_lTop+"px; height: "+sas_lHeight+"px; position: fixed; z-index: 999;}";
			    sasad_css += "#CTAR{width: 130px; cursor: pointer; margin-left: 1000px; top: "+sas_rTop+"px; height: "+sas_rHeight+"px; position: fixed; z-index: 999;}\n";
			    sasad_css += sas_site_list[sas_site].site_css;
			    sasad_style.type = 'text/css';

			    if (sasad_style.styleSheet){
			      sasad_style.styleSheet.cssText = sasad_css;
			    } else {
			      sasad_style.appendChild(document.createTextNode(sasad_css));
			    }
			    var node = document.getElementById("ExtendedBanner");
			    if(node){node.appendChild(sasad_style);}

			    if(sas_lClick!='#'||sas_rClick!='#'){
			      var sasad_hasclick_markup = '<div id="CTAL"><a href="'+sas_lClick+'" target="_blank"><img src="http://content.aimatch.com/default.gif" width="100%" height="100%"></a></div><div id="CTAR"><a href="'+sas_rClick+'" target="_blank"><img src="http://content.aimatch.com/default.gif" width="100%" height="100%"></a></div>';

			      // detect if id or class
			      var sas_siteCont = sas_site_list[sas_site].site_container;
			      if(sas_siteCont.slice(0,1) === '#'){
			        var sasad_hasclick_el = document.getElementById(sas_site_list[sas_site].site_container.slice(1, sas_site_list[sas_site].site_container.length));
			        sasad_hasclick_el.insertAdjacentHTML('beforebegin', sasad_hasclick_markup);
			      }else if(sas_siteCont.slice(0,1 === '.')){
			        // TODO - assume this works (applies to DRIVEN and VIVA)
			        var sasad_hasclick_el = document.getElementsByClassName(sas_site_list[sas_site].site_container.slice(1, sas_site_list[sas_site].site_container.length));
			        sasad_hasclick_el.insertAdjacentHTML('beforebegin', sasad_hasclick_markup);
			      }
			    }


			    if(sas_site=="NZH"){
			      var NZHtopB = document.getElementById('topBanner');
			      if(NZHtopB){NZHtopB.parentNode.removeChild(NZHtopB);}
			    }

			    var sasad_trk = document.createElement("img");
			    sasad_trk.src = c["sasad_trk"];
			    sasad_trk.style = "display:none;width:1px;height:1px";
			    node.appendChild(sasad_trk);

			  }
			  sasia_adcreative(edata["commbreak"]);

			}

			///////////////// End CommBreak /////////////////

			/// Start newNZH Billboard Parallax ///
			if(edata["NewNZHSlider"]){
				console.log('nzh slider');
				console.log('iframeid is ',iframeID);
			  function SliderLauncherD(c){
					console.log('sliderlauncherd');
			    var lmedia = c["lmedia"];
			    lmedia = decodeURIComponent(lmedia);
			    var lcurl = c["lcurl"];
			    lcurl = decodeURIComponent(lcurl);
			    var limptrk = c["limptrk"];
			    limptrk = decodeURIComponent(limptrk);
			    if(limptrk){ limptrk = '<img src="'+limptrk+'" style="display:none;width:1px;height:1px;">'; }else{ limptrk = ''; }
			    var sasimp = lcurl.replace('adclick', 'count/act=1');
			    sasimp = '<img src="'+sasimp+'" style="display:none;width:1px;height:1px;">';
			    var zoomtrack = lcurl.replace('adclick', 'count/act=3');
			    zoomtrack = '<img src="'+zoomtrack+'" style="display:none;width:1px;height:1px;">';
			    var zoomTracked = false;
			    var lotameZoom = c["lotamezoom"];
			    lotameZoom = decodeURIComponent(lotameZoom);
			    lotameZoom = '<img src="'+lotameZoom+'" style="display:none;width:1px;height:1px;">';
			    var lotameZoomTracked = false;
			    var unitId = c["unitId"];
					console.log('unitId',unitId);
			    var markup = '<div id="sldr_div'+unitId+'" class="sldr_div">'+
			      '<div id="sldr_clip'+unitId+'" class="sldr_clip" unitId="'+unitId+'">'+
			        '<div id="sldr_crtv'+unitId+'" class="sldr_crtv">'+
			            '<img id="sldr_img'+unitId+'" class="sldr_img" src="'+lmedia+'" unitId="'+unitId+'">'+
			        '</div>'+
			      '</div>'+
			      '<span id="sldr_lbltop'+unitId+'" class="sldr_lbltop">&#9660; Advertisement &#9660;</span>'+
			      '<span id="sldr_lblbot'+unitId+'" class="sldr_lblbot" style="bottom: 0px;">Click Ad to Expand</span>'+
			      limptrk+sasimp+
			    '</div>';

					var sliderTarget = iframeID;
					do {
						sliderTarget = sliderTarget.parentElement
					} while (sliderTarget.classList.contains('pb-f-ads-ad') === false); //TODO waiting for confirmation from WashPo re: use of this class
	        sliderTarget.innerHTML = markup;
	        sliderTarget.style.margin = 0;
	        sliderTarget.style.padding = 0;
	        sliderTarget.style.float = 'none';
	        sliderTarget.style.removeProperty('height');

			    var zoom = '<a id="sldr_close'+unitId+'" class="sldr_close" unitId="'+unitId+'" href="##">'+
			      '<img src="http://media.nzherald.co.nz/nzmeads/img/rsz_close.png" width="50" unitId="'+unitId+'">'+
			      '</a>'+
			      '<div id="sldr_zm'+unitId+'" class="sldr_zm" unitId="'+unitId+'">'+
			      '<a href="'+lcurl+'" target="_blank">'+
			        '<img id="sldr_zm_img'+unitId+'" class="sldr_zm_img" src="'+lmedia+'">'+
			      '</a>'+
			      '</div>';
						console.log('zoom makrkup',zoom);
			    var zoomIns = document.getElementsByTagName('body')[0]
			    if(zoomIns){
			      zoomIns.insertAdjacentHTML('afterbegin', zoom);
			    }
			    var zoomState = false;
			    function togZoom(e){
						var targetId = e.target.getAttribute('unitid');
						console.log(targetId);
			      if (zoomState === false){
			        document.getElementById("sldr_zm"+targetId).style.opacity = 1;
			        document.getElementById("sldr_zm"+targetId).style.height = '100vh';
			        document.getElementById("sldr_zm_img"+targetId).style.height = '90vh';
			        document.getElementById("sldr_close"+targetId).style.display = 'block';
			        document.getElementById("sldr_crtv"+targetId).style.display = 'none';
			      } else if (zoomState === true){
			        document.getElementById("sldr_zm"+targetId).style.opacity = 0;
			        document.getElementById("sldr_zm"+targetId).style.height = 0;
			        document.getElementById("sldr_zm_img"+targetId).style.height = 0;
			        document.getElementById("sldr_close"+targetId).style.display = 'none';
			        document.getElementById("sldr_crtv"+targetId).style.display = 'block';
			      }
			      zoomState = !zoomState;
			    }
			    document.getElementById('sldr_clip'+unitId).addEventListener('click', togZoom);
			    document.getElementById('sldr_close'+unitId).addEventListener('click', togZoom);
			    document.getElementById('sldr_zm'+unitId).addEventListener('click', togZoom);
			  }
			  SliderLauncherD(edata["NewNZHSlider"]);
			}

			///////////////// End newNZH Billboard Parallax /////////////////
		}

	}
}, false);
