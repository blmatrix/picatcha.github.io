$(document).scroll(function() {
	if ($(this).scrollTop() > 44) {
		$('.status-logo').show();
	} else {
		$('.status-logo').hide();
	}
});

$(document).on("click", function() {

	if ($('.icon-settings:hover').length === 0) {
		$("#settings").hide();
	} else if ($('.icon-settings:hover').length === 0) {
		$("#settings").toggle();
	}

	if ($('.icon-notification:hover').length === 0) {
		$("#notification").hide();
	} else if ($('.icon-notification:hover').length === 0) {
		$("#notification").toggle();
	}

	if ($('.news-share:hover').length === 0) {
		$("#newsshare").hide();
	} else if ($('.news-share:hover').length === 0) {
		$("#newsshare").toggle();
	}

});

$(function() {
	$.ajax({
		type : "GET",
		url : "//www.sporx.com/_login/tepe_jsonp.php",
		dataType : "jsonp",
		success : function(data) {
			$(data.html).prependTo("#tepelogin");
		}
	}).done(function() {
		$.ajax({
			type : "POST",
			url : "//www.sporx.com/_login/notification_box_jsonp.php",
			data : {
				total : 1
			},
			dataType : "jsonp",
			success : function(data) {
				//console.log(data);
				if (data.total)
					$("<span class=\"notif-count radius-50\">" + data.total + "</span>").prependTo("#tepelogin .status-notification");
			}
		});
	});

	$('#tepelogin').on('click', '.icon-notification', function() {

		$('#notification').toggle();
		$('#notification .toggle-data').html('<div class="ajax_loading"></div>');

		$.ajax({
			type : "POST",
			url : "//www.sporx.com/_login/notification_box_jsonp.php",
			dataType : "jsonp",
			success : function(data) {
				$('#notification .toggle-data').html(data.html);
			}
		});

	});

	$('#tepelogin').on('click', '.icon-settings', function() {
		$('#settings').toggle();
	});

	if ($('#contentyorumdiv').length) {
		var contentType = $('#contentyorumdiv').attr("type");
		var contentId = $('#contentyorumdiv').attr("cid");
		var yorumId = $('#contentyorumdiv').attr("yid");
		var ads = $('#contentyorumdiv').attr("ads");

		$.ajax({
			type : "GET",
			url : "//www.sporx.com/_login/content_yorum_jsonp.php?contentType=" + contentType + "&contentId=" + contentId + "&yorumId=" + yorumId + "&ads=" + ads,
			dataType : "jsonp",
			success : function(data) {
				$("#contentyorumdiv").html(data.html);
				$("#contentyorumdiv").on('click', '.fancyboxAx', function(e) {
					e.preventDefault();
					$.fancybox({
						type : 'ajax',
						href : $(this).attr('href'),
						closeBtn : true,
						padding : 20
					});
				});
			}
		});

	}

	$('.boxTabs').children().click(function() {
		$(this).parent().children().removeClass('active');
		$(this).addClass('active');

	});

	$('#encok .boxTabs').children().click(function() {
		_rel = $(this).attr('rel');
		$('#encok .boxContainer').load('/_ajax/anasayfa_sag_encok.php?type=' + _rel);
	});

	$('.sxIframe').click(function() {
		$.fancybox.open({
			'href' : $(this).attr('rel'),
			'type' : 'iframe',
			'autoSize' : false,
			'width' : $(this).attr('data-width'),
			'height' : $(this).attr('data-height')
		});
	});

	$('#contentyorumdiv').on('mouseenter mouseleave', '.uyeboxyorum', function(e) {
		if (e.type === 'mouseenter') {
			var memberId = $(this).attr("uyeid");
			var konum = $(this).offset();
			var ptop = konum.top - ($(this).height() + 60);
			var pleft = -70;
			var cydiv = $('#contentyorumdiv').offset();
			//console.log(cydiv.left + ' *** ' + konum.left);
			pleft = konum.left - 70;
			$("#uyeinfobox").hide();
			$("#uyeinfobox").css("left", pleft);
			$("#uyeinfobox").css("top", ptop);
			$("#uyeinfobox").html('');
			$("#uyeinfobox").load("/_ajax/uye_infobox.php?id=" + memberId);
			$("#uyeinfobox").show();
		} else {
			$("#uyeinfobox").hide();
		}
	});
	/*
	 $('#uyeinfobox').on('mouseleave',function(e){
	 $(this).hide();
	 });
	 */
});

function yorum_page(frm_page) {
	var contentType = $('#contentyorumdiv').attr("type");
	var contentId = $('#contentyorumdiv').attr("cid");
	var yorumId = $('#contentyorumdiv').attr("yid");

	$.ajax({
		type : "GET",
		url : "//www.sporx.com/_login/content_yorum_jsonp.php?contentType=" + contentType + "&contentId=" + contentId + "&yorumId=" + yorumId + "&frm_page=" + frm_page,
		dataType : "jsonp",
		success : function(data) {
			$("#contentyorumdiv").html(data.html);
		}
	});
}

function dfp_banner_reload(div_id, category, width, height) {
	html = "<iframe src='//www.sporx.com/_iframe/dfp_adunit.php?category=" + category + "&width=" + width + "&height=" + height + "&div_id=" + div_id + "' scrolling='no' frameborder='0' style='width: " + width + "px; height: " + height + "px;'></iframe>";
	$("#" + div_id).html(html);
}
