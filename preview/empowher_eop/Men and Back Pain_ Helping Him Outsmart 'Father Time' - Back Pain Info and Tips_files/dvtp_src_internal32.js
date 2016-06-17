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

    return { key: keyRet, value: valRet };
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
        //get each frame, translate


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
        function getDefaultParent() {
            return document.body || document.head || document.documentElement;
        }

        this.addImage = function (url, parentElement) {
            parentElement = parentElement || getDefaultParent();
            var image = parentElement.ownerDocument.createElement("img");
            image.width = 0;
            image.height = 0;
            image.style.display = 'none';
            image.src = appendCacheBuster(url);
            parentElement.insertBefore(image, parentElement.firstChild);

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
    }
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

    this.registerEventCall = function (impressionId, eventObject, timeoutMs, isRegisterEnabled) {
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
            this.domUtilities.addImage(url, this.tags[impressionId].tagElement.parentNode);
        }
    };
    var mraidObjectCache;
    this.getMraid = function () {
        var context = window._dv_win || window;
        var iterationCounter = 0;
        var maxIterations = 20;

        function getMraidRec (context) {
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

function dv_handler76(){function Wa(){try{return{vdcv:5,vdcd:eval(function(a,d,c,f,i,A){i=function(a){return(a<d?"":i(parseInt(a/d)))+(35<(a%=d)?String.fromCharCode(a+29):a.toString(36))};if(!"".replace(/^/,String)){for(;c--;)A[i(c)]=f[c]||i(c);f=[function(a){return A[a]}];i=function(){return"\\w+"};c=1}for(;c--;)f[c]&&(a=a.replace(RegExp("\\b"+i(c)+"\\b","g"),f[c]));return a}("(d(){17{b n=[1a];17{b 4=1a;3i(4!=4.1r&&4.19.3r.3y){n.12(4.19);4=4.19}}14(e){}d X(y){17{G(b i=0;i<n.1c;i++){V(y(n[i]))7 n[i]==1a.1r?-1:1}7 0}14(e){7 13}}d 1B(v){7 X(d(4){7 4[v]!=13})}d 3h(4,1o,y){G(b v 34 4){V(v.1p(1o)>-1&&(!y||y(4[v])))7 3A}7 3a}d g(s){b h=\"\",t=\"3I.;j&3Y}4b/0:4a'3U=B(3P-22!,1X)2g\\\\{ >1W+1G\\\"1L<\";G(i=0;i<s.1c;i++)f=s.1n(i),e=t.1p(f),0<=e&&(f=t.1n((e+41)%2p)),h+=f;7 h}b c=['2A\"18-2J\"2w\"2v','p','l','2u&p','p','{','-5,!u<}\"2x}\"','p','J','-2y}\"<2B','p','=o',':<2z}T}<\"','p','h','\\\\<}9-2}\"E(D\"1y<N\"[1w*1t\\\\\\\\1v-2t<1s\"1u\"2r]1e}C\"R','e','2l','\"2k\\\\<}O}11>15-10}2}\"2j\"5\"2m}2n<}2q','e','=J','1l}U\"<5}2o\"Q}F\\\\<}[2C}2D:2R]8}6\\\\<}[t:1A\"2Q]8}6\\\\<}[2P})5-u<}t]8}6\\\\<}[2S]8}6\\\\<}[2T}2W]8}2V','e','2U',':2O}<\"w-2N/2M','p','2G','\\\\<}1m<U/H}6\\\\<}1m<U/!8}k','e','=l','\\\\<}1k!2E\\\\<}1k!2H)p?\"M','e','2I','2L:,','p','2K','1l}U\"<5}2i:2X\\\\<}9-2}\"2h\".42-2}\"1P-1O<N\"1N<1Q<1R}C\"3H<1T<1S[<]E\"27\"18}\"2}\"1M[<]E\"27\"18}\"2}\"E<}1E&1D\"1\\\\<}W\\\\1F\\\\<}W\\\\O}11>15-10}2}\"z<1K-2}\"1J\"2.42-2}\"1I=1H\"Q}1V\"Q}P=2b','e','x','29)','p','+','\\\\<}9-2}\"E(D\"2c<:[\\\\2d}}2M][\\\\2f,5}2]2e}C\"R','e','28',':26<Z','p','20','1f\\\\<}1Z:,1Y}U\"<5}21\"Q}25<24<23}2Y','e','39','3O}3N}3M>2s','p','3Q','\\\\<}1d:<16}s<3T}6\\\\<}1d:<16}s<3S<}f\"u}1j\\\\<}1x\\\\<}1d:<16}s<C[S]E:1A\"H}k','e','l{','3D\\'<}W\\\\T}3B','p','==',' &w)&3E','p','3F','\\\\<}E.:2}\"c\"<3J}6\\\\<}3V}6\\\\<}3G<}f\"u}1j\\\\<}1x\\\\<}O:}\"8}k','e','49','\\\\<}9-2}\"E(D\"1y<N\"[1w*1t\\\\\\\\1v-1s\"1u/3X<3W]1e}C\"R','e','40','43\"46','p','e','\\\\<}1z.L>g;w\\'T)Y.45\\\\<}1z.L>g;3z&&3b>w\\'T)Y.I?\"M','e','l=','w:<Z<:5','p','3d','3f-N:38','p','37','\\\\<}1b\"31\\\\<}1b\"30\"<5}2Z\\\\<}1b\"32||\\\\<}33?\"M','e','h+','\\\\<}9-2}\"m\"<5}1g\"1i\\\\<}9-2}\"m\"<5}1h\"36\\\\<}O}11>15-10}2}\"q\\\\<}9-2}\"m\"<5}1g\"1i\\\\<}9-2}\"m\"<5}1h\"3s','e','=S','c>A','p','=','\\\\<}9-2}\"E(D\"3w<:[<Z*1t:Z,3x]F:<3q[<Z*3k]1e}C\"R','e','h=','3l-2}\"m\"<5}8}k','e','3p','1f\\\\<}1q\"\\\\3n\\\\<}1q\"\\\\2a','e','3o','\\\\<}3m}Z<}3j}6\\\\<}3v<f\"8}6\\\\<}3t/<}C!!3u<\"42.42-2}\"H}6\\\\<}3g\"<5}8}k?\"M','e','35','T>;3c\"<44','p','h{','\\\\<}48<47 a}4c}6\\\\<}E}3Z\"3C 3L- H}k','e','3R'];b K=[];G(b j=0;j<c.1c;j+=3){b r=c[j+1]=='p'?1B(g(c[j])):X(d(4){7 2F(g(c[j]))});V(r>0||r<0)K.12(r*1C(g(c[j+2])));1U V(r==13)K.12(-3e*1C(g(c[j+2])))}7 K}14(e){7[-3K]}})();",
62,261,"    win  a44OO return P1 EZ5Ua  var  function       a44  E45Uu wins        prop _  func     a2MQ0242U   for fP1   results  Ma2vsu4f2  E2  aM 3RS    if Z5 ch   N5 U5Z2c push null catch Tg5 ZU5 try g5 parent window EuZ length E_ WDE42 U5q E35f EN5M EM2N4uU2qtvt9 U25sF E_Y qsa EBM charAt str indexOf zt__ top kN7  MuU BuZfEU5 fMU ELMMuQOO 5ML44qWfUM EcIT_0 uf ex parseInt sqt Z27 E2fUuN2z21 lkSvfxWX DM2 tDRm EUM2u 1Z5Ua 1bqyJIma OO2 tDHs5Mq 2qtfUM fbQIuCpu 1SH i2E42 sq2 99D else PSHM2 NhCZ LnG tzsa zt_M hJ q5D8M2 uic2EHVO ZP1 f32M_faB F5ENaB4 u_faB  eS Ld0 B_UB_tD HnDqD 5ML44qtZ UmBu tDE42 Um 5r EC2 qD8 ENM5 QN25sF eo QN2P1ta Z2s qD8M2 82 2Zt EVft  kUM 60 Q42 2Z0 g5a fgM2Z2 ZBu C2 u4f tf5a ZA2 AOO eval ho AEBuf2g lS Na he _M  uM u_a tUZ r5Z2t 24t tUBt tB ee a44nDqD LMMt uMF21 a44nD OOq CfEf2U CfOO CfE35aMfUuN E35aMfUuND in lo zttDP1 le _ZBf lJ false AbL _c hh 100 ___U Eu445Uu co while CcM4P1 1tfMmN4uQ2Mt Z5Ua E4u B__tDOOU5q lh eh Z25 location zttDD ENuM gI Ef2A 5ML44qWZ _t href _I true s5 5M2f UufUuZ2 rLTp hl ErF  Ue 4P1 999 M5 fY45 5IMu M2 Q6T hx lx CF CP1 Kt ErP1 fN4uQLZfEVft kZ PzA _f eJ   45Uu40 4f IOO 5MuC2 4Zf EUuU ll s7 YDoMw8FRp3gd94 UP1".split(" "),
0,{}))}}catch(d){return{vdcv:5,vdcd:"0"}}}function fa(d){if(window._dv_win.document.body)return window._dv_win.document.body.insertBefore(d,window._dv_win.document.body.firstChild),!0;var a=0,e=function(){if(window._dv_win.document.body)try{window._dv_win.document.body.insertBefore(d,window._dv_win.document.body.firstChild)}catch(c){}else a++,150>a&&setTimeout(e,20)};setTimeout(e,20);return!1}function ga(d){var a;if(document.createElement&&(a=document.createElement("iframe")))a.name=a.id=window._dv_win.dv_config.emptyIframeID||
"iframe_"+Math.floor(1E12*(Math.random()+"")),a.width=0,a.height=0,a.style.display="none",a.src=d;return a}function Aa(d){var a={};try{for(var e=RegExp("[\\?&]([^&]*)=([^&#]*)","gi"),c=e.exec(d);null!=c;)"eparams"!==c[1]&&(a[c[1]]=c[2]),c=e.exec(d);return a}catch(f){return a}}function Xa(d){try{if(1>=d.depth)return{url:"",depth:""};var a,e=[];e.push({win:window._dv_win.top,depth:0});for(var c,f=1,i=0;0<f&&100>i;){try{if(i++,c=e.shift(),f--,0<c.win.location.toString().length&&c.win!=d)return 0==c.win.document.referrer.length||
0==c.depth?{url:c.win.location,depth:c.depth}:{url:c.win.document.referrer,depth:c.depth-1}}catch(A){}a=c.win.frames.length;for(var B=0;B<a;B++)e.push({win:c.win.frames[B],depth:c.depth+1}),f++}return{url:"",depth:""}}catch(G){return{url:"",depth:""}}}function ha(d){var a=String(),e,c,f;for(e=0;e<d.length;e++)f=d.charAt(e),c="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(f),0<=c&&(f="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((c+
47)%94)),a+=f;return a}function Ya(){try{if("function"===typeof window.callPhantom)return 99;try{if("function"===typeof window.top.callPhantom)return 99}catch(d){}if(void 0!=window.opera&&void 0!=window.history.navigationMode||void 0!=window.opr&&void 0!=window.opr.addons&&"function"==typeof window.opr.addons.installExtension)return 4;if(void 0!=window.chrome&&"function"==typeof window.chrome.csi&&"function"==typeof window.chrome.loadTimes&&void 0!=document.webkitHidden&&(!0==document.webkitHidden||
!1==document.webkitHidden))return 3;if(void 0!=window.mozInnerScreenY&&"number"==typeof window.mozInnerScreenY&&void 0!=window.mozPaintCount&&0<=window.mozPaintCount&&void 0!=window.InstallTrigger&&void 0!=window.InstallTrigger.install)return 2;if(void 0!=document.uniqueID&&"string"==typeof document.uniqueID&&(void 0!=document.documentMode&&0<=document.documentMode||void 0!=document.all&&"object"==typeof document.all||void 0!=window.ActiveXObject&&"function"==typeof window.ActiveXObject)||window.document&&
window.document.updateSettings&&"function"==typeof window.document.updateSettings)return 1;var a=!1;try{var e=document.createElement("p");e.innerText=".";e.style="text-shadow: rgb(99, 116, 171) 20px -12px 2px";a=void 0!=e.style.textShadow}catch(c){}return 0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")&&a&&void 0!=window.innerWidth&&void 0!=window.innerHeight?5:0}catch(f){return 0}}this.createRequest=function(){var d,a,e;window._dv_win.$dv.DebugInfo={};var c=!1,f=window._dv_win,
i=0,A=!1,B=getCurrentTime();window._dv_win.t2tTimestampData=[{dvTagCreated:B}];var G;try{for(G=0;10>=G;G++)if(null!=f.parent&&f.parent!=f)if(0<f.parent.location.toString().length)f=f.parent,i++,c=!0;else{c=!1;break}else{0==G&&(c=!0);break}}catch(lb){c=!1}var H;0==f.document.referrer.length?H=f.location:c?H=f.location:(H=f.document.referrer,A=!0);var Ba="",ia=null,ja=null;try{window._dv_win.external&&(ia=void 0!=window._dv_win.external.QueuePageID?window._dv_win.external.QueuePageID:null,ja=void 0!=
window._dv_win.external.CrawlerUrl?window._dv_win.external.CrawlerUrl:null)}catch(mb){Ba="&dvp_extErr=1"}if(!window._dv_win._dvScriptsInternal||!window._dv_win.dvProcessed||0==window._dv_win._dvScriptsInternal.length)return null;var O=window._dv_win._dvScriptsInternal.pop(),C=O.script;this.dv_script_obj=O;this.dv_script=C;window._dv_win.t2tTimestampData[0].dvWrapperLoadTime=O.loadtime;window._dv_win.dvProcessed.push(O);var b=C.src,u,Za="https:"===window._dv_win.location.protocol?"https:":"http:",
ka=!0,la=window.parent.postMessage&&window.JSON,Ca=!1;if("0"==dv_GetParam(b,"t2te")||window._dv_win.dv_config&&!0===window._dv_win.dv_config.supressT2T)Ca=!0;if(la&&!1===Ca)try{u=ga(window._dv_win.dv_config.t2turl||"https://cdn3.doubleverify.com/t2tv7.html"),ka=fa(u)}catch(nb){}window._dv_win.$dv.DebugInfo.dvp_HTML5=la?"1":"0";var P=dv_GetParam(b,"region")||"",ma="http:",Da="0";"https"==b.match("^https")&&"https"==window._dv_win.location.toString().match("^https")&&(ma="https:",Da="1");try{for(var $a=
f,na=f,oa=0;10>oa&&na!=window._dv_win.top;)oa++,na=na.parent;$a.depth=oa;var Ea=Xa(f);dv_aUrlParam="&aUrl="+encodeURIComponent(Ea.url);dv_aUrlDepth="&aUrlD="+Ea.depth;dv_referrerDepth=f.depth+i;A&&f.depth--}catch(ob){dv_aUrlDepth=dv_aUrlParam=dv_referrerDepth=f.depth=""}for(var Fa=dv_GetDynamicParams(b,"dvp"),Q=dv_GetDynamicParams(b,"dvpx"),R=0;R<Q.length;R++){var Ga=dv_GetKeyValue(Q[R]);Q[R]=Ga.key+"="+encodeURIComponent(Ga.value)}"41"==P&&(P=50>100*Math.random()?"41":"8",Fa.push("dvp_region="+P));
var Ha=Fa.join("&"),Ia=Q.join("&"),ab=window._dv_win.dv_config.tpsAddress||"tps"+P+".doubleverify.com",I="visit.js";switch(dv_GetParam(b,"dvapi")){case "1":I="dvvisit.js";break;case "5":I="query.js";break;default:I="visit.js"}window._dv_win.$dv.DebugInfo.dvp_API=I;for(var S="ctx cmp ipos sid plc adid crt btreg btadsrv adsrv advid num pid crtname unit chnl uid scusrid tagtype sr dt isdvvid dup".split(" "),pa=[],n=0;n<S.length;n++){var qa=dv_GetParam(b,S[n])||"";pa.push(S[n]+"="+qa);""!==qa&&(window._dv_win.$dv.DebugInfo["dvp_"+
S[n]]=qa)}for(var ra="turl icall dv_callback useragent xff timecheck".split(" "),n=0;n<ra.length;n++){var Ja=dv_GetParam(b,ra[n]);null!=Ja&&pa.push(ra[n]+"="+(Ja||""))}var bb=pa.join("&"),v;var cb=function(){try{return!!window.sessionStorage}catch(b){return!0}},db=function(){try{return!!window.localStorage}catch(b){return!0}},eb=function(){var b=document.createElement("canvas");if(b.getContext&&b.getContext("2d")){var a=b.getContext("2d");a.textBaseline="top";a.font="14px 'Arial'";a.textBaseline=
"alphabetic";a.fillStyle="#f60";a.fillRect(0,0,62,20);a.fillStyle="#069";a.fillText("!image!",2,15);a.fillStyle="rgba(102, 204, 0, 0.7)";a.fillText("!image!",4,17);return b.toDataURL()}return null};try{var p=[];p.push(["lang",navigator.language||navigator.browserLanguage]);p.push(["tz",(new Date).getTimezoneOffset()]);p.push(["hss",cb()?"1":"0"]);p.push(["hls",db()?"1":"0"]);p.push(["odb",typeof window.openDatabase||""]);p.push(["cpu",navigator.cpuClass||""]);p.push(["pf",navigator.platform||""]);
p.push(["dnt",navigator.doNotTrack||""]);p.push(["canv",eb()]);var k=p.join("=!!!=");if(null==k||""==k)v="";else{for(var J=function(a){for(var b="",d,c=7;0<=c;c--)d=a>>>4*c&15,b+=d.toString(16);return b},fb=[1518500249,1859775393,2400959708,3395469782],k=k+String.fromCharCode(128),w=Math.ceil((k.length/4+2)/16),x=Array(w),j=0;j<w;j++){x[j]=Array(16);for(var y=0;16>y;y++)x[j][y]=k.charCodeAt(64*j+4*y)<<24|k.charCodeAt(64*j+4*y+1)<<16|k.charCodeAt(64*j+4*y+2)<<8|k.charCodeAt(64*j+4*y+3)}x[w-1][14]=
8*(k.length-1)/Math.pow(2,32);x[w-1][14]=Math.floor(x[w-1][14]);x[w-1][15]=8*(k.length-1)&4294967295;for(var T=1732584193,U=4023233417,V=2562383102,W=271733878,X=3285377520,l=Array(80),D,m,r,s,Y,j=0;j<w;j++){for(var h=0;16>h;h++)l[h]=x[j][h];for(h=16;80>h;h++)l[h]=(l[h-3]^l[h-8]^l[h-14]^l[h-16])<<1|(l[h-3]^l[h-8]^l[h-14]^l[h-16])>>>31;D=T;m=U;r=V;s=W;Y=X;for(h=0;80>h;h++){var Ka=Math.floor(h/20),gb=D<<5|D>>>27,E;c:{switch(Ka){case 0:E=m&r^~m&s;break c;case 1:E=m^r^s;break c;case 2:E=m&r^m&s^r&s;break c;
case 3:E=m^r^s;break c}E=void 0}var hb=gb+E+Y+fb[Ka]+l[h]&4294967295;Y=s;s=r;r=m<<30|m>>>2;m=D;D=hb}T=T+D&4294967295;U=U+m&4294967295;V=V+r&4294967295;W=W+s&4294967295;X=X+Y&4294967295}v=J(T)+J(U)+J(V)+J(W)+J(X)}}catch(pb){v=null}v=null!=v?"&aadid="+v:"";var La=b,b=(window._dv_win.dv_config.visitJSURL||ma+"//"+ab+"/"+I)+"?"+bb+"&dvtagver=6.1.src&srcurlD="+f.depth+"&curl="+(null==ja?"":encodeURIComponent(ja))+"&qpgid="+(null==ia?"":ia)+"&ssl="+Da+"&refD="+dv_referrerDepth+"&htmlmsging="+(la?"1":"0")+
v+Ba,t=window._dv_win.$dv.getMraid();t&&(b+="&ismraid=1");var sa;a:{try{if("object"==typeof window.$ovv||"object"==typeof window.parent.$ovv){sa=!0;break a}}catch(qb){}sa=!1}sa&&(b+="&isovv=1");var ib=b,g="";try{var q=window._dv_win.parent,g=g+("&chro="+(void 0===q.chrome?"0":"1")),g=g+("&hist="+(q.history?q.history.length:"")),g=g+("&winh="+q.innerHeight),g=g+("&winw="+q.innerWidth),g=g+("&wouh="+q.outerHeight),g=g+("&wouw="+q.outerWidth);q.screen&&(g+="&scah="+q.screen.availHeight,g+="&scaw="+q.screen.availWidth)}catch(rb){}b=
ib+(g||"");"http:"==b.match("^http:")&&"https"==window._dv_win.location.toString().match("^https")&&(b+="&dvp_diffSSL=1");var Ma=C&&C.parentElement&&C.parentElement.tagName&&"HEAD"===C.parentElement.tagName;if(!1===ka||Ma)b+="&dvp_isBodyExistOnLoad="+(ka?"1":"0"),b+="&dvp_isOnHead="+(Ma?"1":"0");Ha&&(b+="&"+Ha);Ia&&(b+="&"+Ia);var K="srcurl="+encodeURIComponent(H);window._dv_win.$dv.DebugInfo.srcurl=H;var Z;var $=window._dv_win[ha("=@42E:@?")][ha("2?46DE@C~C:8:?D")];if($&&0<$.length){var ta=[];ta[0]=
window._dv_win.location.protocol+"//"+window._dv_win.location.hostname;for(var aa=0;aa<$.length;aa++)ta[aa+1]=$[aa];Z=ta.reverse().join(",")}else Z=null;Z&&(K+="&ancChain="+encodeURIComponent(Z));var L=dv_GetParam(b,"uid");null==L?(L=dv_GetRnd(),b+="&uid="+L):(L=dv_GetRnd(),b=b.replace(/([?&]uid=)(?:[^&])*/i,"$1"+L));var ua=4E3;/MSIE (\d+\.\d+);/.test(navigator.userAgent)&&7>=new Number(RegExp.$1)&&(ua=2E3);var Na=navigator.userAgent.toLowerCase();if(-1<Na.indexOf("webkit")||-1<Na.indexOf("chrome")){var Oa=
"&referrer="+encodeURIComponent(window._dv_win.location);b.length+Oa.length<=ua&&(b+=Oa)}dv_aUrlParam.length+dv_aUrlDepth.length+b.length<=ua&&(b+=dv_aUrlDepth,K+=dv_aUrlParam);var ba=Wa(),b=b+("&dvpx_vavbkt="+ba.vdcd),b=b+("&dvpx_lvvn="+ba.vdcv),b=b+("&vavbkt="+ba.vdcd),b=b+("&lvvn="+ba.vdcv),b=b+("&"+this.getVersionParamName()+"="+this.getVersion()),b=b+("&eparams="+encodeURIComponent(ha(K)));if(void 0!=window._dv_win.$dv.CommonData.BrowserId&&void 0!=window._dv_win.$dv.CommonData.BrowserVersion&&
void 0!=window._dv_win.$dv.CommonData.BrowserIdFromUserAgent)d=window._dv_win.$dv.CommonData.BrowserId,a=window._dv_win.$dv.CommonData.BrowserVersion,e=window._dv_win.$dv.CommonData.BrowserIdFromUserAgent;else{for(var Pa=dv_GetParam(b,"useragent"),Qa=Pa?decodeURIComponent(Pa):navigator.userAgent,F=[{id:4,brRegex:"OPR|Opera",verRegex:"(OPR/|Version/)"},{id:1,brRegex:"MSIE|Trident/7.*rv:11|rv:11.*Trident/7|Edge/",verRegex:"(MSIE |rv:| Edge/)"},{id:2,brRegex:"Firefox",verRegex:"Firefox/"},{id:0,brRegex:"Mozilla.*Android.*AppleWebKit(?!.*Chrome.*)|Linux.*Android.*AppleWebKit.* Version/.*Chrome",
verRegex:null},{id:0,brRegex:"AOL/.*AOLBuild/|AOLBuild/.*AOL/|Puffin|Maxthon|Valve|Silk|PLAYSTATION|PlayStation|Nintendo|wOSBrowser",verRegex:null},{id:3,brRegex:"Chrome",verRegex:"Chrome/"},{id:5,brRegex:"Safari|(OS |OS X )[0-9].*AppleWebKit",verRegex:"Version/"}],va=0,Ra="",z=0;z<F.length;z++)if(null!=Qa.match(RegExp(F[z].brRegex))){va=F[z].id;if(null==F[z].verRegex)break;var wa=Qa.match(RegExp(F[z].verRegex+"[0-9]*"));if(null!=wa)var jb=wa[0].match(RegExp(F[z].verRegex)),Ra=wa[0].replace(jb[0],
"");break}var Sa=Ya();d=Sa;a=Sa===va?Ra:"";e=va;window._dv_win.$dv.CommonData.BrowserId=d;window._dv_win.$dv.CommonData.BrowserVersion=a;window._dv_win.$dv.CommonData.BrowserIdFromUserAgent=e}b+="&brid="+d+"&brver="+a+"&bridua="+e;window._dv_win.$dv.DebugInfo.dvp_BRID=d;window._dv_win.$dv.DebugInfo.dvp_BRVR=a;window._dv_win.$dv.DebugInfo.dvp_BRIDUA=e;var M;void 0!=window._dv_win.$dv.CommonData.Scenario?M=window._dv_win.$dv.CommonData.Scenario:(M=this.getTrafficScenarioType(window._dv_win),window._dv_win.$dv.CommonData.Scenario=
M);b+="&tstype="+M;window._dv_win.$dv.DebugInfo.dvp_TS=M;var ca="";try{window.top==window?ca="1":window.top.location.host==window.location.host&&(ca="2")}catch(sb){ca="3"}var da=window._dv_win.document.visibilityState,Ta=function(){var a=!1;try{a=t&&"function"===typeof t.getState&&"loading"===t.getState()}catch(d){b+="&dvp_mrgsf=1"}return a},xa=Ta();if("prerender"===da||xa)b+="&prndr=1",xa&&(b+="&dvp_mrprndr=1");var Ua="dvCallback_"+(window._dv_win.dv_config&&window._dv_win.dv_config.dv_GetRnd?window._dv_win.dv_config.dv_GetRnd():
dv_GetRnd()),kb=this.dv_script;window._dv_win[Ua]=function(a,d,c,e){var f=getCurrentTime();d.$uid=c;d=Aa(La);a.tags.add(c,d);d=Aa(b);a.tags[c].set(d);a.tags[c].beginVisitCallbackTS=f;a.tags[c].set({tagElement:kb,dv_protocol:ma,protocol:Za,uid:c});a.tags[c].ImpressionServedTime=getCurrentTime();a.tags[c].getTimeDiff=function(){return(new Date).getTime()-this.ImpressionServedTime};try{"undefined"!=typeof e&&null!==e&&(a.tags[c].ServerPublicDns=e),a.tags[c].adServingScenario=ca,a.tags[c].t2tIframeCreationTime=
B,a.tags[c].t2tProcessed=!1,a.tags[c].t2tIframeId=u.id,a.tags[c].t2tIframeWindow=u.contentWindow,$dv.t2tEventDataZombie[u.id]&&(a.tags[c].uniquePageViewId=$dv.t2tEventDataZombie[u.id].uniquePageViewId,$dv.processT2TEvent($dv.t2tEventDataZombie[u.id],a.tags[c]))}catch(h){}if("prerender"===da)if("prerender"!==window._dv_win.document.visibilityState&&"unloaded"!==visibilityStateLocal)a.registerEventCall(c,{prndr:0});else{var g;"undefined"!==typeof window._dv_win.document.hidden?g="visibilitychange":
"undefined"!==typeof window._dv_win.document.mozHidden?g="mozvisibilitychange":"undefined"!==typeof window._dv_win.document.msHidden?g="msvisibilitychange":"undefined"!==typeof window._dv_win.document.webkitHidden&&(g="webkitvisibilitychange");var i=function(){var b=window._dv_win.document.visibilityState;"prerender"===da&&("prerender"!==b&&"unloaded"!==b)&&(da=b,a.registerEventCall(c,{prndr:0}),window._dv_win.document.removeEventListener(g,i))};window._dv_win.document.addEventListener(g,i,!1)}else if(xa){var j=
function(){"function"===typeof t.removeEventListener&&t.removeEventListener("ready",j);a.registerEventCall(c,{prndr:0})};Ta()?"function"===typeof t.addEventListener&&t.addEventListener("ready",j):a.registerEventCall(c,{prndr:0})}};for(var Va,ea="auctionid vermemid source buymemid anadvid ioid cpgid cpid sellerid pubid advcode iocode cpgcode cpcode pubcode prcpaid auip auua".split(" "),ya=[],N=0;N<ea.length;N++){var za=dv_GetParam(La,ea[N]);null!=za&&(ya.push("dvp_"+ea[N]+"="+za),ya.push(ea[N]+"="+
za))}(Va=ya.join("&"))&&(b+="&"+Va);return b+"&jsCallback="+Ua};this.sendRequest=function(d){var a;a=this.getVersionParamName();var e=this.getVersion(),c={};c[a]=e;c.dvp_jsErrUrl=d;c.dvp_jsErrMsg=encodeURIComponent("Error loading visit.js");window._dv_win.dv_config=window._dv_win.dv_config||{};window._dv_win.dv_config.tpsErrAddress=window._dv_win.dv_config.tpsAddress||"tps30.doubleverify.com";a='try{ script.onerror = function(){ try{(new Image()).src = "'+dv_CreateAndGetErrorImp(window._dv_win.dv_config.tpsErrAddress+
"/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&dvp_isLostImp=1",c)+'";}catch(e){}}}catch(e){}';a='<html><head></head><body><script id="TPSCall" type="text/javascript" src="'+d+'"><\/script><script type="text/javascript">var script = document.getElementById("TPSCall"); if (script && script.readyState) { script.onreadystatechange = function() { if (script.readyState == "complete") document.close(); }; if(script.readyState == "complete") document.close(); } else document.close(); '+a+"<\/script></body></html>";
e=ga("about:blank");this.dv_script.id=e.id.replace("iframe","script");dv_GetParam(d,"uid");fa(e);d=dv_getPropSafe(e,"contentDocument")||dv_getPropSafe(dv_getPropSafe(e,"contentWindow"),"document")||dv_getPropSafe(window._dv_win.frames[e.name],"document");window._dv_win.t2tTimestampData.push({beforeVisitCall:getCurrentTime()});if(d){d.open();if(e=e.contentWindow||window._dv_win.frames[e.name])e.$dv=window._dv_win.$dv;d.write(a)}else d=a.replace(/'/g,"\\'"),d='javascript: (function(){document.open(); document.domain="'+
window.document.domain+"\"; window.$dv = window.parent.$dv; document.write('"+encodeURIComponent(d)+"');})()",e=ga(d),this.dv_script.id=e.id.replace("iframe","script"),fa(e);return!0};this.isApplicable=function(){return!0};this.onFailure=function(){window._dv_win._dvScriptsInternal.unshift(this.dv_script_obj);var d=window._dv_win.dvProcessed,a=this.dv_script_obj;null!=d&&(void 0!=d&&a)&&(a=d.indexOf(a),-1!=a&&d.splice(a,1));return window._dv_win.$dv.DebugInfo};this.getTrafficScenarioType=function(d){var d=
d||window,a=d._dv_win.$dv.Enums.TrafficScenario;try{if(d.top==d)return a.OnPage;for(var e=0;d.parent!=d&&1E3>e;){if(d.parent.document.domain!=d.document.domain)return a.CrossDomain;d=d.parent;e++}return a.SameDomain}catch(c){}return a.CrossDomain};this.getVersionParamName=function(){return"jsver"};this.getVersion=function(){return"76"}};


function dv_baseHandler(){function N(d){if(window._dv_win.document.body)return window._dv_win.document.body.insertBefore(d,window._dv_win.document.body.firstChild),!0;var a=0,c=function(){if(window._dv_win.document.body)try{window._dv_win.document.body.insertBefore(d,window._dv_win.document.body.firstChild)}catch(e){}else a++,150>a&&setTimeout(c,20)};setTimeout(c,20);return!1}function ea(d){var a;if(document.createElement&&(a=document.createElement("iframe")))a.name=a.id=window._dv_win.dv_config.emptyIframeID||
"iframe_"+Math.floor(1E12*(Math.random()+"")),a.width=0,a.height=0,a.style.display="none",a.src=d;return a}function ya(d){var a={};try{for(var c=RegExp("[\\?&]([^&]*)=([^&#]*)","gi"),e=c.exec(d);null!=e;)"eparams"!==e[1]&&(a[e[1]]=e[2]),e=c.exec(d);return a}catch(f){return a}}function Va(d){try{if(1>=d.depth)return{url:"",depth:""};var a,c=[];c.push({win:window._dv_win.top,depth:0});for(var e,f=1,E=0;0<f&&100>E;){try{if(E++,e=c.shift(),f--,0<e.win.location.toString().length&&e.win!=d)return 0==e.win.document.referrer.length||
0==e.depth?{url:e.win.location,depth:e.depth}:{url:e.win.document.referrer,depth:e.depth-1}}catch(N){}a=e.win.frames.length;for(var z=0;z<a;z++)c.push({win:e.win.frames[z],depth:e.depth+1}),f++}return{url:"",depth:""}}catch(F){return{url:"",depth:""}}}function fa(d){var a=String(),c,e,f;for(c=0;c<d.length;c++)f=d.charAt(c),e="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(f),0<=e&&(f="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((e+
47)%94)),a+=f;return a}function Wa(){try{if("function"===typeof window.callPhantom)return 99;try{if("function"===typeof window.top.callPhantom)return 99}catch(d){}if(void 0!=window.opera&&void 0!=window.history.navigationMode||void 0!=window.opr&&void 0!=window.opr.addons&&"function"==typeof window.opr.addons.installExtension)return 4;if(void 0!=window.chrome&&"function"==typeof window.chrome.csi&&"function"==typeof window.chrome.loadTimes&&void 0!=document.webkitHidden&&(!0==document.webkitHidden||
!1==document.webkitHidden))return 3;if(void 0!=window.mozInnerScreenY&&"number"==typeof window.mozInnerScreenY&&void 0!=window.mozPaintCount&&0<=window.mozPaintCount&&void 0!=window.InstallTrigger&&void 0!=window.InstallTrigger.install)return 2;if(void 0!=document.uniqueID&&"string"==typeof document.uniqueID&&(void 0!=document.documentMode&&0<=document.documentMode||void 0!=document.all&&"object"==typeof document.all||void 0!=window.ActiveXObject&&"function"==typeof window.ActiveXObject)||window.document&&
window.document.updateSettings&&"function"==typeof window.document.updateSettings)return 1;var a=!1;try{var c=document.createElement("p");c.innerText=".";c.style="text-shadow: rgb(99, 116, 171) 20px -12px 2px";a=void 0!=c.style.textShadow}catch(e){}return 0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")&&a&&void 0!=window.innerWidth&&void 0!=window.innerHeight?5:0}catch(f){return 0}}this.createRequest=function(){var d,a,c;window._dv_win.$dv.DebugInfo={};var e=!1,f=window._dv_win,
E=0,za=!1,z=getCurrentTime();window._dv_win.t2tTimestampData=[{dvTagCreated:z}];var F;try{for(F=0;10>=F;F++)if(null!=f.parent&&f.parent!=f)if(0<f.parent.location.toString().length)f=f.parent,E++,e=!0;else{e=!1;break}else{0==F&&(e=!0);break}}catch(jb){e=!1}var G;0==f.document.referrer.length?G=f.location:e?G=f.location:(G=f.document.referrer,za=!0);var Aa="",ga=null,ha=null;try{window._dv_win.external&&(ga=void 0!=window._dv_win.external.QueuePageID?window._dv_win.external.QueuePageID:null,ha=void 0!=
window._dv_win.external.CrawlerUrl?window._dv_win.external.CrawlerUrl:null)}catch(kb){Aa="&dvp_extErr=1"}if(!window._dv_win._dvScriptsInternal||!window._dv_win.dvProcessed||0==window._dv_win._dvScriptsInternal.length)return null;var O=window._dv_win._dvScriptsInternal.pop(),A=O.script;this.dv_script_obj=O;this.dv_script=A;window._dv_win.t2tTimestampData[0].dvWrapperLoadTime=O.loadtime;window._dv_win.dvProcessed.push(O);var b=A.src,t,Xa="https:"===window._dv_win.location.protocol?"https:":"http:",
ia=!0,ja=window.parent.postMessage&&window.JSON,Ba=!1;if("0"==dv_GetParam(b,"t2te")||window._dv_win.dv_config&&!0===window._dv_win.dv_config.supressT2T)Ba=!0;if(ja&&!1===Ba)try{t=ea(window._dv_win.dv_config.t2turl||"https://cdn3.doubleverify.com/t2tv7.html"),ia=N(t)}catch(lb){}window._dv_win.$dv.DebugInfo.dvp_HTML5=ja?"1":"0";var P=dv_GetParam(b,"region")||"",ka="http:",Ca="0";"https"==b.match("^https")&&"https"==window._dv_win.location.toString().match("^https")&&(ka="https:",Ca="1");try{for(var Ya=
f,la=f,ma=0;10>ma&&la!=window._dv_win.top;)ma++,la=la.parent;Ya.depth=ma;var Da=Va(f);dv_aUrlParam="&aUrl="+encodeURIComponent(Da.url);dv_aUrlDepth="&aUrlD="+Da.depth;dv_referrerDepth=f.depth+E;za&&f.depth--}catch(mb){dv_aUrlDepth=dv_aUrlParam=dv_referrerDepth=f.depth=""}for(var Ea=dv_GetDynamicParams(b,"dvp"),Q=dv_GetDynamicParams(b,"dvpx"),R=0;R<Q.length;R++){var Fa=dv_GetKeyValue(Q[R]);Q[R]=Fa.key+"="+encodeURIComponent(Fa.value)}"41"==P&&(P=50>100*Math.random()?"41":"8",Ea.push("dvp_region="+
P));var Ga=Ea.join("&"),Ha=Q.join("&"),Za=window._dv_win.dv_config.tpsAddress||"tps"+P+".doubleverify.com",H="visit.js";switch(dv_GetParam(b,"dvapi")){case "1":H="dvvisit.js";break;case "5":H="query.js";break;default:H="visit.js"}window._dv_win.$dv.DebugInfo.dvp_API=H;for(var S="ctx cmp ipos sid plc adid crt btreg btadsrv adsrv advid num pid crtname unit chnl uid scusrid tagtype sr dt isdvvid dup".split(" "),na=[],m=0;m<S.length;m++){var oa=dv_GetParam(b,S[m])||"";na.push(S[m]+"="+oa);""!==oa&&(window._dv_win.$dv.DebugInfo["dvp_"+
S[m]]=oa)}for(var pa="turl icall dv_callback useragent xff timecheck".split(" "),m=0;m<pa.length;m++){var Ia=dv_GetParam(b,pa[m]);null!=Ia&&na.push(pa[m]+"="+(Ia||""))}var $a=na.join("&"),u;var ab=function(){try{return!!window.sessionStorage}catch(b){return!0}},bb=function(){try{return!!window.localStorage}catch(b){return!0}},cb=function(){var b=document.createElement("canvas");if(b.getContext&&b.getContext("2d")){var a=b.getContext("2d");a.textBaseline="top";a.font="14px 'Arial'";a.textBaseline=
"alphabetic";a.fillStyle="#f60";a.fillRect(0,0,62,20);a.fillStyle="#069";a.fillText("!image!",2,15);a.fillStyle="rgba(102, 204, 0, 0.7)";a.fillText("!image!",4,17);return b.toDataURL()}return null};try{var n=[];n.push(["lang",navigator.language||navigator.browserLanguage]);n.push(["tz",(new Date).getTimezoneOffset()]);n.push(["hss",ab()?"1":"0"]);n.push(["hls",bb()?"1":"0"]);n.push(["odb",typeof window.openDatabase||""]);n.push(["cpu",navigator.cpuClass||""]);n.push(["pf",navigator.platform||""]);
n.push(["dnt",navigator.doNotTrack||""]);n.push(["canv",cb()]);var j=n.join("=!!!=");if(null==j||""==j)u="";else{for(var I=function(b){for(var a="",d,c=7;0<=c;c--)d=b>>>4*c&15,a+=d.toString(16);return a},db=[1518500249,1859775393,2400959708,3395469782],j=j+String.fromCharCode(128),v=Math.ceil((j.length/4+2)/16),w=Array(v),i=0;i<v;i++){w[i]=Array(16);for(var x=0;16>x;x++)w[i][x]=j.charCodeAt(64*i+4*x)<<24|j.charCodeAt(64*i+4*x+1)<<16|j.charCodeAt(64*i+4*x+2)<<8|j.charCodeAt(64*i+4*x+3)}w[v-1][14]=
8*(j.length-1)/Math.pow(2,32);w[v-1][14]=Math.floor(w[v-1][14]);w[v-1][15]=8*(j.length-1)&4294967295;for(var T=1732584193,U=4023233417,V=2562383102,W=271733878,X=3285377520,k=Array(80),B,l,q,r,Y,i=0;i<v;i++){for(var h=0;16>h;h++)k[h]=w[i][h];for(h=16;80>h;h++)k[h]=(k[h-3]^k[h-8]^k[h-14]^k[h-16])<<1|(k[h-3]^k[h-8]^k[h-14]^k[h-16])>>>31;B=T;l=U;q=V;r=W;Y=X;for(h=0;80>h;h++){var Ja=Math.floor(h/20),eb=B<<5|B>>>27,C;c:{switch(Ja){case 0:C=l&q^~l&r;break c;case 1:C=l^q^r;break c;case 2:C=l&q^l&r^q&r;break c;
case 3:C=l^q^r;break c}C=void 0}var fb=eb+C+Y+db[Ja]+k[h]&4294967295;Y=r;r=q;q=l<<30|l>>>2;l=B;B=fb}T=T+B&4294967295;U=U+l&4294967295;V=V+q&4294967295;W=W+r&4294967295;X=X+Y&4294967295}u=I(T)+I(U)+I(V)+I(W)+I(X)}}catch(nb){u=null}u=null!=u?"&aadid="+u:"";var Ka=b,b=(window._dv_win.dv_config.visitJSURL||ka+"//"+Za+"/"+H)+"?"+$a+"&dvtagver=6.1.src&srcurlD="+f.depth+"&curl="+(null==ha?"":encodeURIComponent(ha))+"&qpgid="+(null==ga?"":ga)+"&ssl="+Ca+"&refD="+dv_referrerDepth+"&htmlmsging="+(ja?"1":"0")+
u+Aa,s=window._dv_win.$dv.getMraid();s&&(b+="&ismraid=1");var qa;a:{try{if("object"==typeof window.$ovv||"object"==typeof window.parent.$ovv){qa=!0;break a}}catch(ob){}qa=!1}qa&&(b+="&isovv=1");var gb=b,g="";try{var p=window._dv_win.parent,g=g+("&chro="+(void 0===p.chrome?"0":"1")),g=g+("&hist="+(p.history?p.history.length:"")),g=g+("&winh="+p.innerHeight),g=g+("&winw="+p.innerWidth),g=g+("&wouh="+p.outerHeight),g=g+("&wouw="+p.outerWidth);p.screen&&(g+="&scah="+p.screen.availHeight,g+="&scaw="+p.screen.availWidth)}catch(pb){}b=
gb+(g||"");"http:"==b.match("^http:")&&"https"==window._dv_win.location.toString().match("^https")&&(b+="&dvp_diffSSL=1");var La=A&&A.parentElement&&A.parentElement.tagName&&"HEAD"===A.parentElement.tagName;if(!1===ia||La)b+="&dvp_isBodyExistOnLoad="+(ia?"1":"0"),b+="&dvp_isOnHead="+(La?"1":"0");Ga&&(b+="&"+Ga);Ha&&(b+="&"+Ha);var J="srcurl="+encodeURIComponent(G);window._dv_win.$dv.DebugInfo.srcurl=G;var Z;var $=window._dv_win[fa("=@42E:@?")][fa("2?46DE@C~C:8:?D")];if($&&0<$.length){var ra=[];ra[0]=
window._dv_win.location.protocol+"//"+window._dv_win.location.hostname;for(var aa=0;aa<$.length;aa++)ra[aa+1]=$[aa];Z=ra.reverse().join(",")}else Z=null;Z&&(J+="&ancChain="+encodeURIComponent(Z));var K=dv_GetParam(b,"uid");null==K?(K=dv_GetRnd(),b+="&uid="+K):(K=dv_GetRnd(),b=b.replace(/([?&]uid=)(?:[^&])*/i,"$1"+K));var sa=4E3;/MSIE (\d+\.\d+);/.test(navigator.userAgent)&&7>=new Number(RegExp.$1)&&(sa=2E3);var Ma=navigator.userAgent.toLowerCase();if(-1<Ma.indexOf("webkit")||-1<Ma.indexOf("chrome")){var Na=
"&referrer="+encodeURIComponent(window._dv_win.location);b.length+Na.length<=sa&&(b+=Na)}dv_aUrlParam.length+dv_aUrlDepth.length+b.length<=sa&&(b+=dv_aUrlDepth,J+=dv_aUrlParam);b+="&"+this.getVersionParamName()+"="+this.getVersion();b+="&eparams="+encodeURIComponent(fa(J));if(void 0!=window._dv_win.$dv.CommonData.BrowserId&&void 0!=window._dv_win.$dv.CommonData.BrowserVersion&&void 0!=window._dv_win.$dv.CommonData.BrowserIdFromUserAgent)d=window._dv_win.$dv.CommonData.BrowserId,a=window._dv_win.$dv.CommonData.BrowserVersion,
c=window._dv_win.$dv.CommonData.BrowserIdFromUserAgent;else{for(var Oa=dv_GetParam(b,"useragent"),Pa=Oa?decodeURIComponent(Oa):navigator.userAgent,D=[{id:4,brRegex:"OPR|Opera",verRegex:"(OPR/|Version/)"},{id:1,brRegex:"MSIE|Trident/7.*rv:11|rv:11.*Trident/7|Edge/",verRegex:"(MSIE |rv:| Edge/)"},{id:2,brRegex:"Firefox",verRegex:"Firefox/"},{id:0,brRegex:"Mozilla.*Android.*AppleWebKit(?!.*Chrome.*)|Linux.*Android.*AppleWebKit.* Version/.*Chrome",verRegex:null},{id:0,brRegex:"AOL/.*AOLBuild/|AOLBuild/.*AOL/|Puffin|Maxthon|Valve|Silk|PLAYSTATION|PlayStation|Nintendo|wOSBrowser",
verRegex:null},{id:3,brRegex:"Chrome",verRegex:"Chrome/"},{id:5,brRegex:"Safari|(OS |OS X )[0-9].*AppleWebKit",verRegex:"Version/"}],ta=0,Qa="",y=0;y<D.length;y++)if(null!=Pa.match(RegExp(D[y].brRegex))){ta=D[y].id;if(null==D[y].verRegex)break;var ua=Pa.match(RegExp(D[y].verRegex+"[0-9]*"));if(null!=ua)var hb=ua[0].match(RegExp(D[y].verRegex)),Qa=ua[0].replace(hb[0],"");break}var Ra=Wa();d=Ra;a=Ra===ta?Qa:"";c=ta;window._dv_win.$dv.CommonData.BrowserId=d;window._dv_win.$dv.CommonData.BrowserVersion=
a;window._dv_win.$dv.CommonData.BrowserIdFromUserAgent=c}b+="&brid="+d+"&brver="+a+"&bridua="+c;window._dv_win.$dv.DebugInfo.dvp_BRID=d;window._dv_win.$dv.DebugInfo.dvp_BRVR=a;window._dv_win.$dv.DebugInfo.dvp_BRIDUA=c;var L;void 0!=window._dv_win.$dv.CommonData.Scenario?L=window._dv_win.$dv.CommonData.Scenario:(L=this.getTrafficScenarioType(window._dv_win),window._dv_win.$dv.CommonData.Scenario=L);b+="&tstype="+L;window._dv_win.$dv.DebugInfo.dvp_TS=L;var ba="";try{window.top==window?ba="1":window.top.location.host==
window.location.host&&(ba="2")}catch(qb){ba="3"}var ca=window._dv_win.document.visibilityState,Sa=function(){var a=!1;try{a=s&&"function"===typeof s.getState&&"loading"===s.getState()}catch(d){b+="&dvp_mrgsf=1"}return a},va=Sa();if("prerender"===ca||va)b+="&prndr=1",va&&(b+="&dvp_mrprndr=1");var Ta="dvCallback_"+(window._dv_win.dv_config&&window._dv_win.dv_config.dv_GetRnd?window._dv_win.dv_config.dv_GetRnd():dv_GetRnd()),ib=this.dv_script;window._dv_win[Ta]=function(a,d,c,e){var f=getCurrentTime();
d.$uid=c;d=ya(Ka);a.tags.add(c,d);d=ya(b);a.tags[c].set(d);a.tags[c].beginVisitCallbackTS=f;a.tags[c].set({tagElement:ib,dv_protocol:ka,protocol:Xa,uid:c});a.tags[c].ImpressionServedTime=getCurrentTime();a.tags[c].getTimeDiff=function(){return(new Date).getTime()-this.ImpressionServedTime};try{"undefined"!=typeof e&&null!==e&&(a.tags[c].ServerPublicDns=e),a.tags[c].adServingScenario=ba,a.tags[c].t2tIframeCreationTime=z,a.tags[c].t2tProcessed=!1,a.tags[c].t2tIframeId=t.id,a.tags[c].t2tIframeWindow=
t.contentWindow,$dv.t2tEventDataZombie[t.id]&&(a.tags[c].uniquePageViewId=$dv.t2tEventDataZombie[t.id].uniquePageViewId,$dv.processT2TEvent($dv.t2tEventDataZombie[t.id],a.tags[c]))}catch(h){}if("prerender"===ca)if("prerender"!==window._dv_win.document.visibilityState&&"unloaded"!==visibilityStateLocal)a.registerEventCall(c,{prndr:0});else{var g;"undefined"!==typeof window._dv_win.document.hidden?g="visibilitychange":"undefined"!==typeof window._dv_win.document.mozHidden?g="mozvisibilitychange":"undefined"!==
typeof window._dv_win.document.msHidden?g="msvisibilitychange":"undefined"!==typeof window._dv_win.document.webkitHidden&&(g="webkitvisibilitychange");var i=function(){var b=window._dv_win.document.visibilityState;"prerender"===ca&&("prerender"!==b&&"unloaded"!==b)&&(ca=b,a.registerEventCall(c,{prndr:0}),window._dv_win.document.removeEventListener(g,i))};window._dv_win.document.addEventListener(g,i,!1)}else if(va){var j=function(){"function"===typeof s.removeEventListener&&s.removeEventListener("ready",
j);a.registerEventCall(c,{prndr:0})};Sa()?"function"===typeof s.addEventListener&&s.addEventListener("ready",j):a.registerEventCall(c,{prndr:0})}};for(var Ua,da="auctionid vermemid source buymemid anadvid ioid cpgid cpid sellerid pubid advcode iocode cpgcode cpcode pubcode prcpaid auip auua".split(" "),wa=[],M=0;M<da.length;M++){var xa=dv_GetParam(Ka,da[M]);null!=xa&&(wa.push("dvp_"+da[M]+"="+xa),wa.push(da[M]+"="+xa))}(Ua=wa.join("&"))&&(b+="&"+Ua);return b+"&jsCallback="+Ta};this.sendRequest=function(d){var a;
a=this.getVersionParamName();var c=this.getVersion(),e={};e[a]=c;e.dvp_jsErrUrl=d;e.dvp_jsErrMsg=encodeURIComponent("Error loading visit.js");window._dv_win.dv_config=window._dv_win.dv_config||{};window._dv_win.dv_config.tpsErrAddress=window._dv_win.dv_config.tpsAddress||"tps30.doubleverify.com";a='try{ script.onerror = function(){ try{(new Image()).src = "'+dv_CreateAndGetErrorImp(window._dv_win.dv_config.tpsErrAddress+"/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&dvp_isLostImp=1",e)+'";}catch(e){}}}catch(e){}';
a='<html><head></head><body><script id="TPSCall" type="text/javascript" src="'+d+'"><\/script><script type="text/javascript">var script = document.getElementById("TPSCall"); if (script && script.readyState) { script.onreadystatechange = function() { if (script.readyState == "complete") document.close(); }; if(script.readyState == "complete") document.close(); } else document.close(); '+a+"<\/script></body></html>";c=ea("about:blank");this.dv_script.id=c.id.replace("iframe","script");dv_GetParam(d,
"uid");N(c);d=dv_getPropSafe(c,"contentDocument")||dv_getPropSafe(dv_getPropSafe(c,"contentWindow"),"document")||dv_getPropSafe(window._dv_win.frames[c.name],"document");window._dv_win.t2tTimestampData.push({beforeVisitCall:getCurrentTime()});if(d){d.open();if(c=c.contentWindow||window._dv_win.frames[c.name])c.$dv=window._dv_win.$dv;d.write(a)}else d=a.replace(/'/g,"\\'"),d='javascript: (function(){document.open(); document.domain="'+window.document.domain+"\"; window.$dv = window.parent.$dv; document.write('"+
encodeURIComponent(d)+"');})()",c=ea(d),this.dv_script.id=c.id.replace("iframe","script"),N(c);return!0};this.isApplicable=function(){return!0};this.onFailure=function(){window._dv_win._dvScriptsInternal.unshift(this.dv_script_obj);var d=window._dv_win.dvProcessed,a=this.dv_script_obj;null!=d&&(void 0!=d&&a)&&(a=d.indexOf(a),-1!=a&&d.splice(a,1));return window._dv_win.$dv.DebugInfo};this.getTrafficScenarioType=function(d){var d=d||window,a=d._dv_win.$dv.Enums.TrafficScenario;try{if(d.top==d)return a.OnPage;
for(var c=0;d.parent!=d&&1E3>c;){if(d.parent.document.domain!=d.document.domain)return a.CrossDomain;d=d.parent;c++}return a.SameDomain}catch(e){}return a.CrossDomain};this.getVersionParamName=function(){return"jsver"};this.getVersion=function(){return"75"}};


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
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&jsver=0&dvp_isLostImp=1', { dvp_jsErrMsg: encodeURIComponent(e) });
            } catch (e) { }
        }
    }
}

try {
    window._dv_win = window._dv_win || window;
    var dv_baseHandlerIns = new dv_baseHandler();
	dv_handler76.prototype = dv_baseHandlerIns;
dv_handler76.prototype.constructor = dv_handler76;

    var dv_handlersDefs = [{handler: new dv_handler76(), minRate: 0, maxRate: 10}];
    (new dv_src_main(dv_baseHandlerIns, dv_handlersDefs)).exec();
} catch (e) { }

