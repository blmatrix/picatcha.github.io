function dv_rolloutManager(handlersDefsArray, baseHandler) {
    this.handle = function () {
        var errorsArr = [];

        var handler = chooseEvaluationHandler(handlersDefsArray);
        if (handler) {
            var errorObj = handleSpecificHandler(handler);
            if (errorObj === null)
                return errorsArr;
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
    }

    function handleSpecificHandler(handler) {
        var url;
        var errorObj = null;

        try {
            url = handler.createRequest();
            if (url) {
                if (!handler.sendRequest(url))
                    errorObj = createAndGetError('sendRequest failed.',
                        url,
                        handler.getVersion(),
                        handler.getVersionParamName(),
                        handler.dv_script);
            } else
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
        catch (e) {
            errorObj = createAndGetError(e.name + ': ' + e.message, url, handler.getVersion(), handler.getVersionParamName(), (handler ? handler.dv_script : null));
        }

        return errorObj;
    }

    function createAndGetError(error, url, ver, versionParamName, dv_script, dvScripts, dvStep, dvOther) {
        var errorObj = {};
        errorObj[versionParamName] = ver;
        errorObj['dvp_jsErrMsg'] = encodeURIComponent(error);
        if (dv_script && dv_script.parentElement && dv_script.parentElement.tagName && dv_script.parentElement.tagName == 'HEAD')
            errorObj['dvp_isOnHead'] = '1';
        if (url)
            errorObj['dvp_jsErrUrl'] = url;
        if (dvScripts) {
            var dvScriptsResult = '';
            for (var id in dvScripts) {
                if (dvScripts[id] && dvScripts[id].src) {
                    dvScriptsResult += encodeURIComponent(dvScripts[id].src) + ":" + dvScripts[id].isContain + ",";
                }
            }
            //errorObj['dvp_dvScripts'] = encodeURIComponent(dvScriptsResult);
           // errorObj['dvp_dvStep'] = dvStep;
           // errorObj['dvp_dvOther'] = dvOther;
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
            if (index != handlersArray.length) //This allows a scenario where no evaluation version is chosen
                isEvaluationVersionChosen = true;
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

        if (isEvaluationVersionChosen == true && handlersArray[index].handler.isApplicable())
            return handlersArray[index].handler;
        else
            return null;
    }    
}

function doesBrowserSupportHTML5Push() {
    "use strict";
    return typeof window.parent.postMessage === 'function' && window.JSON;
}

function dv_GetParam(url, name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS, 'i');
    var results = regex.exec(url);
    if (results == null)
        return null;
    else
        return results[1];
}

function dv_Contains(array, obj) {
    var i = array.length;
    while (i--) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
}

function dv_GetDynamicParams(url) {
    try {
        var regex = new RegExp("[\\?&](dvp_[^&]*=[^&#]*)", "gi");
        var dvParams = regex.exec(url);

        var results = new Array();
        while (dvParams != null) {
            results.push(dvParams[1]);
            dvParams = regex.exec(url);
        }
        return results;
    }
    catch (e) {
        return [];
    }
}

function dv_createIframe() {
    var iframe;
    if (document.createElement && (iframe = document.createElement('iframe'))) {
        iframe.name = iframe.id = 'iframe_' + Math.floor((Math.random() + "") * 1000000000000);
        iframe.width = 0;
        iframe.height = 0;
        iframe.style.display = 'none';
        iframe.src = 'about:blank';
    }

    return iframe;
}

function dv_GetRnd() {
    return ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 16);
}

function dv_SendErrorImp(serverUrl, errorsArr) {

    for (var j = 0; j < errorsArr.length; j++) {
        var errorObj = errorsArr[j];
        var errorImp = dv_CreateAndGetErrorImp(serverUrl, errorObj);
        dv_sendImgImp(errorImp);
    }
}

function dv_CreateAndGetErrorImp(serverUrl, errorObj) {
    var errorQueryString = '';
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

    var windowProtocol = 'http:';
    var sslFlag = '&ssl=0';
    if (window._dv_win.location.protocol === 'https:') {
        windowProtocol = 'https:';
        sslFlag = '&ssl=1';
    }
    
    var errorImp = windowProtocol + '//' + serverUrl + sslFlag + errorQueryString;
    return errorImp;
}

function dv_sendImgImp(url) {
    (new Image()).src = url;
}

function dv_sendScriptRequest(url) {
    document.write('<scr' + 'ipt type="text/javascript" src="' + url + '"></scr' + 'ipt>');
}

function dv_getPropSafe(obj, propName) {
    try {
        if (obj)
            return obj[propName];
    } catch (e) { }
}

function dvBsType() {
    var that = this;
    var eventsForDispatch = {};
    this.t2tEventDataZombie = {};

    this.processT2TEvent = function (data, tag) {
        try {
            if (tag.ServerPublicDns) {
                data.timeStampCollection.push({"beginProcessT2TEvent" : getCurrentTime()});
                data.timeStampCollection.push({'beginVisitCallback' : tag.beginVisitCallbackTS});
                var tpsServerUrl = tag.dv_protocol + '//' + tag.ServerPublicDns + '/event.gif?impid=' + tag.uid;

                if (!tag.uniquePageViewId) {
                    tag.uniquePageViewId = data.uniquePageViewId;
                }

                tpsServerUrl += '&dvp_upvid=' + tag.uniquePageViewId;
                tpsServerUrl += '&dvp_numFrames=' + data.totalIframeCount;
                tpsServerUrl += '&dvp_numt2t=' + data.totalT2TiframeCount;
                tpsServerUrl += '&dvp_frameScanDuration=' + data.scanAllFramesDuration;
                tpsServerUrl += '&dvp_scene=' + tag.adServingScenario;
                tpsServerUrl += '&dvp_ist2twin=' + (data.isWinner ? '1' : '0');
                tpsServerUrl += '&dvp_numTags=' + Object.keys($dvbs.tags).length;
                tpsServerUrl += '&dvp_isInSample=' + data.isInSample;
                tpsServerUrl += (data.wasZombie)?'&dvp_wasZombie=1':'&dvp_wasZombie=0';
                tpsServerUrl += '&dvp_ts_t2tCreatedOn=' + data.creationTime;
                if(data.timeStampCollection)
                {
                    if(window._dv_win.t2tTimestampData)
                    {
                        for(var tsI = 0; tsI < window._dv_win.t2tTimestampData.length; tsI++)
                        {
                            data.timeStampCollection.push(window._dv_win.t2tTimestampData[tsI]);
                        }
                    }

                    for(var i = 0; i< data.timeStampCollection.length;i++)
                    {
                        var item = data.timeStampCollection[i];
                        for(var propName in item)
                        {
                            if(item.hasOwnProperty(propName))
                            {
                                tpsServerUrl += '&dvp_ts_' + propName + '=' + item[propName];
                            }
                        }
                    }
                }
                $dvbs.domUtilities.addImage(tpsServerUrl, tag.tagElement.parentElement);
            }
        } catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&jsver=0&dvp_ist2tProcess=1', { dvp_jsErrMsg: encodeURIComponent(e) });
            } catch (ex) { }
        }
    };

    this.processTagToTagCollision = function (collision, tag) {
        var i;
        var tpsServerUrl = tag.dv_protocol + '//' + tag.ServerPublicDns + '/event.gif?impid=' + tag.uid;
        var additions = [
            '&dvp_collisionReasons=' + collision.reasonBitFlag,
            '&dvp_ts_reporterDvTagCreated=' + collision.thisTag.dvTagCreatedTS,
            '&dvp_ts_reporterVisitJSMessagePosted=' + collision.thisTag.visitJSPostMessageTS,
            '&dvp_ts_reporterReceivedByT2T=' + collision.thisTag.receivedByT2TTS,
            '&dvp_ts_collisionPostedFromT2T=' + collision.postedFromT2TTS,
            '&dvp_ts_collisionReceivedByCommon=' + collision.commonRecievedTS,
            '&dvp_collisionTypeId=' + collision.allReasonsForTagBitFlag
        ];
        tpsServerUrl += additions.join("");

        for (i = 0; i < collision.reasons.length; i++){
            var reason = collision.reasons[i];
            tpsServerUrl += '&dvp_' + reason + "MS=" + collision[reason+"MS"];
        }

        if(tag.uniquePageViewId){
            tpsServerUrl +=  '&dvp_upvid='+tag.uniquePageViewId;
        }
        $dvbs.domUtilities.addImage(tpsServerUrl, tag.tagElement.parentElement);
    };

    var messageEventListener = function (event) {
        try {
            var timeCalled = getCurrentTime();
            var data = window.JSON.parse(event.data);
            if(!data.action){
                data = window.JSON.parse(data);
            }
            if(data.timeStampCollection)
            {
                data.timeStampCollection.push({messageEventListenerCalled:timeCalled});
            }
            var myUID;
            var visitJSHasBeenCalledForThisTag = false;
            if ($dvbs.tags) {
                for (var uid in $dvbs.tags) {
                    if ($dvbs.tags.hasOwnProperty(uid) && $dvbs.tags[uid] && $dvbs.tags[uid].t2tIframeId === data.iFrameId) {
                        myUID = uid;
                        visitJSHasBeenCalledForThisTag = true;
                        break;
                    }
                }
            }

            switch(data.action){
            case 'uniquePageViewIdDetermination' :
                if(visitJSHasBeenCalledForThisTag){
                    $dvbs.processT2TEvent(data, $dvbs.tags[myUID]);
                    $dvbs.t2tEventDataZombie[data.iFrameId] = undefined;
                }
                else
                {
                    data.wasZombie = 1;
                    $dvbs.t2tEventDataZombie[data.iFrameId] = data;
                }
            break;
            case 'maColl':
                var tag = $dvbs.tags[myUID];
                //mark we got a message, so we'll stop sending them in the future
                tag.AdCollisionMessageRecieved = true;
                if (!tag.uniquePageViewId) { tag.uniquePageViewId = data.uniquePageViewId; }
                data.collision.commonRecievedTS = timeCalled;
                $dvbs.processTagToTagCollision(data.collision, tag);
            break;
            }

        } catch (e) {
            try{
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&jsver=0&dvp_ist2tListener=1', { dvp_jsErrMsg: encodeURIComponent(e) });
            } catch (ex) { }
        }
    };

    if (window.addEventListener)
        addEventListener("message", messageEventListener, false);
    else
        attachEvent("onmessage", messageEventListener);

    this.pubSub = new function () {

        var subscribers = [];

        this.subscribe = function (eventName, uid, actionName, func) {
            if (!subscribers[eventName + uid])
                subscribers[eventName + uid] = [];
            subscribers[eventName + uid].push({ Func: func, ActionName: actionName });
        }

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
        }
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
        }
    };

    this.resolveMacros = function(str, tag) {
        var viewabilityData = tag.getViewabilityData();
        var viewabilityBuckets = viewabilityData && viewabilityData.buckets ? viewabilityData.buckets : { };
        var upperCaseObj = objectsToUpperCase(tag, viewabilityData, viewabilityBuckets);
        var newStr = str.replace('[DV_PROTOCOL]', upperCaseObj.DV_PROTOCOL);
        newStr = newStr.replace('[PROTOCOL]', upperCaseObj.PROTOCOL);
        newStr = newStr.replace( /\[(.*?)\]/g , function(match, p1) {
            var value = upperCaseObj[p1];
            if (value === undefined || value === null)
                value = '[' + p1 + ']';
            return encodeURIComponent(value);
        });
        return newStr;
    };

    this.settings = new function () {
    };

    this.tagsType = function () { };

    this.tagsPrototype = function () {
        this.add = function (tagKey, obj) {
            if (!that.tags[tagKey])
                that.tags[tagKey] = new that.tag();
            for (var key in obj)
                that.tags[tagKey][key] = obj[key];
        }
    };

    this.tagsType.prototype = new this.tagsPrototype();
    this.tagsType.prototype.constructor = this.tags;
    this.tags = new this.tagsType();

    this.tag = function () { }
    this.tagPrototype = function () {
        this.set = function (obj) {
            for (var key in obj)
                this[key] = obj[key];
        }

        this.getViewabilityData = function () {
        }
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
        BrowserId: { Others: 0, IE: 1, Firefox: 2, Chrome: 3, Opera: 4, Safari: 5 },
        TrafficScenario: { OnPage: 1, SameDomain: 2, CrossDomain: 128 }
    };

    this.CommonData = { };
    
    var runSafely = function (action) {
        try {
            var ret = action();
            return ret !== undefined ? ret : true;
        } catch (e) { return false; }
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
        window.addEventListener('unload', function () { that.dispatchRegisteredEventsFromAllTags(); }, false);
        window.addEventListener('beforeunload', function () { that.dispatchRegisteredEventsFromAllTags(); }, false);
    }
    else if (window.attachEvent) {
        window.attachEvent('onunload', function () { that.dispatchRegisteredEventsFromAllTags(); }, false);
        window.attachEvent('onbeforeunload', function () { that.dispatchRegisteredEventsFromAllTags(); }, false);
    }
    else {
        window.document.body.onunload = function () { that.dispatchRegisteredEventsFromAllTags(); };
        window.document.body.onbeforeunload = function () { that.dispatchRegisteredEventsFromAllTags(); };
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


function dv_handler32(){function J(e){if(window._dv_win.document.body)return window._dv_win.document.body.insertBefore(e,window._dv_win.document.body.firstChild),!0;var a=0,h=function(){if(window._dv_win.document.body)try{window._dv_win.document.body.insertBefore(e,window._dv_win.document.body.firstChild)}catch(c){}else a++,150>a&&setTimeout(h,20)};setTimeout(h,20);return!1}function K(e){var a,h=window._dv_win.document.visibilityState;window[e.tagObjectCallbackName]=function(c){if(window._dv_win.$dvbs){var d=
"https"==window._dv_win.location.toString().match("^https")?"https:":"http:";a=c.ImpressionID;window._dv_win.$dvbs.tags.add(c.ImpressionID,e);window._dv_win.$dvbs.tags[c.ImpressionID].set({tagElement:e.script,impressionId:c.ImpressionID,dv_protocol:e.protocol,protocol:d,uid:e.uid,serverPublicDns:c.ServerPublicDns,ServerPublicDns:c.ServerPublicDns});if("prerender"===h)if("prerender"!==window._dv_win.document.visibilityState&&"unloaded"!==visibilityStateLocal)window._dv_win.$dvbs.registerEventCall(c.ImpressionID,
{prndr:0});else{var b;"undefined"!==typeof window._dv_win.document.hidden?b="visibilitychange":"undefined"!==typeof window._dv_win.document.mozHidden?b="mozvisibilitychange":"undefined"!==typeof window._dv_win.document.msHidden?b="msvisibilitychange":"undefined"!==typeof window._dv_win.document.webkitHidden&&(b="webkitvisibilitychange");var n=function(){var a=window._dv_win.document.visibilityState;"prerender"===h&&("prerender"!==a&&"unloaded"!==a)&&(h=a,window._dv_win.$dvbs.registerEventCall(c.ImpressionID,
{prndr:0}),window._dv_win.document.removeEventListener(b,n))};window._dv_win.document.addEventListener(b,n,!1)}}};window[e.callbackName]=function(c){var d;d=window._dv_win.$dvbs&&"object"==typeof window._dv_win.$dvbs.tags[a]?window._dv_win.$dvbs.tags[a]:e;e.perf&&e.perf.addTime("r7");var b=window._dv_win.dv_config.bs_renderingMethod||function(a){document.write(a)};switch(c.ResultID){case 1:d.tagPassback?b(d.tagPassback):c.Passback?b(decodeURIComponent(c.Passback)):c.AdWidth&&c.AdHeight&&b(decodeURIComponent("%3Cstyle%3E%0A.dvbs_container%20%7B%0A%09border%3A%201px%20solid%20%233b599e%3B%0A%09overflow%3A%20hidden%3B%0A%09filter%3A%20progid%3ADXImageTransform.Microsoft.gradient(startColorstr%3D%27%23315d8c%27%2C%20endColorstr%3D%27%2384aace%27)%3B%0A%09%2F*%20for%20IE%20*%2F%0A%09background%3A%20-webkit-gradient(linear%2C%20left%20top%2C%20left%20bottom%2C%20from(%23315d8c)%2C%20to(%2384aace))%3B%0A%09%2F*%20for%20webkit%20browsers%20*%2F%0A%09background%3A%20-moz-linear-gradient(top%2C%20%23315d8c%2C%20%2384aace)%3B%0A%09%2F*%20for%20firefox%203.6%2B%20*%2F%0A%7D%0A.dvbs_cloud%20%7B%0A%09color%3A%20%23fff%3B%0A%09position%3A%20relative%3B%0A%09font%3A%20100%25%22Times%20New%20Roman%22%2C%20Times%2C%20serif%3B%0A%09text-shadow%3A%200px%200px%2010px%20%23fff%3B%0A%09line-height%3A%200%3B%0A%7D%0A%3C%2Fstyle%3E%0A%3Cscript%20type%3D%22text%2Fjavascript%22%3E%0A%09function%0A%20%20%20%20cloud()%7B%0A%09%09var%20b1%20%3D%20%22%3Cdiv%20class%3D%5C%22dvbs_cloud%5C%22%20style%3D%5C%22font-size%3A%22%3B%0A%09%09var%20b2%3D%22px%3B%20position%3A%20absolute%3B%20top%3A%20%22%3B%0A%09%09document.write(b1%20%2B%20%22300px%3B%20width%3A%20300px%3B%20height%3A%20300%22%20%2B%20b2%20%2B%20%2234px%3B%20left%3A%2028px%3B%5C%22%3E.%3C%5C%2Fdiv%3E%22)%3B%0A%09%09document.write(b1%20%2B%20%22300px%3B%20width%3A%20300px%3B%20height%3A%20300%22%20%2B%20b2%20%2B%20%2246px%3B%20left%3A%2010px%3B%5C%22%3E.%3C%5C%2Fdiv%3E%22)%3B%0A%09%09document.write(b1%20%2B%20%22300px%3B%20width%3A%20300px%3B%20height%3A%20300%22%20%2B%20b2%20%2B%20%2246px%3B%20left%3A50px%3B%5C%22%3E.%3C%5C%2Fdiv%3E%22)%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%09%09document.write(b1%20%2B%20%22400px%3B%20width%3A%20400px%3B%20height%3A%20400%22%20%2B%20b2%20%2B%20%2224px%3B%20left%3A20px%3B%5C%22%3E.%3C%5C%2Fdiv%3E%22)%3B%0A%20%20%20%20%7D%0A%20%20%20%20%0A%09function%20clouds()%7B%0A%20%20%20%20%20%20%20%20var%20top%20%3D%20%5B%27-80%27%2C%2780%27%2C%27240%27%2C%27400%27%5D%3B%0A%09%09var%20left%20%3D%20-10%3B%0A%20%20%20%20%20%20%20%20var%20a1%20%3D%20%22%3Cdiv%20style%3D%5C%22position%3A%20relative%3B%20top%3A%20%22%3B%0A%09%09var%20a2%20%3D%20%22px%3B%20left%3A%20%22%3B%0A%20%20%20%20%20%20%20%20var%20a3%3D%20%22px%3B%5C%22%3E%3Cscr%22%2B%22ipt%20type%3D%5C%22text%5C%2Fjavascr%22%2B%22ipt%5C%22%3Ecloud()%3B%3C%5C%2Fscr%22%2B%22ipt%3E%3C%5C%2Fdiv%3E%22%3B%0A%20%20%20%20%20%20%20%20for(i%3D0%3B%20i%20%3C%208%3B%20i%2B%2B)%20%7B%0A%09%09%09document.write(a1%2Btop%5B0%5D%2Ba2%2Bleft%2Ba3)%3B%0A%09%09%09document.write(a1%2Btop%5B1%5D%2Ba2%2Bleft%2Ba3)%3B%0A%09%09%09document.write(a1%2Btop%5B2%5D%2Ba2%2Bleft%2Ba3)%3B%0A%09%09%09document.write(a1%2Btop%5B3%5D%2Ba2%2Bleft%2Ba3)%3B%0A%09%09%09if(i%3D%3D4)%0A%09%09%09%7B%0A%09%09%09%09left%20%3D-%2090%3B%0A%09%09%09%09top%20%3D%20%5B%270%27%2C%27160%27%2C%27320%27%2C%27480%27%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20else%20%0A%09%09%09%09left%20%2B%3D%20160%3B%0A%09%09%7D%0A%09%7D%0A%0A%3C%2Fscript%3E%0A%3Cdiv%20class%3D%22dvbs_container%22%20style%3D%22width%3A%20"+
c.AdWidth+"px%3B%20height%3A%20"+c.AdHeight+"px%3B%22%3E%0A%09%3Cscript%20type%3D%22text%2Fjavascript%22%3Eclouds()%3B%3C%2Fscript%3E%0A%3C%2Fdiv%3E"));break;case 2:case 3:d.tagAdtag&&b(d.tagAdtag);break;case 4:c.AdWidth&&c.AdHeight&&b(decodeURIComponent("%3Cstyle%3E%0A.dvbs_container%20%7B%0A%09border%3A%201px%20solid%20%233b599e%3B%0A%09overflow%3A%20hidden%3B%0A%09filter%3A%20progid%3ADXImageTransform.Microsoft.gradient(startColorstr%3D%27%23315d8c%27%2C%20endColorstr%3D%27%2384aace%27)%3B%0A%7D%0A%3C%2Fstyle%3E%0A%3Cdiv%20class%3D%22dvbs_container%22%20style%3D%22width%3A%20"+
c.AdWidth+"%3B%20height%3A%20"+c.AdHeight+"%3B%22%3E%09%0A%3C%2Fdiv%3E"))}}}function M(e){var a=null,h=null,c;var d=e.src,b=dv_GetParam(d,"cmp"),d=dv_GetParam(d,"ctx");c="919838"==d&&"7951767"==b||"919839"==d&&"7939985"==b||"971108"==d&&"7900229"==b||"971108"==d&&"7951940"==b?"</scr'+'ipt>":/<\/scr\+ipt>/g;"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});var n=function(b){if((b=b.previousSibling)&&"#text"==b.nodeName&&(null==b.nodeValue||
void 0==b.nodeValue||0==b.nodeValue.trim().length))b=b.previousSibling;if(b&&"SCRIPT"==b.tagName&&b.getAttribute("type")&&("text/adtag"==b.getAttribute("type").toLowerCase()||"text/passback"==b.getAttribute("type").toLowerCase())&&""!=b.innerHTML.trim()){if("text/adtag"==b.getAttribute("type").toLowerCase())return a=b.innerHTML.replace(c,"<\/script>"),{isBadImp:!1,hasPassback:!1,tagAdTag:a,tagPassback:h};if(null!=h)return{isBadImp:!0,hasPassback:!1,tagAdTag:a,tagPassback:h};h=b.innerHTML.replace(c,
"<\/script>");b=n(b);b.hasPassback=!0;return b}return{isBadImp:!0,hasPassback:!1,tagAdTag:a,tagPassback:h}};return n(e)}function D(e,a,h,c,d,b,n,k,u){var g,i,f;void 0==a.dvregion&&(a.dvregion=0);var r,t,F;try{f=c;for(i=0;10>i&&f!=window._dv_win.top;)i++,f=f.parent;c.depth=i;g=N(c);r="&aUrl="+encodeURIComponent(g.url);t="&aUrlD="+g.depth;F=c.depth+d;b&&c.depth--}catch(j){t=r=F=c.depth=""}void 0!=a.aUrl&&(r="&aUrl="+a.aUrl);d=a.script.src;b="&ctx="+(dv_GetParam(d,"ctx")||"")+"&cmp="+(dv_GetParam(d,
"cmp")||"")+"&plc="+(dv_GetParam(d,"plc")||"")+"&sid="+(dv_GetParam(d,"sid")||"")+"&advid="+(dv_GetParam(d,"advid")||"")+"&adsrv="+(dv_GetParam(d,"adsrv")||"")+"&unit="+(dv_GetParam(d,"unit")||"")+"&uid="+a.uid+"&tagtype="+(dv_GetParam(d,"tagtype")||"")+"&adID="+(dv_GetParam(d,"adID")||"");(f=dv_GetParam(d,"xff"))&&(b+="&xff="+f);(f=dv_GetParam(d,"useragent"))&&(b+="&useragent="+f);if(void 0!=window._dv_win.$dvbs.CommonData.BrowserId&&void 0!=window._dv_win.$dvbs.CommonData.BrowserVersion&&void 0!=
window._dv_win.$dvbs.CommonData.BrowserIdFromUserAgent)g=window._dv_win.$dvbs.CommonData.BrowserId,i=window._dv_win.$dvbs.CommonData.BrowserVersion,f=window._dv_win.$dvbs.CommonData.BrowserIdFromUserAgent;else{var p=f?decodeURIComponent(f):navigator.userAgent;g=[{id:4,brRegex:"OPR|Opera",verRegex:"(OPR/|Version/)"},{id:1,brRegex:"MSIE|Trident/7.*rv:11|rv:11.*Trident/7|Edge/",verRegex:"(MSIE |rv:| Edge/)"},{id:2,brRegex:"Firefox",verRegex:"Firefox/"},{id:0,brRegex:"Mozilla.*Android.*AppleWebKit(?!.*Chrome.*)|Linux.*Android.*AppleWebKit.* Version/.*Chrome",
verRegex:null},{id:0,brRegex:"AOL/.*AOLBuild/|AOLBuild/.*AOL/|Puffin|Maxthon|Valve|Silk|PLAYSTATION|PlayStation|Nintendo|wOSBrowser",verRegex:null},{id:3,brRegex:"Chrome",verRegex:"Chrome/"},{id:5,brRegex:"Safari|(OS |OS X )[0-9].*AppleWebKit",verRegex:"Version/"}];f=0;i="";for(var m=0;m<g.length;m++)if(null!=p.match(RegExp(g[m].brRegex))){f=g[m].id;if(null==g[m].verRegex)break;p=p.match(RegExp(g[m].verRegex+"[0-9]*"));null!=p&&(i=p[0].match(RegExp(g[m].verRegex)),i=p[0].replace(i[0],""));break}g=
m=O();i=m===f?i:"";window._dv_win.$dvbs.CommonData.BrowserId=g;window._dv_win.$dvbs.CommonData.BrowserVersion=i;window._dv_win.$dvbs.CommonData.BrowserIdFromUserAgent=f}b+="&brid="+g+"&brver="+i+"&bridua="+f;(f=dv_GetParam(d,"turl"))&&(b+="&turl="+f);(f=dv_GetParam(d,"tagformat"))&&(b+="&tagformat="+f);f="";try{var q=window._dv_win.parent;f+="&chro="+(void 0===q.chrome?"0":"1");f+="&hist="+(q.history?q.history.length:"");f+="&winh="+q.innerHeight;f+="&winw="+q.innerWidth;f+="&wouh="+q.outerHeight;
f+="&wouw="+q.outerWidth;q.screen&&(f+="&scah="+q.screen.availHeight,f+="&scaw="+q.screen.availWidth)}catch(I){}var b=b+f,E;q=function(){try{return!!window.sessionStorage}catch(a){return!0}};f=function(){try{return!!window.localStorage}catch(a){return!0}};i=function(){var a=document.createElement("canvas");if(a.getContext&&a.getContext("2d")){var b=a.getContext("2d");b.textBaseline="top";b.font="14px 'Arial'";b.textBaseline="alphabetic";b.fillStyle="#f60";b.fillRect(0,0,62,20);b.fillStyle="#069";
b.fillText("!image!",2,15);b.fillStyle="rgba(102, 204, 0, 0.7)";b.fillText("!image!",4,17);return a.toDataURL()}return null};try{g=[];g.push(["lang",navigator.language||navigator.browserLanguage]);g.push(["tz",(new Date).getTimezoneOffset()]);g.push(["hss",q()?"1":"0"]);g.push(["hls",f()?"1":"0"]);g.push(["odb",typeof window.openDatabase||""]);g.push(["cpu",navigator.cpuClass||""]);g.push(["pf",navigator.platform||""]);g.push(["dnt",navigator.doNotTrack||""]);g.push(["canv",i()]);var s=g.join("=!!!=");
if(null==s||""==s)E="";else{q=function(a){for(var b="",c,d=7;0<=d;d--)c=a>>>4*d&15,b+=c.toString(16);return b};f=[1518500249,1859775393,2400959708,3395469782];var s=s+String.fromCharCode(128),z=Math.ceil((s.length/4+2)/16),A=Array(z);for(i=0;i<z;i++){A[i]=Array(16);for(g=0;16>g;g++)A[i][g]=s.charCodeAt(64*i+4*g)<<24|s.charCodeAt(64*i+4*g+1)<<16|s.charCodeAt(64*i+4*g+2)<<8|s.charCodeAt(64*i+4*g+3)}A[z-1][14]=8*(s.length-1)/Math.pow(2,32);A[z-1][14]=Math.floor(A[z-1][14]);A[z-1][15]=8*(s.length-1)&
4294967295;s=1732584193;g=4023233417;var m=2562383102,p=271733878,G=3285377520,v=Array(80),B,w,x,y,H;for(i=0;i<z;i++){for(var l=0;16>l;l++)v[l]=A[i][l];for(l=16;80>l;l++)v[l]=(v[l-3]^v[l-8]^v[l-14]^v[l-16])<<1|(v[l-3]^v[l-8]^v[l-14]^v[l-16])>>>31;B=s;w=g;x=m;y=p;H=G;for(l=0;80>l;l++){var D=Math.floor(l/20),J=B<<5|B>>>27,C;c:{switch(D){case 0:C=w&x^~w&y;break c;case 1:C=w^x^y;break c;case 2:C=w&x^w&y^x&y;break c;case 3:C=w^x^y;break c}C=void 0}var K=J+C+H+f[D]+v[l]&4294967295;H=y;y=x;x=w<<30|w>>>2;
w=B;B=K}s=s+B&4294967295;g=g+w&4294967295;m=m+x&4294967295;p=p+y&4294967295;G=G+H&4294967295}E=q(s)+q(g)+q(m)+q(p)+q(G)}}catch(M){E=null}a=(window._dv_win.dv_config.verifyJSURL||a.protocol+"//"+(window._dv_win.dv_config.bsAddress||"rtb"+a.dvregion+".doubleverify.com")+"/verify.js")+"?jsCallback="+a.callbackName+"&jsTagObjCallback="+a.tagObjectCallbackName+"&num=6"+b+"&srcurlD="+c.depth+"&ssl="+a.ssl+"&refD="+F+a.tagIntegrityFlag+a.tagHasPassbackFlag+"&htmlmsging="+(n?"1":"0")+(null!=E?"&aadid="+E:
"");(c=dv_GetDynamicParams(d).join("&"))&&(a+="&"+c);if(!1===k||u)a=a+("&dvp_isBodyExistOnLoad="+(k?"1":"0"))+("&dvp_isOnHead="+(u?"1":"0"));h="srcurl="+encodeURIComponent(h);if((k=window._dv_win[L("=@42E:@?")][L("2?46DE@C~C:8:?D")])&&0<k.length){u=[];u[0]=window._dv_win.location.protocol+"//"+window._dv_win.location.hostname;for(c=0;c<k.length;c++)u[c+1]=k[c];k=u.reverse().join(",")}else k=null;k&&(h+="&ancChain="+encodeURIComponent(k));k=4E3;/MSIE (\d+\.\d+);/.test(navigator.userAgent)&&7>=new Number(RegExp.$1)&&
(k=2E3);if(d=dv_GetParam(d,"referrer"))d="&referrer="+d,a.length+d.length<=k&&(a+=d);r.length+t.length+a.length<=k&&(a+=t,h+=r);r=P();a+="&vavbkt="+r.vdcd;a+="&lvvn="+r.vdcv;a+="&dvp_vavbkt="+r.vdcd;a+="&dvp_lvvn="+r.vdcv;"prerender"===window._dv_win.document.visibilityState&&(a+="&prndr=1");return a+="&eparams="+encodeURIComponent(L(h))+"&"+e.getVersionParamName()+"="+e.getVersion()}function P(){try{return{vdcv123:5,vdcd:eval(function(a,e,c,d,b,n){b=function(a){return(a<e?"":b(parseInt(a/e)))+(35<
(a%=e)?String.fromCharCode(a+29):a.toString(36))};if(!"".replace(/^/,String)){for(;c--;)n[b(c)]=d[c]||b(c);d=[function(a){return n[a]}];b=function(){return"\\w+"};c=1}for(;c--;)d[c]&&(a=a.replace(RegExp("\\b"+b(c)+"\\b","g"),d[c]));return a}("(d(){17{b n=[1a];17{b 4=1a;3i(4!=4.1r&&4.19.3r.3y){n.12(4.19);4=4.19}}14(e){}d X(y){17{G(b i=0;i<n.1c;i++){V(y(n[i]))7 n[i]==1a.1r?-1:1}7 0}14(e){7 13}}d 1B(v){7 X(d(4){7 4[v]!=13})}d 3h(4,1o,y){G(b v 34 4){V(v.1p(1o)>-1&&(!y||y(4[v])))7 3A}7 3a}d g(s){b h=\"\",t=\"3I.;j&3Y}4b/0:4a'3U=B(3P-22!,1X)2g\\\\{ >1W+1G\\\"1L<\";G(i=0;i<s.1c;i++)f=s.1n(i),e=t.1p(f),0<=e&&(f=t.1n((e+41)%2p)),h+=f;7 h}b c=['2A\"18-2J\"2w\"2v','p','l','2u&p','p','{','-5,!u<}\"2x}\"','p','J','-2y}\"<2B','p','=o',':<2z}T}<\"','p','h','\\\\<}9-2}\"E(D\"1y<N\"[1w*1t\\\\\\\\1v-2t<1s\"1u\"2r]1e}C\"R','e','2l','\"2k\\\\<}O}11>15-10}2}\"2j\"5\"2m}2n<}2q','e','=J','1l}U\"<5}2o\"Q}F\\\\<}[2C}2D:2R]8}6\\\\<}[t:1A\"2Q]8}6\\\\<}[2P})5-u<}t]8}6\\\\<}[2S]8}6\\\\<}[2T}2W]8}2V','e','2U',':2O}<\"w-2N/2M','p','2G','\\\\<}1m<U/H}6\\\\<}1m<U/!8}k','e','=l','\\\\<}1k!2E\\\\<}1k!2H)p?\"M','e','2I','2L:,','p','2K','1l}U\"<5}2i:2X\\\\<}9-2}\"2h\".42-2}\"1P-1O<N\"1N<1Q<1R}C\"3H<1T<1S[<]E\"27\"18}\"2}\"1M[<]E\"27\"18}\"2}\"E<}1E&1D\"1\\\\<}W\\\\1F\\\\<}W\\\\O}11>15-10}2}\"z<1K-2}\"1J\"2.42-2}\"1I=1H\"Q}1V\"Q}P=2b','e','x','29)','p','+','\\\\<}9-2}\"E(D\"2c<:[\\\\2d}}2M][\\\\2f,5}2]2e}C\"R','e','28',':26<Z','p','20','1f\\\\<}1Z:,1Y}U\"<5}21\"Q}25<24<23}2Y','e','39','3O}3N}3M>2s','p','3Q','\\\\<}1d:<16}s<3T}6\\\\<}1d:<16}s<3S<}f\"u}1j\\\\<}1x\\\\<}1d:<16}s<C[S]E:1A\"H}k','e','l{','3D\\'<}W\\\\T}3B','p','==',' &w)&3E','p','3F','\\\\<}E.:2}\"c\"<3J}6\\\\<}3V}6\\\\<}3G<}f\"u}1j\\\\<}1x\\\\<}O:}\"8}k','e','49','\\\\<}9-2}\"E(D\"1y<N\"[1w*1t\\\\\\\\1v-1s\"1u/3X<3W]1e}C\"R','e','40','43\"46','p','e','\\\\<}1z.L>g;w\\'T)Y.45\\\\<}1z.L>g;3z&&3b>w\\'T)Y.I?\"M','e','l=','w:<Z<:5','p','3d','3f-N:38','p','37','\\\\<}1b\"31\\\\<}1b\"30\"<5}2Z\\\\<}1b\"32||\\\\<}33?\"M','e','h+','\\\\<}9-2}\"m\"<5}1g\"1i\\\\<}9-2}\"m\"<5}1h\"36\\\\<}O}11>15-10}2}\"q\\\\<}9-2}\"m\"<5}1g\"1i\\\\<}9-2}\"m\"<5}1h\"3s','e','=S','c>A','p','=','\\\\<}9-2}\"E(D\"3w<:[<Z*1t:Z,3x]F:<3q[<Z*3k]1e}C\"R','e','h=','3l-2}\"m\"<5}8}k','e','3p','1f\\\\<}1q\"\\\\3n\\\\<}1q\"\\\\2a','e','3o','\\\\<}3m}Z<}3j}6\\\\<}3v<f\"8}6\\\\<}3t/<}C!!3u<\"42.42-2}\"H}6\\\\<}3g\"<5}8}k?\"M','e','35','T>;3c\"<44','p','h{','\\\\<}48<47 a}4c}6\\\\<}E}3Z\"3C 3L- H}k','e','3R'];b K=[];G(b j=0;j<c.1c;j+=3){b r=c[j+1]=='p'?1B(g(c[j])):X(d(4){7 2F(g(c[j]))});V(r>0||r<0)K.12(r*1C(g(c[j+2])));1U V(r==13)K.12(-3e*1C(g(c[j+2])))}7 K}14(e){7[-3K]}})();",
62,261,"    win  a44OO return P1 EZ5Ua  var  function       a44  E45Uu wins        prop _  func     a2MQ0242U   for fP1   results  Ma2vsu4f2  E2  aM 3RS    if Z5 ch   N5 U5Z2c push null catch Tg5 ZU5 try g5 parent window EuZ length E_ WDE42 U5q E35f EN5M EM2N4uU2qtvt9 U25sF E_Y qsa EBM charAt str indexOf zt__ top kN7  MuU BuZfEU5 fMU ELMMuQOO 5ML44qWfUM EcIT_0 uf ex parseInt sqt Z27 E2fUuN2z21 lkSvfxWX DM2 tDRm EUM2u 1Z5Ua 1bqyJIma OO2 tDHs5Mq 2qtfUM fbQIuCpu 1SH i2E42 sq2 99D else PSHM2 NhCZ LnG tzsa zt_M hJ q5D8M2 uic2EHVO ZP1 f32M_faB F5ENaB4 u_faB  eS Ld0 B_UB_tD HnDqD 5ML44qtZ UmBu tDE42 Um 5r EC2 qD8 ENM5 QN25sF eo QN2P1ta Z2s qD8M2 82 2Zt EVft  kUM 60 Q42 2Z0 g5a fgM2Z2 ZBu C2 u4f tf5a ZA2 AOO eval ho AEBuf2g lS Na he _M  uM u_a tUZ r5Z2t 24t tUBt tB ee a44nDqD LMMt uMF21 a44nD OOq CfEf2U CfOO CfE35aMfUuN E35aMfUuND in lo zttDP1 le _ZBf lJ false AbL _c hh 100 ___U Eu445Uu co while CcM4P1 1tfMmN4uQ2Mt Z5Ua E4u B__tDOOU5q lh eh Z25 location zttDD ENuM gI Ef2A 5ML44qWZ _t href _I true s5 5M2f UufUuZ2 rLTp hl ErF  Ue 4P1 999 M5 fY45 5IMu M2 Q6T hx lx CF CP1 Kt ErP1 fN4uQLZfEVft kZ PzA _f eJ   45Uu40 4f IOO 5MuC2 4Zf EUuU ll s7 YDoMw8FRp3gd94 UP1".split(" "),
0,{}))}}catch(e){return{vdcv123:5,vdcd:"0"}}}function N(e){try{if(1>=e.depth)return{url:"",depth:""};var a,h=[];h.push({win:window._dv_win.top,depth:0});for(var c,d=1,b=0;0<d&&100>b;){try{if(b++,c=h.shift(),d--,0<c.win.location.toString().length&&c.win!=e)return 0==c.win.document.referrer.length||0==c.depth?{url:c.win.location,depth:c.depth}:{url:c.win.document.referrer,depth:c.depth-1}}catch(n){}a=c.win.frames.length;for(var k=0;k<a;k++)h.push({win:c.win.frames[k],depth:c.depth+1}),d++}return{url:"",
depth:""}}catch(u){return{url:"",depth:""}}}function L(e){new String;var a=new String,h,c,d;for(h=0;h<e.length;h++)d=e.charAt(h),c="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(d),0<=c&&(d="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((c+47)%94)),a+=d;return a}function I(){return Math.floor(1E12*(Math.random()+""))}function O(){try{if("function"===typeof window.callPhantom)return 99;
try{if("function"===typeof window.top.callPhantom)return 99}catch(e){}if(void 0!=window.opera&&void 0!=window.history.navigationMode||void 0!=window.opr&&void 0!=window.opr.addons&&"function"==typeof window.opr.addons.installExtension)return 4;if(void 0!=window.chrome&&"function"==typeof window.chrome.csi&&"function"==typeof window.chrome.loadTimes&&void 0!=document.webkitHidden&&(!0==document.webkitHidden||!1==document.webkitHidden))return 3;if(void 0!=window.mozInnerScreenY&&"number"==typeof window.mozInnerScreenY&&
void 0!=window.mozPaintCount&&0<=window.mozPaintCount&&void 0!=window.InstallTrigger&&void 0!=window.InstallTrigger.install)return 2;if(void 0!=document.uniqueID&&"string"==typeof document.uniqueID&&(void 0!=document.documentMode&&0<=document.documentMode||void 0!=document.all&&"object"==typeof document.all||void 0!=window.ActiveXObject&&"function"==typeof window.ActiveXObject)||window.document&&window.document.updateSettings&&"function"==typeof window.document.updateSettings)return 1;var a=!1;try{var h=
document.createElement("p");h.innerText=".";h.style="text-shadow: rgb(99, 116, 171) 20px -12px 2px";a=void 0!=h.style.textShadow}catch(c){}return 0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")&&a&&void 0!=window.innerWidth&&void 0!=window.innerHeight?5:0}catch(d){return 0}}this.createRequest=function(){this.perf&&this.perf.addTime("r3");var e=!1,a=window._dv_win,h=0,c=!1;try{for(dv_i=0;10>=dv_i;dv_i++)if(null!=a.parent&&a.parent!=a)if(0<a.parent.location.toString().length)a=
a.parent,h++,e=!0;else{e=!1;break}else{0==dv_i&&(e=!0);break}}catch(d){e=!1}0==a.document.referrer.length?e=a.location:e?e=a.location:(e=a.document.referrer,c=!0);window._dv_win._dvScripts||(window._dv_win._dvScripts=[]);var b=document.getElementsByTagName("script");this.dvScripts=[];this.dvOther=this.dvStep=0;for(dv_i in b)if(b[dv_i].src){var n=b[dv_i].src,k=window._dv_win.dv_config.bs_regex||/\.doubleverify\.com:?[0-9]*\/dvbs_src\.js/;if(n&&n.match(k)&&!dv_Contains(window._dv_win._dvScripts,b[dv_i])){this.dvStep=
1;this.dv_script=b[dv_i];window._dv_win._dvScripts.push(b[dv_i]);var u;u=window._dv_win.dv_config?window._dv_win.dv_config.bst2tid?window._dv_win.dv_config.bst2tid:window._dv_win.dv_config.dv_GetRnd?window._dv_win.dv_config.dv_GetRnd():I():I();var g,k=window.parent.postMessage&&window.JSON,i=!0,f=!1;if("0"==dv_GetParam(n,"t2te")||window._dv_win.dv_config&&!0==window._dv_win.dv_config.supressT2T)f=!0;if(k&&!1==f)try{var r=window._dv_win.dv_config.bst2turl||"https://cdn3.doubleverify.com/bst2tv3.html",
f="bst2t_"+u,t=void 0;if(document.createElement&&(t=document.createElement("iframe")))t.name=t.id=window._dv_win.dv_config.emptyIframeID||"iframe_"+I(),t.width=0,t.height=0,t.id=f,t.style.display="none",t.src=r;g=t;i=J(g)}catch(F){}var j;g=n;r={};try{for(var p=RegExp("[\\?&]([^&]*)=([^&#]*)","gi"),m=p.exec(g);null!=m;)"eparams"!==m[1]&&(r[m[1]]=m[2]),m=p.exec(g);j=r}catch(q){j=r}j.perf=this.perf;j.uid=u;j.script=this.dv_script;j.callbackName="__verify_callback_"+j.uid;j.tagObjectCallbackName="__tagObject_callback_"+
j.uid;j.tagAdtag=null;j.tagPassback=null;j.tagIntegrityFlag="";j.tagHasPassbackFlag="";!1==(null!=j.tagformat&&"2"==j.tagformat)&&(p=M(j.script),j.tagAdtag=p.tagAdTag,j.tagPassback=p.tagPassback,p.isBadImp?j.tagIntegrityFlag="&isbadimp=1":p.hasPassback&&(j.tagHasPassbackFlag="&tagpb=1"));j.protocol="http:";j.ssl="0";"https"==j.script.src.match("^https")&&"https"==window._dv_win.location.toString().match("^https")&&(j.protocol="https:",j.ssl="1");this.dvStep=2;K(j);this.perf&&this.perf.addTime("r4");
b=b[dv_i]&&b[dv_i].parentElement&&b[dv_i].parentElement.tagName&&"HEAD"===b[dv_i].parentElement.tagName;this.dvStep=3;return D(this,j,e,a,h,c,k,i,b)}this.dvOther++;n&&n.match(/dvbs_src\.js/)&&(k=dv_Contains(window._dv_win._dvScripts,b[dv_i])?1:0,this.dvScripts.push({src:n,isContain:k}))}};this.sendRequest=function(e){this.perf&&this.perf.addTime("r5");var a=dv_GetParam(e,"tagformat");a&&"2"==a?$dvbs.domUtilities.addScriptResource(e,document.body):dv_sendScriptRequest(e);this.perf&&this.perf.addTime("r6");
return!0};this.isApplicable=function(){return!0};this.onFailure=function(){var e=window._dv_win._dvScripts,a=this.dv_script;null!=e&&(void 0!=e&&a)&&(a=e.indexOf(a),-1!=a&&e.splice(a,1))};window.debugScript&&(window.CreateUrl=D);this.getVersionParamName=function(){return"ver"};this.getVersion=function(){return"32"}};


