(function(){var g=this,k=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b},l=function(a){return"string"==typeof a},m=function(a,b,c){return a.call.apply(a.bind,arguments)},n=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,f);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},r=function(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?
m:n;return r.apply(null,arguments)};var u=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},v=function(a,b){return a<b?-1:a>b?1:0};var w;a:{var x=g.navigator;if(x){var y=x.userAgent;if(y){w=y;break a}}w=""};var z=function(){return-1!=w.indexOf("Edge")};var A=-1!=w.indexOf("Opera")||-1!=w.indexOf("OPR"),B=-1!=w.indexOf("Edge")||-1!=w.indexOf("Trident")||-1!=w.indexOf("MSIE"),C=-1!=w.indexOf("Gecko")&&!(-1!=w.toLowerCase().indexOf("webkit")&&!z())&&!(-1!=w.indexOf("Trident")||-1!=w.indexOf("MSIE"))&&!z(),D=-1!=w.toLowerCase().indexOf("webkit")&&!z(),E=function(){var a=w;if(C)return/rv\:([^\);]+)(\)|;)/.exec(a);if(B&&z())return/Edge\/([\d\.]+)/.exec(a);if(B)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(D)return/WebKit\/(\S+)/.exec(a)},F=function(){var a=
g.document;return a?a.documentMode:void 0},G=function(){if(A&&g.opera){var a=g.opera.version;return"function"==k(a)?a():a}var a="",b=E();b&&(a=b?b[1]:"");return B&&!z()&&(b=F(),b>parseFloat(a))?String(b):a}(),H={},I=function(a){if(!H[a]){for(var b=0,c=u(String(G)).split("."),f=u(String(a)).split("."),d=Math.max(c.length,f.length),e=0;0==b&&e<d;e++){var h=c[e]||"",t=f[e]||"",J=RegExp("(\\d*)(\\D*)","g"),U=RegExp("(\\d*)(\\D*)","g");do{var p=J.exec(h)||["","",""],q=U.exec(t)||["","",""];if(0==p[0].length&&
0==q[0].length)break;b=v(0==p[1].length?0:parseInt(p[1],10),0==q[1].length?0:parseInt(q[1],10))||v(0==p[2].length,0==q[2].length)||v(p[2],q[2])}while(0==b)}H[a]=0<=b}},K=g.document,L=F(),M=!K||!B||!L&&z()?void 0:L||("CSS1Compat"==K.compatMode?parseInt(G,10):5);var N;if(!(N=!C&&!B)){var O;if(O=B)O=B&&(z()||9<=M);N=O}N||C&&I("1.9.1");B&&I("9");var P=function(a){return a?a.parentWindow||a.defaultView:window};var Q=function(a){var b=P();b.google_image_requests||(b.google_image_requests=[]);var c=b.document.createElement("img");c.src=a;b.google_image_requests.push(c)};var R=function(a){return"//pagead2.googlesyndication.com/pagead/gen_204?id=sodar&v=5&t="+a},S=function(a,b,c){a=R(1)+"&e="+a;c&&(a+="&li="+encodeURIComponent(String(c)));b&&(a+="&bgai="+encodeURIComponent(String(b)));Q(a)},V=function(a,b){return function(){try{return a.apply(this,arguments)}catch(c){if(!(1<=T)){var f=R(0)+"&c="+encodeURIComponent(String(b))+"&ex=",d=c.toString();c.name&&-1==d.indexOf(c.name)&&(d+=": "+c.name);c.message&&-1==d.indexOf(c.message)&&(d+=": "+c.message);if(c.stack){var e=
c.stack,h=d;try{-1==e.indexOf(h)&&(e=h+"\n"+e);for(var t;e!=t;)t=e,e=e.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/,"$1");d=e.replace(/\n */g,"\n")}catch(J){d=h}}f+=encodeURIComponent(String(d));2E3<f.length?S(11):Q(f);T+=1}}}},T=0,W=function(a,b){var c=V(b,"i:lh");a.addEventListener?a.addEventListener("load",c,!1):a.attachEvent&&a.attachEvent("onload",c);return c},X=function(a,b){var c,f=b;c=W(a,function(){if(f){var b=f;f=null;a.removeEventListener?a.removeEventListener("load",c,!1):a.detachEvent&&
a.detachEvent("onload",c);return b.apply(this,arguments)}})};var Y=function(a){var b;a:{b=typeof a;if("object"==b&&null!=a||"function"==b)switch(a["0"]){case 0:b=0===a["0"]&&l(a["1"])&&l(a["2"])&&l(a["3"])&&l(a["4"])?!0:!1;break a}b=!1}return b?JSON.stringify(a):null};var Z=function(){var a=P().GoogleTyFxhY;if(!a)return S(0),null;if(0==a.length)return S(1),null;a=a.shift();return a._scs_&&a._bgu_&&a._bgp_?a:(S(2),null)},aa=function(a,b,c,f,d){var e=a.contentWindow||P(a.contentDocument||a.contentWindow.document);if(e){a=(0==a.src.indexOf("https:")?"https":"http")+"://tpc.googlesyndication.com";var h={0:0};h["1"]=b;h["2"]=c;h["3"]=f;d||(d="");h["4"]=d;e.postMessage(Y(h),a)}else S(3)};(function(a,b,c){V(a,b).apply(null,Array.prototype.slice.call(arguments,2))})(function(){var a;var b=P();a=b.postMessage?(b=b.JSON)&&"function"==k(b.stringify)&&"function"==k(b.parse)?!0:!1:!1;var c=!1,f=b=null,d=Z();if(d)if(c=!0,b=d._scs_,f=d._li_,a){var e=document.createElement("iframe");X(e,r(aa,null,e,d._scs_,d._bgu_,d._bgp_,d._li_));e.src="//tpc.googlesyndication.com/sodar/cTrvNaRi.html";e.width="0";e.height="0";e.style.display="none";document.body.appendChild(e)}else S(8,b,f);"0.01"<Math.random()||
(a="//pagead2.googlesyndication.com/pagead/gen_204?id=sodarir&v=5&d="+(c?1:0)+"&s="+(a?1:0)+"&f=0.01",f&&(a+="&li="+encodeURIComponent(String(f))),b&&(a+="&bgai="+encodeURIComponent(String(b))),Q(a))},"i:i");})()