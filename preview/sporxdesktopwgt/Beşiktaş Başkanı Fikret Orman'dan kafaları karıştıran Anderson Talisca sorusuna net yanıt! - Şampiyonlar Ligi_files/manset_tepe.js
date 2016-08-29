var AktifTepeManset = 1;
var tepemansetTimerId = 0;

function tepemanset_degistir(pos) {

	if (pos == '+') {
		AktifTepeManset += 1;
		if (AktifTepeManset > 5)
			AktifTepeManset = 1;
	} else if (pos == '-') {
		AktifTepeManset -= 1;
		if (AktifTepeManset < 1)
			AktifTepeManset = 5;
	} else if (pos > 0 && pos <= 5) {
		AktifTepeManset = pos;
	}
	var i = 0;

	var activeType = $('#tepeManset .tmList').children('.active').attr('type');
	$('#tepeManset .tmNumber').removeClass(activeType);

	for ( k = 1; k <= 5; k++) {
		i = (k - 1);

		if (k == AktifTepeManset) {
			$('#tepeManset .tmNumber').removeClass(activeType).addClass($('#tepeManset .tmList').children().eq(i).attr('type'));
			$('#tepeManset .tmList').children().eq(i).addClass('active');
			$('#tepeManset .tmNumber').children().eq(i).addClass('active');
		} else {
			$('#tepeManset .tmList').children().eq(i).removeClass('active');
			$('#tepeManset .tmNumber').children().eq(i).removeClass('active');
		}
	}

	clearTimeout(tepemansetTimerId);
	tepemansetTimerId = setTimeout("tepemanset_degistir('+')", 5000);
}

function mnstop() {
	clearTimeout(tepemansetTimerId);
}

function mnstart() {
	tepemansetTimerId = setTimeout("tepemanset_degistir('+')", 5000);
}

tepemansetTimerId = setTimeout("tepemanset_degistir('+')", 5000);

$('#tepeManset .tmNumber').children().hover(function() {
	var sira = $(this).index() + 1;
	tepemanset_degistir(sira);
	mnstop();
}, function() {
	mnstart();
});

