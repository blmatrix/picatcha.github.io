var stories = $('.contentTilesElement');
var slide_counter = 1;
var global_client_name = "";


stories.on("click", function(e) {
    stories.removeClass('clicked');
    $(this).addClass('clicked');

    // Get clicked story index
    var clientName = $(this).data('client'),
        clientStage = $('.an-layout-stage.' + clientName),
        allStages = $('.an-layout-stage');
console.log (clientName);
        global_client_name = clientName;
        slide_counter = 1; // Reset the slide_counter to 1 if client is changed


    if (clientStage) {
        allStages.removeClass('show');
        $(clientStage).addClass('show');
    }
});

 // Slider navigation - START
$('.prev-next-button').on('click', function(e) {
    // Get current translate X value
    var slideContainer = $('.slide-container.' + global_client_name),
        slideCount = $('.slide-container.' + global_client_name).find('.slide').length,
        translateX = getTranslateXValue(slideContainer);
        console.log ('The name of client is' + global_client_name);
console.log('SlideCount value now is' + slideCount);

    // Check if "prev" / "next" was clicked
    if ($(this).hasClass('next')) {
        // Next was clicked : Translate ahead by one item
        translateX -= (100 / slideCount ); // tranlateX = translateX - 33.33;
        translateX += '%'; // translateX = translateX + '%';

if (slide_counter<slideCount){

        slideContainer.css({
            "-webkit-transform": "translateX("+ translateX + ")",
            "-ms-transform": "translateX("+ translateX + ")",
            "transform": "translateX("+ translateX + ")",
        });
        slide_counter = slide_counter + 1;
        console.log(slide_counter);
} // CSS Translate only if current slide_counter is less than total # of slides


    } else {
        // Previous was clicked : Translate backwards by one item
        translateX += (100 / slideCount);
        translateX += '%';

if (slide_counter > 1) {

        slideContainer.css({
            "-webkit-transform": "translateX("+ translateX + ")",
            "-ms-transform": "translateX("+ translateX + ")",
            "transform": "translateX("+ translateX + ")",
        });
                slide_counter = slide_counter - 1;
                console.log(slide_counter);

    } // CSS Translate only if current slide_counter is > 1

    }
});

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


