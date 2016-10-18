function initAdUnit(adPosition, adData) {
    var adUnitConfig = {};
    adUnitConfig.position = adPosition;
    if(adData.type === "story" && adData.customFields && adData.customFields.contentUrl) {
        adUnitConfig.floatType = 'content-ad';
        adUnitConfig.contentUrl = adData.customFields.contentUrl;
    } else if(adData.type === "lead_gen" && adData.leadGenUrl) {
        adUnitConfig.floatType = 'lead-gen';
        adUnitConfig.leadGenUrl = adData.leadGenUrl;
    } else if(adData.type === "video") {
        adUnitConfig.floatType = 'video';
    } else if(adData.type === "app_install") {
        adUnitConfig.floatType = 'click-out'
    }
    loadAdUnit(adUnitConfig);
}

// position : in-feed / right-rail
// floatType : lead-gen / content-ad
function loadAdUnit(adUnitConfig) {
    console.log('adConfig', adUnitConfig);
    if(!adUnitConfig.position || !adUnitConfig.floatType) return;

    var position = adUnitConfig.position,
        floatType = adUnitConfig.floatType,
        columnContainer = (position === 'in-feed') ? document.getElementsByClassName('main-column')[0] : document.getElementsByClassName('right-column')[0],
        floatingItems = columnContainer.querySelector('.floating-items'),
        adUnit = columnContainer.querySelector('.str-adunit');

    addClass(floatingItems, position);
    addClass(floatingItems, floatType);
    addClass(adUnit, position);
    addClass(adUnit, floatType);

    // User feedback interaction
    adUnit.querySelector('.c-button').addEventListener("click", function(e) {
        e.stopPropagation();
        var dropdownContainer = e.currentTarget.parentNode;
        if(hasClass(dropdownContainer, 'is-open'))
            removeClass(dropdownContainer, 'is-open');
        else
            addClass(dropdownContainer, 'is-open');
    });

    adUnit.querySelector('.user_fb__item.hide_ad').addEventListener("click", function(e) {
        e.stopPropagation();
        adUnit.style.display = "none";
    });

    document.addEventListener("click", function(e) {
        var dropdownContainer = e.currentTarget.parentNode;
        if(dropdownContainer === null || !hasClass(dropdownContainer, 'js-dropdown')) {
            dropdownContainers = document.getElementsByClassName('js-dropdown');
            for(i=0; i<dropdownContainers.length; i++) {
                removeClass(dropdownContainers[i], 'is-open');
            }
        }
    });
    
    // CTA Text
    addCTAText(position, floatType);

    if(floatingItems) parent = floatingItems.parentNode;
    if (!parent || floatType === 'click-out' || floatType === 'video') { return; }
    parent.removeChild(floatingItems);
    document.body.appendChild(floatingItems);

    // Add iframe based on floatType
    addiFrameContent(adUnitConfig);

    if(floatType === 'content-ad') updateShareURLs(position);

    adUnit.onclick = function(e) {
        if((e.target.parentNode && hasClass(e.target.parentNode, 'user_fb__list')) || (e.target.parentNode.parentNode && hasClass(e.target.parentNode.parentNode, 'user_fb__list'))) return;
        e.stopPropagation();
        userClicked = true;

        // Only for Content and Leadgen Ads
        var position = (hasClass(e.currentTarget, 'in-feed')) ? 'in-feed' : 'right-rail',
            floatingItems = document.querySelector('.floating-items.' + position),
            adUnit = document.querySelector('.str-adunit.' + position);

        if(hasClass(floatingItems, 'animate')) removeClass(floatingItems, 'animate');
        overlapFloatingContainer(adUnit, position, showFloatingContainer);
    }

    var closeButton = floatingItems.querySelector('.str-ico-close'),
        background = floatingItems.querySelector('.floating-bg');
    if(closeButton) {
        closeButton.addEventListener("click", function(e) {
            adClosed(e, position);
        });
    }
    if(background) {
        background.addEventListener("click", function(e) {
            adClosed(e, position);
        });
    }
}

