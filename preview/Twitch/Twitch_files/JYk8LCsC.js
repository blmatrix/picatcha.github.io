



/* ControlTag Loader for Twitch 3616e704-67b1-446e-8317-cfbb86294d72 */
(function(w, cs) {
  
  if (/Twitter for iPhone/.test(w.navigator.userAgent || '')) {
    return;
  }

  var debugging = /kxdebug/.test(w.location);
  var log = function() {
    
    debugging && w.console && w.console.log([].slice.call(arguments).join(' '));
  };

  var load = function(url, callback) {
    log('Loading script from:', url);
    var node = w.document.createElement('script');
    node.async = true;  
    node.src = url;

    
    node.onload = node.onreadystatechange = function () {
      var state = node.readyState;
      if (!callback.done && (!state || /loaded|complete/.test(state))) {
        log('Script loaded from:', url);
        callback.done = true;  
        callback();
      }
    };

    
    var sibling = w.document.getElementsByTagName('script')[0];
    sibling.parentNode.insertBefore(node, sibling);
  };

  var config = {"app":{"name":"krux-scala-config-webservice","version":"3.17.4","schema_version":3},"confid":"JYk8LCsC","context_terms":[],"publisher":{"id":1837,"name":"Twitch","uuid":"3616e704-67b1-446e-8317-cfbb86294d72","version_bucket":"stable","version_hash":"836fa2cc8007bb6234a5da3cc5415177"},"params":{"link_header_bidder":false,"site_level_supertag_config":"site","recommend":false,"control_tag_pixel_throttle":100,"fingerprint":false,"user_data_timing":"load","store_realtime_segments":false,"tag_source":false,"link_hb_start_event":"ready","first_party_uid":false,"link_hb_timeout":2000,"link_hb_adserver_subordinate":true,"optimize_realtime_segments":false,"link_hb_adserver":"dfp","target_fingerprint":false,"context_terms":false,"dfp_premium":true},"prioritized_segments":[],"realtime_segments":[],"services":{"userdata":"//cdn.krxd.net/userdata/get","contentConnector":"//connector.krxd.net/content_connector","stats":"//apiservices.krxd.net/stats","optout":"//cdn.krxd.net/userdata/optout/status","event":"//beacon.krxd.net/event.gif","set_optout":"//apiservices.krxd.net/consumer/optout","data":"//beacon.krxd.net/data.gif","link_hb_stats":"//beacon.krxd.net/link_bidder_stats.gif","userData":"//cdn.krxd.net/userdata/get","link_hb_mas":"//link.krxd.net/hb","config":"//cdn.krxd.net/controltag/{{ confid }}.js","social":"//beacon.krxd.net/social.gif","addSegment":"//cdn.krxd.net/userdata/add","pixel":"//beacon.krxd.net/pixel.gif","um":"//apiservices.krxd.net/um","click":"//apiservices.krxd.net/click_tracker/track","stats_export":"//beacon.krxd.net/controltag_stats.gif","cookie":"//beacon.krxd.net/cookie2json","proxy":"//cdn.krxd.net/partnerjs/xdi","is_optout":"//beacon.krxd.net/optout_check","impression":"//beacon.krxd.net/ad_impression.gif","transaction":"//beacon.krxd.net/transaction.gif","log":"//jslog.krxd.net/jslog.gif","set_optin":"//apiservices.krxd.net/consumer/optin","usermatch":"//beacon.krxd.net/usermatch.gif"},"site":{"id":25203,"name":"Twitch.tv"},"tags":[{"id":7435,"name":"Google User Matching","content":"<script>\r\n(function() {\r\n  if (Krux('get', 'user') != null) {\r\n      new Image().src = 'https://usermatch.krxd.net/um/v2?partner=google';\r\n  }\r\n})();\r\n</script>","target":"","target_action":"append","timing":"asap","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":21059,"name":"DataLogix (e70bc6e8-7d66-460e-b96d-cee26cf41add)","content":"<script>\n    (function() {\n        var kuid = Krux('get', 'user');\n        if (kuid) {\n            var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\n            var kurl_params = encodeURIComponent(\"_kuid=\" + kuid + \"&_kdpid=e70bc6e8-7d66-460e-b96d-cee26cf41add&dlxid=<na_id>&dlxdata=<na_da>\");\n            var kurl = prefix + \"//beacon.krxd.net/data.gif?\" + kurl_params;\n            var dlx_url = '//r.nexac.com/e/getdata.xgi?dt=br&pkey=oazw62oazwq13&ru=' + kurl;\n            var i = new Image();\n            i.src = dlx_url;\n        }\n    })();\n</script>","target":null,"target_action":"append","timing":"asap","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",1]]]]},{"id":22467,"name":"MediaMath User Match","content":"<script>\n\n(function(){\n\tvar prefix = window.location.protocol == 'https:' ? 'https:' : 'http:';\n\tvar url = prefix + '//pixel.mathtag.com/sync/img?redir=' + prefix + '%2F%2Fbeacon.krxd.net%2Fusermatch.gif%3Fpartner%3Dmediamath%26mmuuid%3D%5BMM_UUID%5D';\n\t(new Image()).src = url;\n})();\n\n</script>","target":null,"target_action":"append","timing":"asap","method":"iframe","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":22468,"name":"TubeMogul User Matching","content":"<script>\n    (function() {\n        var prefix = location.protocol == 'https:' ? \"https\" : \"http\";\n        var tm_url = prefix + '://rtd.tubemogul.com/upi/pid/NC4WTmcy?redir=' + prefix + '%3A%2F%2Fbeacon.krxd.net%2Fusermatch.gif%3Fpartner_id%3Dcb276571-e0d9-4438-9fd4-80a1ff034b01%26puid%3D%24%7BTM_USER_ID%7D'\n        var i = new Image();\n        i.src = tm_url;\n    })();\n</script>","target":null,"target_action":"append","timing":"asap","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":19400,"name":"DataLogix (afae52b8-1e27-4650-bd6a-ed7d982f5a6a)","content":"<script>\n    (function() {\n        var allowUserMatch = function() {\n            var GDN_SITE_ID = '1282650';\n \n            if (Krux('get', 'config').params.client_type === 'marketer') {\n                try {\n                    var params = Krux('require:marketer').getParams(\n                            Krux('require:sizzle').find('script[src*=\"' + Krux('get', 'confid') + '\"]')\n                    );\n                    return GDN_SITE_ID !== (params.siteid || params.kxsiteid);\n                }\n                catch (e) {\n                    // In case we don't find the script tag or the URL parser fails, just allow matching.\n                }\n            }\n            return true;\n        };\n         \n        var kuid = Krux('get', 'user');\n        if (allowUserMatch() && kuid) {\n            var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\n            var kurl_params = encodeURIComponent(\"_kuid=\" + kuid + \"&_kdpid=afae52b8-1e27-4650-bd6a-ed7d982f5a6a&dlxid=<na_id>&dlxdata=<na_da>\");\n            var kurl = prefix + \"//beacon.krxd.net/data.gif?\" + kurl_params;\n            var dlx_url = '//r.nexac.com/e/getdata.xgi?dt=br&pkey=iqbg41iqbgj68&ru=' + kurl;\n            new Image().src = dlx_url;\n          \n        }\n    })();\n</script>","target":null,"target_action":"append","timing":"asap","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",1]]]]},{"id":7429,"name":"Technographic Data provider tag","content":"<script>\r\n// this tag is intentionally blank\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":7430,"name":"Krux Geographic Data provider tag","content":null,"target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":7432,"name":"Liveramp User Match","content":"<script>\r\n(function(){\r\n  var kuid = Krux('get', 'user');\r\n  if (kuid) {\r\n      var liveramp_url = 'https://idsync.rlcdn.com/379708.gif?partner_uid=' + kuid;\r\n      var i = new Image();\r\n      i.src = liveramp_url;      \r\n  }\r\n})();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":7433,"name":"DataLogix provider tag","content":"<script>\n    (function() {\n        var kuid = Krux('get', 'user');\n        if (kuid) {\n            var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\n            var kurl_params = encodeURIComponent(\"_kuid=\" + kuid + \"&_kdpid=2dd640a6-6ebd-4d4f-af30-af8baa441a0d&dlxid=<na_id>&dlxdata=<na_da>\");\n            var kurl = prefix + \"//beacon.krxd.net/data.gif?\" + kurl_params;\n            var dlx_url = '//r.nexac.com/e/getdata.xgi?dt=br&pkey=gpwn29rvapq62&ru=' + kurl;\n            var i = new Image();\n            i.src = dlx_url;\n        }\n    })();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",1]]]]},{"id":7434,"name":"eXelate Media provider tag","content":"<script>\r\n(function(){\r\n  var kuid = Krux('get', 'user');\r\n  if (kuid) {\r\n    Krux('require:http').pixel({\r\n      url: \"//loadm.exelator.com/load\",\r\n      data: {\r\n          _kdpid: 'e4942ff0-4070-4896-a7ef-e6a5a30ce9f9',\r\n          buid: kuid,\r\n          p: '204',\r\n          g: '270',\r\n          j: '0'\r\n      }});\r\n  }\r\n  })();\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":7436,"name":"Krux QuantCast Data Provider Tag","content":"<script>\r\n(function () {\r\n    if (location.protocol.indexOf('s') > -1) {\r\n       return;\r\n    }\r\n    var u = \"http://segapi.quantserve.com/seg/r;a=p-16uNVwiyGoWyg;rand=\" + Math.round(Math.random() * 999999942) + \";redirect=\" + \"http://beacon.krxd.net/data.gif?_kdpid=7038a0d8-6aab-4d21-8b2a-485b02ee88f6&segs=!qcsegs\";\r\n \r\n    (new Image()).src = u;\r\n})();\r\n</script>","target":"","target_action":"append","timing":"onload","method":"document","internal":false,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":7441,"name":"Quantcast (Twitch) provider tag","content":null,"target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":7442,"name":"Quantcast S2S provider tag","content":"<script>\n(function(){\n        var kuid = Krux('get', 'user');\n        if (kuid) {\n           var qcast_url = '//pixel.quantserve.com/pixel/p-j_f_9hh7_PWUw.gif?idmatch=0';\n           var i = new Image();\n           i.src = qcast_url;\n        }\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":7443,"name":"Nielsen - Precision Marketing (via Exelate) provid","content":null,"target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":22571,"name":"Innovid User Matching","content":"<script>\n(function(){\n         var prefix = window.location.protocol == 'https:' ? \"https:\" : \"http:\";\n         var i_url = prefix + '//ag.innovid.com/dv/sync?tid=2';\n         var i = new Image();\n         i.src = i_url;\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":[]},{"id":7492,"name":"Liveramp User Match","content":"<script>\n(function(){\n  var kuid = Krux('get', 'user');\n  if (kuid) {\n      var liveramp_url = 'https://idsync.rlcdn.com/379708.gif?partner_uid=' + kuid;\n      var i = new Image();\n      i.src = liveramp_url;     \n  }\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":8026,"name":"Jivox User Match","content":"<script>\n(function(){\n        var kuid = Krux('get', 'user');\n        if (kuid) {\n        \tnew Image().src = \"//pxl.jivox.com/tags/sync/usync.php?px=eZQcCLxB\";\n        }\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",1]]]]},{"id":26725,"name":"Twitch SpoteXchange UM Pixel","content":"<script>\n(function(){\n\n   var kuid = Krux('get', 'user');\n   if (kuid) {\n      var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\n      var kurl = prefix + encodeURIComponent('//beacon.krxd.net/usermatch.gif?partner=spotxchange&partner_uid=<spotx_audience_id>');\n      var spotxchange_url = prefix + '//sync.search.spotxchange.com/audience_sync/9?redir=' + kurl;\n      new Image().src = spotxchange_url;\n   }\n\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":24711,"name":"Signal User Match","content":"<script>\n(function(){\n\n  var kuid = Krux('get', 'user');\n  var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\n\n  if (kuid) {\n    new Image().src = prefix + '//s.thebrighttag.com/cs?tp=8RtgoqC&uid=' + kuid;\n  }\n  \n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":20364,"name":"Twitch comScore UM Pixel","content":"<script>\n(function(){\n  var kuid = Krux('get', 'user');\n  var cbust = Math.round(new Date().getTime() / 1000);\n  var prefix = location.protocol == 'https:' ? \"https:\" :\"http:\";\n  var url = prefix == 'https:' ? '//sb.scorecardresearch.com/p' : '//b.scorecardresearch.com/p';\n  if (kuid) {\n    Krux('require:http').pixel({\n      url: url,\n      data: {\n          c1: '9',\n          c2: '8188709',\n          cs_xi: kuid,\n          rn: cbust\n      }});\n  }\n  })();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":19085,"name":"DataLogix (8da8b14d-5569-4bec-bcea-722864ee8d06)","content":"<script>\n    (function() {\n        var kuid = Krux('get', 'user');\n        if (kuid) {\n            var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\n            var kurl_params = encodeURIComponent(\"_kuid=\" + kuid + \"&_kdpid=8da8b14d-5569-4bec-bcea-722864ee8d06&dlxid=<na_id>&dlxdata=<na_da>\");\n            var kurl = prefix + \"//beacon.krxd.net/data.gif?\" + kurl_params;\n            var dlx_url = '//r.nexac.com/e/getdata.xgi?dt=br&pkey=iefs40iefsj26&ru=' + kurl;\n            var i = new Image();\n            i.src = dlx_url;\n        }\n    })();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",1]]]]},{"id":19086,"name":"DataLogix (bef9f122-393d-4c45-8d8d-32d8be7ac433)","content":"<script>\n    (function() {\n        var kuid = Krux('get', 'user');\n        if (kuid) {\n            var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\n            var kurl_params = encodeURIComponent(\"_kuid=\" + kuid + \"&_kdpid=bef9f122-393d-4c45-8d8d-32d8be7ac433&dlxid=<na_id>&dlxdata=<na_da>\");\n            var kurl = prefix + \"//beacon.krxd.net/data.gif?\" + kurl_params;\n            var dlx_url = '//r.nexac.com/e/getdata.xgi?dt=br&pkey=iyzu39iyzud95&ru=' + kurl;\n            var i = new Image();\n            i.src = dlx_url;\n        }\n    })();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",1]]]]},{"id":19087,"name":"DataLogix (8bf57916-aac8-4f01-a386-4baf103b3e1f)","content":"<script>\n    (function() {\n        var allowUserMatch = function() {\n            var GDN_SITE_ID = '1282650';\n \n            if (Krux('get', 'config').params.client_type === 'marketer') {\n                try {\n                    var params = Krux('require:marketer').getParams(\n                            Krux('require:sizzle').find('script[src*=\"' + Krux('get', 'confid') + '\"]')\n                    );\n                    return GDN_SITE_ID !== (params.siteid || params.kxsiteid);\n                }\n                catch (e) {\n                    // In case we don't find the script tag or the URL parser fails, just allow matching.\n                }\n            }\n            return true;\n        };\n         \n        var kuid = Krux('get', 'user');\n        if (allowUserMatch() && kuid) {\n            var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\n            var kurl_params = encodeURIComponent(\"_kuid=\" + kuid + \"&_kdpid=8bf57916-aac8-4f01-a386-4baf103b3e1f&dlxid=<na_id>&dlxdata=<na_da>\");\n            var kurl = prefix + \"//beacon.krxd.net/data.gif?\" + kurl_params;\n            var dlx_url = '//r.nexac.com/e/getdata.xgi?dt=br&pkey=bckw15bckwu20&ru=' + kurl;\n            var i = new Image();\n            i.src = dlx_url;\n        }\n    })();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",1]]]]},{"id":19088,"name":"DataLogix (d7158cb7-a851-4e3c-b7ab-cc9e815b2399)","content":"<script>\n    (function() {\n        var allowUserMatch = function() {\n            var GDN_SITE_ID = '1282650';\n\n            if (Krux('get', 'config').params.client_type === 'marketer') {\n                try {\n                    var params = Krux('require:marketer').getParams(\n                            Krux('require:sizzle').find('script[src*=\"' + Krux('get', 'confid') + '\"]')\n                    );\n                    return GDN_SITE_ID !== (params.siteid || params.kxsiteid);\n                }\n                catch (e) {\n                    // In case we don't find the script tag or the URL parser fails, just allow matching.\n                }\n            }\n            return true;\n        };\n\n        var kuid = Krux('get', 'user');\n        if (allowUserMatch() && kuid) {\n            var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\n            var kurl_params = encodeURIComponent(\"_kuid=\" + kuid + \"&_kdpid=d7158cb7-a851-4e3c-b7ab-cc9e815b2399&dlxid=<na_id>&dlxdata=<na_da>\");\n            var kurl = prefix + \"//beacon.krxd.net/data.gif?\" + kurl_params;\n            var dlx_url = '//r.nexac.com/e/getdata.xgi?dt=br&pkey=gwjn34gwjnh86&ru=' + kurl;\n            var i = new Image();\n            i.src = dlx_url;\n        }\n    })();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",1]]]]},{"id":19089,"name":"DataLogix (536f0daa-aaaa-4d9e-9a25-dde40646786a)","content":"<script>\n    (function() {\n        var kuid = Krux('get', 'user');\n        if (kuid) {\n            var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\n            var kurl_params = encodeURIComponent(\"_kuid=\" + kuid + \"&_kdpid=536f0daa-aaaa-4d9e-9a25-dde40646786a&dlxid=<na_id>&dlxdata=<na_da>\");\n            var kurl = prefix + \"//beacon.krxd.net/data.gif?\" + kurl_params;\n            var dlx_url = '//r.nexac.com/e/getdata.xgi?dt=br&pkey=iefs40iefsj26&ru=' + kurl;\n            var i = new Image();\n            i.src = dlx_url;\n        }\n    })();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",1]]]]},{"id":19090,"name":"DataLogix (7c6392c9-e878-492c-8b14-bf06e3828ebd)","content":"<script>\n    (function() {\n        var kuid = Krux('get', 'user');\n        if (kuid) {\n            var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\n            var kurl_params = encodeURIComponent(\"_kuid=\" + kuid + \"&_kdpid=7c6392c9-e878-492c-8b14-bf06e3828ebd&dlxid=<na_id>&dlxdata=<na_da>\");\n            var kurl = prefix + \"//beacon.krxd.net/data.gif?\" + kurl_params;\n            var dlx_url = '//r.nexac.com/e/getdata.xgi?dt=br&pkey=rowp70rowpu60&ru=' + kurl;\n            var i = new Image();\n            i.src = dlx_url;\n        }\n    })();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",1]]]]},{"id":19091,"name":"DataLogix (bb8ae0e2-9cd7-45b2-ad37-7737269627d8)","content":"<script>\n    (function() {\n        var allowUserMatch = function() {\n            var GDN_SITE_ID = '1282650';\n\n            if (Krux('get', 'config').params.client_type === 'marketer') {\n                try {\n                    var params = Krux('require:marketer').getParams(\n                            Krux('require:sizzle').find('script[src*=\"' + Krux('get', 'confid') + '\"]')\n                    );\n                    return GDN_SITE_ID !== (params.siteid || params.kxsiteid);\n                }\n                catch (e) {\n                    // In case we don't find the script tag or the URL parser fails, just allow matching.\n                }\n            }\n            return true;\n        };\n        \n        var kuid = Krux('get', 'user');\n        if (allowUserMatch() && kuid) {\n            var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\n            var kurl_params = encodeURIComponent(\"_kuid=\" + kuid + \"&_kdpid=bb8ae0e2-9cd7-45b2-ad37-7737269627d8&dlxid=<na_id>&dlxdata=<na_da>\");\n            var kurl = prefix + \"//beacon.krxd.net/data.gif?\" + kurl_params;\n            var dlx_url = '//r.nexac.com/e/getdata.xgi?dt=br&pkey=rsxs71rsxsk73&ru=' + kurl;\n            var i = new Image();\n            i.src = dlx_url;\n        }\n    })();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",1]]]]},{"id":27296,"name":"DataLogix (a8138b01-9fff-43bb-b649-99241ab62170)","content":"<script>\n    (function() {\n        var kuid = Krux('get', 'user');\n        if (kuid) {\n            var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\n            var kurl_params = encodeURIComponent(\"_kuid=\" + kuid + \"&_kdpid=a8138b01-9fff-43bb-b649-99241ab62170&dlxid=<na_id>&dlxdata=<na_da>\");\n            var kurl = prefix + \"//beacon.krxd.net/data.gif?\" + kurl_params;\n            var dlx_url = '//r.nexac.com/e/getdata.xgi?dt=br&pkey=qkgx66qkgxw46&ru=' + kurl;\n            var i = new Image();\n            i.src = dlx_url;\n        }\n    })();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":22466,"name":"DataXu User Match","content":"<script>\n(function(){\n        var kuid = Krux('get', 'user');\n        var prefix = location.protocol;\n        if (kuid) {\n           var dxu_url = '//i.w55c.net/ping_match.gif?st=Krux&rurl=' + prefix + '//beacon.krxd.net/usermatch.gif?partner=dataxu&uid=_wfivefivec_';\n           var i = new Image();\n           i.src = dxu_url;\n        }\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":28909,"name":"Twitch Beeswax UM Pixel","content":"<script>\n\t(new Image()).src = '//match.prod.bidr.io/cookie-sync/krux';\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":7439,"name":"Test LiveRamp User Matching","content":"<script>\n(function(){\n  var kuid = Krux('get', 'user');\n  if (kuid) {\n      var liveramp_url = 'https://idsync.rlcdn.com/379708.gif?partner_uid=' + kuid;\n      var i = new Image();\n      i.src = liveramp_url;     \n  }\n})();\n</script>","target":"","target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",1]]]]},{"id":7440,"name":"Test Yahoo! DataX","content":"<script>\n(function(){\n    var kuid = Krux('get', 'user');\n        if (kuid) {\n            var prefix = 'https:';\n            var rurl = prefix + '//cms.analytics.yahoo.com/cms?partner_id=KRUX';\n            var i = new Image();\n            i.src = rurl;\n        }\n})();\n</script>","target":"","target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",1]]]]},{"id":7444,"name":"The Trade Desk User Matching Test","content":"<script>\n(function()\n{ var i = new Image(); i.src = '//match.adsrvr.org/track/cmf/generic?ttd_pid=krux&ttd_tpi=1'; }\n)();\n</script>","target":"","target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",2]]]]},{"id":7445,"name":"Test Neustar User Matching","content":"<script type=\"text/javascript\">\r\n(function() {\r\n    (new Image()).src = '//aa.agkn.com/adscores/g.js?sid=9212244187&_kdpid=2111c0af-fc3a-446f-ab07-63aa74fbde8e';\r\n})();\r\n</script>","target":"","target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":7446,"name":"Test BrightRoll user match","content":"<script>\r\n(function(){\r\n        var kuid = Krux('get', 'user');\r\n        var prefix = window.location.protocol == 'https:' ? 'https:' : 'http:';\r\n        if (kuid) {\r\n           var url = prefix + '//pix.btrll.com/partner/868092.png';\r\n           (new Image()).src = url;\r\n        }\r\n})();\r\n</script>","target":"","target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":7447,"name":"Test Videology User Matching","content":"<script type=\"text/javascript\">\n(function() {\n    (new Image()).src = '//sync.tidaltv.com/genericusersync.ashx?dpid=395';\n})();\n</script>","target":"","target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":7449,"name":"Test AppNexus Connect","content":"<script>\n(function(){\n        var kuid = Krux('get', 'user');\n        if (kuid) {\n            var prefix = location.protocol == 'https:' ? \"https:\" : \"http:\";\n            var kurl = prefix + '//beacon.krxd.net/usermatch.gif?adnxs_uid=$UID';\n            var appnexus_url = '//ib.adnxs.com/getuid?' + kurl\n            var i = new Image();\n            i.src = appnexus_url;\n        }\n})();\n</script>","target":"","target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":7438,"name":"DTC - initial","content":"<script>\r\n(function() {\r\n\r\n    Krux('scrape', { \r\n        // Using Globals Twitch.preferredLanguage to produce page attribute Twitch.preferredLanguage\r\n        'page_attr_Twitch.preferredLanguage': {js_global: \"Twitch.preferredLanguage\"},\r\n        // Using Cookie facebook_connected to produce user attribute cookie_facebook_connected\r\n        'user_attr_cookie_facebook_connected': {cookie: 'facebook_connected'},\r\n        // Using Globals SitePageType to produce page attribute sitepagetype\r\n        'page_attr_sitepagetype': {js_global: \"SitePageType\"},\r\n        // Using Meta rating to produce page attribute rating\r\n        'page_attr_rating': {meta_name: 'rating'},\r\n        // Using UrlPath 1 to produce page attribute url_path_1\r\n        'page_attr_url_path_1': {url_path: '1'},\r\n        // Using UrlPath 2 to produce page attribute url_path_2\r\n        'page_attr_url_path_2': {url_path: '2'},\r\n        // Using UrlPath 3 to produce page attribute url_path_3\r\n        'page_attr_url_path_3': {url_path: '3'},\r\n        \r\n        'page_attr_game_title': {js_global: 'Twitch.asyncAds.metadata.game'}\r\n    });\r\n\r\n})();\r\n</script>","target":"","target_action":"append","timing":"onready","method":"document","internal":true,"template_replacement":true,"criteria":[]}],"link":{"adslots":{},"bidders":{}}};
  
  for (var i = 0, tags = config.tags, len = tags.length, tag; (tag = tags[i]); ++i) {
    if (String(tag.id) in cs) {
      tag.content = cs[tag.id];
    }
  }

  
  var esiGeo = String(function(){/*
   <esi:include src="/geoip_esi"/>
   */}).replace(/^.*\/\*[^{]+|[^}]+\*\/.*$/g, '');

  if (esiGeo) {
    log('Got a request for:', esiGeo, 'adding geo to config.');
    try {
      config.geo = w.JSON.parse(esiGeo);
    } catch (__) {
      
      log('Unable to parse geo from:', config.geo);
      config.geo = {};
    }
  }



  var proxy = (window.Krux && window.Krux.q && window.Krux.q[0] && window.Krux.q[0][0] === 'proxy');

  if (!proxy || true) {
    

  load('//cdn.krxd.net/ctjs/controltag.js.836fa2cc8007bb6234a5da3cc5415177', function() {
    log('Loaded stable controltag resource');
    Krux('config', config);
  });

  }

})(window, (function() {
  var obj = {};
  
  return obj;
})());
