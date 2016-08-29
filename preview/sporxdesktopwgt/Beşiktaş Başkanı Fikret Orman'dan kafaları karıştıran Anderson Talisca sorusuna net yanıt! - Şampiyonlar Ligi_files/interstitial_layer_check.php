var secs = 12;
var do_not_call_admatic = true;
var call_ints = false;
function ints_kapat(){
    var div = document.getElementById("ints_div");
    div.parentNode.removeChild(div);
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
function ints_startTimer(){
    if (secs == 0) {
        ints_kapat();
    } else {
        document.getElementById("ints_timer").innerHTML = secs;
        secs = secs - 1;
        self.setTimeout("ints_startTimer()", 1000);
    }
}
var v_ints_cookie = ints_getCookie("ints_cookie");
if(!v_ints_cookie)call_ints = true;
else do_not_call_admatic = false;