String.prototype.trim = function () {
    a = this.replace(/^\s+/, '');
    return a.replace(/\s+$/, '');
};
function refresh(parTypeID) {
    ScrollHelper.saveScrollCoordinates();
    if (parTypeID == 1) {
        window.location = "http://www.milliyet.com.tr/Haber/index.html?v=1";
    }
    else {
        window.location = "http://www.milliyet.com.tr/sondakika";
    }
}
function OpenPopup(pageLink, width, height, positionTop, positionLeft, parUseScrollBar) {
    popupWin = window.open(pageLink, 'myNewWin', 'menubar=1,resizable=1,width=' + width + ',height=' + height + ',top=' + positionTop + ',left=' + positionLeft + ',scrollbars=' + parUseScrollBar)
    return popupWin;
}
function IsNumeric(Component) {

    strString = Component.value;
    var strValidChars = "0123456789";
    var strChar;
    var blnResult = true;

    if (strString.length == 0) return false;


    for (i = 0; i < strString.length && blnResult == true; i++) {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1) {

            blnResult = false;
        }
    }
    return blnResult;
}
function NewWindow(Sayfa, En, Boy) {
    window.open(Sayfa, 'Baslik', "height=" + Boy + ",width=" + En + ",top=200,left=200,status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes");
}
function IsMailValid(value) {
    var x = value;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(x))
        return false;
    else
        return true;
}

function GetbyAttr(name, tag) {
    var results = new Array();
    var elems = document.getElementsByTagName("*");
    var len = elems.length;

    if (name == "class") {
        for (var i = 0; i < len; i++) {
            if (elems[i].className) {
                results.push(elems[i]);
            }
        }
        return results;
    } else if (name == "for" && document.all) {
        name = "htmlFor";
    }

    for (var i = 0; i < len; i++) {
        if (elems[i].getAttribute(name)) {
            results.push(elems[i]);
        }
    }
    return results;
}

function findPosX(obj) {
    var curleft = 0;
    if (obj.offsetParent)
        while (1) {
            curleft += obj.offsetLeft;
            if (!obj.offsetParent)
                break;
            obj = obj.offsetParent;
        }
    else if (obj.x)
        curleft += obj.x;
    return curleft;
}

function findPosY(obj) {
    var curtop = 0;
    if (obj.offsetParent)
        while (1) {
            curtop += obj.offsetTop;
            if (!obj.offsetParent)
                break;
            obj = obj.offsetParent;
        }
    else if (obj.y)
        curtop += obj.y;
    return curtop;
}
function wordwrap(parString, parCharAmount) {
    html = "";
    pointer = 0;
    index = -1;
    TotalCharAmount = parString.length;
    while (pointer < TotalCharAmount) {
        index = (parString.substring(pointer, parCharAmount + pointer)).indexOf(' ');
        if (index != -1 || parString.substring(pointer, parCharAmount + pointer).length != parCharAmount)// boşluk varsa
        {
            if (parString.substring(pointer, parCharAmount + pointer).length != parCharAmount) {
                html += parString.substring(pointer, parCharAmount + pointer);
                pointer = TotalCharAmount;
            }
            else {
                html += parString.substring(pointer, index + 1 + pointer);
                pointer = pointer + index + 1;
            }

        }
        else {
            html += "<div>";
            html += parString.substring(pointer, parCharAmount + pointer);
            html += "</div>";
            pointer = pointer + parCharAmount;
        }
    }
    return html;
}

function ModalAc(Sayfa, En, Boy) {
    window.showModalDialog(Sayfa, "", "dialogHeight:" + Boy + "px; dialogWidth:" + En + "px;help:no;scroll:yes");
}

