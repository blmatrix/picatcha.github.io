if (!window.IBPrivacy) {
	if (!"f".trim) {
		String.prototype.trim = function() {
			return (this.replace(/^[ \r\n\t\f\s]+/, "").replace(/[ \r\n\t\f\s]+$/, ""))
		}
	}
	var thishost = self.location.hostname;
	var thiscookiedomain = thishost.substring(thishost.lastIndexOf(".",(thishost.length - 5)), thishost.length);
	if(thiscookiedomain == '.org.uk'){thiscookiedomain = thishost.substring(thishost.lastIndexOf(".",(thishost.length - thishost.lastIndexOf(".org.uk"))), thishost.length);}
	window.IBPrivacy = {
		onloadCount : 0,
		maxViewCount : 2,
		getIsEnabled : function(startDate,endDate) {
			if(!startDate || startDate.length < 10)
				var privacyStartDate=new Date("Tue, 12 Jun 2012 16:00:00 GMT");
			else
				var privacyStartDate=new Date(startDate);
			if(!endDate || endDate.length < 10)
				var privacyEndDate=new Date("Sun, 1 Jul 2012 07:00:00 GMT");
			else
				var privacyEndDate=new Date(endDate);
			var curdate = new Date();
			if (privacyStartDate < curdate && privacyEndDate > curdate && !this.cookieValue('__noShowIBP')){return true;}
			return false;
		},
		doIt : function(divStyles,startDate,endDate) {
			if(this.getIsEnabled(startDate,endDate) && !this.cookieValue('__noShowIBP') && this.testViewCount() ) {
				var head = document.getElementsByTagName("head")[0];
				var myStyle = document.createElement("style");
				myStyle.setAttribute('type', 'text/css');
				var cssstring = "@media only screen and (max-device-width: 480px) { #IBPrivacyDivId {position: relative !important; } }";
				if(!window.ActiveXObject){myStyle.innerHTML = cssstring; // if not Internet Explorer
					}else{myStyle.styleSheet.cssText = cssstring; // if Internet Explorer}
				}
				head.appendChild(myStyle);
				var body = document.getElementsByTagName("body")[0];
				var myDiv = document.createElement("div");
				myDiv.setAttribute("class", "IBPrivacyDivClass");
    			        myDiv.setAttribute("id", "IBPrivacyDivId");
    			        if(!divStyles){divStyles="position:fixed;bottom:0;right:0;width:290px;height:70px;z-index:2147483647;";}
				myDiv.setAttribute("style", divStyles);
				myDiv.style.cssText = divStyles;
				myIframe = document.createElement("iframe");
				myIframe.setAttribute("id", "IBPrivacyDivIframe");
				myIframe.setAttribute("scrolling", "no");
				myIframe.setAttribute("width", "100%");
				myIframe.setAttribute("height", "100%");
				myIframe.setAttribute("frameBorder", "0");
				myIframe.setAttribute("marginheight", "0");
				myIframe.setAttribute("marginwidth", "0");
				myIframe.setAttribute("onload", "window.IBPrivacy.confirmed();");
				myIframe.setAttribute("src", ("https:" == document.location.protocol ? "https://pxlssl" : "http://pxl") + ".ibpxl.com/privacy/");
				myIframe.setAttribute("allowTransparency", "true");
				myDiv.appendChild(myIframe);
    			        body.appendChild(myDiv);
    			        if(typeof(window.IByourCallbackPP)=="function"){IByourCallbackPP();}
			}
		},
		confirmed : function() {
			this.onloadCount++;
			if(this.onloadCount>1)
			{
				var body = document.getElementsByTagName("body")[0];
				var myDiv = document.getElementById("IBPrivacyDivId");
				this.setTastyCookie("__noShowIBP",1);
				setTimeout('document.getElementsByTagName("body")[0].removeChild(document.getElementById("IBPrivacyDivId"));',1000);
			}
		},
		cookieValue: function(n) {
			var ck = null;
			var cs = document.cookie.split("; ");
			for ( var pc = 0; !ck && (strpair = cs[pc]); pc++) {
				var pair = strpair.split("=");
				//alert(pair[0]+' = ' +pair[1])
				if (pair[0].trim() == n) {
					ck = pair[1]
				}
			}
			return ck;
		},
		setTastyCookie : function(n,v) {
			if(!this.cookieValue('__noShowIBP'))
			{
				var sessionDurationMinutes = 10080;//1 week
    			        var forSession = new Date(new Date().getTime() + (1000*60*sessionDurationMinutes)).toUTCString();
    			        document.cookie = n+"="+v+"; expires="+forSession+"; path=/; domain="+thiscookiedomain+";";
			}
		},
		addLoadEvent : function(f){if(window.attachEvent){window.attachEvent('onload', f);}else{window.addEventListener('load', f, false);}
		},
		testViewCount : function() {
			var viewCount = this.cookieValue('__IBPviews');
			if(!viewCount) { 
				this.setTastyCookie('__IBPviews',1,false);
			} else if(viewCount >= this.maxViewCount) {
				return false;
			} else {
				viewCount++;
				this.setTastyCookie('__IBPviews',viewCount,false);
			}
			return true;
		}
	}
}

