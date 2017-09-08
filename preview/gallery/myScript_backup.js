var stories = $('.contentTilesElement'),
    slide_counter = 1,
    publisherName = "",
    slideContainer = null,
    slideCount = 0,
    translateX = 0;

//End of Bringing the relevant slides on clicking the right side button 

$('#polymorph').click(function() {
    $('.an-layout-stage').removeClass('active');
    $('.an-layout-stage.onload').addClass('active');
});

// Add background color for publisher tiles when clicked
// Display associated stage on the left
$('.publisher-tile').click(function() {
    publisherClicked($(this).attr('id'), this);
});

function publisherClicked(pubName, that) {
    // Reset the previous client stage to translateX = 0
    updateTranslateX(0);

    // Reset the slide_counter to 1 if client is changed
    slide_counter = 1;

    $('.publisher-tile').removeClass('active');
    $(that).addClass('active');

    // Active Publisher
    publisherName = pubName;

    // Hide the prev/next buttons when there is only one slide
    var slides = $(".an-layout-stage." + publisherName + " .slide")
    if(slides.length === 1) {
        $(".an-layout-stage." + publisherName + ' .prev-next-button').hide();
    }
    
    // Add iFrames before showing stage
    frameUrls = iframe_mapping['clients'][publisherName];
    for(var i = 0; i < frameUrls.length; i++) {

        if(i == 0) {
            addIframe(frameUrls[i], publisherName, i);
        } else {
            setTimeout(function(frameUrls, publisherName, i) {
                addIframe(frameUrls[i], publisherName, i);
            }.bind(that, frameUrls, publisherName, i), 3000);
        }
    }

    // Show Stage 
    $('.an-layout-stage').removeClass('active');
    $('.an-layout-stage.' + publisherName).addClass('active');

    // Set stage and slide width dynamically based on slide count
    slideContainer = $('.slide-container.' + publisherName);
    var slides = $('.slide-container.' + publisherName + ' .slide');
    slideCount = slides.length;

    console.log('New Client : CurrentSlide : ' + slide_counter + ' & total SlideCount : ' + slideCount);

    slideContainer.css('width', 100 * slideCount + '%');
    slides.css('width', 100 / slideCount + '%');

    // Get current translate X value
    translateX = getTranslateXValue(slideContainer);

    console.log('New Client : transition X = ' + translateX);
}

// Slider navigation - START
$('.prev-next-button').on('click', function(e) {
    // Check if "prev" / "next" was clicked
    if ($(this).hasClass('next')) {
        if (slide_counter < slideCount) {
            // Next was clicked : Translate ahead by one item
            translateX = parseInt(translateX) - (100 / slideCount); // tranlateX = translateX - 33.33;
            translateX = translateX + '%'; // translateX = translateX + '%';

            updateTranslateX(translateX);

            slide_counter = slide_counter + 1;
            console.log(slide_counter);
        } // CSS Translate only if current slide_counter is less than total # of slides
    } else {
        if (slide_counter > 1) {
            // Previous was clicked : Translate backwards by one item
            translateX = parseInt(translateX) + (100 / slideCount);
            translateX = translateX + '%';

            updateTranslateX(translateX);

            slide_counter = slide_counter - 1;
            console.log(slide_counter);
        } // CSS Translate only if current slide_counter is > 1
    }

    console.log('NEXT|Prev : CurrentSlide : ' + slide_counter + ' & total SlideCount : ' + slideCount);
});

function updateTranslateX(translateX) {
    if(!slideContainer) return;

    slideContainer.css({
        "-webkit-transform": "translateX(" + translateX + ")",
        "-ms-transform": "translateX(" + translateX + ")",
        "transform": "translateX(" + translateX + ")",
    });
}

function getTranslateXValue(element) {
    element = element[0];
    elemTransform = element.style.transform || element.style.webkitTransform || element.style.mozTransform;
    var n = elemTransform.indexOf("(");
    var n1 = elemTransform.indexOf(",");
    if (n1 < 0) {
        n1 = elemTransform.indexOf(")");
    }
    var res = parseFloat(elemTransform.slice(n + 1, n1 - 1));

    return res;
}


// Slider navigation - END

// On Load Text Animation 
var opac = anime({
  targets: '.letter',
    opacity:1,
  scale:1, 
    easing:'easeInBounce',
    delay: function(el, index) {
      return index * 80;
    },
  // direction: 'alternate',
  // loop: true
});