function dv_baseHandler(){function J(f){if(window._dv_win.document.body)return window._dv_win.document.body.insertBefore(f,window._dv_win.document.body.firstChild),!0;var a=0,h=function(){if(window._dv_win.document.body)try{window._dv_win.document.body.insertBefore(f,window._dv_win.document.body.firstChild)}catch(c){}else a++,150>a&&setTimeout(h,20)};setTimeout(h,20);return!1}function K(f){var a,h=window._dv_win.document.visibilityState;window[f.tagObjectCallbackName]=function(c){if(window._dv_win.$dvbs){var d=
"https"==window._dv_win.location.toString().match("^https")?"https:":"http:";a=c.ImpressionID;window._dv_win.$dvbs.tags.add(c.ImpressionID,f);window._dv_win.$dvbs.tags[c.ImpressionID].set({tagElement:f.script,impressionId:c.ImpressionID,dv_protocol:f.protocol,protocol:d,uid:f.uid,serverPublicDns:c.ServerPublicDns,ServerPublicDns:c.ServerPublicDns});if("prerender"===h)if("prerender"!==window._dv_win.document.visibilityState&&"unloaded"!==visibilityStateLocal)window._dv_win.$dvbs.registerEventCall(c.ImpressionID,
{prndr:0});else{var b;"undefined"!==typeof window._dv_win.document.hidden?b="visibilitychange":"undefined"!==typeof window._dv_win.document.mozHidden?b="mozvisibilitychange":"undefined"!==typeof window._dv_win.document.msHidden?b="msvisibilitychange":"undefined"!==typeof window._dv_win.document.webkitHidden&&(b="webkitvisibilitychange");var q=function(){var a=window._dv_win.document.visibilityState;"prerender"===h&&("prerender"!==a&&"unloaded"!==a)&&(h=a,window._dv_win.$dvbs.registerEventCall(c.ImpressionID,
{prndr:0}),window._dv_win.document.removeEventListener(b,q))};window._dv_win.document.addEventListener(b,q,!1)}}};window[f.callbackName]=function(c){var d;d=window._dv_win.$dvbs&&"object"==typeof window._dv_win.$dvbs.tags[a]?window._dv_win.$dvbs.tags[a]:f;f.perf&&f.perf.addTime("r7");var b=window._dv_win.dv_config.bs_renderingMethod||function(a){document.write(a)};switch(c.ResultID){case 1:d.tagPassback?b(d.tagPassback):c.Passback?b(decodeURIComponent(c.Passback)):c.AdWidth&&c.AdHeight&&b(decodeURIComponent("%3Cstyle%3E%0A.dvbs_container%20%7B%0A%09border%3A%201px%20solid%20%233b599e%3B%0A%09overflow%3A%20hidden%3B%0A%09filter%3A%20progid%3ADXImageTransform.Microsoft.gradient(startColorstr%3D%27%23315d8c%27%2C%20endColorstr%3D%27%2384aace%27)%3B%0A%09%2F*%20for%20IE%20*%2F%0A%09background%3A%20-webkit-gradient(linear%2C%20left%20top%2C%20left%20bottom%2C%20from(%23315d8c)%2C%20to(%2384aace))%3B%0A%09%2F*%20for%20webkit%20browsers%20*%2F%0A%09background%3A%20-moz-linear-gradient(top%2C%20%23315d8c%2C%20%2384aace)%3B%0A%09%2F*%20for%20firefox%203.6%2B%20*%2F%0A%7D%0A.dvbs_cloud%20%7B%0A%09color%3A%20%23fff%3B%0A%09position%3A%20relative%3B%0A%09font%3A%20100%25%22Times%20New%20Roman%22%2C%20Times%2C%20serif%3B%0A%09text-shadow%3A%200px%200px%2010px%20%23fff%3B%0A%09line-height%3A%200%3B%0A%7D%0A%3C%2Fstyle%3E%0A%3Cscript%20type%3D%22text%2Fjavascript%22%3E%0A%09function%0A%20%20%20%20cloud()%7B%0A%09%09var%20b1%20%3D%20%22%3Cdiv%20class%3D%5C%22dvbs_cloud%5C%22%20style%3D%5C%22font-size%3A%22%3B%0A%09%09var%20b2%3D%22px%3B%20position%3A%20absolute%3B%20top%3A%20%22%3B%0A%09%09document.write(b1%20%2B%20%22300px%3B%20width%3A%20300px%3B%20height%3A%20300%22%20%2B%20b2%20%2B%20%2234px%3B%20left%3A%2028px%3B%5C%22%3E.%3C%5C%2Fdiv%3E%22)%3B%0A%09%09document.write(b1%20%2B%20%22300px%3B%20width%3A%20300px%3B%20height%3A%20300%22%20%2B%20b2%20%2B%20%2246px%3B%20left%3A%2010px%3B%5C%22%3E.%3C%5C%2Fdiv%3E%22)%3B%0A%09%09document.write(b1%20%2B%20%22300px%3B%20width%3A%20300px%3B%20height%3A%20300%22%20%2B%20b2%20%2B%20%2246px%3B%20left%3A50px%3B%5C%22%3E.%3C%5C%2Fdiv%3E%22)%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%09%09document.write(b1%20%2B%20%22400px%3B%20width%3A%20400px%3B%20height%3A%20400%22%20%2B%20b2%20%2B%20%2224px%3B%20left%3A20px%3B%5C%22%3E.%3C%5C%2Fdiv%3E%22)%3B%0A%20%20%20%20%7D%0A%20%20%20%20%0A%09function%20clouds()%7B%0A%20%20%20%20%20%20%20%20var%20top%20%3D%20%5B%27-80%27%2C%2780%27%2C%27240%27%2C%27400%27%5D%3B%0A%09%09var%20left%20%3D%20-10%3B%0A%20%20%20%20%20%20%20%20var%20a1%20%3D%20%22%3Cdiv%20style%3D%5C%22position%3A%20relative%3B%20top%3A%20%22%3B%0A%09%09var%20a2%20%3D%20%22px%3B%20left%3A%20%22%3B%0A%20%20%20%20%20%20%20%20var%20a3%3D%20%22px%3B%5C%22%3E%3Cscr%22%2B%22ipt%20type%3D%5C%22text%5C%2Fjavascr%22%2B%22ipt%5C%22%3Ecloud()%3B%3C%5C%2Fscr%22%2B%22ipt%3E%3C%5C%2Fdiv%3E%22%3B%0A%20%20%20%20%20%20%20%20for(i%3D0%3B%20i%20%3C%208%3B%20i%2B%2B)%20%7B%0A%09%09%09document.write(a1%2Btop%5B0%5D%2Ba2%2Bleft%2Ba3)%3B%0A%09%09%09document.write(a1%2Btop%5B1%5D%2Ba2%2Bleft%2Ba3)%3B%0A%09%09%09document.write(a1%2Btop%5B2%5D%2Ba2%2Bleft%2Ba3)%3B%0A%09%09%09document.write(a1%2Btop%5B3%5D%2Ba2%2Bleft%2Ba3)%3B%0A%09%09%09if(i%3D%3D4)%0A%09%09%09%7B%0A%09%09%09%09left%20%3D-%2090%3B%0A%09%09%09%09top%20%3D%20%5B%270%27%2C%27160%27%2C%27320%27%2C%27480%27%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20else%20%0A%09%09%09%09left%20%2B%3D%20160%3B%0A%09%09%7D%0A%09%7D%0A%0A%3C%2Fscript%3E%0A%3Cdiv%20class%3D%22dvbs_container%22%20style%3D%22width%3A%20"+
c.AdWidth+"px%3B%20height%3A%20"+c.AdHeight+"px%3B%22%3E%0A%09%3Cscript%20type%3D%22text%2Fjavascript%22%3Eclouds()%3B%3C%2Fscript%3E%0A%3C%2Fdiv%3E"));break;case 2:case 3:d.tagAdtag&&b(d.tagAdtag);break;case 4:c.AdWidth&&c.AdHeight&&b(decodeURIComponent("%3Cstyle%3E%0A.dvbs_container%20%7B%0A%09border%3A%201px%20solid%20%233b599e%3B%0A%09overflow%3A%20hidden%3B%0A%09filter%3A%20progid%3ADXImageTransform.Microsoft.gradient(startColorstr%3D%27%23315d8c%27%2C%20endColorstr%3D%27%2384aace%27)%3B%0A%7D%0A%3C%2Fstyle%3E%0A%3Cdiv%20class%3D%22dvbs_container%22%20style%3D%22width%3A%20"+
c.AdWidth+"%3B%20height%3A%20"+c.AdHeight+"%3B%22%3E%09%0A%3C%2Fdiv%3E"))}}}function M(f){var a=null,h=null,c;var d=f.src,b=dv_GetParam(d,"cmp"),d=dv_GetParam(d,"ctx");c="919838"==d&&"7951767"==b||"919839"==d&&"7939985"==b||"971108"==d&&"7900229"==b||"971108"==d&&"7951940"==b?"</scr'+'ipt>":/<\/scr\+ipt>/g;"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});var q=function(b){if((b=b.previousSibling)&&"#text"==b.nodeName&&(null==b.nodeValue||
void 0==b.nodeValue||0==b.nodeValue.trim().length))b=b.previousSibling;if(b&&"SCRIPT"==b.tagName&&b.getAttribute("type")&&("text/adtag"==b.getAttribute("type").toLowerCase()||"text/passback"==b.getAttribute("type").toLowerCase())&&""!=b.innerHTML.trim()){if("text/adtag"==b.getAttribute("type").toLowerCase())return a=b.innerHTML.replace(c,"<\/script>"),{isBadImp:!1,hasPassback:!1,tagAdTag:a,tagPassback:h};if(null!=h)return{isBadImp:!0,hasPassback:!1,tagAdTag:a,tagPassback:h};h=b.innerHTML.replace(c,
"<\/script>");b=q(b);b.hasPassback=!0;return b}return{isBadImp:!0,hasPassback:!1,tagAdTag:a,tagPassback:h}};return q(f)}function D(f,a,h,c,d,b,q,k,t){var g,i,e;void 0==a.dvregion&&(a.dvregion=0);var u,s,F;try{e=c;for(i=0;10>i&&e!=window._dv_win.top;)i++,e=e.parent;c.depth=i;g=N(c);u="&aUrl="+encodeURIComponent(g.url);s="&aUrlD="+g.depth;F=c.depth+d;b&&c.depth--}catch(j){s=u=F=c.depth=""}void 0!=a.aUrl&&(u="&aUrl="+a.aUrl);d=a.script.src;b="&ctx="+(dv_GetParam(d,"ctx")||"")+"&cmp="+(dv_GetParam(d,
"cmp")||"")+"&plc="+(dv_GetParam(d,"plc")||"")+"&sid="+(dv_GetParam(d,"sid")||"")+"&advid="+(dv_GetParam(d,"advid")||"")+"&adsrv="+(dv_GetParam(d,"adsrv")||"")+"&unit="+(dv_GetParam(d,"unit")||"")+"&uid="+a.uid+"&tagtype="+(dv_GetParam(d,"tagtype")||"")+"&adID="+(dv_GetParam(d,"adID")||"");(e=dv_GetParam(d,"xff"))&&(b+="&xff="+e);(e=dv_GetParam(d,"useragent"))&&(b+="&useragent="+e);if(void 0!=window._dv_win.$dvbs.CommonData.BrowserId&&void 0!=window._dv_win.$dvbs.CommonData.BrowserVersion&&void 0!=
window._dv_win.$dvbs.CommonData.BrowserIdFromUserAgent)g=window._dv_win.$dvbs.CommonData.BrowserId,i=window._dv_win.$dvbs.CommonData.BrowserVersion,e=window._dv_win.$dvbs.CommonData.BrowserIdFromUserAgent;else{var n=e?decodeURIComponent(e):navigator.userAgent;g=[{id:4,brRegex:"OPR|Opera",verRegex:"(OPR/|Version/)"},{id:1,brRegex:"MSIE|Trident/7.*rv:11|rv:11.*Trident/7|Edge/",verRegex:"(MSIE |rv:| Edge/)"},{id:2,brRegex:"Firefox",verRegex:"Firefox/"},{id:0,brRegex:"Mozilla.*Android.*AppleWebKit(?!.*Chrome.*)|Linux.*Android.*AppleWebKit.* Version/.*Chrome",
verRegex:null},{id:0,brRegex:"AOL/.*AOLBuild/|AOLBuild/.*AOL/|Puffin|Maxthon|Valve|Silk|PLAYSTATION|PlayStation|Nintendo|wOSBrowser",verRegex:null},{id:3,brRegex:"Chrome",verRegex:"Chrome/"},{id:5,brRegex:"Safari|(OS |OS X )[0-9].*AppleWebKit",verRegex:"Version/"}];e=0;i="";for(var m=0;m<g.length;m++)if(null!=n.match(RegExp(g[m].brRegex))){e=g[m].id;if(null==g[m].verRegex)break;n=n.match(RegExp(g[m].verRegex+"[0-9]*"));null!=n&&(i=n[0].match(RegExp(g[m].verRegex)),i=n[0].replace(i[0],""));break}g=
m=O();i=m===e?i:"";window._dv_win.$dvbs.CommonData.BrowserId=g;window._dv_win.$dvbs.CommonData.BrowserVersion=i;window._dv_win.$dvbs.CommonData.BrowserIdFromUserAgent=e}b+="&brid="+g+"&brver="+i+"&bridua="+e;(e=dv_GetParam(d,"turl"))&&(b+="&turl="+e);(e=dv_GetParam(d,"tagformat"))&&(b+="&tagformat="+e);e="";try{var p=window._dv_win.parent;e+="&chro="+(void 0===p.chrome?"0":"1");e+="&hist="+(p.history?p.history.length:"");e+="&winh="+p.innerHeight;e+="&winw="+p.innerWidth;e+="&wouh="+p.outerHeight;
e+="&wouw="+p.outerWidth;p.screen&&(e+="&scah="+p.screen.availHeight,e+="&scaw="+p.screen.availWidth)}catch(I){}var b=b+e,E;p=function(){try{return!!window.sessionStorage}catch(a){return!0}};e=function(){try{return!!window.localStorage}catch(a){return!0}};i=function(){var a=document.createElement("canvas");if(a.getContext&&a.getContext("2d")){var b=a.getContext("2d");b.textBaseline="top";b.font="14px 'Arial'";b.textBaseline="alphabetic";b.fillStyle="#f60";b.fillRect(0,0,62,20);b.fillStyle="#069";
b.fillText("!image!",2,15);b.fillStyle="rgba(102, 204, 0, 0.7)";b.fillText("!image!",4,17);return a.toDataURL()}return null};try{g=[];g.push(["lang",navigator.language||navigator.browserLanguage]);g.push(["tz",(new Date).getTimezoneOffset()]);g.push(["hss",p()?"1":"0"]);g.push(["hls",e()?"1":"0"]);g.push(["odb",typeof window.openDatabase||""]);g.push(["cpu",navigator.cpuClass||""]);g.push(["pf",navigator.platform||""]);g.push(["dnt",navigator.doNotTrack||""]);g.push(["canv",i()]);var r=g.join("=!!!=");
if(null==r||""==r)E="";else{p=function(a){for(var b="",c,d=7;0<=d;d--)c=a>>>4*d&15,b+=c.toString(16);return b};e=[1518500249,1859775393,2400959708,3395469782];var r=r+String.fromCharCode(128),z=Math.ceil((r.length/4+2)/16),A=Array(z);for(i=0;i<z;i++){A[i]=Array(16);for(g=0;16>g;g++)A[i][g]=r.charCodeAt(64*i+4*g)<<24|r.charCodeAt(64*i+4*g+1)<<16|r.charCodeAt(64*i+4*g+2)<<8|r.charCodeAt(64*i+4*g+3)}A[z-1][14]=8*(r.length-1)/Math.pow(2,32);A[z-1][14]=Math.floor(A[z-1][14]);A[z-1][15]=8*(r.length-1)&
4294967295;r=1732584193;g=4023233417;var m=2562383102,n=271733878,G=3285377520,v=Array(80),B,w,x,y,H;for(i=0;i<z;i++){for(var l=0;16>l;l++)v[l]=A[i][l];for(l=16;80>l;l++)v[l]=(v[l-3]^v[l-8]^v[l-14]^v[l-16])<<1|(v[l-3]^v[l-8]^v[l-14]^v[l-16])>>>31;B=r;w=g;x=m;y=n;H=G;for(l=0;80>l;l++){var D=Math.floor(l/20),J=B<<5|B>>>27,C;c:{switch(D){case 0:C=w&x^~w&y;break c;case 1:C=w^x^y;break c;case 2:C=w&x^w&y^x&y;break c;case 3:C=w^x^y;break c}C=void 0}var K=J+C+H+e[D]+v[l]&4294967295;H=y;y=x;x=w<<30|w>>>2;
w=B;B=K}r=r+B&4294967295;g=g+w&4294967295;m=m+x&4294967295;n=n+y&4294967295;G=G+H&4294967295}E=p(r)+p(g)+p(m)+p(n)+p(G)}}catch(M){E=null}a=(window._dv_win.dv_config.verifyJSURL||a.protocol+"//"+(window._dv_win.dv_config.bsAddress||"rtb"+a.dvregion+".doubleverify.com")+"/verify.js")+"?jsCallback="+a.callbackName+"&jsTagObjCallback="+a.tagObjectCallbackName+"&num=6"+b+"&srcurlD="+c.depth+"&ssl="+a.ssl+"&refD="+F+a.tagIntegrityFlag+a.tagHasPassbackFlag+"&htmlmsging="+(q?"1":"0")+(null!=E?"&aadid="+E:
"");(c=dv_GetDynamicParams(d).join("&"))&&(a+="&"+c);if(!1===k||t)a=a+("&dvp_isBodyExistOnLoad="+(k?"1":"0"))+("&dvp_isOnHead="+(t?"1":"0"));h="srcurl="+encodeURIComponent(h);if((k=window._dv_win[L("=@42E:@?")][L("2?46DE@C~C:8:?D")])&&0<k.length){t=[];t[0]=window._dv_win.location.protocol+"//"+window._dv_win.location.hostname;for(c=0;c<k.length;c++)t[c+1]=k[c];k=t.reverse().join(",")}else k=null;k&&(h+="&ancChain="+encodeURIComponent(k));k=4E3;/MSIE (\d+\.\d+);/.test(navigator.userAgent)&&7>=new Number(RegExp.$1)&&
(k=2E3);if(d=dv_GetParam(d,"referrer"))d="&referrer="+d,a.length+d.length<=k&&(a+=d);u.length+s.length+a.length<=k&&(a+=s,h+=u);"prerender"===window._dv_win.document.visibilityState&&(a+="&prndr=1");return a+="&eparams="+encodeURIComponent(L(h))+"&"+f.getVersionParamName()+"="+f.getVersion()}function N(f){try{if(1>=f.depth)return{url:"",depth:""};var a,h=[];h.push({win:window._dv_win.top,depth:0});for(var c,d=1,b=0;0<d&&100>b;){try{if(b++,c=h.shift(),d--,0<c.win.location.toString().length&&c.win!=
f)return 0==c.win.document.referrer.length||0==c.depth?{url:c.win.location,depth:c.depth}:{url:c.win.document.referrer,depth:c.depth-1}}catch(q){}a=c.win.frames.length;for(var k=0;k<a;k++)h.push({win:c.win.frames[k],depth:c.depth+1}),d++}return{url:"",depth:""}}catch(t){return{url:"",depth:""}}}function L(f){new String;var a=new String,h,c,d;for(h=0;h<f.length;h++)d=f.charAt(h),c="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(d),0<=c&&(d=
"!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((c+47)%94)),a+=d;return a}function I(){return Math.floor(1E12*(Math.random()+""))}function O(){try{if("function"===typeof window.callPhantom)return 99;try{if("function"===typeof window.top.callPhantom)return 99}catch(f){}if(void 0!=window.opera&&void 0!=window.history.navigationMode||void 0!=window.opr&&void 0!=window.opr.addons&&"function"==typeof window.opr.addons.installExtension)return 4;
if(void 0!=window.chrome&&"function"==typeof window.chrome.csi&&"function"==typeof window.chrome.loadTimes&&void 0!=document.webkitHidden&&(!0==document.webkitHidden||!1==document.webkitHidden))return 3;if(void 0!=window.mozInnerScreenY&&"number"==typeof window.mozInnerScreenY&&void 0!=window.mozPaintCount&&0<=window.mozPaintCount&&void 0!=window.InstallTrigger&&void 0!=window.InstallTrigger.install)return 2;if(void 0!=document.uniqueID&&"string"==typeof document.uniqueID&&(void 0!=document.documentMode&&
0<=document.documentMode||void 0!=document.all&&"object"==typeof document.all||void 0!=window.ActiveXObject&&"function"==typeof window.ActiveXObject)||window.document&&window.document.updateSettings&&"function"==typeof window.document.updateSettings)return 1;var a=!1;try{var h=document.createElement("p");h.innerText=".";h.style="text-shadow: rgb(99, 116, 171) 20px -12px 2px";a=void 0!=h.style.textShadow}catch(c){}return 0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")&&
a&&void 0!=window.innerWidth&&void 0!=window.innerHeight?5:0}catch(d){return 0}}this.createRequest=function(){this.perf&&this.perf.addTime("r3");var f=!1,a=window._dv_win,h=0,c=!1;try{for(dv_i=0;10>=dv_i;dv_i++)if(null!=a.parent&&a.parent!=a)if(0<a.parent.location.toString().length)a=a.parent,h++,f=!0;else{f=!1;break}else{0==dv_i&&(f=!0);break}}catch(d){f=!1}0==a.document.referrer.length?f=a.location:f?f=a.location:(f=a.document.referrer,c=!0);window._dv_win._dvScripts||(window._dv_win._dvScripts=
[]);var b=document.getElementsByTagName("script");this.dvScripts=[];this.dvOther=this.dvStep=0;for(dv_i in b)if(b[dv_i].src){var q=b[dv_i].src,k=window._dv_win.dv_config.bs_regex||/\.doubleverify\.com:?[0-9]*\/dvbs_src\.js/;if(q&&q.match(k)&&!dv_Contains(window._dv_win._dvScripts,b[dv_i])){this.dvStep=1;this.dv_script=b[dv_i];window._dv_win._dvScripts.push(b[dv_i]);var t;t=window._dv_win.dv_config?window._dv_win.dv_config.bst2tid?window._dv_win.dv_config.bst2tid:window._dv_win.dv_config.dv_GetRnd?
window._dv_win.dv_config.dv_GetRnd():I():I();var g,k=window.parent.postMessage&&window.JSON,i=!0,e=!1;if("0"==dv_GetParam(q,"t2te")||window._dv_win.dv_config&&!0==window._dv_win.dv_config.supressT2T)e=!0;if(k&&!1==e)try{var u=window._dv_win.dv_config.bst2turl||"https://cdn3.doubleverify.com/bst2tv3.html",e="bst2t_"+t,s=void 0;if(document.createElement&&(s=document.createElement("iframe")))s.name=s.id=window._dv_win.dv_config.emptyIframeID||"iframe_"+I(),s.width=0,s.height=0,s.id=e,s.style.display=
"none",s.src=u;g=s;i=J(g)}catch(F){}var j;g=q;u={};try{for(var n=RegExp("[\\?&]([^&]*)=([^&#]*)","gi"),m=n.exec(g);null!=m;)"eparams"!==m[1]&&(u[m[1]]=m[2]),m=n.exec(g);j=u}catch(p){j=u}j.perf=this.perf;j.uid=t;j.script=this.dv_script;j.callbackName="__verify_callback_"+j.uid;j.tagObjectCallbackName="__tagObject_callback_"+j.uid;j.tagAdtag=null;j.tagPassback=null;j.tagIntegrityFlag="";j.tagHasPassbackFlag="";!1==(null!=j.tagformat&&"2"==j.tagformat)&&(n=M(j.script),j.tagAdtag=n.tagAdTag,j.tagPassback=
n.tagPassback,n.isBadImp?j.tagIntegrityFlag="&isbadimp=1":n.hasPassback&&(j.tagHasPassbackFlag="&tagpb=1"));j.protocol="http:";j.ssl="0";"https"==j.script.src.match("^https")&&"https"==window._dv_win.location.toString().match("^https")&&(j.protocol="https:",j.ssl="1");this.dvStep=2;K(j);this.perf&&this.perf.addTime("r4");b=b[dv_i]&&b[dv_i].parentElement&&b[dv_i].parentElement.tagName&&"HEAD"===b[dv_i].parentElement.tagName;this.dvStep=3;return D(this,j,f,a,h,c,k,i,b)}this.dvOther++;q&&q.match(/dvbs_src\.js/)&&
(k=dv_Contains(window._dv_win._dvScripts,b[dv_i])?1:0,this.dvScripts.push({src:q,isContain:k}))}};this.sendRequest=function(f){this.perf&&this.perf.addTime("r5");var a=dv_GetParam(f,"tagformat");a&&"2"==a?$dvbs.domUtilities.addScriptResource(f,document.body):dv_sendScriptRequest(f);this.perf&&this.perf.addTime("r6");return!0};this.isApplicable=function(){return!0};this.onFailure=function(){var f=window._dv_win._dvScripts,a=this.dv_script;null!=f&&(void 0!=f&&a)&&(a=f.indexOf(a),-1!=a&&f.splice(a,
1))};window.debugScript&&(window.CreateUrl=D);this.getVersionParamName=function(){return"ver"};this.getVersion=function(){return"31"}};


