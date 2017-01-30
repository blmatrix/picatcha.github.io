
function initAdvanceNative() {
        var antag = document.createElement('script');
        antag.async = true;
        antag.type = 'text/javascript';
        antag.src = '//static.adsnative.com/static/js/render.v1.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(antag, node);
};
initAdvanceNative();

var ANSegmentPixel = function(e) {
    if (undefined != typeof e && e) {
    var d = "https://pdb.adsnative.com/seg.gif?segment_token=" + e;
    document.write('<img src="' + d + '" width="1" height="1" border="0"/>');
    }
};
ANSegmentPixel('OBFN4HGC');

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-89999371-1', 'auto');
ga('send', 'pageview');

/*
$('#an-container1').click(function() {
  ga('send', 'event', 'Ads', 'click', 'value');
 });
*/

/*
  var pathArray = window.location.pathname.split( '/' );


 var _ADVANCENATIVEOpts = {
        apiKey: "KqgUiJVW_pLdIsNXNj1o_ERykmeLs6doLEtXezY8",         	
    	};

	(function () {
        var antag = document.createElement('script');
        antag.async = true;
        antag.type = 'text/javascript';
        antag.src = '//static.adsnative.com/static/js/render.v1.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(antag, node);
        })();
*/

/*

function createPlacement(placementId, path, className, i){
    var an = document.createElement('SCRIPT');
		var rend = document.createElement('SCRIPT');
		var text = 'var _AdsNativeOpts = {apiKey: \''+ placementId + '\', autoPosition: false};';
		var t = document.createTextNode(text);
		an.appendChild(t);
		rend.type = "text/javascript";
		rend.src = "//static.adsnative.com/static/js/render.v1.js";
		var list = document.getElementsByClassName(className)[i];
		var childN = list.childNodes[path];
		list.insertBefore(an, childN);
		list.insertBefore(rend, childN);		

}

//home page
if(window.location.pathname === "/"){    

    //first placement (4th)
	$(document).ready(createPlacement('DAXN8Yuk0sWp3-jfs0JaT_U79o5FE-Y7JajR2m4o', 10, 'row', 1));
	//second placement (8th))
	$(document).ready(createPlacement('HjxfiMUVXaCLqgL9WvQp-9L_8uCtNpbPn1mM2j4K', 25, 'row', 1));

}
else if(pathArray.length === 2 && pathArray[1] !== "" ){

    //haber detay infeed
	$(document).ready(createPlacement('AAzDnLIYjezp_PWU6eVug-9uyw0n6Te8IVmXwCmV', 4, 'col-xs-12 col-sm-5 col-md-4', 0));

}

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-89999371-1', 'auto');
  ga('send', 'pageview');

  */