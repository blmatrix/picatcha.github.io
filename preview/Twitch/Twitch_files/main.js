var cta_holder;
var cta_bg;
var date;
var his;
var title;

function dateCheck() {
            var d1 = new Date();
            var d2 = new Date();
            var d3= new Date(2017, 0, 18, 22, 0, 0, 0);
            d1.setFullYear(2017, 0, 17);
            d2.setFullYear(2017, 0, 18);
            d3.setFullYear(2017, 0, 18, 22, 0, 0, 0);

    var now = new Date();


    if (now < d1) {

        console.log("JANUARY 18 _A");
        date.style.background = "url(./images/date_a.png) no-repeat";


    } else if (now >= d1 && now < d2) {

        console.log("TOMORROW 10/9C _B");
                     date.style.background = "url(./images/date_b.png) no-repeat";

    } else if (now >= d2 && now < d3) {

        console.log("TONIGHT 10/9C _B");
                     date.style.background = "url(./images/date_c.png) no-repeat";

    } else if (now >= d3) {

        console.log("WEDNESDAYS 10/9C _C");
                   date.style.background = "url(./images/date_d.png) no-repeat";

    }
}


function startAd() {

    adId = (EB._isLocalMode) ? 0 : EB._adConfig.adId;
    rnd = (EB._isLocalMode) ? 0 : EB._adConfig.rnd;
    uid = (EB._isLocalMode) ? 0 : EB._adConfig.uid;

    title = document.getElementById("title");
    endplate = document.getElementById("endplate");
    date = document.getElementById("date");
    his = document.getElementById("his");
    cta_holder = document.getElementById("cta_holder");
    cta_bg = document.getElementById("cta_bg");

    dateCheck();
    
    addEventListeners();
    // setupVideo();
 animateStart();
    //initVideo();

}





function addEventListeners() {


    cta_holder.addEventListener('click', replayClicked);
    cta_holder.addEventListener('mouseover', replayOverClicked);
    cta_holder.addEventListener('mouseout', replayOutClicked);

    endplate.addEventListener('click', endplateClicked);


}


function setTransition(el, props) {
    // var el = document.getElementById(target);
    el.style.WebkitTransition = props;
    el.style.MozTransition = props;
    el.style.MsTransition = props;
    el.style.transition = props;
}



function animateStart() {
  
    
    setTimeout(function () {
        animateStart2();
    }, 700);

}

function animateStart2() {
    

    setTimeout(function () {
        animateStart3();
    }, 500);

}

function animateStart3() {
//
    title.style.visibility = "visible";
    title.style.opacity = "1";


    setTimeout(function () {
        animateStart4();
    }, 500);

}

function animateStart4() {

    
    date.style.visibility = "visible";
    date.style.opacity = "1";
    
    his.style.visibility = "visible";
    his.style.opacity = "1";
    
        setTimeout(function () {
            animateStart5();
        }, 500);

}

function animateStart5() {
    cta_holder.style.visibility = "visible";
    cta_holder.style.opacity = "1";

}


function endplateClicked() {
    EB.clickthrough();

}

function replayOverClicked() {

    cta_bg.style.opacity = "0";
    cta_text.style.opacity = "1";

}

function replayOutClicked() {
    cta_bg.style.opacity = "1";
    cta_text.style.opacity = "0";

}



function replayClicked() {

    console.log("CTA")
      EB.clickthrough();
//    var expansionParams = {
//        panelName: 'expand'
//    }
//    EB.expand(expansionParams);

}
function initEB() {
    if (!EB.isInitialized()) {
        EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
    } else {
        startAd();
    }
}
//
//function checkIfAdKitReady(event) {
//    adkit.onReady(initializeCreative);
//}
//
//
//function initializeCreative(event) {
//
//    registerInteraction = function () {};
//
//    startAd();
//    //expandPanel();
//
//}
//
//function expandPanel() {
//    setTimeout(function () {
//        EB._sendMessage('expand', {
//            data: {
//                uid: EB._adConfig.uid
//            }
//        });
//    }, 100);
//}


window.addEventListener("load", initEB);



//--