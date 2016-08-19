(function() {

    var root = this;
    var _urlParams = null;
    var _nm = {};

    root.NM = _nm;

    var widgetLookupUrl = window.location.protocol + "//www.newsmaxfeednetwork.com/CMSPages/NewsMax/NMXChanges/widget.ashx";

    if (!Object.keys) Object.keys = function(o) {
        if (o !== Object(o))
            throw new TypeError('Object.keys called on a non-object');
        var k = [],
            p;
        for (p in o)
            if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
        return k;
    };

    _nm.init = function(param) {
        var key = Object.keys(param)[0],
            val = param[key];

        param.widgetID

        var containerWidth = document.getElementById('NmWg' + val).offsetWidth,
            screenWidth = window.innerWidth,
            numAds = 0,
            apiKey = '';

        if(val === 1234) {
            if(screenWidth <= 480) {
                numAds = 4;
            } else if(screenWidth <= 720) {
                numAds = 6;
            } else if(screenWidth > 720) {
                numAds = (containerWidth <= 720) ? 8 : 10;
            }

            apiKey = 'Ypi1vILq3qiQt5aRuLC_Meg_JULNq_Re34TQhYJW';
        } else if(val === 2345) {
            if(screenWidth <= 480) {
                numAds = 8;
            } else if(screenWidth <= 720) {
                numAds = 6;
            } else if(screenWidth > 720) {
                numAds = (containerWidth <= 720) ? 8 : 10;
            }

            apiKey = '_KqFQgIsOm33tKM_DbFPi93FtUzSZG_nZQNrAHLw';
        } else if(val === 3456) {
            if(screenWidth <= 480) {
                numAds = 5;
            } else {
                numAds = 8;
            }

            apiKey = 'q9XdoqNG8Qxwv1eqdUsd2nO60m-T4IsCVWkZL35O';
        }

        _AdsNativeOpts = {
            apiKey: apiKey,
            autoPosition: true,
            numAds: numAds,
            nativeAdElementId: 'NmWg' + val
        };

        var antag = document.createElement('script');
        antag.async = true;
        antag.type = 'text/javascript';
        antag.src ='http://static.adsnative.com/static/js/render.v1.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(antag, node);
    };

    _nm.lookup_widget = function(key, val) {
        var script = document.createElement('script');
        script.src = widgetLookupUrl + "?" + key + "=" + val + "&callback=load_ados";
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    root.load_ados = function(widgetData) {

        var delayAd = false;

        if (widgetData["isBot"] && widgetData["isBot"].toLowerCase() == "true") {
            console.log("FeedNetwork: this is a bot hit");
            return;
        }

        params = widgetData["UrlParams"];
        paramString = "";
        for (var key in params) {
            if (paramString != "") {
                paramString += "&";
            }
            paramString += key + "=" + window.params[key];
        }
        paramString = "&" + paramString;

        window["widget" + widgetData["WgID"] + "urlparams"] = paramString;
        window["widget" + widgetData["WgID"] + "isDescriptionWidget"] = widgetData["WidgetType"] == "Description";
        window["widget" + widgetData["WgID"] + "linkTarget"] = widgetData["LinkTarget"];
        window["widget" + widgetData["WgID"] + "nofollow"] = widgetData["nofollow"].toLowerCase() == "true";

        var widget = document.getElementById("NmWg" + widgetData["WgID"]);
        if (!widget) {
            widget = document.getElementById("nmWidgetContainer");
        }
        div = document.createElement("div");
        div.id = "azkWidget" + widgetData["WgID"];
        widget.appendChild(div, widget);

        var widgetTemplateType = widgetData["WidgetTemplateType"];
        switch (widgetTemplateType) {
            case "Modal Widget":
                delayAd = true
                widget.style.display = 'none';
            default:
        }

        _nm.loadScript("//static.adzerk.net/ados.js", function() {
            if (!delayAd) {
                _nm.make_adzerk_call(widgetData)
            } else {
                _nm.make_delayed_adzerk_call(widgetData)
            }
        });
    }

    _nm.make_adzerk_call = function(widgetData) {
        var ados = ados || {};
        ados.isAsync = true;
        ados.writeInLine = false;

        var networkId = 9650;

        ados_add_placement(networkId, widgetData["SiteID"], "azkWidget" + widgetData["WgID"], 163).setZone(widgetData["WgZoneID"]);

        var linkZone = widgetData["FlZoneIDs"];
        for (var i = 0; i < linkZone.length; i++) {
            ados_add_placement(networkId, widgetData["SiteID"], "azk" + widgetData["WgID"] + (i + 1), 13).setZone(linkZone[i]);
        }
        keywords = widgetData["Keywords"];
        ados_keywords = keywords["PropertyDemo"] + "," + keywords["PropertyKeywords"] + "," + keywords["FeedKeywords"];

        if ((/iphone|ipod|android|ie|blackberry|fennec/).test(navigator.userAgent.toLowerCase())) {
            ados_keywords += ",mobile";
        }

        ados_setKeywords(ados_keywords);
        ados_setDomain('engine.newsmaxfeednetwork.com');
        ados_load();
    }

    _nm.make_delayed_adzerk_call = function(widgetData) {

        var old_move = 0;
        var delayedCalled = false;
        var widget = document.getElementById("NmWg" + widgetData["WgID"]);
        var cookieName = "NmWg" + widgetData["WgID"]

        if (!widget) return;

        document.documentElement.onmousemove = function(evt) {
            var new_move = evt.clientY;
            if (new_move < old_move && evt.clientY <= 15) {
                if (delayedCalled === false) {
                    _nm.make_adzerk_call(widgetData)
                    delayedCalled = true
                }

                var c = document.cookie.match('(^|;) ?' + cookieName + '=([^;]*)(;|$)');
                c = c ? c[2] : null;
                if (!c) {
                    widget.style.display = 'block';
                } else {
                    widget.style.display = 'none';
                }
            }
            old_move = new_move;
        };

        widget.onclick = function(evt) {
            if (!evt.target.hasAttribute('href')) {
                widget.style.display = 'none';

                var d = new Date;
                d.setTime(d.getTime() + 60 * 60 * 1000);
                document.cookie = cookieName + "=true;path=/;expires=" + d.toGMTString();
            }
        };

    }

    _nm.loadScript = function(url, callback) {
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.src = url;
        var done = false;
        script.onload = script.onreadystatechange = function() {
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) { done = true;
                callback();
                script.onload = script.onreadystatechange = null;
                head.removeChild(script); } };
        head.appendChild(script);
    }

    _nm.insertAfter = function(newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastchild == targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    }

    _nm.addDescriptionToLink = function(element) {
        if (element.getElementsByTagName("a")[0]) {
            link = element.getElementsByTagName("a")[0];
            newlink = document.createElement("a");
            newlink.href = link.href;
            newlink.setAttribute("rel", "nofollow");
            newlink.setAttribute("target", "_top");
            if (element.getElementsByTagName("a")[1]) {
                link2 = element.getElementsByTagName("a")[1];
                newlink.innerHTML = '<p>' + link2.title + '</p>';
                if (newlink.innerHTML != "<p></p>")
                    _nm.insertAfter(newlink, link2);
                _nm.insertAfter(document.createElement('br'), link2);
            } else {
                newlink.innerHTML = link.title;
                _nm.insertAfter(newlink, link);
            }
        } else {
            return setTimeout((function() {
                return addDescriptionToLink(element);
            }), 100);
        }
    }

    root.updateLink = function(element, target, isNofollow) {
        if (element && element.getElementsByTagName("a")[0]) {
            as = element.getElementsByTagName("a");
            for (i = 0; i < as.length; i++) {
                if (isNofollow) {
                    as[i].rel = "nofollow";
                }
                as[i].target = target;

                if (_urlParams) {
                    var userParams = '&' + Object.keys(_urlParams).map(function(k) {
                        return encodeURIComponent(k) + '=' + encodeURIComponent(_urlParams[k])
                    }).join('&');

                    as[i].href = as[i].href + userParams
                }
            }
        } else {
            return setTimeout((function() {
                return root.updateLink(element, target, isNofollow);
            }), 100);
        }
    }

    root.loadWidgetParams = function(element, params) {
        if (element && element.getElementsByTagName("a")[0]) {
            link = element.getElementsByTagName("a")[0];
            link.href = link.href + params;
            if (element.getElementsByTagName("a")[1]) {
                link2 = element.getElementsByTagName("a")[1];
                link2.href = link2.href + params
            }
        } else {
            return setTimeout((function() {
                return root.loadWidgetParams(element, params);
            }), 100);
        }
    }

    if (root.NMClientInit != undefined) {
        root.NMClientInit();
    }

    window._comscore = window._comscore || [];
    window._comscore.push({ c1: "7", c2: "9248945", c3: "100000" });
    (function() {
        var s = document.createElement("script"),
            el = document.getElementsByTagName("script")[0];
        s.async = true;
        s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
        el.parentNode.insertBefore(s, el);
    })();

})();
