(function(AnAxios) {

    var integration_version = 5.5,
        topInfeedPlacement = null,
        bottomInfeedPlacement = null,
        widgetContainerCount = 0,
        lazyLoadingContainers = null,
        featuredPostsCount = 0, topStoryCount = 0, topicAlertExists = 0, socialStoryCount = 0,
        featuredPostContainer = null, topStoryContainer = null, topicAlertContainer = null, socialPostContainer = null,
        newsletterName = null,
        channelName = null,
        placementId = null,
        forceCampaignId = null, forceCreativeId = null,
        processedStories = null,
        currentAllStories = null,
        firstAdPosition = null,
        adRepeatFrequency = null,
        currentAdIndex = -1,
        mainContainer = document.querySelector('.content__main'),
        processQueue = {
            peerStoryItems: [],
            placements: []
        },
        adContainerPrefix = 'ad-container-',
        debug = false,
        sequentialStory = {
            'previous_campaign': null,
            'next_creative': null,
            'requested': false
        };

    // AJAX loading new 10 stories
    window.addEventListener('loaded-more-posts' , function(e) {
        Axlog('loaded-more-posts Event fired. Populating new ads at frequency ' + adRepeatFrequency);
        window.AnAxios.initAdUnits();
    });

    // Public Methods
    AnAxios.initAdUnits = function() {
        if(currentAllStories) {
            Axlog('Previous story count on page : ' + (currentAllStories) ? currentAllStories.length : 0 + ' . Current story count after ajax loaded-more-posts event : ' + document.querySelectorAll('.content__main .axios-post').length);
        }
        
        currentAllStories = document.querySelectorAll('.content__main .axios-post');

        newsletterName = getNewsletterName();
        if(newsletterName) {
            Axlog('Rendering email-web placements');
            setTimeout(function() {
                renderWebEmailAd(3, newsletterName);
            }, 1500);
        } else {

            if(processedStories === null) {
                channelName = getChannelName();
                Axlog('Rendering web placements on ' + channelName + ' Channel');

                switch(channelName) {
                    case 'top-stories':
                        placementId = "dqbpjCQilAeKkaWaOs8hiMSzkFPMZ5sHYrJZlBjS";
                        break;
                    case 'technology':
                        placementId = "ogEn-wxjnlx6EOFDwTWiF9ftaHHzn7RMQ3FldamU";
                        break;
                    case 'politics':
                        placementId = "8s0xMKz8FuXuP6SdKsowrs88GuyzEOpLPm8Refm2";
                        break;
                    case 'business':
                        placementId = "VcTu2azGAQ7OZZ0vm2p2RiUbQWSrPqjC7UIFuZ6B";
                        break;
                    case 'health-care':
                        placementId = "RwrWRlt2YQfmPPTrHr0VM1J4ipsmIgCZdeQTeskq";
                        break;
                    case 'smarter-faster':
                        placementId = "EczO2h52F16zcAn7z9KsZ9U4XbLC4JsF8LNHOiGL";
                        break;
                    case 'science':
                        placementId = "U9KQpzqncogdYh8uEiJueQPiNZM4LihB8PDlkynW";
                        break;
                    default:
                        placementId = "dqbpjCQilAeKkaWaOs8hiMSzkFPMZ5sHYrJZlBjS";
                        Axlog('ERROR : valid channel name not found');
                        break;
                }
                if(!placementId) return;

                processQueue.placements.push(new AdsNative(placementId, []));
                processQueue.peerStoryItems.push(currentAllStories[0]);
            } else {

                // Loop and process story items based on repeat frequency
                if(processedStories < currentAllStories.length - adRepeatFrequency) {
                    // Suffient stories left unprocessed to insert an AD at adRepeatFrequency
                    Axlog('Ad insertion loop starts : processedStories = ' + processedStories + ' | currentAllStories = ' + currentAllStories.length);

                    // Example : firstAdPosition : 3 : repeatFrequency : 4 : currentAllStories : 12
                    for(var i = processedStories + 1; i < currentAllStories.length; i++) {
                        // first the repeat frequency story item and use it as peerStory for insertBefore
                        if((i - (firstAdPosition - 1)) % adRepeatFrequency === 0 && (i - (firstAdPosition - 1)) !== 0) {
                            processQueue.peerStoryItems.push(currentAllStories[i]);

                            // Dedicated 5 placements for axios 'smarter-faster' channel
                            if(channelName === 'smarter-faster') {
                                switch(processQueue.placements.length) {
                                    case 1:
                                        placementId = 'SXOP-Xqy-DpzoyB2OqTldemI9QEesT6E8KLkvUai';
                                        Axlog('smarter-faster #2 Infeed placement initiated : ' + placementId);
                                        break;
                                    case 2:
                                        placementId = 'Jm5eGRzGZxWGsHGUGutnTyA0Te6y_VJ6rOWeizTI';
                                        Axlog('smarter-faster #3 Infeed placement initiated : ' + placementId);
                                        break;
                                    case 3:
                                        placementId = 'opxKTzqqL6YUxG8sR5dplX9f9nDx_gb-o5fDnGHF';
                                        Axlog('smarter-faster #4 Infeed placement initiated : ' + placementId);
                                        break;
                                    // case 4:
                                    //     placementId = '27U12JCxfVolMDRImz_Svri_U87lCBbVPpuNoWKQ';
                                    //     Axlog('smarter-faster #5 Infeed placement initiated : ' + placementId);
                                    //     break;
                                    default:
                                        placementId = 'EczO2h52F16zcAn7z9KsZ9U4XbLC4JsF8LNHOiGL';
                                        Axlog('smarter-faster #'+ processQueue.placements.length +' Infeed placement loaded. Defaulted to #1 : ' + placementId);
                                        break;
                                }
                            }
                            processQueue.placements.push(new AdsNative(placementId, []));

                            // Move processed pointer
                            processedStories = i;
                            Axlog("Adding peer story to insertBefore @ index : " + i + " | processedStories : " + processedStories + " | processQueue : " + processQueue.peerStoryItems.length, currentAllStories[i]);
                        }
                    }
                    
                }
            }
            
            // Handle first/next
            processNextPlacement();
        }
    }

    function processNextPlacement() {
        Axlog('processNextPlacement invoked')
        if((processQueue.peerStoryItems.length - 1) > currentAdIndex) {
            currentAdIndex++;
            Axlog('Found peerStory in queue, inserting ad container & fetching ad for currentAdIndex : ' + currentAdIndex);
            fetchWebAdNew(processQueue.placements[currentAdIndex], processQueue.peerStoryItems[currentAdIndex]);
        }
    }

    function fetchWebAdNew(placement, peerStory) {

        // Fetch Ad for placement at current index
        (function(adIndex, peerStory, placementObj) {

            // Force ad creative : First placement in feed
            var fetchOptions = {};
            if(!currentAdIndex) {
                // Check if user clicked a ad shared on social feed and came back to axios
                forceCampaignId = getParameterByName('c_id', document.location.href);
                forceCreativeId = getParameterByName('cr_id', document.location.href);
                if(forceCampaignId && forceCreativeId) {
                    fetchOptions.cid = parseInt(forceCampaignId);
                    fetchOptions.crid = parseInt(forceCreativeId);
                }
            }

            // Sequential Story telling : Log States
            // START SEQUENCE : cid and crid were null, found next_creative first time
            // NEXT SEQUENCE : cid and crid were not null, found next_creative in sequence
            // REQUEST SEQUENCE : requesting polymorph for next sequencial creative if cid and crid are not null and requested=false
            if(sequentialStory.previous_campaign && sequentialStory.next_creative && !sequentialStory.requested) {
                fetchOptions.cid = parseInt(sequentialStory.previous_campaign);
                fetchOptions.crid = parseInt(sequentialStory.next_creative);

                Axlog('Sequential story telling : REQUEST SEQUENCE with previous campaign ID : ' + sequentialStory.previous_campaign + ' current creative ID : ' + sequentialStory.next_creative);

                // Reset sequence
                sequentialStory.requested = true;
            }

            Axlog('Placement ID : before fetch : ' + adIndex);
            placementObj.fetchAd(function(adReturned, adData) {
                if (adReturned) {
                    Axlog('Placement ID : after fetch : ' + adIndex);
                    // Get the custom fields from first ad placement and reuse for others.
                    if(!adIndex) {
                        if(!adData.customFields) {
                            adData = (placementObj.callbackData && placementObj.callbackData.networks) ? placementObj.callbackData.networks[0] : null;
                        }

                        if(typeof adData.customFields.first_ad_pos !== 'undefined') firstAdPosition = parseInt(adData.customFields.first_ad_pos);
                        if(typeof adData.customFields.repeat_frequency !== 'undefined') adRepeatFrequency = parseInt(adData.customFields.repeat_frequency);
                        if(typeof firstAdPosition === 'undefined') firstAdPosition = 3;
                    }

                    // Render containers for adsnative placements
                    renderWebAdContainer(adIndex, peerStory, function(adContainer, adContainerRendered) {
                        if(adContainerRendered) {
                            var didDisplay = placementObj.displayAd(adContainer.id);
                            if (!didDisplay) {
                                Axlog('Ad could not be displayed. Most likely due to invalid element ID or double rendering of ad.');
                            } else {
                                // Break title into title+imageCaption
                                var adSlots = document.querySelectorAll('.promotedSlot');
                                adContainer = adSlots[adSlots.length-1];
                                addClass(adContainer, adContainerPrefix + adIndex);
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

                                    // Hide Sponsored logo, prefix and brand name when "Brand Name" is "house"/"House"
                                    var sponsoredContainer = adContainer.querySelector('.author-avatar');
                                    if(sponsoredContainer) {
                                        var sponsoredText = sponsoredContainer.querySelector('.author-avatar__name');
                                        if(sponsoredText) {
                                            var sponsoredTextVal = sponsoredText.innerHTML.toLowerCase();
                                            if(sponsoredTextVal && sponsoredTextVal.match(" house$")) {
                                                // Hide the container
                                                sponsoredContainer.style.display = 'none';
                                                Axlog('Removing brand name and logo for content promotion on site. Placement index : ' + adIndex);
                                            }
                                            if(sponsoredTextVal && sponsoredTextVal.match(" axios$")) {
                                                // Remove 'Sponsored By' prefix and add just "Axios"
                                                sponsoredText.innerHTML = "Axios";
                                            }
                                        }
                                    }

                                    updateSocialLinks(adData, adContainer);
                                }

                                // Ad should not be clickable, prevent render js from taking over the ad click
                                blockRenderJSClick(adContainer);
                            }

                            // If first ad placement, then use the adFrequency value fetched 
                            // from custom fields and add the next placements to queue
                            if(adIndex === 0) {
                                window.AnAxios.initAdUnits();
                            } else {
                                processNextPlacement();
                            }
                        }
                    });

                }
            }, fetchOptions);

        })(currentAdIndex, peerStory, placement);

        Axlog('Placement ID : fetch start : ' + currentAdIndex);
    }

    // Render the DIV container at the right position for placement to be rendered.
    function renderWebAdContainer(placementIndex, peerStory, callback) {
        var adContainer = document.createElement('div'),
            adContainerRendered = false;

        adContainer.id = adContainerPrefix + placementIndex;

        // Determine Top ad container position 
        if(!placementIndex) {
            pos = firstAdPosition;

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

            // If user clicked on a Ad shared on social feed,
            // the same ad will be rendered at the top of the Axios feed
            if(forceCampaignId && forceCreativeId) {
                firstAdPosition = pos = 1;
            }

            // Consider the story slots above First ad as processed.
            processedStories = pos - 1;

            if(!adContainerRendered) {;
                // User reached the site via a "specific story" link
                // Example : https://www.axios.com/david-shulkin-easily-confirmed-as-va-secretary-2259554681.html
                var specificStory = document.querySelectorAll('.content__main > .axios-post');
                if(specificStory && specificStory.length === 1) {
                    pos -= 1;
                }
            }

            // "Top ad will in the position after the first two editorial stories irrespective of the channel"
            // Featured post is always at Top of the main container
            if(!adContainerRendered && featuredPostsCount) {;
                if(pos > 1 && pos - featuredPostsCount >= 1) {
                    pos = pos - featuredPostsCount;
                } else {
                    pos -= 1;
                    // Insert @ pos in featured container
                    var featuredAd = featuredPostContainer.querySelectorAll('.axios-post')[pos];
                    featuredAd.parentNode.insertBefore(adContainer, featuredAd);
                    adContainerRendered = true;;
                    Axlog('Rendered first ad in featured container. Featured posts = ' + featuredPostsCount);
                }
            }
            if(!adContainerRendered && socialStoryCount) {;
                if(pos > 1 && pos - socialStoryCount >= 1) {
                    pos -= socialStoryCount;
                } else {
                    // Insert @ pos in social story container
                    var socialAd = socialPostContainer.querySelectorAll('.axios-post')[pos];
                    socialAd.parentNode.insertBefore(adContainer, socialAd);
                    adContainerRendered = true;;
                    Axlog('Rendered first ad in social container. Social posts = ' + socialStoryCount);
                }
            }
            if(!adContainerRendered && topStoryCount) {;
                if(pos > 1 && pos - topStoryCount >= 1) {
                    pos -= topStoryCount;
                } else {
                    pos -= 1
                    // Insert @ pos in top story container
                    var topStory = topStoryContainer.querySelectorAll('.axios-post')[pos];
                    topStory.parentNode.insertBefore(adContainer, topStory);
                    adContainerRendered = true;;
                    Axlog('Rendered first ad in top story container. Top stories = ' + topStoryCount);
                }
            }

            if(!adContainerRendered) {
                pos = firstAdPosition;
                pos -= 1;
                peerStory = currentAllStories[pos];
                peerStory.parentNode.insertBefore(adContainer, peerStory);
                adContainerRendered = true;
            }
        } else {
            // non-first ad placements
            if(peerStory) {
                peerStory.parentNode.insertBefore(adContainer, peerStory);
                adContainerRendered = true;
            }
        }

        callback(adContainer, adContainerRendered);
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

    // Social Sharing workflow
    // Adops adds [CID] & [CRID] macros in destination URL
    // js fetches those values from ad response
    // Updates social links with 'c_id' and 'cr_id' and share to social feed
    // If user clicks on social feed story, detect 'c_id' & 'cr_id' in url
    // Pass those values to JS API to fetch the exact same campaign/creative to be rendered
    // Change the top Ad (First Ad) position to 1 in the feed
    function updateSocialLinks(adData, adUnit) {
        var actionTrackingUrls = (adData.actionTrackingUrls) ? adData.actionTrackingUrls : null;
        if(!actionTrackingUrls || !adUnit) return;

        var title, summary, clickUrl, cid, crid;

        linkElem = adUnit.querySelector('.widget__headline .adsnative-icon-external-link');
        if(linkElem) adUnit.querySelector('.widget__headline').removeChild(linkElem);

        title = adUnit.querySelector('.widget__headline').innerHTML.trim();
        summary = adUnit.querySelector('.widget__summary').innerHTML.trim();
        clickUrl = adUnit.querySelector('.click-link').href;
        clickUrl = getParameterByName('url', clickUrl);

        if(clickUrl) {
            // Bucket users to campaign specific audience segment
            var campaignAudienceSegment = getParameterByName('c_audience_segment', clickUrl);
            if(campaignAudienceSegment) {
                Axlog('Received : c_audience_segment = ' + campaignAudienceSegment);
                dropANSegmentPixel(campaignAudienceSegment);
            }

            cid = getParameterByName('cid', clickUrl);
            crid = getParameterByName('crid', clickUrl);

            var ctaTextField = adUnit.querySelector('.cta-text a');
                sequence = 'NEXT SEQUENCE';
                if(sequentialStory.previous_campaign === null && sequentialStory.next_creative === null) {
                    sequence = 'START SEQUENCE'
                }
            if(cid && ctaTextField && ctaTextField.innerHTML !== "Install Now") { // Campaign V1 : Sequential Story Telling
                var ctaTextField = ctaTextField.innerHTML.split('=');
                if(ctaTextField.length > 1) {
                    sequentialStory.previous_campaign = cid;
                    sequentialStory.next_creative = ctaTextField[1];
                    sequentialStory.requested = false;
                    Axlog('V1 Sequential story telling : '+ sequence +' with current campaign ID : ' + sequentialStory.previous_campaign + ' next creative ID : ' + sequentialStory.next_creative);
                }
            } else if(cid && adData.customFields && adData.customFields.next_creative) { // Campaign V2 : Sequential Story Telling
                sequentialStory.previous_campaign = cid;
                sequentialStory.next_creative = adData.customFields.next_creative;
                sequentialStory.requested = false;
                Axlog('V2 Sequential story telling : '+ sequence +' with current campaign ID : ' + sequentialStory.previous_campaign + ' next creative ID : ' + sequentialStory.next_creative);
            } else {
                // Reset sequence since no next_creative flag found
                sequentialStory.previous_campaign = null;
                sequentialStory.next_creative = null;
                sequentialStory.requested = false;
            }

            if(cid && crid) {
                var baseUrl = (window.location.href) ? window.location.href.split('?')[0] : 'https://www.axios.com/'
                clickUrl = baseUrl + '?c_id=' + cid + '&cr_id=' + crid;
            }
        }

        var fb = adUnit.querySelector('.share-fb'),
            tw = adUnit.querySelector('.share-tw'),
            linkedIn = adUnit.querySelector('.share-linkedin'),
            copyClip = adUnit.querySelector('.share-link');

        // Set Values
        if(fb) fb.href += encodeURIComponent(clickUrl);
        if(tw) tw.href += encodeURIComponent(clickUrl) + '&text=' + encodeURI(title);
        if(linkedIn) linkedIn.href += encodeURIComponent(clickUrl);
        if(copyClip) copyClip.setAttribute('data-clipboard-text', clickUrl);

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
        trackCustomAction(copyClip, actionTrackingUrls.copy_clipboard[0], function() {
            Axlog('copy_clipboard custom action tracked');
        });
    }

    function trackCustomAction(element, actionPixel, callback) {
        if(element) {
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
        if(channelName) return channelName;

        var url = document.querySelector('meta[property="og:url"]').content,
            urlParts = url.split('/');

        if(urlParts.length > 3 && urlParts[3] !== "" && urlParts[3].indexOf('html') < 0) {
            return urlParts[3].toLowerCase();
        } else {
            return 'top-stories';
        }
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
        if (debug && typeof console !== 'undefined') {
            if (!value) {
                console.log(msg);
            } else {
                console.log(msg, value);
            }
        }
    };

    function dropANSegmentPixel(segmentToken) {
        if (undefined != typeof segmentToken && segmentToken) {
            var pxl = document.createElement('img');
            pxl.src = "https://pdb.adsnative.com/seg.gif?segment_token=" + segmentToken;
            pxl.width = pxl.height = 0;
            document.body.appendChild(pxl);
            Axlog('Dropped audience pixel for segment : ' + segmentToken);
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

    if (getParameterByName('adsnative_debug', document.referrer)) {
        debug = true;
        Axlog('Loaded an-axios.js version : ', integration_version);
    }


}(window.AnAxios = window.AnAxios || {}));