function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}
function SetCookie(name, value) {
    var argv = SetCookie.arguments;
    var argc = SetCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value) +
	((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
	((path == null) ? "" : ("; path=" + path)) +
	((domain == null) ? "" : ("; domain=" + domain)) +
	((secure == true) ? "; secure" : "");
}
function DeleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    // This cookie is history  
    var cval = GetCookie(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}

setInterval('blinkIt()', 500)
function blinkIt() {
    if (!document.all) return;
    else {
        for (i = 0; i < document.all.tags('blink').length; i++) {
            s = document.all.tags('blink')[i];
            s.style.visibility = (s.style.visibility == 'visible') ? 'hidden' : 'visible';
        }
    }
}

function OldContainer() {

    var dt = new Date();
    var my_date = dt.getFullYear() + "/" + fixlength((dt.getMonth() + 1)) + "/" + fixlength(dt.getDate());
    var strm = 'milliyet.com.tr/';
    //var strm = "localhost:2000/";
    var loc = document.location.href;
    var givendate = loc.substring(loc.indexOf(strm) + 16, loc.indexOf(strm) + 26)
    var re1 = '\/\/(.*)\/(.*)\/(.*)\/(.*)\/spor\/$'; //2009/02/16/spor/
    var re2 = '\/\/(.*)\/(.*)\/(.*)\/(.*)\/$'; //2009/02/16/
    var re3 = '\/\/(.*)\/(.*)\/(.*)\/(.*)\/siyaset\/$'; //2009/02/16/spor/
    var re4 = '\/\/(.*)\/(.*)\/(.*)\/(.*)\/ekonomi\/$'; //2009/02/16/spor/
    var re5 = '\/\/(.*)\/(.*)\/(.*)\/(.*)\/dunya\/$'; //2009/02/16/spor/
    var re6 = '\/\/(.*)\/(.*)\/(.*)\/(.*)\/guncel\/$'; //2009/02/16/spor/
    var re7 = '\/\/(.*)\/(.*)\/(.*)\/(.*)\/yasam\/$'; //2009/02/16/spor/
    var re8 = '\/\/(.*)\/(.*)\/(.*)\/(.*)\/pazar\/index.html$'; //2009/02/16/spor/
    var re9 = '\/\/(.*)\/(.*)\/(.*)\/(.*)\/ege\/$'; //2009/02/16/spor/
    var re10 = '\/\/(.*)\/(.*)\/(.*)\/(.*)\/cumartesi\/$'; //2009/02/16/spor/
    var re11 = '\/\/(.*)\/(.*)\/(.*)\/(.*)\/index.html'; //2009/02/16/index.html
    var re12 = '\/\/(.*)\/(.*)\/(.*)\/(.*)\/indexmil.html'; //2009/02/16/indexmil.html
    if (loc.indexOf(my_date) == -1 && (loc.match(re1) || loc.match(re3) || loc.match(re4) || loc.match(re5) || loc.match(re6) || loc.match(re7) || loc.match(re11) || loc.match(re12))) {
        var dateparts = givendate.split("/");
        var givendateformatted = dateparts[2] + '.' + dateparts[1] + '.' + dateparts[0];
        var elmbody = document.getElementById('_body');
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", "/d/c/60/oldstyle.css")
        if (typeof fileref != "undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref);
        var elmcontainer = document.getElementById('_body');
        elmcontainer.innerHTML = "<div class='dayEND'><div class='endIN'><div class='left'>Şu an <strong>" + givendateformatted + "</strong> tarihli milliyet.com.tr'yi okumaktasınız.</div><div class='right'>Bugüne ait içeriğe ulaşmak için <strong><a href='http://www.milliyet.com.tr/?ref=eski'>tıklayınız</a></strong></div></div></div>" + elmcontainer.innerHTML;
    }
}
function fixlength(_this) {
    if ((_this + '').length == 1)
        return '0' + _this;
    else
        return _this;
}

var Url = {
    encode: function (string) {
        return escape(this._utf8_encode(string));
    },

    decode: function (string) {
        return this._utf8_decode(unescape(string));
    },

    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }
        return string;
    }

}

var Cookies = {
    init: function () {
        var allCookies = document.cookie.split('; ');
        for (var i = 0; i < allCookies.length; i++) {
            var cookiePair = allCookies[i].split('=');
            this[cookiePair[0]] = cookiePair[1];
        }
    },
    create: function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
        this[name] = value;
    },
    erase: function (name) {
        this.create(name, '', -1);
        this[name] = undefined;
    }
};
Cookies.init();

