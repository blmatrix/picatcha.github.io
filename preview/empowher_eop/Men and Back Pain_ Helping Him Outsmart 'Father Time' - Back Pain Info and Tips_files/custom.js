// Copyright (c) 2014 Admotion

/**
* Initializes the ad.
**/
$(document).on('adm_initializeAd', function(){
	setButtonHandlers();
	start();
})

function setButtonHandlers(){
	$('.adButton').click(function () {
			HTMLCreative.clickThrough();
	});
}

$(document).on('adm_resize', function(){
	reDraw();
});

function reDraw(){
	
}

function start()
{
	
	
	setTimeout(function() {
		
		$('#copy1').addClass('slideOut');
		
		
	}, 2000);
	
	
	setTimeout(function() {
		
		
		$('#copy2').removeClass('hide').addClass('show');
		$('#copy2').addClass('slideIn');
		
	}, 2500);
	
	
	
	setTimeout(function() {
		$('#copy2').addClass('slideOut');
		
		
		
	}, 7000);
	
	setTimeout(function() {
		$('#copy3').addClass('slideIn');
		$('#copy2').removeClass('show').addClass('hide');
		$('#copy3').removeClass('hide').addClass('show');
		
		
	}, 7500);
	
	setTimeout(function() {
		
		$('#join').removeClass('hide').addClass('show');
		
	}, 9500);
	
	
	
	
		
	
	
	
}