if (typeof(IB) == 'undefined'){ var IB = {}; };
IB.BT = {};

IB.helpers = {};

IB.helpers.cwa = function(domObj, listOfAttributes){
	var obj = document.createElement(domObj); 
	for (attrib in listOfAttributes){							
		obj[attrib] = listOfAttributes[attrib];				
	}; 				
    return obj;
}; 
IB.helpers.ac = function(parentObj, childObj){
	return parentObj.appendChild(childObj);
}; 

IB.BT.ibTag = "ib_meta";
IB.BT.metaTags = [];
IB.BT.queryParams = [];
IB.BT.rawUrl = window.location.href;
IB.BT.queryString = window.location.search.substring(1);
IB.BT.title = document.title;
IB.BT.scripts = [];
IB.BT.javaEnabled = navigator.javaEnabled() || "unknown";
IB.BT.isSSL = (window.location.toString().indexOf('https://') != -1);

IB.BT.Init = function(){      
    var fixScript = "<\/script>";
    var b = window.document;
    var isSecure = IB.BT.isSSL;

    var rmvQ = function(str){       
        return str.toString().replace(/"/g,"");
    };
    
    var loadMetaData = function(metaTagName, metaTagValue){  
        var arrayLen = IB.BT.metaTags.length; 
        if (arrayLen > 0){
            for (var i=0; i < arrayLen; i++){            
                if (IB.BT.metaTags[i].tagName == metaTagName){
                    IB.BT.metaTags[i] = {tagName: metaTagName, tagContent: metaTagValue};                    
                    return;
                };
            };  
        };        
        IB.BT.metaTags[arrayLen] = {tagName: metaTagName, tagContent: metaTagValue};        
    };
    
    var pullMetaData = function(){
        var metas = document.getElementsByTagName('META');    
        if (metas.length != 0){         
          for (var i = 0; i < metas.length; i++){             
               var metaName = (metas[i].getAttribute('NAME')) ? metas[i].getAttribute('NAME') : ((metas[i].getAttribute('HTTP-EQUIV')) ? metas[i].getAttribute('HTTP-EQUIV') : null);
               var content = (metas[i].getAttribute('CONTENT')) ? metas[i].getAttribute('CONTENT') : "";               
               if (metaName){ loadMetaData(metaName, content); };                                             
          };                    
        };
    }(); 


    var pullIbMeta = function(){
       var tag = "";
       var metaTags = IB.BT.metaTags;
       for (var i=0; i < metaTags.length; i++){
            if (metaTags[i].tagName == IB.BT.ibTag){
                tag = metaTags[i].tagContent;
                break;
            };            
        };    
        return tag; 
    };
    
    var getHead = function() {
    	theHead = document.getElementsByTagName("head");
    	if (theHead && theHead[0]) return theHead[0];
    	else return null;
    };
    
       var addScript = function(data, framed, postProcessorFunction, testFunctionName, preProcessorFunction){        
        var obj = {
        		script: data,
        		isFramed: framed,
        		postProcessor: postProcessorFunction,
        		testFunc: testFunctionName,
        		preProcessor: preProcessorFunction
        };
        IB.BT.scripts[IB.BT.scripts.length] = obj;
       };
       
       var advertisingDotCom = function(site, meta, framed){     
         if (isSecure) { return; };       
         var tag = pullIbMeta();
         var ctxList = "";var comma = "";
         if (tag != ""){
               var splitTag = tag.split(",");
               for (var d=0; d<splitTag.length; d++){
                 var splitBlock = splitTag[d].split("|");
                 if (splitBlock.length < 2) { continue; };
                 if (splitBlock[1].toString().toLowerCase() != "null"){
                    ctxList += comma + splitBlock[1];                   
                    comma = ",";
                 };
               };            
           };                   
         var script = "<img src=\"http://servedby.advertising.com/burl/site=" + site + "/mnum=" + meta + "/logs=0/bins=1/ctxt=" + rmvQ(ctxList) + "\" width=\"1\" height=\"1\">";
         addScript(script, ((framed) ? true : false));  
       };
       
       var setKeyValuePairs = function(funcName) {
       		var incrementalPayload = "";
			var tag = pullIbMeta();
	   		if (tag != ""){
               var splitTag = tag.split(",");
               for (var d=0; d<splitTag.length; d++){
                 var splitBlock = splitTag[d].split("|");
                 if (splitBlock.length < 2) { continue; };
                 if (splitBlock[1].toString().toLowerCase() != "null"){
                    incrementalPayload += funcName.apply(null,[splitBlock[0],splitBlock[1]]);
                 };
               };//loop thru ib meta pairs
           };//only execute if ibmeta was defined
           return incrementalPayload;
       }//setKeyValuePairs
       
       var ysm = function(acct, framed) {
       		var scriptUrl = "//srv3.wa.marketingsolutions.yahoo.com/script/ScriptServlet?aid=" + acct;
			window.ysm_accountid = acct;
			docHead = getHead();
			if (docHead) {
				newScr = document.createElement("script");
				newScr.setAttribute("type","text/javascript");
				newScr.src = scriptUrl;
				docHead.appendChild(newScr);
			}
       }//Yahoo Search Marketing
       
		var revenueScience = function(framed){ 
                    var script = '<img src="//ads.cpxadroit.com/adserver/5JK3H74Y0R7.gif" width="1" height="1" border="0" />';
                      script += '<img src="//www.burstnet.com/enlightn/6810//32C9/" width="0" height="0" border="0" />';     
                     if (location.href.indexOf("carsdirect.com") == -1) {
                      if (!isSecure) script += '<img width=1 height=1 border=0 src="//ad.trafficmp.com/a/bpix?adv=1491&id=5&r=" />';      
                     } else {
                      if (!isSecure) script += '<img width=1 height=1 border=0 src="//ad.trafficmp.com/a/bpix?adv=1491&id=6&r=" />'; 
                      }
                     addScript(script, ((framed) ? true : false)    );
                };//revenueScience
       
		var blueKai = function(acct, meta, framed){               
			if (isSecure) { return; };
			var script = "<iframe name=\"__bkframe\" height=0 width=0 frameborder=0 src=\"javascript:void\(0\)\"><\/iframe>";
			script += getJsTag('http://www.bkrtx.com/js/bk-static.js');
			var blueKaiInvocations = function() {
				var theAcct = acct;
				var theMeta = meta;
				setKeyValuePairs(bk_addPageCtx);
				bk_doJSTag(theAcct,theMeta);
			};//blueKaiInvocations
			
			addScript(script, ((framed) ? true : false),blueKaiInvocations, "bk_addPageCtx");
		};//blueKai
		
		var getJsTag = function(s) {return '<scr'+'ipt type="text/javascript" src="'+s+'">'+fixScript};
		var scape = function(s) {return window.encodeURIComponent?window.encodeURIComponent(s):escape(s)};
		var getKVPGetParams = function(a,b) {return("&" + scape(a) + "=" + scape(b));}
		
		var turn = function(acct, meta, framed) {
                        return;
			/* kvp = setKeyValuePairs(getKVPGetParams);
			var script = '<img width="1" height="1" border="0" src="//r.turn.com/r/bd?pid='+acct+'&evt=99&cat='+meta+kvp+'" />';
			addScript(script, ((framed) ? true : false)); */
		}//turn

		var kontera = function(acct, meta, framed) {
			if (isSecure) { return; }
			var konteraPreProcessor = function() {
				var theAcct = acct;
				var theMeta = meta;
				window.dc_UnitID = 14;
				window.dc_PublisherID = theAcct;
				window.dc_AdLinkColor = theMeta;
				window.dc_isBoldActive = 'no';
				window.dc_adprod='ADL';
			}
			var script = getJsTag("http://kona.kontera.com/javascript/lib/KonaLibInline.js");
			addScript(script, ((framed) ? true : false), null, null, konteraPreProcessor);
		}//kontera
       
       var tacoda = function(acct, meta, framed){
            if (top != self) {return;};           
            if (isSecure) { return; };               
            var script = "<script type=\"text/javascript\">var tcdacmd=\"" + rmvQ(meta) + "\";" + fixScript;
            script += getJsTag("http://an.tacoda.net/an/" + acct  + "/slf.js");
            
            addScript(script, ((framed) ? true : false));
       };  
       
       var bizo = function(acct, meta, framed) {
       		if (isSecure) { return; };
			window._bizo_data_partner_id = acct;
			var script = getJsTag('http://js.bizographics.com/convert_data.js?partner_id='+acct);
			addScript(script, ((framed) ? true : false));
       }

       var script = "<script type=\"text/javascript\">function addIBLoadEvent(fn){ if (window.addEventListener){ window.addEventListener(\"load\", fn, false); }else if (window.attachEvent){ window.attachEvent(\"onload\", fn);}}"+fixScript;
       addScript(script, false);

      var comscoreimg = function(comScoreImgId,comScoreImgName,comScoreImgClass,comScoreImgDivId,comScoreImgDivClass,comScoreImgDivStyle){
    	 
    	   var script = "<script type=\"text/javascript\">function comScoreInit(){"
    			+ "var body = document.getElementsByTagName(\"body\")[0];"
    			+ "var myDiv = document.createElement(\"div\");"
    			+"myDiv.setAttribute(\"class\", \""+comScoreImgDivClass+"\");"
    			+"myDiv.setAttribute(\"id\", \""+comScoreImgDivId+"\");"
			+"myDiv.setAttribute(\"style\", \""+comScoreImgDivStyle+"\");"
			+"myDiv.style.cssText = \""+comScoreImgDivStyle+"\";"
    			+"var myImg = document.createElement(\"img\");";
                        
                        var thisProtocol = "http://pxl";
    			if (isSecure) { 
                             var thisProtocol = "https://pxlssl";
                        script += "myImg.setAttribute(\"src\", \""+thisProtocol+".ibpxl.com/images/"+comScoreImgName+"\");"  
                      //  script += "myImg.setAttribute(\"src\", \"http://ibpxl-web1.internetbrands.com//images/"+comScoreImgName+"\");"     //this line should be removed once CDN issue fixed
 			script += "myImg.setAttribute(\"class\", \""+comScoreImgClass+"\");"
    			+"myImg.setAttribute(\"id\", \""+comScoreImgId+"\");"
    			+"myDiv.appendChild(myImg);"
    			+"body.appendChild(myDiv);"
                        +"if(typeof(IByourCallback)==\"function\"){IByourCallback();}"
    		+"};" 
    		+"window.addIBLoadEvent(window.comScoreInit);"+fixScript;  

    	   script +="<scr" +"ipt type=\"text/javascript\">"
    	    +" var _comscore = _comscore || []; "
    	    +" _comscore.push({ c1: \"2\", c2: \"8138560\" });"
    	    +" (function() {"
    	    +"  var s = document.createElement(\"script\"), el = document.getElementsByTagName(\"script\")[0]; s.async = true; "
    	    +"  s.src = (document.location.protocol == \"https:\" ? \"https://sb\" : \"http://b\") + \".scorecardresearch.com/beacon.js\"; "
    	    +"   el.parentNode.insertBefore(s, el); "
    	    +" })(); "
    	    +fixScript
    	    +"<noscript><img src=\"http://b.scorecardresearch.com/p?c1=2&c2=8138560&cv=2.0&cj=1\" /></noscript>";
    	   	addScript(script, false);
       };
       
       var exelate = function(property_id , segment_id, category_id){
    	    var script ="<scr" +"ipt type=\"text/javascript\" src=\"//loadus.exelator.com/load/?p=258&g="+property_id+"&c="+segment_id+"&ctg="+category_id+"\">" + fixScript;
    	    addScript(script, false);
       };
       
       var backtrack = function(backtrackAsync,backtrackGoogleId){
		
		var script = "<scr" + "ipt type=\"text/javascript\">function backtrackInit(){" 
				+ "var body = document.getElementsByTagName(\"body\")[0];"
				+ "var myScript = document.createElement(\"script\");"
		            	+ "var backHost = ((\"https:\" == document.location.protocol) ? \"https://pxlssl.\" : \"http://pxl.\");";
			if (backtrackAsync != 'true'){
				script += "window.pageTracker = _gat._createTracker(\"" + backtrackGoogleId + "\");";
				script += "myScript.setAttribute(\"src\", backHost + \"ibpxl.com/event-track-ols.js\");"
			}
			else
			{
				script += "myScript.setAttribute(\"src\", backHost + \"ibpxl.com/event-track-a.js\");"
			}
		script += "body.appendChild(myScript);";
		script +="}; window.addIBLoadEvent(window.backtrackInit);"+fixScript;
		addScript(script, false);
	};

	var lotame = function(){
			var script = "<div style=\"display:none;\" id=\"ibLotameDiv\"></div><scr" + "ipt type=\"text/javascript\">(function() {" 
				+ "var firstScript = document.getElementById(\"ibLotameDiv\");"
				+ "var myScript = document.createElement(\"script\");myScript.type = \"text/javascript\";myScript.async = true;"
		        + "var lotameHost = ((\"https:\" == document.location.protocol) ? \"https://\" : \"http://\");";
			script += "myScript.src = lotameHost + \"tags.crwdcntrl.net/c/364/cc_af.js\";";
			script += "myScript.id = \"LOTCC_364\";";	
			script += "firstScript.appendChild(myScript);";
			script +="})();"+fixScript;
			addScript(script, false);
	};

	var crazyegg = function(crazySrc){
			var script = "<scr" + "ipt type=\"text/javascript\">function crazyeggInit(){" 
				+ "setTimeout(function(){var a=document.createElement(\"script\");"
				+ "var b=document.getElementsByTagName(\"script\")[0];"
				+ "a.src=document.location.protocol+\"//dnn506yrbagrg.cloudfront.net/pages/scripts/"+crazySrc+".js?\"+Math.floor(new Date().getTime()/3600000);"
				+ "a.async=true;a.type=\"text/javascript\";b.parentNode.insertBefore(a,b)}, 1);";
			script +="}; window.addIBLoadEvent(window.crazyeggInit);"+fixScript;
			addScript(script, false);
	};
	
	var ibPrivacy = function(divStyles,startDate,endDate){
                window.IBPrivacy.addLoadEvent(function(){window.IBPrivacy.doIt(divStyles,startDate,endDate);});
	};
       
       var googleScript = function(acct, passedDomain, framed){                        
            var script = "<scr" + "ipt type=\"text/javascript\">";
            script += "var gaJsHost = ((\"https:\" == document.location.protocol) ? \"https://ssl.\" : \"http://www.\");";
            script += "document.write(unescape(\"%3Cscript src='\" + gaJsHost + \"google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E\"));";
            script += fixScript;
            
            var googleInvocations = function() {
            	var theAcct = acct;
            	var theDomain = passedDomain;
            	var pageTracker = _gat._getTracker(theAcct);
            	if (theDomain) {
            		pageTracker._setDomainName(theDomain);
            	}
            	pageTracker._initData();
            	pageTracker._trackPageview();
            }          
                        
            addScript(script, ((framed) ? true : false), googleInvocations, "_gat");  
        };
              
       var quantCast = function(acct, meta, framed){
          var script = "";
          if (!isSecure) { 
            script += getJsTag('http://edge.quantserve.com/quant.js');
          }else{
            script += getJsTag('//secure.quantserve.com/quant.js');
           }
          
          var quantCastInvocations = function() {
          	var theAcct = acct;
          	var theMeta = meta;
          	window._qoptions = { tags: rmvQ(theMeta) };
          	window._qacct = theAcct;
          	quantserve();
          }       
          addScript(script, ((framed) ? true : false), quantCastInvocations, "quantserve");
       	};


       var cieStudios = function(acct, framed){
          var script = "";                   
          script += getJsTag("//prstats.postrelease.com/PRStats.js");
          var cieStudiosInvocations = function() {
          	var theAcct = acct;
          	window._pracct = theAcct;
          	prTracker();
          }
          
          addScript(script, ((framed) ? true : false), cieStudiosInvocations, "prTracker");     
       };


       var FIM = function(framed){           
           var script = "<scr" + "ipt type=\"text/javascript\">";             
           script += "var _l = 70; var _p = 1440; var _f = 1;";
           script += "var _ta = (document.domain).split (\".\"); var psd = (_ta.length > 1 ? \".\" + _ta[_ta.length - 2] + \".\" + _ta[_ta.length - 1] : document.domain);";
           script += "var _cn = \"L\" + _l + \"=\"; var _call = document.cookie.indexOf (_cn); var _il = 1;";
           script += "var _tl = 0; var _ex; var _rnd = (new Date ()).getTime (); if (_call >= 0) { _pos = document.cookie.substring (_call).indexOf (';');";
           script += "if (_pos > 0) _val = document.cookie.substring (_call + _cn.length, _call + _pos);";
           script += "else _val = document.cookie.substring (_call + _cn.length);";
           script += "if (_val.indexOf ('.') > 0) { _il = _val.substring (0, _val.indexOf ('.'));";
           script += "_ex = _val.substring (_val.indexOf ('.') + 1);";
           script += "_tl = _ex - (new Date ()).getTime (); }";
           script += "if (_tl <= 0) document.cookie = _cn + \";";
           script += "domain=\" + psd + \"; path=/; expires=\" + (new Date ((new Date ()).getTime () - 1000000)).toGMTString () + \";\"; }";
           script += "if (_il < _f || _tl <= 0) { var expiry = (new Date((new Date()).getTime()+_p*2*60*1000)).toGMTString();";
           script += "if (document.cookie.indexOf(_cn) < 0 ) document.cookie=_cn+''+(1)+'.'+((new Date()).getTime()+_p*60*1000)+';";
           script += "domain='+psd+';path=/;expires='+expiry; else document.cookie=_cn+''+(_il-0+1)+'.'+_ex+';";
           script += "domain='+psd+'; path=/;expires='+expiry;";
           script += "document.write (\"<sc\" + \"ript language='javascript' src='https://p.opt.fimserve.com/bht/?px=\" + _l + \"&v=1&rnd=\" + _rnd + \"'>\");";
           script += "document.write (\"</sc\" + \"ript>\"); }";           
           script += fixScript;           
           addScript(script, ((framed) ? true : false));
       };
       
       var getProtocol = function(){
            return ((isSecure) ? "https" : "http");   
       };

       
       var loadBehaviorScripts = function(){            
comscoreimg("iblogounify_img", "ib-home-garden.jpg", "iblogounify_img", "iblogounify_div", "iblogounify_div", "iblogounify_div");
ibPrivacy("position:fixed;bottom:0;right:0;width:290px;height:70px;z-index:2147483647;","Tue, 12 Jun 2012 16:00:00 GMT","Thu, 12 Jul 2012 07:00:00 GMT");
       }();
    
    var checkCookiesEnabled = function(){
        var enabled = false;        
        if (navigator.cookieEnabled){
            enabled = navigator.cookieEnabled;
        }else if(!navigator.cookieEnabled){ 
            document.cookie = "testIBCookieObj";
            enabled = (document.cookie.indexOf("testIBCookieObj")!=-1)? true : false;
        };
        IB.BT.cookiesEnabled = enabled;      
    }();
    
    window.IBIntervalTimers = {};
    
    var IntervalProcessor = function(ptFunc, ppostProc) {
    	this.tFunc = ptFunc;
    	this.postProc = ppostProc;
    	var thisObj = this;
    	window.IBIntervalTimers[this.tFunc] = window.setInterval(
    	function() {
    		var theTestFunc = thisObj.tFunc;
			var execFunc = thisObj.postProc;
			if (!window[theTestFunc]) return;
			window.clearInterval(window.IBIntervalTimers[theTestFunc]);
			window.IBIntervalTimers[theTestFunc] = null;
			execFunc.apply();
    	},10)
    };//Object: IntervalProcessor
    
    var loadScripts = function(target){
        var scr = IB.BT.scripts; 
        var loc = (target) ? target : b;
        var f = (target) ? true : false;       
        if (target) {loc.open(); };
        if (scr.length > 0){
            for (var i=0; (i < scr.length);i++){
            	var cScr = scr[i];
                if (cScr.isFramed  == f){
                	if (cScr.preProcessor) {
                		cScr.preProcessor.apply();
                	}
                	if (cScr.script){ loc.write(cScr.script); }
                    if (cScr.postProcessor) {
                    	if (window[cScr.testFunc]) {
                    		cScr.postProcessor.apply();
                    	} else {
                    		var ip = new IntervalProcessor(cScr.testFunc, cScr.postProcessor);                    		
	                    }//if depending functions were loaded
                    }//if postprocessor defined
                };
            };
        };        
        if (target) { loc.close(); };
    };
    
    var loadTrackingScripts = function(iframe){        
        loadScripts();
    };
    
    var createIFrame = function(){
       loadTrackingScripts();
    }();

};

IB.BT.referrer = function(){    
    return (document.referrer&&document.referrer!="") ? document.referrer : "";    
};

IB.BT.getOS = function(){
    return ((navigator.platform.indexOf("Win") != -1) ? "Windows" : navigator.platform);
};

IB.BT.getQueryParams = function(){       
    var qString = IB.BT.queryString;   
    if (qString == "") {                 
        return IB.BT.queryParams;
     };     
    var qArray = qString.split("&");    
    for (var i=0; i < qArray.length; i++){
        var nameValue = qArray[i].split("=");
        IB.BT.queryParams[IB.BT.queryParams.length] = {name: nameValue[0], value: nameValue[1] };
    }; 
    return IB.BT.queryParams;
};

IB.BT.Init();







































































