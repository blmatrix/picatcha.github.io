function initFloatingAd() {
    var floatingItems = document.getElementById('floating-items'),
        parent = floatingItems.parentNode;

    if (!parent) { return; }
    parent.removeChild(floatingItems);
    document.body.appendChild(floatingItems);

    var adUnit = document.getElementsByClassName('str-adunit')[0];
    adUnit.onclick = function(e) {
        e.stopPropagation();
        userClicked = true;

        // Only for Content and Leadgen Ads
        var floatingUnit = document.getElementById('floating-ad-container');
        if(hasClass(floatingUnit, 'animate')) {
            console.log('Remove animation from floating unit');
            removeClass(floatingUnit, 'animate');
        }
        overlapFloatingContainer(e.currentTarget, showFloatingContainer);
    }

    if(document.getElementsByClassName('str-ico-close').length) {
        document.getElementsByClassName('str-ico-close')[0].onclick = adClosed;
    }
    if(document.getElementsByClassName('floating-bg').length) {
        document.getElementsByClassName('floating-bg')[0].onclick = adClosed;
    }
}

function showFloatingContainer() {
    if(!userClicked) return;
    userClicked = false;

    var floatingUnit = document.getElementById('floating-ad-container');
    if(hasClass(floatingUnit, 'install')) return;

    // Add animation to floating container
    if(!hasClass(floatingUnit, 'animate')) {
        console.log('Add animation to floating unit');
        addClass(floatingUnit, 'animate');
    }

    // Increase height for Content Ad
    if(hasClass(floatingUnit, 'content')) floatingUnit.style.height = $('.str-adunit').height() + 'px';
    if(hasClass(floatingUnit, 'clicked')) return;

    // Animate floating container and add listener
    var transtionEvent = whichTransitionEvent();
    transtionEvent && floatingUnit.addEventListener(transtionEvent, floatTransitionComplete, false);

    addClass(floatingUnit, 'clicked');
    addClass(document.getElementsByClassName('floating-bg')[0], 'clicked');

    if(document.querySelector('.str-adunit.content-ad')) {
        floatingUnit.style.top = "0px";
    } else {
        floatingUnit.style.top = "10%";
    }

    // Start Video Play
    iframe = document.getElementsByClassName('adsnative-video-iframe');
    if(iframe.length) iframe[0].contentWindow.postMessage('adsnative.mrc50.view:in', 'http://api.adsnative.com');
}

function floatTransitionComplete() {
    var floatingUnit = document.getElementById('floating-ad-container');
    if(!hasClass(floatingUnit.querySelector('#content-container'), 'clicked')) {
        addClass(floatingUnit.querySelector('#content-container'), 'clicked');
    }
    var transtionEvent = whichTransitionEvent();
    transtionEvent && floatingUnit.removeEventListener(transtionEvent, floatTransitionComplete, false);
}

function adClosed(e) {
    e.stopPropagation();
    var floatingUnit = document.getElementById('floating-ad-container');
    if(hasClass(floatingUnit, 'animate')) console.log('Has animate class');
    overlapFloatingContainer(document.getElementsByClassName('str-adunit')[0]);

    removeClass(floatingUnit, 'clicked');
    removeClass(document.querySelector('.floating-bg'), 'clicked');
    removeClass(floatingUnit.querySelector('#content-container'), 'clicked');
}

function overlapFloatingContainer(adUnit, callback) {
    var floatingUnit = document.getElementById('floating-ad-container');
    if(!floatingUnit) return;

    floatingUnit.style.top = adUnit.getBoundingClientRect().top;
    floatingUnit.style.left = adUnit.getBoundingClientRect().left;

    console.log('Overlapped at Top : ', floatingUnit.style.top, 'Left : ', floatingUnit.style.left);

    // Put positioning back in callstack
    if(callback) {
        setTimeout(function() {
            callback();
        }, 1);
    }
}

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}
