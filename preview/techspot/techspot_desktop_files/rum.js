!function(a,b){function k(){var a=Math.round(1e6*Math.random()).toString(36)+(new Date).getTime().toString(36)+Math.round(1e6*Math.random()).toString(36);return a}function ab(a){var c=b.getElementById("elem"+a);c&&c.parentNode.removeChild(c)}function bb(a,c,d){var e=b.body,f=b.createElement("iframe");if(f.width=f.height=30,f.id="elem"+a,f.style.cssText="display:none;z-index:-999;margin:0;border:0;overflow:scroll;","rum"==d)f.src=96==a?C+c+"/os/aol/50kb-20111128.html?cdn="+a:34==a||114==a?C+c+"/static/rum/50kb-20111128.html?cdn="+a+"&t="+k():C+c+"/static/rum/50kb-20141024.html?cdn="+a+"&t="+k();else if("auth"==d){var g='<script>\nvar hitTest = "", random = "'+P+'", newImg = new Image, imgUrl = "http://'+c+J+'" + random;\n'+"newImg.onerror = function() {\n"+'if( hitTest != "fail" ) { \n'+'hitTest = "fail";\n'+"}\n"+"}\n"+"newImg.onload = function() {\n"+'if( hitTest != "fail" ) { \n'+'var p = performance.getEntriesByType("resource")[0];\n'+"if(p) {\n"+"var dnsE = p.domainLookupEnd, dnsS = p.domainLookupStart, dnsTime = Math.round(dnsE - dnsS);\n"+"var connectTime = Math.round(p.connectEnd - p.connectStart);\n"+"if (connectTime > 5) {\n"+"if (dnsTime > 3) {\n"+'parent.postMessage({"clientResolverTime":dnsTime, "random":random},"*");\n'+"} else {\n"+'parent.postMessage({"isPixelServerUp":true, "random":random},"*");\n'+"window.location.reload();\n"+"}\n"+"} else {\n"+"window.location.reload();\n"+"}\n"+"}\n"+"}\n"+"}\n"+"newImg.src = imgUrl;\n"+"<"+"/script>";f.onload=function(){G++,G>2&&(H&&(H=!1,hb(u[0],v[0])),ab(E))},f.src="data:text/html;charset=utf-8;base64,"+btoa(g)}else(34!=a||96!=a||114!=a)&&(f.src=C+c+"/static/rum/xhr-20130809.html?cdn="+a+"&t="+k());e.appendChild(f)}function cb(a,b,f,g){var i,k,l=new Image;i="auth"==f?"/dnsv1?beacon=":b.err||b.debug?"/v2?debug=":"/v2?beacon=",k=C+B+i,b.v=c,1==d&&(b.mobile=!0),"rum"==f?-1==A.indexOf(parseInt(a))&&(A.push(parseInt(a)),D&&(b.resolver=D),1==e&&(b.navtiming=!0),l.src=k+encodeURIComponent(_.encode(JSON.stringify(b))),j.setItem("lastBeacon"+a,r),ab(a),1==d&&1!=e&&""!=g&&bb(a,g,"xhr")):l.src=k+encodeURIComponent(_.encode(JSON.stringify(b)))}function db(a){-1==z.indexOf(parseInt(a))&&(z.push(parseInt(a)),y+=1,s>y&&eb(w[y],x[y]))}function eb(a,b){var f,g,h,c=new Image,i={cdn:parseInt(a),status:!1};setTimeout(function(){db(a),cb(a,i,"rum",b)},t),1==e?bb(a,b,"rum"):1==d&&(f=(new Date).getTime(),c.width=c.height=0,c.id="elem"+a,c.onerror=function(){db(a),cb(a,i,"rum",b)},c.onload=function(){g=(new Date).getTime(),h=g-f;var c={cdn:parseInt(a),timing:{total:h},status:!0};db(a),cb(a,c,"rum",b)},c.src=96==a?C+b+"/os/aol/image-15kb.jpg":C+b+"/static/rum/image-15kb.jpg?"+"t="+k())}function fb(a){var c,d,e,f=a.origin.split("//")[1];f==x[0]||f==x[1]||f==x[2]?(d=JSON.parse(a.data),d.cdn&&(e=d.cdn),1!=d.xhr?(db(e),cb(e,d,"rum",f)):cb(e,d,"xhr",f)):a.data.random==P&&(c=a.data,c.clientResolverTime?(N=parseInt(c.clientResolverTime),j.setItem("TURBOBYTESclientResolverTime",N),ab(E),H=!1,gb(E,F,N,"")):c.isPixelServerUp&&(H=!0))}function gb(a,b,c,d){var e={cdn:parseInt(a),host:b,auth:!0,status:!0};c.failDuration?(e.status=!1,e.failDuration=c.failDuration):(e.timing={dns:c},e.headers={"X-TB-IP":d}),j.setItem("lastBeacon"+a,r),1e4!==a?(O+=1,maxAuth>O&&hb(u[O],v[O])):hb(u[0],v[0]),D?(e.resolver=D,cb(a,e,"auth","")):(K.push(e),L||(L=setInterval(function(){if(M++,D||15==M){for(var a=0;a<K.length;a++)K[a].resolver=D,cb(K[a].cdn,K[a],"auth","");clearInterval(L),L=!1,K=[]}},200)))}function hb(a,b){var f,g,h,c=new Image,d=P+"."+b,e=C+d+J+P;c.onerror=function(){h="fail",g=(new Date).getTime()-f,gb(a,d,{failDuration:g},"")},c.onload=function(){"fail"!=h&&setTimeout(function(){ib("miss",d,e,a)},100)},c.width=c.height=0,f=(new Date).getTime(),c.src=e}function ib(b,c,d,e){var f,g,h,i="";f=a.performance.getEntriesByName(d)[0],f&&(g=Math.round(f.domainLookupEnd-f.domainLookupStart),"miss"==b&&g>5&&f.connectEnd-f.connectStart>5&&(h=new XMLHttpRequest,h.onerror=function(){gb(e,c,g,i)},h.onload=function(){i=this.getResponseHeader("X-TB-IP"),gb(e,c,g,i)},h.open("GET",d,!0),h.send(null)))}function jb(){setTimeout(function(){H&&(H=!1,hb(u[0],v[0])),ab(E)},t),bb(E,F,"auth")}function kb(a,b,c,d){var e=b[Math.floor(Math.random()*b.length)],f=b.indexOf(e);-1!=f&&b.splice(f,1);for(var g in a)g==e&&(c.push(e),d.push(a[g]))}function lb(a,b){for(var c in a)b.push(c);for(var c in a){var d=j.getItem("lastBeacon"+c);if(null!=d&&r-parseInt(d)<l){var e=b.indexOf(c);-1!=e&&b.splice(e,1)}}}function mb(){function c(){if(q.length>0){q.length<s&&(s=q.length);for(var a=0;s>a;a++)kb("https://"==C?n:o,q,w,x);eb(w[0],x[0])}if(p.length>0){p.length<maxAuth&&(maxAuth=p.length);for(var a=0;maxAuth>a;a++)kb(m,p,u,v);jb()}}function d(){var a=j.getItem("TURBOBYTESdnsResolverTime");if(D=j.getItem("TURBOBYTESdnsResolver"),null==a||r-parseInt(a)>72e5||null==D){window.TURBOBYTESupdateDnsResolver=function(a){var c=a.resolver,d=a.geo;null!=c&&""!=c&&(D=c,j.setItem("TURBOBYTESdnsResolver",c),j.setItem("TURBOBYTESdnsResolverTime",r)),null!=d&&""!=d&&j.setItem("TURBOBYTESclientGeo",d);var e=b.getElementById("TURBOBYTESjsonp");e.parentNode.removeChild(e)};var c="script",d=b.createElement(c),e=b.getElementsByTagName(c)[0];d.id="TURBOBYTESjsonp",d.async=d.src=(Math.random()<.2?"https://":"http://")+k()+".dns.turbobytes.com/json?callback=TURBOBYTESupdateDnsResolver",e.parentNode.insertBefore(d,e)}}if(lb("https://"==C?n:o,q),1==f&&lb(m,p),0!=q.length||0!=p.length){if(a.addEventListener("message",fb,!1),-1!=X.indexOf("soundcloud")||-1!=X.indexOf("advidi")||-1!=X.indexOf("magnuum")||-1!=X.indexOf("meccahoo")||-1!=X.indexOf("pickupcloud")||-1!=X.indexOf("flingguru")||-1!=X.indexOf("babetimes")||-1!=X.indexOf("askmecca")||-1!=X.indexOf("sexypartners")||-1!=X.indexOf("swingers-match")){var e=j.getItem("TURBOBYTESclientGeo");null!=e&&""!=e&&(V=U[e]||W)}else V=1;Math.random()<V?(d(),c()):Math.random()<.5&&null!=e&&""!=e&&d()}}var d,e,f,g,c=15,h=navigator.userAgent.toLowerCase(),i=navigator.doNotTrack||navigator.msDoNotTrack;if("https:"!=a.location.protocol&&a.postMessage&&!h.match(/opera mini|catchpoint|pingdom/i)&&"yes"!=i&&1!=i){"object"!=typeof performance||"MozAppearance"in b.documentElement.style&&!i||-1!=h.indexOf("chromeframe")||(g=a.performance||a.msPerformance||a.webkitPerformance||a.mozPerformance,g&&g.timing&&(e=1),g.getEntriesByName&&a.chrome&&(f=1)),a.matchMedia||(a.matchMedia=function(){"use strict";var c=a.styleMedia||a.media;if(!c){var d=b.createElement("style"),e=b.getElementsByTagName("script")[0],f=null;d.type="text/css",d.id="matchmediajs-test",e.parentNode.insertBefore(d,e),f="getComputedStyle"in a&&a.getComputedStyle(d)||d.currentStyle,c={matchMedium:function(a){var b="@media "+a+"{ #matchmediajs-test { width: 1px; } }";return d.styleSheet?d.styleSheet.cssText=b:d.textContent=b,"1px"===f.width}}}return function(a){return{matches:c.matchMedium(a||"all"),media:a||"all"}}}()),matchMedia("only screen and (max-device-width: 640px)").matches?d=1:h.match(/mobi|minimo|fennec/i)&&-1==h.indexOf("ipad")&&-1==h.indexOf("android 3")&&(d=1);var j=!!function(){var a,b=+new Date;try{return localStorage.setItem(b,b),a=localStorage.getItem(b)==b,localStorage.removeItem(b),a}catch(c){}}()&&localStorage;if(j&&(1==e||1==d)){var R,l=36e5,m={10001:"tbrum1.com",10002:"tbrum2.com",10003:"tbrum3.com",10004:"tbrum4.com",10005:"tbrum5.com",10006:"startrender.com",10008:"tbrum8.com",10009:"tbrum9.com",10010:"tbrum10.com",10011:"tbrum11.com",10014:"tbrum14.com"},n={},o={1:"hwnd.cdnplanet.com",7:"ec.cdnplanet.com",8:"cdnw.cdnplanet.com",9:"cachefly.cdnplanet.com",10:"lvl3.cdnplanet.com",11:"cloudfront.cdnplanet.com",15:"netdna.cdnplanet.com",16:"lw.cdnplanet.com",18:"bg.cdnplanet.com",19:"cdn77.cdnplanet.com",22:"llnw.cdnplanet.com",23:"llnw1.cdnplanet.com",24:"llnw2.cdnplanet.com",25:"llnw3.cdnplanet.com",26:"llnw4.cdnplanet.com",55:"dogfood.turbobytes.com",77:"ecgs.cdnplanet.com",96:"o2.aolcdn.com",111:"s3-us-east.cdnplanet.com",115:"hwnd-sc.cdnplanet.com",116:"ec-sc.cdnplanet.com",117:"fastly-global.cdnplanet.com",501:"hwndssl.turbobytes.net",507:"ecssl.turbobytes.net",542:"skypark.turbobytes.net",543:"akamai.turbobytes.net",587:"rum.trbbts14.net",597:"ecl.cdnplanet.com"},p=[],q=[],r=(new Date).getTime(),s=maxAuth=3,t=5e3,u=[],v=[],w=[],x=[],y=0,z=[],A=[],B="rum.turbobytes.com",C="https:"===a.location.protocol?"https://":"http://",D=!1,E=1e4,F="fixed.turbobytes.net",G=0,H=!1,J="/apsk.gif?",K=[],L=!1,M=0,N=0,O=0,P=k(),Q=new Date,S=Q.getUTCMonth()+1,U={US:.11,CA:.11,DE:.11,FR:.11,GB:.11,NL:.13,IT:.13,RU:.13,PL:.13,ES:.13,BE:.13,BR:.13,MX:.13},V=.1,W=.15,X=a.location.host;10>S&&(S="0"+S),R=Q.getFullYear()+""+S+Q.getDate();var Z=b.getElementsByTagName("head")[0],$=b.createElement("link");$.rel="dns-prefetch",$.href="//"+B,Z.appendChild($);var _={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){for(var c,d,e,f,g,h,i,b="",j=0;j<a.length;)c=a.charCodeAt(j++),d=a.charCodeAt(j++),e=a.charCodeAt(j++),f=c>>2,g=(3&c)<<4|d>>4,h=(15&d)<<2|e>>6,i=63&e,isNaN(d)?h=i=64:isNaN(e)&&(i=64),b=b+this._keyStr.charAt(f)+this._keyStr.charAt(g)+this._keyStr.charAt(h)+this._keyStr.charAt(i);return b}};a.TURBOBYTESjs||(a.TURBOBYTESjs=!0,mb())}}}(window,document);