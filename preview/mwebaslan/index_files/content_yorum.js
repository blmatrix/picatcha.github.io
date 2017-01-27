$('.yrm-like').click(function() {
	var _this = $(this);
	var yorumId = $(this).attr("yid");
	$.ajax({
		url : '/_ajax/yorum_like.php?st=like&yorumId=' + yorumId,
		dataType : 'json'
	}).done(function(data) {
		if (data.type == 'error')
			createErrorMessage(data);
		else if (data.type == 'like') {
			_this.html('<span class="glyphicon glyphicon-ok"></span>');
		}
	});

});

$('.yrm-dislike').click(function() {
	var _this = $(this);
	var yorumId = $(this).attr("yid");

	$.ajax({
		url : '/_ajax/yorum_like.php?st=dislike&yorumId=' + yorumId,
		dataType : 'json'
	}).done(function(data) {
		if (data.type == 'error')
			createErrorMessage(data);
		else if (data.type == 'dislike') {
			_this.html('<span class="glyphicon glyphicon-ok"></span>');
		}
	});

});

$('.yrm-reply').click(function() {
	var yorumId = $(this).parents('li').attr("yid");

	$("#yorumMesaj").removeClass('sr-only');
	$("#yorumMesaj .panel-body").html("<strong>Hatýrlatma:</strong> Baþka bir yoruma yanýt yazmaktasýnýz. Yazmýþ olduðunuz mesaj yanýtladýðýnýz yorumun altýnda listelenecektir. Doðrudan bu sayfaya yorum yazmak istiyorsanýz <a href=\"#yorumyaz\" onclick=\"$('#frm_parentId').val(0);$('#yorumMesaj').addClass('sr-only');\"><u>týklayýn</u></a>");
	$("#frm_parentId").val(yorumId);
});

function contentYorumSubmit(loginform) {
	$('#yrmstatus').html('<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only">100% Complete</span> </div></div>');

	$.ajax({
		type : 'POST',
		url : '/_ajax/content_yorum_submit.php',
		data : $(loginform).serialize(),
		dataType : 'json'
	}).done(function(data) {
		if (data.type == 'error')
			createErrorMessage(data);
		else if (data.type == 'true') {
			$('#yrmstatus').html('<div class="panel panel-info"><div class="panel-body">' + data.message + '</div></div>');
		}
	});

	return false;
}