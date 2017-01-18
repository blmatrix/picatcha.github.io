(function(AnAxios) {

    var integration_version = 0.4,
        topInfeedPlacement = null,
        bottomInfeedPlacement = null;

    // Public Methods
    AnAxios.initAdUnits = function() {
        var inFeedPlacement = null,
            lastWidgetContainer = getLastWidgetContainer();
        
        if (lastWidgetContainer && !lastWidgetContainer.querySelector('.promotedSlot')) {
            // Render both 3rd and 7th position placements
            if (!topInfeedPlacement) {
                topInfeedPlacement = new AdsNative("nsK-n33LeWIYxlqAM7XF344sx76i8mN4Ui_dGZGl", []);
            }
            if (!bottomInfeedPlacement) {
                bottomInfeedPlacement = new AdsNative("KGwjVBXKNqqXQFF4DtfHliBxJ6kaXoDi80AP8ZM8", []);
            }

            fetchAd('top', topInfeedPlacement, lazyLoadingContainers.length);
            fetchAd('bottom', bottomInfeedPlacement, lazyLoadingContainers.length);
        }
    }

    // AJAX loading new 10 stories
    window.addEventListener('loaded-more-posts' , function(e) {
        Axlog('loaded-more-posts Event fired. Requesting new set of inFeed Ads.');
        window.AnAxios.initAdUnits();
    });

    function getLastWidgetContainer() {
        lazyLoadingContainers = document.querySelectorAll('div[data-format="posts-main"]');
        lastWidgetContainer = lazyLoadingContainers[lazyLoadingContainers.length - 1];

        return lastWidgetContainer;
    }

    function fetchAd(position, placement, lazyLoadCount) {
        placement.fetchAd(function(adReturned, adData) {
            if (adReturned) {

                // Render containers for adsnative placements
                var latestStories = lastWidgetContainer.querySelectorAll('.widget'),
                    pos = parseInt(adData.customFields.pos) - 2,
                    topStory = latestStories[pos],
                    adContainer = document.createElement('div');

                adContainer.id = 'top-ad-container-' + lazyLoadCount;
                topStory.parentNode.insertBefore(adContainer, topStory.nextSibling);
                var didDisplay = placement.displayAd('top-ad-container-' + lazyLoadCount);
                if (!didDisplay) {
                    Axlog('Ad could not be displayed. Most likely due to invalid element ID or double rendering of ad.');
                } else {
                    // Break title into title+imageCaption
                    adContainer = document.querySelector('.promotedSlot.' + position);
                    if(adContainer) {
                        var titleContainer = adContainer.querySelector('.widget__headline');
                        if(titleContainer) {
                            var title = titleContainer.innerHTML.split('|');
                            if(title.length) {
                                titleContainer.innerHTML = title[0].trim();
                            }
                            if(title.length > 1) {
                                var imageCaption = adContainer.querySelector('.widget__photo-credit p');
                                if(imageCaption) {
                                    imageCaption.innerHTML = title[1];
                                    // Remove AN external link element
                                    var linkElem = imageCaption.querySelector('.adsnative-icon-external-link');
                                    if(linkElem) imageCaption.removeChild(linkElem);

                                    Axlog('Processed '+position+' Adunit image caption : ', imageCaption.innerHTML);
                                }
                            }
                        }
                    }

                    // Ad should not be clickable, prevent render js from taking over the ad click
                    promotedSlot = document.querySelector('.promotedSlot.' + position);
                    promotedSlot.onclick = function(e) {
                        e.stopPropagation();
                    }

                    // Update "link" to "href" in summary anchor tag 
                    var summary = promotedSlot.querySelector('.widget__summary');
                    summary.innerHTML = summary.innerHTML.replace("link", "href");

                    updateSocialLinks(position, (adData.actionTrackingUrls) ? adData.actionTrackingUrls : null);
                }
            }
        });
    }

    function updateSocialLinks(position, actionTrackingUrls) {
        var lastWidgetContainer = getLastWidgetContainer(),
            adUnit = lastWidgetContainer.querySelector('.promotedSlot.' + position),
            title, summary, clickUrl;

        linkElem = adUnit.querySelector('.widget__headline .adsnative-icon-external-link');
        if(linkElem) adUnit.querySelector('.widget__headline').removeChild(linkElem);

        title = adUnit.querySelector('.widget__headline').innerHTML.trim();
        summary = adUnit.querySelector('.widget__summary').innerHTML.trim();
        clickUrl = adUnit.querySelector('.click-link').href;
        clickUrl = getParameterByName('url', clickUrl);

        var fb = adUnit.querySelector('.share-fb'),
            tw = adUnit.querySelector('.share-tw'),
            linkedIn = adUnit.querySelector('.share-linkedin'),
            email = adUnit.querySelector('.share-email');

        // Set Values
        fb.href += clickUrl;
        tw.href += clickUrl + '&text=' + encodeURI(title);
        linkedIn.href += encodeURI(clickUrl)
        email.href += clickUrl + '&subject=' + encodeURI(title);

        // Track custom actions
        trackCustomAction(fb, actionTrackingUrls.facebook_share[0], function() {
            Axlog('facebook_share custom action tracked');
        });
        trackCustomAction(tw, actionTrackingUrls.twitter_share[0], function() {
            Axlog('twitter_share custom action tracked');
        });
        trackCustomAction(linkedIn, actionTrackingUrls.linkedin_share[0], function() {
            Axlog('linkedin_share custom action tracked');
        });
        trackCustomAction(email, actionTrackingUrls.email_share[0], function() {
            Axlog('email_share custom action tracked');
        });
    }

    function trackCustomAction(element, actionPixel, callback) {
        element.addEventListener("click", function(e) {
            e.stopPropagation();
            // Track custom action
            if(actionPixel) {
                var pxl = document.createElement('img');
                pxl.src = actionPixel;
                pxl.width = pxl.height = 0;
                document.body.appendChild(pxl);
                callback();
            }
        });
    }

    function getChannelName() {
        var url = document.head.querySelector("[property=og:url]").content,
            urlParts = url.split('/');

        if(urlParts.length > 3) return urlParts[3].toLowerCase();
    }

    function insertRenderJs() {
        var antag = document.createElement('script');
        antag.type = 'text/javascript';

        if (window.location.protocol != "https:") {
            antag.src = 'http://static.adsnative.com/static/js/render.v1.js';
        } else {
            antag.src = 'https://static.adsnative.com/static/js/render.v1.js';
        }

        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(antag, node);

        Axlog('RenderJS invoked');
    };

    function Axlog(msg, value) {
        if (typeof console !== 'undefined') {
            if (!value) {
                console.log(msg);
            } else {
                console.log(msg, value);
            }
        }
    };

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
    };

    if (getParameterByName('axios_preview', document.referrer)) {
        debug = true;
        edLog('Loaded an-axios.js version : ', integration_version);
    }

}(window.AnAxios = window.AnAxios || {}));
