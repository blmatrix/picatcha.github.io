var stories = $('.contentTilesElement');

stories.on("click", function(e) {
    stories.removeClass('clicked');
    $(this).addClass('clicked');

    // Get clicked story index
    var clientName = $(this).data('client'),
        clientStage = $('.an-layout-stage.' + clientName),
        allStages = $('.an-layout-stage');
    if (clientStage) {
        allStages.removeClass('show');
        $(clientStage).addClass('show');
    }
});

 // Slider navigation - START
$('.prev-next-button').on('click', function(e) {
    // Get current translate X value
    var slideContainer = $('.slide-container'),
        slideCount = $('.slide-container').find('.slide').length,
        translateX = getTranslateXValue(slideContainer);

    // Check if "prev" / "next" was clicked
    if ($(this).hasClass('next')) {
        // Next was clicked : Translate ahead by one item
        translateX -= (100 / slideCount ); // tranlateX = translateX - 33.33;
        translateX += '%'; // translateX = translateX + '%';

        slideContainer.css({
            "-webkit-transform": "translateX("+ translateX + ")",
            "-ms-transform": "translateX("+ translateX + ")",
            "transform": "translateX("+ translateX + ")",
        });



    } else {
        // Previous was clicked : Translate backwards by one item
        translateX += (100 / slideCount);
        translateX += '%';

        slideContainer.css({
            "-webkit-transform": "translateX("+ translateX + ")",
            "-ms-transform": "translateX("+ translateX + ")",
            "transform": "translateX("+ translateX + ")",
        });
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


