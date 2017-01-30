    var referer="";try{if(referer=document.referrer,"undefined"==typeof referer)throw"undefined"}catch(exception){referer=document.location.href,(""==referer||"undefined"==typeof referer)&&(referer=document.URL)}referer=referer.substr(0,700);
    var rcel = document.createElement("script");
    rcel.id = 'rc_' + Math.floor(Math.random() * 1000);
    rcel.type = 'text/javascript';
    rcel.src = "//trends.revcontent.com/serve.js.php?w=23502&t="+rcel.id+"&c="+(new Date()).getTime()+"&width="+(window.outerWidth || document.documentElement.clientWidth)+"&referer="+referer;
    rcel.async = true;
    var parent_div = document.querySelector('script[id="rc_389"]').parentNode;
    parent_div.appendChild(rcel);