(function(){var b=(function(a){try{for(var h=null;h!=a;h=a,a=a.parent)switch(a.location.protocol){case "https:":return!0;case "http:":case "file:":return!1}}catch(K){}return!0}(this)?"https":"http")+"://pagead2.googlesyndication.com/pagead/gen_204?id=";var c={b:1,a:2};try{window.dcmads=window.dcmads||{};window.dcmads.startTime=(new Date).getTime();var d=window.dcmads,e=window.dcmads.version,f={loader:60};if(e)if(f.experiment=e.experiment,23==e.number||"p"==e.number)f.number=23;else if(24==e.number||"c"==e.number)f.number=24;if(!f.number){var g;a:{var k=[23,24];if(!(1E-4>Math.random())){var l=Math.random();if(.05>l){var m=window;try{var n=new Uint32Array(1);m.crypto.getRandomValues(n);l=n[0]/65536/65536}catch(a){l=Math.random()}g=k[Math.floor(l*k.length)];break a}}g=
null}f.experiment=!!g;f.number=g||23}d.version=f;var p=window.dcmads,q;var r=window.dcmads.expts,t;b:{var u=typeof r;if("object"==u&&null!=r||"function"==u){for(var v in c){var w=r[c[v]];if("number"!=typeof w||0>w||1<w){t=!1;break b}}t=!0}else t=!1}q=t?r:r={1:.5,2:.1};p.expts=q;var x=window.dcmads.version,y=x.number,z="";x.experiment&&23==y&&(z="?rxp=23x24");var A=this.document,B;if(!(B=A.currentScript)){var C=A.getElementsByTagName("script");B=C[C.length-1]}var D=B;document.write('<script src="'+
((D&&D.src&&0==D.src.indexOf("http:")?"http:":"https:")+"//www.googletagservices.com/dcm/"+("impl_v"+y+".js"+z))+'">\x3c/script>')}catch(a){if(.1>Math.random()){var E="&msg=";try{var F,G=a.toString();a.name&&-1==G.indexOf(a.name)&&(G+=": "+a.name);a.message&&-1==G.indexOf(a.message)&&(G+=": "+a.message);if(a.stack){var H=a.stack,I=G;try{-1==H.indexOf(I)&&(H=I+"\n"+H);for(var J;H!=J;)J=H,H=H.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/,"$1");G=H.replace(/\n */g,"\n")}catch(h){G=I}}F=G;F=F.substring(0,
1024);E+=encodeURIComponent(F)}catch(h){E+="extr"}document.write('<img style="display:none" src="'+(b+("dcmads-err&ver=60&context=dcm.load"+E))+'"></img>')}};})();