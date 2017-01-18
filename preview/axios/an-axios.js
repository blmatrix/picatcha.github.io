(function(AnAxios) {

    var integration_version = 1.0,
        topInfeedPlacement = null,
        bottomInfeedPlacement = null,
        widgetContainerCount = 0,
        lazyLoadingContainers = null;

    // Public Methods
    AnAxios.initAdUnits = function() {
        var newsletterName = getNewsletterName();
        if(newsletterName) {
            Axlog('Rendering email-web placements');
            renderWebEmailAd(3, newsletterName);

            setTimeout(function() {
                blockRenderJSClick(document.querySelector('.promotedSlot.top'));
                blockRenderJSClick(document.querySelector('.promotedSlot.bottom'));
            }, 4000);
        } else {
            Axlog('Rendering web placements');

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

                fetchWebAd('top', topInfeedPlacement, lazyLoadingContainers.length);
                fetchWebAd('bottom', bottomInfeedPlacement, lazyLoadingContainers.length);
            }
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
        widgetContainerCount = lazyLoadingContainers.length;

        return lastWidgetContainer;
    }

    function fetchWebAd(position, placement, lazyLoadCount) {
        placement.fetchAd(function(adReturned, adData) {
            if (adReturned) {

                // Render containers for adsnative placements
                var latestStories = lastWidgetContainer.querySelectorAll('.widget'),
                    pos = parseInt(adData.customFields.pos) - 1;

                // Account for Featured container on page load
                if(widgetContainerCount <= 3 && position === 'top') {
                    debugger;
                    var featuredContainer = document.querySelector('div[data-source="frontpage_featured"]');
                    if(featuredContainer && featuredContainer.querySelector('.widget')) {
                        // On page load, there will be two containers, first with one and second with 10
                        pos -= 1;
                    }

                    // Account for top story container on page load
                    if(widgetContainerCount === 3) {
                        if(lazyLoadingContainers[1] && lazyLoadingContainers[1].querySelector('.widget')) {
                            // On page load, there will be two containers, first with one and second with 10
                            pos -= 1;
                        }
                    }
                }
                


                var topStory = latestStories[pos],
                    adContainer = document.createElement('div');

                adContainer.id = 'top-ad-container-' + lazyLoadCount;
                topStory.parentNode.insertBefore(adContainer, topStory);
                var didDisplay = placement.displayAd('top-ad-container-' + lazyLoadCount);
                if (!didDisplay) {
                    Axlog('Ad could not be displayed. Most likely due to invalid element ID or double rendering of ad.');
                } else {
                    // Break title into title+imageCaption
                    adContainer = lastWidgetContainer.querySelector('.promotedSlot.' + position);
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
                    blockRenderJSClick(lastWidgetContainer.querySelector('.promotedSlot.' + position));

                    updateSocialLinks(position, (adData.actionTrackingUrls) ? adData.actionTrackingUrls : null);
                }
            }
        });
    }

    function renderWebEmailAd(posIndex, newsletterName) {
        // Newsletter top : QP7qU259EMD8fQJMZjD-tZ9npIQH6xf5tW6umnLq
        // Newsletter bottom : c8NKzyrmahVnalrdA6S8Iy9kZGs7G1r5qrCiS5iH
        var placementId = null;
        placementId = (posIndex < 5) ? 'QP7qU259EMD8fQJMZjD-tZ9npIQH6xf5tW6umnLq' : 'c8NKzyrmahVnalrdA6S8Iy9kZGs7G1r5qrCiS5iH';

        var emailAdSibling = document.querySelector('#rebelltitem' + posIndex),
            adContainer = document.createElement('div');

        adContainer.id = placementId;
        emailAdSibling.parentNode.insertBefore(adContainer, emailAdSibling);
        debugger;
        kvPairs = {};
        kvPairs["ck_newsletter_name"] = newsletterName;
        window._AdsNativeOpts = {
            adUnits: [{
                apiKey: placementId,
                keyValues: kvPairs,
                cssPath: '#'+placementId+':append',
                callback: function(status, adData) {
                    if(posIndex < 5) {
                        // Render bottom email after top
                        renderWebEmailAd(7, newsletterName);
                    }
                }
            }],
            blockAdLoad: false
        };
        insertRenderJs();
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

    function blockRenderJSClick(selectorElement) {
        selectorElement.onclick = function(e) {
            e.stopPropagation();
        }

        // Update "link" to "href" in summary anchor tag 
        var summary = selectorElement.querySelector('.widget__summary');
        if(summary)
            summary.innerHTML = summary.innerHTML.replace("link", "href");
    }

    function getChannelName() {
        var url = document.head.querySelector("[property=og:url]").content,
            urlParts = url.split('/');

        if(urlParts.length > 3) return urlParts[3].toLowerCase();
    }

    function getNewsletterName() {
        var sectionMetas = document.head.querySelectorAll("[name='section']");

        for(i=0; i<sectionMetas.length; i++) {
            var content = sectionMetas[i].content;
            if(content.indexOf("section-axios") >= 0) {
                content = content.split('-');
                content.splice(0, 1);
                content = content.join('-');
                Axlog("Newsletter name is : " + content);
                return content;
            }
        }
        
        return null;
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
        Axlog('Loaded an-axios.js version : ', integration_version);
    }

}(window.AnAxios = window.AnAxios || {}));
