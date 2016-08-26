$(document).ready(function() {
	$('#lastnews .shNav').children().hover(function() {
		var _type = $(this).attr('class');
		if (_type == 'shNav-up') {
			sonhaberDownStart();
		} else if (_type == 'shNav-down') {
			sonhaberUpStart();
		}
	}, function() {
		var _type = $(this).attr('class');
		if (_type == 'shNav-up') {
			sonhaberDownStop();
		} else {
			sonhaberUpStop();
		}
	});
});

var scrollup = 0;
var scrolldown = 0;

function sonhaberUp() {
	var ptop = $('#lastnews .shList').css('top');
	ptop = parseInt(ptop.replace('px', '')) - 35;
	if (ptop < -350) {
		ptop = -350;
	}
	$('#lastnews .shList').css('top', ptop);
	if (scrollup)
		setTimeout('sonhaberUp()', 200);
}

function sonhaberDown() {
	var ptop = $('#lastnews .shList').css('top');
	var ptop = parseInt(ptop.replace('px', '')) + 35;
	if (ptop > 0) {
		ptop = 0;
	}

	$('#lastnews .shList').css('top', ptop);
	if (scrolldown)
		setTimeout('sonhaberDown()', 200);
}

function sonhaberUpStart() {
	scrollup = 1;
	sonhaberUp();
}

function sonhaberUpStop() {
	scrollup = 0;
}

function sonhaberDownStart() {
	scrolldown = 1;
	sonhaberDown();
}

function sonhaberDownStop() {
	scrolldown = 0;
}