function dvbs_src_main(dvbs_baseHandlerIns, dvbs_handlersDefs) {

    var getCurrentTime = function() {
        "use strict";
        if (Date.now) {
            return Date.now();
        }
        return (new Date()).getTime();
    };
    /**
     * r0 - Start
     * r1 - Before exec
     * r2 - After exec
     * r3 - Start createRequest
     * r4 - End createRequest
     * r5 - Start sendRequest
     * r6 - End sendRequest
     * r7 - In callback
     */

    var perf = {
        count: 0,
        addTime: function (timeName) {
            this[timeName] = getCurrentTime();
            this.count += 1;
        }
    };
    perf.addTime('r0');

    this.bs_baseHandlerIns = dvbs_baseHandlerIns;
    this.bs_handlersDefs = dvbs_handlersDefs;

    this.exec = function() {
        perf.addTime('r1');
        try {
            window._dv_win = (window._dv_win || window);
            window._dv_win.$dvbs = (window._dv_win.$dvbs || new dvBsType());

            window._dv_win.dv_config = window._dv_win.dv_config || { };
            window._dv_win.dv_config.bsErrAddress = window._dv_win.dv_config.bsAddress || 'rtb0.doubleverify.com';

            for(var index = 0; index < this.bs_handlersDefs.length; index++) {
                if (this.bs_handlersDefs[index] && this.bs_handlersDefs[index].handler)
                    this.bs_handlersDefs[index].handler.perf = perf;
            }
            this.bs_baseHandlerIns.perf = perf;

            var errorsArr = (new dv_rolloutManager(this.bs_handlersDefs, this.bs_baseHandlerIns)).handle();
            if (errorsArr && errorsArr.length > 0)
                dv_SendErrorImp(window._dv_win.dv_config.bsErrAddress + '/verify.js?ctx=818052&cmp=1619415&num=6', errorsArr);
        }
        catch(e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.bsErrAddress + '/verify.js?ctx=818052&cmp=1619415&num=6&dvp_isLostImp=1', { dvp_jsErrMsg: encodeURIComponent(e) });
            } catch(e) { }
        }
        perf.addTime('r2');
    };
};

try {
    window._dv_win = window._dv_win || window;
    var dv_baseHandlerIns = new dv_baseHandler();
	dv_handler32.prototype = dv_baseHandlerIns;
dv_handler32.prototype.constructor = dv_handler32;

    var dv_handlersDefs = [{handler: new dv_handler32(), minRate: 0, maxRate: 10}];
    (new dvbs_src_main(dv_baseHandlerIns, dv_handlersDefs)).exec();
} catch (e) { }