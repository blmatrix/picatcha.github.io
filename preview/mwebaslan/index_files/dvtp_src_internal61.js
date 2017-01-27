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
            if (index != handlersArray.length) 
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

function getCurrentTime() {
    "use strict";
    if (Date.now) {
        return Date.now();
    }
    return (new Date()).getTime();
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

function dv_GetKeyValue(url) {
    var keyReg = new RegExp(".*=");
    var keyRet = url.match(keyReg)[0];
    keyRet = keyRet.replace("=", "");

    var valReg = new RegExp("=.*");
    var valRet = url.match(valReg)[0];
    valRet = valRet.replace("=", "");

    return {key: keyRet, value: valRet};
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

function dv_GetDynamicParams(url, prefix) {
    try {
        prefix = (prefix != undefined && prefix != null) ? prefix : 'dvp';
        var regex = new RegExp("[\\?&](" + prefix + "_[^&]*=[^&#]*)", "gi");
        var dvParams = regex.exec(url);

        var results = [];
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
    for (var key in errorObj) {
        if (errorObj.hasOwnProperty(key)) {
            if (key.indexOf('dvp_jsErrUrl') == -1) {
                errorQueryString += '&' + key + '=' + errorObj[key];
            } else {
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
    return errorImp;
}

function dv_sendImgImp(url) {
    (new Image()).src = url;
}

function dv_getPropSafe(obj, propName) {
    try {
        if (obj)
            return obj[propName];
    } catch (e) {
    }
}

function dvType() {
    var that = this;
    var eventsForDispatch = {};
    this.t2tEventDataZombie = {};

    this.processT2TEvent = function (data, tag) {
        try {
            if (tag.ServerPublicDns) {
                var tpsServerUrl = tag.dv_protocol + '//' + tag.ServerPublicDns + '/event.gif?impid=' + tag.uid;

                if (!tag.uniquePageViewId) {
                    tag.uniquePageViewId = data.uniquePageViewId;
                }

                tpsServerUrl += '&upvid=' + tag.uniquePageViewId;
                $dv.domUtilities.addImage(tpsServerUrl, tag.tagElement.parentElement);
            }
        } catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&jsver=0&dvp_ist2tProcess=1', {dvp_jsErrMsg: encodeURIComponent(e)});
            } catch (ex) {
            }
        }
    };

    this.processTagToTagCollision = function (collision, tag) {
        var i;
        for (i = 0; i < collision.eventsToFire.length; i++) {
            this.pubSub.publish(collision.eventsToFire[i], tag.uid);
        }
        var tpsServerUrl = tag.dv_protocol + '//' + tag.ServerPublicDns + '/event.gif?impid=' + tag.uid;
        tpsServerUrl += '&colltid=' + collision.allReasonsForTagBitFlag;

        for (i = 0; i < collision.reasons.length; i++) {
            var reason = collision.reasons[i];
            tpsServerUrl += '&' + reason.name + "ms=" + reason.milliseconds;
        }

        if (collision.thisTag) {
            tpsServerUrl += '&tlts=' + collision.thisTag.t2tLoadTime;
        }
        if (tag.uniquePageViewId) {
            tpsServerUrl += '&upvid=' + tag.uniquePageViewId;
        }
        $dv.domUtilities.addImage(tpsServerUrl, tag.tagElement.parentElement);
    };

    this.processBSIdFound = function (bsID, tag) {
        var tpsServerUrl = tag.dv_protocol + '//' + tag.ServerPublicDns + '/event.gif?impid=' + tag.uid;
        tpsServerUrl += '&bsimpid=' + bsID;
        if (tag.uniquePageViewId) {
            tpsServerUrl += '&upvid=' + tag.uniquePageViewId;
        }
        $dv.domUtilities.addImage(tpsServerUrl, tag.tagElement.parentElement);
    };

    this.processBABSVerbose = function (verboseReportingValues, tag) {
        var queryString = "";
        


        var dvpPrepend = "&dvp_BABS_";
        queryString += dvpPrepend + 'NumBS=' + verboseReportingValues.bsTags.length;

        for (var i = 0; i < verboseReportingValues.bsTags.length; i++) {
            var thisFrame = verboseReportingValues.bsTags[i];

            queryString += dvpPrepend + 'GotCB' + i + '=' + thisFrame.callbackReceived;
            queryString += dvpPrepend + 'Depth' + i + '=' + thisFrame.depth;

            if (thisFrame.callbackReceived) {
                if (thisFrame.bsAdEntityInfo && thisFrame.bsAdEntityInfo.comparisonItems) {
                    for (var itemIndex = 0; itemIndex < thisFrame.bsAdEntityInfo.comparisonItems.length; itemIndex++) {
                        var compItem = thisFrame.bsAdEntityInfo.comparisonItems[itemIndex];
                        queryString += dvpPrepend + "tag" + i + "_" + compItem.name + '=' + compItem.value;
                    }
                }
            }
        }

        if (queryString.length > 0) {
            var tpsServerUrl = '';
            if (tag) {
                var tpsServerUrl = tag.dv_protocol + '//' + tag.ServerPublicDns + '/event.gif?impid=' + tag.uid;
            }
            var requestString = tpsServerUrl + queryString;
            $dv.domUtilities.addImage(requestString, tag.tagElement.parentElement);
        }
    };

    var messageEventListener = function (event) {
        try {
            var timeCalled = getCurrentTime();
            var data = window.JSON.parse(event.data);
            if (!data.action) {
                data = window.JSON.parse(data);
            }
            var myUID;
            var visitJSHasBeenCalledForThisTag = false;
            if ($dv.tags) {
                for (var uid in $dv.tags) {
                    if ($dv.tags.hasOwnProperty(uid) && $dv.tags[uid] && $dv.tags[uid].t2tIframeId === data.iFrameId) {
                        myUID = uid;
                        visitJSHasBeenCalledForThisTag = true;
                        break;
                    }
                }
            }

            var tag;
            switch (data.action) {
                case 'uniquePageViewIdDetermination':
                    if (visitJSHasBeenCalledForThisTag) {
                        $dv.processT2TEvent(data, $dv.tags[myUID]);
                        $dv.t2tEventDataZombie[data.iFrameId] = undefined;
                    }
                    else {
                        data.wasZombie = 1;
                        $dv.t2tEventDataZombie[data.iFrameId] = data;
                    }
                    break;
                case 'maColl':
                    tag = $dv.tags[myUID];
                    if (!tag.uniquePageViewId) {
                        tag.uniquePageViewId = data.uniquePageViewId;
                    }
                    data.collision.commonRecievedTS = timeCalled;
                    $dv.processTagToTagCollision(data.collision, tag);
                    break;
                case 'bsIdFound':
                    tag = $dv.tags[myUID];
                    if (!tag.uniquePageViewId) {
                        tag.uniquePageViewId = data.uniquePageViewId;
                    }
                    $dv.processBSIdFound(data.id, tag);
                    break;
                case 'babsVerbose':
                    try {
                        tag = $dv.tags[myUID];
                        $dv.processBABSVerbose(data, tag);
                    } catch (err) {
                    }
                    break;
            }

        } catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&jsver=0&dvp_ist2tListener=1', {dvp_jsErrMsg: encodeURIComponent(e)});
            } catch (ex) {
            }
        }
    };

    if (window.addEventListener)
        addEventListener("message", messageEventListener, false);
    else
        attachEvent("onmessage", messageEventListener);

    this.pubSub = new function () {
        var subscribers = [];
        var prerenderHistory = {};

        var publishRtnEvent = function (eventName, uid) {
            var actionsResults = [];
            try {
                if (subscribers[eventName + uid] instanceof Array)
                    for (var i = 0; i < subscribers[eventName + uid].length; i++) {
                        var funcObject = subscribers[eventName + uid][i];
                        if (funcObject && funcObject.Func && typeof funcObject.Func == "function" && funcObject.ActionName) {
                            var isSucceeded = runSafely(function () {
                                return funcObject.Func(uid);
                            });
                            actionsResults.push(encodeURIComponent(funcObject.ActionName) + '=' + (isSucceeded ? '1' : '0'));
                        }
                    }
            }
            catch (e) { }
            return actionsResults;
        };

        this.publishHistoryRtnEvent = function (uid) {
            var actionsResults = [];

            if (prerenderHistory && prerenderHistory[uid]) {
                for (var key in prerenderHistory[uid]) {
                    if (prerenderHistory[uid][key])
                        actionsResults.push.apply(actionsResults, publishRtnEvent(prerenderHistory[uid][key], uid));
                }
                prerenderHistory[uid] = [];
            }

            return actionsResults;
        };

        this.subscribe = function (eventName, uid, actionName, func) {
            if (!subscribers[eventName + uid])
                subscribers[eventName + uid] = [];
            subscribers[eventName + uid].push({Func: func, ActionName: actionName});
        };

        this.publish = function (eventName, uid) {
            var actionsResults = [];
            try {
                if (eventName && uid) {
                    if ($dv && $dv.tags[uid] && $dv.tags[uid].prndr) {
                        prerenderHistory[uid] = prerenderHistory[uid] || [];
                        prerenderHistory[uid].push(eventName);
                    }
                    else {
                        actionsResults.push.apply(actionsResults, this.publishHistoryRtnEvent(uid));
                        actionsResults.push.apply(actionsResults, publishRtnEvent(eventName, uid));
                    }
                }
            } catch (e) { }
            return actionsResults.join('&');
        };
    };

    this.domUtilities = new function () {
        function getDefaultParent() {
            return document.body || document.head || document.documentElement;
        }

        this.createImage = function (parentElement) {
            parentElement = parentElement || getDefaultParent();
            var image = parentElement.ownerDocument.createElement("img");
            image.width = 0;
            image.height = 0;
            image.style.display = 'none';
            image.src='';
            parentElement.insertBefore(image, parentElement.firstChild);
            return image;
        };

        var imgArr = [];
        var nextImg = 0;
        var imgArrCreated = false;
        if (!navigator.sendBeacon) {
            imgArr[0] = this.createImage();
            imgArr[1] = this.createImage();
            imgArrCreated = true;
        }

        this.addImage = function (url, parentElement, useGET, usePrerenderedImage) {
            parentElement = parentElement || getDefaultParent();
            if (!useGET && navigator.sendBeacon) {
                var message = appendCacheBuster(url);
                navigator.sendBeacon(message, {});
            } else {
                var image;
                if (usePrerenderedImage && imgArrCreated) {
                    image = imgArr[nextImg];
                    image.src = appendCacheBuster(url);
                    nextImg = (nextImg + 1) % imgArr.length;
                } else {
                    image = this.createImage(parentElement);
                    image.src = appendCacheBuster(url);
                    parentElement.insertBefore(image, parentElement.firstChild);
                }
            }
        };



        this.addScriptResource = function (url, parentElement) {
            parentElement = parentElement || getDefaultParent();
            var scriptElem = parentElement.ownerDocument.createElement("script");
            scriptElem.type = 'text/javascript';
            scriptElem.src = appendCacheBuster(url);
            parentElement.insertBefore(scriptElem, parentElement.firstChild);
        };

        this.addScriptCode = function (srcCode, parentElement) {
            parentElement = parentElement || getDefaultParent();
            var scriptElem = parentElement.ownerDocument.createElement("script");
            scriptElem.type = 'text/javascript';
            scriptElem.innerHTML = srcCode;
            parentElement.insertBefore(scriptElem, parentElement.firstChild);
        };

        this.addHtml = function (srcHtml, parentElement) {
            parentElement = parentElement || getDefaultParent();
            var divElem = parentElement.ownerDocument.createElement("div");
            divElem.style = "display: inline";
            divElem.innerHTML = srcHtml;
            parentElement.insertBefore(divElem, parentElement.firstChild);
        }
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
        }
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

    this.registerEventCall = function (impressionId, eventObject, timeoutMs, isRegisterEnabled, usePrerenderedImage) {
        if (typeof isRegisterEnabled !== 'undefined' && isRegisterEnabled === true) {
            addEventCallForDispatch(impressionId, eventObject);

            if (typeof timeoutMs === 'undefined' || timeoutMs == 0 || isNaN(timeoutMs))
                dispatchEventCallsNow(impressionId, eventObject);
            else {
                if (timeoutMs > 2000)
                    timeoutMs = 2000;

                var that = this;
                setTimeout(
                    function () {
                        that.dispatchEventCalls(impressionId);
                    }, timeoutMs);
            }

        } else {
            var url = this.tags[impressionId].protocol + '//' + this.tags[impressionId].ServerPublicDns + "/event.gif?impid=" + impressionId + '&' + createQueryStringParams(eventObject);

            this.domUtilities.addImage(url, this.tags[impressionId].tagElement.parentNode, false, usePrerenderedImage);
        }
    };

    var mraidObjectCache;
    this.getMraid = function () {
        var context = window._dv_win || window;
        var iterationCounter = 0;
        var maxIterations = 20;

        function getMraidRec(context) {
            iterationCounter++;
            var isTopWindow = context.parent == context;
            if (context.mraid || isTopWindow) {
                return context.mraid;
            } else {
                return ( iterationCounter <= maxIterations ) && getMraidRec(context.parent);
            }
        }

        try {
            return mraidObjectCache = mraidObjectCache || getMraidRec(context);
        } catch (e) {
        }
    };

    var dispatchEventCallsNow = function (impressionId, eventObject) {
        addEventCallForDispatch(impressionId, eventObject);
        dispatchEventCalls(impressionId);
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

    this.dispatchRegisteredEventsFromAllTags = function () {
        for (var impressionId in this.tags) {
            if (typeof this.tags[impressionId] !== 'function' && typeof this.tags[impressionId] !== 'undefined')
                this.dispatchEventCalls(impressionId);
        }
    };

    this.dispatchEventCalls = function (impressionId) {
        if (typeof eventsForDispatch[impressionId] !== 'undefined' && eventsForDispatch[impressionId] != null) {
            var url = this.tags[impressionId].protocol + '//' + this.tags[impressionId].ServerPublicDns + "/event.gif?impid=" + impressionId + '&' + createQueryStringParams(eventsForDispatch[impressionId]);
            this.domUtilities.addImage(url, this.tags[impressionId].tagElement.parentElement);
            eventsForDispatch[impressionId] = null;
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
}

function dv_baseHandler(){function pb(){try{return{vdcv:17,vdcd:eval(function(a,d,e,j,k,C){k=function(a){return(a<d?"":k(parseInt(a/d)))+(35<(a%=d)?String.fromCharCode(a+29):a.toString(36))};if(!"".replace(/^/,String)){for(;e--;)C[k(e)]=j[e]||k(e);j=[function(a){return C[a]}];k=function(){return"\\w+"};e=1}for(;e--;)j[e]&&(a=a.replace(RegExp("\\b"+k(e)+"\\b","g"),j[e]));return a}("(y(){1i{1i{2w('1')}19(e){d[-5O]}w 13=[1A];1i{w G=1A;5K(G!=G.1O&&G.1C.5W.69){13.1B(G.1C);G=G.1C}}19(e){}y 1y(14){1i{1h(w i=0;i<13.1D;i++){1g(14(13[i]))d 13[i]==1A.1O?-1:1}d 0}19(e){d 1x}}y 2z(16){d 1y(y(D){d D[16]!=1x})}y 2F(D,1N,14){1h(w 16 53 D){1g(16.1W(1N)>-1&&(!14||14(D[16])))d 5v}d 5A}y g(s){w h=\"\",t=\"5u.;j&71}74/0:79'7a=B(7f-6v!,6g)5r\\\\{ >6m+6z\\\"3l<\";1h(i=0;i<s.1D;i++)f=s.1V(i),e=t.1W(f),0<=e&&(f=t.1V((e+41)%51)),h+=f;d h}w c=['4J\"1z-4B\"4x\"4T','p','l','60&p','p','{','\\\\<}4\\\\4M-43<\"48\\\\<}4\\\\6D<Z?\"6','e','4h','-5,!u<}\"4i}\"','p','J','-4g}\"<4e','p','=o','\\\\<}4\\\\1T\"2f\"O\\\\<}4\\\\1T\"2f\"4b}2\"<,u\"<5}?\"6','e','J=',':<4c}T}<\"','p','h','\\\\<}4\\\\8-2}\"E(n\"15}9?\\\\<}4\\\\8-2}\"E(n\"26<N\"[1p*1t\\\\\\\\25-4d<1Z\"22\"4j]1e}C\"V','e','4k','\"17\\\\<}4\\\\29\"I<-4q\"1G\"5\"4r}1H<}4p\"17\\\\<}4\\\\1a}1s>1u-1r}2}\"1G\"5\"4o}1H<}4l','e','=J','1k}U\"<5}4m\"b}F\\\\<}4\\\\[4n}4a:49]k}7\\\\<}4\\\\[t:2j\"3W]k}7\\\\<}4\\\\[3X})5-u<}t]k}7\\\\<}4\\\\[3V]k}7\\\\<}4\\\\[3U}3R]k}3S','e','3T',':3Y}<\"H-2l/2M','p','3Z','\\\\<}4\\\\K<U/1j}7\\\\<}4\\\\K<U/!k}9','e','=l','\\\\<}4\\\\1U!47\\\\<}4\\\\1U!46)p?\"6','e','45','-}\"40','p','x{','\\\\<}4\\\\v<1o\"17\\\\<}4\\\\v<1E}U\"<5}Q\\\\<}4\\\\2q-2.42-2}\"O\\\\<}4\\\\2q-2.42-2}\"2k\"44:4s\\\\4t<28}t?\"6','e','4R','4S:,','p','4Q','\\\\<}4\\\\4P\\\\<}4\\\\1Y\"2i\\\\<}4\\\\1Y\"2e,T}2g+++++Q\\\\<}4\\\\4N\\\\<}4\\\\2h\"2i\\\\<}4\\\\2h\"2e,T}2g+++++t','e','4Z','\\\\<}4\\\\2k\"2l\"4Y}7\\\\<}4\\\\E\\\\4X<M?\"6','e','4V','1k}U\"<5}X:4W\\\\<}4\\\\8-2}\"2B\".42-2}\"4L-4K<N\"4z<4A<4y}C\"3H<4u<4v[<]E\"27\"1z}\"2}\"4w[<]E\"27\"1z}\"2}\"E<}12&4C\"1\\\\<}4\\\\2p\\\\4I\\\\<}4\\\\2p\\\\1a}1s>1u-1r}2}\"z<3Q-2}\"4G\"2.42-2}\"4D=4E\"b}4F\"b}P=3D','e','x','31)','p','+','\\\\<}4\\\\2o:32<5}30\\\\<}4\\\\2o\"2Z?\"6','e','2W','L!!2X.2Y.H 33','p','x=','\\\\<}4\\\\2n\"34\\\\<}4\\\\2n\"39--3a<\"2f?\"6','e','x+','\\\\<}4\\\\2m)u\"2V\\\\<}4\\\\2m)u\"35?\"6','e','36','\\\\<}4\\\\2d}s<3b\\\\<}4\\\\2d}s<2H\" 2L-2J?\"6','e','2I','\\\\<}4\\\\8-2}\"E(n\"15}9?\\\\<}4\\\\8-2}\"E(n\"2K<:[\\\\2N}}2M][\\\\2S,5}2]2T}C\"V','e','2R','1f\\\\<}4\\\\2Q}2O\\\\<}4\\\\2P$38','e','3P',':3C<Z','p','3c','\\\\<}4\\\\E-3E\\\\<}4\\\\E-3B}3A\\\\<}4\\\\E-3x<3y?\"6','e','3z','\\\\<}4\\\\E\"1n\\\\<}4\\\\E\"1q-3F?\"6','e','3G','1f\\\\<}4\\\\3N:,3O}U\"<5}1l\"b}3M<3L<3I}3J','e','3K','\\\\<}4\\\\K<U/3w&24\"E/21\\\\<}4\\\\K<U/3v}C\"2E\\\\<}4\\\\K<U/f[&24\"E/21\\\\<}4\\\\K<U/3j[S]]29\"3h}9?\"6','e','3g','3d}3e}3f>2s','p','3m','\\\\<}4\\\\18:<1w}s<3s}7\\\\<}4\\\\18:<1w}s<3t<}f\"u}2a\\\\<}4\\\\2b\\\\<}4\\\\18:<1w}s<C[S]E:2j\"1j}9','e','l{','3q\\'<}4\\\\T}3n','p','==','\\\\<}4\\\\v<1o\\\\<}4\\\\v<1F\\\\<Z\"1L\\\\<}4\\\\v<1I<1K\"?\"6','e','3o','\\\\<}4\\\\E\"2f\"3p\\\\<}4\\\\4H<5s?\"6','e','o{','\\\\<}4\\\\E:52}7\\\\<}4\\\\6E-6C}7\\\\<}4\\\\E:6B\"<6y\\\\}k}9?\"6','e','{S','\\\\<}4\\\\10}\"11}6A\"-6F\"2f\"q\\\\<}4\\\\m\"<5}6G?\"6','e','o+',' &H)&6M','p','6N','\\\\<}4\\\\E.:2}\"c\"<6L}7\\\\<}4\\\\6K}7\\\\<}4\\\\6H<}f\"u}2a\\\\<}4\\\\2b\\\\<}4\\\\1a:}\"k}9','e','6x','6w\"5-\\'6l:2M','p','J{','\\\\<}4\\\\8-2}\"E(n\"15}9?\\\\<}4\\\\8-2}\"E(n\"26<N\"[1p*1t\\\\\\\\25-1Z\"22/6h<6i]1e}C\"V','e','6n',')6o!6u}s<C','p','6t','\\\\<}4\\\\2r<<6s\\\\<}4\\\\2r<<6q<}f\"u}6P?\"6','e','{l','\\\\<}4\\\\23.L>g;H\\'T)Y.6O\\\\<}4\\\\23.L>g;7d&&7c>H\\'T)Y.I?\"6','e','l=','1f\\\\<}4\\\\7h\\\\7b>7g}U\"<5}1l\"b}F\"2c}U\"<5}7i\\\\<}4\\\\7j<78-20\"u\"6V}U\"<5}1l\"b}F\"2c}U\"<5}6U','e','{J','H:<Z<:5','p','6T','\\\\<}4\\\\k\\\\<}4\\\\E\"6Q\\\\<}4\\\\m\"<5}2A\"2y}/Q\\\\<}4\\\\8-2}\"2x<}12&6R\\\\<}4\\\\m\"<5}W\"}u-6S=?1k}U\"<5}X\"1d\"b}6Y\\\\<}4\\\\10}\"m\"<5}6Z\"1b\"b}F\"75','e','76','\\\\<}4\\\\1m-U\\\\O\\\\<}4\\\\1m-77\\\\<}4\\\\1m-\\\\<}?\"6','e','73','70-N:72','p','6r','\\\\<}4\\\\1v\"6e\\\\<}4\\\\1v\"5q\"<5}6f\\\\<}4\\\\1v\"5o||\\\\<}4\\\\5l?\"6','e','h+','5m<u-5n/','p','{=','\\\\<}4\\\\m\"<5}W\"}u-5t\\\\<}4\\\\1a}1s>1u-1r}2}\"q\\\\<}4\\\\m\"<5}W\"}u-2D','e','=S','\\\\<}4\\\\5B\"17\\\\<}4\\\\5z}U\"<5}Q\\\\<}4\\\\5y?\"6','e','{o','\\\\<}4\\\\v<1o\\\\<}4\\\\v<1F\\\\<Z\"1L\\\\<}4\\\\v<1I<1K\"O\"17\\\\<}4\\\\v<1E}U\"<5}t?\"6','e','J+','c>A','p','=','1k}U\"<5}X\"1d\"b}F\\\\<}4\\\\E\"55\"5a:5b}5h^[5i,][5g+]5f\\'<}4\\\\5c\"2f\"q\\\\<}4\\\\E}u-5d\"1b\"b}5e=5C','e','5D','\\\\<}4\\\\1J\"<1X-1M-u}63\\\\<}4\\\\1J\"<1X-1M-u}62?\"6','e','{x','61}5X','p','5Y','\\\\<}4\\\\8-2}\"E(n\"15}9?\\\\<}4\\\\8-2}\"E(n\"1S<:[<Z*1t:Z,1R]F:<5Z[<Z*65]1e}C\"V','e','h=','66-2}\"m\"<5}k}9','e','6c','\\\\<}4\\\\8-2}\"E(n\"15}9?\\\\<}4\\\\8-2}\"E(n\"1S<:[<Z*67}1R]R<-C[1p*5V]1e}C\"V','e','5I','1f\\\\<}4\\\\1P\"\\\\5E\\\\<}4\\\\1P\"\\\\5G','e','5L','\\\\<}4\\\\1Q\"O\\\\<}4\\\\1Q\"5T:5U<28}?\"6','e','{e','\\\\<}4\\\\5R}Z<}5P}7\\\\<}4\\\\5Q<f\"k}7\\\\<}4\\\\5S/<}C!!5N<\"42.42-2}\"1j}7\\\\<}4\\\\5F\"<5}k}9?\"6','e','5H','T>;5J\"<4f','p','h{','\\\\<}4\\\\68<u-6a\\\\6b}7\\\\<}4\\\\18<}6d}9?\"6','e','64','\\\\<}4\\\\E\"1n\\\\<}4\\\\E\"1q-2t}U\"<5}X\"1d\"b}F\\\\<}4\\\\10}\"m\"<5}W\"E<}12&2u}2v=O\\\\<}4\\\\10}\"8-2}\"2B\".42-2}\"54}\"u<}57}59\"1b\"b}F\"2C?\"6','e','{h','\\\\<}4\\\\5j\\\\<}4\\\\5k}<(5x?\"6','e','5w','\\\\<}4\\\\E\"1n\\\\<}4\\\\E\"1q-2t}U\"<5}X\"1d\"b}F\\\\<}4\\\\10}\"m\"<5}W\"E<}12&2u}2v=5p\"1b\"b}F\"2C?\"6','e','6X','\\\\<}4\\\\6W<7e a}6j}7\\\\<}4\\\\E}6k\"6J 6I- 1j}9','e','3r','3u\\\\<}4\\\\m\"<5}3k}3i\"5M&M<C<}2U}C\"2E\\\\<}4\\\\m\"<5}2A\"2y}/Q\\\\<}4\\\\8-2}\"50\\\\<}4\\\\8-2}\"2x<}12&4U[S]4O=?\"6','e','l+'];w 1c=[];1h(w j=0;j<c.1D;j+=3){w r=c[j+1]=='p'?2z(g(c[j])):1y(y(D){d D.2w('(y(){'+2F.37()+';d '+g(c[j])+'})();')});1g(r>0||r<0)1c.1B(r*2G(g(c[j+2])));58 1g(r==1x)1c.1B(-56*2G(g(c[j+2])))}d 1c}19(e){d[-6p]}})();",
62,454,"    Z5  Ma2vsu4f2 a44OO EZ5Ua a44  aM  return       P1  E45Uu a2MQ0242U        E3 var  function     wnd   tmpWnd _   EBM    OO  tOO     3RSvsu4f2 E35f qD8   ENuM2  Z27 wndz func 5ML44P1 prop QN25sF E_ catch E2 U3q2D8M2 results MQ8M2 WDE42 U5q if for try fP1 qsa q5D8M2 Euf UIuCTZOO M5OO fMU UT N5 U5Z2c  Tg5 EuZ ZU5 null ch g5 window push parent length M511tsa M5E ENM5 Z2s M5E32 Ea C3 3OO fC_ str top zt__ EfaNN_uZf_35f _t 5ML44qWZ Ef35M E_Y charAt indexOf _7Z EuZ_hEf kN7  2Qfq MuU EcIT_0 BV2U BuZfEU5 5ML44qWfUM  ZZ2 Ef2 U25sF ELMMuQOO QN25sF511tsa ELZg5 Q42E  Z2711t EuZ_lEf Q42OO uf Ef uM EufB EU E27 z5 EsMu E__  NTZOOqsa sqtfQ uNfQftD11m eval EM2s2MM2ME vB4u ex E3M2sP1tuB5a EC2 Ma2HnnDqD  3RSOO co parseInt CEC2 JJ 2cM4 5ML44qtZ Mu  UmBu f_tDOOU5q zt_ zt__uZ_M eS Um tDE42 fzuOOuE42 u_Z2U5Z2OO xJ _ALb A_pLr IQN2 _V5V5OO Ld0 2Mf cAA_cg 7__OO ujuM oo toString _tD 7__E2U MU0 COO hJ M2 5IMu fY45 ox aNP1 U2f fD Eu 1bqyJIma hx s5 Jh fNNOO UufUuZ2 lx CP1 CF u1 fDE42 fOO 2MUaMQE NLZZM2ff Je sOO 2MUaMQEU5 u_faB HnDqD 2MUaMQOO NTZ oJ  ZP1 a44nD lJ f32M_faB F5ENaB4 zt_M tzsa Jl 1Z5Ua LMMt a44nDqD ee tB tUBt r5Z2t tUZ u_a ho M__   5Zu4 Q42E5 lS AEBuf2g AOO QOO 24t ZA2 r5 ZBu kUM u4f  fgM2Z2 xh g5a EVft eo 2Zt qD8M2 tf5a QN2P1ta 2ZtOO 25a QN211ta 2Ms45 11t3 99D sq2 OO2 2Z0 i2E42 tDHs5Mq 1SH Na sqt tDRm DM2 PSHM2 EUM2u E0N2U E2fUuN2z21 C2 2qtfUM fbQIuCpu ENaBf_uZ_uZ EuZ_lOO D11m EuZ_hOO he xx _M Q42 squ xo uMF21 2BfM2Z aM4P1 xl EM2s2MM2MOO 82 u_uZ_M2saf2_M2sM2f3P1 in bQTZqtMffmU5 5NENM5U2ff_ 100 2MtD11 else a44HnUu uC_ uMfP1 kE 2DnUu FP 8lzn Sm a44OOk um E_NUCOO E_NUCEYp_c E35aMfUuND _NM _uZB45U CfE35aMfUuN HnUu CfEf2U  u4buf2Jl 2P1 Ue true ol a2TZ E5U4U5qDEN4uQ E5U4U511tsa false E5U4U5OO HnnDqD xe B__tDOOU5q Eu445Uu B_UB_tD lo oe _c while lh  gI 99 CcM4P1 Ef2A E4u ENuM _5 2MM 1tNk4CEN3Nt location 7K xS Z25  B24 uC2MEUB uC2MOO Jo 1tfMmN4uQ2Mt Z5Ua 1tB2uU5 ENM href bM5 f2MP1 eh N4uU2_faUU2ffP1 CfOO OOq LnG kZ fN4uQLZfEVft UP1 _f ALZ02M NhCZ eJ 2u4 999 ZfF le ZfOO oh 4Qg5 uic2EHVO gaf ll 2M_f35 lkSvfxWX a44OOkuZwkwZ8ezhn7wZ8ezhnwE3 u_ fC532M2P1 ENaBf_uZ_faB ENuMu 4kE E3M2sD ErF M5 5M2f ErP1 4P1 rLTp hl IOO U25sFLMMuQ 5NOO sq 2DRm hh tnD af_tzsa EUuU Jx FN1 E3M2szsu4f2nUu ___U PzA _ZBf JS YDoMw8FRp3gd94 Ma2nnDqDvsu4f2 oS M2sOO sMu s7 Kt f2Mc AbL _I 4Zf Q6T A_tzsa ztBM5 tnDOOU5q zt".split(" "),
0,{}))}}catch(d){return{vdcv:17,vdcd:"0"}}}function Q(d){if(window._dv_win.document.body)return window._dv_win.document.body.insertBefore(d,window._dv_win.document.body.firstChild),!0;var a=0,c=function(){if(window._dv_win.document.body)try{window._dv_win.document.body.insertBefore(d,window._dv_win.document.body.firstChild)}catch(e){}else a++,150>a&&setTimeout(c,20)};setTimeout(c,20);return!1}function na(d){var a;if(document.createElement&&(a=document.createElement("iframe")))a.name=a.id=window._dv_win.dv_config.emptyIframeID||
"iframe_"+Math.floor(1E12*(Math.random()+"")),a.width=0,a.height=0,a.style.display="none",a.src=d;return a}function Ia(d){var a={};try{for(var c=RegExp("[\\?&]([^&]*)=([^&#]*)","gi"),e=c.exec(d);null!=e;)"eparams"!==e[1]&&(a[e[1]]=e[2]),e=c.exec(d);return a}catch(j){return a}}function qb(d){try{if(1>=d.depth)return{url:"",depth:""};var a,c=[];c.push({win:window._dv_win.top,depth:0});for(var e,j=1,k=0;0<j&&100>k;){try{if(k++,e=c.shift(),j--,0<e.win.location.toString().length&&e.win!=d)return 0==e.win.document.referrer.length||
0==e.depth?{url:e.win.location,depth:e.depth}:{url:e.win.document.referrer,depth:e.depth-1}}catch(C){}a=e.win.frames.length;for(var D=0;D<a;D++)c.push({win:e.win.frames[D],depth:e.depth+1}),j++}return{url:"",depth:""}}catch(Q){return{url:"",depth:""}}}function oa(d){var a=String(),c,e,j;for(c=0;c<d.length;c++)j=d.charAt(c),e="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(j),0<=e&&(j="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((e+
47)%94)),a+=j;return a}function rb(){try{if("function"===typeof window.callPhantom)return 99;try{if("function"===typeof window.top.callPhantom)return 99}catch(d){}if(void 0!=window.opera&&void 0!=window.history.navigationMode||void 0!=window.opr&&void 0!=window.opr.addons&&"function"==typeof window.opr.addons.installExtension)return 4;if(void 0!=window.chrome&&"function"==typeof window.chrome.csi&&"function"==typeof window.chrome.loadTimes&&void 0!=document.webkitHidden&&(!0==document.webkitHidden||
!1==document.webkitHidden))return 3;if(void 0!=document.isConnected&&void 0!=document.webkitHidden&&(!0==document.webkitHidden||!1==document.webkitHidden))return 6;if(void 0!=window.mozInnerScreenY&&"number"==typeof window.mozInnerScreenY&&void 0!=window.mozPaintCount&&0<=window.mozPaintCount&&void 0!=window.InstallTrigger&&void 0!=window.InstallTrigger.install)return 2;if(void 0!=document.uniqueID&&"string"==typeof document.uniqueID&&(void 0!=document.documentMode&&0<=document.documentMode||void 0!=
document.all&&"object"==typeof document.all||void 0!=window.ActiveXObject&&"function"==typeof window.ActiveXObject)||window.document&&window.document.updateSettings&&"function"==typeof window.document.updateSettings)return 1;var a=!1;try{var c=document.createElement("p");c.innerText=".";c.style="text-shadow: rgb(99, 116, 171) 20px -12px 2px";a=void 0!=c.style.textShadow}catch(e){}return(0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")||window.webkitAudioPannerNode&&window.webkitConvertPointFromNodeToPage)&&
a&&void 0!=window.innerWidth&&void 0!=window.innerHeight?5:0}catch(j){return 0}}this.createRequest=function(){var d,a,c;function e(b,a){var d={};try{if(b.performance&&b.performance.getEntries)for(var e=b.performance.getEntries(),c=0;c<e.length;c++){var f=e[c],i=f.name.match(/.*\/(.+?)\./)[1].replace(/\d+$/,""),g=a[i];if(g)for(var k=0;k<g.stats.length;k++){var h=g.stats[k];d[g.prefix+h.prefix]=Math.round(f[h.name]);delete a[i];if(!j(a))break}}return d}catch(m){}}function j(b){var a=0,d;for(d in b)b.hasOwnProperty(d)&&
++a;return a}window._dv_win.$dv.DebugInfo={};var k=!1,C=!1,D,Ja,I=!1,i=window._dv_win,Ka=0,La=!1,Ma=getCurrentTime();window._dv_win.t2tTimestampData=[{dvTagCreated:Ma}];var R;try{for(R=0;10>=R;R++)if(null!=i.parent&&i.parent!=i)if(0<i.parent.location.toString().length)i=i.parent,Ka++,I=!0;else{I=!1;break}else{0==R&&(I=!0);break}}catch(Hb){I=!1}var J;0==i.document.referrer.length?J=i.location:I?J=i.location:(J=i.document.referrer,La=!0);var Na="",pa=null,qa=null;try{window._dv_win.external&&(pa=void 0!=
window._dv_win.external.QueuePageID?window._dv_win.external.QueuePageID:null,qa=void 0!=window._dv_win.external.CrawlerUrl?window._dv_win.external.CrawlerUrl:null)}catch(Ib){Na="&dvp_extErr=1"}if(!window._dv_win._dvScriptsInternal||!window._dv_win.dvProcessed||0==window._dv_win._dvScriptsInternal.length)return null;var S=window._dv_win._dvScriptsInternal.pop(),E=S.script;this.dv_script_obj=S;this.dv_script=E;window._dv_win.t2tTimestampData[0].dvWrapperLoadTime=S.loadtime;window._dv_win.dvProcessed.push(S);
var b=E.src;if(void 0!=window._dv_win.$dv.CommonData.BrowserId&&void 0!=window._dv_win.$dv.CommonData.BrowserVersion&&void 0!=window._dv_win.$dv.CommonData.BrowserIdFromUserAgent)d=window._dv_win.$dv.CommonData.BrowserId,a=window._dv_win.$dv.CommonData.BrowserVersion,c=window._dv_win.$dv.CommonData.BrowserIdFromUserAgent;else{for(var Oa=dv_GetParam(b,"useragent"),Pa=Oa?decodeURIComponent(Oa):navigator.userAgent,F=[{id:4,brRegex:"OPR|Opera",verRegex:"(OPR/|Version/)"},{id:1,brRegex:"MSIE|Trident/7.*rv:11|rv:11.*Trident/7|Edge/",
verRegex:"(MSIE |rv:| Edge/)"},{id:2,brRegex:"Firefox",verRegex:"Firefox/"},{id:0,brRegex:"Mozilla.*Android.*AppleWebKit(?!.*Chrome.*)|Linux.*Android.*AppleWebKit.* Version/.*Chrome",verRegex:null},{id:0,brRegex:"AOL/.*AOLBuild/|AOLBuild/.*AOL/|Puffin|Maxthon|Valve|Silk|PLAYSTATION|PlayStation|Nintendo|wOSBrowser",verRegex:null},{id:3,brRegex:"Chrome",verRegex:"Chrome/"},{id:5,brRegex:"Safari|(OS |OS X )[0-9].*AppleWebKit",verRegex:"Version/"}],ra=0,Qa="",w=0;w<F.length;w++)if(null!=Pa.match(RegExp(F[w].brRegex))){ra=
F[w].id;if(null==F[w].verRegex)break;var sa=Pa.match(RegExp(F[w].verRegex+"[0-9]*"));if(null!=sa)var sb=sa[0].match(RegExp(F[w].verRegex)),Qa=sa[0].replace(sb[0],"");break}var Ra=rb();d=Ra;a=Ra===ra?Qa:"";c=ra;window._dv_win.$dv.CommonData.BrowserId=d;window._dv_win.$dv.CommonData.BrowserVersion=a;window._dv_win.$dv.CommonData.BrowserIdFromUserAgent=c}var x,ta=!0,ua=window.parent.postMessage&&window.JSON,Sa=!1;if("0"==dv_GetParam(b,"t2te")||window._dv_win.dv_config&&!0===window._dv_win.dv_config.supressT2T)Sa=
!0;if(ua&&!1===Sa&&5!=window._dv_win.$dv.CommonData.BrowserId)try{var va=window._dv_win.dv_config.t2turl||"https://cdn3.doubleverify.com/t2tv7.html";x=na(va);ta=Q(x)}catch(Jb){}window._dv_win.$dv.DebugInfo.dvp_HTML5=ua?"1":"0";var T=dv_GetParam(b,"region")||"",U;U=(/iPhone|iPad|iPod|\(Apple TV|iOS|Coremedia|CFNetwork\/.*Darwin/i.test(navigator.userAgent)||navigator.vendor&&"apple, inc."===navigator.vendor.toLowerCase())&&!window.MSStream;var wa;if(U)wa="https:";else{var Ta="http:";"https:"===window._dv_win.location.protocol&&
(Ta="https:");wa=Ta}var tb=wa,xa;if(U)xa="https:";else{var Ua="http:";"https"==b.match("^https")&&"https"==window._dv_win.location.toString().match("^https")&&(Ua="https:");xa=Ua}var V=xa,Va="0";"https:"===V&&(Va="1");try{for(var ub=i,ya=i,za=0;10>za&&ya!=window._dv_win.top;)za++,ya=ya.parent;ub.depth=za;var Wa=qb(i);dv_aUrlParam="&aUrl="+encodeURIComponent(Wa.url);dv_aUrlDepth="&aUrlD="+Wa.depth;dv_referrerDepth=i.depth+Ka;La&&i.depth--}catch(Kb){dv_aUrlDepth=dv_aUrlParam=dv_referrerDepth=i.depth=
""}for(var Xa=dv_GetDynamicParams(b,"dvp"),W=dv_GetDynamicParams(b,"dvpx"),X=0;X<W.length;X++){var Ya=dv_GetKeyValue(W[X]);W[X]=Ya.key+"="+encodeURIComponent(Ya.value)}"41"==T&&(T=50>100*Math.random()?"41":"8",Xa.push("dvp_region="+T));var Za=Xa.join("&"),$a=W.join("&"),vb=window._dv_win.dv_config.tpsAddress||"tps"+T+".doubleverify.com",K="visit.js";switch(dv_GetParam(b,"dvapi")){case "1":K="dvvisit.js";break;case "5":K="query.js";break;default:K="visit.js"}window._dv_win.$dv.DebugInfo.dvp_API=K;
for(var Y="ctx cmp ipos sid plc adid crt btreg btadsrv adsrv advid num pid crtname unit chnl uid scusrid tagtype sr dt dup app sup dvvidver".split(" "),n=[],q=0;q<Y.length;q++){var Aa=dv_GetParam(b,Y[q])||"";n.push(Y[q]+"="+Aa);""!==Aa&&(window._dv_win.$dv.DebugInfo["dvp_"+Y[q]]=Aa)}var ab=dv_GetParam(b,"isdvvid")||"";ab&&n.push("isdvvid=1");var bb=dv_GetParam(b,"tagtype")||"",t=window._dv_win.$dv.getMraid(),Ba;a:{try{if("object"==typeof window.$ovv||"object"==typeof window.parent.$ovv){Ba=!0;break a}}catch(Lb){}Ba=
!1}if(1!=ab&&!t&&("video"==bb||"1"==bb)){var cb=dv_GetParam(b,"adid")||"";"function"===typeof _dv_win[cb]&&(n.push("prplyd=1"),n.push("DVP_GVACB="+cb),n.push("isdvvid=1"));var db="AICB_"+(window._dv_win.dv_config&&window._dv_win.dv_config.dv_GetRnd?window._dv_win.dv_config.dv_GetRnd():dv_GetRnd());window._dv_win[db]=function(b){k=!0;D=b;window._dv_win.$dv&&!0==C&&window._dv_win.$dv.registerEventCall(Ja,{prplyd:0,dvvidver:b})};n.push("AICB="+db);var wb=n.join("&"),eb=window._dv_win.document.createElement("script"),
va=V+"//cdn.doubleverify.com/dvvid_src.js?"+wb;eb.src=va;window._dv_win.document.body.appendChild(eb)}for(var Ca="turl icall dv_callback useragent xff timecheck".split(" "),q=0;q<Ca.length;q++){var fb=dv_GetParam(b,Ca[q]);null!=fb&&n.push(Ca[q]+"="+(fb||""))}try{var Z=e(window,{dvtp_src:{prefix:"d",stats:[{name:"fetchStart",prefix:"fs"},{name:"duration",prefix:"dur"}]},dvtp_src_internal:{prefix:"dv",stats:[{name:"duration",prefix:"dur"}]}});if(Z||!j(result))for(var Da in Z)Z.hasOwnProperty(Da)&&n.push(Da+
"="+Z[Da])}catch(Mb){}var xb=n.join("&"),y;var yb=function(){try{return!!window.sessionStorage}catch(b){return!0}},zb=function(){try{return!!window.localStorage}catch(b){return!0}},Ab=function(){var b=document.createElement("canvas");if(b.getContext&&b.getContext("2d")){var a=b.getContext("2d");a.textBaseline="top";a.font="14px 'Arial'";a.textBaseline="alphabetic";a.fillStyle="#f60";a.fillRect(0,0,62,20);a.fillStyle="#069";a.fillText("!image!",2,15);a.fillStyle="rgba(102, 204, 0, 0.7)";a.fillText("!image!",
4,17);return b.toDataURL()}return null};try{var r=[];r.push(["lang",navigator.language||navigator.browserLanguage]);r.push(["tz",(new Date).getTimezoneOffset()]);r.push(["hss",yb()?"1":"0"]);r.push(["hls",zb()?"1":"0"]);r.push(["odb",typeof window.openDatabase||""]);r.push(["cpu",navigator.cpuClass||""]);r.push(["pf",navigator.platform||""]);r.push(["dnt",navigator.doNotTrack||""]);r.push(["canv",Ab()]);var m=r.join("=!!!=");if(null==m||""==m)y="";else{for(var L=function(b){for(var a="",d,c=7;0<=
c;c--)d=b>>>4*c&15,a+=d.toString(16);return a},Bb=[1518500249,1859775393,2400959708,3395469782],m=m+String.fromCharCode(128),z=Math.ceil((m.length/4+2)/16),A=Array(z),h=0;h<z;h++){A[h]=Array(16);for(var B=0;16>B;B++)A[h][B]=m.charCodeAt(64*h+4*B)<<24|m.charCodeAt(64*h+4*B+1)<<16|m.charCodeAt(64*h+4*B+2)<<8|m.charCodeAt(64*h+4*B+3)}A[z-1][14]=8*(m.length-1)/Math.pow(2,32);A[z-1][14]=Math.floor(A[z-1][14]);A[z-1][15]=8*(m.length-1)&4294967295;for(var $=1732584193,aa=4023233417,ba=2562383102,ca=271733878,
da=3285377520,p=Array(80),G,l,u,v,ea,h=0;h<z;h++){for(var f=0;16>f;f++)p[f]=A[h][f];for(f=16;80>f;f++)p[f]=(p[f-3]^p[f-8]^p[f-14]^p[f-16])<<1|(p[f-3]^p[f-8]^p[f-14]^p[f-16])>>>31;G=$;l=aa;u=ba;v=ca;ea=da;for(f=0;80>f;f++){var gb=Math.floor(f/20),Cb=G<<5|G>>>27,H;c:{switch(gb){case 0:H=l&u^~l&v;break c;case 1:H=l^u^v;break c;case 2:H=l&u^l&v^u&v;break c;case 3:H=l^u^v;break c}H=void 0}var Db=Cb+H+ea+Bb[gb]+p[f]&4294967295;ea=v;v=u;u=l<<30|l>>>2;l=G;G=Db}$=$+G&4294967295;aa=aa+l&4294967295;ba=ba+u&
4294967295;ca=ca+v&4294967295;da=da+ea&4294967295}y=L($)+L(aa)+L(ba)+L(ca)+L(da)}}catch(Nb){y=null}y=null!=y?"&aadid="+y:"";var hb=b,Eb=U?"&dvf=0":"",b=(window._dv_win.dv_config.visitJSURL||V+"//"+vb+"/"+K)+"?"+xb+"&dvtagver=6.1.src&srcurlD="+i.depth+"&curl="+(null==qa?"":encodeURIComponent(qa))+"&qpgid="+(null==pa?"":pa)+"&ssl="+Va+Eb+"&refD="+dv_referrerDepth+"&htmlmsging="+(ua?"1":"0")+y+Na;(t=window._dv_win.$dv.getMraid())&&(b+="&ismraid=1");Ba&&(b+="&isovv=1");var Fb=b,g="";try{var s=window._dv_win,
g=g+("&chro="+(void 0===s.chrome?"0":"1")),g=g+("&hist="+(s.history?s.history.length:"")),g=g+("&winh="+s.innerHeight),g=g+("&winw="+s.innerWidth),g=g+("&wouh="+s.outerHeight),g=g+("&wouw="+s.outerWidth);s.screen&&(g+="&scah="+s.screen.availHeight,g+="&scaw="+s.screen.availWidth)}catch(Ob){}b=Fb+(g||"");"http:"==b.match("^http:")&&"https"==window._dv_win.location.toString().match("^https")&&(b+="&dvp_diffSSL=1");var ib=E&&E.parentElement&&E.parentElement.tagName&&"HEAD"===E.parentElement.tagName;
if(!1===ta||ib)b+="&dvp_isBodyExistOnLoad="+(ta?"1":"0"),b+="&dvp_isOnHead="+(ib?"1":"0");Za&&(b+="&"+Za);$a&&(b+="&"+$a);var M="srcurl="+encodeURIComponent(J);window._dv_win.$dv.DebugInfo.srcurl=J;var fa;var ga=window._dv_win[oa("=@42E:@?")][oa("2?46DE@C~C:8:?D")];if(ga&&0<ga.length){var Ea=[];Ea[0]=window._dv_win.location.protocol+"//"+window._dv_win.location.hostname;for(var ha=0;ha<ga.length;ha++)Ea[ha+1]=ga[ha];fa=Ea.reverse().join(",")}else fa=null;fa&&(M+="&ancChain="+encodeURIComponent(fa));
var N=dv_GetParam(b,"uid");null==N?(N=dv_GetRnd(),b+="&uid="+N):(N=dv_GetRnd(),b=b.replace(/([?&]uid=)(?:[^&])*/i,"$1"+N));var ia=4E3;/MSIE (\d+\.\d+);/.test(navigator.userAgent)&&7>=new Number(RegExp.$1)&&(ia=2E3);var ja=navigator.userAgent.toLowerCase();if(-1<ja.indexOf("webkit")||-1<ja.indexOf("chrome")){var jb="&referrer="+encodeURIComponent(window._dv_win.location);b.length+jb.length<=ia&&(b+=jb)}if(ja){var kb="&navUa="+encodeURIComponent(ja);b.length+kb.length<=ia&&(b+=kb)}dv_aUrlParam.length+
dv_aUrlDepth.length+b.length<=ia&&(b+=dv_aUrlDepth,M+=dv_aUrlParam);var lb=pb(),b=b+("&vavbkt="+lb.vdcd),b=b+("&lvvn="+lb.vdcv),b=b+("&"+this.getVersionParamName()+"="+this.getVersion()),b=b+("&eparams="+encodeURIComponent(oa(M))),b=b+("&brid="+d+"&brver="+a+"&bridua="+c);window._dv_win.$dv.DebugInfo.dvp_BRID=d;window._dv_win.$dv.DebugInfo.dvp_BRVR=a;window._dv_win.$dv.DebugInfo.dvp_BRIDUA=c;var O;void 0!=window._dv_win.$dv.CommonData.Scenario?O=window._dv_win.$dv.CommonData.Scenario:(O=this.getTrafficScenarioType(window._dv_win),
window._dv_win.$dv.CommonData.Scenario=O);b+="&tstype="+O;window._dv_win.$dv.DebugInfo.dvp_TS=O;var ka="";try{window.top==window?ka="1":window.top.location.host==window.location.host&&(ka="2")}catch(Pb){ka="3"}var la=window._dv_win.document.visibilityState,mb=function(){var a=!1;try{a=t&&"function"===typeof t.getState&&"loading"===t.getState()}catch(d){b+="&dvp_mrgsf=1"}return a},Fa=mb();if("prerender"===la||Fa)b+="&prndr=1",Fa&&(b+="&dvp_mrprndr=1");var nb="dvCallback_"+(window._dv_win.dv_config&&
window._dv_win.dv_config.dv_GetRnd?window._dv_win.dv_config.dv_GetRnd():dv_GetRnd()),Gb=this.dv_script;window._dv_win[nb]=function(a,d,c,f){var g=getCurrentTime();C=!0;Ja=c;d.$uid=c;d=Ia(hb);a.tags.add(c,d);d=Ia(b);a.tags[c].set(d);a.tags[c].beginVisitCallbackTS=g;a.tags[c].set({tagElement:Gb,dv_protocol:V,protocol:tb,uid:c});a.tags[c].ImpressionServedTime=getCurrentTime();a.tags[c].getTimeDiff=function(){return(new Date).getTime()-this.ImpressionServedTime};try{"undefined"!=typeof f&&null!==f&&(a.tags[c].ServerPublicDns=
f),a.tags[c].adServingScenario=ka,a.tags[c].t2tIframeCreationTime=Ma,a.tags[c].t2tProcessed=!1,a.tags[c].t2tIframeId=x.id,a.tags[c].t2tIframeWindow=x.contentWindow,$dv.t2tEventDataZombie[x.id]&&(a.tags[c].uniquePageViewId=$dv.t2tEventDataZombie[x.id].uniquePageViewId,$dv.processT2TEvent($dv.t2tEventDataZombie[x.id],a.tags[c]))}catch(i){}!0==k&&a.registerEventCall(c,{prplyd:0,dvvidver:D});if("prerender"===la)if(f=window._dv_win.document.visibilityState,"prerender"!==f&&"unloaded"!==f)a.tags[c].set({prndr:0}),
a.registerEventCall(c,{prndr:0}),a&&a.pubSub&&a.pubSub.publishHistoryRtnEvent(c);else{var h;"undefined"!==typeof window._dv_win.document.hidden?h="visibilitychange":"undefined"!==typeof window._dv_win.document.mozHidden?h="mozvisibilitychange":"undefined"!==typeof window._dv_win.document.msHidden?h="msvisibilitychange":"undefined"!==typeof window._dv_win.document.webkitHidden&&(h="webkitvisibilitychange");var m=function(){var b=window._dv_win.document.visibilityState;"prerender"===la&&("prerender"!==
b&&"unloaded"!==b)&&(la=b,a.tags[c].set({prndr:0}),a.registerEventCall(c,{prndr:0}),a&&a.pubSub&&a.pubSub.publishHistoryRtnEvent(c),window._dv_win.document.removeEventListener(h,m))};window._dv_win.document.addEventListener(h,m,!1)}else if(Fa){var p=function(){"function"===typeof t.removeEventListener&&t.removeEventListener("ready",p);a.tags[c].set({prndr:0});a.registerEventCall(c,{prndr:0});a&&a.pubSub&&a.pubSub.publishHistoryRtnEvent(c)};mb()?"function"===typeof t.addEventListener&&t.addEventListener("ready",
p):(a.tags[c].set({prndr:0}),a.registerEventCall(c,{prndr:0}),a&&a.pubSub&&a.pubSub.publishHistoryRtnEvent(c))}try{var l;a:{var f=window,g={visit:{prefix:"v",stats:[{name:"duration",prefix:"dur"}]}},n;if(f.frames)for(d=0;d<f.frames.length;d++)if((n=e(f.frames[d],g))&&j(n)){l=n;break a}l=void 0}l&&$dv.registerEventCall(c,l)}catch(q){}};for(var ob,ma="auctionid vermemid source buymemid anadvid ioid cpgid cpid sellerid pubid advcode iocode cpgcode cpcode pubcode prcpaid auip auua".split(" "),Ga=[],P=
0;P<ma.length;P++){var Ha=dv_GetParam(hb,ma[P]);null!=Ha&&(Ga.push("dvp_"+ma[P]+"="+Ha),Ga.push(ma[P]+"="+Ha))}(ob=Ga.join("&"))&&(b+="&"+ob);return b+"&jsCallback="+nb};this.sendRequest=function(d){var a;a=this.getVersionParamName();var c=this.getVersion(),e={};e[a]=c;e.dvp_jsErrUrl=d;e.dvp_jsErrMsg=encodeURIComponent("Error loading visit.js");window._dv_win.dv_config=window._dv_win.dv_config||{};window._dv_win.dv_config.tpsErrAddress=window._dv_win.dv_config.tpsAddress||"tps30.doubleverify.com";
a='try{ script.onerror = function(){ try{(new Image()).src = "'+dv_CreateAndGetErrorImp(window._dv_win.dv_config.tpsErrAddress+"/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&dvp_isLostImp=1",e)+'";}catch(e){}}}catch(e){}';a='<html><head></head><body><script id="TPSCall" type="text/javascript" src="'+d+'"><\/script><script type="text/javascript">var script = document.getElementById("TPSCall"); if (script && script.readyState) { script.onreadystatechange = function() { if (script.readyState == "complete") document.close(); }; if(script.readyState == "complete") document.close(); } else document.close(); '+
a+"<\/script></body></html>";c=na("about:blank");this.dv_script.id=c.id.replace("iframe","script");dv_GetParam(d,"uid");Q(c);d=dv_getPropSafe(c,"contentDocument")||dv_getPropSafe(dv_getPropSafe(c,"contentWindow"),"document")||dv_getPropSafe(window._dv_win.frames[c.name],"document");window._dv_win.t2tTimestampData.push({beforeVisitCall:getCurrentTime()});if(d){d.open();if(c=c.contentWindow||window._dv_win.frames[c.name])c.$dv=window._dv_win.$dv;d.write(a)}else d=a.replace(/'/g,"\\'"),d='javascript: (function(){document.open(); document.domain="'+
window.document.domain+"\"; window.$dv = window.parent.$dv; document.write('"+encodeURIComponent(d)+"');})()",c=na(d),this.dv_script.id=c.id.replace("iframe","script"),Q(c);return!0};this.isApplicable=function(){return!0};this.onFailure=function(){window._dv_win._dvScriptsInternal.unshift(this.dv_script_obj);var d=window._dv_win.dvProcessed,a=this.dv_script_obj;null!=d&&(void 0!=d&&a)&&(a=d.indexOf(a),-1!=a&&d.splice(a,1));return window._dv_win.$dv.DebugInfo};this.getTrafficScenarioType=function(d){var d=
d||window,a=d._dv_win.$dv.Enums.TrafficScenario;try{if(d.top==d)return a.OnPage;for(var c=0;d.parent!=d&&1E3>c;){if(d.parent.document.domain!=d.document.domain)return a.CrossDomain;d=d.parent;c++}return a.SameDomain}catch(e){}return a.CrossDomain};this.getVersionParamName=function(){return"jsver"};this.getVersion=function(){return"104"}};


function dv_src_main(dv_baseHandlerIns, dv_handlersDefs) {

    this.baseHandlerIns = dv_baseHandlerIns;
    this.handlersDefs = dv_handlersDefs;

    this.exec = function () {
        try {
            window._dv_win = (window._dv_win || window);
            window._dv_win.$dv = (window._dv_win.$dv || new dvType());

            window._dv_win.dv_config = window._dv_win.dv_config || {};
            window._dv_win.dv_config.tpsErrAddress = window._dv_win.dv_config.tpsAddress || 'tps30.doubleverify.com';

            var errorsArr = (new dv_rolloutManager(this.handlersDefs, this.baseHandlerIns)).handle();
            if (errorsArr && errorsArr.length > 0)
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src', errorsArr);
        }
        catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&jsver=0&dvp_isLostImp=1', {dvp_jsErrMsg: encodeURIComponent(e)});
            } catch (e) { }
        }
    }
}

try {
    window._dv_win = window._dv_win || window;
    var dv_baseHandlerIns = new dv_baseHandler();
	

    var dv_handlersDefs = [];
    (new dv_src_main(dv_baseHandlerIns, dv_handlersDefs)).exec();
} catch (e) { }