/*!
Waypoints Inview Shortcut - 3.1.1
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/

(function(){"use strict";function e(){}function n(e){this.options=t.Adapter.extend({},n.defaults,e),this.axis=this.options.horizontal?"horizontal":"vertical",this.waypoints=[],this.createWaypoints()}var t=window.Waypoint;n.prototype.createWaypoints=function(){var e={vertical:[{down:"enter",up:"exited",offset:"100%"},{down:"entered",up:"exit",offset:"bottom-in-view"},{down:"exit",up:"entered",offset:-1},{down:"exited",up:"enter",offset:function(){return-this.adapter.outerHeight()}}],horizontal:[{right:"enter",left:"exited",offset:"100%"},{right:"entered",left:"exit",offset:"right-in-view"},{right:"exit",left:"entered",offset:0},{right:"exited",left:"enter",offset:function(){return-this.adapter.outerWidth()}}]};for(var t=0,n=e[this.axis].length;t<n;t++){var r=e[this.axis][t];this.createWaypoint(r)}},n.prototype.createWaypoint=function(e){var n=this;this.waypoints.push(new t({element:this.options.element,handler:function(e){return function(t){n.options[e[t]].call(this,t)}}(e),offset:e.offset,horizontal:this.options.horizontal}))},n.prototype.destroy=function(){for(var e=0,t=this.waypoints.length;e<t;e++)this.waypoints[e].destroy();this.waypoints=[]},n.defaults={enter:e,entered:e,exit:e,exited:e},t.Inview=n})()