var uatRandNo=Math.floor(Math.random()*100000);
var varTmxRequestId='7097714140122415';
var varPassOapp='';
var varQueryAdSize='300x250';
var varAdWidth=varQueryAdSize.split('x')[0];
var varAdHeight=varQueryAdSize.split('x')[1];
var varPublisherId = '81233';
var varTagId='61717';
var varSectionIDAPN='9989816';
var varChannels='';
var varChannelIDs='';
var comscorePlacementId='61717';
var comscoreCategoryId='';
var varSiteName='SynacorSyndication_RON';
var varSectionName='SynacorSyndication_RON';
var varAggPubId='81233_61717';
var sectionTargeting='&prm=0&nwk=0&efo=0&dir=0&rem=0&pas=0';

var callForPixel = 1;
var varTmxOpx = 0;
var varSectionID_OPX='537149179';
var varSectionID_ADX='2908071932';
var varTmxCountry='US';
var tmxDoc=document;
var vartm_apn_fill =  parseFloat('/*!SCORE.APN_FILL*/').toFixed(2);
var vartm_apn_bid =  parseFloat('/*!SCORE.APN_CP*/').toFixed(2);
var vartm_ox_bid =  parseFloat('/*!SCORE.OPX_CP*/').toFixed(2);
var vartmsf =  parseFloat('/*!SCORE.SOFT_FLOOR*/').toFixed(2);
var vartmhf = parseFloat('').toFixed(2);
var vartmbrlang =  (window.navigator.userLanguage || window.navigator.language || "").toLowerCase();
var vartmIsMobileDevice = (/iphone|ipad|ipod|android|silk|kindle fire/i.test(navigator.userAgent.toLowerCase()));
var varOPXId = '537149179';
var varADXId = '2908071932';

/* START: CREATING ROADBLOCK ARRAY */
var varRBArray=new Array();
if (!window.teRBID) {
   var varRandom=Math.floor(Math.random()*varRBArray.length);
   var teRBID=varRBArray[varRandom];
}
/* END: CREATING ROADBLOCK ARRAY */

/* START: GETTING THE URL PARAMETERS */
/* TODO: replace with better logic */
var scripts=document.getElementsByTagName('script');
var icount=1;
for(icount=1;icount<scripts.length;icount++){
   var tempScript=scripts[scripts.length-icount];
   var uatStart=tempScript.src.indexOf('/adserv_');
   if (uatStart > 0){break;}
}
var myScript=scripts[scripts.length-icount];
var queryString=myScript.src.replace(/^[^\?]+\??/,'');
var tmIsSecure = (myScript.src.substring(0,6) == 'https:');

/* END: GETTING THE URL PARAMETERS */
  varPTVs = ""; /* pass through variables */

var cookieCount = getCookie('TMEDIA');
var getCookieIsp = getCookie('TMEDIAISP');
if (cookieCount != -1) {
   var cookieCountry = cookieCount.substring(5,cookieCount.indexOf('/'));
  queryString = queryString + '&dmsc=' + cookieCountry + '&dmsi=' + escape(getCookieIsp);
}

