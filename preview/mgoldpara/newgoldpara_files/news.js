$(function() {
	getData();
	    
	//News Detail - NATIVE PUSH
	$(document).on("click", "#newsClick .news-item",  function(e){
		var clickedItemID = $(this).data('id');
		var reqUrl = 'news_detail.html?id=' + clickedItemID;
	});

});

setInterval(function(){ getData();}, 60000);

function getData(){
	$.ajax({
      method: "GET",
      url: "http://goldpara.makilinker.com:80/api/base/haberler/getall",
    }).done(function(data) {

        	var key, count = 0;
			for(key in data.responseObject.haberler) {
			  if(data.responseObject.haberler.hasOwnProperty(key)) {
			    count++;
			  }
			}

			//Create a new object
			var News = {
				carouselNewsItem: data.responseObject.haberler.slice(0,5),
				listNewsItem: data.responseObject.haberler.slice(5,count),
			};
			//Render Carousel HTML
			var carouselTpl = $("#carouseltpl").html();
			var carouselHtml = Handlebars.compile(carouselTpl);
			$('#newsCarousel').html(carouselHtml(News));

			//Render List HTML
			var listTpl = $("#listtpl").html();
			var listHtml = Handlebars.compile(listTpl);
			$("#newsList").html(listHtml(News));

			var headerTpl = $("#listheadtpl").html();
			var headerHtml = Handlebars.compile(headerTpl);
			$("#list-header").append(headerHtml({haber : data.responseObject.haberlist}));

			//Re-Render News Carousel

			titleSwiper.update();
			newsSwiper.update();
			contentSwiper.update();


    }).fail(function () {

    });
}