var ScrollHelper = {
    getScrollXY: function () {
        var scrOfX = 0, scrOfY = 0;
        if (typeof (window.pageYOffset) == 'number') {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        }
        else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        }
        else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        return [scrOfX, scrOfY];
    },
    saveScrollCoordinates: function () {
        Cookies.create("Editor.ScrollCoordinates", this.getScrollXY(), false);
        Cookies.init();
    },
    scrollToSavedCoordinates: function () {
        var scrollPositions = Cookies["Editor.ScrollCoordinates"];
        if (scrollPositions != null && scrollPositions != '') {
            var positions = scrollPositions.split(',');
            window.scrollTo(positions[0], positions[1]);
            Cookies.erase("Editor.ScrollCoordinates");
            Cookies.init();
        }
    }
}

function ChangeFinans() {
    if (document.getElementById("USD").style.display != "none") {

        document.getElementById("USD").style.display = "none";
        document.getElementById("EURO").style.display = "block";
        setTimeout('ChangeFinans()', 3000);
    }
    else {
        document.getElementById("EURO").style.display = "none";
        document.getElementById("USD").style.display = "block";
        setTimeout('ChangeFinans()', 3000);
    }
}

//Kod=USD,EUR,GOLD,XU100
function MilGraphV2(Host, container, Kod, width, height) {

    var url = "http://finans.milliyet.com.tr";
    if (Kod != "XU100")
        url = "http://finans.milliyet.com.tr/Doviz-Altin/index.html";


    $.get(Host + "d/handler/MilliyetHandler.ashx?hCase=Milgraph&Code=" + Kod.toUpperCase() + "&r=" + String(Math.random()).substr(2, 8),
    function (data) {

        $("#" + container).html("<a href=\"" + url + "\" target='_blank' ><img src=\"" + data + "\" width='" + width + "' height='" + height + "'  /></a>");
    });
}

//Kod=USD,EUR,GOLD,XU100
function MilGraphWithStatsV2(Host, container, Kod, width, height) {
    var url = "http://finans.milliyet.com.tr";
    if (Kod != "XU100")
        url = "http://finans.milliyet.com.tr/Doviz-Altin/index.html";

    $.get(Host + "d/handler/MilliyetHandler.ashx?hCase=Milgraph&Code=" + Kod.toUpperCase() + "&r=" + String(Math.random()).substr(2, 8),
    function (data) {

        $("#" + container).html("<a href=\"" + url + "\" target='_blank'><img src=\"" + data + "\" width='" + width + "' height='" + height + "'  /></a>");
    });
}

//Kod=USD,EUR,GOLD,XU100
function MilGraphV2(Host, container, Kod, width, height) {

    var url = "http://finans.milliyet.com.tr";
    var w = width || 0;
    var h = height || 0;
    if (Kod != "XU100")
        url = "http://finans.milliyet.com.tr/Doviz-Altin/index.html";


    $.get(Host + "d/handler/MilliyetHandler.ashx?hCase=Milgraph&Code=" + Kod.toUpperCase() + "&r=" + String(Math.random()).substr(2, 8),
    function (data) {

        $("#" + container).html("<a href=\"" + url + "\" target='_blank' ><img src=\"" + data + "\"  width=" + w + " /></a>");
    });
}

//Kod=USD,EUR,GOLD,XU100
function MilGraphWithStatsV2(Host, container, Kod, width, height) {
    var url = "http://finans.milliyet.com.tr";
    var w = width || 0;
    var h = height || 0;
    if (Kod != "XU100")
        url = "http://finans.milliyet.com.tr/Doviz-Altin/index.html";

    $.get(Host + "d/handler/MilliyetHandler.ashx?hCase=Milgraph&Code=" + Kod.toUpperCase() + "&r=" + String(Math.random()).substr(2, 8),
    function (data) {

        $("#" + container).html("<a href=\"" + url + "\" target='_blank'><img src=\"" + data + "\"  width=" + w + " /></a>");
    });
}


function NewWindowWithScrollBar(Sayfa, En, Boy) {
    window.open(Sayfa, 'Baslik', "height=" + Boy + ",width=" + En + ",top=200,left=200,status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes");
}