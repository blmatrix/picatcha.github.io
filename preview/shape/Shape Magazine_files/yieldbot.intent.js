/*! Yieldbot Intent Tag | Copyright 2015 Yieldbot, Inc. */var ybotq=ybotq||[],yieldbot=yieldbot||{};!function(){yieldbot.cts_js=+new Date;for(var a,b,c,d,e,f,g=function(){return+new Date},h=function(){return g()-yieldbot.framework_window.yieldbot.cts_js},i=function(){return(0|36*Math.random()).toString(36)},j=function(){return(g().toString(36)+"xxxxxxxxxx".replace(/[x]/g,i)).toLowerCase()},k=Array.prototype.indexOf,l=(function(a,b){var c,d;if(null==a)return-1;if(k&&a.indexOf===k)return a.indexOf(b);for(c=0,d=a.length;d>c;c++)if(c in a&&a[c]===b)return c;return-1}),m=function(a,b){var c,d,e=[];for(c=0,d=a.length;d>c;c++)a[c]!==b&&e.push(a[c]);return e},n=function(a,b){null==b&&(b=J),a?pb("_debug",a,b):rb("_debug")},o=function(){var a=arguments,b=Array.prototype.slice.call(a);1===b.length&&b.push(h()),yieldbot.framework_window.yieldbot._history.push(b),ob("_debug")&&s(b)},p=function(a){o.apply(null,["ybotq.push."+yieldbot.framework_window.yieldbot._pushCount,h(),a]),yieldbot.framework_window.yieldbot._pushCount+=1},q=function(a,b){return function(){var c=Array.prototype.slice.call(arguments);return c.unshift(h()),c.unshift(a),o.apply(null,c),b.apply(null,arguments)}},r=function(){if(yieldbot.framework_window.console){yieldbot.framework_window.console.group&&yieldbot.framework_window.console.group("Yieldbot History");for(var a=0,b=yieldbot.framework_window.yieldbot._history.length;b>a;a++)s(yieldbot.framework_window.yieldbot._history[a]);yieldbot.framework_window.console.groupEnd&&yieldbot.framework_window.console.groupEnd()}},s=function(){yieldbot.framework_window.console&&yieldbot.framework_window.console.log&&yieldbot.framework_window.console.log.apply(yieldbot.framework_window.console,arguments)},t=/^\s\s*/,u=/\s\s*$/,v=function(a){return a.replace(t,"").replace(u,"")},w="v2015-01-23|ba6d6cd",x=window,y=window.top,z="ybot",A="document",B="contentWindow",C=escape,D=unescape,E="v1/init",F="ad/creative.js",G="ad/impression.gif",H=2592e6,I=2592e6,J=36e5,K=1e3,L=!1,M=!1,N=[],O=[],P={},Q={},R="i",S=!1,T=!1,U=null,V={},W=null,X=null,Y=function(a,b){return a.getElementById(b)},Z=function(a,b){if(0===arguments.length){R&&(a="//"+R+".yldbt.com/m/");var c=ob("c",!0);return c&&(a=c),"http://"===a.slice(0,7)&&(a=a.slice(5)),"//"===a.slice(0,2)&&(a=("https:"===document.location.protocol?"https:":"http:")+a),a}pb("c",a,J),o("url_prefix",a),b&&(L=b)},$=function(a,b,c){var d,e=a.length,f=b||";",g=c||"=";for(d=0;e>d;d++)1===a[d].length?a[d]=a[d][0]:2===a[d].length&&(a[d]=a[d][0]+g+C(a[d][1]));return a.join(f)},_=function(a){return L&&a.push(["_url_prefix",Z()]),a.push(["e"]),$(a,"&")},ab=function(a){var b,c,d,e,f,g,h=[],i={};for(b=0;b<a.length;b++){if(c=[],e=a[b].slot,"string"===$b(e)&&!i[e])for(d in a[b])a[b].hasOwnProperty(d)&&(f=C(d),g=C(a[b][d]),c.push(f+"="+g));i[e]=!0,h.push(c.join(","))}return h.join("|")},bb=function(){var a,b,c,d,e,f,g,h={};if(g=ob("z"))for(c=g.split("|"),a=0;a<c.length;a++){for(d=c[a].split(","),f={},b=0;b<d.length;b++)e=d[b].split("="),f[e[0]]=e[1];f.slot?h[f.slot]=f:o("missing `slot` field for slot",c[a])}return h},cb=function(){T=!0},db=function(){T=!1},eb=function(a){return 0===arguments.length?e||ob("b",!0):void(yieldbot.framework_window.yieldbot._initialized||(e=v(""+a),pb("b",e,J)))},fb=function(a){e=v(""+a)},gb=function(a){K=a},hb=function(a){f=a},ib=function(a){return 0===arguments.length?R||ob("d",!0):(R=v(""+a),void pb("d",R,J))},jb=function(a){R=a},kb=function(a){return Z()+eb()+"/"+a},lb=function(a,b){var c=new Image(1,1);c.onload=function(){},c.src=kb(a)+"?"+b},mb=function(a,b,c){var d=kb(b)+"?"+c;if(T){var e=a[A].createElement("script");e.src=d;var f=a[A].getElementsByTagName("script")[0];f.parentNode.insertBefore(e,f)}else a[A].write('<script type="text/javascript" src="'+d+'"></script>')},nb=function(a){lb("info.gif",_(a))},ob=function(a,b){var c="__"+z+a;try{var d=new RegExp("(^|;)[ ]*"+c+"=([^;]*)"),e=d.exec(yieldbot.framework_window.document.cookie);return e?D(e[2]):void 0}catch(f){if(!b){var h=[];h.push(["v",w]),h.push(["op","getCookie"]),h.push(["ts",g()]),h.push(["k",c]),h.push(["m",f?f.message||f:"_info"]),nb(h)}return!1}},pb=function(a,b,c,d,e,f){e=U||e;var h="__"+z+a;try{var i;c&&(i=new Date,i.setTime(i.getTime()+c)),yieldbot.framework_window.document.cookie=h+"="+C(b)+(c?";expires="+i.toGMTString():"")+";path="+(d||"/")+(e?";domain="+e:"")+(f?";secure":"")}catch(j){var k=[];k.push(["v",w]),k.push(["op","setCookie"]),k.push(["ts",g()]),k.push(["k",h]),k.push(["ev",b]),k.push(["m",j?j.message||j:"_info"]),nb(k)}},qb=function(a){if(0===arguments.length)return U;if(o.apply(null,["setting domain name",a]),null!=a){var b=new RegExp(a.replace(/^\./,"")+"$");document.domain.match(b)||o.apply(null,["domain name error","can't set \""+a+'" as the domain because is\'s not part of "'+document.domain+'"'])}U=a},rb=function(a,b,c,d){pb(a,"",-1,b,c,d)},sb=function(a){a?(pb("n","1",J),rb("a"),rb("e"),rb("z")):rb("n")},tb=function(){M=!0},ub=function(){return ob("u")},vb=function(){var a=ob("s");return a?a.split(".")[0]:void 0},wb=function(){if(f)return f;var a=ob("s");return a?a.split(".")[2]:void 0},xb=function(){var a,b,c,d,e,i,k,l,m,n,p,q,r=yieldbot.framework_window,s=r[A],t=r.screen,u=r.navigator,v=/[ +]/g,x=function(a){return a.replace(v,"%20")},z=function(){if("boolean"===$b(u.cookieEnabled))return!u.cookieEnabled;var a=function(){return pb("t","1"),"1"===ob("t")?!1:!0};return a()},B=function(){var a="";try{a=y[A].referrer}catch(b){if(r.parent)try{a=r.parent[A].referrer}catch(c){a=""}}return""===a&&(a=s.referrer),a};b=j(),q=g(),p=ob("v"),c=ob("u")||j(),l=ob("s"),m=ob("n"),l?(k=l.split("."),e=k[0],i=1+parseInt(k[3],10),n=parseInt(k[1],10),a=k[2]):(e=j(),i=1,n=p?0:1),d=[e,n,b,i].join("."),pb("u",c,H),pb("v",q,I),pb("s",d,J),m&&pb("n",m,J),f=b,rb("a"),rb("p"),rb("e"),rb("z");var C=[];if(C.push(["cb","yieldbot.updateState"]),C.push(["v",w]),C.push(["vi",c]),C.push(["si",e]),C.push(["pvi",b]),C.push(["pvd",i]),a&&C.push(["lpvi",a]),n&&C.push(["nv"]),z()&&C.push(["cd"]),O.length){C.push(["sn",O.join("|")]);var D,E,F=[];for(D=0;D<O.length;D++)E=O[D],F.push(V[E]?V[E].join("."):"");C.push(["ssz",F.join("|")])}return m&&C.push(["sb"]),X&&C.push(["itc",X]),C.push(["lo",x(s.location.href)]),C.push(["r",x(B())]),C.push(["sd",t.width+"x"+t.height]),C.push(["to",(new Date).getTimezoneOffset()/60]),C.push(["la",u.language||u.userLanguage]),C.push(["np",u.platform]),C.push(["ua",u.userAgent]),p&&C.push(["lpv",q-parseInt(p,10)]),yieldbot.framework_window.yieldbot.cts_ns&&C.push(["cts_ns",yieldbot.framework_window.yieldbot.cts_ns]),C.push(["cts_js",yieldbot.framework_window.yieldbot.cts_js]),yieldbot.framework_window.yieldbot.cts_ini=g(),C.push(["cts_ini",yieldbot.framework_window.yieldbot.cts_ini]),o("cts_ini",h(),yieldbot.framework_window.yieldbot.cts_ini),_(C)},yb=function(a,b,c,d,e,f,g){var h,i,j="javascript",k="src";i=e.createElement("iframe"),i.frameBorder="0",i.width=f,i.height=g,i.scrolling="no",i.id=c,d&&(i[k]=j+":false"),i.allowTransparency="true",a.appendChild(i);try{i[B][A].open()}catch(l){h=j+":var d="+A+".open();d.domain='"+yieldbot.framework_window.document.domain+"';",i[k]=h+"void(0);"}try{var m=i[B][A];m.write(b),m.close()}catch(n){i[k]=h+'d.write("'+b.replace(/"/g,String.fromCharCode(92)+'"')+'");d.close();'}},zb=function(a){yieldbot.framework_window.yieldbot["cts_rend_"+a.request_id]=g(),o("cts_rend",a.request_id,yieldbot.framework_window.yieldbot["cts_rend_"+a.request_id]);var b=a.size[0],c=a.size[1],d=a.html,e=a.style,f=!a.silent,h=a.request_id,i=a.wrapper_id,j=a.delay,k=i||z+"-"+h,l=x,m=l[A],n=Y(m,k),p=m.createElement("div"),q=p.style;p.className="ybot-creative creative-wrapper",n.appendChild(p),q.width=b+"px",q.height=c+"px",f&&(d+='<script type="text/javascript">var y=window.parent.yieldbot;y.impression("'+h+'");</script>');var r="<!DOCTYPE html><head><meta charset=utf-8><style>"+e+"</style></head><body>"+d+"</body>",s=/MSIE[ ]+6/.test(l.navigator.userAgent),t=k+"-iframe";null!=j?setTimeout(function(){yb(p,r,t,s,m,b,c)},j):yb(p,r,t,s,m,b,c)},Ab=function(){var a=ob("u");a&&pb("u",a,J),rb("v")},Bb=function(a,b,c){var d=l(O,a),e={};if(-1===d&&O.push(a),"object"===$b(b)?e=b:"string"===$b(b)&&(e.dom_id=b),"string"===$b(e.dom_id)?P[a]=e.dom_id:delete P[a],"number"===$b(c)?(e.time=c,Q[a]=e.time):delete Q[a],_b(e.sizes)){var f,g=[];if(2===e.sizes.length&&"number"===$b(e.sizes[0])&&"number"===$b(e.sizes[1]))g.push(e.sizes.join("x"));else for(f=0;f<e.sizes.length;f++)_b(e.sizes[f])?g.push(e.sizes[f].join("x")):p("invalid slot size "+e.sizes[f]);V[a]=g}null!=b&&"string"!==$b(b)&&"object"!==$b(b)&&o("invalid slot config",b),o("slot config",a,e)},Cb=function(a){var b,c,d,e,f,g=[],h=[];for(c=0;c<a.length;c++)"string"===$b(a[c])?(b=a[c].split(":"),d=b[0],e=b[1],-1===l(g,d)&&(g.push(d),f={slot:d},e&&(f.size=e),h.push(f))):o("invalid slot type",a[c]);pb("a",g.join("."),J),pb("z",ab(h),J)},Db=function(a){var b,c,d=[],e=[],f=[];for(b=0;b<a.length;b++)"object"===$b(a[b])&&(c=a[b],c.slot?c.alternate&&"y"===c.alternate?-1===l(f,c.slot)&&f.push(c.slot):-1===l(d,c.slot)&&(d.push(c.slot),e.push(c)):o("missing required `slot` field",c));pb("a",d.join("."),J),pb("e",f.join("."),J),pb("z",ab(e),J)},Eb=function(){var a=ob("a");return"."===a},Fb=function(){var a=ob("a");return Eb()?[]:a?a.split("."):[]},Gb=function(){var a=ob("e");return a?a.split("."):[]},Hb=function(a){var b,c,d=[];for(b=0;b<a.length;b++)c=a[b].split(":")[0],d.push(c);pb("e",d.join("."),J)},Ib=function(a){S=a},Jb=function(a,b,c,d){var e,f,g=c||"ybot_",h=[],i=[],j=bb();for(d=d||",",h.push(["y"]),e=0;e<a.length;e++)f=j[a[e]],i.push("object"===$b(f)&&f.size?a[e]+":"+f.size:a[e]);return h.push([g+"slot",i.join(d)]),h.push([g+"psn",eb()]),h.push([g+"pvi",wb()]),h.push([g+"subdomain",ib()]),$(h,b)},Kb=function(a){var b,c,d,e,f=Fb(),g=Gb();if(!a)return!1;if(a.split&&(e=a.split(",")),e||(e=a),c=e.length,c&&Eb())return d=Math.round(Math.random()*(c-1)),v(e[d]);for(b=0;c>b;b++)if(l(f,v(e[b]))>-1)return S&&(rb("a"),rb("e"),rb("z")),v(e[b]);if(g.length)for(b=0;c>b;b++)if(l(g,v(e[b]))>-1)return S&&(rb("a"),rb("e"),rb("z")),v(e[b]);return!1},Lb=function(a,b,c){var d=Kb(a);return d?Jb([d],b,c):"n"},Mb=function(a,b,c,d){var e,f,g,h,i=[],j="slotParams",k=bb();if(d=d||["size","cpm","ds"],c=c||"ybot_",g=Kb(a),h=k[g],g&&"array"===$b(d))for(i.push(["y"]),i.push([c+"slot",g]),e=0;e<d.length;e++)f=d[e],"undefined"!=typeof h[f]&&i.push([c+f,h[f]]),o(j,f+" is ",h[f]);else i.push(["n"]);return g||o(j,"could not find slotName",a),"array"!==$b(d)&&o(j,"params type","expected:array","actual:"+$b(d)),$(i,b)},Nb=function(a){var b=Fb();return b.length?Jb(b,"&","ybot_",a):"n"},Ob=function(a){var b=Kb(a);return b?"y":"n"},Pb=function(a,b){Kb(b)&&googletag.cmd.push(function(){googletag.pubads().setTargeting(a,"y")})},Qb=function(a,b){Kb(b)&&GA_googleAddAttr(a,"y")},Rb=function(){yieldbot.framework_window.yieldbot._initialized||(c=g(),b=b||yieldbot.framework_window.yieldbot.default_init_timeout,setTimeout(function(){if(!d){var a="init response took more than "+b+"ms to load, triggering resume()";o(a);var c=[["v",w],["ts",g()],["api_error",a]];nb(c),fc()}},b),null!=eb()&&(o("triggering init call"),yieldbot.framework_window.yieldbot._initialized=!0,mb(yieldbot.framework_window,E,xb()),tb()))},Sb=function(a,b){var c,d,e,f,h=[];d=j(),h.push(["v",w]),h.push(["vi",ub()]),h.push(["si",vb()]),h.push(["pvi",wb()]),h.push(["ri",d]),b&&h.push(["wi",b]);for(c in a)a.hasOwnProperty(c)&&(h.push([c,a[c]]),("slot"===c||"ad_slot"===c)&&(Eb()||(rb("e"),f=a[c],a[c].match(/\:/)&&(f=a[c].split(":")[0]),e=m(Fb(),f),pb("a",e.join("."),J))));T||b||x[A].write('<div id="'+z+"-"+d+'"></div>');var i=g();yieldbot.framework_window.yieldbot["cts_ad_"+a.slot]=i,yieldbot.framework_window.yieldbot.cts_res&&h.push(["cts_res",yieldbot.framework_window.yieldbot.cts_res]),h.push(["cts_ad",i]),o("cts_ad",a.slot,i),mb(x,F,_(h))},Tb=function(a,b){var c,d=x,e=d[A];if(!P[a]||!document.getElementById(P[a]))return void o("invalid slot","requestedSlot="+a,"_slotToDomId[requestedSlot]="+P[a]);if(y===x&&!yieldbot.framework_window.yieldbot._initialized)return void N.push(function(){setTimeout(function(){Tb(a,b)},0)});var f=Q[a]||2e3,g=Kb(a);g&&!Fb()&&P[a]?(c=Y(e,P[a]),c.innerHTML="",Sb({slot:g},P[a])):Gb().length?setTimeout(function(){g=Kb(a),g?(c=Y(e,P[a]),c.innerHTML="",Sb({slot:g},P[a])):b()},f):b()},Ub=function(a){var b,c=["t","d1","d2"],d=(c.length,[]);d.push(["v",w]),d.push(["vi",ub()]),d.push(["si",vb()]),d.push(["pvi",wb()]),d.push(["ri",a]),b=Y(x[A],z+"-frame-"+a);var e=g();yieldbot.framework_window.yieldbot["cts_imp_"+a]=e,d.push(["cts_rend",yieldbot.framework_window.yieldbot["cts_rend_"+a]]),d.push(["cts_imp",e]),o("cts_imp",a,e),lb(G,_(d))},Vb=!1,Wb=[],Xb={dfp_sb_manager:2,psn:1,ad:1,init:0},Yb=function(a){var b,c,d;if(Wb.push(a),d=Wb[0],!Xb.hasOwnProperty(d)){var e=[];for(e.push(["v",w]),e.push(["ts",g()]),e.push(["api_error",d+" not supported with unwrapped call"]),c=Wb.length,b=0;c>b;b++)e.push(["arg_stack",Wb[b]]);return nb(e),["noop"]}return Xb[d]===Wb.length-1?(Vb=!0,Wb):["noop"]},Zb={},$b=function(a){return null==a?String(a):Zb[Object.prototype.toString.call(a)]||"object"},_b=Array.isArray||function(a){return"array"===$b(a)},ac=function(a){var b,c,d,e,f;if(c=bb()[a],f=Ob(a),b={ybot_ad:f},"y"===f&&"object"===$b(c))for(d in c)e="ybot_"+d,b[e]=c[d];return b},bc=function(a,b){var c,d;if(b&&"function"===$b(b.setTargeting)){c=ac(a);for(d in c)b.setTargeting(d,c[d])}},cc=function(a){var b=bb()[a],c="";return b&&b.size&&(c=b.size),c},dc=function(a){var b,c,d,e,f,h;if(p(a.toString()),"function"===$b(a))d=a;else{if(_b(a)||(a=Yb(a)),f=a[0],h=a.slice(1),yieldbot.hasOwnProperty(f))d=yieldbot[f],h&&(e=h);else{var i=[];for(i.push(["v",w]),i.push(["op",f]),i.push(["ts",g()]),i.push(["api_error",f+" function not available"]),c=h.length,b=0;c>b;b++)i.push(["arg",h[b]]);nb(i),d=yieldbot.noop}Vb&&(Vb=!1,Wb=[])}if(M&&"resume"!==f)N.push(a);else try{d.apply(yieldbot,e||[])}catch(j){var i=[];i.push(["v",w]),i.push(["ts",g()]),ob("_debug")&&(s("Caught error in ybotq.push"),s(j.stack||j.stackTrace||"Error in ybotq.push with no stack trace")),i.push(["apie",j.message||j]);try{nb(i)}catch(k){}}},ec=function(a){var b,c;if(!a.framework)for(c=a.length,b=0;c>b;b++)dc(a[b])},fc=function(){yieldbot.framework_window.yieldbot.cts_res=g(),o("cts_res",h(),yieldbot.framework_window.yieldbot.cts_res),M=!1,ec(N),N=[]},gc=function(a){return d=g()-c,W=a,d>b?void o("init took "+d+"ms to respond",h(),a):void("object"!==$b(a)?(o("invalid data structure returned for v1/init",a),s("invalid data structure returned for v1/init",a),fc()):("array"===$b(a.errors)&&a.errors.length>0&&(o("vi/init errors",a.errors),a.integration_test&&yieldbot.framework_window.alert(a.errors)),"array"===$b(a.warnings)&&a.warnings.length>0&&(o("vi/init warnings",a.warnings),a.integration_test&&yieldbot.framework_window.alert(a.warnings)),a.slots||o("v1/init warnings","no slots"),a.slots&&"array"===$b(a.slots)&&Db(a.slots),a.subdomain_iframe&&jb(a.subdomain_iframe),a.url_prefix&&Z(a.url_prefix),a.block_session&&sb(a.block_session),a.ad_serve_first_slot_only&&Ib(a.ad_serve_first_slot_only),fc()))},hc=function(){return"object"===$b(W)&&"undefined"!==$b(W.minibar)&&"undefined"!==$b(e)},ic=function(a){if(hc()){var b,c,d,e="https:"===x[A].location.protocol?"https:":"http:";b=x[A].getElementsByTagName("script")[0],c=x[A].createElement("script"),c.src=e+"//cdn.yldbt.com/js/yieldbot.minibar.js",c.onload=function(){d=yieldbot.minibar,d&&(d.extraContent=a,d.initResponse=W,d.render())},b.parentNode.insertBefore(c,b)}},jc=function(){X=1},kc=function(){var a=null;return W&&W.trending&&W.trending.data&&(a=W.trending),a},lc="Boolean Number String Function Array Date RegExp Object".split(" "),mc=0;mc<lc.length;mc++)Zb["[object "+lc[mc]+"]"]=lc[mc].toLowerCase();if(!yieldbot.framework){yieldbot.framework=!0,yieldbot.default_init_timeout=4e3,yieldbot.noop=function(){},yieldbot.enableAsync=yieldbot.enable_async=q("yieldbot.enableAsync",cb),yieldbot.enableSync=yieldbot.enable_sync=q("yieldbot.enableSync",db),yieldbot.data_collection_opt_out=q("yieldbot.data_collection_opt_out",Ab),yieldbot.dfp_sb_manager=q("yieldbot.dfp_sb_manager",Pb),yieldbot.gam_manager=q("yieldbot.gam_manager",Qb),yieldbot.pub=yieldbot.psn=q("yieldbot.pub",eb),yieldbot.psn_iframe=q("yieldbot.psn_iframe",fb),yieldbot.subdomain=q("yieldbot.subdomain",ib),yieldbot.pvi_iframe=q("yieldbot.pvi_iframe",hb),yieldbot.subdomain_iframe=q("(deprecated) yieldbot.subdomain_iframe",jb),yieldbot._block_session=q("(deprecated) yieldbot._block_session",sb),yieldbot._url_prefix=q("(deprecated) yieldbot._url_prefix",Z),yieldbot.ad_serve_first_slot_only=q("(deprecated) yieldbot.ad_serve_first_slot_only",Ib),yieldbot.set_slots=q("(deprecated) yieldbot.set_slots",Cb),yieldbot.set_alternate_slots=q("(deprecated) yieldbot.set_alternate_slots",Hb),yieldbot.resume=q("(deprecated) yieldbot.resume",fc),yieldbot.ad_params=q("yieldbot.ad_params",Lb),yieldbot.run_queue=q("yieldbot.run_queue",ec),yieldbot.defineSlot=q("yieldbot.defineSlot",Bb),yieldbot.adAvailable=q("yieldbot.adAvailable",Ob),yieldbot.slot_available=q("yieldbot.slot_available",Kb),yieldbot.alternateSlot=q("yieldbot.alternateSlot",Tb),yieldbot.params=q("yieldbot.params",Lb),yieldbot.slotParams=q("yieldbot.slotParams",function(a,b,c,d){return Mb(a,b,c,d)}),yieldbot.singleRequestParams=q("yieldbot.singleRequestParams",Nb),yieldbot._erase_cookie=q("yieldbot.eraseCookie",rb),yieldbot._get_cookie=q("yieldbot.getCookie",ob),yieldbot._set_cookie=q("yieldbot.setCookie",pb),yieldbot._render=q("yieldbot._render",zb),yieldbot._info=q("yieldbot.info",nb),yieldbot._info_init_time_limit=q("yieldbot._info_init_time_limit",gb),yieldbot.type=q("yieldbot.type",$b),yieldbot.debug=q("yieldbot.debug",n),yieldbot.log=q("yieldbot.log",o),yieldbot.dumpLog=q("yieldbot.dumpLog",r),yieldbot.go=yieldbot.enablePub=yieldbot.track=yieldbot.init=q("yieldbot.go",Rb),yieldbot.ad=q("yieldbot.ad",Sb),yieldbot.renderAd=q("yieldbot.renderAd",function(a,b){Sb({slot:a},b)});var nc=!1;for(yieldbot.renderIfAvailable=q("yieldbot.renderIfAvailable",function(a,b){Kb(a)&&(nc=!0,Sb({slot:a},b))}),yieldbot.adNotAvailable=q("yieldbot.adNotAvailable",function(a){nc||a()}),yieldbot.getAvailableSizes=q("yieldbot.getAvailableSizes",cc),yieldbot.setSlotTargeting=q("yieldbot.setSlotTargeting",bc),yieldbot.getSlotCriteria=q("yieldbot.getSlotCriteria",ac),yieldbot.updateState=q("yieldbot.updateState",gc),yieldbot.hasMinibar=q("yieldbot.hasMinibar",hc),yieldbot.renderMinibar=q("yieldbot.renderMinibar",ic),yieldbot.includeTrendingContent=q("yieldbot.includeTrendingContent",jc),yieldbot.getTrendingContent=q("yieldbot.getTrendingContent",kc),yieldbot.setInitTimeout=q("yieldbot.setInitTimeout",function(a){"number"===$b(a)?b=a:o('called "yieldbot.setInitTimeout" with "'+$b(a)+'" instead of "number"',h())}),yieldbot.getInitTimeout=q("yieldbot.getInitTimeout",function(){return b}),yieldbot.impression=q("yieldbot.impression",Ub),yieldbot.framework_window=x,yieldbot._initialized=!1,yieldbot._history=[],yieldbot._pushCount=0,yieldbot.domainName=q("yieldbot.domainName",qb),yieldbot.__resetDefaults=function(){O=[],V={},P={},Q={},e=void 0;var a,b=["a","b","c","d","e","p","s","t","v","u","n","z","_opt_out","_debug"];for(a=0;a<b.length;a++)rb(b[a])},yieldbot.__initial_message=xb,yieldbot.__getDefinedSlots=function(){return O},yieldbot.__getSlotToDomId=function(){return P},yieldbot.__getSlotTimeout=function(){return Q},yieldbot.__getMultiSize=function(){return V},a=window;a!==y;)try{a=a.parent,a.ybotq&&a.ybotq.framework&&(yieldbot.framework_window=a)}catch(oc){yieldbot.unfriendly_iframe="In unfriendly iframe tag document.domain is: "+x.document.domain}var pc=x===yieldbot.framework_window;if(yieldbot.framework_window.performance&&yieldbot.framework_window.performance.timing?(yieldbot.framework_window.yieldbot.cts_ns=window.performance.timing.navigationStart,pc||o("subsequent yieldbot.intent tag load",yieldbot.cts_js-yieldbot.framework_window.yieldbot.cts_js)):pc||o("subsequent yieldbot.intent tag load","unknown"),pc&&(o("cts_ns",h(),yieldbot.framework_window.yieldbot.cts_ns),o("cts_js",h(),yieldbot.framework_window.yieldbot.cts_js)),ec(ybotq),ybotq={push:function(){var a,b=arguments.length;for(a=0;b>a;a++)dc(arguments[a])},framework:!0},yieldbot.unfriendly_iframe){var qc=[];qc.push(["v",w]),qc.push(["op","iframeAccess"]),qc.push(["ts",g()]),qc.push(["m",yieldbot.unfriendly_iframe]),nb(qc)}}}();