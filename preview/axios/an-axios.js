(function(AnAxios) {

    var integration_version = 1.7,
        topInfeedPlacement = null,
        bottomInfeedPlacement = null,
        widgetContainerCount = 0,
        lazyLoadingContainers = null,
        lastWidgetContainer = null,
        featuredPostExists = false, topStoryExists = false, topicAlertExists = false, socialStoryExists = false;

    // Public Methods
    AnAxios.initAdUnits = function() {
        var newsletterName = getNewsletterName();
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
        placement.fetchAd(function(adReturned, adData) {
            if (adReturned) {

                // Render containers for adsnative placements
                var pos = parseInt(adData.customFields.pos),
                    topStory = null,
                    adContainer = document.createElement('div'),
                    mainContainer = document.querySelector('.content__main'),
                    adRendered = false;

                adContainer.id = 'top-ad-container-' + lazyLoadCount;
                if(position === 'top' && lazyLoadCount <= 3) {
                    updateFirstAdPosition();

                    // "Top ad will in the position after the first non-featured piece irrespective of the channel"
                    if(featuredPostExists) {
                        // If featured ad exists, increase the ad position by 1
                        pos += 1;
                    }

                    // Featured post is always at Top of the main container
                    if(!adRendered && featuredPostExists) {
                        if(pos > 1) {
                            pos -= 1;
                        } else {
                            // If pos=0 OR 1, then insert in position 1 (Top of the feed)
                            var featuredContainer = mainContainer.querySelector('div[data-source^="frontpage_featured"]');
                            if(featuredContainer && featuredContainer.querySelector('.widget')) {
                                var featuredAd = featuredContainer.querySelector('.widget');
                                featuredAd.parentNode.insertBefore(adContainer, featuredAd);
                            } else {
                                featuredContainer.appendChild(adContainer);
                            }
                            adRendered = true;
                        }
                    }
                    if(!adRendered && socialStoryExists) {
                        if(pos > 1) {
                            pos -= 1;
                        } else {
                            // If pos=0 OR 1, then insert in position 1 (Top of the feed)
                            var socialPostContainer = mainContainer.querySelector('#article-content');
                            if(socialPostContainer && socialPostContainer.querySelector('.widget')) {
                                var socialAd = socialPostContainer.querySelector('.widget');
                                socialAd.parentNode.insertBefore(adContainer, socialAd);
                            } else {
                                socialPostContainer.appendChild(adContainer);
                            }
                            adRendered = true;
                        }
                    }
                    if(!adRendered && topStoryExists) {
                        if(pos > 1) {
                            pos -= 1;
                        } else {
                            // Check for top story post
                            var topStoryContainerIndex = (socialStoryExists) ? 0 : 1,
                                topStoryContainer = mainContainer.querySelectorAll('.posts-main.posts-main-section')[topStoryContainerIndex],
                                topStory = null;
                            if(topStoryContainer) topStory = topStoryContainer.querySelectorAll('.widget');
                            if(topStory.length === 1) {
                                // Top story exists, so insertBefore (prepend)
                                topStory = topStory[0];
                                topStory.parentNode.insertBefore(adContainer, topStory);
                            } else {
                                // Top story does not exist, so appendChild (append)
                                topStoryContainer.appendChild(adContainer);
                            }
                            adRendered = true;
                        }
                    }
                    // Topic alert post is always at third position of the main container
                    if(!adRendered && topicAlertExists) {
                        if(pos > 1) {
                            pos -= 1;
                        } else {
                            // Check for topic-alert post
                            var topicAlertContainer = mainContainer.querySelector('.topic-alert');
                            if(topicAlertContainer && topicAlertContainer.innerHTML !== '') {
                                // Top topic alert exists, so Insert after featured unit (previous container)
                                // var featuredContainer = mainContainer.querySelector('div[data-source^="frontpage_featured"]');
                                // featuredContainer.appendChild(adContainer);

                                // Top topic alert exists, so Insert after top story unit (previous container)
                                var topStoryContainer = mainContainer.querySelectorAll('.posts-main.posts-main-section')[1],
                                    topStory = null;
                                if(topStoryContainer) topStory = topStoryContainer.querySelectorAll('.widget');
                                if(topStory.length === 1) {
                                    // Top story exists, so insertBefore (prepend)
                                    topStoryContainer.appendChild(adContainer);
                                } else {
                                    // Top story does not exist, so appendChild (append)
                                    topStoryContainer.appendChild(adContainer);
                                }
                            } else {
                                // Top topic alert does not exist, prepend in top story container
                                // var topStoryContainer = mainContainer.querySelectorAll('.posts-main.posts-main-section')[1],
                                //     topStory = null;
                                // if(topStoryContainer) topStory = topStoryContainer.querySelectorAll('.widget');
                                // if(topStory.length === 1) {
                                //     // Top story exists, so insertBefore (prepend)
                                //     topStory = topStory[0];
                                //     topStory.parentNode.insertBefore(adContainer, topStory);
                                // } else {
                                //     // Top story does not exist, so appendChild (append)
                                //     topStoryContainer.appendChild(adContainer);
                                // }

                                var latestStories = lastWidgetContainer.querySelectorAll('.widget');
                                topStory = latestStories[0];
                                topStory.parentNode.insertBefore(adContainer, topStory);
                            }
                            adRendered = true;
                        }
                    }
                }

                if(!adRendered) {
                    if(position === 'top') {
                        pos -= 1;
                    } else if(position === 'bottom') {
                        // Account for top ad 'widget' if already rendered
                        var topAd = lastWidgetContainer.querySelector('.promotedSlot.top');
                        if(!topAd) {
                            pos -= 1;
                        }
                    }

                    var latestStories = lastWidgetContainer.querySelectorAll('.widget');
                    topStory = latestStories[pos];
                    topStory.parentNode.insertBefore(adContainer, topStory);
                    adRendered = true;
                }

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

                    updateSocialLinks(position, (adData.actionTrackingUrls) ? adData.actionTrackingUrls : null);

                    // Ad should not be clickable, prevent render js from taking over the ad click
                    blockRenderJSClick(lastWidgetContainer.querySelector('.promotedSlot.' + position));
                }
            }
        });
    }

    function renderWebEmailAd(posIndex, newsletterName) {
        // Newsletter top : QP7qU259EMD8fQJMZjD-tZ9npIQH6xf5tW6umnLq
        // Newsletter bottom : c8NKzyrmahVnalrdA6S8Iy9kZGs7G1r5qrCiS5iH
        var placementId = null, emailAdSibling = null,
        placementId = (posIndex < 5) ? 'QP7qU259EMD8fQJMZjD-tZ9npIQH6xf5tW6umnLq' : 'c8NKzyrmahVnalrdA6S8Iy9kZGs7G1r5qrCiS5iH';
        var adContainer = document.createElement('div');
        adContainer.id = placementId;

        if(posIndex > 5) {
            // emailAdSibling = document.querySelector('.post-pager')
            emailAdSibling = document.querySelector('.widget__body .body');
            emailAdSibling.appendChild(adContainer);
        } else {
            emailAdSibling = document.querySelector('#rebelltitem' + posIndex);
            emailAdSibling.parentNode.insertBefore(adContainer, emailAdSibling);
        }
        // debugger;
        
        // var footers = document.querySelectorAll('.widget__footer');



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
                var featuredContainer = mainContainer.querySelector('div[data-source^="frontpage_featured"]');
                if(featuredContainer && featuredContainer.querySelector('.widget')) {
                    featuredPostExists = true;
                }

                // Check for social post
                var socialPostContainer = mainContainer.querySelector('#article-content');
                if(socialPostContainer && socialPostContainer.querySelector('.widget')) {
                    socialStoryExists = true;
                }

                // Check for top story post
                var topStoryContainerIndex = (socialStoryExists) ? 0 : 1,
                    topStoryContainer = postsContainers[topStoryContainerIndex];
                if(topStoryContainer) topStoryContainer = topStoryContainer.querySelectorAll('.widget');
                if(topStoryContainer.length === 1) {
                    topStoryExists = true;
                }

                // Check for topic-alert post
                var topicAlertContainer = mainContainer.querySelector('.topic-alert');
                if(topicAlertContainer && topicAlertContainer.innerHTML !== '') {
                    topicAlertExists = true;
                }
            }
        }
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
        if(!selectorElement) return;

        selectorElement.onclick = function(e) {
            e.stopPropagation();
        }

        // Update "link" to "href" in summary anchor tag 
        var summary = selectorElement.querySelector('.widget__summary');
        if(summary)
            summary.innerHTML = summary.innerHTML.replace("link", "href");

        // Clean up empty image space
        var shortCode = selectorElement.querySelector('.rm-shortcode'),
            mediaURL = shortCode.style.backgroundImage.split('"');
        if(mediaURL.length > 1) {
            mediaURL = mediaURL[1].split('/');
            if(mediaURL.length > 4) {
                if(mediaURL[4] === '') {
                    shortCode.style.display = 'none';
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
