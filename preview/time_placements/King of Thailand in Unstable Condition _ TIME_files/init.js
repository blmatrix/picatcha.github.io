function ntvTopWindow() {
    var currentWindow = validTopWindow = window;
    while (currentWindow.parent && currentWindow != currentWindow.parent) {
        try {
        	currentWindow = currentWindow.parent; 
        	
        	// check if we have access to it
        	if (currentWindow.document)
        		validTopWindow = currentWindow;
            		
        } catch (e) {}
    }

    return validTopWindow;
}

// initialize the Nativo object locally and on top most window
var Nativo = window.Nativo || ntvTopWindow().Nativo || {};
ntvTopWindow().Nativo = ntvTopWindow().Nativo || window.Nativo;

if (!Nativo.topWindow) {
    Nativo.topWindow = ntvTopWindow();
    Nativo.mode = 3;
    Nativo.host = "jadserve.postrelease.com";
    Nativo.displayPipe = '//' + Nativo.host + (Nativo.mode == 3 ? '/content.js' : '/display.js');

    Nativo.appendScript = function (element, doc){
        doc = doc || Nativo.topWindow.document;
        var root = doc.body.getElementsByTagName('script')[0];
        root.parentNode.insertBefore(element, root);
    }

    Nativo.displayAd = function (ad) {
        ad.processed = true;
        ad.doc = Nativo.mode == 1 ? ad.doc || Nativo.topWindow.document : Nativo.topWindow.document;
        var ntvElement = ad.doc.createElement('script');
        ntvElement.async = true;
        ntvElement.type = 'text/javascript';
        var param = ad.a ? '&prx_a=' + ad.a : (ad.c ? '&prx_c=' + ad.c : '');

        param += '&ntv_m='+Nativo.mode;
        param += ad.z ? '&ntv_z=' + ad.z : '';
        if (ad.au) {
            param += '&ntv_au=' + ad.au;
            if (ad.clk) Nativo.tpc['#' + ad.au] = ad.clk;
        }

        // filter articles alerady displayed
        if (!ad.a && Nativo.atf.length > 0)
            param += '&ntv_atf=' + Nativo.atf.join();

        if (Nativo.pageURL) {
            param += '&prx_url=' + encodeURIComponent(Nativo.pageURL);
        } 
        else if (Nativo.mode != 3) { // not for API
            param += '&prx_url=' + Nativo.topWindow.location.href;
        }

        ntvElement.src = Nativo.adDisplayBase + param + '&rand=' + (Math.random() * 1000000000);
        Nativo.appendScript(ntvElement, ad.doc);
    }
}



// add base script if not aleady added to the right scope
if (!window.PostRelease && (!Nativo.topWindow.PostRelease ||  Nativo.mode == 1)) {

    var _prx = Nativo.mode != 1 ?
        Nativo.topWindow._prx = Nativo.topWindow._prx || [] : [];

    // make sure we are not calling our ad server automatically (will be triggered by the DFP response)
    _prx.push(['cfg.SetNoAutoStart']);
    
    (function() {
        var doc = Nativo.mode == 1 ? window.document : Nativo.topWindow.document;
        var tag = doc.createElement('script');
        tag.type = 'text/javascript';
        tag.src = '//s.ntv.io/serve/load.js?async=true'; // TODO: add protocol based on the current document
        tag.setAttribute('async', '');
        Nativo.appendScript(tag, doc);
    })();
}
// if exist, it will always be on the top window, making sure we have a local reference
else {
	window.PostRelease = Nativo.topWindow.PostRelease;
}
// setting base param
Nativo.adDisplayBase = Nativo.displayPipe + "?";

// third party clicks map (for multiple placements)
Nativo.tpc = Nativo.tpc || {};  

// this will hold all articles we alerady presented
Nativo.atf = Nativo.atf || [];

// create the array to hold the tags (ads/campaigns)
Nativo.ads = Nativo.ads || [];
Nativo.ads._push = Nativo.ads._push || Nativo.ads.push;
Nativo.ads.push = function (element) {
	Nativo.thirdPartyClickUrl = element.clk; // deprecated
	Nativo.displayAd(element);
	
	// now call the original push
	return this._push(element);
}


// for ads which were already pushed to the array, trigger a call to display
for (var i = 0; i < Nativo.ads.length; i++) {
    // TODO: this needs to be handle multiple ads
    Nativo.thirdPartyClickUrl = Nativo.ads[i].clk;

    if (!Nativo.ads[i].processed)
	    Nativo.displayAd(Nativo.ads[i]);	
}

