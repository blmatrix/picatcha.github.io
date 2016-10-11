// position : in-feed / right-rail
// floatType : lead-gen / content-ad
function initAdUnit(position, floatType) {
    if(!position || !floatType) return;

    var el = (position === 'in-feed') ? 'main-column' : 'right-column',
        floatingItems = document.getElementsByClassName(el)[0].querySelector('.floating-items'),
        adUnit = document.getElementsByClassName(el)[0].querySelector('.str-adunit');

    addClass(floatingItems, position);
    addClass(floatingItems, floatType);
    addClass(adUnit, position);
    addClass(adUnit, floatType);

    // CTA Text
    addCTAText(position, floatType);

    if(floatingItems) parent = floatingItems.parentNode;
    if (!parent || floatType === 'install' || floatType === 'video') { return; }
    parent.removeChild(floatingItems);
    document.body.appendChild(floatingItems);

    // Add iframe based on floatType
    var sourceUrl = null;
    addiFrameContent(position, floatType, sourceUrl);

    if(floatType === 'content-ad') updateShareURLs(position);

    adUnit.onclick = function(e) {
        e.stopPropagation();
        userClicked = true;

        // Only for Content and Leadgen Ads
        var position = (hasClass(e.currentTarget, 'in-feed')) ? 'in-feed' : 'right-rail',
            floatingItems = document.querySelector('.floating-items.' + position),
            adUnit = document.querySelector('.str-adunit.' + position);

        if(hasClass(floatingItems, 'animate')) removeClass(floatingItems, 'animate');
        overlapFloatingContainer(adUnit, floatingItems, showFloatingContainer);
    }

    if(document.getElementsByClassName('str-ico-close').length) {
        document.getElementsByClassName('str-ico-close')[0].onclick = adClosed;
    }
    if(document.getElementsByClassName('floating-bg').length) {
        document.getElementsByClassName('floating-bg')[0].onclick = adClosed;
    }
}

function floatTransitionComplete() {
    var floatingUnit = document.getElementById('floating-ad-container');
    if(!hasClass(floatingUnit.querySelector('#content-container'), 'view')) {
        addClass(floatingUnit.querySelector('#content-container'), 'view');
    }
    var transtionEvent = whichTransitionEvent();
    transtionEvent && floatingUnit.removeEventListener(transtionEvent, floatTransitionComplete, false);
}

// TD
function adClosed(e) {
    e.stopPropagation();
    var floatingUnit = document.getElementById('floating-ad-container');
    overlapFloatingContainer(document.getElementsByClassName('str-adunit')[0], document.getElementsByClassName('floating-items')[0]);
    removeClass(floatingUnit.querySelector('#content-container'), 'view');
    removeClass(document.getElementsByClassName('floating-items')[0], 'clicked');
}

// TD
function overlapFloatingContainer(adUnit, floatingItems, callback) {
    var floatingUnit = floatingItems.querySelector('#floating-ad-container');
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

function showFloatingContainer() {
    if(!userClicked) return;
    userClicked = false;

    var floatingItems = document.querySelector('.floating-items');//document.getElementById('floating-ad-container');
    if(hasClass(floatingItems, 'install')) return;

    // Add animation to floating container
    if(!hasClass(floatingItems, 'animate')) {
        addClass(floatingItems, 'animate');
    }

    // Increase height for Content Ad
    if(hasClass(floatingItems, 'content-ad')) floatingItems.style.height = $('.str-adunit').height() + 'px';
    if(hasClass(floatingItems, 'clicked')) return;

    // Animate floating container and add listener
    var transtionEvent = whichTransitionEvent();
    transtionEvent && floatingItems.addEventListener(transtionEvent, floatTransitionComplete, false);

    addClass(floatingItems, 'clicked');

    // Start Video Play
    iframe = document.getElementsByClassName('adsnative-video-iframe');
    if(iframe.length) iframe[0].contentWindow.postMessage('adsnative.mrc50.view:in', 'http://api.adsnative.com');
}

function addCTAText(position, floatType) {
    var ctaButton = document.querySelector('.' + position + ' .cta-cutton-container .cta-button');

    if(!ctaButton) return;

    if(floatType === 'content-ad') {
        ctaButton.innerHTML = 'Read More';
    } else if(floatType === 'lead-gen') {
        ctaButton.innerHTML = 'Sign Up';
    } else if(floatType === 'install') {
        ctaButton.innerHTML = 'Use App';
    } else if(floatType === 'video') {
        ctaButton.innerHTML = 'Learn More';
    }
}

function addiFrameContent(position, floatType, sourceUrl) {
    var ifrm = document.createElement("iframe"),
        floatingUnit = document.querySelector('.' + position + ' #floating-ad-container');

    ifrm.setAttribute("src", sourceUrl);
    ifrm.id = "content-container";
    ifrm.style.width = "100%";
    ifrm.style.height = "100%";

    if(floatType === 'content-ad') {
        ifrm.src = "http://www.dogonews.com/2016/10/5/whales-mourn-their-loved-ones-just-like-you-and-me";
        floatingUnit.querySelector('.str-embed-wrapper').appendChild(ifrm);
    } else if(floatType === 'lead-gen') {
        ifrm.src = "http://docs.adsnative.com/preview/edmodo/lead_gen_iframe.html";
        floatingUnit.appendChild(ifrm);
    }
}

function updateShareURLs(position) {
    // FB : http://www.facebook.com/sharer.php?u={{post_url(a=false)}}
    // TW : https://twitter.com/intent/tweet?text={{creative_title(a=false)}};url={{post_url(a=false)}}
    // EM : mailto:?subject={{creative_title(a=false)}};body={{creative_summary(a=false)}}
    var floatingUnit = document.querySelector('.floating-items.' + position),
        adUnit = document.querySelector('.str-adunit.' + position);
    if(!hasClass(floatingUnit, 'content-ad')) return;

    var fb = floatingUnit.querySelector('.str-footer .str-facebook-share'),
        tw = floatingUnit.querySelector('.str-footer .str-twitter-share'),
        em = floatingUnit.querySelector('.str-footer .str-email-share');

    // Get values
    var title, summary, clickUrl,
        linkElem = adUnit.querySelector('.an-title .adsnative-icon-external-link');
    if(linkElem) adUnit.querySelector('.an-title').removeChild(linkElem);

    title = adUnit.querySelector('.an-title').innerHTML;
    summary = adUnit.querySelector('.an-description').innerHTML;
    clickUrl = floatingUnit.querySelector('.cta-cutton-container .cta-button').href;

    // Set Values
    fb.href = 'http://www.facebook.com/sharer.php?u=' + encodeURI(clickUrl);
    tw.href = 'https://twitter.com/intent/tweet?text=' + encodeURI(title) + '&url=' + encodeURI(clickUrl);
    em.href = 'mailto:?subject=' + encodeURI(title) + '&body=' + encodeURI(summary);
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

function whichTransitionEvent() {
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
