function createErrorMessage(_data) {

	$.ajax({
		type : 'POST',
		url : '/_ajax/error_message.php',
		data : _data
	}).done(function(data) {

		if (_data.type != 'true' && data) {
			$('#errorMessage').html('');
			$('#errorMessage').html(data);
			$('#errorModal').modal('show');
		}

	});
}

function artifont() {
	var currentSize = $("#haberbody").css("font-size");
	currentSize = currentSize.replace('px', '');
	currentSize = (currentSize * 1) + 2;
	if (currentSize > 20)
		currentSize = 20;
	var lineh = currentSize + 5;
	$("#haberbody").css("font-size", currentSize + "px");
	$("#haberbody").css("line-height", lineh + "px");
}

function eksifont() {
	var currentSize = $("#haberbody").css("font-size");
	currentSize = currentSize.replace('px', '');
	currentSize = (currentSize * 1) - 2;
	if (currentSize < 10)
		currentSize = 10;
	$("#haberbody").css("font-size", currentSize + "px");
}


$(window).scroll(function() {
	if ($(this).scrollTop() > 100) {
		$('#topcontrol').css({
			bottom : "10px"
		});
	} else {
		$('#topcontrol').css({
			bottom : "-100px"
		});
	}
});

$('#topcontrol').click(function() {
	$('html, body').animate({
		scrollTop : '0px'
	}, 800);
	return false;
});


function loadLiveMatch() {
	$.ajax({
		type : 'GET',
		url : '/_ajax/anasayfa_canlianlatim.php',
		data : {
			live : 1,
		}
	}).done(function(data) {
		$('#canlianlatim').html('');
		if (data) {
			$('#canlianlatim').html(data);
		}
	});

}