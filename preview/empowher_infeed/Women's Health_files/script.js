function clickTagExit() {
		Enabler.exit("CLICKTAG_EXIT");
		console.log("CLICKTAG_EXIT");
}

function learnMoreExit() {
		Enabler.exit("LEARN_MORE_EXIT");
		console.log("LEARN_MORE_EXIT");
	}
	
	function isiFpiExit() {
		Enabler.exit("ISI_FPI_EXIT");
		console.log("ISI_FPI_EXIT");
	}
	
	function isiMgExit() {
		Enabler.exit("ISI_MG_EXIT");
		console.log("ISI_MG_EXIT");
	}
	
	function isiLegalExit() {
		Enabler.exit("ISI_LEGAL_EXIT");
		console.log("ISI_LEGAL_EXIT");
	}
	
	function isiPrivacyExit() {
		Enabler.exit("ISI_PRIVACY_EXIT");
		console.log("ISI_PRIVACY_EXIT");
	}
	
	function mgExit() {
		Enabler.exit("MG_EXIT");
		console.log("MG_EXIT");
	}
	
	function fpiExit() {
		Enabler.exit("FPI_EXIT");
		console.log("FPI_EXIT");
	}
function seq01() {
    
}

function stop_timer() {
    clearInterval(timer)
}

function scroll() {
    cScrollbar.y > -(scroller.offsetHeight - scrollableContent.offsetHeight) && !legal_expanded ? cScrollbar.scrollBy(0, -1) : stop_timer()
}

function start_timer() {
    //timer = setInterval(scroll, delay)
}

function initStart_timer() {
    //timer = setInterval(scroll, delay)
}



function createScrollBar() {
	var isDevice = false;
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 		isDevice = true;		
	}
    cScrollbar = new IScroll(scrollableContent, {
        scrollbars: "custom",
        mouseWheel: !0,
		click:isDevice,
        interactiveScrollbars: !0,
        shrinkScrollbars: "scale"
    }), setTimeout(function() {
        cScrollbar.refresh()
    }, 600), scrollableArea.addEventListener("mouseover", stop_timer), scrollableArea.addEventListener("mousemove", stop_timer), scrollableArea.addEventListener("mouseout", start_timer)
}

function expandConent() {
	cScrollbar.refresh();
    
    lastbg.setAttribute('class','fadein');
    
	TweenLite.to(expand, .3, {
        alpha: 0
    }), TweenLite.to(scrollableArea, .6, {
        top: "1",
		width:577
    }), TweenLite.to(scrollableContent, .6, {
        width:571,		
    }), collapse.style.display = "block", setTimeout(function() {
        cScrollbar.refresh()
    }, 600), legal_expanded = !0

}

function collapseContent() {
	start_timer();
    
    lastbg.setAttribute('class','fadeout');
    
    TweenLite.to(expand, .3, {
        alpha: 1
    }), TweenLite.to(scrollableArea, .6, {
        top: "1",
        width: 290
    }), TweenLite.to(scrollableContent, .6, {
        width: 284
    }), collapse.style.display = "none", setTimeout(function() {
        cScrollbar.refresh()
    }, 600), legal_expanded = !1
}



function init() {
	var	section2= document.getElementById("section2");
	var frame1_img1= document.getElementById("frame1_img1");
	/*var zoom_image = document.getElementById("zoom_image");*/
	var frame1_img2= document.getElementById("frame1_img2");
	var	frame2_img2= document.getElementById("frame2_img2");
	var	white= document.getElementById("white");
	var	frame3_img1= document.getElementById("frame3_img1");
	var	frame3_img2= document.getElementById("frame3_img2");
	var	frame4_img1= document.getElementById("frame4_img1");
	var	frame4_img2= document.getElementById("frame4_img2");
	var	frame4_img3= document.getElementById("frame4_img3");
	var	lastbg= document.getElementById("lastbg");
	
	var clickTag = document.getElementById("clickTag");	
	var learnMore = document.getElementById("learnMore");	
	var isi_fpi = document.getElementById("isi_fpi");
	var isi_mg = document.getElementById("isi_mg");
	var isi_legal = document.getElementById("isi_legal");
	var isi_privacy = document.getElementById("isi_privacy");
	var mg = document.getElementById("mg");
	var fpi = document.getElementById("fpi");
	
	
	setTimeout(function(){section2.setAttribute('class','fadein');},100);
    setTimeout(function(){white.setAttribute('class','show');},0);
    setTimeout(function(){frame1_img1.setAttribute('class','fadein');},100);
    setTimeout(function(){frame1_img2.setAttribute('class','fadein');},100); 
    setTimeout(function(){frame1_img1.setAttribute('class','zoom');},3000);
	setTimeout(function(){frame1_img2.setAttribute('class','fadeout');},3000); 
	setTimeout(function(){frame2_img2.setAttribute('class','fadein');},3500);
	setTimeout(function(){frame1_img1.setAttribute('class','zoom-fadeout');},6500);
	setTimeout(function(){frame2_img2.setAttribute('class','fadeout');},6500);
	setTimeout(function(){white.setAttribute('class','hide');},7000);
	setTimeout(function(){frame3_img1.setAttribute('class','fadein');},7000);
	setTimeout(function(){frame3_img1.setAttribute('class','zoomout');},7100);		
	setTimeout(function(){frame3_img1.setAttribute('class','fadeout2');},10000);	
	setTimeout(function(){frame4_img1.setAttribute('class','fadein');},10400);
	setTimeout(function(){frame4_img1.setAttribute('class','transition-top');},10900);
	setTimeout(function(){frame4_img3.setAttribute('class','fadein show');},11600);	
	setTimeout(function(){frame4_img2.setAttribute('class','fadein');},11600);
	
	clickTag.addEventListener("click", clickTagExit);
	learnMore.addEventListener("click", learnMoreExit);
	isi_fpi.addEventListener("click", isiFpiExit);
	isi_mg.addEventListener("click", isiMgExit);
	isi_legal.addEventListener("click", isiLegalExit);
	isi_privacy.addEventListener("click", isiPrivacyExit);
	mg.addEventListener("click", mgExit);
	fpi.addEventListener("click", fpiExit);
	
	
	console.log("Init"), clickTag.addEventListener("click", clickTagExit), collapse.addEventListener("click", collapseContent), expand.addEventListener("click", expandConent), scrollableContent.scrollTop = 0, TweenLite.to([copy_01, copy_02, copy_03], 0, {
        alpha: 0
    }), TweenLite.to(chromeCover, .3, {
        alpha: 0
    }), TweenLite.delayedCall(.4, seq01), createScrollBar(), document.addEventListener("touchmove", function(e) {
        e.preventDefault()
    }, !1), setTimeout(initStart_timer, 4000);
	
	
}

function enablerInitHandler() {
    init()
}
var bg = document.getElementById("bg"),
    clickTag = document.getElementById("clickTag"),
    scrollableArea = document.getElementById("scrollableArea"),
    scrollableContent = document.getElementById("scrollableContent"),
    expand = document.getElementById("expand"),
    cScrollbar, collapse = document.getElementById("collapse"),
    copy_01 = document.querySelectorAll(".copy")[0],
    copy_02 = document.querySelectorAll(".copy")[1],
    copy_03 = document.querySelectorAll(".copy")[2],
    
    chromeCover = document.getElementById("chromeCover"),
    tweenDelay = 0,
    timer, delay = 100,
    scroller = document.getElementById("scroller"),
    legal_expanded = !1;

window.onload = function() {		
	Enabler.isInitialized() ? enablerInitHandler() : Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
};

