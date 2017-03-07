if (typeof(vB_XHTML_Ready) != "undefined") {
    vB_XHTML_Ready.subscribe(infinite_scroll_init)
}

function infinite_scroll_init() {
	if (THIS_SCRIPT == 'showthread')
	{
		if (typeof threadId !== 'undefined') {
			new vB_Post_Infinite_Scroll();
		}
	}

	if (THIS_SCRIPT == 'forumdisplay')
	{
		new vB_Thread_Infinite_Scroll();
	}
}

// INFINITE SCROLL THREADS

function vB_Thread_Infinite_Scroll()
{
	this.ajax = null;
	YAHOO.util.Event.addListener("loadMoreThreads", "click", this.loadMore, this)
}

vB_Thread_Infinite_Scroll.prototype.loadMore = function(E, A)
{
	if (YAHOO.util.Connect.isCallInProgress(A.ajax)) {
        	YAHOO.util.Connect.abort(A.ajax)
   	}

	A.element = this;
	A.elementContent = this.innerHTML;

	this.innerHTML = '<img src="' + IMGDIR_MISC + '/progress3.gif" border="0" />';
	
	var pageNumber = this.getAttribute('data-pagenum'),
	    perPage = this.getAttribute('data-pp'),
	    sortField = this.getAttribute('data-sort'),
            order = this.getAttribute('data-order'),
	    prefixId = this.getAttribute('data-prefixid'),
	    daysPrune = this.getAttribute('data-daysprune'),
	    forumId = this.getAttribute('data-forumid');

	A.ajax = YAHOO.util.Connect.asyncRequest("POST", fetch_ajax_url("infinite_scroll.php"), {
        	success: A.display,
        	failure: A.handleError,
        	timeout: vB_Default_Timeout,
		scope: A,
		argument: [this] 
    	}, SESSIONURL + "securitytoken=" + SECURITYTOKEN + "&" + "ajax=1&type=thread&f=" + forumId + "&pagenumber=" + pageNumber + "&perpage=" + perPage + "&daysprune=" + daysPrune + "&sort=" + sortField + "&order=" + order + "&prefixid=" + prefixId)
};

vB_Thread_Infinite_Scroll.prototype.display = function(H, Z)
{
	if (H.responseXML) {
		this.element.innerHTML = this.elementContent;
		if (fetch_tag_count(H.responseXML, "threadbit")) {
			var D = H.responseXML.getElementsByTagName("threadbit");
			for (E = 0; E < D.length; E++) {
		            var K = document.createElement("div");
		            K.innerHTML = D[E].firstChild.nodeValue;
		            var A = K.getElementsByTagName("li")[0];
		            var J = YAHOO.util.Dom.get("threads");
		            if (A) {
				
		                var B = J.appendChild(A);

				// thread title/icon doubleclick
				if(typeof vB_AJAX_ThreadList_Events != "undefined"){
			                YAHOO.util.Event.on(A, "dblclick", vB_AJAX_ThreadList_Events.prototype.threadtitle_doubleclick);
					var C = YAHOO.util.Dom.getElementsByClassName("threadstatus", "a", A);
					if (C.length > 0) {
						C[0].style.cursor = pointer_cursor;
						YAHOO.util.Event.on(C[0], "dblclick", vB_AJAX_ThreadList_Events.prototype.threadicon_doubleclick)
					}
				}
				
				if (E == 0) {		                
					A.scrollIntoView(false);
				}
		            }
                	}

			init_forum_readmarker_system();
			if(typeof vB_AJAX_ThreadList_Events != "undefined"){
				register_inlinemod("thread_inlinemod_form", "li", "threadbit", "thread");
			}
			this.element.setAttribute('data-pagenum', parseInt(this.element.getAttribute('data-pagenum')) + 1);
		}	
		else if (fetch_tag_count(H.responseXML, "error")) {
			var I = H.responseXML.getElementsByTagName("error");
			if (I.length) {
				var G = "";
				for (E = 0; E < I.length; E++) {
				    G += I[E].firstChild.nodeValue;
				}
				G += "\n";
				alert(G);
				return;
			}		   
		}
		else {
			document.getElementById("loadMoreThreads").parentNode.style.display = 'none';			
		}

		if (fetch_tag_count(H.responseXML, "nomore")) {
			document.getElementById("loadMoreThreads").parentNode.style.display = 'none';	
		}
	}
};

// INFINITE SCROLL POSTS

function vB_Post_Infinite_Scroll()
{
	this.ajax = null;
	YAHOO.util.Event.addListener("loadMorePosts", "click", this.loadMore, this)
}

vB_Post_Infinite_Scroll.prototype.loadMore = function(E, A)
{
	if (lastPostDateline == 0)
		return;

	if (YAHOO.util.Connect.isCallInProgress(A.ajax)) {
        	YAHOO.util.Connect.abort(A.ajax)
   	}

	var threadId = this.getAttribute("data-threadid");
	A.element = this;
	A.elementContent = this.innerHTML;

	this.innerHTML = '<img src="' + IMGDIR_MISC + '/progress3.gif" border="0" />';

	A.ajax = YAHOO.util.Connect.asyncRequest("POST", fetch_ajax_url("infinite_scroll.php"), {
        	success: A.display,
        	failure: A.handleError,
        	timeout: vB_Default_Timeout,
		scope: A,
		argument: [this] 
    	}, SESSIONURL + "securitytoken=" + SECURITYTOKEN + "&" + "ajax=1&t=" + threadId + "&type=post&lastpostdate=" + lastPostDateline)
};

vB_Post_Infinite_Scroll.prototype.display = function(H, Z)
{
	if (H.responseXML) {
		this.element.innerHTML = this.elementContent;
		if (fetch_tag_count(H.responseXML, "postbit")) {
			var D = H.responseXML.getElementsByTagName("postbit");
			 for (E = 0; E < D.length; E++) {
		            var K = document.createElement("div");
		            K.innerHTML = D[E].firstChild.nodeValue;
		            var A = K.getElementsByTagName("li")[0];
		            var J = YAHOO.util.Dom.get("posts");
		            if (A) {
				
		                var B = J.appendChild(A);
		                PostBit_Init(B, D[E].getAttribute("postid"));
				
				if (E == 0)		                
				A.scrollIntoView(false)
		            }
                	}
		}	
		else {
		    var I = H.responseXML.getElementsByTagName("error");
		    if (I.length) {
			var G = "";
			for (E = 0; E < I.length; E++) {
			    G += I[E].firstChild.nodeValue;
			}
			G += "\n";
			alert(G);
			return;
		    }		   
		}

		if (fetch_tag_count(H.responseXML, "lastpostdate")) {	
			lastPostDateline = H.responseXML.getElementsByTagName("lastpostdate")[0].firstChild.nodeValue;
		}
		else
		{
			lastPostDateline = 0;
			document.getElementById("loadMorePosts").parentNode.style.display = 'none';
		}

		
	}
};

vB_Post_Infinite_Scroll.prototype.handleError = function(A) 
{
    vBulletin_AJAX_Error_Handler(A);
};
