function dv_rolloutManager(handlersDefsArray, baseHandler) {
    this.handle = function () {
        var errorsArr = [];

        var handler = chooseEvaluationHandler(handlersDefsArray);
        if (handler) {
            var errorObj = handleSpecificHandler(handler);
            if (errorObj === null) {
                return errorsArr;
            }
            else {
                var debugInfo = handler.onFailure();
                if (debugInfo) {
                    for (var key in debugInfo) {
                        if (debugInfo.hasOwnProperty(key)) {
                            if (debugInfo[key] !== undefined || debugInfo[key] !== null) {
                                errorObj[key] = encodeURIComponent(debugInfo[key]);
                            }
                        }
                    }
                }
                errorsArr.push(errorObj);
            }
        }

        var errorObjHandler = handleSpecificHandler(baseHandler);
        if (errorObjHandler) {
            errorObjHandler['dvp_isLostImp'] = 1;
            errorsArr.push(errorObjHandler);
        }
        return errorsArr;
    };

    function handleSpecificHandler(handler) {
        var request;
        var errorObj = null;

        try {
            request = handler.createRequest();
            if (request && !request.isSev1) {
                var url = request.url || request;
                if (url) {
                    if (!handler.sendRequest(url)) {
                        errorObj = createAndGetError('sendRequest failed.',
                            url,
                            handler.getVersion(),
                            handler.getVersionParamName(),
                            handler.dv_script);
                    }
                } else {
                    errorObj = createAndGetError('createRequest failed.',
                        url,
                        handler.getVersion(),
                        handler.getVersionParamName(),
                        handler.dv_script,
                        handler.dvScripts,
                        handler.dvStep,
                        handler.dvOther
                    );
                }
            }
        }
        catch (e) {
            errorObj = createAndGetError(e.name + ': ' + e.message, request ? (request.url || request) : null, handler.getVersion(), handler.getVersionParamName(), (handler ? handler.dv_script : null));
        }

        return errorObj;
    }

    function createAndGetError(error, url, ver, versionParamName, dv_script, dvScripts, dvStep, dvOther) {
        var errorObj = {};
        errorObj[versionParamName] = ver;
        errorObj['dvp_jsErrMsg'] = encodeURIComponent(error);
        if (dv_script && dv_script.parentElement && dv_script.parentElement.tagName && dv_script.parentElement.tagName == 'HEAD') {
            errorObj['dvp_isOnHead'] = '1';
        }
        if (url) {
            errorObj['dvp_jsErrUrl'] = url;
        }
        if (dvScripts) {
            var dvScriptsResult = '';
            for (var id in dvScripts) {
                if (dvScripts[id] && dvScripts[id].src) {
                    dvScriptsResult += encodeURIComponent(dvScripts[id].src) + ":" + dvScripts[id].isContain + ",";
                }
            }
            
            
            
        }
        return errorObj;
    }

    function chooseEvaluationHandler(handlersArray) {
        var config = window._dv_win.dv_config;
        var index = 0;
        var isEvaluationVersionChosen = false;
        if (config.handlerVersionSpecific) {
            for (var i = 0; i < handlersArray.length; i++) {
                if (handlersArray[i].handler.getVersion() == config.handlerVersionSpecific) {
                    isEvaluationVersionChosen = true;
                    index = i;
                    break;
                }
            }
        }
        else if (config.handlerVersionByTimeIntervalMinutes) {
            var date = config.handlerVersionByTimeInputDate || new Date();
            var hour = date.getUTCHours();
            var minutes = date.getUTCMinutes();
            index = Math.floor(((hour * 60) + minutes) / config.handlerVersionByTimeIntervalMinutes) % (handlersArray.length + 1);
            if (index != handlersArray.length) { 
                isEvaluationVersionChosen = true;
            }
        }
        else {
            var rand = config.handlerVersionRandom || (Math.random() * 100);
            for (var i = 0; i < handlersArray.length; i++) {
                if (rand >= handlersArray[i].minRate && rand < handlersArray[i].maxRate) {
                    isEvaluationVersionChosen = true;
                    index = i;
                    break;
                }
            }
        }

        if (isEvaluationVersionChosen == true && handlersArray[index].handler.isApplicable()) {
            return handlersArray[index].handler;
        }
        else {
            return null;
        }
    }
}

function dv_GetParam(url, name, checkFromStart) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = (checkFromStart ? "(?:\\?|&|^)" : "[\\?&]") + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results == null)
        return null;
    else
        return results[1];
}

function dv_SendErrorImp(serverUrl, errorsArr) {
    for (var j = 0; j < errorsArr.length; j++) {
        var errorQueryString = '';
        var errorObj = errorsArr[j];
        for (key in errorObj) {
            if (errorObj.hasOwnProperty(key)) {
                if (key.indexOf('dvp_jsErrUrl') == -1) {
                    errorQueryString += '&' + key + '=' + errorObj[key];
                }
                else {
                    var params = ['ctx', 'cmp', 'plc', 'sid'];
                    for (var i = 0; i < params.length; i++) {
                        var pvalue = dv_GetParam(errorObj[key], params[i]);
                        if (pvalue) {
                            errorQueryString += '&dvp_js' + params[i] + '=' + pvalue;
                        }
                    }
                }
            }
        }

        var windowProtocol = 'https:';
        var sslFlag = '&ssl=1';

        var errorImp = windowProtocol + '//' + serverUrl + sslFlag + errorQueryString;
        dv_sendRequest(errorImp);
    }
}

function dv_sendRequest(url) {
    document.write('<scr' + 'ipt language="javascript" src="' + url + '"></scr' + 'ipt>');
}

function dv_GetRnd() {
    return ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 16);
}

function doesBrowserSupportHTML5Push() {
    "use strict";
    return typeof window.parent.postMessage === 'function' && window.JSON;
}

