(function(){var l=this,n=function(a){return void 0!==a},aa=function(){},ba=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&
!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},p=function(a){return"array"==ba(a)},r=function(a){return"string"==typeof a},t=function(a){return"function"==ba(a)},ca=function(a,b,c){return a.call.apply(a.bind,arguments)},da=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,
d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},u=function(a,b,c){u=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ca:da;return u.apply(null,arguments)},v=Date.now||function(){return+new Date},w=function(a,b){var c,d=b,e=a.split(".");c=c||l;e[0]in c||!c.execScript||c.execScript("var "+e[0]);for(var f;e.length&&(f=e.shift());)!e.length&&n(d)?c[f]=d:c=c[f]?c[f]:c[f]={}},ea=function(a,b){function c(){}c.prototype=b.prototype;a.Ha=b.prototype;
a.prototype=new c;a.Ka=function(a,c,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[c].apply(a,g)}};var fa=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},ga=function(a,b){return a<b?-1:a>b?1:0};var x=Array.prototype,ha=x.indexOf?function(a,b,c){return x.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(r(a))return r(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},ia=x.forEach?function(a,b,c){x.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=r(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},ja=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]},ka=ja,la=
function(a,b,c){return 2>=arguments.length?x.slice.call(a,b):x.slice.call(a,b,c)};var ma=function(a,b){var c,d;for(d in a)b.call(c,a[d],d,a)},na=function(a,b){var c,d;for(d in a)if(b.call(c,a[d],d,a))return!0;return!1},oa=function(a,b,c){return b in a?a[b]:c},pa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),qa=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<pa.length;f++)c=pa[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}},ra=function(a){var b=arguments.length;
if(1==b&&p(arguments[0]))return ra.apply(null,arguments[0]);if(b%2)throw Error("Uneven number of arguments");for(var c={},d=0;d<b;d+=2)c[arguments[d]]=arguments[d+1];return c};var sa=function(a,b){this.x=n(a)?a:0;this.y=n(b)?b:0};sa.prototype.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};sa.prototype.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};var y;a:{var ta=l.navigator;if(ta){var ua=ta.userAgent;if(ua){y=ua;break a}}y=""}var z=function(a){var b=y;return-1!=b.indexOf(a)},va=function(){var a="WebKit",b=y;return-1!=b.toLowerCase().indexOf(a.toLowerCase())};var wa=function(){return z("Opera")||z("OPR")},xa=function(){return z("Trident")||z("MSIE")},ya=wa,za=xa;var Aa=ya(),A=za(),Ba=z("Edge"),B=z("Gecko")&&!(va()&&!z("Edge"))&&!(z("Trident")||z("MSIE"))&&!z("Edge"),C=va()&&!z("Edge"),Ea=function(){if(Aa&&l.opera){var a;var b=l.opera.version;try{a=b()}catch(c){a=b}return a}a="";(b=Ca())&&(a=b?b[1]:"");return A&&(b=Da(),b>parseFloat(a))?String(b):a},Ca=function(){var a=y;if(B)return/rv\:([^\);]+)(\)|;)/.exec(a);if(Ba)return/Edge\/([\d\.]+)/.exec(a);if(A)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(C)return/WebKit\/(\S+)/.exec(a)},Da=function(){var a=
l.document;return a?a.documentMode:void 0},Fa=Ea(),Ga={},D=function(a){var b;if(!(b=Ga[a])){var c=a;b=Fa;var d=0;b=fa(String(b)).split(".");for(var c=fa(String(c)).split("."),e=Math.max(b.length,c.length),f=0;0==d&&f<e;f++){var g=b[f]||"",h=c[f]||"",k=RegExp("(\\d*)(\\D*)","g"),m=RegExp("(\\d*)(\\D*)","g");do{var q=k.exec(g)||["","",""],E=m.exec(h)||["","",""];if(0==q[0].length&&0==E[0].length)break;var d=0==q[1].length?0:parseInt(q[1],10),I=0==E[1].length?0:parseInt(E[1],10),d=ga(d,I)||ga(0==q[2].length,
0==E[2].length)||ga(q[2],E[2])}while(0==d)}b=d;b=Ga[a]=0<=b}return b},Ia=function(){var a=9;return Ha>=a},Ja,Ka=l.document,La=Da(),Ha=Ja=Ka&&A?La||("CSS1Compat"==Ka.compatMode?parseInt(Fa,10):5):void 0;!B&&!A||A&&Ia()||B&&D("1.9.1");A&&D("9");var F=function(a){return a?a.parentWindow||a.defaultView:window};var Ma=function(){var a=F().top;try{return!!a.location.href||""===a.location.href}catch(b){return!1}};var Oa=[],Pa=!1,Qa=function(a){if(Pa)for(var b=0;b<Oa.length;b++)a(u(Oa[b].Ta,Oa[b]))};var Ra=function(a){Ra[" "](a);return a};Ra[" "]=aa;var Sa=!A||Ia(),Ta=A&&!D("9");!C||D("528");B&&D("1.9b")||A&&D("8")||Aa&&D("9.5")||C&&D("528");B&&!D("8")||A&&D("9");var Ua=function(){this.ga=this.ga;this.Aa=this.Aa};Ua.prototype.ga=!1;var G=function(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.A=!1;this.ma=!0};G.prototype.preventDefault=function(){this.defaultPrevented=!0;this.ma=!1};var H=function(a,b){G.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.$=this.state=null;if(a){var c=a,d=b,e=this.type=c.type,f=c.changedTouches?c.changedTouches[0]:null;this.target=c.target||c.srcElement;this.currentTarget=d;if(d=c.relatedTarget){if(B){var g;a:{var h="nodeName";try{Ra(d[h]);
g=!0;break a}catch(k){}g=!1}g||(d=null)}}else"mouseover"==e?d=c.fromElement:"mouseout"==e&&(d=c.toElement);this.relatedTarget=d;null===f?(this.offsetX=C||void 0!==c.offsetX?c.offsetX:c.layerX,this.offsetY=C||void 0!==c.offsetY?c.offsetY:c.layerY,this.clientX=void 0!==c.clientX?c.clientX:c.pageX,this.clientY=void 0!==c.clientY?c.clientY:c.pageY,this.screenX=c.screenX||0,this.screenY=c.screenY||0):(this.clientX=void 0!==f.clientX?f.clientX:f.pageX,this.clientY=void 0!==f.clientY?f.clientY:f.pageY,this.screenX=
f.screenX||0,this.screenY=f.screenY||0);this.button=c.button;this.keyCode=c.keyCode||0;this.charCode=c.charCode||("keypress"==e?c.keyCode:0);this.ctrlKey=c.ctrlKey;this.altKey=c.altKey;this.shiftKey=c.shiftKey;this.metaKey=c.metaKey;this.state=c.state;this.$=c;c.defaultPrevented&&this.preventDefault()}};ea(H,G);
H.prototype.preventDefault=function(){H.Ha.preventDefault.call(this);var a=this.$;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Ta)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var J="closure_listenable_"+(1E6*Math.random()|0),Va=0;var Wa=function(a,b,c,d,e){var f=null;this.listener=a;this.O=f;this.src=b;this.type=c;this.G=!!d;this.I=e;this.key=++Va;this.B=this.F=!1},Xa=function(a){a.B=!0;a.listener=null;a.O=null;a.src=null;a.I=null};var K=function(a){this.src=a;this.f={};this.V=0};K.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.f[f];a||(a=this.f[f]=[],this.V++);var g=Ya(a,b,d,e);-1<g?(b=a[g],c||(b.F=!1)):(b=new Wa(b,this.src,f,!!d,e),b.F=c,a.push(b));return b};K.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.f))return!1;var e=this.f[a];b=Ya(e,b,c,d);return-1<b?(c=e[b],Xa(c),c=e,x.splice.call(c,b,1),0==e.length&&(delete this.f[a],this.V--),!0):!1};
var Za=function(a,b){var c=b.type;if(c in a.f){var d,e=a.f[c],f=ha(e,b);(d=0<=f)&&x.splice.call(e,f,1);d&&(Xa(b),0==a.f[c].length&&(delete a.f[c],a.V--))}};K.prototype.ba=function(a,b,c,d){a=this.f[a.toString()];var e=-1;a&&(e=Ya(a,b,c,d));return-1<e?a[e]:null};var Ya=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.B&&f.listener==b&&f.G==!!c&&f.I==d)return e}return-1};var $a="closure_lm_"+(1E6*Math.random()|0),ab={},bb=0,L=function(a,b,c,d,e){if(p(b))for(var f=0;f<b.length;f++)L(a,b[f],c,d,e);else c=cb(c),a&&a[J]?a.l.add(String(b),c,!1,d,e):db(a,b,c,!1,d,e)},db=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=!!e,h=eb(a);h||(a[$a]=h=new K(a));c=h.add(b,c,d,e,f);if(!c.O){d=fb();c.O=d;d.src=a;d.listener=c;if(a.addEventListener)a.addEventListener(b.toString(),d,g);else if(a.attachEvent)a.attachEvent(gb(b.toString()),d);else throw Error("addEventListener and attachEvent are unavailable.");
bb++}},fb=function(){var a=hb,b=Sa?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},ib=function(a,b,c,d,e){if(p(b))for(var f=0;f<b.length;f++)ib(a,b[f],c,d,e);else c=cb(c),a&&a[J]?a.l.add(String(b),c,!0,d,e):db(a,b,c,!0,d,e)},jb=function(a,b,c,d,e){if(p(b))for(var f=0;f<b.length;f++)jb(a,b[f],c,d,e);else c=cb(c),a&&a[J]?a.l.remove(String(b),c,d,e):a&&(d=!!d,(a=eb(a))&&(b=a.ba(b,c,d,e))&&kb(b))},kb=function(a){if("number"!=typeof a&&
a&&!a.B){var b=a.src;if(b&&b[J])Za(b.l,a);else{var c=a.type,d=a.O;b.removeEventListener?b.removeEventListener(c,d,a.G):b.detachEvent&&b.detachEvent(gb(c),d);bb--;(c=eb(b))?(Za(c,a),0==c.V&&(c.src=null,b[$a]=null)):Xa(a)}}},gb=function(a){return a in ab?ab[a]:ab[a]="on"+a},mb=function(a,b,c,d){var e=!0;if(a=eb(a))if(b=a.f[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.G==c&&!f.B&&(f=lb(f,d),e=e&&!1!==f)}return e},lb=function(a,b){var c=a.listener,d=a.I||a.src;a.F&&kb(a);return c.call(d,
b)},hb=function(a,b){if(a.B)return!0;if(!Sa){var c;if(!(c=b))a:{var d;c="window.event";c=c.split(".");d=d||l;for(var e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break a}c=d}e=c;d=new H(e,this);c=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){a:{var f=!1;if(0==e.keyCode)try{e.keyCode=-1;break a}catch(k){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=d.currentTarget;f;f=f.parentNode)e.push(f);for(var f=a.type,g=e.length-1;!d.A&&0<=g;g--){d.currentTarget=e[g];var h=mb(e[g],f,!0,d);c=
c&&h}for(g=0;!d.A&&g<e.length;g++)d.currentTarget=e[g],h=mb(e[g],f,!1,d),c=c&&h}return c}return lb(a,new H(b,this))},eb=function(a){a=a[$a];return a instanceof K?a:null},nb="__closure_events_fn_"+(1E9*Math.random()>>>0),cb=function(a){if(t(a))return a;a[nb]||(a[nb]=function(b){return a.handleEvent(b)});return a[nb]};Qa(function(a){hb=a(hb)});var M=function(a){this.w=ra.apply(null,arguments);return this};M.prototype.remove=function(a){var b=this.w;a in b&&delete b[a]};M.prototype.set=function(a,b){this.w[a]=b};M.prototype.get=function(a){return oa(this.w,a,null)};M.prototype.extend=function(a){qa(this.w,a)};M.prototype.h=function(){var a=[],b;for(b in this.w)a.push(b+this.w[b]);return a.join("_")};var N=function(){return Math.round(v()/1E3)},ob=function(a){return window.performance&&window.performance.timing&&window.performance.timing.domLoading&&0<window.performance.timing[a]?(a=v()-window.performance.timing[a],Math.round(a/1E3)):null},pb=function(){this.domLoading=ob("domLoading");this.domComplete=ob("domComplete");this.unloadEventStart=ob("unloadEventStart")};
pb.prototype.toString=function(){function a(a){a=oa(c,a);null!=a?b.push(""+a):b.push("u")}var b=[],c=this;a("domLoading");a("domComplete");a("unloadEventStart");return b.join(".")};var qb=function(){return new pb};window.console&&"function"===typeof window.console.log&&u(window.console.log,window.console);var rb=function(a){if(/^\s*$/.test(a))return!1;var b=/\\["\\\/bfnrtu]/g,c=/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,d=/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,e=/^[\],:{}\s\u2028\u2029]*$/;return e.test(a.replace(b,"@").replace(c,"]").replace(d,""))},sb=function(a){a=String(a);if(rb(a))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);},tb=function(a){this.P=a};tb.prototype.h=function(a){var b=[];ub(this,a,b);return b.join("")};
var ub=function(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(p(b)){var d=a;a=b;b=a.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),e=a[f],ub(d,d.P?d.P.call(a,String(f),e):e,c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");f="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(e=b[d],"function"!=typeof e&&(c.push(f),vb(d,c),c.push(":"),ub(a,a.P?a.P.call(b,d,e):e,c),f=","));c.push("}");return}}switch(typeof b){case "string":vb(b,
c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}},wb={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},xb=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,vb=function(a,b){b.push('"',a.replace(xb,function(a){var b=wb[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),
wb[a]=b);return b}),'"')};var yb=function(){var a;if(!a)return this;var b=a.Na(),c=a.Oa(),d=a.Ma(),e=a.ia();a=a.ca();b&&(this.er=b.h());c&&(this.vi=c.h());null!=d&&(this.buckets=d);null!=e&&(this.tt=e);null!=a&&(this.pd=a);return this};var zb=null,Ab=function(){var a="google_video_inner_static_iframe",b=document;if(b.body){var c;try{c=b.createElement('<iframe name="'+a+'" id="'+a+'" src="about:blank" style="height: 0px; width: 0px; display:none">'),b.body.appendChild(c)}catch(d){c=b.createElement("iframe"),c.setAttribute("name",a),c.setAttribute("id",a),c.setAttribute("src","about:blank"),c.setAttribute("style","height: 0px; width: 0px; display:none"),b.body.appendChild(c)}}else b.write("<iframe frameBorder='0' src='about:blank' id='"+
a+"' name='"+a+"' style='height:0px;width:0px;display:none'></iframe>")},Bb=function(a){a=a.$;if(F().top==a.source){var b;a:{a=a.data;var c="data";try{if(0==a.lastIndexOf(c,0)){var d=a.substring(c.length),e=new yb;0<d.length&&qa(e,sb(d));b=e;break a}}catch(f){}b=null}null!=b&&(zb=b)}},Cb=function(){if(!Ma()){var a=F().frames;(a=a.length&&a.google_video_inner_static_iframe)||Ab();L(F(),"message",Bb);w("ima.video.client.getLastSnapshotFromTop",function(){return zb});F().top.postMessage&&F().top.postMessage("get",
"*")}};var O=function(a,b){this.kv={};this.update(a,b);return this},Db={m:!0,c:!0,s:!0,t:!0},Eb=function(a,b){var c;c=Db;c=a in c;var d="m"==a,e=d&&100<=b;return c&&(e||!d)&&0<b};O.prototype.update=function(a,b){if(a){var c=b?b:1,d=oa(this.kv,a,0);this.kv[a]=d+c}};O.prototype.extend=function(a){var b=this;a&&ma(a.kv,function(a,d){b.kv[d]=oa(b.kv,d,0)+a})};O.prototype.h=function(a){var b="";ma(this.kv,function(a,d){b+=Eb(d,a)?d+a:""});return b?a+b:b};
var Fb=function(a){return na(a.kv,function(a,c){return Eb(c,a)})};var Gb=function(a,b){this.Y=a;this.D=N();this.ya=b;this.a=[]};Gb.prototype.length=function(){return this.a.length};var Hb=function(a,b){var c=Math.floor((b-a.D)/a.Y);return Math.max(0,c)};Gb.prototype.add=function(a,b){var c=N(),d=c,e=Hb(this,d),e=e+1-this.ya;0==this.a.length?this.D=d:e>=this.a.length?(this.D=d,this.a=[]):0<e&&(this.a=la(this.a,e),this.D+=e*this.Y);c=Hb(this,c);d=a;e=b;this.a[c]?this.a[c].update(d,e):this.a[c]=new O(d,e)};var P=function(){Ua.call(this);this.l=new K(this);this.oa=this;this.la=null};ea(P,Ua);var Ib=P;Ib.prototype[J]=!0;P.prototype.addEventListener=function(a,b,c,d){L(this,a,b,c,d)};P.prototype.removeEventListener=function(a,b,c,d){jb(this,a,b,c,d)};
P.prototype.dispatchEvent=function(a){var b,c=this.la;if(c){b=[];for(var d=1;c;c=c.la)b.push(c),++d}c=this.oa;d=a.type||a;if(r(a))a=new G(a,c);else if(a instanceof G)a.target=a.target||c;else{var e=a;a=new G(d,c);qa(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.A&&0<=g;g--)f=a.currentTarget=b[g],e=Jb(f,d,!0,a)&&e;a.A||(f=a.currentTarget=c,e=Jb(f,d,!0,a)&&e,a.A||(e=Jb(f,d,!1,a)&&e));if(b)for(g=0;!a.A&&g<b.length;g++)f=a.currentTarget=b[g],e=Jb(f,d,!1,a)&&e;return c=e};
var Jb=function(a,b,c,d){b=a.l.f[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.B&&g.G==c){var h=g.listener,k=g.I||g.src;g.F&&Za(a.l,g);e=!1!==h.call(k,d)&&e}}return e&&0!=d.ma};P.prototype.ba=function(a,b,c,d){return this.l.ba(String(a),b,c,d)};var Kb=function(a,b,c){this.xa=c;this.sa=a;this.Ga=b;this.M=0;this.J=null};Kb.prototype.get=function(){var a;0<this.M?(this.M--,a=this.J,this.J=a.next,a.next=null):a=this.sa();return a};Kb.prototype.put=function(a){this.Ga(a);this.M<this.xa&&(this.M++,a.next=this.J,this.J=a)};var Lb=function(a){return a};var Mb=function(a){l.setTimeout(function(){throw a;},0)},Nb,Ob=function(){var a=l.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!z("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,
a=u(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!za()){var b=new a,c={},d=c;b.port1.onmessage=function(){if(n(c.next)){c=c.next;var a=c.fa;c.fa=null;a()}};return function(a){d.next={fa:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");
b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){l.setTimeout(a,0)}},Pb=Lb;Qa(function(a){Pb=a});var Qb=function(){this.W=this.C=null},Sb=new Kb(function(){return new Rb},function(a){a.reset()},100);Qb.prototype.add=function(a,b){var c=Sb.get();c.set(a,b);this.W?this.W.next=c:this.C=c;this.W=c};Qb.prototype.remove=function(){var a=null;this.C&&(a=this.C,this.C=this.C.next,this.C||(this.W=null),a.next=null);return a};var Rb=function(){this.next=this.scope=this.aa=null};Rb.prototype.set=function(a,b){this.aa=a;this.scope=b;this.next=null};
Rb.prototype.reset=function(){this.next=this.scope=this.aa=null};var Xb=function(a,b){Tb||Ub();Vb||(Tb(),Vb=!0);Wb.add(a,b)},Tb,Ub=function(){if(l.Promise&&l.Promise.resolve){var a=l.Promise.resolve(void 0);Tb=function(){a.then(Yb)}}else Tb=function(){var a,c,d=Yb,e=d;a&&(e=u(d,a));e=Pb(e);!t(l.setImmediate)||!c&&l.Window&&l.Window.prototype&&l.Window.prototype.setImmediate==l.setImmediate?(Nb||(Nb=Ob()),Nb(e)):l.setImmediate(e)}},Vb=!1,Wb=new Qb,Yb=function(){for(var a=null;a=Wb.remove();){try{a.aa.call(a.scope)}catch(b){Mb(b)}Sb.put(a)}Vb=!1};var Zb=function(){this.next=this.context=this.ka=this.ja=this.ra=null;this.pa=!1};Zb.prototype.reset=function(){this.context=this.ka=this.ja=this.ra=null;this.pa=!1};
var $b=new Kb(function(){return new Zb},function(a){a.reset()},100),ac=function(a,b,c){var d=$b.get();d.ja=a;d.ka=b;d.context=c;return d},cc=function(a,b){a.qa||2!=a.R&&3!=a.R||bc(a);var c=a,d=b;c.ea?c.ea.next=d:c.qa=d;c.ea=d},fc=function(a,b,c){if(0==a.R){a==c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.R=1;var d;a:{var e=c,f=a.Ra,g=a.Sa,h=a,k;if(e)try{k=!!e.$goog_Thenable}catch(q){k=!1}else k=!1;if(k)e.then(f,g,h),d=!0;else{k=typeof e;if(k="object"==k&&null!=e||"function"==k)try{var m=
e.then;if(t(m)){dc(e,m,f,g,h);d=!0;break a}}catch(q){g.call(h,q);d=!0;break a}d=!1}}d||(a.Qa=c,a.R=b,a.Pa=null,bc(a),3!=b||ec(a,c))}},dc=function(a,b,c,d,e){var f=!1,g=function(a){f||(f=!0,c.call(e,a))},h=function(a){f||(f=!0,d.call(e,a))};try{b.call(a,g,h)}catch(k){h(k)}},bc=function(a){a.ta||(a.ta=!0,Xb(a.La,a))},ec=function(a,b){a.wa=!0;Xb(function(){a.wa&&gc.call(null,b)})},gc=Mb;var Q=function(a,b){P.call(this);this.K=a||1;this.T=b||l;this.X=u(this.Ia,this);this.da=v()};ea(Q,P);Q.prototype.enabled=!1;Q.prototype.o=null;Q.prototype.Ia=function(){if(this.enabled){var a=v()-this.da;0<a&&a<.8*this.K?this.o=this.T.setTimeout(this.X,this.K-a):(this.o&&(this.T.clearTimeout(this.o),this.o=null),this.dispatchEvent("tick"),this.enabled&&(this.o=this.T.setTimeout(this.X,this.K),this.da=v()))}};
Q.prototype.start=function(){this.enabled=!0;this.o||(this.o=this.T.setTimeout(this.X,this.K),this.da=v())};var R=function(a,b,c){this.j=c;this.L=null;this.H=0;this.za=500;this.S=null;hc(this,a,b);c=document.documentElement;var d;try{if(Ma()){var e;b=[];var f=F(c.ownerDocument);for(c=f;c!=f.top;c=c.parent)if(c.frameElement)b.push(c.frameElement);else break;d=(e=b)&&0!=e.length?"1":"0"}else d="2"}catch(h){d="2"}try{if("1"==d){for(var g=a.parent;g!=a.top;g=g.parent)hc(this,g,g.document);hc(this,a.top,a.top.document)}}catch(h){}},hc=function(a,b,c){L(c,"mousedown",u(a.Ba,a));L(b,"scroll",u(a.Ea,a));L(c,"touchstart",
u(a.Fa,a));L(c,"mousemove",u(a.Da,a))};R.prototype.Fa=function(){this.j&&this.j("t")};R.prototype.Ba=function(){this.j&&this.j("c")};R.prototype.Ea=function(){this.j&&this.j("s")};
R.prototype.Da=function(a){a=new sa(a.clientX,a.clientY);if(this.L){var b,c=this.L;b=c.x-a.x;c=c.y-a.y;b=Math.sqrt(b*b+c*c);this.H+=Math.round(b)}this.L=a;this.S&&l.clearTimeout(this.S);a=this.Ca;b=this.za;if(t(a))this&&(a=u(a,this));else if(a&&"function"==typeof a.handleEvent)a=u(a.handleEvent,a);else throw Error("Invalid listener argument");this.S=a=2147483647<b?-1:l.setTimeout(a,b||0)};R.prototype.Ca=function(){this.j&&this.j("m",this.H);this.L=this.S=null;this.H=0};var ic=0,S=null,jc=function(){ic=N();S=new Gb(10,12);new R(F(),document,u(S.add,S))},kc=function(a,b){a&&(N=a);b&&(qb=b)};var T=function(a){var b;S||jc();b=S;this.i=new M("tt",N()-ic,"pd",a,"bs",b.Y);a=b;a.add();b=[];for(var c=0;c<a.a.length;c++){var d;6>=a.a.length?d=c:(d=a.a.length-6,d=c<=d?0:c-d);b[d]||(b[d]=new O);a.a[c]&&b[d].extend(a.a[c])}a=b;this.a=a.reverse();a:{for(a=0;a<this.a.length;a++)if(this.a[a]&&Fb(this.a[a]))break a;a=null}null!=a&&this.i.set("es",a);return this};T.prototype.ia=function(){return this.i.get("tt")};T.prototype.ca=function(){return this.i.get("pd")};T.prototype.va=function(){return this.a};
var lc=function(a,b){var c=a;ia(b,function(a,b){if(b>=c.a.length||!c.a[b])c.a[b]=new O;c.a[b].extend(a)})};T.prototype.ua=function(a,b,c){lc(this,a);null!=b&&this.i.set("tt",Math.max(this.i.get("tt"),b));null!=c&&this.i.set("pd",Math.max(this.i.get("pd"),c))};T.prototype.h=function(){var a=[],b;b=[];for(var c=0;c<this.a.length;c++)if(this.a[c]){var d=this.a[c].h("ed"+c);d&&b.push(d)}(b=b.join("_"))&&a.push(b);(b=this.i.h())&&a.push(b);return a.join("_")};T.prototype.getTimeSinceTagLoadSeconds=T.prototype.ia;
T.prototype.getPlaylistTimeDiff=T.prototype.ca;T.prototype.getPlaylistTimeDiff=T.prototype.ca;T.prototype.getBuckets=T.prototype.va;T.prototype.extendWithDataFromTopIframe=T.prototype.ua;T.prototype.serialize=T.prototype.h;var U=null,mc=null,nc=null,oc=null,pc=B||C||Aa||"function"==typeof l.atob,rc=function(a,b){var c=a;ba(c);qc();for(var c=b?nc:U,d=[],e=0;e<a.length;e+=3){var f=a[e],g=e+1<a.length,h=g?a[e+1]:0,k=e+2<a.length,m=k?a[e+2]:0,q=f>>2,f=(f&3)<<4|h>>4,h=(h&15)<<2|m>>6,m=m&63;k||(m=64,g||(h=64));d.push(c[q],c[f],c[h],c[m])}return d.join("")},qc=function(){if(!U){U={};mc={};nc={};oc={};for(var a=0;65>a;a++)U[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),mc[U[a]]=a,nc[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),
oc[nc[a]]=a,62<=a&&(mc["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)]=a,oc["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};var sc=function(){this.g=-1};var V=function(){this.g=-1;this.g=64;this.b=[];this.Z=[];this.na=[];this.N=[];this.N[0]=128;for(var a=1;a<this.g;++a)this.N[a]=0;this.U=this.v=0;this.reset()};ea(V,sc);V.prototype.reset=function(){this.b[0]=1732584193;this.b[1]=4023233417;this.b[2]=2562383102;this.b[3]=271733878;this.b[4]=3285377520;this.U=this.v=0};
var tc=function(a,b,c){c||(c=0);var d=a.na;if(r(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.b[0];c=a.b[1];for(var g=a.b[2],h=a.b[3],k=a.b[4],m,e=0;80>e;e++)40>e?20>e?(f=h^c&(g^h),m=1518500249):(f=c^g^h,m=1859775393):60>e?(f=c&g|h&(c|g),m=2400959708):(f=c^g^h,m=3395469782),
f=(b<<5|b>>>27)+f+k+m+d[e]&4294967295,k=h,h=g,g=(c<<30|c>>>2)&4294967295,c=b,b=f;a.b[0]=a.b[0]+b&4294967295;a.b[1]=a.b[1]+c&4294967295;a.b[2]=a.b[2]+g&4294967295;a.b[3]=a.b[3]+h&4294967295;a.b[4]=a.b[4]+k&4294967295};
V.prototype.update=function(a,b){if(null!=a){n(b)||(b=a.length);for(var c=b-this.g,d=0,e=this.Z,f=this.v;d<b;){if(0==f)for(;d<=c;)tc(this,a,d),d+=this.g;if(r(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.g){tc(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.g){tc(this,e);f=0;break}}this.v=f;this.U+=b}};
V.prototype.digest=function(){var a=[],b=8*this.U;56>this.v?this.update(this.N,56-this.v):this.update(this.N,this.g-(this.v-56));for(var c=this.g-1;56<=c;c--)this.Z[c]=b&255,b/=256;tc(this,this.Z);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.b[c]>>d&255,++b;return a};var W=function(a){this.ha=a},uc=/\s*;\s*/;W.prototype.isEnabled=function(){return navigator.cookieEnabled};W.prototype.set=function(a,b,c,d,e,f){if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');n(c)||(c=-1);e=e?";domain="+e:"";d=d?";path="+d:"";f=f?";secure":"";0>c?c="":(c=0==c?new Date(1970,1,1):new Date(v()+1E3*c),c=";expires="+c.toUTCString());this.ha.cookie=a+"="+b+e+d+c+f};
W.prototype.get=function(a,b){for(var c=a+"=",d=(this.ha.cookie||"").split(uc),e=0,f;f=d[e];e++){if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};W.prototype.remove=function(a,b,c){var d=n(this.get(a));this.set(a,"",0,b,c);return d};var X=new W(document);X.Ja=3950;var vc=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;var Z=null,wc=null,xc=function(a,b,c,d,e){this.u=c;this.t=a;this.ed=b;this.nv=d;this.pl=e},yc=function(a){a=a.split("#")[0];var b=new V;b.update(a);a=b.digest();return rc(a).slice(0,4)},Cc=function(){var a=zc(),b=0,c;var d=zc();if(d&&d.t){c=qb().unloadEventStart;var e=N(),d=d.t;c=c&&d>=e-c?!0:8>=wc-d}else c=!1;a:{e=yc(document.URL);if(Z)for(d=0;d<Z.length;d++)if(Z[d].u==e){e=!0;break a}e=!1}d=zc();d=!!d&&0<d.nv;(c=c&&!e&&!d)&&a&&a.pl&&(b=a.pl);return N()-ic+b},Dc=function(){var a=null;if(X.isEnabled()&&
n(X.get("GED_PLAYLIST_ACTIVITY"))){var b=X.get("GED_PLAYLIST_ACTIVITY");if(b)try{var c=b,d=!0,e;if(pc&&!d)e=l.atob(c);else{var f;qc();for(var d=d?oc:mc,g=[],h=0;h<c.length;){var k=d[c.charAt(h++)],m=h<c.length,q=m?d[c.charAt(h)]:0;++h;var E=h<c.length,I=E?d[c.charAt(h)]:64;++h;var Ac=h<c.length,Na=Ac?d[c.charAt(h)]:64;++h;if(null==k||null==q||null==I||null==Na)throw Error();var Y=k<<2|q>>4;g.push(Y);64!=I&&(Y=q<<4&240|I>>2,g.push(Y),64!=Na&&(Y=I<<6&192|Na,g.push(Y)))}f=g;if(8192>=f.length)e=String.fromCharCode.apply(null,
f);else{k="";for(m=0;m<f.length;m+=8192)var Bc=la(f,m,m+8192),k=k+String.fromCharCode.apply(null,Bc);e=k}}b=e;a=sb(b)}catch(Gc){}}return a},zc=function(){if(Z)for(var a=yc(document.referrer),b=0;b<Z.length;b++)if(Z[b].u==a)return Z[b];return null},Ec=function(){if(X.isEnabled()){var a=Cc(),b=new T(a),c;a:{c=Math.min(b.a.length,2);for(var d=0;d<c;d++){var e;if(e=b.a[d])e="c",e=e in b.a[d].kv;if(e){c=!0;break a}}c=!1}d=N();e=yc(document.URL);a=new xc(d,b,e,c?1:0,a);b=Dc();c=[];if(b){b=ka(b);c=document.URL;
c=yc(c);d=N();for(e=0;e<b.length;e++)if(b[e].u==c||1200<=d-b[e].t)b.splice(e,1),e--;c=b}a&&c.unshift(a);c=c.slice(0,3);var f,a=f=(new tb(f)).h(c);f=!0;if(pc&&!f)f=l.btoa(a);else{b=[];for(d=c=0;d<a.length;d++){for(e=a.charCodeAt(d);255<e;)b[c++]=e&255,e>>=8;b[c++]=e}a=b;f=rc(a,f)}a=document.URL;b=1;a=a.match(vc)[b]||null;a="http"==a;X.set("GED_PLAYLIST_ACTIVITY",f,-1,"/",null,!a)}};var Fc=function(){function a(){try{Ec()}catch(a){}}if(!(window.ima&&window.ima.video&&window.ima.video.client&&window.ima.video.client.tagged)){jc();ib(F(),"unload",a);try{wc||(wc=N(),Z=Dc())}catch(c){}var b=new Q(1E3);b.start();L(b,"tick",function(){try{Ec()}catch(a){}});w("ima.video.client.getEData",function(){return new T(Cc())});w("ima.video.client.setupEDHooks",jc);w("ima.video.client.resetEDForTesting",kc);w("ima.video.client.tagged",!0)}};w("ima.video.client.jsTag",!0);Cb();Fc();})()