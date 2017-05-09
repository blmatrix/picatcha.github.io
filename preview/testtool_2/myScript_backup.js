var stories = $('.contentTilesElement');
var slide_counter = 1;
var global_client_name = "";

//Bringing the relevant slides on clicking the right side button 
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
//End of Bringing the relevant slides on clicking the right side button 

$('#viant').click(function(){
    $(this).css("background-color", "#9BBE78");
    $('.viant').css("background", "linear-gradient(#9BBE78, #37A7B9)");
});

$('#edmodo').click(function(){
    console.log('Entering Edmodo color change');
    $(this).css("background-color", "rgb(242, 185, 81)");
    $('.edmodo').css("background", "linear-gradient(rgb(242, 185, 81), rgb(233, 103, 70))");
});


$('#disqus').click(function(){
    $(this).css("background-color", "rgb(211, 103, 121)");
    $('.disqus').css("background", "linear-gradient(rgb(211, 103, 121), rgb(55, 59, 125))");
});


$('#axios').click(function(){
    $(this).css("background-color", "rgb(59, 208, 220)");
    $('.axios').css("background", "linear-gradient(rgb(59, 208, 220), rgb(55, 90, 119))");
});


$('#newsmax').click(function(){
    $(this).css("background-color", "#fad0c4");
    $('.newsmax').css("background", "linear-gradient(#fad0c4 0%, #fad0c4 1%, #ffd1ff 100%)");
});

$('#advancenative').click(function(){
    $(this).css("background-color", "#ff8177");
    $('.advancenative').css("background", "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)");
});


$('#viber').click(function(){
    $(this).css("background-color", "#9BBE78");
    $('.viber').css("background", "linear-gradient(#9BBE78, #37A7B9)");
});

$('#pocket').click(function(){
    $(this).css("background-color", "#fad0c4");
    $('.pocket').css("background", "linear-gradient(#fad0c4 0%, #fad0c4 1%, #ffd1ff 100%)");
});


$('#politico').click(function(){
    $(this).css("background-color", "rgb(59, 208, 220)");
    $('.politico').css("background", "linear-gradient(rgb(59, 208, 220), rgb(55, 90, 119))");
});


$('#medium').click(function(){
    $(this).css("background-color", "rgb(242, 185, 81)");
    $('.medium').css("background", "linear-gradient(rgb(242, 185, 81), rgb(233, 103, 70))");
});


$('#nuzzel').click(function(){
    $(this).css("background-color", "#ff8177");
    $('.nuzzel').css("background", "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)");
});


$('#cafemedia').click(function(){
    $(this).css("background-color", "rgb(211, 103, 121)");
    $('.cafemedia').css("background", "linear-gradient(rgb(211, 103, 121), rgb(55, 59, 125))");
});

//End of Background change functino 


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


