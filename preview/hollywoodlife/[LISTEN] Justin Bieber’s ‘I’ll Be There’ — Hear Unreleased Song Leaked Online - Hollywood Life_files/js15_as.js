(function(){var n="undefined",t=function(t){return typeof t!==n},e="js15_as.js",i="",r=!1,o=!1,a=!1,s=!1,_="0.1.34",c=25,u="-",d="_HISTATS_SID",f="histats_custom_destDivProducer",p=function(n){u+="_"+n};p(_);var v=function(){r&&console.log.apply(this,arguments)},l=function(n,i){var r=n||{};try{var o=i.document,a=i.navigator,s=i.screen,_=i.Date,u=i.Math,d=function(){return o},f=function(){return d().getElementsByTagName("body")[0]||d().getElementsByTagName("head")[0]},p=function(n){return"function"==typeof n},l=function(n){return t(n)&&n instanceof Array},m=function(n){return t(n)&&!!d().getElementById(n)},h=function(n){var e=!1;if(t(n)){if("NaN"==parseInt(n))return!1;e=parseInt(n)>0}return e},y=function(n){return h(n)?parseInt(n):0},g=function(n){return"string"!=typeof n||n.length<1?n:n.replace(/^['"]?(.*)['"]$/,"$1")},w=t(window["_DEBUG_HISTATS_ASYNCR_DO_NOT_AUTOSTART"]),T=parseInt(1e4*u.random())+1,I="histats_counter",H=function(n,e,i){if(!t(n))return t(i)&&i(n),void 0;for(var r in n)n.hasOwnProperty(r)&&e(r,n[r],n)},C=0,S=function(){C++},E=function(n){return"string"==typeof n},b=function(n){var e=!1;return t(n)&&E(n)&&(e=(n+"").length>0),e},R="1000",A="0",O="0.php?";r.o_i=0,r.ver=16,r.eve=3,r.cver=0,r.s_id=0,r.s_pd=0,r.d_op=0,r.i_dom=4,r.i_id=0,r.i_w=0,r.i_h=0,r.i_b="",r.s_d="",r.s_u="",r.s_l="0",r.s_t="",r.d_s=0,r.d_fa=0;var D=0,U=0;r.d_tf=0,r.d_nv=1,r.d_mu=0,r.d_cv=0,r.d_cs=0,r.d_cp=0,r.d_pON=0;var N=45e3;r.d_ca=0,r.d_pn=0,r.d_pt=0,r.f_pv=0,r.s_ta="",r.a_va=[],r.s_ti="",r.asi=0,r.o_fa=0,r.o_de=0,r.o_BC=0,r.o_fr=0,r.p_ff=0,r.n_a="",r.n_f=0,r.n_n=0,r.o_n=0;var B=31536e6;r.c_on=0,r.s_sc1="1",r.s_sc2="11111111",r.s_asc2={};var j=function(){return r.i_id},F=function(n){r.i_id=y(n)},G=function(){return 700==j()||0==j()},x=function(){var n=j();return!G()&&n>0&&5e3>n},k=function(){return j()>=8e3&&j()<9e3},L=function(){return j()>=1e4&&j()<10100},q=function(){return j()>=500&&j()<600},P=function(n){artificialFrameRequestReference=i.setTimeout(n,1e3/c)},M=i.requestAnimationFrame||i.webkitRequestAnimationFrame||i.mozRequestAnimationFrame||i.msRequestAnimationFrame||i.oRequestAnimationFrame||P,J=function(){return 1==r.asi||"1"==r.asi},z=function(){r.asi=1},W="";r.fasi=function(n){r.asi=n};var Y=function(){return"http://"},$=function(){return"s10.histats.com"},K=function(){return"s10.histats.com"},V=function(){return"s"+r.i_dom+".histats.com"},Q=function(){return"s"+r.i_dom+"i.histats.com"},X=function(n){d().writeln('<script type="text/javascript" language="JavaScript" src="'+n+'"></script>')},Z=function(n){return'<script type="text/javascript" language="JavaScript" >document.writeln(\''+n+"');</script>"},nn=function(n){d().writeln(Z(n))},tn=function(n){d().write(n)},en=function(){var n='<div id="'+Cn()+'" style="display: none;"></div>';tn(n),I=Cn()},rn=function(){var n=d().createElement("div");n.id=Cn();var t=d().getElementById("histats_counter");t?t.appendChild(n):v("err_10")},on=function(n,t){var e=d().createElement("script");try{e.async=!0}catch(i){}e.type="text/javascript",e.src=n,e&&"function"==typeof t&&(e.readyState?e.onreadystatechange=function(){var n=e.readyState;("loaded"==n||"complete"==n||parseInt(n)>1)&&(e.onreadystatechange=null,t())}:e.onload=function(){t()}),f().appendChild(e)},an=function(){return 1==r.p_ff},sn=function(){return r.p_ff=1},_n=function(){return r.o_fa>0},cn=function(){return r.o_fa=1};r.is=t,r.isd=h;var un=function(){return r.s_id},dn=function(){return un()<1},fn=function(n){r.s_id=y(n)},pn=function(){return vn(un())},vn=function(n){return h(n)},ln=function(n){return m(n)?d().getElementById(n):void 0},mn=function(){return ln(En())||ln(Cn())},hn=function(){return ln(Cn())||ln(En())},yn=function(){var n=hn();return n&&(n.style.display="block"),n},gn=function(n){try{var t=yn();if(t)return t.innerHTML=n,!0}catch(e){}return!1},wn=function(n){try{var t=mn();if(t)return t.style.display="block",t.innerHTML=n,!0}catch(e){}return!1},Tn=function(n){return n.id},In=function(n,t){var e=(t+"").match("(^|;)\\s*"+n+"\\s*=\\s*([^;]+)");return e?e.pop():""},Hn=function(n){return In(n,d().cookie)},Cn=function(){return"histats_counter_"+T},Sn=function(){return"histats_counter_"+un()+"_"+j()},En=function(){return"histats_counter"};r.GC=Hn;var bn=function(n){var t=n+un();return Hn(t)},Rn=function(n){return b(n)?i.encodeURIComponent?i.encodeURIComponent(n):i.escape(n).split("@").join("%40"):""};r.ENCODE=Rn;var An=function(n){if(!b(n))return"";try{return i.decodeURIComponent?i.decodeURIComponent(n):i.unescape(n)}catch(t){try{return unescape(n)}catch(t){v(t,n)}}};r.DECODE=An;var On=function(n){try{return i.decodeURIComponent?i.decodeURIComponent(n):n}catch(t){return v(t,n),n}};r.DECODEuri=On;var Dn=function(n,t,e){try{if(r.o_BC)return"";var i,o;o=new _,o.setTime(o.getTime()+e),i=e>0?"; expires="+o.toGMTString():"; expires=Thu, 01-Jan-1970 00:00:01 GMT",d().cookie=n+"="+t+i+"; path=/"}catch(a){v(this,a)}},Un=function(n,t){return Dn(n+un(),t,B)},Nn=function(n){Dn(n,"",-1)};r.SC=Dn,r.framed_page=function(){r.o_fr=1},r.start=function(n,t,e,i,o,a,s){fn(t),r.i_dom=e,F(i),r.i_w=o,r.i_h=a,r.s_sc2=s,(r.s_sc2.length>8||r.s_sc2.length<1)&&(r.s_sc2="")},r.init=function(){if(!r.o_i){++r.o_i;var n=new i.Date;r.o_n=n.getTime(),r.n_a=a.appName,("Opera"===r.n_a||a.userAgent.indexOf("Firefox")>=0)&&(r.n_f=1),r.s_u=d().URL?d().URL:d().location,r.s_u=On(r.s_u).substr(0,500),R=d().referrer+"",r.s_ti=d().title,r.s_ti=On(r.s_ti).substr(0,500);var t=-1;try{r.d_s=s.width,r.o_fr&&i.top!=i.self&&(R=""+i.top.document.referrer),r.s_l=a["language"]||a.browserLanguage||"","lt"==r.s_l.substr(0,2)&&(r.s_l="lT"),"gt"==r.s_l.substr(0,2)&&(r.s_l="gT"),r.s_l.length<1&&(r.s_l="0"),t=R.indexOf("//"+d().location.host)}catch(e){r.s_l="0",R="1000",r.d_s="0"}if(r.d_s=y(r.d_s),R=R.substr(0,500),D=y(bn("HstCla")),r.d_fa=y(bn("HstCfa")),y(bn("NoHits")>0)&&cn(),r.d_fa<1&&(r.d_fa=r.o_n,Un("HstCfa",r.d_fa)),r.d_nv=1,Un("HstCla",r.o_n),r.c_on=y(bn("HstCla")),r.c_on>0){D>0&&(U=parseInt(r.o_n-D)),r.d_fa>0&&(r.d_tf=parseInt(r.o_n-r.d_fa)),r.d_pn=y(bn("HstPn")),r.d_pt=y(bn("HstPt")),r.d_cv=y(bn("HstCnv")),r.d_cs=y(bn("HstCns")),r.d_mu=y(bn("HstCmu")),r.d_pn++,r.d_pt++;var o=1e3,_=3600*o,c=24*_*30.4,u=600*o,f=45*o;parseInt(r.o_n-r.d_mu)>=c&&(Un("HstCmu",r.o_n),r.d_mu=0),r.d_mu++,1>D||U>=c?(r.d_pn=1,r.d_cv=1,r.d_pt=1,r.d_cs=1):U>0&&(_>U?r.d_nv=0:(r.d_pn=1,r.d_cv++),U>u&&r.d_cs++),r.d_cv<1&&(r.d_cv=1),1==r.d_nv&&i.setTimeout(function(){r.track_event("b")},f),Un("HstPn",r.d_pn),Un("HstPt",r.d_pt),Un("HstCnv",r.d_cv),Un("HstCns",r.d_cs)}b(R)&&1==r.d_nv&&1>t?Un("c_ref_",Rn(R)):(b(An(Hn("c_ref_"+un())))&&(R=An(Hn("c_ref_"+un()))),b(R)||(R="1000")),r.d_op=Hn("c_pd_"+un()),h(r.d_op)||(r.d_op=0),r.s_pd>0&&Un("c_pd_",r.s_pd)}};var Bn=function(){r.init(),A=""+(un()+"")+("&@f"+r.ver)+("&@g"+r.d_nv)+("&@h"+r.d_pn)+("&@i"+r.d_cv)+("&@j"+r.c_on)+("&@k"+U)+("&@l"+r.d_pt)+("&@m"+Rn(r.s_ti))+("&@n"+r.imp_v())+("&@o"+Rn(R))+("&@q"+r.s_pd)+("&@r"+r.d_op)+("&@s"+j())+("&@t"+Rn(r.s_l))+("&@u"+r.d_s)+("&@v"+Rn(r.s_u))};r.add_v=function(n,t){b(n)&&b(t)&&("tags"==n&&(t=t.split(";").join(",")),r.a_va[y(r.a_va.length)]=Rn(n)+"="+Rn(t))},r.imp_v=function(){var n="0";if("undefined"!=typeof i.Histats_variables){var t=i.Histats_variables;if(t.length>0&&t.length%2==0)for(var e=0;e<t.length;)r.add_v(t[e],t[e+1]),e+=2}var o=r.a_va.length;return 1>o?n:(n+=r.a_va.join("|"),n.substr(0,300))};var jn=function(){if(h(r.i_dom)&&!dn()){var n=Y()+V()+"/stats/"+O+A+"&@w";J()?rn():en(),on(n)}};r.load_JScall=jn,r.mlare=function(n,t){},r.load_GIFimg=S,r.load_GIFicon=S,r.load_gifImgOrTopImg=r.load_GIFimg,r.track_hits=function(){_n()||(Bn(),L()?(O="i/"+un()+".gif?",r.load_gifImgOrTopImg()):k()?(O=j()+".gif?",r.load_GIFicon()):G()||q()?(xn("1"),O="0.php?",jn(),Xn()):(O=un()+".php?",jn()))},r.track_event=function(n){r.d_ca>100||(A=""+(un()+"")+("&@A"+n+"&@R"+u.ceil(1e5*u.random())),O="e.php?",z(),jn(),r.d_ca++)};var Fn=function(n){xn(n),Xn()},Gn=function(n){Wn(n),Xn()};i.chfh=Fn,i.chfh2=Gn;var xn=function(n){E(n)&&(r.s_sc1=n)},kn=function(n){var t={};n=g(n);try{if(E(n))for(var e=/([0-9]+)([^=]+)=([^#]+)/g,i,r=1;r++<100&&null!=(i=e.exec(n));)4==i.length&&(t[i[1]]=i[2]+"="+i[3])}catch(o){v(this,o)}return t},Ln=function(){return b(r.s_sc2)?(""+r.s_sc2).split(""):[]},qn=function(n,t){var e="";for(var i in n)"1"==n[i]&&t[i]&&(e=e+t[i]+"#");return e},Pn=function(n,t){var e=[];for(var i in n)if("1"==n[i]&&t[i]){var r=t[i].split("=",2);e.push({name:r[0],value:r[1]})}return e},Mn=function(n){return"_HistatsCounterGraphics_"+n},Jn=function(n){var t=Mn(j())+"_setValues";i[t]=n},zn=function(n){return Y()+K()+"/counters/cc_"+n+".js"},Wn=function(n){r.s_asc2=kn(n);var t=Ln();r.s_sc1=qn(t,r.s_asc2),Jn(Pn(t,r.s_asc2))};r.sc1=Wn,i._HST_cntval||(i._HST_cntval="");var Yn={counterObjInstance:void 0},$n=function(){return{main_div_name:Cn(),siteId:un()}},Kn=function(){var n=zn(j());on(n,function(){var n=i[Mn(j())],t=yn();t&&(Yn.counterObjInstance=n($n(),i),null!=Yn.counterObjInstance&&Yn.counterObjInstance.start())})},Vn=function(n){return n>0&&400>n?!0:!1},Qn=function(){"undefined"!=typeof st_dominio&&h(st_dominio)&&(r.i_dom=st_dominio),"undefined"!=typeof cimg&&h(cimg)&&F(cimg),"undefined"!=typeof cwi&&h(cwi)&&(r.i_w=cwi),"undefined"!=typeof che&&h(che)&&(r.i_h=che),"undefined"!=typeof s_sid&&h(s_sid)&&fn(s_sid),"undefined"!=typeof zstpagid&&h(zstpagid)&&(r.s_pd=zstpagid),"undefined"!=typeof uhist&&h(uhist)&&(r.o_BC=1),"undefined"!=typeof ExFd&&h(ExFd)&&r.framed_page()};r.oldcode_start=Qn;var Xn=function(){x()&&!an()&&(sn(),Kn())};r.load_flash=Xn;var Zn=function(){try{var n=i["_Hasync"];if("undefined"!=typeof n&&"function"==typeof n.push)for(var t in n){var e=null;e=i[n[t][0]];var o=n[t][0].split(".");"Histats"==o[0],2==o.length&&(e=r[o[1]]),"function"==typeof e&&e.apply(r,(n[t][1]+"").split(","))}}catch(a){v(a)}};w||Zn(),r.filename=e}catch(nt){}return r};i+="__ALLJS__",i+="_ASYNC_",i+="_NOTGIF_";var m=window["Histats"]||{},h=window,y="_DEBUG_HISTATS_RESET_PARENT",g="_DEBUG_HISTATS_USE_MOCKED_WINDOW",w="_DEBUG_HISTATS_RETURN_BUILDER",T="_DEBUG_HISTATS_forced";o=t(window[y])&&1==window[y],a=t(window[g])&&window[g]===!0,s=t(window[w])&&window[w]===!0,r=t(window[T])&&window[T]===!0,r=r||o||a,r&&(window["histats_counters_byType"]=window["histats_counters_byType"]||{},window["histats_counters_byType"][i]=window["histats_counters_byType"][i]||[],window["histats_counters_byType"][i].push(e)),o&&(m={}),a&&(h=window["mocked_window"]),r?window["histatsByName_"+e]=s?l:l(m,h):window["Histats"]=l(m,h)}).call(this);