function TMX_APN(rev) {
  if (varSectionIDAPN != 0) {
	var varPassRand = Math.floor(Math.random()*11000000000);
	
	  varGRM = 0;
	   var tsrcURL = (tmIsSecure ? 'https://secure' : (vartmIsMobileDevice ? 'http://mobile' : 'http://ib')) + '.adnxs.com';
	   if (varQueryAdSize.indexOf(',') > -1) {
	         var adSize1=varQueryAdSize.substring(0, varQueryAdSize.indexOf(','));
	       var adSize2=varQueryAdSize.substring(varQueryAdSize.indexOf(',')+1);
	        tsrcURL = tsrcURL + '/ttj?id=' + varSectionIDAPN + '&promo_alignment=none&size=' + adSize1 + '&promo_sizes=' + adSize2;
           } else
	        tsrcURL=tsrcURL + '/ttj?id=' + varSectionIDAPN + '&size=' + varQueryAdSize; 
/*
	  if (vartmsf != 'NaN') {
		  if (vartmhf != 'NaN' ) {
		     tsrcURL+='&reserve=' + vartmhf;
		  }
		  if (vartmsf > 5.00) vartmsf = 5.00;
		  if (vartmsf < 0.00) vartmsf = 0.00;
	          tsrcURL+='&tmsf=' + (Math.ceil(vartmsf * 10)*10).toString(16);
	  } 
*/
	  if (vartmhf != 'NaN') {
		tsrcURL+='&tmhf=' + Math.floor(vartmhf * 100).toFixed(0);
          } else {
		tsrcURL+='&tmhf=5';
          }
	  tsrcURL+='&pt1=' + '7097714140122415';
	  tsrcURL+='&pt2=61717' ;
	  tsrcURL+='&pt3=' + rev;
	  tsrcURL+='&rev=' + rev;
	  tsrcURL+='&position=' + apnAboveFold;
	  if (vartmIsMobileDevice) tsrcURL+='&st=mobile_web';
          tsrcURL+='&cc=' + varTmxCountry;
          tsrcURL+='&brlg=' + vartmbrlang;
          tsrcURL+=sectionTargeting;
          tsrcURL+='&'+queryString;
          tsrcURL = tsrcURL + '&cb=' + varPassRand;
	   if(window.varTAdsQv) {
	        tsrcURL=tsrcURL+'&'+window.varTAdsQv;
	   }
	     if(window.varTAdsQT && window.varTAdsQT.length>0) {
	       tsrcURL=tsrcURL+'&'+window.varTAdsQT;
	   }
	     
	  tmxDoc.write('<script type="text/javascript" src="' + tsrcURL +'"></scr' + 'ipt>');
  }  else TMX_DefaultOrPSA('bid=TMX&mkt=2');
      
}

function TMX_OpenX(auid) {
  varFloor='';
  if (!varFloor) {
    varFloor=10;
  } else {
    varFloor = (parseFloat(varFloor) * 1000).toFixed();
  }
  tmxDoc.writeln("<script type=\"text\/javascript\">");
  tmxDoc.writeln("if (!window.OX_ads) OX_ads = [];");
  tmxDoc.writeln("OX_ads.push({ ");
  tmxDoc.writeln("	\"auid\":\"" + auid + "\", ");
  tmxDoc.writeln("	\"aumf\" : \"" + varFloor + "\", ");
  tmxDoc.writeln("	\"fallback\" : '<scr' + 'ipt>TMX_DefaultOrPSA(\"bid=OPX&mkt=11&type=apndedf\")<\/scr' + 'ipt>', ");
  tmxDoc.writeln("	\"onAdUnitRender\" : function(a) {");
  tmxDoc.write("               document.write('<scr' + 'ipt src=\"\/\/uat-net.technoratimedia.com\/pixel?rid=7097714140122415&id=2&rev=3&typ=apndef&bid=OPX&mkt=11&sid=61717&cp=' + a.getProperties().pub_rev + '\"> <\/scr' + 'ipt>');");
  tmxDoc.writeln("	}");
  tmxDoc.writeln("});");
  tmxDoc.writeln("<\/script>");
  tmxDoc.writeln("<script src=\"\/\/technoratimedia-d.openx.net\/w\/1.0\/jstag\"><\/script>");
}

