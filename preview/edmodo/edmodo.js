var clicked = false;
function initFloatingAd() {
    $(document.body).append($('#floating-items').detach());
    $('.str-adunit .adsnative-cta-button').click(function(e) {
        e.stopPropagation();
        console.log('user clicked ad');
        clicked = true;
        var adUnitOffset = $('.str-adunit').offset(),
            floatUnitOffset = $('#floating-ad-container').offset();
        // Start moving the floating container to overlap infeed unit
        $('#floating-ad-container').css({ "top": adUnitOffset.top, "left": adUnitOffset.left });

        if(adUnitOffset.top === floatUnitOffset.top) {
            showFloatingContainer();
        } else {
            $('#floating-ad-container').on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(event) {
                showFloatingContainer();
            });
        }
    });

    $('.str-ico-close, .floating-bg').click(function(e) {
        e.stopPropagation();
        console.log('user closed ad');
        var offset = $('.str-adunit').offset();
        $('#floating-ad-container, .floating-bg').removeClass('clicked');
        $('#floating-ad-container').css({ "top": offset.top, "left": offset.left });
    });
}

function showFloatingContainer() {
    if(!clicked) return;
    clicked = false;

    var floatContainer = $('#floating-ad-container');
    console.log('moved to adunit pos!');
    if(floatContainer.hasClass('install')) return;

    // Increase height for Content Ad
    if(floatContainer.hasClass('content')) floatContainer.css('height', $('.str-adunit').height() + 'px');

    if(floatContainer.hasClass('clicked')) return;
    floatContainer.addClass('clicked');

    var adContainerOffset = getViewportOffset($("#floating-ad-container"));
    $('#floating-ad-container, .floating-bg').addClass('clicked');

    // Onclick move FC to full height of viewport
    if($('.str-adunit.content-ad').length) {
        floatContainer.css("top", "0px");
    } else {
        floatContainer.css("top", "150px");
    }

    // Start Video Play
    iframe = document.getElementsByClassName('adsnative-video-iframe')[0];
    if(iframe) iframe.contentWindow.postMessage('adsnative.mrc50.view:in', 'http://api.adsnative.com'); 
}

function whichAnimationEvent() {
    var t,
        el = document.createElement("fakeelement");

    var animations = {
        "animation": "animationend",
        "OAnimation": "oAnimationEnd",
        "MozAnimation": "animationend",
        "WebkitAnimation": "webkitAnimationEnd"
    }

    for (t in animations) {
        if (el.style[t] !== undefined) {
            return animations[t];
        }
    }
}

function getViewportOffset($e) {
    var $window = $(window),
        scrollLeft = $window.scrollLeft(),
        scrollTop = $window.scrollTop(),
        offset = $e.offset(),
        rect1 = { x1: scrollLeft, y1: scrollTop, x2: scrollLeft + $window.width(), y2: scrollTop + $window.height() },
        rect2 = { x1: offset.left, y1: offset.top, x2: offset.left + $e.width(), y2: offset.top + $e.height() };
    return {
        left: offset.left - scrollLeft,
        top: offset.top - scrollTop,
        insideViewport: rect1.x1 < rect2.x2 && rect1.x2 > rect2.x1 && rect1.y1 < rect2.y2 && rect1.y2 > rect2.y1
    };
}
