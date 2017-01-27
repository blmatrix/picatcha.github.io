function interstitial_call(){
    var referer="";try{if(referer=document.referrer,"undefined"==typeof referer)throw"undefined"}catch(exception){referer=document.location.href,(""==referer||"undefined"==typeof referer)&&(referer=document.URL)}referer=referer.substr(0,700);
    var rcel = document.createElement("script");
    rcel.id = 'rc_' + Math.floor(Math.random() * 1000);
    rcel.type = 'text/javascript';
    rcel.src = "http://trends.revcontent.com/serve.js.php?w=30095&t="+rcel.id+"&c="+(new Date()).getTime()+"&width="+(window.outerWidth || document.documentElement.clientWidth)+"&referer="+referer;
    rcel.async = true;
    var rcds = document.getElementById("rcjsload_c3195b"); rcds.appendChild(rcel);

    setTimeout(function(){ interstitial_open(); }, 3000);
}

function interstitial_open(){
    document.getElementById("interstitial_cover").style.display = 'block';
    ints_setCookie("m_ints_cookie", "1", "60");
}

function interstitial_close(){
    document.getElementById("interstitial_cover").style.display = 'none';
}

function ints_setCookie(cname, cvalue, exminute) {
    var d = new Date();
    d.setTime(d.getTime() + (exminute*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function ints_getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
var m_ints_cookie_v = ints_getCookie("m_ints_cookie");
if(!m_ints_cookie_v)interstitial_call();
//interstitial_call();