(function(AnAxios) {

    var integration_version = 3.0,
        topInfeedPlacement = null,
        bottomInfeedPlacement = null,
        widgetContainerCount = 0,
        lazyLoadingContainers = null,
        lastWidgetContainer = null,
        featuredPostsCount = 0, topStoryCount = 0, topicAlertExists = 0, socialStoryCount = 0,
        featuredPostContainer = null, topStoryContainer = null, topicAlertContainer = null, socialPostContainer = null,
        newsletterName = null,
        forceCampaignId = null, forceCreativeId = null;

    // Public Methods
    AnAxios.initAdUnits = function() {
        newsletterName = getNewsletterName();
        if(newsletterName) {
            Axlog('Rendering email-web placements');
            setTimeout(function() {
                renderWebEmailAd(3, newsletterName);
            }, 1500);
        } else {
            Axlog('Rendering web placements');

            var inFeedPlacement = null;

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
        var fetchOptions = {};
        if(position === 'top' && lazyLoadCount <= 3) {
            // Check if user clicked a ad shared on social feed and came back to axios
            forceCampaignId = getParameterByName('c_id', document.location.href);
            forceCreativeId = getParameterByName('cr_id', document.location.href);
            if(forceCampaignId && forceCreativeId) {
                fetchOptions.cid = parseInt(forceCampaignId);
                fetchOptions.crid = parseInt(forceCreativeId);
            }
        }
        placement.fetchAd(function(adReturned, adData) {
            if (adReturned) {

                // Render containers for adsnative placements
                var pos = parseInt(adData.customFields.pos),
                    topStory = null,
                    adContainer = document.createElement('div'),
                    mainContainer = document.querySelector('.content__main'),
                    adRendered = false;

                if(typeof pos === 'undefined') pos = 3;

                adContainer.id = position + '-ad-container-' + lazyLoadCount;
                if(position === 'top' && lazyLoadCount <= 3) {
                    updateFirstAdPosition();

                    // If user clicked on a Ad shared on social feed, 
                    // the same ad will be rendered at the top of the Axios feed
                    if(forceCampaignId && forceCreativeId) {
                        pos = 1;
                    }

                    // "Top ad will in the position after the first two editorial stories irrespective of the channel"
                    // Featured post is always at Top of the main container
                    if(!adRendered && featuredPostsCount) {
                        if(pos > 1 && pos - featuredPostsCount >= 1) {
                            pos = pos - featuredPostsCount;
                        } else {
                            pos -= 1;
                            // Insert @ pos in featured container
                            var featuredAd = featuredPostContainer.querySelectorAll('.axios-post')[pos];
                            featuredAd.parentNode.insertBefore(adContainer, featuredAd);
                            adRendered = true;
                            Axlog('Rendered first ad in featured container. Featured posts = ' + featuredPostsCount);
                        }
                    }
                    if(!adRendered && socialStoryCount) {
                        if(pos > 1 && pos - socialStoryCount >= 1) {
                            pos -= socialStoryCount;
                        } else {
                            // Insert @ pos in social story container
                            var socialAd = socialPostContainer.querySelectorAll('.axios-post')[pos];
                            socialAd.parentNode.insertBefore(adContainer, socialAd);
                            adRendered = true;
                            Axlog('Rendered first ad in social container. Social posts = ' + socialStoryCount);
                        }
                    }
                    if(!adRendered && topStoryCount) {
                        if(pos > 1 && pos - topStoryCount >= 1) {
                            pos -= topStoryCount;
                        } else {
                            pos -= 1
                            // Insert @ pos in top story container
                            var topStory = topStoryContainer.querySelectorAll('.axios-post')[pos];
                            topStory.parentNode.insertBefore(adContainer, topStory);
                            adRendered = true;
                            Axlog('Rendered first ad in top story container. Top stories = ' + topStoryCount);
                        }
                    }
                }

                if(!adRendered) {
                    if(position === 'top') {
                        pos -= 1;
                    } else if(position === 'bottom') {
                        // Account for top ad 'widget' if already rendered
                        var topAd = lastWidgetContainer.querySelector('.promotedSlot.top.' + 'index'+lazyLoadCount);
                        if(!topAd) {
                            pos -= 1;
                        }
                    }

                    var latestStories = lastWidgetContainer.querySelectorAll('.axios-post');
                    topStory = latestStories[pos];
                    topStory.parentNode.insertBefore(adContainer, topStory);
                    adRendered = true;
                }

                var didDisplay = placement.displayAd(adContainer.id);
                if (!didDisplay) {
                    Axlog('Ad could not be displayed. Most likely due to invalid element ID or double rendering of ad.');
                } else {
                    // Break title into title+imageCaption
                    lastWidgetContainer = getLastWidgetContainer();
                    adContainer = lastWidgetContainer.querySelector('.promotedSlot.' + position);
                    if(!adContainer) adContainer = document.querySelector('.promotedSlot.' + position);
                    addClass(adContainer, 'index'+lazyLoadCount);
                    if(adContainer) {
                        titleContainer = adContainer.querySelector('.widget__headline');
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

                        updateSocialLinks((adData.actionTrackingUrls) ? adData.actionTrackingUrls : null, adContainer);
                    }

                    // Ad should not be clickable, prevent render js from taking over the ad click
                    blockRenderJSClick(adContainer);
                }
            }
        }, fetchOptions);
    }

    function renderWebEmailAd(posIndex, newsletterName) {
        Axlog("Rendering "+newsletterName+" web placement at position : "+posIndex);

        // Newsletter top : QP7qU259EMD8fQJMZjD-tZ9npIQH6xf5tW6umnLq
        // Newsletter bottom : c8NKzyrmahVnalrdA6S8Iy9kZGs7G1r5qrCiS5iH
        var placementId = null, emailAdSibling = null,
        placementId = (posIndex < 5) ? 'QP7qU259EMD8fQJMZjD-tZ9npIQH6xf5tW6umnLq' : 'c8NKzyrmahVnalrdA6S8Iy9kZGs7G1r5qrCiS5iH';
        var adContainer = document.createElement('div');
        adContainer.id = placementId;

        if(posIndex > 5) {
            emailAdSibling = document.querySelector('.widget__body .body');
            emailAdSibling.appendChild(adContainer);
            Axlog("Adcontainer added for "+posIndex+" position");
        } else {
            rebelFeedItems = document.querySelectorAll('.widget__body .rebellt-item');
            if(rebelFeedItems.length && rebelFeedItems[posIndex-1]) {
                rebelFeedItems[posIndex-1].parentNode.insertBefore(adContainer, rebelFeedItems[posIndex-1]);
                Axlog("Adcontainer added for "+posIndex+" position");
            }
        }

        kvPairs = {};
        kvPairs["ck_newsletter_name"] = newsletterName;
        window._AdsNativeOpts = {
            adUnits: [{
                apiKey: placementId,
                keyValues: kvPairs,
                cssPath: '#'+placementId+':append',
                callback: function(status, adData) {
                    Axlog("Ad callback received for "+posIndex+" position");
                    if(posIndex < 5) {
                        // Render bottom email after top
                        renderWebEmailAd(7, newsletterName);
                        blockRenderJSClick(document.querySelector('.promotedSlot.top'));
                    } else {
                        blockRenderJSClick(document.querySelector('.promotedSlot.bottom'));
                    }
                }
            }],
            blockAdLoad: false
        };
        insertRenderJs();
    }

    function updateFirstAdPosition() {
        var mainContainer = document.querySelector('.content__main');

        if(mainContainer) {
            postsContainers = mainContainer.querySelectorAll('.posts-main.posts-main-section');
            if(postsContainers.length <= 3) {

                // Check for featured post
                featuredPostContainer = mainContainer.querySelector('div[data-source^="frontpage_featured"]');
                if(featuredPostContainer && featuredPostContainer.querySelector('.axios-post')) {
                    featuredPostsCount = featuredPostContainer.querySelectorAll('.axios-post').length;
                }

                // Check for social post
                var socialPostContainer = mainContainer.querySelector('#article-content');
                if(socialPostContainer && socialPostContainer.querySelector('.axios-post')) {
                    socialStoryCount = socialPostContainer.querySelectorAll('.axios-post').length;
                }

                // Check for top story post
                var topStoryContainerIndex = (socialStoryCount) ? 0 : 1;
                topStoryContainer = postsContainers[topStoryContainerIndex];
                if(topStoryContainer) {
                    var topStories = topStoryContainer.querySelectorAll('.axios-post');
                    if(topStories.length === 1) {
                        topStoryCount = 1;
                    }
                }

                // Check for topic-alert post
                var topicAlertContainer = mainContainer.querySelector('.topic-alert');
                if(topicAlertContainer && topicAlertContainer.innerHTML !== '') {
                    topicAlertExists = true;
                }
            }
        }
    }

    // Social Sharing workflow
    // Adops adds [CID] & [CRID] macros in destination URL
    // js fetches those values from ad response
    // Updates social links with 'c_id' and 'cr_id' and share to social feed
    // If user clicks on social feed story, detect 'c_id' & 'cr_id' in url
    // Pass those values to JS API to fetch the exact same campaign/creative to be rendered
    // Change the top Ad (First Ad) position to 1 in the feed
    function updateSocialLinks(actionTrackingUrls, adUnit) {
        var lastWidgetContainer = getLastWidgetContainer(),
            title, summary, clickUrl, cid, crid;

        linkElem = adUnit.querySelector('.widget__headline .adsnative-icon-external-link');
        if(linkElem) adUnit.querySelector('.widget__headline').removeChild(linkElem);

        title = adUnit.querySelector('.widget__headline').innerHTML.trim();
        summary = adUnit.querySelector('.widget__summary').innerHTML.trim();
        clickUrl = adUnit.querySelector('.click-link').href;
        clickUrl = getParameterByName('url', clickUrl);

        if(clickUrl) {
            cid = getParameterByName('cid', clickUrl);
            crid = getParameterByName('crid', clickUrl);

            if(cid && crid) {
                var baseUrl = (window.location.href) ? window.location.href.split('?')[0] : 'https://www.axios.com/'
                clickUrl = baseUrl + '?c_id=' + cid + '&cr_id=' + crid;
            }
        }

        var fb = adUnit.querySelector('.share-fb'),
            tw = adUnit.querySelector('.share-tw'),
            linkedIn = adUnit.querySelector('.share-linkedin');

        // Set Values
        fb.href += encodeURIComponent(clickUrl);
        tw.href += encodeURIComponent(clickUrl) + '&text=' + encodeURI(title);
        linkedIn.href += encodeURIComponent(clickUrl)

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
        if(!selectorElement) return;

        selectorElement.onclick = function(e) {
            e = e || window.event; // cross-browser event

            if (e.stopPropagation) {
                // W3C standard variant
                e.stopPropagation();
            } else {
                // IE variant
                e.cancelBubble = true;
            }
        }

        // Web infeed / web newsletter placements
        // Update "link" to "href" in summary 
        selectorElement.innerHTML = selectorElement.innerHTML.replace('link=""', 'href=""');
        selectorElement.innerHTML = selectorElement.innerHTML.replace('ad-url', 'href=""');
        var clickThroughUrl = selectorElement.querySelector('.an-click-through');
            anchorLinks = selectorElement.querySelectorAll('.adLink');
        if(clickThroughUrl && anchorLinks.length) {
            clickThroughUrl = clickThroughUrl.innerHTML;
            anchorLinks.forEach(updateClickURL);
            function updateClickURL(item, index) {
                if(typeof item.href !== 'undefined') {
                    // Add link to the href element
                    item.href = clickThroughUrl;
                    Axlog('Updated hyperlink in summary');
                }
            }
        }

        // Clean up empty image space
        var imageContainer = selectorElement.querySelector('.rm-shortcode');
        if(!imageContainer) imageContainer = selectorElement.querySelector('.widget__image-container');
        if(imageContainer) {
            var webImageContainer;
            if (!imageContainer.style.backgroundImage) {
                webImageContainer = imageContainer.querySelector('.widget__image');
            }

            var mediaURL = (imageContainer.style.backgroundImage) ? imageContainer.style.backgroundImage : webImageContainer.style.backgroundImage;
            mediaURL = mediaURL.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            mediaURLParts = mediaURL.split('/');
            if(mediaURLParts.length > 4) {
                if(mediaURLParts[4] === '') {
                    imageContainer.style.display = "none";
                    Axlog('No image creative present, collapsing container');
                }
            }
        }
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
    };

    if (getParameterByName('axios_preview', document.referrer)) {
        debug = true;
        Axlog('Loaded an-axios.js version : ', integration_version);
    }

}(window.AnAxios = window.AnAxios || {}));
