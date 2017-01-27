function video_open(video_id, auto_play) {
	html = "<iframe src='http://www.sporxtv.com/_iframe/embed_mobil.php?frm_vId=" + video_id + "&ap=" + auto_play + "&st=wa_iphone' scrolling='no' frameborder='0' style='width: 100%; height: 100%;'></iframe>";
	$("#full_overlay").css("display", "block");
	$("#fo_content").html(html);
	video_div_modify();
}

function video_open_videojs(video_id, auto_play) {
	html = "<iframe src='http://www.sporxtv.com/_iframe/embed_mobil_videojs.php?frm_vId=" + video_id + "&ap=" + auto_play + "&st=wa_iphone' scrolling='no' frameborder='0' style='width: 100%; height: 100%;'></iframe>";
	$("#full_overlay").css("display", "block");
	$("#fo_content").html(html);
	video_div_modify();
}

function video_close() {
	$("#full_overlay").css("display", "none");
	$("#fo_content").html("");
}

function video_div_modify() {
	div_width = $("#fo_content").width();
	w_height = $(window).height();
	new_height = div_width * 56.25 / 100;
	new_height = Math.floor(new_height);
	//alert(div_width);
	//alert(new_height);
	//alert(w_height);
	if (w_height < new_height) {
		new_width = w_height * 1.7777;
		new_width = Math.floor(new_width);
		//alert(new_width);

		$("#fo_content_out").width(new_width);
		$("#fo_content").height(w_height);
	} else
		$("#fo_content").height(new_height);
}