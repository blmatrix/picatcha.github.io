// Copyright 2012 Google Inc. All rights reserved.
// Container Version: 8
(function(w,g){w[g]=w[g]||{};w[g].e=function(s){return eval(s);};})(window,'google_tag_manager');(function(){
var n=this,aa=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var d=Object.prototype.toString.call(a);if("[object Window]"==d)return"object";if("[object Array]"==d||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==d||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b},ba=function(a,b){var d=Array.prototype.slice.call(arguments,1);return function(){var b=d.slice();b.push.apply(b,arguments);return a.apply(this,b)}},ca=null;/*
 jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
var da=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,ea=function(a){if(null==a)return String(a);var b=da.exec(Object.prototype.toString.call(Object(a)));return b?b[1].toLowerCase():"object"},fa=function(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)},ga=function(a){if(!a||"object"!=ea(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!fa(a,"constructor")&&!fa(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}for(var d in a);return void 0===
d||fa(a,d)},ha=function(a,b){var d=b||("array"==ea(a)?[]:{}),c;for(c in a)if(fa(a,c)){var e=a[c];"array"==ea(e)?("array"!=ea(d[c])&&(d[c]=[]),d[c]=ha(e,d[c])):ga(e)?(ga(d[c])||(d[c]={}),d[c]=ha(e,d[c])):d[c]=e}return d};var ia=function(){},C=function(a){return"function"==typeof a},E=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},ka=function(a){return"number"==ea(a)&&!isNaN(a)},la=function(a,b){if(Array.prototype.indexOf){var d=a.indexOf(b);return"number"==typeof d?d:-1}for(var c=0;c<a.length;c++)if(a[c]===b)return c;return-1},ma=function(a){return a?a.replace(/^\s+|\s+$/g,""):""},F=function(a){return Math.round(Number(a))||0},na=function(a){var b=[];if(E(a))for(var d=0;d<a.length;d++)b.push(String(a[d]));
return b},G=function(){return new Date},oa=function(a,b){if(!ka(a)||!ka(b)||a>b)a=0,b=2147483647;return Math.round(Math.random()*(b-a)+a)},pa=function(){this.prefix="gtm.";this.values={}};pa.prototype.set=function(a,b){this.values[this.prefix+a]=b};pa.prototype.get=function(a){return this.values[this.prefix+a]};pa.prototype.contains=function(a){return void 0!==this.get(a)};
var qa=function(a,b,d){try{return a["4"](a,b||ia,d||ia)}catch(c){}return!1},ra=function(a,b){function d(b,c){a.contains(b)||a.set(b,[]);a.get(b).push(c)}for(var c=ma(b).split("&"),e=0;e<c.length;e++)if(c[e]){var f=c[e].indexOf("=");0>f?d(c[e],"1"):d(c[e].substring(0,f),c[e].substring(f+1))}},sa=function(a){var b=a?a.length:0;return 0<b?a[b-1]:""},ua=function(a){for(var b=0;b<a.length;b++)a[b]()},va=G().getTime(),wa=function(a,b,d){return a&&a.hasOwnProperty(b)?a[b]:d},xa=function(a,
b,d){a.prototype["gtm_proxy_"+b]=a.prototype[b];a.prototype[b]=d},ya=function(a){return null!==a&&void 0!==a&&void 0!==a.length};var I=window,J=document,za=navigator,L=function(a,b,d){var c=I[a];if(a&&/^[a-zA-Z_]\w*$/g.test(a)){var e="var "+a+";";if(n.execScript)n.execScript(e,"JavaScript");else if(n.eval)if(null==ca&&(n.eval("var _et_ = 1;"),"undefined"!=typeof n._et_?(delete n._et_,ca=!0):ca=!1),ca)n.eval(e);else{var f=n.document,g=f.createElement("script");g.type="text/javascript";g.defer=!1;g.appendChild(f.createTextNode(e));f.body.appendChild(g);f.body.removeChild(g)}else throw Error("goog.globalEval not available");}I[a]=
void 0===c||d?b:c;return I[a]},M=function(a,b,d,c){return(c||"http:"!=I.location.protocol?a:b)+d},Aa=function(a){var b=J.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)},Ba=function(a,b){b&&(a.addEventListener?a.onload=b:a.onreadystatechange=function(){a.readyState in{loaded:1,complete:1}&&(a.onreadystatechange=null,b())})},N=function(a,b,d){var c=J.createElement("script");c.type="text/javascript";c.async=!0;c.src=a;Ba(c,b);d&&(c.onerror=d);Aa(c)},Ca=function(a,b){var d=J.createElement("iframe");
d.height="0";d.width="0";d.style.display="none";d.style.visibility="hidden";Aa(d);Ba(d,b);void 0!==a&&(d.src=a);return d},m=function(a,b,d){var c=new Image(1,1);c.onload=function(){c.onload=null;b&&b()};c.onerror=function(){c.onerror=null;d&&d()};c.src=a},P=function(a,b,d,c){a.addEventListener?a.addEventListener(b,d,!!c):a.attachEvent&&a.attachEvent("on"+b,d)},Q=function(a){I.setTimeout(a,0)},Da=!1,Ea=[],Ga=function(a){if(!Da){var b=J.createEventObject,d="complete"==J.readyState,c="interactive"==
J.readyState;if(!a||"readystatechange"!=a.type||d||!b&&c){Da=!0;for(var e=0;e<Ea.length;e++)Ea[e]()}}},Ha=0,Ia=function(){if(!Da&&140>Ha){Ha++;try{J.documentElement.doScroll("left"),Ga()}catch(a){I.setTimeout(Ia,50)}}},Ka=function(a){var b=J.getElementById(a);if(b&&Ja(b,"id")!=a)for(var d=1;d<document.all[a].length;d++)if(Ja(document.all[a][d],"id")==a)return document.all[a][d];return b},Ja=function(a,b){return a&&b&&a.attributes[b]?a.attributes[b].value:null},La=function(a){return a.target||a.srcElement||
{}},Ma=function(a){var b=J.createElement("div");b.innerHTML="A<div>"+a+"</div>";for(var b=b.lastChild,d=[];b.firstChild;)d.push(b.removeChild(b.firstChild));return d},Na=function(a,b){for(var d={},c=0;c<b.length;c++)d[b[c]]=!0;for(var e=a,c=0;e&&!d[String(e.tagName).toLowerCase()]&&100>c;c++)e=e.parentElement;e&&!d[String(e.tagName).toLowerCase()]&&(e=null);return e},Oa=!1,Pa=[],Qa=function(){if(!Oa){Oa=!0;for(var a=0;a<Pa.length;a++)Pa[a]()}},Ra=function(a){a=a||I;var b=a.location.href,d=b.indexOf("#");
return 0>d?"":b.substring(d+1)},Sa=function(a){window.console&&window.console.log&&window.console.log(a)};var Ta=new pa,Ua={},Wa={set:function(a,b){ha(Va(a,b),Ua)},get:function(a){return R(a,2)},reset:function(){Ta=new pa;Ua={}}},R=function(a,b){if(2==b){for(var d=Ua,c=a.split("."),e=0;e<c.length;e++){if(void 0===d[c[e]])return;d=d[c[e]]}return d}return Ta.get(a)},Va=function(a,b){for(var d={},c=d,e=a.split("."),f=0;f<e.length-1;f++)c=c[e[f]]={};c[e[e.length-1]]=b;return d};var Xa=new RegExp(/^(.*\.)?(google|youtube|blogger)(\.com?)?(\.[a-z]{2})?\.?$/),Ya={customPixels:["nonGooglePixels"],html:["customScripts","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],customScripts:["html","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],nonGooglePixels:[],nonGoogleScripts:["nonGooglePixels"],nonGoogleIframes:["nonGooglePixels"]},Za={customPixels:["customScripts","html"],html:["customScripts"],customScripts:["html"],nonGooglePixels:["customPixels",
"customScripts","html","nonGoogleScripts","nonGoogleIframes"],nonGoogleScripts:["customScripts","html"],nonGoogleIframes:["customScripts","html","nonGoogleScripts"]},$a=function(a,b){for(var d=[],c=0;c<a.length;c++)d.push(a[c]),d.push.apply(d,b[a[c]]||[]);return d},cb=function(){var a=R("gtm.whitelist");
var b=a&&$a(na(a),Ya),d=R("gtm.blacklist")||R("tagTypeBlacklist")||[];var c=d&&$a(na(d),Za),e={};return function(f){var g=f&&f["4"];if(!g)return!0;if(void 0!==e[g.a])return e[g.a];var h=!0;if(a)e:{if(0>la(b,g.a))if(g.b&&0<g.b.length)for(var k=0;k<g.b.length;k++){if(0>la(b,g.b[k])){h=
!1;break e}}else{h=!1;break e}h=!0}var p=!1;if(d){var l;if(!(l=0<=la(c,g.a)))e:{for(var q=g.b||[],r=new pa,t=0;t<c.length;t++)r.set(c[t],!0);for(t=0;t<q.length;t++)if(r.get(q[t])){l=!0;break e}l=!1}p=l}return e[g.a]=!h||p}};var eb=function(a){return db?J.querySelectorAll(a):null},fb;e:{var gb=/MSIE +([\d\.]+)/.exec(za.userAgent);if(gb&&gb[1]){var hb=J.documentMode;hb||(hb="CSS1Compat"==J.compatMode?parseInt(gb[1],10):5);if(!hb||8>=hb){fb=!1;break e}}fb=!!J.querySelectorAll}var db=fb;var ib=function(a,b,d,c,e){var f,g=(a.protocol.replace(":","")||I.location.protocol.replace(":","")).toLowerCase();switch(b){case "protocol":f=g;break;case "host":f=(a.hostname||I.location.hostname).split(":")[0].toLowerCase();if(d){var h=/^www\d*\./.exec(f);h&&h[0]&&(f=f.substr(h[0].length))}break;case "port":f=String(1*(a.hostname?a.port:I.location.port)||("http"==g?80:"https"==g?443:""));break;case "path":f="/"==a.pathname.substr(0,1)?a.pathname:"/"+a.pathname;var k=f.split("/");0<=la(c||[],k[k.length-
1])&&(k[k.length-1]="");f=k.join("/");break;case "query":f=a.search.replace("?","");if(e)e:{for(var p=f.split("&"),l=0;l<p.length;l++){var q=p[l].split("=");if(decodeURIComponent(q[0]).replace("+"," ")==e){f=decodeURIComponent(q.slice(1).join("=")).replace("+"," ");break e}}f=void 0}break;case "fragment":f=a.hash.replace("#","");break;default:f=a&&a.href}return f},jb=function(a){var b="";a&&a.href&&(b=a.hash?a.href.replace(a.hash,""):a.href);return b},kb=function(a){var b=J.createElement("a");a&&
(b.href=a);return b};var _eu=function(a){var b=String(R("gtm.elementUrl")||a[""]||""),d=kb(b);return b};_eu.a="eu";_eu.b=["google"];var lb=Math.random(),mb=null,nb=null;var _e=function(){return nb};_e.a="e";_e.b=["google"];var _r=function(a){return oa(a[""],a[""])};_r.a="r";_r.b=["google"];var _f=function(a){var b=String(R("gtm.referrer")||J.referrer);if(!b)return b;var d=kb(b);return b};_f.a="f";_f.b=["google"];var ob=function(a){var b=I.location,d=b.hash?b.href.replace(b.hash,""):b.href,c;if(c=a[""]?a[""]:R("gtm.url"))d=String(c),b=kb(d);return d},_u=ob;_u.a="u";_u.b=["google"];var _eq=function(a){return String(a["0"])==String(a["1"])};_eq.a="eq";_eq.b=["google"];var ub=ia,vb=[],wb=!1,xb=function(a){return I["dataLayer"].push(a)},yb=function(a){var b=!1;return function(){!b&&C(a)&&Q(a);b=!0}},Eb=function(){for(var a=!1;!wb&&0<vb.length;){wb=!0;var b=vb.shift();if(C(b))try{b.call(Wa)}catch(d){}else if(E(b))e:{var c=b;if("string"==ea(c[0])){for(var e=c[0].split("."),f=e.pop(),g=c.slice(1),h=Ua,k=0;k<e.length;k++){if(void 0===h[e[k]])break e;h=h[e[k]]}try{h[f].apply(h,g)}catch(p){}}}else{var l=b,q=void 0;for(q in l)if(l.hasOwnProperty(q)){var r=q,t=l[q];
Ta.set(r,t);ha(Va(r,t),Ua)}var w=!1,u=l.event;if(u){nb=u;var y=yb(l.eventCallback),K=l.eventTimeout;K&&I.setTimeout(y,Number(K));w=ub(u,y,l.eventReporter)}if(!mb&&(mb=l["gtm.start"])){}nb=null;a=w||a}var x=b,O=Ua;Db();wb=!1}return!a};var Fb,Gb=/(Firefox\D28\D)/g.test(za.userAgent),Hb={nwnc:{},nwc:{},wnc:{},wc:{},wt:null,l:!1},Ib={nwnc:{},nwc:{},wnc:{},wc:{},wt:null,l:!1},Ob=function(a,b){return function(d){d=d||I.event;var c=La(d),e=!1;if(3!==d.which||"LINK_CLICK"!=a){"LINK_CLICK"==a&&(c=Na(c,["a","area"]),e=!c||!c.href||Jb(c.href)||2===d.which||null==d.which&&4==d.button||d.ctrlKey||d.shiftKey||d.altKey||!0===d.metaKey);var f="FORM_SUBMIT"==a?Ib:Hb;if(d.defaultPrevented||!1===d.returnValue||d.J&&d.J()){if(c){var g={simulateDefault:!1},
h=Kb(f);h&&Lb(a,c,g,f.wt,h)}}else{if(c){var g={},k=!0;(k=Lb(a,c,g,f.wt,""))||(Mb(g.eventReport,f)?b=!0:e=!0);e=e||k||"LINK_CLICK"==a&&Gb;g.simulateDefault=!k&&b&&!e;g.simulateDefault&&(e=Nb(c,g)||e,!e&&d.preventDefault&&d.preventDefault());d.returnValue=k||!b||e;return d.returnValue}return!0}}}},Lb=function(a,b,d,c,e){var f=c||2E3,g={"gtm.element":b,"gtm.elementClasses":b.className,"gtm.elementId":b["for"]||Ja(b,"id")||"","gtm.elementTarget":b.formTarget||b.target||""};switch(a){case "LINK_CLICK":g["gtm.triggers"]=
e||"";g.event="gtm.linkClick";g["gtm.elementUrl"]=b.href;g.eventTimeout=f;g.eventCallback=Pb(b,d);g.eventReporter=function(a){d.eventReport=a};break;case "FORM_SUBMIT":g["gtm.triggers"]=e||"";g.event="gtm.formSubmit";g["gtm.elementUrl"]=Sb(b);g.eventTimeout=f;g.eventCallback=Tb(b,d);g.eventReporter=function(a){d.eventReport=a};break;case "CLICK":g.event="gtm.click";g["gtm.elementUrl"]=b.formAction||b.action||b.href||b.src||b.code||b.codebase||"";break;default:return!0}return xb(g)},Sb=function(a){var b=
a.action;b&&b.tagName&&(b=a.cloneNode(!1).action);return b},Ub=function(a){var b=a.target;if(!b)switch(String(a.tagName).toLowerCase()){case "a":case "area":case "form":b="_self"}return b},Nb=function(a,b){var d=!1,c=/(iPad|iPhone|iPod)/g.test(za.userAgent),e=Ub(a).toLowerCase();switch(e){case "":case "_self":case "_parent":case "_top":var f;f=(e||"_self").substring(1);b.targetWindow=I.frames&&I.frames[f]||I[f];break;case "_blank":c?(b.simulateDefault=!1,d=!0):(b.targetWindowName="gtm_autoEvent_"+
G().getTime(),b.targetWindow=I.open("",b.targetWindowName));break;default:c&&!I.frames[e]?(b.simulateDefault=!1,d=!0):(I.frames[e]||(b.targetWindowName=e),b.targetWindow=I.frames[e]||I.open("",e))}return d},Pb=function(a,b,d){return function(){b.simulateDefault&&(b.targetWindow?b.targetWindow.location.href=a.href:(d=d||G().getTime(),500>G().getTime()-d&&I.setTimeout(Pb(a,b,d),25)))}},Tb=function(a,b,d){return function(){if(b.simulateDefault)if(b.targetWindow){var c;b.targetWindowName&&(c=a.target,
a.target=b.targetWindowName);J.gtmSubmitFormNow=!0;Vb(a).call(a);b.targetWindowName&&(a.target=c)}else d=d||G().getTime(),500>G().getTime()-d&&I.setTimeout(Tb(a,b,d),25)}},Kb=function(a){for(var b=["wnc","nwnc"],d=[],c=0;c<b.length;c++){var e=a[b[c]],f;for(f in e)e.hasOwnProperty(f)&&e[f]&&d.push(f)}return d.join(",")},Wb=function(a,b,d,c,e){var f=e;if(!f||"0"==f){if(a.l)return;a.l=!0;f="0"}var g=a.wt;b&&(!g||g>c)&&(a.wt=c);a[b?d?"wc":"wnc":d?"nwc":"nwnc"][f]=!0},Mb=function(a,b){if(b.wnc["0"]||b.wc["0"])return!0;
for(var d=0;d<Xb.length;d++)if(a.passingRules[d]){var c=Xb[d],e=Yb[d],f=e&&e[0]&&e[0][0]||e[1]&&e[1][0];if(f&&"0"!=f&&(b.wc[f]||b.wnc[f]))for(var g=c[1],h=0;h<g.length;h++)if(a.resolvedTags[g[h]])return!0}return!1},Zb=function(a,b,d,c,e){var f,g,h=!1;switch(a){case "CLICK":if(J.gtmHasClickListenerTag)return;J.gtmHasClickListenerTag=!0;f="click";g=function(a){var b=La(a);b&&Lb("CLICK",b,{},c)};h=!0;break;case "LINK_CLICK":b&&!Fb&&(Fb=jb(J.location));Wb(Hb,b||!1,d||!1,c,e);if(J.gtmHasLinkClickListenerTag)return;
J.gtmHasLinkClickListenerTag=!0;f="click";g=Ob(a,b||!1);break;case "FORM_SUBMIT":Wb(Ib,b||!1,d||!1,c,e);if(J.gtmHasFormSubmitListenerTag)return;J.gtmHasFormSubmitListenerTag=!0;f="submit";g=Ob(a,b||!1);break;default:return}P(J,f,g,h)},Jb=function(a){if(!Fb)return!0;var b=a.indexOf("#");if(0>b)return!1;if(0==b)return!0;var d=kb(a);return Fb==jb(d)},Vb=function(a){try{if(a.constructor&&a.constructor.prototype)return a.constructor.prototype.submit}catch(b){}if(a.gtmReplacedFormSubmit)return a.gtmReplacedFormSubmit;
J.gtmFormElementSubmitter||(J.gtmFormElementSubmitter=J.createElement("form"));return J.gtmFormElementSubmitter.submit.call?J.gtmFormElementSubmitter.submit:a.submit};var gc=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},hc=function(a,b){return a<b?-1:a>b?1:0};var U;e:{var ic=n.navigator;if(ic){var jc=ic.userAgent;if(jc){U=jc;break e}}U=""};var kc=-1!=U.indexOf("Opera")||-1!=U.indexOf("OPR"),V=-1!=U.indexOf("Trident")||-1!=U.indexOf("MSIE"),lc=-1!=U.indexOf("Gecko")&&-1==U.toLowerCase().indexOf("webkit")&&!(-1!=U.indexOf("Trident")||-1!=U.indexOf("MSIE")),mc=-1!=U.toLowerCase().indexOf("webkit"),nc=function(){var a=n.document;return a?a.documentMode:void 0},oc=function(){var a="",b;if(kc&&n.opera){var d=n.opera.version;return"function"==aa(d)?d():d}lc?b=/rv\:([^\);]+)(\)|;)/:V?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:mc&&(b=/WebKit\/(\S+)/);
if(b)var c=b.exec(U),a=c?c[1]:"";if(V){var e=nc();if(e>parseFloat(a))return String(e)}return a}(),pc={},qc=function(a){var b;if(!(b=pc[a])){for(var d=0,c=gc(String(oc)).split("."),e=gc(String(a)).split("."),f=Math.max(c.length,e.length),g=0;0==d&&g<f;g++){var h=c[g]||"",k=e[g]||"",p=RegExp("(\\d*)(\\D*)","g"),l=RegExp("(\\d*)(\\D*)","g");do{var q=p.exec(h)||["","",""],r=l.exec(k)||["","",""];if(0==q[0].length&&0==r[0].length)break;d=hc(0==q[1].length?0:parseInt(q[1],10),0==r[1].length?0:parseInt(r[1],
10))||hc(0==q[2].length,0==r[2].length)||hc(q[2],r[2])}while(0==d)}b=pc[a]=0<=d}return b},rc=n.document,sc=rc&&V?nc()||("CSS1Compat"==rc.compatMode?parseInt(oc,10):5):void 0;var tc;if(!(tc=!lc&&!V)){var uc;if(uc=V)uc=V&&9<=sc;tc=uc}tc||lc&&qc("1.9.1");V&&qc("9");var vc=function(a){vc[" "](a);return a};vc[" "]=function(){};var Ac=function(a,b){var d="";V&&!wc(a)&&(d='<script>document.domain="'+document.domain+'";\x3c/script>'+d);var c="<!DOCTYPE html><html><head><script>var inDapIF=true;\x3c/script>"+d+"</head><body>"+b+"</body></html>";if(xc)a.srcdoc=c;else if(yc){var e=a.contentWindow.document;e.open("text/html","replace");e.write(c);e.close()}else zc(a,c)},xc=mc&&"srcdoc"in document.createElement("iframe"),yc=lc||mc||V&&qc(11),zc=function(a,b){V&&qc(7)&&!qc(10)&&6>Bc()&&Cc(b)&&(b=Dc(b));var d=function(){a.contentWindow.goog_content=
b;a.contentWindow.location.replace("javascript:window.goog_content")};V&&!wc(a)?Ec(a,d):d()},Bc=function(){var a=navigator.userAgent.match(/Trident\/([0-9]+.[0-9]+)/);return a?parseFloat(a[1]):0},wc=function(a){try{var b;var d=a.contentWindow;try{var c;if(c=!!d&&null!=d.location.href)t:{try{vc(d.foo);c=!0;break t}catch(e){}c=!1}b=c}catch(f){b=!1}return b}catch(g){return!1}},Fc=0,Ec=function(a,b){var d="goog_rendering_callback"+Fc++;window[d]=b;a.src="javascript:'<script>(function() {document.domain = \""+
document.domain+'";var continuation = window.parent.'+d+";window.parent."+d+" = null;continuation();})()\x3c/script>'"},Cc=function(a){for(var b=0;b<a.length;++b)if(127<a.charCodeAt(b))return!0;return!1},Dc=function(a){for(var b=unescape(encodeURIComponent(a)),d=Math.floor(b.length/2),c=[],e=0;e<d;++e)c[e]=String.fromCharCode(256*b.charCodeAt(2*e+1)+b.charCodeAt(2*e));1==b.length%2&&(c[d]=b.charAt(b.length-1));return c.join("")};/*
 Copyright (c) 2014 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE. Portions derived from simplehtmlparser, which is licensed under the Apache License, Version 2.0 */

var Ic=function(a,b,d,c){return function(){try{if(0<b.length){var e=b.shift(),f=Ic(a,b,d,c);if("SCRIPT"==String(e.nodeName).toUpperCase()&&"text/gtmscript"==e.type){var g=J.createElement("script");g.async=!1;g.type="text/javascript";g.id=e.id;g.text=e.text||e.textContent||e.innerHTML||"";e.charset&&(g.charset=e.charset);var h=e.getAttribute("data-gtmsrc");h&&(g.src=h,Ba(g,f));a.insertBefore(g,null);h||f()}else if(e.innerHTML&&0<=e.innerHTML.toLowerCase().indexOf("<script")){for(var k=[];e.firstChild;)k.push(e.removeChild(e.firstChild));
a.insertBefore(e,null);Ic(e,k,f,c)()}else a.insertBefore(e,null),f()}else d()}catch(p){Q(c)}}};var Kc=function(a,b,d){if(J.body){if(a[""])try{Ac(Ca(),"<script>var google_tag_manager=parent.google_tag_manager;\x3c/script>"+a["5"]),Q(b)}catch(c){Q(d)}else a[""]?Jc(a,b,d):Ic(J.body,Ma(a["5"]),b,d)()}else I.setTimeout(function(){Kc(a,b,d)},200)},_html=Kc;_html.a="html";_html.b=["customScripts"];var _img=function(a,b,d){var c=Ma('<a href="'+a["8"]+'"></a>')[0].href,e=a["2"];if(e)var f=c.charAt(c.length-1),c=c+((0<=c.indexOf("?")?"?"==f||"&"==f?"":"&":"?")+e+"="+a["3"]);m(c,b,d)};_img.a="img";_img.b=["customPixels"];var Nc,Oc;
var Yc=function(a){return function(){}},Zc=function(a){return function(){}};var sd=function(a){var b=I||n,d=b.onerror,c=!1;mc&&!qc("535.3")&&(c=!c);b.onerror=function(b,f,g,h,k){d&&d(b,f,g,h,k);a({message:b,fileName:f,Ca:g,Za:h,error:k});return c}};var ud=function(){var a=this;this.m=!1;this.fa=[];this.aa=[];this.C=function(){a.m||ua(a.fa);a.m=!0};this.B=function(){a.m||ua(a.aa);a.m=!0};this.f=ia},vd=function(a,b){a.fa.push(b)},wd=function(a,b){a.aa.push(b)},xd=function(){this.h=[];this.Y={};this.N=[];this.n=0};xd.prototype.addListener=function(a){this.N.push(a)};
var yd=function(a,b,d,c){if(!d.m){a.h[b]=d;void 0==c&&(c=[]);E(c)||(c=["or",c]);a.Y[b]=c;a.n++;var e=function(){0<a.n&&a.n--;0<a.n||ua(a.N)};vd(d,e);wd(d,e)}},zd=function(a,b,d){a.h[b]&&(vd(a.h[b],function(){d(b,!0)}),wd(a.h[b],function(){d(b,!1)}))},Ad=function(a,b){var d=!1;return function(c,e){var f=la(a,c);d||0>f||("or"==a[0]?e?(d=!0,b()):(a.splice(f,1),1==a.length&&(d=!0)):e?(a.splice(f,1),1==a.length&&(d=!0,b())):d=!0)}};var Bd=function(a,b){return function(){a["9"]=b.C;a["10"]=b.B;qa(a,b.C,b.B)}},Cd=function(a){var b=new ud;vd(b,Yc(a));wd(b,Zc(a));b.f=Bd(a,b);return b};var Gd,Hd;var je=function(){this.g=[]};je.prototype.set=function(a,b){this.g.push([a,b]);return this};je.prototype.resolve=function(a,b){for(var d={},c=0;c<this.g.length;c++){var e=ke(this.g[c][0],a,b),f=ke(this.g[c][1],a,b);d[e]=f}return d};var le=function(a){this.index=a};le.prototype.resolve=function(a,b){var d=zb[this.index];if(d&&!b(d)){var c=d["6"];if(a){if(a.get(c))return;a.set(c,!0)}d=ke(d,a,b);a&&a.set(c,!1);return qa(d)}};
for(var _M=function(a){return new le(a)},ne=function(a){this.resolve=function(b,d){for(var c=[],e=0;e<a.length;e++)c.push(ke(me[a[e]],b,d));return c.join("")}},_T=function(a){return new ne(arguments)},pe=function(a){function b(b){for(var c=1;c<a.length;c++)if(a[c]==b)return!0;return!1}this.resolve=function(d,c){var e=ke(a[0],d,c);if(a[0]instanceof
le&&b(8)&&b(16)){var f="gtm"+va++;oe.set(f,e);return'google_tag_manager["GTM-PCNHT7"].macro(\''+f+"')"}for(var e=String(e),g=1;g<a.length;g++)e=Y[a[g]](e);return e}},_E=function(a,b){return new pe(arguments)},Cb=function(a,b){return ke(a,new pa,b)},ke=function(a,b,d){var c=a;if(a instanceof le||a instanceof je||a instanceof ne||a instanceof pe)return a.resolve(b,d);if(E(a))for(var c=[],e=0;e<a.length;e++)c[e]=ke(a[e],b,d);else if(a&&"object"==typeof a){var c={},f;for(f in a)a.hasOwnProperty(f)&&(c[f]=
ke(a[f],b,d))}return c},qe=function(a,b){var d=b[a],c=d;if(d instanceof le||d instanceof pe||d instanceof ne)c=d;else if(E(d))for(var c=[],e=0;e<d.length;e++)c[e]=qe(d[e],b);else if("object"==typeof d){var c=new je,f;for(f in d)d.hasOwnProperty(f)&&c.set(b[f],qe(d[f],b))}return c},Z=function(a,b){for(var d=b?b.split(","):[],c=0;c<d.length;c++){var e=d[c]=d[c].split(":");0==a&&(e[1]=me[e[1]]);if(1==a)for(var f=re(e[0]),e=d[c]={},g=0;g<f.length;g++){var h=se[f[g]];e[h[0]]=h[1]}if(2==a)for(g=0;4>g;g++)e[g]=
re(e[g]);3==a&&(d[c]=me[e[0]]);if(4==a)for(g=0;2>g;g++)if(e[g]){e[g]=e[g].split(".");for(var k=0;k<e[g].length;k++)e[g][k]=me[e[g][k]]}else e[g]=[];5==a&&(d[c]=e[0])}return d},re=function(a){var b=[];if(!a)return b;for(var d=0,c=0;c<a.length&&d<te;d+=6,c++){var e=a&&a.charCodeAt(c)||65;if(65!=e){var f=0,f=65<e&&90>=e?e-65:97<=e&&122>=e?e-97+26:95==e?63:48<=e?e-48+52:62;1&f&&b.push(d);2&f&&b.push(d+1);4&f&&b.push(d+2);8&f&&b.push(d+3);16&f&&b.push(d+4);32&f&&b.push(d+5)}}return b},te=26,
ue=[_eq,_e,'_event',_M(0),'gtm.js','807119_2147479553',_img,'Segment pixel','http://ib.adnxs.com/seg?add\x3d962388\x26t\x3d2','gtmcb',_r,'_random',_M(1),9,_html,'Quantcast','\x3cscript type\x3d\x22text/gtmscript\x22\x3evar _qevents\x3d_qevents||[];(function(){var a\x3ddocument.createElement(\x22script\x22);a.src\x3d(\x22https:\x22\x3d\x3ddocument.location.protocol?\x22https://secure\x22:\x22http://edge\x22)+\x22.quantserve.com/quant.js\x22;a.async\x3d!0;a.type\x3d\x22text/javascript\x22;var b\x3ddocument.getElementsByTagName(\x22script\x22)[0];b.parentNode.insertBefore(a,b)})();_qevents.push({qacct:\x22p-5aDJR7ayfzWN6\x22});\x3c/script\x3e',8,'Lotame','\x3cscript type\x3d\x22text/gtmscript\x22\x3evar head\x3ddocument.getElementsByTagName(\x22head\x22)[0],script\x3ddocument.createElement(\x22script\x22);script.setAttribute(\x22async\x22,!0);script.setAttribute(\x22id\x22,\x22LOTCC_3698\x22);script.setAttribute(\x22src\x22,\x22http://tags.crwdcntrl.net/c/3698/cc.js?ns\\x3d_cc3698\x22);script.onload\x3dfunction(){_cc3698.bcp()};head.appendChild(script);\x3c/script\x3e',7,'Criteo','\x3cscript type\x3d\x22text/gtmscript\x22\x3evar crtg_nid\x3d\x221693\x22,crtg_cookiename\x3d\x22cto_amrm\x22;function crtg_getCookie(e){var a,c,d,b\x3ddocument.cookie.split(\x22;\x22);for(a\x3d0;a\x3cb.length;a++)if(c\x3db[a].substr(0,b[a].indexOf(\x22\\x3d\x22)),d\x3db[a].substr(b[a].indexOf(\x22\\x3d\x22)+1),c\x3dc.replace(/^\\s+|\\s+$/g,\x22\x22),c\x3d\x3de)return unescape(d);return\x22\x22}\nvar crtg_content\x3dcrtg_getCookie(crtg_cookiename),crtg_rnd\x3dMath.floor(99999999999*Math.random()),crtg_url\x3d\x22http://rtax.criteo.com/delivery/rta/rta.js?netId\\x3d\x22+escape(crtg_nid),crtg_url\x3dcrtg_url+(\x22\\x26cookieName\\x3d\x22+escape(crtg_cookiename)),crtg_url\x3dcrtg_url+(\x22\\x26rnd\\x3d\x22+crtg_rnd),crtg_url\x3dcrtg_url+\x22\\x26varName\\x3dcrtg_content\x22,head\x3ddocument.getElementsByTagName(\x22head\x22)[0],script\x3ddocument.createElement(\x22script\x22);script.setAttribute(\x22async\x22,!0);script.setAttribute(\x22defer\x22,\x22defer\x22);\nscript.setAttribute(\x22src\x22,crtg_url);head.appendChild(script);\x3c/script\x3e',6,'Typekit','\x3cscript type\x3d\x22text/gtmscript\x22\x3e(function(a){var e\x3d{kitId:\x22bjg2xlw\x22,scriptTimeout:3E3},c\x3da.documentElement,g\x3dsetTimeout(function(){c.className\x3dc.className.replace(/\\bwf-loading\\b/g,\x22\x22)+\x22 wf-inactive\x22},e.scriptTimeout),b\x3da.createElement(\x22script\x22),f\x3d!1;a\x3da.getElementsByTagName(\x22script\x22)[0];var d;c.className+\x3d\x22 wf-loading\x22;b.src\x3d\x22//use.typekit.net/\x22+e.kitId+\x22.js\x22;b.async\x3d!0;b.onload\x3db.onreadystatechange\x3dfunction(){d\x3dthis.readyState;if(!(f||d\x26\x26\x22complete\x22!\x3dd\x26\x26\x22loaded\x22!\x3dd)){f\x3d!0;clearTimeout(g);try{Typekit.load(e)}catch(a){}}};a.parentNode.insertBefore(b,\na)})(document);\x3c/script\x3e',10],ve=[],we=0;we<ue.length;we++)ve[we]=qe(we,ue);var me=ve,se=Z(0,"4:0,4:1,6:2,0:3,1:4,4:6,6:7,8:8,2:9,4:10,6:11,3:12,7:13,4:14,6:15,5:16,7:17,6:18,5:19,7:20,6:21,5:22,7:23,6:24,5:25,7:26"),zb=Z(1,"G,AY"),oe=new pa,xe=Z(1,"Z"),X=Z(1,"gnB,AAe,AAiD,AACc,AACgD"),Xb=Z(2,"B:f::"),Yb=Z(4,"5.5.5.5.5:");var Db=function(){};var Ce=function(){var a=[];return function(b,d){if(void 0===a[b]){var c=xe[b]&&Cb(xe[b],d);a[b]=[c&&qa(c),c]}return a[b]}},De=function(a,b){for(var d=b[0],c=0;c<d.length;c++)if(!a.k(d[c],a.d)[0])return!1;for(var e=b[2],c=0;c<e.length;c++)if(a.k(e[c],a.d)[0])return!1;return!0},Ee=!1,ub=function(a,b,d){switch(a){case "gtm.js":if(Ee)return!1;Ee=!0;break;case "gtm.sync":if(R("gtm.snippet")!=lb)return!1}R("tagTypeBlacklist");for(var c={name:a,v:b||ia,u:re(),G:re(),k:Ce(),d:cb()},e=[],f=0;f<Xb.length;f++)if(De(c,
Xb[f])){e[f]=!0;for(var g=c,h=Xb[f],k=h[1],p=0;p<k.length;p++)g.u[k[p]]=!0;for(var l=h[3],p=0;p<l.length;p++)g.G[l[p]]=!0}else e[f]=!1;var q=[];for(var r=0;r<te;r++)if(c.u[r]&&!c.G[r])if(c.d(X[r])){}else{q[r]=Cb(X[r],c.d);}c.H=
q;for(var t=new xd,w=0;w<te;w++)if(c.u[w]&&!c.G[w]&&!c.d(X[w])){var u=c.H[w],y=Cd(u);yd(t,w,y,u[""]);if(u[""])break}t.addListener(c.v);for(var K=[],A=0;A<t.h.length;A++){var H=t.h[A];if(H){var D=t.Y[A];if(0==D.length)K.push(A);else for(var z=Ad(D,H.f),v=0;v<D.length;v++)D[v]!=A&&zd(t,D[v],z)}}for(A=0;A<K.length;A++)t.h[K[A]].f();0<t.n||ua(t.N);d&&C(d)&&d({passingRules:e,resolvedTags:c.H});return 0<c.H.length};var Fe={macro:function(a){if(oe.contains(a))return oe.get(a)}};Fe.dataLayer=Wa;Fe.oa=function(){var a=I.google_tag_manager;a||(a=I.google_tag_manager={});a["GTM-PCNHT7"]||(a["GTM-PCNHT7"]=Fe)};Fe.oa();
(function(){var a=L("dataLayer",[],!1),b=L("google_tag_manager",{},!1),b=b["dataLayer"]=b["dataLayer"]||{};Ea.push(function(){b.gtmDom||(b.gtmDom=!0,a.push({event:"gtm.dom"}))});Pa.push(function(){b.gtmLoad||(b.gtmLoad=!0,a.push({event:"gtm.load"}))});var d=a.push;a.push=function(){var b=[].slice.call(arguments,0);d.apply(a,b);for(vb.push.apply(vb,b);300<this.length;)this.shift();return Eb()};vb.push.apply(vb,a.slice(0));Q(Eb)})();
if("interactive"==J.readyState&&!J.createEventObject||"complete"==J.readyState)Ga();else{P(J,"DOMContentLoaded",Ga);P(J,"readystatechange",Ga);if(J.createEventObject&&J.documentElement.doScroll){var Ge=!0;try{Ge=!I.frameElement}catch(He){}Ge&&Ia()}P(I,"load",Ga)}"complete"===J.readyState?Qa():P(I,"load",Qa);
(function(a){})("async");var _vs="res_ts:1415805618808000,srv_cl:85993109,ds:live,cv:8";
})()
