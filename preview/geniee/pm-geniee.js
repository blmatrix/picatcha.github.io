var adsnativetag = adsnativetag || {};
adsnativetag.cmdQ = adsnativetag.cmdQ || [];

(function(PmGeniee) {

    var integration_version = 0.1,
        debug = false;

    // Public Methods
    PmGeniee.initPolymorph = function() {
        insertRenderJs();
    }

    PmGeniee.adRendered = function(adsnativeTag, adObject) {
        setTimeout(function() {
            if (adObject.length) {
                if (adObject[0].customFields && adObject[0].customFields.font_color) {
                    var widgetHeaderTitle = document.querySelectorAll('.widgetHeaderTitle');
                    for (var i = 0; i < widgetHeaderTitle.length; i++) {
                        widgetHeaderTitle[0].style.color = adObject[0].customFields.font_color;
                    }
                    var widgetItemTitle = document.querySelectorAll('.widgetItemTitle');
                    for (var i = 0; i < widgetItemTitle.length; i++) {
                        widgetItemTitle[i].style.color = adObject[0].customFields.font_color;
                    }
                }
            }
        }, 500);
    }

    function trackCustomAction(element, actionPixel, callback) {
        if (element) {
            element.addEventListener("click", function(e) {
                e.stopPropagation();
                // Track custom action
                if (actionPixel) {
                    var pxl = document.createElement('img');
                    pxl.src = actionPixel;
                    pxl.width = pxl.height = 0;
                    document.body.appendChild(pxl);
                    callback();
                }
            });
        }
    }

    function insertRenderJs() {
        var antag = document.createElement('script');
        antag.type = 'text/javascript';
        antag.src = '//static.adsnative.com/static/js/render.v2.js';

        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(antag, node);

        Genieelog('RenderJS invoked');
    };

    function Genieelog(msg, value) {
        if (debug && typeof console !== 'undefined') {
            if (!value) {
                console.log(msg);
            } else {
                console.log(msg, value);
            }
        }
    };

    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    if (getParameterByName('polymorph_debug', document.referrer)) {
        debug = true;
        Genieelog('Loaded pm-geniee.js version : ', integration_version);
    }


}(window.PmGeniee = window.PmGeniee || {}));