var getDeviceVersion = function () {
    if (navigator.userAgent.match(/iPhone/i)) {
        if (navigator.userAgent.match(/(iphone).* os 9_/i)) {
            return "iOS9"
    	} else if (navigator.userAgent.match(/(iphone).* os 8_/i)) {
    		return "iOS8"
    	} else{
            return "iOS7"
        }
    }
}
var checkAndroidDevice = function(){
  var ua = navigator.userAgent.toLowerCase();
  var isAndroid = ua.indexOf("android") > -1;
  return isAndroid;
}

var titleSwiper,contentSwiper, newsSwiper;

$(document).ready(function () {
  var height = $(window).height() - 40;
  var width  = $(window).width();
  $('.main-slide, .main-slide .swiper-slide, .wrapper').height(height);
  $('.main-slide, .main-slide .swiper-slide, .wrapper').width(width);


  newsSwiper = new Swiper ('.news-slide', {
    pagination: ".news-pagination",
    paginationClickable: true
  });

  contentSwiper = new Swiper ('.main-slide', {
    centeredSlides: true,

    onSlideChangeStart: function (swiper) {
     titleSwiper.slideTo(swiper.activeIndex,150,false);
     swiper.params.allowSwipeToNext = true;
     swiper.params.allowSwipeToPrev = true;
   },
    onReachEnd: function(swiper){
      swiper.params.allowSwipeToNext = false;
    },
    onReachBeginning: function(swiper){
      swiper.params.allowSwipeToPrev = false;
    }

 });

  titleSwiper = new Swiper ('.swiper-container', {
    slidesPerView: 'auto',
    centeredSlides: true,
    slideToClickedSlide: true,
    onSlideChangeEnd: function (swiper) {
      contentSwiper.slideTo(swiper.activeIndex,150,false);
    }
  });

});


function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

Handlebars.registerHelper("showAdd", function(index_count,block) {
	if(parseInt(index_count+1)%4 === 0){
		return block.fn(this);
	}
});