function dvBsrType() {
    'use strict';
    var that = this;
    var eventsForDispatch = {};

    this.pubSub = new function () {

        var subscribers = [];

        this.subscribe = function (eventName, uid, actionName, func) {
            if (!subscribers[eventName + uid])
                subscribers[eventName + uid] = [];
            subscribers[eventName + uid].push({Func: func, ActionName: actionName});
        };

        this.publish = function (eventName, uid) {
            var actionsResults = [];
            if (eventName && uid && subscribers[eventName + uid] instanceof Array)
                for (var i = 0; i < subscribers[eventName + uid].length; i++) {
                    var funcObject = subscribers[eventName + uid][i];
                    if (funcObject && funcObject.Func && typeof funcObject.Func == "function" && funcObject.ActionName) {
                        var isSucceeded = runSafely(function () {
                            return funcObject.Func(uid);
                        });
                        actionsResults.push(encodeURIComponent(funcObject.ActionName) + '=' + (isSucceeded ? '1' : '0'));
                    }
                }
            return actionsResults.join('&');
        };
    };

    this.domUtilities = new function () {
        this.addImage = function (url, parentElement) {
            var image = parentElement.ownerDocument.createElement("img");
            image.width = 0;
            image.height = 0;
            image.style.display = 'none';
            image.src = appendCacheBuster(url);
            parentElement.insertBefore(image, parentElement.firstChild);
        };

        this.addScriptResource = function (url, parentElement) {
            var scriptElem = parentElement.ownerDocument.createElement("script");
            scriptElem.type = 'text/javascript';
            scriptElem.src = appendCacheBuster(url);
            parentElement.insertBefore(scriptElem, parentElement.firstChild);
        };

        this.addScriptCode = function (srcCode, parentElement) {
            var scriptElem = parentElement.ownerDocument.createElement("script");
            scriptElem.type = 'text/javascript';
            scriptElem.innerHTML = srcCode;
            parentElement.insertBefore(scriptElem, parentElement.firstChild);
        };

        this.addHtml = function (srcHtml, parentElement) {
            var divElem = parentElement.ownerDocument.createElement("div");
            divElem.style = "display: inline";
            divElem.innerHTML = srcHtml;
            parentElement.insertBefore(divElem, parentElement.firstChild);
        };
    };

    this.resolveMacros = function (str, tag) {
        var viewabilityData = tag.getViewabilityData();
        var viewabilityBuckets = viewabilityData && viewabilityData.buckets ? viewabilityData.buckets : {};
        var upperCaseObj = objectsToUpperCase(tag, viewabilityData, viewabilityBuckets);
        var newStr = str.replace('[DV_PROTOCOL]', upperCaseObj.DV_PROTOCOL);
        newStr = newStr.replace('[PROTOCOL]', upperCaseObj.PROTOCOL);
        newStr = newStr.replace(/\[(.*?)\]/g, function (match, p1) {
            var value = upperCaseObj[p1];
            if (value === undefined || value === null)
                value = '[' + p1 + ']';
            return encodeURIComponent(value);
        });
        return newStr;
    };

    this.settings = new function () {
    };

    this.tagsType = function () {
    };

    this.tagsPrototype = function () {
        this.add = function (tagKey, obj) {
            if (!that.tags[tagKey])
                that.tags[tagKey] = new that.tag();
            for (var key in obj)
                that.tags[tagKey][key] = obj[key];
        };
    };

    this.tagsType.prototype = new this.tagsPrototype();
    this.tagsType.prototype.constructor = this.tags;
    this.tags = new this.tagsType();

    this.tag = function () {
    };

    this.tagPrototype = function () {
        this.set = function (obj) {
            for (var key in obj)
                this[key] = obj[key];
        };

        this.getViewabilityData = function () {
        };
    };

    this.tag.prototype = new this.tagPrototype();
    this.tag.prototype.constructor = this.tag;

    this.getTagObjectByService = function (serviceName) {
        for (var impressionId in this.tags) {
            if (typeof this.tags[impressionId] === 'object'
                && this.tags[impressionId].services
                && this.tags[impressionId].services[serviceName]
                && !this.tags[impressionId].services[serviceName].isProcessed) {
                this.tags[impressionId].services[serviceName].isProcessed = true;
                return this.tags[impressionId];
            }
        }

        return null;
    };

    this.addService = function (impressionId, serviceName, paramsObject) {
        if (!impressionId || !serviceName)
            return;

        if (!this.tags[impressionId])
            return;
        else {
            if (!this.tags[impressionId].services)
                this.tags[impressionId].services = {};

            this.tags[impressionId].services[serviceName] = {
                params: paramsObject,
                isProcessed: false
            };
        }
    };

    this.Enums = {
        BrowserId: {Others: 0, IE: 1, Firefox: 2, Chrome: 3, Opera: 4, Safari: 5},
        TrafficScenario: {OnPage: 1, SameDomain: 2, CrossDomain: 128}
    };

    this.CommonData = {};

    var runSafely = function (action) {
        try {
            var ret = action();
            return ret !== undefined ? ret : true;
        } catch (e) {
            return false;
        }
    };

    var objectsToUpperCase = function () {
        var upperCaseObj = {};
        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    upperCaseObj[key.toUpperCase()] = obj[key];
                }
            }
        }
        return upperCaseObj;
    };

    var appendCacheBuster = function (url) {
        if (url !== undefined && url !== null && url.match("^http") == "http") {
            if (url.indexOf('?') !== -1) {
                if (url.slice(-1) == '&')
                    url += 'cbust=' + dv_GetRnd();
                else
                    url += '&cbust=' + dv_GetRnd();
            }
            else
                url += '?cbust=' + dv_GetRnd();
        }
        return url;
    };

    
    var messagesClass = function () {
        var waitingMessages = [];

        this.registerMsg = function(dvFrame, data) {
            if (!waitingMessages[dvFrame.$frmId]) {
                waitingMessages[dvFrame.$frmId] = [];
            }

            waitingMessages[dvFrame.$frmId].push(data);

            if (dvFrame.$uid) {
                sendWaitingEventsForFrame(dvFrame, dvFrame.$uid);
            }
        };

        this.startSendingEvents = function(dvFrame, impID) {
            sendWaitingEventsForFrame(dvFrame, impID);
            
        };

        function sendWaitingEventsForFrame(dvFrame, impID) {
            if (waitingMessages[dvFrame.$frmId]) {
                var eventObject = {};
                for (var i = 0; i < waitingMessages[dvFrame.$frmId].length; i++) {
                    var obj = waitingMessages[dvFrame.$frmId].pop();
                    for (var key in obj) {
                        if (typeof obj[key] !== 'function' && obj.hasOwnProperty(key)) {
                            eventObject[key] = obj[key];
                        }
                    }
                }
                that.registerEventCall(impID, eventObject);
            }
        }

        function startMessageManager() {
            for (var frm in waitingMessages) {
                if (frm && frm.$uid) {
                    sendWaitingEventsForFrame(frm, frm.$uid);
                }
            }
            setTimeout(startMessageManager, 10);
        }
    };
    this.messages = new messagesClass();

    this.dispatchRegisteredEventsFromAllTags = function () {
        for (var impressionId in this.tags) {
            if (typeof this.tags[impressionId] !== 'function' && typeof this.tags[impressionId] !== 'undefined')
                dispatchEventCalls(impressionId, this);
        }
    };

    var dispatchEventCalls = function (impressionId, dvObj) {
        var tag = dvObj.tags[impressionId];
        var eventObj = eventsForDispatch[impressionId];
        if (typeof eventObj !== 'undefined' && eventObj != null) {
            var url = tag.protocol + '//' + tag.ServerPublicDns + "/bsevent.gif?impid=" + impressionId + '&' + createQueryStringParams(eventObj);
            dvObj.domUtilities.addImage(url, tag.tagElement.parentElement);
            eventsForDispatch[impressionId] = null;
        }
    };

    this.registerEventCall = function (impressionId, eventObject, timeoutMs) {
        addEventCallForDispatch(impressionId, eventObject);

        if (typeof timeoutMs === 'undefined' || timeoutMs == 0 || isNaN(timeoutMs))
            dispatchEventCallsNow(this, impressionId, eventObject);
        else {
            if (timeoutMs > 2000)
                timeoutMs = 2000;

            var dvObj = this;
            setTimeout(function () {
                dispatchEventCalls(impressionId, dvObj);
            }, timeoutMs);
        }
    };

    var dispatchEventCallsNow = function (dvObj, impressionId, eventObject) {
        addEventCallForDispatch(impressionId, eventObject);
        dispatchEventCalls(impressionId, dvObj);
    };

    var addEventCallForDispatch = function (impressionId, eventObject) {
        for (var key in eventObject) {
            if (typeof eventObject[key] !== 'function' && eventObject.hasOwnProperty(key)) {
                if (!eventsForDispatch[impressionId])
                    eventsForDispatch[impressionId] = {};
                eventsForDispatch[impressionId][key] = eventObject[key];
            }
        }
    };

    if (window.addEventListener) {
        window.addEventListener('unload', function () {
            that.dispatchRegisteredEventsFromAllTags();
        }, false);
        window.addEventListener('beforeunload', function () {
            that.dispatchRegisteredEventsFromAllTags();
        }, false);
    }
    else if (window.attachEvent) {
        window.attachEvent('onunload', function () {
            that.dispatchRegisteredEventsFromAllTags();
        }, false);
        window.attachEvent('onbeforeunload', function () {
            that.dispatchRegisteredEventsFromAllTags();
        }, false);
    }
    else {
        window.document.body.onunload = function () {
            that.dispatchRegisteredEventsFromAllTags();
        };
        window.document.body.onbeforeunload = function () {
            that.dispatchRegisteredEventsFromAllTags();
        };
    }

    var createQueryStringParams = function (values) {
        var params = '';
        for (var key in values) {
            if (typeof values[key] !== 'function') {
                var value = encodeURIComponent(values[key]);
                if (params === '')
                    params += key + '=' + value;
                else
                    params += '&' + key + '=' + value;
            }
        }

        return params;
    };
}

