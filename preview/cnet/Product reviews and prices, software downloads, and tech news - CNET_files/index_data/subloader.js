(function(g){var k=g.FT,e=function(a){if(window.myFT&&window.myFT instanceof window.FT)return window.myFT;for(var c in a)if(a[c]instanceof window.FT)return a[c]}(g);if(e){e.subload=function(a,c){d[a]&&m(d[a],a,c)};g=function(){for(var a=f.length,c=0,b=[];a--;)for(b=f[a].className.split(" "),c=b.length;c--;)d[b[c]]=d[b[c]]||[],d[b[c]].push({element:f[a],a:p(f[a])});e.addEventListener("instantads",function(a){var b,c;for(b in d)for(c=d[b].length;c--;)""!==d[b][c].a&&(d[b][c].element.getAttribute("data-src")?
d[b][c].element.setAttribute("data-src",a[d[b][c].a]):d[b][c].element.getAttribute("data-bg")&&d[b][c].element.setAttribute("data-bg",a[d[b][c].a]));e.subload("FT_dynamicLoad");e.subload("FT_instantLoad")});e.addEventListener("politeload",function(){e.subload("FT_politeLoad")});e.addEventListener("expand",function(){e.subload("FT_richLoad")})};var p=function(a){var c=a.getAttribute("data-src");a=a.getAttribute("data-bg");var b;if(b=c||a)a:{b=e.getManifest("instantAds")||[];for(var d=b.length;d--;)if("image"===
b[d].type&&(c===b[d].name||a===b[d].name)){b=!0;break a}b=void 0}return b?c||a:""},f=document.querySelectorAll("img[data-src],*[data-bg]"),m=function(a,c,b){function d(){n+=1;n===m&&(e.dispatchEvent("subload",c),"function"===typeof b&&b(c))}function g(b,c){var a=b.element,f=a.getAttribute("data-src"),l=a.getAttribute("data-bg"),h=null;""!==b.a&&!1===e.instantAdsLoaded?e.addEventListener("instantads",function(){g(b,c)}):a.src||f?a.src&&!f?d():(k.listen(a,"load",function(){a.removeAttribute("data-src");
d()}),k.listen(a,"error",function(){a.removeAttribute("data-src");d()}),a.src||(a.src=a.getAttribute("data-src"))):""===a.style.backgroundImage||l?(h=new Image,k.listen(h,"load",function(){a.removeAttribute("data-bg");a.style.backgroundImage="url("+l+")";h=null;d()}),k.listen(h,"error",function(){a.removeAttribute("data-bg");a.style.backgroundImage="url("+l+")";h=null;d()}),0>a.style.backgroundImage.indexOf(l)&&(h.src=l)):d()}for(var f=a.length,m=f,n=0;f--;)g(a[f],f)},d={};e.getManifest("filename")?
g():k.addEventListener("manifest",g)}})(window);