function TMX_DefaultOrPSA(qs) { 
  var oldWrite=document.write;
  document.write=tmxDoc.write;
  if ('PSA'=='PASSBACK') {
  
    document.write('<script type="text/javascript" src="' + (tmIsSecure ? 'https' : 'http') + '://uat-net.technoratimedia.com/pixel?rid=7097714140122415&id=4&' + qs + '"></scr' + 'ipt>');
  } else {
   document.write('<scr' + 'ipt type="text/javascript" src="' + (tmIsSecure ? 'https://uat-net' : 'http://ad-cdn') + '.technoratimedia.com/psa/psa.js' +'"></scr' + 'ipt>');;
    document.write('<script type="text/javascript" src="' + (tmIsSecure ? 'https' : 'http') + '://uat-net.technoratimedia.com/pixel?rid=7097714140122415&id=3&' + qs + '"></scr' + 'ipt>');
  }
  document.write=oldWrite;
}
function displayAds() {
	TMX_Default();
}
function TMX_Default() {
  if (varTmxOpx==1) {
    var adSize="300x250";
    if (varPublisherId == "53767") {
      if (adSize=="160x600") TMX_OpenX("537251629");
      else if (adSize=="300x250") TMX_OpenX("537251626");
      else if (adSize=="728x90") TMX_OpenX("537251627");
      else TMX_DefaultOrPSA('bid=APN&mkt=9');
    } else {
      if (adSize=="160x600") TMX_OpenX("537156652");
      else if (adSize=="300x250") TMX_OpenX("537156650");
      else if (adSize=="728x90") TMX_OpenX("537156651");
      else TMX_DefaultOrPSA('bid=APN&mkt=9');
    }
  } else TMX_DefaultOrPSA('bid=APN&mkt=9');
}
function TMX_Return() {
    tmxDoc.write('<script type="text/javascript" src="' + (tmIsSecure ? 'https' : 'http') + '://uat-net.technoratimedia.com/pixel?rid=7097714140122415&id=7"></scr' + 'ipt>');
	varTmxOpx=0;
	TMX_APN('1');
}
function TMX_SetDocument(doc) {
  console.log("TMX_SetDocument 61717 7097714140122415", doc);
  tmxDoc=doc;
}


TMX_APN('0');