function dv_baseHandler(){function M(){var c="http:";"https"==window._dv_win.location.toString().match("^https")&&(c="https:");return c}function A(c){var a=window._dv_win.dvRecoveryObj;if(a){var b=dv_GetParam(c.dvparams,"ctx",!0),a=a[b]?a[b].RecoveryTagID:a._fallback_?a._fallback_.RecoveryTagID:1;1===a&&c.tagsrc?document.write(c.tagsrc):2===a&&c.altsrc&&document.write(c.altsrc);return!0}return!1}function N(){var c;c=!window._dv_win.dv_config||!window._dv_win.dv_config.isUT?window._dv_win.bsredirect5ScriptsInternal.pop():
window._dv_win.bsredirect5ScriptsInternal[window._dv_win.bsredirect5ScriptsInternal.length-1];window._dv_win.bsredirect5Processed.push(c);return c}function O(c,a){var b=document.createElement("iframe");b.name=b.id="iframe_"+dv_GetRnd();b.width=0;b.height=0;b.id=a;b.style.display="none";b.src=c;return b}function G(c,a,b){var b=b||150,d=window._dv_win||window;if(d.document&&d.document.body)return a&&a.parentNode?a.parentNode.insertBefore(c,a):d.document.body.insertBefore(c,d.document.body.firstChild),
!0;if(0<b)setTimeout(function(){G(c,a,--b)},20);else return!1}function H(c){var a=null;try{if(a=c&&c.contentDocument)return a}catch(b){}try{if(a=c.contentWindow&&c.contentWindow.document)return a}catch(d){}try{if(a=window._dv_win.frames&&window._dv_win.frames[c.name]&&window._dv_win.frames[c.name].document)return a}catch(g){}return null}function I(c,a,b,d,g,e,p){var f,k;f=window._dv_win.dv_config&&window._dv_win.dv_config.bst2tid?window._dv_win.dv_config.bst2tid:dv_GetRnd();var i,m=window.parent.postMessage&&
window.JSON;k=!0;var q=!1;if("0"==dv_GetParam(c.dvparams,"t2te")||window._dv_win.dv_config&&!0==window._dv_win.dv_config.supressT2T)q=!0;if(m&&!1==q)try{q="https://cdn3.doubleverify.com/bst2tv3.html",window._dv_win&&(window._dv_win.dv_config&&window._dv_win.dv_config.bst2turl)&&(q=window._dv_win.dv_config.bst2turl),i=O(q,"bst2t_"+f),k=G(i)}catch(I){}var x,P=(x=(/iPhone|iPad|iPod|\(Apple TV|iOS|Coremedia|CFNetwork\/.*Darwin/i.test(navigator.userAgent)||navigator.vendor&&"apple, inc."===navigator.vendor.toLowerCase())&&
!window.MSStream)?"https:":M(),Q="0";"https:"==P&&(Q="1");i=c.rand;var R="__verify_callback_"+i,S="__tagObject_callback_"+i;window[R]=function(a){try{if(void 0==a.ResultID)document.write(1!=a?c.tagsrc:c.altsrc);else switch(a.ResultID){case 1:a.Passback?document.write(decodeURIComponent(a.Passback)):document.write(c.altsrc);break;case 2:case 3:document.write(c.tagsrc)}}catch(b){}};var A=x?"https:":M();x?i="https:":(i="http:","https"==p.src.match("^https")&&"https"==window._dv_win.location.toString().match("^https")&&
(i="https:"));var T=i,U="0";"https:"===T&&(U="1");var J=window._dv_win.document.visibilityState;window[S]=function(a){try{var b={};b.protocol=A;b.ssl=U;b.dv_protocol=T;b.serverPublicDns=a.ServerPublicDns;b.ServerPublicDns=a.ServerPublicDns;b.tagElement=p;b.redirect=c;b.impressionId=a.ImpressionID;window._dv_win.$dvbsr.tags.add(a.ImpressionID,b);if(p.dvFrmWin){var d=window._dv_win.$dvbsr;p.dvFrmWin.$uid=a.ImpressionID;d.messages&&d.messages.startSendingEvents&&d.messages.startSendingEvents(p.dvFrmWin,
a.ImpressionID)}var e=function(){var b=window._dv_win.document.visibilityState;"prerender"===J&&("prerender"!==b&&"unloaded"!==b)&&(J=b,window._dv_win.$dvbsr.registerEventCall(a.ImpressionID,{prndr:0}),window._dv_win.document.removeEventListener(f,e))};if("prerender"===J)if("prerender"!==window._dv_win.document.visibilityState&&"unloaded"!==visibilityStateLocal)window._dv_win.$dvbsr.registerEventCall(a.ImpressionID,{prndr:0});else{var f;"undefined"!==typeof window._dv_win.document.hidden?f="visibilitychange":
"undefined"!==typeof window._dv_win.document.mozHidden?f="mozvisibilitychange":"undefined"!==typeof window._dv_win.document.msHidden?f="msvisibilitychange":"undefined"!==typeof window._dv_win.document.webkitHidden&&(f="webkitvisibilitychange");window._dv_win.document.addEventListener(f,e,!1)}}catch(g){}};void 0==c.dvregion&&(c.dvregion=0);var K="",q=i="";try{for(var l=b,h=0;10>h&&l!=window.top;)h++,l=l.parent;b.depth=h;dv_additionalUrl=W(b);i="&aUrl="+encodeURIComponent(dv_additionalUrl.url);q="&aUrlD="+
dv_additionalUrl.depth;K=b.depth+d;g&&b.depth--}catch(N){q=i=K=b.depth=""}void 0!=c.aUrl&&(i="&aUrl="+c.aUrl);var B;d=function(){try{return!!window.sessionStorage}catch(a){return!0}};g=function(){try{return!!window.localStorage}catch(a){return!0}};l=function(){var a=document.createElement("canvas");if(a.getContext&&a.getContext("2d")){var b=a.getContext("2d");b.textBaseline="top";b.font="14px 'Arial'";b.textBaseline="alphabetic";b.fillStyle="#f60";b.fillRect(0,0,62,20);b.fillStyle="#069";b.fillText("!image!",
2,15);b.fillStyle="rgba(102, 204, 0, 0.7)";b.fillText("!image!",4,17);return a.toDataURL()}return null};try{h=[];h.push(["lang",navigator.language||navigator.browserLanguage]);h.push(["tz",(new Date).getTimezoneOffset()]);h.push(["hss",d()?"1":"0"]);h.push(["hls",g()?"1":"0"]);h.push(["odb",typeof window.openDatabase||""]);h.push(["cpu",navigator.cpuClass||""]);h.push(["pf",navigator.platform||""]);h.push(["dnt",navigator.doNotTrack||""]);h.push(["canv",l()]);var n=h.join("=!!!=");if(null==n||""==
n)B="";else{for(var d=function(a){for(var b="",c,d=7;0<=d;d--)c=a>>>4*d&15,b+=c.toString(16);return b},g=[1518500249,1859775393,2400959708,3395469782],n=n+String.fromCharCode(128),v=Math.ceil((n.length/4+2)/16),w=Array(v),l=0;l<v;l++){w[l]=Array(16);for(h=0;16>h;h++)w[l][h]=n.charCodeAt(64*l+4*h)<<24|n.charCodeAt(64*l+4*h+1)<<16|n.charCodeAt(64*l+4*h+2)<<8|n.charCodeAt(64*l+4*h+3)}w[v-1][14]=8*(n.length-1)/Math.pow(2,32);w[v-1][14]=Math.floor(w[v-1][14]);w[v-1][15]=8*(n.length-1)&4294967295;for(var n=
1732584193,h=4023233417,C=2562383102,D=271733878,E=3285377520,r=Array(80),y,s,t,u,F,l=0;l<v;l++){for(var j=0;16>j;j++)r[j]=w[l][j];for(j=16;80>j;j++)r[j]=(r[j-3]^r[j-8]^r[j-14]^r[j-16])<<1|(r[j-3]^r[j-8]^r[j-14]^r[j-16])>>>31;y=n;s=h;t=C;u=D;F=E;for(j=0;80>j;j++){var V=Math.floor(j/20),H=y<<5|y>>>27,z;c:{switch(V){case 0:z=s&t^~s&u;break c;case 1:z=s^t^u;break c;case 2:z=s&t^s&u^t&u;break c;case 3:z=s^t^u;break c}z=void 0}var X=H+z+F+g[V]+r[j]&4294967295;F=u;u=t;t=s<<30|s>>>2;s=y;y=X}n=n+y&4294967295;
h=h+s&4294967295;C=C+t&4294967295;D=D+u&4294967295;E=E+F&4294967295}B=d(n)+d(h)+d(C)+d(D)+d(E)}}catch($){B=null}b=(window._dv_win&&window._dv_win.dv_config&&window._dv_win.dv_config.verifyJSCURL?dvConfig.verifyJSCURL+"?":P+"//rtb"+c.dvregion+".doubleverify.com/verifyc.js?")+c.dvparams+"&num=5&srcurlD="+b.depth+"&callback="+R+"&jsTagObjCallback="+S+"&ssl="+Q+(x?"&dvf=0":"")+"&refD="+K+"&htmlmsging="+(m?"1":"0")+"&guid="+f+(null!=B?"&aadid="+B:"");a="dv_url="+encodeURIComponent(a);if(!1==k||e)b=b+("&dvp_isBodyExistOnLoad="+
(k?"1":"0"))+("&dvp_isOnHead="+(e?"1":"0"));if((e=window[L("=@42E:@?")][L("2?46DE@C~C:8:?D")])&&0<e.length){k=[];k[0]=window.location.protocol+"//"+window.location.hostname;for(f=0;f<e.length;f++)k[f+1]=e[f];e=k.reverse().join(",")}else e=null;e&&(a+="&ancChain="+encodeURIComponent(e));if(!1==/MSIE (\d+\.\d+);/.test(navigator.userAgent)||7<new Number(RegExp.$1)||2E3>=i.length+q.length+b.length)b+=q,a+=i;if(void 0!=window._dv_win.$dvbsr.CommonData.BrowserId&&void 0!=window._dv_win.$dvbsr.CommonData.BrowserVersion&&
void 0!=window._dv_win.$dvbsr.CommonData.BrowserIdFromUserAgent)f=window._dv_win.$dvbsr.CommonData.BrowserId,k=window._dv_win.$dvbsr.CommonData.BrowserVersion,e=window._dv_win.$dvbsr.CommonData.BrowserIdFromUserAgent;else{f=[{id:4,brRegex:"OPR|Opera",verRegex:"(OPR/|Version/)"},{id:1,brRegex:"MSIE|Trident/7.*rv:11|rv:11.*Trident/7|Edge/",verRegex:"(MSIE |rv:| Edge/)"},{id:2,brRegex:"Firefox",verRegex:"Firefox/"},{id:0,brRegex:"Mozilla.*Android.*AppleWebKit(?!.*Chrome.*)|Linux.*Android.*AppleWebKit.* Version/.*Chrome",
verRegex:null},{id:0,brRegex:"AOL/.*AOLBuild/|AOLBuild/.*AOL/|Puffin|Maxthon|Valve|Silk|PLAYSTATION|PlayStation|Nintendo|wOSBrowser",verRegex:null},{id:3,brRegex:"Chrome",verRegex:"Chrome/"},{id:5,brRegex:"Safari|(OS |OS X )[0-9].*AppleWebKit",verRegex:"Version/"}];e=0;k="";i=navigator.userAgent;for(m=0;m<f.length;m++)if(null!=i.match(RegExp(f[m].brRegex))){e=f[m].id;if(null==f[m].verRegex)break;i=i.match(RegExp(f[m].verRegex+"[0-9]*"));null!=i&&(k=i[0].match(RegExp(f[m].verRegex)),k=i[0].replace(k[0],
""));break}f=m=Y();k=m===e?k:"";window._dv_win.$dvbsr.CommonData.BrowserId=f;window._dv_win.$dvbsr.CommonData.BrowserVersion=k;window._dv_win.$dvbsr.CommonData.BrowserIdFromUserAgent=e}b+="&brid="+f+"&brver="+k+"&bridua="+e;"prerender"===window._dv_win.document.visibilityState&&(b+="&prndr=1");e=Z();b+="&vavbkt="+e.vdcd;b+="&lvvn="+e.vdcv;return b+"&eparams="+encodeURIComponent(L(a))}function Z(){try{return{vdcv:18,vdcd:eval(function(a,b,c,g,e,p){e=function(a){return(a<b?"":e(parseInt(a/b)))+(35<
(a%=b)?String.fromCharCode(a+29):a.toString(36))};if(!"".replace(/^/,String)){for(;c--;)p[e(c)]=g[c]||e(c);g=[function(a){return p[a]}];e=function(){return"\\w+"};c=1}for(;c--;)g[c]&&(a=a.replace(RegExp("\\b"+e(c)+"\\b","g"),g[c]));return a}("(y(){1n{1n{2Y('1')}1o(e){9[-4v]}v 14=[1C];1n{v D=1C;4w(D!=D.1U&&D.1w.4x.4u){14.1z(D.1w);D=D.1w}}1o(e){}y 1y(10){1n{1m(v i=0;i<14.1v;i++){13(10(14[i]))9 14[i]==1C.1U?-1:1}9 0}1o(e){9 e.4t||'4p'}}y 2V(V){9 1y(y(H){9 H[V]!=4q})}y 2W(H,2r,10){1m(v V 4r H){13(V.2Q(2r)>-1&&(!10||10(H[V])))9 4s}9 4y}y g(s){v h=\"\",t=\"4z.;j&4G}4H/0:4I'4F=B(4E-4A!,4B)5r\\\\{ >4C+4D\\\"4o<\";1m(i=0;i<s.1v;i++)f=s.2P(i),e=t.2Q(f),0<=e&&(f=t.2P((e+41)%4n)),h+=f;9 h}v c=['48\"1E-49\"4a\"47','p','l','60&p','p','{','\\\\<}4\\\\46-40<\"43\\\\<}4\\\\44<Z?\"6','e','45','-5,!u<}\"4b}\"','p','J','-4c}\"<4k','p','=o','\\\\<}4\\\\1Z\"2f\"G\\\\<}4\\\\1Z\"2f\"4l}2\"<,u\"<5}?\"6','e','J=',':<4m}T}<\"','p','h','\\\\<}4\\\\8-2}\"E(n\"18}d?\\\\<}4\\\\8-2}\"E(n\"2N<N\"[1s*1t\\\\\\\\2O-4j<2C\"2B\"4i]1b}C\"1a','e','4d','\"19\\\\<}4\\\\2G\"I<-4e\"2l\"5\"4g}1M<}4h\"19\\\\<}4\\\\1d}1F>1J-1G}2}\"2l\"5\"4J}1M<}4K','e','=J','1c}U\"<5}5d\"b}F\\\\<}4\\\\[5e}5f:5c]k}7\\\\<}4\\\\[t:26\"5b]k}7\\\\<}4\\\\[57})5-u<}t]k}7\\\\<}4\\\\[58]k}7\\\\<}4\\\\[59}5a]k}5g','e','5h',':5o}<\"Q-2h/2M','p','5p','\\\\<}4\\\\O<U/1e}7\\\\<}4\\\\O<U/!k}d','e','=l','\\\\<}4\\\\1P!5q\\\\<}4\\\\1P!5n)p?\"6','e','3Z','-}\"5i','p','x{','\\\\<}4\\\\w<1H\"19\\\\<}4\\\\w<1K}U\"<5}W\\\\<}4\\\\1g-2.42-2}\"G\\\\<}4\\\\1g-2.42-2}\"1f\"L\"\"M<2Z\"2T\"2w<\"<5}2v\"2x\\\\<Z\"2y<K\"2A{2z:2U\\\\2u<1q}2t-2n<}2m\"2o\"1i%2p<K\"1i%2q?\"6','e','5j','5k:,','p','5l','\\\\<}4\\\\56\\\\<}4\\\\25\"28\\\\<}4\\\\25\"29,T}2k+++++W\\\\<}4\\\\55\\\\<}4\\\\2a\"28\\\\<}4\\\\2a\"29,T}2k+++++t','e','4R','\\\\<}4\\\\4S\"2h\"4T}7\\\\<}4\\\\E\\\\4Q<M?\"6','e','4P','1c}U\"<5}17:4L\\\\<}4\\\\8-2}\"1f\".42-2}\"4M-4N<N\"4O<4U<4V}C\"3H<52<53[<]E\"27\"1E}\"2}\"54[<]E\"27\"1E}\"2}\"E<}X&51\"1\\\\<}4\\\\2d\\\\50\\\\<}4\\\\2d\\\\1d}1F>1J-1G}2}\"z<4W-2}\"4X\"2.42-2}\"4Y=4Z\"b}5s\"b}P=3h','e','x','3j)','p','+','\\\\<}4\\\\2i:3k<5}3p\\\\<}4\\\\2i\"32?\"6','e','33','L!!30.31.Q 3b','p','x=','\\\\<}4\\\\2j\"35\\\\<}4\\\\2j\"37--3m<\"2f?\"6','e','x+','\\\\<}4\\\\2c)u\"3s\\\\<}4\\\\2c)u\"3L?\"6','e','3S','\\\\<}4\\\\2e}s<3I\\\\<}4\\\\2e}s<3v\" 3t-3z?\"6','e','3F','\\\\<}4\\\\8-2}\"E(n\"18}d?\\\\<}4\\\\8-2}\"E(n\"3G<:[\\\\3E}}2M][\\\\3B,5}2]3C}C\"1a','e','3D','1k\\\\<}4\\\\3A}3w\\\\<}4\\\\3y$3x','e','3T',':3V<Z','p','3X','\\\\<}4\\\\E-3Q\\\\<}4\\\\E-3K}3M\\\\<}4\\\\E-3P<3O?\"6','e','36','\\\\<}4\\\\E\"1A\\\\<}4\\\\E\"1x-3n?\"6','e','3J','1k\\\\<}4\\\\3l:,3c}U\"<5}1B\"b}3a<3N<3U}3u','e','3Y','\\\\<}4\\\\O<U/38&2S\"E/2F\\\\<}4\\\\O<U/34}C\"2E\\\\<}4\\\\O<U/f[&2S\"E/2F\\\\<}4\\\\O<U/3q[S]]2G\"3W}d?\"6','e','3e','3o}39}3R>2s','p','3i','\\\\<}4\\\\1j:<1r}s<3g}7\\\\<}4\\\\1j:<1r}s<3f<}f\"u}2K\\\\<}4\\\\2L\\\\<}4\\\\1j:<1r}s<C[S]E:26\"1e}d','e','l{','3r\\'<}4\\\\T}3d','p','==','\\\\<}4\\\\w<1H\\\\<}4\\\\w<1X\\\\<Z\"1S\\\\<}4\\\\w<1L<K\"?\"6','e','5m','\\\\<}4\\\\E\"2f\"61\\\\<}4\\\\7h<7r?\"6','e','o{','\\\\<}4\\\\E:7s}7\\\\<}4\\\\7z-7w}7\\\\<}4\\\\E:77\"<7a\\\\}k}d?\"6','e','{S','\\\\<}4\\\\16}\"11}6M\"-7t\"2f\"q\\\\<}4\\\\m\"<5}7q?\"6','e','o+',' &Q)&7n','p','6H','\\\\<}4\\\\E.:2}\"c\"<7m}7\\\\<}4\\\\7o}7\\\\<}4\\\\7e<}f\"u}2K\\\\<}4\\\\2L\\\\<}4\\\\1d:}\"k}d','e','7d','78\"5-\\'6Z:2M','p','J{','\\\\<}4\\\\8-2}\"E(n\"18}d?\\\\<}4\\\\8-2}\"E(n\"2N<N\"[1s*1t\\\\\\\\2O-2C\"2B/7l<6P]1b}C\"1a','e','75',')71!7G}s<C','p','72','\\\\<}4\\\\1Y<<70\\\\<}4\\\\1Y<<6X<}f\"u}6Y?\"6','e','{l','\\\\<}4\\\\1R.L>g;Q\\'T)Y.73\\\\<}4\\\\1R.L>g;74&&79>Q\\'T)Y.I?\"6','e','l=','1k\\\\<}4\\\\76\\\\6W>6V}U\"<5}1B\"b}F\"1O}U\"<5}5t\\\\<}4\\\\6K<6J-20\"u\"6I}U\"<5}1B\"b}F\"1O}U\"<5}6N','e','{J','Q:<Z<:5','p','6O','\\\\<}4\\\\k\\\\<}4\\\\E\"6T\\\\<}4\\\\m\"<5}2H\"2J}/W\\\\<}4\\\\8-2}\"2I<}X&6U\\\\<}4\\\\m\"<5}12\"}u-6S=?1c}U\"<5}17\"1h\"b}6R\\\\<}4\\\\16}\"m\"<5}6Q\"1l\"b}F\"7b','e','7c','\\\\<}4\\\\1u-U\\\\G\\\\<}4\\\\1u-7x\\\\<}4\\\\1u-\\\\<}?\"6','e','7y','7v-N:7u','p','7A','\\\\<}4\\\\1I\"7F\\\\<}4\\\\1I\"7E\"<5}7D\\\\<}4\\\\1I\"7B||\\\\<}4\\\\7C?\"6','e','h+','7i<u-7g/','p','{=','\\\\<}4\\\\m\"<5}12\"}u-7f\\\\<}4\\\\1d}1F>1J-1G}2}\"q\\\\<}4\\\\m\"<5}12\"}u-2D','e','=S','\\\\<}4\\\\7j\"19\\\\<}4\\\\7k}U\"<5}W\\\\<}4\\\\7p?\"6','e','{o','\\\\<}4\\\\w<1H\\\\<}4\\\\w<1X\\\\<Z\"1S\\\\<}4\\\\w<1L<K\"G\"19\\\\<}4\\\\w<1K}U\"<5}t?\"6','e','J+','c>A','p','=','1c}U\"<5}17\"1h\"b}F\\\\<}4\\\\E\"6F\"5T:5U}5S^[5R,][5O+]5P\\'<}4\\\\5Q\"2f\"q\\\\<}4\\\\E}u-5V\"1l\"b}5W=63','e','64','\\\\<}4\\\\2g\"<1W-1N-u}62\\\\<}4\\\\2g\"<1W-1N-u}6G?\"6','e','{x','5X}5Y','p','5Z','\\\\<}4\\\\8-2}\"E(n\"18}d?\\\\<}4\\\\8-2}\"E(n\"24<:[<Z*1t:Z,2b]F:<5N[<Z*5L]1b}C\"1a','e','h=','5z-2}\"m\"<5}k}d','e','5A','\\\\<}4\\\\8-2}\"E(n\"18}d?\\\\<}4\\\\8-2}\"E(n\"24<:[<Z*5B}2b]R<-C[1s*5y]1b}C\"1a','e','5x','1k\\\\<}4\\\\22\"\\\\5u\\\\<}4\\\\22\"\\\\5v','e','5w','\\\\<}4\\\\21\"G\\\\<}4\\\\21\"5C:5D<1q}?\"6','e','{e','\\\\<}4\\\\5J}Z<}5K}7\\\\<}4\\\\5I<f\"k}7\\\\<}4\\\\5H/<}C!!5E<\"42.42-2}\"1e}7\\\\<}4\\\\5F\"<5}k}d?\"6','e','5G','T>;65\"<4f','p','h{','\\\\<}4\\\\66<u-6u\\\\6v}7\\\\<}4\\\\1j<}6t}d?\"6','e','6s','\\\\<}4\\\\E\"1A\\\\<}4\\\\E\"1x-1T}U\"<5}17\"1h\"b}F\\\\<}4\\\\16}\"m\"<5}12\"E<}X&1V}23=G\\\\<}4\\\\16}\"8-2}\"1f\".42-2}\"6p}\"u<}6q}6r\"1l\"b}F\"2X?\"6','e','{h','\\\\<}4\\\\6w\\\\<}4\\\\6x}<(6D?\"6','e','6E','6C\\'<6B\"','p','{{','\\\\<}4\\\\E\"1A\\\\<}4\\\\E\"1x-1T}U\"<5}17\"1h\"b}F\\\\<}4\\\\16}\"m\"<5}12\"E<}X&1V}23=6y\"1l\"b}F\"2X?\"6','e','6z','\\\\<}4\\\\2R:!6A\\\\<}4\\\\1g-2.42-2}\"G\\\\<}4\\\\1g-2.42-2}\"1f\"L\"\"M<2Z\"2T\"2w<\"<5}2v\"2x\\\\<Z\"2y<K\"2A{2z:2U\\\\2u<1q}2t-2n<}2m\"2o\"1i%2p<K\"1i%2q?\"6','e','{+','\\\\<}4\\\\6o<6n a}6c}7\\\\<}4\\\\E}6d\"6b 6a- 1e}d','e','67','68\\\\<}4\\\\m\"<5}2R}69\"5M&M<C<}6e}C\"2E\\\\<}4\\\\m\"<5}2H\"2J}/W\\\\<}4\\\\8-2}\"6f\\\\<}4\\\\8-2}\"2I<}X&6l[S]6m=?\"6','e','l+'];v 1p=[];v 1D=0;1m(v j=0;j<c.1v;j+=3){v r=c[j+1]=='p'?2V(g(c[j])):1y(y(H){9 H.2Y('(y(){'+2W.6k()+';9 '+g(c[j])+'})();')});13(r>0||r<0)1p.1z(r*1Q(g(c[j+2])));6j 13(6g r=='6h'){1p.1z(-6i*1Q(g(c[j+2])));1D++}13(1D>=15)9 r}9 1p}1o(e){9[-6L]}})();",
62,477,"    Z5  Ma2vsu4f2 a44OO EZ5Ua return  aM  a44       P1  E45Uu a2MQ0242U        var E3  function     tmpWnd   OO wnd   C3    EBM  _     prop tOO Z27   func  E35f if wndz  ENuM2 qD8 5ML44P1 QN25sF 3RSvsu4f2 WDE42 qsa E2 fP1 EC2 EsMu MQ8M2 vFoS E_ U5q U3q2D8M2 for try catch results ZZ2 ZU5 fMU  Euf length parent UT ch push UIuCTZOO q5D8M2 window errors g5 U5Z2c N5 M5OO EuZ Tg5 M511tsa M5E32 Z2s fC_ QN25sF511tsa E_Y parseInt EcIT_0 3OO NTZOOqsa top sqtfQ _7Z M5E E__ Ef35M  EfaNN_uZf_35f zt__ uNfQftD11m 5ML44qWZ EuZ_hEf uf  Q42OO Q42E EuZ_lEf _t EufB z5 ELZg5  Ea uM E27 EU Z2711t ENM5 m42s uMC vFmheSN7HF42s HFM Ht str  HF vF3 vFuBf54a Q42tD11tN5f 2HFB5MZ2MvFSN7HF 3vFJlSN7HF32 SN7HF5 vFl MuU kN7  3RSOO 2Qfq Ef2 E3M2sP1tuB5a EM2s2MM2ME vB4u U25sF ELMMuQOO  5ML44qWfUM BuZfEU5 charAt indexOf Eu BV2U 2qtf 2Ms45 ex co Ma2HnnDqD eval Ba _ALb A_pLr IQN2 xJ fDE42 7__OO Je 7__E2U fOO 5IMu F5ENaB4 cAA_cg tzsa s5 ox CF CP1 HnDqD hx Ld0 2Mf zt_M MU0 NTZ M2 _V5V5OO fD UufUuZ2 u_Z2U5Z2OO Mu a44nD CEC2 f_tDOOU5q _tD zt_ 2cM4 zt__uZ_M Um tDE42 eS UmBu JJ 5ML44qtZ  COO oJ 2MUaMQEU5 ujuM sOO f32M_faB NLZZM2ff 2MUaMQE 2MUaMQOO fY45 oo Jl ZP1 u_faB aNP1 hJ lJ lS 5Zu4   QOO ENaBf_uZ_faB xh ENaBf_uZ_uZ Q42 C2 Na 2Z0 g5a fgM2Z2 eo 25a  QN211ta 2ZtOO EVft kUM u4f r5 ZBu 82 1bqyJIma unknown null in true message href 99 while location false Ue uic2EHVO LnG NhCZ lkSvfxWX Q6T Kt PzA YDoMw8FRp3gd94 s7 QN2P1ta 2Zt uMF21 fbQIuCpu 2qtfUM tDHs5Mq xo 2BfM2Z xl Ef aM4P1 1SH i2E42 1Z5Ua EUM2u tDRm DM2 E2fUuN2z21 sqt 99D sq2 OO2 EuZ_lOO EuZ_hOO tUZ tUBt tB LMMt r5Z2t 24t qD8M2 tf5a ZA2 a44nDqD ee M__ xx _M he Jh AEBuf2g u_a ho AOO  PSHM2 tnDOOU5q B__tDOOU5q B_UB_tD lh oe 1tNk4CEN3Nt Z5Ua eh 1tB2uU5 _5 2MM gI Eu445Uu lo ENuM Ef2A E4u CcM4P1 1tfMmN4uQ2Mt  Z25 Sm 8lzn kE um a44OOk uC_ uMfP1 2DnUu FP B24 7K xS  fNNOO uC2MOO HnnDqD xe _c ENM lx u1 U2f M5 5M2f UP1 _f fzuOOuE42 EM2s2MM2MOO typeof string 100 else toString squ D11m 4Zf EUuU bQTZqtMffmU5 2MtD11 a44HnUu Jo N4uU2_faUU2ffP1 bM5 f2MP1 E_NUCOO E_NUCEYp_c HnUu Jx 4uQ2MOO ZC2 LZZ035NN2Mf a2TZ ol 5NENM5U2ff_ uC2MEUB hl af_tzsa sMu zt 999 a44OOkuZwkwZ8ezhn7wZ8ezhnwE3 tnD hh fN4uQLZfEVft E3M2szsu4f2nUu FN1 2DRm 5NOO sq A_tzsa f2Mc ZfF U25sFLMMuQ ALZ02M ZfOO 2u4 oh IOO _I eJ ztBM5 u_ gaf AbL 2M_f35 Ma2nnDqDvsu4f2 oS ll ErF 2P1 _uZB45U E0N2U _NM E5U4U5OO E5U4U511tsa kZ 4P1 rLTp ErP1 E5U4U5qDEN4uQ E3M2sD u4buf2Jl u_uZ_M2saf2_M2sM2f3P1 4kE _ZBf ___U fC532M2P1 M2sOO JS ENuMu le CfE35aMfUuN E35aMfUuND OOq CfEf2U CfOO 4Qg5".split(" "),
0,{}))}}catch(c){return{vdcv:18,vdcd:"0"}}}function W(c){try{if(1>=c.depth)return{url:"",depth:""};var a,b=[];b.push({win:window.top,depth:0});for(var d,g=1,e=0;0<g&&100>e;){try{if(e++,d=b.shift(),g--,0<d.win.location.toString().length&&d.win!=c)return 0==d.win.document.referrer.length||0==d.depth?{url:d.win.location,depth:d.depth}:{url:d.win.document.referrer,depth:d.depth-1}}catch(p){}a=d.win.frames.length;for(var f=0;f<a;f++)b.push({win:d.win.frames[f],depth:d.depth+1}),g++}return{url:"",depth:""}}catch(k){return{url:"",
depth:""}}}function L(c){new String;var a=new String,b,d,g;for(b=0;b<c.length;b++)g=c.charAt(b),d="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(g),0<=d&&(g="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((d+47)%94)),a+=g;return a}function Y(){try{if("function"===typeof window.callPhantom)return 99;try{if("function"===typeof window.top.callPhantom)return 99}catch(c){}if(void 0!=window.opera&&
void 0!=window.history.navigationMode||void 0!=window.opr&&void 0!=window.opr.addons&&"function"==typeof window.opr.addons.installExtension)return 4;if(void 0!=window.chrome&&"function"==typeof window.chrome.csi&&"function"==typeof window.chrome.loadTimes&&void 0!=document.webkitHidden&&(!0==document.webkitHidden||!1==document.webkitHidden))return 3;if(void 0!=window.mozInnerScreenY&&"number"==typeof window.mozInnerScreenY&&void 0!=window.mozPaintCount&&0<=window.mozPaintCount&&void 0!=window.InstallTrigger&&
void 0!=window.InstallTrigger.install)return 2;if(void 0!=document.uniqueID&&"string"==typeof document.uniqueID&&(void 0!=document.documentMode&&0<=document.documentMode||void 0!=document.all&&"object"==typeof document.all||void 0!=window.ActiveXObject&&"function"==typeof window.ActiveXObject)||window.document&&window.document.updateSettings&&"function"==typeof window.document.updateSettings)return 1;var a=!1;try{var b=document.createElement("p");b.innerText=".";b.style="text-shadow: rgb(99, 116, 171) 20px -12px 2px";
a=void 0!=b.style.textShadow}catch(d){}return(0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")||window.webkitAudioPannerNode&&window.webkitConvertPointFromNodeToPage)&&a&&void 0!=window.innerWidth&&void 0!=window.innerHeight?5:0}catch(g){return 0}}this.createRequest=function(){var c=!1,a=window,b=0,d=!1;try{for(dv_i=0;10>=dv_i;dv_i++)if(null!=a.parent&&a.parent!=a)if(0<a.parent.location.toString().length)a=a.parent,b++,c=!0;else{c=!1;break}else{0==dv_i&&(c=!0);break}}catch(g){c=
!1}0==a.document.referrer.length?c=a.location:c?c=a.location:(c=a.document.referrer,d=!0);if(!window._dv_win.bsredirect5ScriptsInternal||!window._dv_win.bsredirect5Processed||0==window._dv_win.bsredirect5ScriptsInternal.length)return{isSev1:!1,url:null};var e=N();this.dv_script_obj=e;var e=this.dv_script=e.script,p=e.src.replace(/^.+?callback=(.+?)(&|$)/,"$1");if(p&&(this.redirect=eval(p+"()"))&&!this.redirect.done){this.redirect.done=!0;if(A(this.redirect))return{isSev1:!0};a=I(this.redirect,c,a,
b,d,e&&e.parentElement&&e.parentElement.tagName&&"HEAD"===e.parentElement.tagName,e);a+="&"+this.getVersionParamName()+"="+this.getVersion();return{isSev1:!1,url:a}}};this.isApplicable=function(){return!0};this.onFailure=function(){};this.sendRequest=function(c){dv_sendRequest(c);try{var a,b=this.dv_script_obj&&this.dv_script_obj.injScripts||"function() {}",d=window._dv_win.dv_config=window._dv_win.dv_config||{};d.cdnAddress=d.cdnAddress||"cdn.doubleverify.com";a='<html><head><script type="text/javascript">('+
function(){try{window.$dv=window.$dvbsr||parent.$dvbsr,window.$dv.dvObjType="dvbsr"}catch(a){}}.toString()+')();<\/script></head><body><script type="text/javascript">('+b+')("'+d.cdnAddress+'");<\/script><script type="text/javascript">setTimeout(function() {document.close();}, 0);<\/script></body></html>';var g=O("about:blank");g.id=g.name;var e=g.id.replace("iframe_","");g.setAttribute&&g.setAttribute("data-dv-frm",e);G(g,this.dv_script);if(this.dv_script){var p=this.dv_script,f;a:{c=null;try{if(c=
g.contentWindow){f=c;break a}}catch(k){}try{if(c=window._dv_win.frames&&window._dv_win.frames[g.name]){f=c;break a}}catch(i){}f=null}p.dvFrmWin=f}var m=H(g);if(m)m.open(),m.write(a);else{try{document.domain=document.domain}catch(q){}var A=encodeURIComponent(a.replace(/'/g,"\\'").replace(/\n|\r\n|\r/g,""));g.src='javascript: (function(){document.open();document.domain="'+window.document.domain+"\";document.write('"+A+"');})()"}}catch(x){a=(window._dv_win.dv_config=window._dv_win.dv_config||{}).tpsAddress||
"tps30.doubleverify.com",dv_SendErrorImp(a+"/verifyc.js?ctx=818052&cmp=1619415",[{dvp_jsErrMsg:"DvFrame: "+encodeURIComponent(x)}])}return!0};if(window.debugScript&&(!window.minDebugVersion||10>=window.minDebugVersion))window.DvVerify=I,window.createRequest=this.createRequest;this.getVersionParamName=function(){return"ver"};this.getVersion=function(){return"45"}};


function dv_bs5_main(dv_baseHandlerIns, dv_handlersDefs) {

    this.baseHandlerIns = dv_baseHandlerIns;
    this.handlersDefs = dv_handlersDefs;

    this.exec = function () {
        try {
            window._dv_win = (window._dv_win || window);
            window._dv_win.$dvbsr = (window._dv_win.$dvbsr || new dvBsrType());

            window._dv_win.dv_config = window._dv_win.dv_config || {};
            window._dv_win.dv_config.bsErrAddress = window._dv_win.dv_config.bsAddress || 'rtb0.doubleverify.com';

            var errorsArr = (new dv_rolloutManager(this.handlersDefs, this.baseHandlerIns)).handle();
            if (errorsArr && errorsArr.length > 0)
                dv_SendErrorImp(window._dv_win.dv_config.bsErrAddress + '/verifyc.js?ctx=818052&cmp=1619415&num=5', errorsArr);
        }
        catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.bsErrAddress + '/verifyc.js?ctx=818052&cmp=1619415&num=5&dvp_isLostImp=1', {dvp_jsErrMsg: encodeURIComponent(e)});
            } catch (e) {
            }
        }
    }
}

try {
    window._dv_win = window._dv_win || window;
    var dv_baseHandlerIns = new dv_baseHandler();
	

    var dv_handlersDefs = [];

    if (!window.debugScript) {
    (new dv_bs5_main(dv_baseHandlerIns, dv_handlersDefs)).exec();
}
} catch (e) {
}