function floatTransitionComplete(position) {
    var floatingUnit = document.querySelector('.floating-items.' + position + ' #floating-ad-container');
    if(!hasClass(floatingUnit.querySelector('#content-container'), 'view')) {
        addClass(floatingUnit.querySelector('#content-container'), 'view');
    }
    var transtionEvent = whichTransitionEvent();
    transtionEvent && floatingUnit.removeEventListener(transtionEvent, floatTransitionComplete, false);
}

// TD
function adClosed(e, position) {
    e.stopPropagation();
    var position = (hasClass(e.currentTarget.parentNode, 'in-feed')) ? 'in-feed' : 'right-rail',
        floatingItems = document.querySelector('.floating-items.' + position),
        floatingUnit = floatingItems.querySelector('#floating-ad-container');

    overlapFloatingContainer(document.querySelector('.str-adunit.' + position), position);
    removeClass(floatingUnit.querySelector('#content-container'), 'view');
    removeClass(floatingItems, 'clicked');
}

// TD
function overlapFloatingContainer(adUnit, position, callback) {
    var floatingItems = document.querySelector('.floating-items.' + position),
        floatingUnit = floatingItems.querySelector('#floating-ad-container');

    floatingUnit.style.top = adUnit.getBoundingClientRect().top;
    floatingUnit.style.left = adUnit.getBoundingClientRect().left;

    console.log('Overlapped at Top : ', floatingUnit.style.top, 'Left : ', floatingUnit.style.left);

    // Put positioning back in callstack
    if(callback) {
        setTimeout(function() {
            callback(position);
        }, 1);
    }
}

function showFloatingContainer(position) {
    if(!userClicked) return;
    userClicked = false;

    var floatingItems = document.querySelector('.floating-items.' + position);

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
    transtionEvent && floatingItems.addEventListener(transtionEvent, function() {
        floatTransitionComplete(position)
    }, false);

    addClass(floatingItems, 'clicked');

    // Start Video Play
    iframe = document.getElementsByClassName('adsnative-video-iframe');
    if(iframe.length) iframe[0].contentWindow.postMessage('adsnative.mrc50.view:in', 'http://api.adsnative.com');
}

function addCTAText(position, floatType) {
    var ctaButton = document.querySelector('.' + position + ' .cta-button-container .cta-button');

    if(!ctaButton) return;

    if(floatType === 'content-ad') {
        ctaButton.innerHTML = 'Read More';
    } else if(floatType === 'lead-gen') {
        ctaButton.innerHTML = 'Sign Up';
    } else if(floatType === 'click-out') {
        ctaButton.innerHTML = 'Use App';
    } else if(floatType === 'video') {
        ctaButton.innerHTML = 'Learn More';
    }
}

function addiFrameContent(adUnitConfig) {
    var ifrm = document.createElement("iframe"),
        floatingUnit = document.querySelector('.' + adUnitConfig.position + ' #floating-ad-container');

    ifrm.setAttribute("src", "");
    ifrm.id = "content-container";
    ifrm.style.width = "100%";
    ifrm.style.height = "100%";

    if(adUnitConfig.floatType === 'content-ad' && adUnitConfig.contentUrl) {
        // Example : "http://www.dogonews.com/2016/10/5/whales-mourn-their-loved-ones-just-like-you-and-me"
        ifrm.src = adUnitConfig.contentUrl;
        floatingUnit.querySelector('.str-embed-wrapper').appendChild(ifrm);
    } else if(adUnitConfig.floatType === 'lead-gen' && adUnitConfig.leadGenUrl) {
        // Example : "http://docs.adsnative.com/preview/edmodo/lead-gen_iframe.html"
        ifrm.src = adUnitConfig.leadGenUrl;
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
    if(!hasClass(floatingUnit, 'in-feed')) return;

    var fb = floatingUnit.querySelector('.str-footer .str-facebook-share'),
        tw = floatingUnit.querySelector('.str-footer .str-twitter-share'),
        em = floatingUnit.querySelector('.str-footer .str-email-share');

    // Get values
    var title, summary, clickUrl,
        linkElem = adUnit.querySelector('.an-title .adsnative-icon-external-link');
    if(linkElem) adUnit.querySelector('.an-title').removeChild(linkElem);

    title = adUnit.querySelector('.an-title').innerHTML;
    summary = adUnit.querySelector('.an-description').innerHTML;
    clickUrl = floatingUnit.querySelector('.str-footer .adsnative-cta-button').href;

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
