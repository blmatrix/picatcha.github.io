! function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
	if (!d.getElementById(id)) {
		js = d.createElement(s);
		js.id = id;
		js.src = p + '://platform.twitter.com/widgets.js';
		fjs.parentNode.insertBefore(js, fjs);
	}
}(document, 'script', 'twitter-wjs'); 


window.___gcfg = {
	lang : 'tr'
};

(function() {
	var po = document.createElement('script');
	po.type = 'text/javascript';
	po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(po, s);
})();

function artifont() {
	var currentSize = $("#haberbody").css("font-size");
	currentSize = currentSize.replace('px', '');
	currentSize = (currentSize * 1) + 2;
	if (currentSize > 20)
		currentSize = 14;
	var lineh = currentSize + 5;
	$("#haberbody").css("font-size", currentSize + "px");
	$("#haberbody").css("line-height", lineh + "px");
}

function eksifont() {
	var currentSize = $("#haberBody").css("font-size");
	currentSize = currentSize.replace('px', '');
	currentSize = (currentSize * 1) - 2;
	if (currentSize < 10)
		currentSize = 10;
	$("#haberbody").css("font-size", currentSize + "px");
}

function arkadasina_gonder(pUrl) {
	//alert(pUrl);
	jQuery.facebox({
		ajax : '/_ajax/arkadasina_gonder.php?url=' + pUrl
	});
}


$(".faceboxac").fancybox(); 

$("body").keydown(function(e){
        // left arrow
        if ((e.keyCode || e.which) == 37){
            //_gaq.push(['_trackEvent', 'Haber Detay Ok Tusu', 'onceki', '<?php echo $frm_hId; ?>']);
            ga('send', 'event', 'Haber Detay Ok Tusu', 'onceki', '<?=$frm_hId; ?>');
    		parent.location = "/_ajax/sonraki_haber.php?frm_id=<?php echo $frm_hId; ?>&page = onceki";
    	}
		// right arrow
		if ((e.keyCode || e.which) == 39){
		    //_gaq.push(['_trackEvent', 'Haber Detay Ok Tusu', 'sonraki', '<?php echo $frm_hId; ?>']);
		    ga('send', 'event', 'Haber Detay Ok Tusu', 'sonraki', '<?=$frm_hId; ?>');
	        parent.location = "/_ajax/sonraki_haber.php?frm_id=<?php echo $frm_hId; ?>&page = sonraki";
		}

		if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 85 || e.keyCode === 117)) {
		    return false;
		} else {
		    //return false;
		}
});

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/tr_TR/sdk.js#xfbml=1&version=v2.7&appId=407759842622114";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));