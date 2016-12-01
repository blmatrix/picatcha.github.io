(function( AnEdmodo ) {
    // Public Methods
    AnEdmodo.initFloatingAd = function(postData) {
        var adUnit = null;
        if(postData.adUnitConfig.position === 'in-feed') {
            adUnit = document.querySelector('.main-column .stream-item.str-adunit');
        } else {
            adUnit = document.querySelector('.right-column .stream-item.str-adunit');
        }
        // Add position & floatType classes to parent iframe container 
        addClass(adUnit, postData.adUnitConfig.floatType);
        addClass(adUnit, postData.adUnitConfig.position);
        var tempFloatingContainer = document.createElement('div');
        tempFloatingContainer.className = 'floating-container';
        adUnit.appendChild(tempFloatingContainer);
        adUnit.querySelector('.floating-container').innerHTML = postData.adElement;

        floatingItems = adUnit.querySelector('.floating-items.' + postData.adUnitConfig.position)
        if(floatingItems) parent = floatingItems.parentNode;
        if (!parent) return;
        parent.removeChild(floatingItems);
        document.body.appendChild(floatingItems);
        // Programmatically move floating container to end of body to takeover page
        addCustomCreativeContent(postData.adUnitConfig);
    }

    AnEdmodo.userClickedFloatingAd = function(postData) {
        var floatingItems = document.querySelector('.floating-items.' + postData.adPosition),
            adUnit = document.querySelector('.str-adunit.' + postData.adPosition);

        if(hasClass(floatingItems, 'animate')) removeClass(floatingItems, 'animate');
        overlapFloatingContainer(adUnit, postData.adPosition, showFloatingContainer);
    }

    // Private Methods
    function addCustomCreativeContent(adUnitConfig) {
        if(adUnitConfig.floatType != 'content-ad' && adUnitConfig.floatType != 'lead-gen') return;

        var ifrm = document.createElement("iframe"),
            floatingUnit = document.querySelector('.' + adUnitConfig.position + ' #floating-ad-container'),
            floatingItems = document.querySelector('.floating-items.' + adUnitConfig.position);

        ifrm.setAttribute("src", "");
        ifrm.id = "content-container";
        ifrm.style.width = "100%";
        ifrm.style.height = "100%";

        if(adUnitConfig.floatType === 'content-ad' && adUnitConfig.contentUrl) {
            // Example : "http://www.dogonews.com/2016/10/5/whales-mourn-their-loved-ones-just-like-you-and-me"
            ifrm.src = adUnitConfig.contentUrl;
            floatingUnit.querySelector('.str-embed-wrapper').appendChild(ifrm);

            updateShareURLs(adUnitConfig);
        } else if(adUnitConfig.floatType === 'lead-gen' && adUnitConfig.leadGenUrl) {
            // Example : "http://docs.adsnative.com/preview/edmodo/lead-gen_iframe.html"
            ifrm.src = adUnitConfig.leadGenUrl;
            floatingUnit.appendChild(ifrm);
        }

        closeButton = floatingItems.querySelector('.str-ico-close'),
        background = floatingItems.querySelector('.floating-bg');

        if(closeButton) {
            closeButton.addEventListener("click", function(e) {
                adClosed(e, adUnitConfig.position);
            });
        }
        if(background) {
            background.addEventListener("click", function(e) {
                adClosed(e, adUnitConfig.position);
            });
        }
    }

    function updateShareURLs(adUnitConfig) {
        // FB : http://www.facebook.com/sharer.php?u={{post_url(a=false)}}
        // TW : https://twitter.com/intent/tweet?text={{creative_title(a=false)}};url={{post_url(a=false)}}
        // EM : mailto:?subject={{creative_title(a=false)}};body={{creative_summary(a=false)}}
        var floatingUnit = document.querySelector('.floating-items.' + adUnitConfig.position),
            adUnit = document.querySelector('.str-adunit.' + adUnitConfig.position);
        if(!hasClass(floatingUnit, 'content-ad')) return;
        if(!hasClass(floatingUnit, 'in-feed')) return;

        var fb = floatingUnit.querySelector('.str-footer .str-facebook-share'),
            tw = floatingUnit.querySelector('.str-footer .str-twitter-share'),
            em = floatingUnit.querySelector('.str-footer .str-email-share');

        // Get values
        var clickUrl = floatingUnit.querySelector('.str-footer .adsnative-cta-button').href;
        clickUrl = getParameterByName('url', clickUrl);

        // Set Values
        if(adUnitConfig.title && adUnitConfig.summary && clickUrl) {
            fb.href = 'http://www.facebook.com/sharer.php?u=' + encodeURI(clickUrl);
            tw.href = 'https://twitter.com/intent/tweet?url=' + encodeURI(clickUrl);
            em.href = 'mailto:?subject=' + encodeURI(adUnitConfig.title) + '&body=' + encodeURI(adUnitConfig.summary) + ". Read More : " + clickUrl;
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
        var floatingItems = document.querySelector('.floating-items.' + position),
            floatingUnit = floatingItems.querySelector('#floating-ad-container');

        overlapFloatingContainer(document.querySelector('.str-adunit.' + position), position);
        removeClass(floatingUnit.querySelector('#content-container'), 'view');
        removeClass(floatingItems, 'clicked');
    }

    function hideUserFeedback() {
        dropdownContainers = document.getElementsByClassName('js-dropdown');
        for(i=0; i<dropdownContainers.length; i++) {
            removeClass(dropdownContainers[i], 'is-open');
        }
    }

    // TD
    function overlapFloatingContainer(adUnit, position, callback) {
        var floatingItems = document.querySelector('.floating-items.' + position),
            floatingUnit = floatingItems.querySelector('#floating-ad-container');

        floatingUnit.style.top = adUnit.getBoundingClientRect().top;
        floatingUnit.style.left = adUnit.getBoundingClientRect().left;

        // Put positioning back in callstack
        if(callback) {
            setTimeout(function() {
                callback(position);
            }, 1);
        }
    }

    function showFloatingContainer(position) {
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

    function getParameterByName(name, url) {
        if (!url) {
          url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}( window.AnEdmodo = window.AnEdmodo || {} ));