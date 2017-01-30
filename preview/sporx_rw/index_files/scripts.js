function createModal(_data) {

	$.ajax({
		type : 'POST',
		url : '/_ajax/modal_message.php',
		data : _data
	}).done(function(data) {

		if (_data.type != 'true' && data) {
			$('#modalSX').html('');
			$('#modalSX').html(data);
			$('#sxModal').modal('show');
		}

	});
}


$('body').on('click', '.btn-search-toggler', function(e) {
	e.preventDefault();
	$('body').addClass('quick-search-shown');
});
$('.quick-search').on('click', '> span', function(e) {
	e.preventDefault();
	$('body').removeClass('quick-search-shown');
}); 