setTimeout(function() {
    $('.name img').css('opacity', 1);
}, 300);



function setUserAgent(window, userAgent) {
    if (window.navigator.userAgent != userAgent) {
        var userAgentProp = { get: function () { return userAgent; } };
        try {
            Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
        } catch (e) {
            window.navigator = Object.create(navigator, {
                userAgent: userAgentProp
            });
        }
    }
}


// code for Dynamically rendering Iframe.
function addIframe(frameUrl, publisherName, index) {
    var slides = $(".an-layout-stage." + publisherName + " .slide"),
        slide = slides[index],
        iframeElements = $(".an-layout-stage." + publisherName + " .iframe-container")
        iframeElement = $(iframeElements[index]);

    deviceType = $(slide).data('device-type');

    if(!iframeElement.find('iframe').length) {
        var ifrm = document.createElement("iframe");
        ifrm.src = frameUrl;
        ifrm.scrolling = "auto";
        ifrm.frameborder = "0";
        ifrm.width = "100%";
        ifrm.height = "100%";

        // Add iframe to publisher stage -> slide if no iframe exists
        iframeElement.append(ifrm);

        if(deviceType === 'mobile' || deviceType === 'tablet') {
            setUserAgent(ifrm.contentWindow, "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1");
        } else if(deviceType === 'laptop') {
            setUserAgent(ifrm.contentWindow, "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 (?!Mobile) Safari/535.19");
        }
    }
}

// JSON Array for Iframe mapping
var iframe_mapping = { 
    "clients" :  {
        "cheetahmobile": [
        ],

        "zowdow": [
        ],

        "disqus": [
            "http://docs.adsnative.com/preview/disqus/disqus_gallery.html"
        ],

        "axios": [
            "http://docs.adsnative.com/preview/axios-video.html?adsntaive_preview=1&cid=11994&zid=Tks4hf_9zB6HCnRzoUTTpjUa7UPmn8om9jo4TtC0",
            "http://docs.adsnative.com/preview/axios-feed.html?adsntaive_preview=1&cid=11994&zid=Tks4hf_9zB6HCnRzoUTTpjUa7UPmn8om9jo4TtC0",
            "http://docs.adsnative.com/preview/axios-feed.html?adsntaive_preview=1&cid=11994&zid=Tks4hf_9zB6HCnRzoUTTpjUa7UPmn8om9jo4TtC0"
        ],

        "newsmax": [
            "http://docs.adsnative.com/preview/newsmax/newsmax_preview/leadeboard.html?adsnative_preview=1&cid=11993",
            "http://docs.adsnative.com/preview/newsmax/newsmax_preview/standard_image.html?adsnative_preview=1&cid=11994",
            "http://docs.adsnative.com/preview/newsmax/newsmax_preview/standard_text_2columns?adsnative_preview=1&cid=11993",
            "http://docs.adsnative.com/preview/newsmax/newsmax_preview/thumbnails_2columns.html?adsnative_preview=1&cid=11994",
            "http://docs.adsnative.com/preview/newsmax/newsmax_preview/sidebar.html?adsnative_preview=1&cid=11993"
        ],

        "viber": [
        ],

        "pocket": [
            "http://docs.adsnative.com/preview/pocket_gallery.html?adsnative_preview=1&cid=11994",
            "http://docs.adsnative.com/preview/pocket_gallery.html?adsnative_preview=1&cid=11994",
            "http://docs.adsnative.com/preview/pocket_gallery.html?adsnative_preview=1&cid=11994"
        ],

        "politico": [
            "http://docs.adsnative.com/preview/politico_gallery.html?adsnative_preview=1&cid=11994",
            "http://docs.adsnative.com/preview/politico_gallery.html?adsnative_preview=1&cid=11994",
            "http://docs.adsnative.com/preview/politico_gallery.html?adsnative_preview=1&cid=11994"
        ],

        "medium": [
        ],

        "nuzzel": [
            "http://native-preview.herokuapp.com/email/nuzzel_email.html",
            "http://native-preview.herokuapp.com/email/nuzzel_email.html"
        ],

        "cafemedia": [
        ],

        "scienceinc": [
        ],

    }// end of "clients"
}; // end of variable iframe_mapping
    