var TN8 = TN8 || {};
TN8.tag = TN8.tag || {
  dropJsPixel: function (url) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = url;
    s.async = true;
    (document.head || document.getElementsByTagName("head")[0]).appendChild(s);
  },
  dropIFPixel: function (url) {
    var i = document.createElement("iframe");
    i.width = 0; i.height = 0; i.frameborder = 0; i.scrolling = "no";
    i.marginheight = 0; i.marginwidth = 0; i.opmargin = 0; i.leftmargin = 0;
    (i.frameElement || i).style.cssText = "border: 0; visibility:hidden; display:none";
    i.src = url;
    (document.body || document.getElementsByTagName("body")[0]).appendChild(i);
  },
  dropIFScript: function (url) {
    var i = document.createElement('iframe');
    i.width = 0; i.height = 0; i.frameborder = 0; i.scrolling = "no";
    i.marginheight = 0; i.marginwidth = 0; i.opmargin = 0; i.leftmargin = 0;
    (i.frameElement || i).style.cssText = "border: 0; visibility:hidden; display:none";
    (document.body || document.getElementsByTagName("body")[0]).appendChild(i);
    i.contentWindow.contents = '<!DOCTYPE html>' +
        '<html><head></head>' +
        '<body><script src=\'' + url + '\'></scr' + 'ipt></body></html>';
    i.src = 'javascript:window["contents"]';
  },
  dropPixel: function (url) {
    var i = document.createElement("img");
    i.style.cssText = "border: 0;width:0;height:0;visibility:hidden;display:none;";
    i.src = url;
    (document.body || document.getElementsByTagName("body")[0]).appendChild(i);
  }
};
if(window.varPixel79==undefined){
window.varPixel79=1;
  /* Casale */
  TN8.tag.dropIFPixel((document.location.protocol == 'https:' ? 'https://ssum-sec.' : 'http://ssum.') +
          'casalemedia.com/usermatch?s=180187&r='+Math.floor(Math.random()*11000)+
              '&cb=' + (document.location.protocol == 'https:' ? 'https' : 'http') +
                  '%3A%2F%2Fuat-net.technoratimedia.com%2Fservices%3Fsrv%3Dcs%26pid%3D1%26uid%3D');

  /* RO */
  TN8.tag.dropPixel(document.location.protocol +"//" +(document.location.protocol == 'https:' ? "sync.1rx.io" : "sync.rhythmxchange.com")+"/usersync2/technorati");
  /* PP */
  /*TN8.tag.dropJsPixel(document.location.protocol + "//bh.contextweb.com/bh/rtset?pid=558864&ev=1&daaqp=1&rurl=" + document.location.protocol + "%2F%2Fuat-net.technoratimedia.com%2Fservices%3Fsrv%3Dcs%26pid%3D27%26uid%3D%25%25VGUID%25%25");*/

  /* UCX */
 /*TN8.tag.dropPixel(document.location.protocol + "//sync.aralego.com/idSync?ucf_nid=par-488A3E6BD8D997D0ED8B3BD34D8BA4B&redirect=" + document.location.protocol + "%2F%2Fuat-net.technoratimedia.com%2Fservices%3Fsrv%3Dcs%26pid%3D37%26uid%3DUCFUID");*/
}
if(window.varPixel103==undefined){
window.varPixel103=1;
try {
    var _mag = _mag || {};

    var varChannelIDs='';
    if ((","+varChannelIDs+",").match(/,(1),/i)) {  _mag.shortName = 'auto' ; } /* Automotive */
    else if ((","+varChannelIDs+",").match(/,(3),/i)) {  _mag.shortName = 'business' ; } /* Business */
    else if ((","+varChannelIDs+",").match(/,(25),/i)) { _mag.shortName = 'finance' ; } /* Finance */
    else if ((","+varChannelIDs+",").match(/,(18),/i)) { _mag.shortName = 'tech' ; } /* Technology */
    else if ((","+varChannelIDs+",").match(/,(15),/i)) { _mag.shortName = 'shopping' ; } /* Shopping */
    else _mag.shortName = ''; 

    if (_mag.shortName != '') {
     _mag.kw = _mag.shortName;
     _mag.kw_encoded = 0;
     _mag.default_protocol = ('https:' == document.location.protocol ? 'https:' : 'http:');
     _mag.startTime = (new Date()).getTime();
     (function(d,t) {
       var mag = d.createElement('script'); mag.type = 'text/javascript'; mag.async = true; mag.src = t;
       var head = d.getElementsByTagName('head')[0] || d.documentElement; head.insertBefore(mag, head.firstChild);
      })(document,  _mag.default_protocol + '//d3ezl4ajpp2zy8.cloudfront.net/technorati-' + _mag.shortName + '_tag.js'); 
    }
} catch (e) {}}
if(window.varPixel19==undefined){
window.varPixel19=1;
if (document.location.protocol == 'http:') {
  TN8.tag.dropIFScript('http://adadvisor.net/adscores/r.js?sid=9209810687');
}}
if(window.varPixel73==undefined){
window.varPixel73=1;
if (document.body && document.location.protocol == 'http:') {
var varChannelIDs='';
var sectionTargeting='&prm=0&nwk=0&efo=0&dir=0&rem=0&pas=0';
if (sectionTargeting.match(/prm=1/i)) {
	var xl8gValue='0';
	var xl8cValue='0';
	if ((","+varChannelIDs+",").match(/,(1),/i)) { xl8gValue='001'; xl8cValue='28632'; } /* Automotive */
	else if ((","+varChannelIDs+",").match(/,(2),/i)) { xl8gValue='002'; xl8cValue='1381193'; } /* Blogging/Design */
	else if ((","+varChannelIDs+",").match(/,(3),/i)) { xl8gValue='003'; xl8cValue='694395'; } /* Business */
	else if ((","+varChannelIDs+",").match(/,(21),/i)) { xl8gValue='004'; xl8cValue='2371756'; } /* Celebrity */
	else if ((","+varChannelIDs+",").match(/,(4),/i)) { xl8gValue='005'; xl8cValue='927050'; } /* Education */
	else if ((","+varChannelIDs+",").match(/,(5),/i)) { xl8gValue='006'; xl8cValue='23706'; } /* Entertainment */
	else if ((","+varChannelIDs+",").match(/,(22),/i)) { xl8gValue='007'; xl8cValue='20207'; } /* Family */
	else if ((","+varChannelIDs+",").match(/,(23),/i)) { xl8gValue='008'; xl8cValue='1381171'; } /* Fashion/Beauty */
	else if ((","+varChannelIDs+",").match(/,(24),/i)) { xl8gValue='009'; xl8cValue='285363'; } /* Film */
	else if ((","+varChannelIDs+",").match(/,(25),/i)) { xl8gValue='010'; xl8cValue='20205'; } /* Finance */
	else if ((","+varChannelIDs+",").match(/,(14),/i)) { xl8gValue='011'; xl8cValue='285381'; } /* Food */
	else if ((","+varChannelIDs+",").match(/,(27),/i)) { xl8gValue='012'; xl8cValue='1950176'; } /* Gadgets */
	else if ((","+varChannelIDs+",").match(/,(6),/i)) { xl8gValue='013'; xl8cValue='901810'; } /* Gaming */
	else if ((","+varChannelIDs+",").match(/,(28),/i)) { xl8gValue='014'; xl8cValue='901788'; } /* Green */
	else if ((","+varChannelIDs+",").match(/,(26),/i)) { xl8gValue='015'; xl8cValue='118748'; } /* Health/Fitness */
	else if ((","+varChannelIDs+",").match(/,(8),/i)) { xl8gValue='016'; xl8cValue='153235'; } /* Home/Gardening */
	else if ((","+varChannelIDs+",").match(/,(29),/i)) { xl8gValue='017'; xl8cValue='1381204'; } /* IT/Network */
	else if ((","+varChannelIDs+",").match(/,(7),/i)) { xl8gValue='018'; xl8cValue='314017'; } /* Lifestyle */
	else if ((","+varChannelIDs+",").match(/,(9),/i)) { xl8gValue='019'; xl8cValue='338455'; } /* Men */
	else if ((","+varChannelIDs+",").match(/,(10),/i)) { xl8gValue='020'; xl8cValue='285367'; } /* Music */
	else if ((","+varChannelIDs+",").match(/,(11),/i)) { xl8gValue='021'; xl8cValue='1547567'; } /* News */
	else if ((","+varChannelIDs+",").match(/,(12),/i)) { xl8gValue='022'; xl8cValue='700150'; } /* Photo/Video Sharing */
	else if ((","+varChannelIDs+",").match(/,(30),/i)) { xl8gValue='023'; xl8cValue='901789'; } /* Politics */
	else if ((","+varChannelIDs+",").match(/,(13),/i)) { xl8gValue='024'; xl8cValue='20209'; } /* Real Estate */
	else if ((","+varChannelIDs+",").match(/,(15),/i)) { xl8gValue='025'; xl8cValue='288656'; } /* Shopping */
	else if ((","+varChannelIDs+",").match(/,(31),/i)) { xl8gValue='026'; xl8cValue='21777'; } /* Small Business */
	else if ((","+varChannelIDs+",").match(/,(16),/i)) { xl8gValue='027'; xl8cValue='927025'; } /* Social Networking */
	else if ((","+varChannelIDs+",").match(/,(17),/i)) { xl8gValue='028'; xl8cValue='23705'; } /* Sports */
	else if ((","+varChannelIDs+",").match(/,(18),/i)) { xl8gValue='029'; xl8cValue='927073'; } /* Technology */
	else if ((","+varChannelIDs+",").match(/,(19),/i)) { xl8gValue='030'; xl8cValue='927219'; } /* Travel */
	else if ((","+varChannelIDs+",").match(/,(32),/i)) { xl8gValue='031'; xl8cValue='285364'; } /* TV */
	else if ((","+varChannelIDs+",").match(/,(20),/i)) { xl8gValue='032'; xl8cValue='1381252'; } /* Women */
	var xl8_script = document.createElement('script');
	xl8_script.src = 'http://loadus.exelator.com/load/?p=400&g=' + xl8gValue + '&c=' + xl8cValue + '&ctg=&subctg=&ag=&gd=&j=d';
	xl8_script.type = 'text/javascript';
	xl8_script.async = true;
	document.body.appendChild(xl8_script);
}
}}
