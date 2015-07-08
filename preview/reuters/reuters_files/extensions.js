Array.prototype.contains=function(b){for(var c=this.length;c--;)if(this[c]==b)return true;return false};Array.prototype.pushUnique=function(b){this.contains(b)||this.push(b)};Array.prototype.pushUniqueMax=function(b,c){this.contains(b)||(this.length>=c&&this.pop(),this.unshift(b))};String.prototype.endsWith=function(b){var c=this.length-b.length;return c>=0&&this.lastIndexOf(b)===c};String.prototype.startsWith=function(b){return this.indexOf(b)===0};
String.prototype.trim=function(){return this.replace(/^\s\s*/,"").replace(/\s\s*$/,"")};
var dateFormat=function(){var b=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,c=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,r=/[^-+\dA-Z]/g,e=function(a,b){a=String(a);for(b=b||2;a.length<b;)a="0"+a;return a};return function(a,f,j){var h=dateFormat;arguments.length==1&&Object.prototype.toString.call(a)=="[object String]"&&!/\d/.test(a)&&(f=a,a=void 0);a=a?new Date(a):new Date;if(isNaN(a))throw SyntaxError("invalid date");
f=String(h.masks[f]||f||h.masks["default"]);f.slice(0,4)=="UTC:"&&(f=f.slice(4),j=true);var d=j?"getUTC":"get",i=a[d+"Date"](),m=a[d+"Day"](),k=a[d+"Month"](),n=a[d+"FullYear"](),g=a[d+"Hours"](),o=a[d+"Minutes"](),p=a[d+"Seconds"](),d=a[d+"Milliseconds"](),l=j?0:a.getTimezoneOffset(),q={d:i,dd:e(i),ddd:h.i18n.dayNames[m],dddd:h.i18n.dayNames[m+7],m:k+1,mm:e(k+1),mmm:h.i18n.monthNames[k],mmmm:h.i18n.monthNames[k+12],yy:String(n).slice(2),yyyy:n,h:g%12||12,hh:e(g%12||12),H:g,HH:e(g),M:o,MM:e(o),s:p,
ss:e(p),l:e(d,3),L:e(d>99?Math.round(d/10):d),t:g<12?"a":"p",tt:g<12?"am":"pm",T:g<12?"A":"P",TT:g<12?"AM":"PM",Z:j?"UTC":(String(a).match(c)||[""]).pop().replace(r,""),o:(l>0?"-":"+")+e(Math.floor(Math.abs(l)/60)*100+Math.abs(l)%60,4),S:["th","st","nd","rd"][i%10>3?0:(i%100-i%10!=10)*i%10]};return f.replace(b,function(a){return a in q?q[a]:a.slice(1,a.length-1)})}}();
dateFormat.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",longTimeTwo:"h:MMtt Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};dateFormat.i18n={dayNames:"Sun,Mon,Tue,Wed,Thu,Fri,Sat,Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),monthNames:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec,January,February,March,April,May,June,July,August,September,October,November,December".split(",")};
Date.prototype.format=function(b,c){return dateFormat(this,b,c)};Function.prototype.bind=function(b){var c=this;return function(){return c.apply(b,arguments)}};
