(function(){
    /* tokens */
    var ppcs="%3Cdiv%20id%3D%27dv_pp_OgJQdgOId4J4%27%3E%3Cscript%20type%3D%27text%2Fjavascript%27%3E%0A%3C%21--%0Avar%20sm_random%20%3D%20Math.ceil%281000000*Math.random%28%29%29%3B%0Avar%20u%20%3D%20%27%27%3B%0Avar%20r%20%3D%20%27%27%3B%0Atry%0A%7B%0Au%20%3D%20encodeURIComponent%28document.location%29%3B%0Ar%20%3D%20encodeURIComponent%28document.referrer%29%3B%0A%7Dcatch%28e%29%7B%7D%0Adocument.write%28%22%3Cscr%22%2B%22ipt%20type%3D%27text%2Fjavascript%27%20src%3D%27%2F%2Fx.vindicosuite.com%2Fimp%2F%3Fl%3D492918%26t%3Dj%26u%3D%22%2Bu%2B%22%26r%3D%22%2Br%2B%22%26rnd%3D%22%2Bsm_random%2B%22%27%3E%3C%2Fscr%22%2B%22ipt%3E%22%29%3B%0A%2F%2F--%3E%3C%2Fdiv%3E",
        ppps="%3Cdiv%20style%3D%22display%3Anone%22%3E%3Ciframe%20src%3D%22%2F%2Fbh.contextweb.com%2Fbh%2Fvisitormatch%3Ftag%3D488370%26pid%3D560417%22%3E%3C%2Fiframe%3E%3C%2Fdiv%3E%3Cdiv%20style%3D%22display%3Anone%3Bwidth%3A0%3Bheight%3A0%22%3E%3CIFRAME%20SRC%3D%22https%3A%2F%2Fpixel.quantserve.com%2Fpixel%2Fp-01-0VIaSjnOLg.gif%3Ftags%3DCONTEXTWEB.IAB1%2CPUBLISHER.560417%2C1970%2CCAMPAIGN.0.0%2CAA_30000%2CAA_30102%2CAA_30301%2CAA_30600%2CAA_30803%2CAA_30206%2CAA_30902%2CVERU1%2CADSIZE.728X90%2CZIPCODE.30319%2CPUBLISHERDOMAIN.myspace.com%22%20HEIGHT%3D%220%22%20WIDTH%3D%220%22%20MARGINWIDTH%3D%220%22%20MARGINHEIGHT%3D%220%22%20ALLOWTRANSPARENCY%3D%22true%22%20FRAMEBORDER%3D%220%22%20SCROLLING%3D%22NO%22%3E%3C%2FIFRAME%3E%3C%2Fdiv%3E%3Cimg%20src%3D%22https%3A%2F%2Fidsync.rlcdn.com%2F400066.gif%3Fpartner_uid%3D17l6hZhRpiQ8%22%20height%3D%221%22%20width%3D%221%22%20border%3D%220%22%2F%3E",
        pp_exp="0",
        ppContainerId = "pp_ad_container_0",
        maOpts = {"enabled":false,"maxSeqNum":0,"periodMax":0,"periodMin":0,"rotatingPassback":false,"skipRotation":false},
        /* selecting parent.parent.pp in case this is in multiple iframes */
        pp = window.pp || parent.pp || parent.parent.pp,
        runSafe = function(func){
            try{
                return func();
            }catch(ignore){}
        },
        thisAd = runSafe(function(){
            if (typeof pp === 'object' && typeof pp.updateMaOpts === 'function') {
                return pp.updateMaOpts(ppContainerId, maOpts);
            }
        }),
        docWrite = function(str){
            document.write(decodeURIComponent(str)); // jshint ignore:line
        };
    /* right before rendering the creative, the previous one will be rotated if necessary */
    runSafe(function(){
        if (typeof pp === 'object' && typeof pp.beforeRenderAd === 'function') {
            pp.beforeRenderAd(ppContainerId);
        }
    });
    /* only render ad if necessary according to MA config */
    if (typeof thisAd !== 'object' || typeof thisAd.maOpts !== 'object' || !thisAd.maOpts.skipRotation) {
        //inline rendering using document.write
        if(pp_exp=='1'){
            try{
                /* used in async javascript [1.0], where the ad itself is rendered in an iframe */
                parent.pp.AdManager.displayExpandable(window.frameElement,decodeURIComponent(ppcs));
                docWrite(ppps);
            }catch(e){
                docWrite(ppcs+ppps);
            }
        } else {
            docWrite(ppcs+ppps);
        }
    }
    /* after rendering or skipping the creative the next rotation must be scheduled (according to 'maOpts') */
    runSafe(function(){
        if (typeof pp === 'object' && typeof pp.afterRenderAd === 'function') {
            pp.afterRenderAd(ppContainerId);
        }
    });
})();