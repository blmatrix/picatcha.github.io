window.dv=window.dv||{};window.dv.match=window.dv.match||{};
window.dv.match.c=function(){function u(){function a(){var a=new Uint32Array(4);window.crypto.getRandomValues(a);var b=[];n(a).forEach(function(a){b.push(("00000000"+a.toString(36)).substr(-6))});return b.join("")}return window.crypto?a():(Math.random().toString(36)+"000000000000").substr(2,12)+(Math.random().toString(36)+"000000000000").substr(2,12)}function B(){var a=l&&k===g.document.body;return!window.MessageChannel||a}function C(a){var c={b:a,content:null};switch(a){case 23483290480:c.content=
p}return c}function v(a){function c(a,d){d.start();d.addEventListener("message",v,!1);-1===D.indexOf(a)&&(D.push(a),K.push(d))}function b(a){var d=new MessageChannel;c(a,d.port1);a.postMessage(C(23483290480),"*",[d.port2])}function f(a){c(a.source.parent,a.ports[0]);(a=a.data.content)&&a.a<p.a&&(p=a)}function d(a){if(-1<t.indexOf(a))a=!1;else{var d;(d=-1<q.indexOf(a))||(h===a?(q.push(a),d=!0):d=!1);a=d?!0:l||a.parent===g?!function(a){function d(a,b,e){return e(k.compareDocumentPosition(a))?(t.push(b),
!0):!1}function b(a,d){if(!n(a).filter(function(a){var b;a:{try{for(var e=d;e!==window.top;)if(e=e.parent,e===a.contentWindow){b=!0;break a}b=!1;break a}catch(c){}b=void 0}return b})[0])return!1;t.push(d);return!0}function e(a,b){var c=n(a).filter(function(a){try{return a.contentWindow===b}catch(d){}return!1})[0];if(!c)return!1;var f=b.parent===g&&!l,h=c.parentNode===k&&l;(h||f)&&t.push(b);c=d(c.parentNode,b,function(a){return(a&w||a&x)&&l});y(f,"tisf");y(h,"tise");y(c,"tisc");return h||c||f}var c=
k.querySelectorAll("iframe:not(["+r+"])"),f=g.document.querySelectorAll("iframe["+r+"]");return E||!b(c,a)&&!e(f,a)?(q.push(a),!1):!0}(a):!1}return a}if(a&&a.data&&a.data.b){var e=a.data.b;if(!d(a.source))switch(F=!0,e){case 17381297349:b(a.source.parent);break;case 23483290480:f(a)}}}function n(a){return Array.prototype.slice.call(a)}function L(a,c){Object.keys(c).forEach(function(b){a[b]=c[b]});return a}function y(a,c){if(a){var b="dvp_"+c;m[b]=m[b]?m[b]+=1:1}}function M(){function a(d){var e=[];
d!==window.top?e=d.frames:n(k.querySelectorAll("iframe:not(["+r+"])")).forEach(function(a){e.push(a.contentWindow)});d=0;for(var c=e.length;d<c&&!(50<++b);d++)e[d]!==h&&e[d].postMessage(f,"*"),0<e[d].frames.length&&a(e[d])}function c(){(function(a){var b=n(g.document.querySelectorAll("iframe[src='about:blank']["+r+"]"));b.splice(b.indexOf(a),1);return b})(z).forEach(function(a){var b=a.parentNode,c=k.compareDocumentPosition(b);(b===k||c&x||c&w)&&a.contentWindow.postMessage(f,"*")});-1===q.indexOf(h)&&
q.push(h)}var b=0,f=C(17381297349);g.addEventListener("message",v,!1);l&&(c(),h.addEventListener("message",v,!1));(function(a){for(a.postMessage(f,"*");a!==window.top;)a=a.parent,a.postMessage(f,"*")})(g);a(g)}function N(){function a(){if(!G&&(F||O)){G=!0;var a={mascid:p.a,dvp_masver:2};0<Object.keys(m).length&&(a=L(a,m));try{$dv.messages.registerMsg(window,a)}catch(c){}}}var c="dv"===$dv.dvObjType?84E4:9E4;g.addEventListener("beforeunload",a,!1);setTimeout(a,5E3);setTimeout(a,c)}var A,H,p,m={},g,
h,z,k,l,t=[],q=[],D=[],K=[],G=!1,F=!1,O=!1,I=!1,E=!1,x,w,r;this.start=function(){B()||I||(A=(new Date).getTime().toString(36),H=A+u(),p={a:H,f:A},g=window.parent,h=window,z=h.frameElement,k=z.parentNode,l=g===window.top,x=Node.DOCUMENT_POSITION_CONTAINS,w=Node.DOCUMENT_POSITION_CONTAINED_BY,r="data-dv-frm",I=!0,M(),N(),setTimeout(function(){E=!0},3E5))}};
try{(new window.dv.match.c).start()}catch(u){try{var J="//tps30.doubleverify.com/visit.jpg?ctx=818052&cmp=1619415&dvp_jsMtchErr="+encodeURIComponent(u);navigator&&navigator.sendBeacon?navigator.sendBeacon(J,{}):(new Image).src=J}catch(B){}};
