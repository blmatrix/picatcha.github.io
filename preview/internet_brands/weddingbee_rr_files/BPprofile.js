var varThreads = {
	ThreadsProfile : function(idUser, strAction, page, categories) {
		profileTabs.callAjaxTab('bp_Boards' + strAction, 'bp_custom_threads', idUser, page, categories, '');
	}
}
var varThreadsICommented = {
	ThreadsICommented : function(idUser, page) {
		profileTabs.callAjaxTab('bp_BoardsICommented', 'bp_custom_threads', idUser, page, '');
	}
}
var varThreadsIFollow = {
	ThreadsIFollow : function(idUser, page) {
		profileTabs.callAjaxTab('bp_BoardsSubscribed', 'bp_custom_threads', idUser, page, '');
	}
}
var varThreadsIStarted = {
	ThreadsIStarted : function(idUser, page) {
		profileTabs.callAjaxTab('bp_BoardsIStarted', 'bp_custom_threads', idUser, page, '');
	}
}
var varThreadsLastActivity = {
	ThreadsLastActivity : function(idUser, page, categories) {
		profileTabs.callAjaxTab('bp_BoardsLastActivity', 'bp_custom_threads', idUser, page, categories, '');
	}
}
var varGalleryICreated = {
	GalleryICreated : function(idUser,categories, page) {
		profileTabs.callAjaxTab('bp_GalleryICreated', 'bp_custom_gallery', idUser, page, categories);
	}
}
var varBlogs = {
	BlogsICreated : function(idUser, page) {
		profileTabs.callAjaxTab('wb_my_blogs', 'bp_my_blogs', idUser, page, '');
	}
}
var profileTabs = {
	callAjaxTab : function(action, idcontainer, idUser, page, categories) {
		var data = {
			action: action, 
			idUser: idUser,
            categories:categories,
            page: page
		};
		jQuery('#'+idcontainer).html(loaderimg);
		jQuery.get(ajaxurl, data, function(response) {
			if(response){
                jQuery('#'+idcontainer).html(response);
			}
		});
	}
}