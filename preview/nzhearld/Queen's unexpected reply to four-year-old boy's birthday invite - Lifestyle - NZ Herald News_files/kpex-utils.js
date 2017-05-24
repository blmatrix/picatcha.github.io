/* KPEX Smart Tag Utilities for KPEX 
 Copyright 2017 the Rubicon Project, Inc. */
var ktag=function(){var a=this,b=function(a){return a+Math.floor(1e6*Math.random())},c=function(){return window!=top},d=function(){var a=!1;try{window.top.location.href}catch(b){a=!0}return a},e=function(){return window.frameElement?{x:window.top.innerWidth,y:window.top.pageYOffset||window.top.document.body.scrollTop||window.top.document.documentElement.scrollTop,w:window.top.innerWidth||window.top.documentElement.clientWidth||window.top.getElementsByTagName("body")[0].clientWidth,h:window.top.innerHeight||window.top.documentElement.clientHeight||window.top.getElementsByTagName("body")[0].clientHeight}:{x:window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft,y:window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop,w:window.innerWidth||document.documentElement.clientWidth||document.getElementsByTagName("body")[0].clientWidth,h:window.innerHeight||document.documentElement.clientHeight||document.getElementsByTagName("body")[0].clientHeight}},f=function(a){var b=0,c=0;if(a.offsetParent)do b+=a.offsetLeft,c+=a.offsetTop;while(a=a.offsetParent);return{x:b,y:c}},g=function(){var a=null;try{if(d());else{var g,h=window,i=e(),j=90;if(c()){for(;window.top!==h.parent;){h=h.parent;try{h.location.href}catch(k){return a}}g=f(h.frameElement),j=h.frameElement.clientHeight/2}else{for(var l=document.documentElement;l.childNodes.length&&1==l.lastChild.nodeType;)l=l.lastChild;var m=document.createElement("div"),n=b("rubicon_chk_position_");m.setAttribute("id",n),m.style.width="0px",m.style.height="0px",l.parentNode.appendChild(m),g=f(m),l.parentNode.removeChild(m),j/=2}a=i.y+i.h<j+g.y||i.y>j+g.y?"btf":"atf"}}catch(o){}return a},h=function(a){var b=this;"function"==typeof a&&(window.func=function(a){b.func(a)})},i=function(a,b,c,d,e,f){if(a){var g=e>d?!0:!1,h=(new Date).getTime(),i=setInterval(function(){var j=Math.min(1,((new Date).getTime()-h)/f);g?(a.style?a[b]=d+j*(e-d):a.setAttribute(b,d+j*(e-d)),a.style[b]&&(a.style[b]=d+j*(e-d)+c)):(a.style?a[s]=d-j*(d-e):a.setAttribute(b,d-j*(d-e)),a.style[b]&&(a.style[b]=d-j*(d-e)+c)),1===j&&clearInterval(i)},25);a.style?a[b]=d:a.setAttribute(b,d),a.style[b]?a.style[b]=d+c:a.style[b]=d+c}};a.resizeAdSlot=function(a,b){var c,d,e,f;d=a.substring(0,a.indexOf("x")),f=a.substring(a.indexOf("x")+1,a.length),c=window.frameElement,e=c.getBoundingClientRect().height?c.getBoundingClientRect().height:c.offsetHeight,c.width?c.width=parseInt(d):c.setAttribute("width",parseInt(d)),c.style.width&&(c.style.width=parseInt(d)+"px"),b===!0?i(c,"height","px",e,f,500):(c.height?c.height=parseInt(f):c.setAttribute("height",parseInt(f)),c.style.height&&(c.style.height=parseInt(f)+"px"))},a.setSite=function(a){var b,c;return("undefined"==typeof a||""===a||a.indexOf("http")<0)&&(a=d()?window.document.referrer:window.top.document.location.href),c=window.document.createElement("a"),c.href=a,b=c.hostname},a.setSection=function(a){var b,c,e="",f="unknown",g=[],h=[];return("undefined"==typeof a||""===a||a.indexOf("http")<0)&&(a=d()?window.document.referrer:window.top.document.location.href),g=["news","/news","/news/","/breaking-news/","/rural-news/","/national","/national/","world","/world","/world/","post","press","times","express","standard","mail","herald","/auckland","/science","/science/","/environment","/environment/","/oddstuff","/sport","/sport/","/entertainment","/entertainment/","/lifestyle","/lifestyle/","/life-style","/life-style/","/life","/life/","motoring","/motoring","/motoring/","/technology","/technology/","travel","/travel","/travel/","/business","/business/"],h=["news","news","news","news","news","news","news","news","news","news","news","news","news","news","news","news","news","news","news","news","news","news","news","sport","sport","entertainment","entertainment","lifestyle","lifestyle","lifestyle","lifestyle","lifestyle","lifestyle","motoring","motoring","motoring","technology","technology","travel","travel","travel","business","business"],c=window.document.createElement("a"),c.href=a.toLowerCase(),b=c.hostname,e=c.pathname,e="/"===e.charAt(0)?e:"/"+e,""===e||"/"===e||b.indexOf("four.co.nz")>-1&&"/tv/home.aspx"===e?f="homepage":g.forEach(function(a,b,c){e.indexOf(a)>-1&&(f=h[b])}),(b.indexOf("grabone")>-1||"www.bite.co.nz"===b||"truecommercial.nzherald.co.nz"===b||"www.farmingshow.co.nz"===b&&"news"!==f||"www.viva.co.nz"===b)&&"homepage"!==f&&(f="lifestyle"),("www.driven.co.nz"===b||"drivesouth.co.nz"===b)&&(f="motoring"),("www.watchme.co.nz"===b||"www.iheart.com"===b||"www.zmonline.com"===b||"events.stuff.co.nz"===b||"www.tv3.co.nz"===b||"www.four.co.nz"===b||"www.theedge.co.nz"===b||"www.therock.net.nz"===b||"www.georgefm.co.nz"===b||"www.maifm.co.nz"===b||"www.morefm.co.nz"===b||"www.thebreeze.co.nz"===b||"www.thesound.co.nz"===b||"www.magic.co.nz"===b||"www.scout.co.nz"===b||"www.thehits.co.nz"===b&&"news"!==f&&"lifestyle"!==f||"www.hauraki.co.nz"===b&&"news"!==f&&"sport"!==f||"www.flava.co.nz"===b&&"news"!==f||"www.mixonline.co.nz"===b&&"news"!==f||"www.thecoast.net.nz"===b&&"lifestyle"!==f&&"travel"!==f&&"technology"!==f&&"news"!==f&&"sport"!==f||"www.hokonui.co.nz"===b&&"news"!==f||"www.tvnz.co.nz"===b&&"news"!==f||"tvnz.co.nz"===b&&"news"!==f||"www.radiolive.co.nz"===b&&"news"!==f)&&"homepage"!==f&&(f="entertainment"),"www.radiosport.co.nz"!==b&&"dreamteam.nzherald.co.nz"!==b||"homepage"===f||(f="sport"),"www.3news.co.nz"===b&&"sport"!==f&&"business"!==f&&"homepage"!==f&&(f="news"),("sunlive.co.nz"===b||"www.sunlive.co.nz"===b||"m.sunlive.co.nz"===b||"newsie.co.nz"===b)&&(f="news"),("stoppress.co.nz"===b||"www.stoppress.co.nz"===b||"m.stoppress.co.nz"===b||"idealog.co.nz"===b||"www.idealog.co.nz"===b||"m.idealog.co.nz"===b||"theregister.co.nz"===b||"www.theregister.co.nz"===b||"m.theregister.co.nz"===b)&&(f="business"),("dish.co.nz"===b||"www.dish.co.nz"===b||"m.dish.co.nz"===b||"good.net.nz"===b||"www.good.net.nz"===b||"m.good.net.nz"===b||"newzealandweddings.co.nz"===b||"www.newzealandweddings.co.nz"===b||"m.newzealandweddings.co.nz"===b||"hgtv.co.nz"===b)&&(f="lifestyle"),("nzfishingworld.co.nz"===b||"www.nzfishingworld.co.nz"===b||"m.nzfishingworld.co.nz"===b)&&(f="sport"),("theweekendsun.co.nz"===b||"baydriver.co.nz"===b||"coastandcountrynews.co.nz"===b||"waterline.co.nz"===b||"odt.co.nz"===b||"odt.co.nz/"===b||"odt.co.nz/regions"===b)&&(f="news"),"odt.co.nz/sport"===b&&(f="sport"),("odt.co.nz/opinion"===b||"odt.co.nz/lifestyle"===b||"odt.co.nz/features"===b||"drivesouth.co.nz"===b||"trendsideas.com"===b||"trends.co.nz"===b)&&(f="lifestyle"),"odt.co.nz/business"===b&&(f="business"),("homes.co.nz"===b||"truecommercial.nzherald.co.nz"===b||"nzherald.co.nz/news/property"===b||"stuff.co.nz/life-style/home-property"===b||"odt.co.nz/business/property"===b||"trendsideas.com"===b||"trends.co.nz"===b||"theregister.co.nz/property"===b||"sunlive.co.nz/news/1_10_property.html"===b)&&(f="property"),f},a.setPath=function(a){var b,c,e,f="",g="",h=[],i=[];return("undefined"==typeof a||""===a||a.indexOf("http")<0)&&(a=d()?window.document.referrer:window.top.document.location.href,a.indexOf("http")<0)?"/":(c=window.document.createElement("a"),c.href=a.toLowerCase(),b=c.hostname,f=c.pathname,f="/"===f.charAt(0)?f:"/"+f,e=/[^\/]*$/,g=f.replace(e,""),e=/\/[0-9]+/gi,g=g.replace(e,""),(b.indexOf(".net.nz")>-1||b.indexOf(".co.nz")>-1)&&"/"!==g&&(h=g.split("/"),h.forEach(function(a,b,c){(""===a||void 0===a||a.length-a.replace(/-/g,"").length>3)&&i.push(b)}),i.forEach(function(a,b,c){h.splice(a-b,1)}),g="/",h.length>0&&h[0].length>0&&(g+=h[0]+"/"),h.length>1&&h[1].length>0&&(g+=h[1]+"/")),g)},a.setPath=a.setSection,a.setPosition=function(){return g()},a.runAdSlot=function(a,b,c){var d=b.split("x"),e=a+"-fif",f=document.createElement("iframe");return f.style.cssText="width: "+d[0]+"px; height: "+d[1]+"px; border: 0; margin: 0; padding: 0; overflow: hidden;",f.setAttribute("scrolling","no"),f.src="about:blank",f.id=e,document.getElementById(a).appendChild(f),fifContext=f.contentWindow?f.contentWindow.document:f.contentDocument.document,fifContext.open().write("<html>\n<head>\n<script type='text/javascript'>inDapIF=true;\n</script>\n</head>\n<body style='margin : 0; padding: 0;'>\n<!-- Rubicon Project Smart Tag -->\n<script type='text/javascript'>\nrp_account = '"+c.acct+"';\nrp_site = '"+c.site+"';\nrp_zonesize  = '"+c.zone+"-"+c.size+"';\nrp_adtype = 'jsonp';\nrp_kw = '"+c.kw+"';\nrp_visitor = "+c.visitor+";\nrp_inventory = "+c.inventory+";\nrp_callback = "+c.callback+";\n</script>\n<script type='text/javascript' src=\"http://ads.rubiconproject.com/ad/"+c.acct+'.js"></script>\n</body>\n</html>'),fifContext.close(),e},a.callBack=function(a){if("ok"===a.status)for(var b,c=0;c<a.ads.length;c++)b=a.ads[c],"ok"===b.status?("script"===b.type&&document.write("<script type='text/javascript'>"+b.script+"</script>"),"html"===b.type&&document.write(b.html),window.rpx_params.callback&&RubiconAdServing&&"object"==typeof RubiconAdServing.AdSizes&&h(window.rpx_params.callback(RubiconAdServing.AdSizes[b.size_id].dim))):window.rpx_params.callback&&RubiconAdServing&&"object"==typeof RubiconAdServing.AdSizes&&h(window.rpx_params.callback())},a.getAdDimensions=function(){return c?[window.innerWidth,window.innerHeight].join("x"):[window.top.innerWidth,window.top.innerHeight].join("x")},a.getDeviceType=function(){return navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)?"mobile":"desktop"},a.getSiteUrlSection=function(){return[a.setSite(),a.setSection()].join("/")},a.setAdDimensions=function(){return c?[window.innerWidth,window.innerHeight].join("x"):[window.top.innerWidth,window.top.innerHeight].join("x")},a.setDeviceType=function(){return navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)?"mobile":"desktop"},a.setSiteUrlSection=function(){return[a.setSite(),a.setSection()].join("/")}};ktag=new ktag;