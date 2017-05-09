//---ViewRoll---
function getQueryVariable(str, variable){
	var vars = str.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){
			return pair[1];
		}
	}
	return(false);
}

function renderVideo(a, adspot){

$(document).ready(function() {

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

	var vpub = a["vpub"];

	var vwidth, vheight, vban, voffsetD = 210, vCRlab = '', vCRcount='', vname, vClass, vskip = -1, video, firstplay = true;
	
	var vscripts, vindex = 0;

	if(vpub){
		vscripts = ['http://vjs.zencdn.net/4.7.1/video.js','http://media.nzherald.co.nz/nzmeads/vjs-vast/js/videojs.ads.js','http://media.nzherald.co.nz/nzmeads/vjs-vast/js/vast-client.js','http://media.nzherald.co.nz/nzmeads/vjs-vast/js/videojs.vast.js'];
	}else{
		vscripts = ['http://vjs.zencdn.net/4.7.1/video.js'];
	}

	//setup a function that loads a single script
	function load_script() {

	    //make sure the current index is still a part of the array
	    if (vindex < vscripts.length) {

	        //get the script at the current vindex
	        $.getScript(vscripts[vindex], function () {

	            //once the script is loaded, increase the vindex and attempt to load the next script
	            vindex++;
	            load_script();
	        });
	    }else{
	    	startVR();
	    }
	}

	load_script();

	
	function startVR(){

		$('head').append('<link rel="stylesheet" href="http://vjs.zencdn.net/4.7/video-js.css" type="text/css" />');
		$('head').append('<link rel="stylesheet" href="http://media.nzherald.co.nz/nzmeads/viewroll/viewroll.css" type="text/css" />');
	    if(vpos == 1){

	    	vClass = 'vr_block';

	    	vwidth = 300;

	    	if(vcomp){
	    		vheight = 200;
	    		vClass = 'vr_block vr_comp';
	    	}else{
	    		vheight = 250;
	    	}
	    	
	    }

	    if(vpos == 2){

	    	if(vwide){

	    		vwidth = 540;
	    		vheight = 305;

	    		vCRlab = '<div id="vlab">&dtrif; Advertising &dtrif;</div>';
	    		vCRcount = '<div id="vcount"><p>Close ad in <span id="vtime">5</span></p></div>';

	    		voffsetD = 260;

	    		vClass = 'vr_wide';

	    		vskip = 5;

	    	}else{

	    		vClass = 'vr_block advert';
	    		vwidth = 300;

	    		if(vcomp){
	    			vheight = 200;
	    			vClass = 'vr_block advert vr_comp';
	    		}else{
	    			vheight = 250;
	    		}
	    		
	    		
	    	}
	    }

	    if(vpos == 3){

	    	vClass = 'vr_block';
	    	vwidth = 300;

	    	if(vcomp){
	    		vheight = 200;
	    		vClass = 'vr_block vr_comp';
	    	}else{
	    		vheight = 250;
	    	}
	    	
	    }

	    vname = 'vblock'+vpos;

	    if(vpub){
	    	video = vCRlab + '<div class="vidcont '+vClass+'" style="display:none;"><video id="'+vname+'" class="video-js vjs-default-skin" controls preload="auto" width="'+vwidth+'" height="'+vheight+'" data-setup=\'{ "techOrder":["flash", "html5"] }\'><source src="http://content.aimatch.com/apnnz/R_Test/blanky.mp4" type=\'video/mp4\'><p>Video Playback Not Supported</p></video></div>';
		}else{
			if(vcomp){
				vban = '<p style="margin:0; height:50px; display:inline-block;"><a target="_blank" href="'+vcurl+'"><img src="'+vcomp+'"></a></p>';
			}
	    	video = vCRlab + '<div class="vidcont '+vClass+'">'+vCRcount+'<div id="vctr" class="vctr"><a target="_blank" href="'+vcurl+'"></a></div><video id="'+vname+'" class="video-js vjs-default-skin vjs-big-play-centered" controls webkit-playsinline preload="auto" width="'+vwidth+'" height="'+vheight+'" data-setup=\'{ "techOrder":["flash", "html5"] }\'><source src="'+vmedia+'" type="video/mp4"><p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p></video>'+vban
		}

	    $(video).insertAfter(adspot);

	    var myPlayer = videojs(vname);
	    
	    var $vidcont = $('.vidcont');



	    //---Is Programmatic----//
	    if(vpub){
		 //    myPlayer.ads();
		 //    myPlayer.vast({
		 //      url: vmedia,
		 //      skip: vskip,
		 //      onload: function(){
		 //      	$('.vidcont').show();
		 //      },
		 //      ondone: function(){
		 //      	$vidcont.waypoint('disable');
		 //      },
		 //      onfail: function(){
		 //      	$vidcont.waypoint('disable');
			// 	$(adspot).empty();
			// 	$(adspot).css({
			// 		'width':'300px',
			// 		'height': '250px'
			// 	});
			// 	$('#vlab, .vidcont').remove();
			// 	aimRenderAd(300, 250, 'RECTANGLE', adcont,'/SR=0/POS='+vpos+'/VA=YES/TRG=VRPMPB');
		 //      }
		 //    });

		 //    myPlayer.ready(function(){
			// 	myPlayer.volume(0);
			// });

		}

		//---Is Direct----//
	    else{
	    	var firstend = true;


	    	$vidcont.append('<img style="display:none;" src="'+sasact+'">');

	    	myPlayer.ready(function(){

	    		myPlayer.volume(0);

	    		var vctime, vdur, vprc;
	    		var vtime25 = false;
	    		var vtime50 = false;
	    		var vtime75 = false;
	    		var vtime5sec = false;

	    		/****timeupdate Event****/

	    		//event for the timeupdate, which gets fired every 15-250ms automatically while playing
	    		var timeEvent = function(){

	    			//where is the video currently at, and what is it's duration
	    			vctime = Math.round(myPlayer.currentTime());
	    			vdur = Math.round(myPlayer.duration());
	    			//what percent is it at of the total video duration
	    			vprc = Math.round(vctime/vdur*100);

	    			//if it reaches 5sec
	    			if(vctime>=5 && !vtime5sec){
	    				vtime5sec=true;
	    				$vidcont.append('<img style="display:none;" src="'+sasimp+'">');
	    				
	    				if(vsimp){
	    					$vidcont.append('<img style="display:none;" src="'+vsimp+'">');
	    				}
	    			}

	    			//if it reaches 25%
	    			if(vprc>=25&&!vtime25){
	    				vtime25=true;
	    				$vidcont.append('<img style="display:none;" src="http://data.apn.co.nz/apnnz/count/actname=AdFirstQuartile/fcid='+vfcid+'">');
	    			}
	    			//if it reaches 50%
	    			if(vprc>=50&&!vtime50){
	    				vtime50=true;
	    				$vidcont.append('<img style="display:none;" src="http://data.apn.co.nz/apnnz/count/actname=AdMidPoint/fcid='+vfcid+'">');
	    			}
	    			//if it reaches 75%
	    			if(vprc>=75&&!vtime75){
	    				vtime75=true;
	    				$vidcont.append('<img style="display:none;" src="http://data.apn.co.nz/apnnz/count/actname=AdThirdQuartile/fcid='+vfcid+'">');
	    			}

	    		};
	    		//call the timeupdate function when the event fires (every 15-250ms)
	    		myPlayer.on("timeupdate", timeEvent);

	    		this.on("firstplay", function(){

	    			if(firstplay){
	    				$vidcont.append('<img style="display:none;" src="http://data.apn.co.nz/apnnz/count/actname=AdStart/fcid='+vfcid+'">');
	    				firstplay = false;
	    			}

	    			if(vpos==2 && vwide){

	    				var $vcount = $('#vcount');

	    				(function () {
	    					var timeLeft = 5, cinterval;

	    					var timeDec = function (){
	    						timeLeft--;
	    						if(timeLeft > 0){
	    							document.getElementById('vtime').innerHTML = timeLeft;
	    						}
	    						if(timeLeft === 0){

	    							clearInterval(cinterval);

	    							$vcount.html('<p>Close ad<span id="vclose"></span></p>');
	    							$vcount.find('p').css('padding-right', '20px');

	    							$vcount.on('click', function(event) {

	    								event.preventDefault();

	    								$vidcont.waypoint('disable');

	    								myPlayer.off();

	    								$vidcont.slideUp(function(){
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

	    		this.on("ended", function(){

	    			if(firstend){

	    				$vidcont.append('<img style="display:none;" src="http://data.apn.co.nz/apnnz/count/actname=AdComplete/fcid='+vfcid+'">');

	    				if(veimp){
	    					$vidcont.append('<img style="display:none;" src="'+veimp+'">');
	    				}

	    				firstend = false;

	    				$vidcont.waypoint('disable');
	    			}
	    		});


	    	});
	    }

	    // 40 is the height of the sticky nav bar
	    // 125 is half the height of the ad
	    $vidcont
	    	.waypoint(function(direction) {
	    		if(direction === 'up'){
	    			myPlayer.play();
	    		}else{
	    			myPlayer.pause();
	    		}
	    	}, { offset: 50 })
	    	.waypoint(function(direction) {
	    		if(direction === 'down'){
	    			myPlayer.play();
	    		}else{
	    			myPlayer.pause();
	    		}
	    	}, { offset: ($.waypoints('viewportHeight') - voffsetD - 40) });
	    $vidcont.on('mouseenter.sound', function(event) {
	    	myPlayer.volume(1);
	    });
	    $vidcont.on('mouseleave.sound', function(event) {
	    	myPlayer.volume(0);
	    });


	}


});
}