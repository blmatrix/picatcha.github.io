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
    // Reset the previous client stage to translateX = 0
    updateTranslateX(0);

    // Reset the slide_counter to 1 if client is changed
    slide_counter = 1;

    $('.publisher-tile').removeClass('active');
    $(this).addClass('active');

    // Show Stage 
    publisherName = $(this).attr('id');
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
});

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
