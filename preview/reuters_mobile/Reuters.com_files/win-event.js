registerNamespace("Reuters.win");
Reuters.win.event={sleepTime:300,listen:function(a,b){$(document).on(encodeURI(a),function(a,d){a.type=decodeURI(a.type);b(a,d)})},fire:function(a,b){Reuters.utils.localStorageSupportFlag&&$(document).trigger(encodeURI(a),b)},fire_delay:function(a,b){$(document).trigger(encodeURI(a),b);this.sleep(this.sleepTime)},sleep:function(a){for(var b=(new Date).getTime(),c=0;c<1E7;c++)if((new Date).getTime()-b>a)break},fire_link:function(a,b,c){a.on("click",{winEvent:b,para:c},function(a){a.preventDefault();
Reuters.win.event.fire(a.data.winEvent,a.data.para);var b=$(this).attr("href");setTimeout(function(){window.location.href=b},300)})},fire_delegate_link:function(a,b,c,d){a.on("click",b,{winEvent:c,para:d},function(a){a.preventDefault();Reuters.win.event.fire(a.data.winEvent,a.data.para);var b=$(this).attr("href");setTimeout(function(){window.location.href=b},300)})},fire_delegate_link_callback:function(a,b,c){a.on("click",b,function(a){a.preventDefault();c(a);var b=$(this).attr("href");setTimeout(function(){window.location.href=
b},300)})},fire_link_callback:function(a,b){a.on("click",function(a){a.preventDefault();b(a);var d=$(this).attr("href");setTimeout(function(){window.location.href=d},300)})},fire_form:function(a,b){a.on("submit",{callback:b},Reuters.win.event._trackForm)},_trackForm:function(a){if(!a.isDefaultPrevented()){a.preventDefault();var b=a.target,c=a.data.callback;c(a);$(b).off("submit",Reuters.win.event._trackForm);setTimeout(function(){$(b).submit()},300)}}};