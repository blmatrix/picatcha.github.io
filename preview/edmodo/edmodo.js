(function( AnEdmodo ) {
    // position : in-feed / right-rail
    // floatType : lead-gen / content-ad
    var integration_version = 1.03,
        parentDomain = document.referrer.split('/'),
        debug = false,
        iabResized = false;

    if(parentDomain.length > 2) {
        parentDomain = parentDomain[0] + '//' + parentDomain[2];
    } else {
        parentDomain = null;
    }

    // Public Methods
    AnEdmodo.initAdUnit = function(adPosition, adData) {
        edLog('Init '+ adPosition +' ad unit');

        var adUnitConfig = {};
        adUnitConfig.position = adPosition;
        adUnitConfig.adData = adData;
        if(adData.type === "story") {
            if(adData.customFields && adData.customFields.contentUrl) {
                adUnitConfig.floatType = 'content-ad';
                adUnitConfig.contentUrl = adData.customFields.contentUrl;
            } else {
                adUnitConfig.floatType = 'click-out';    
            }
        } else if(adData.type === "lead_gen" && adData.leadGenUrl) {
            adUnitConfig.floatType = 'lead-gen';
            adUnitConfig.leadGenUrl = adData.leadGenUrl;
        } else if(adData.type === "video") {
        adUnitConfig.floatType = 'video';
        } else if(adData.type === "app_install") {
            adUnitConfig.floatType = 'click-out';
        } else if(typeof adData.type === 'undefined' || !adData.type) {
            adUnitConfig.floatType = 'iab-ad';
        }

        edLog('Loading '+adUnitConfig.floatType+' @ '+adUnitConfig.position+' position');
        loadAdUnit(adUnitConfig);
    };

    AnEdmodo.resizeIABContainer = function(position, width, height) {
        iabResized = true;
        edLog('Resize IAB container request received for '+position+' : ' + width + ' X ' + height);
        if(!width && !height) {
            // No Ad returned (0x0) : Hide the ad container
            var adUnit = document.querySelector('.str-adunit');
            if(adUnit) {
                hideAd(adUnit, position);
            }
        } else {
            // For in-feed : Check if screen is in mobile, to add additional height due to vertical aligned design
            var extraAdjustedHeight = 40;
            if (top !== self && position === 'in-feed') {
                var frameWidth = 1000000;
                if( typeof(window.innerWidth ) == 'number') {
                    //Non-IE
                    frameWidth = window.innerWidth;
                } else if(document.documentElement && document.documentElement.clientWidth) {
                    //IE 6+ in 'standards compliant mode'
                    frameWidth = document.documentElement.clientWidth;
                }

                // @media all and (max-width: 554px)
                if(frameWidth <= 554) {
                    extraAdjustedHeight = 90;
                }
            } else if(position.indexOf('logout') >=0) {
                extraAdjustedHeight = 80;
            }

            // Ad returned of widthxheight dimension
            if(position) {
                // Resize
                var adResizePayload = {
                    action: "ads-native:ad-height",
                    adPosition: position
                };
                if(width) adResizePayload.adWidth = width + 40;
                if(height) adResizePayload.adHeight = height + extraAdjustedHeight + 20;

                edLog('sending postmessage with '+position+' AD height payload', adResizePayload);
                parent.postMessage(adResizePayload, parentDomain);
            }
        }
    }

    //Private Methods
    function loadAdUnit(adUnitConfig) {
        edLog('AdConfig object : ', adUnitConfig);

        if(!adUnitConfig.position || !adUnitConfig.floatType) return;

        setTimeout(function() {
            // If IAB ad resize function is invoked, do not auto resize based on timer.
            if (iabResized) return;

            // Send ad height to parent page
            var actualAdHeight = document.querySelector('.str-adunit');
            if(actualAdHeight) actualAdHeight = actualAdHeight.clientHeight;

            var adHeightPayload = {
                action: "ads-native:ad-height",
                adHeight: actualAdHeight + 15,
                adPosition: adUnitConfig.position
            }
            edLog('sending postmessage with AD height payload', adHeightPayload);
            parent.postMessage(adHeightPayload, parentDomain);
        }, 2000);

        var position = adUnitConfig.position,
            floatType = adUnitConfig.floatType,
            columnContainer = null;

        switch(position) {
            case 'in-feed':
                columnContainerClass = 'main-column';
                break;
            case 'right-rail':
                columnContainerClass = 'right-column';
                break;
            case 'logout-top':
            case 'logout-left':
            case 'logout-right':
                columnContainerClass = 'landing-page-container'
                break;
            default:
                columnContainerClass = 'main-column';
        }
        if(columnContainerClass) {
            columnContainer = document.querySelector('.' + columnContainerClass);
        }

        if(!columnContainer) {
            edLog('Proper column container not present in DOM');
            return;
        }

        floatingItems = columnContainer.querySelector('.floating-items'),
        adUnit = columnContainer.querySelector('.str-adunit');
        
        if(floatingItems) {
            addClass(floatingItems, position);
            addClass(floatingItems, floatType);
            // POST : Clone the floating items + styling
            tempDOMContainer = document.createElement('div');
            tempDOMContainer.appendChild(floatingItems);
            floatingItemsString = tempDOMContainer.innerHTML;
            tempDOMContainer.innerHTML = null;
            styleNode = document.head.lastChild.cloneNode(true)
            tempDOMContainer.appendChild(styleNode)
            floatingItemsString += tempDOMContainer.innerHTML;
        }
        if(adUnit) {
            addClass(adUnit, position);
            addClass(adUnit, floatType);
        }

        // Send the DOM string to parent page
        if(adUnitConfig.floatType === 'content-ad' || adUnitConfig.floatType === 'lead-gen') {
            if(parent && parent.postMessage) {
                if(floatType === 'content-ad') {
                    var adTitle = adUnit.querySelector('.an-title');
                    linkElem = adTitle.querySelector('.adsnative-icon-external-link');
                    if(linkElem) adTitle.removeChild(linkElem);
                    adUnitConfig.title = adTitle.innerHTML.trim();
                    adUnitConfig.summary = adUnit.querySelector('.an-description').innerHTML.trim();
                }

                var floatingDOMPayload = {
                    action: "ads-native:init-floating-ad",
                    adElement: floatingItemsString,
                    adUnitConfig: adUnitConfig
                }


                edLog('sending postmessage with floating DOM payload', floatingDOMPayload);
                parent.postMessage(floatingDOMPayload, parentDomain);
            }
        }

        // User feedback interaction
        adUnit.querySelector('.c-button').addEventListener("click", function(e) {
            edLog('User clicked dropdown icon @ ', position);
            e.stopPropagation();
            var dropdownContainer = e.currentTarget.parentNode;
            if(hasClass(dropdownContainer, 'is-open'))
                removeClass(dropdownContainer, 'is-open');
            else
                addClass(dropdownContainer, 'is-open');
        });

        var hideAdOption = adUnit.querySelector('.user_fb__item.hide_ad');
        if(hideAdOption) {
            hideAdOption.addEventListener("click", function(e) {
                e.stopPropagation();
                edLog('User clicked Hide Ad option');
                
                hideAd(adUnit, adUnitConfig.position);
            });
        }

        // Clicking on "Why am I seeing this" should redirect to edmodo custom page.
        var whyAdOption = adUnit.querySelector('.user_fb__item.why_ad');
        if(whyAdOption) {
            whyAdOption.addEventListener("click", function(e) {
                edLog('User clicked "Why am I seeing this ?" option');
                e.stopPropagation();
                hideUserFeedback();
            });
        }
        
        document.addEventListener("click", function(e) {
            var dropdownContainer = e.currentTarget.parentNode;
            if(dropdownContainer === null || !hasClass(dropdownContainer, 'js-dropdown')) {
                hideUserFeedback();
            }
        });

        // CTA Text
        addCTAText(position, floatType);

        // Clicking anywhere on click-out should be handled by renderjs by default
        if (floatType === 'click-out' || floatType === 'iab-ad') return;

        // Clicking on video ad should be conditionally handled by renderjs/edmodojs
        if(floatType === 'video') { 

            // Take over render js click through
            adUnit.onclick = function(e) {
                // Brand Name : Let render js redirect to clickthrough URL
                if(hasClass(e.target, 'messageinfo1') || hasClass(e.target, 'cta-button')) return;
                // Feedback dropdown
                if((e.target.parentNode && hasClass(e.target.parentNode, 'user_fb__list')) || (e.target.parentNode.parentNode && hasClass(e.target.parentNode.parentNode, 'user_fb__list'))) return;
                e.stopPropagation();
            }

            return; 
        }

        adUnit.onclick = function(e) {
            // Brand Name
            if(hasClass(e.target, 'messageinfo1')) return;
            // Feedback dropdown
            if((e.target.parentNode && hasClass(e.target.parentNode, 'user_fb__list')) || (e.target.parentNode.parentNode && hasClass(e.target.parentNode.parentNode, 'user_fb__list'))) return;
            e.stopPropagation();

            userClicked = true;

            // Only for Content and Leadgen Ads
            var position = (hasClass(e.currentTarget, 'in-feed')) ? 'in-feed' : 'right-rail';

            edLog('User clicked on ad @ ', position);

            // POST : Align floating container with infeed ad
            if(parent && parent.postMessage) {
                var clickedAdPayload = {
                    action: "ads-native:user-clicked-floating-ad",
                    adPosition: position
                }
                edLog('sending postmessage with user clicked payload', clickedAdPayload);
                parent.postMessage(clickedAdPayload, parentDomain);
            }
        }
    }

    function hideAd(adUnit, position) {
        adUnit.style.display = "none";

        // POST : Notify edmodo about hide ad
        if(parent && parent.postMessage) {
            var hideAdPayload = {
                action: "ads-native:hide",
                adPosition: position
            }
            edLog('sending postmessage with hide ad payload', hideAdPayload);
            parent.postMessage(hideAdPayload, parentDomain);
        }

        // Track custom action
        var adData = adUnitConfig.adData;
        if(adData && adData.actionTrackingUrls && adData.actionTrackingUrls.hide_ad) {
            var pxl = document.createElement('img');
            pxl.src = adData.actionTrackingUrls.hide_ad[0];
            pxl.width = pxl.height = 0;
            document.body.appendChild(pxl);
        }
    }

    function hideUserFeedback() {
        dropdownContainers = document.getElementsByClassName('js-dropdown');
        for(i=0; i<dropdownContainers.length; i++) {
            removeClass(dropdownContainers[i], 'is-open');
        }
    }

    function addCTAText(position, floatType) {
        var ctaButton = document.querySelector('.' + position + ' .cta-button-container .cta-button'),
            ctaHiddenText = document.querySelector('.' + position + ' .cta-button-container .hidden-cta-text a');

        if(!ctaButton) return;

        if(ctaHiddenText && ctaHiddenText.innerHTML) {
            ctaHiddenText = ctaHiddenText.innerHTML;
        }

        // Use campaign forced CTA text if avialable (other than "Install Now")
        // "Install Now" is default value returned by AN if no value
        if(ctaHiddenText !== 'Install Now') {
            ctaButton.innerHTML = ctaHiddenText;
        } else if(floatType === 'content-ad') {
            ctaButton.innerHTML = 'Read More';
        } else if(floatType === 'lead-gen') {
            ctaButton.innerHTML = 'Sign Up';
        } else if(floatType === 'click-out') {
            ctaButton.innerHTML = 'Use App';
        } else if(floatType === 'video') {
            ctaButton.innerHTML = 'Learn More';
        } else if(ctaHiddenText === 'Install_Now') {
            ctaButton.innerHTML = 'Install Now';
        }

        edLog('Added CTA text "'+ ctaButton.innerHTML+ '"');
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

    function edLog(msg, obj) {
        if(typeof obj === 'undefined') obj = '';

        if(console && console.log && debug) {
            console.log('Edmodo AN JS : '+ msg, obj);
        }
    }

    if(getParameterByName('edmodo_preview', document.referrer)) {
        debug = true;
        edLog('Loaded an-edmodo.js version : ', integration_version);
    }

}( window.AnEdmodo = window.AnEdmodo || {} ));
