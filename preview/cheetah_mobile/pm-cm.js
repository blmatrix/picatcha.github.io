!function(a){function b(a,b){if(a)return a.classList?a.classList.contains(b):!!a.className.match(new RegExp("(\\s|^)"+b+"(\\s|$)"))}function c(a,c){a&&(a.classList?a.classList.add(c):b(a,c)||(a.className+=" "+c))}a.initAdUnit=function(a,b){"medrec"===a&&b&&b.customFields&&b.customFields.style&&"native"===b.customFields.style&&c(document.querySelector("."+a),"native")}}(window.CheetahMobile=window.CheetahMobile||{});

// Load Render JS
// (function() {
//     var pmads = document.createElement('script');
//     pmads.async = true;
//     pmads.type = 'text/javascript';
//     pmads.src = '//static.adsnative.com/static/js/render.v2.js';
//     var node = document.getElementsByTagName('script')[0];
//     node.parentNode.insertBefore(pmads, node);
// })();