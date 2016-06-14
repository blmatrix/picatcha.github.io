Drupal.hwesteem = new Object; // create our own namespace

$(document).ready(function(){	
		
	/* show and hide appropriate spans */
	if($('#esteem_improved').val() > 0){
    	$('#improvedBubble').addClass('show');
	}
	
	if($('#esteem_changed').val() > 0){
    	$('#changedBubble').addClass('show');
	}
	
	if($('#esteem_saved').val() > 0){
    	$('#savedBubble').addClass('show');
	}
	
	// Comment Voting
	$("*[class^=esteem_improved_]").each(function() {  
	      var count = $(this).val();
		  var cid = $(this).attr("id");
		  
		  if(count > 0) {
		    $("#improvedBubble_" + cid).addClass('show');
		  }
	});
		
	$("*[class^=esteem_changed_]").each(function() {		      
	      var count = $(this).val();
          var cid = $(this).attr("id");
			  
          if(count > 0) {
            $("#changedBubble_" + cid).addClass('show');
          }
    });
		
	$("*[class^=esteem_saved_]").each(function() {		      
          var count = $(this).val();	
          var cid = $(this).attr("id");
			  
          if(count > 0) {
            $("#savedBubble_" + cid).addClass('show');
          }
    });
	
	$("*[class^=thumbs_up_]").each(function() {  
	      var count = $(this).val();
		  var cid = $(this).attr("id");
		  
		  if(count > 0) {
		    $("#thumbsUpBubble_" + cid).addClass('show');
		  }
	});
	
	$("*[class^=thumbs_down_]").each(function() {  
	      var count = $(this).val();
		  var cid = $(this).attr("id");
		  
		  if(count > 0) {
		    $("#thumbsDownBubble_" + cid).addClass('show');
		  }
	});
	
	// Comment Thumbs Up Voting
	$('.commentThumbsUp').click(function(){
		var cid = $(this).attr("id");		
		esteemVote('thumbs_up','thumbs_up',cid);
	      return false;  
	});  
	
	$('.commentThumbsDown').click(function(){
		var cid = $(this).attr("id")
		esteemVote('thumbs_down','thumbs_down',cid);
	      return false;  
	});  
	
}); 

function esteemVote(tag, process, cid){

	var nid  = $('.esteem-nid').val();
	var type = $('.esteem-node-type').val();

	if(cid != null) {
	  nid = cid;
	  type = 'comment'
	}
	
      //get hostname data for current server
      var newUrl = 'http://' + window.location.hostname + '/esteem/vote';
      var dataStr = 'nid=' + nid + '&type=' + type + '&tag=' + tag + '&cid=' + cid;

      $.ajax({
        type: 'POST',
  	url: newUrl,          
        dataType: 'json',                         
        data: dataStr,   
        success: function(msg,process){
    	  if(cid == null || cid == 0) {
    	    //var src = nid;
    	    processVoteResults(msg);
    	  } else {
    		var src = nid;  
    		processCommentVoteResults(msg, src);  
    	  }
        }
      });
      return false;  
}

function processCommentVoteResults(msg, src) {
		
	  if (msg['success'] == 'true') {
			  
		//reload counts
		var improved = msg['esteem-improved'];
		var changed = msg['esteem-changed'];
		var saved = msg['esteem-saved'];
		var up = msg['thumbs-up'];
		var down = msg['thumbs-down'];
		
		$('#changedCount_' + src).text(changed);
		$('#savedCount_' + src).text(saved);
		$('#improvedCount_' + src).text(improved);
		$('#thumbsDownCount_' + src).text(down);
		$('#thumbsUpCount_' + src).text(up);
		
		
		if(improved == '0'){
			$('#improvedBubble_' + src).hide('fast');
		}else{
			$('#improvedBubble_' + src).show('fast');
		}
		
		if(changed == '0'){
			$('#changedBubble_' + src).hide('fast');
		}else{
			$('#changedBubble_' + src).show('fast');
		}
		
		if(saved == '0'){
			$('#savedBubble_' + src).hide('fast');
		}else{
			$('#savedBubble_' + src).show('fast');
		}
		
		if(up == '0'){
			$('#thumbsUpBubble_' + src).hide('fast');
		}else{
			$('#thumbsUpBubble_' + src).show('fast');
		}
		
		if(down == '0'){
			$('#thumbsDownBubble_' + src).hide('fast');
		}else{
			$('#thumbsDownBubble_' + src).show('fast');
		}
	  }		
	  return false;  
} 

function processVoteResults(msg) {
	
  if (msg['success'] == 'true') {
		  
	//reload counts
	var improved = msg['esteem-improved'];
	var changed = msg['esteem-changed'];
	var saved = msg['esteem-saved'];
	
	$('#changedCount').text(changed);
	$('#savedCount').text(saved);
	$('#improvedCount').text(improved);
	
	
	if(improved == '0'){
		$('#improvedBubble').hide('fast');
	}else{
		$('#improvedBubble').show('fast');
	}
	
	if(changed == '0'){
		$('#changedBubble').hide('fast');
	}else{
		$('#changedBubble').show('fast');
	}
	
	if(saved == '0'){
		$('#savedBubble').hide('fast');
	}else{
		$('#savedBubble').show('fast');
	}
	
  }		
  return false;  
} 

Drupal.hwesteem.Init = function(context){

    $('#edit-submit-new').click(function(event) {
	
      var standardClick = "var s=s_gi(s_account); s.events='event20'; s.linkTrackVars='events'; s.linkTrackEvents='event20'; "
        +"s.tl(this,'o','Outbound Click');";
      
      $(this).attr('onclick', standardClick);	
	
      if ($('#messageWrapper').length) {
        $('#messageWrapper').remove();
      }
    });
    
    
    $('.form-radio').click(function(event) {	
    
	// remove active class and add to this
	$("label:.option").removeClass("active");
	
	
	// update form values	
	var newValue = this.id.replace("Confirm", "");
	
	$(this).attr("checked", true); 
        $(this).parent().addClass("active");
	
	var type = $('#edit-type').val();
	// don't change commment esteem values
	if (type !== "comment") {
	  //cid
	  $('#edit-cid').val(newValue).change();
	  //src
	  $('#edit-src').val(newValue).change();
	}
	
    });
    
    $('.esteem-cancel').click(function(event){
      event.preventDefault();
      Drupal.fbc.destination = $(this).attr('href');
      $('#hwesteem-confirm-modal').overlay().close();  
      return false;
    });
    
    $('.esteem').click(function(event) {
      event.preventDefault();
      Drupal.hwesteem.destination = $(this).attr('href');
      
      // omniture tracking
      var standardClick = "var s=s_gi(s_account); s.events='event19'; s.linkTrackVars='events'; s.linkTrackEvents='event19'; "+
      "s.tl(this,'o','Outbound Click');";
      $(this).attr('onclick', standardClick);
               
      if ($('#messageWrapper').length) {
        $('#messageWrapper').remove();
      }      
      
      var tag = $(this).attr('rel');
      var nid  = $('.esteem-nid').val();
      var cid  = $(this).attr('id');
      var type = $('.esteem-node-type').val();
      var comment = $('.esteem-comment').val();
        
      if (!isNaN(cid)) {
        type = "comment";  
      }
        
      var src  = $(this).attr('id');
      var dataStr = 'nid=' + nid + '&type=' + type + '&src=' + src + '&cid=' + cid;

      if (!$('#hwesteem-confirm-modal').length) {
        $('body').append('<div id="hwesteem-confirm-modal" style="display:none;" class="overlay alertStyle"><div id="hwesteem-confirm-content"></div></div>');
      }
            
      $('#hwesteem-confirm-content').load('/esteem/confirm?' + dataStr, function() {
        Drupal.attachBehaviors($('#hwesteem-confirm-modal'));
        $('#hwesteem-confirm-modal').overlay({ expose: {}, closeOnClick: false, api: true}).load();       
        $('#edit-tag-' + tag).attr("checked", true); 
        $('#edit-tag-' + tag).parent().addClass("active");
      }); 
        
    });
        
}



Drupal.hwesteem.Ajax = function(context){
    
  if (Drupal.Ajax != null) {
  
    Drupal.Ajax.plugins.hwesteem = function(hook, args) { 
      
    if (hook === 'message') {
	
      var pass = args.data.options.form_submitted;  
      if (pass) {
        $('#hwesteem-confirm-modal').overlay().close();
        
        if ($("div:visible[id*='Confirm']").length) {
          $("div:visible[id*='Confirm']").removeClass("active");
        }
        
        var msg = new Array();
        msg['success'] = 'true';
        msg['esteem-improved'] = args.data.options.esteem_improved;
        msg['esteem-changed']  = args.data.options.esteem_changed;
        msg['esteem-saved']    = args.data.options.esteem_saved;
	
        var type = args.data.options.esteem_type;
        if (type != "comment") {	
          processVoteResults(msg);
        }
        else {
          var src  = args.data.options.src; 
	  processCommentVoteResults(msg, src);  
        }
      }
      else {
        if (args['options']['type'] == 'error') {
        
          $('#esteem-confirm-form').prepend("<div id='messageWrapper'><div class='messages error'></div><br/></div>");
          Drupal.Ajax.writeMessage($('.error .messages'), args.submitter, args.options);
          
        }
	return false;  
      }
    }    
  }
  }  
}

Drupal.behaviors.HWEsteems     = Drupal.hwesteem.Init;
Drupal.behaviors.HWEsteemsAjax = Drupal.hwesteem.Ajax;;
Drupal.hwfacebook = new Object; // create our own namespace

Drupal.hwfacebook.Init = function(context) {

    $('input.connect-suggestions').click(function(event) {
        var suggestion = this.value;
        $('.connect-username').val(suggestion).change();
    });

    $('a.changeFBUser').click(function(event) {
        FB.logout(function(response) {
            // user is now logged out
            $('#connect-modal').overlay().close();
            return false;
        });
    });

    $('a.connect-cancel').click(function(event) {
        $('#connect-modal').overlay().close();
        return false;
    });


    $('a.fb-connect').click(function(event) {
        event.preventDefault();
        Drupal.hwfacebook.destination = $(this).attr('href');
        var formId = $(this).attr('rel').trim();
        FB.getLoginStatus(function(response) {

            if (response.authResponse) {
                // logged in and connected user, someone you know
                FB.api('/me', function(response) {
                    verify_connect(response, formId);
                });
            }
            else {
                no_fbuser();
            }
        });
    });
}

Drupal.behaviors.HWFacebook = Drupal.hwfacebook.Init;

function connect(response, formId) {

    var queryString = 'form=' + formId
            + '&first=' + response.first_name
            + '&last=' + response.last_name
            + '&mail=' + response.email
            + '&username=' + response.username
            + '&fbuid=' + response.id
            + '&birthday=' + response.birthday
            + '&gender=' + response.gender;

    if (!$('#connect-modal').length) {
        $('body').append('<div id="connect-modal" style="display:none;" class="overlay alertStyle"><div id="connect-content"></div></div>');
    }

    $('#connect-content').load('/hwfacebook/jsonform?' + queryString, function() {
        Drupal.attachBehaviors($('#connect-modal'));
        $('#connect-modal').overlay({ expose: {}, closeOnClick: false, api: true}).load();
    });

}

function no_fbuser() {
    FB.login(function(response) {
        if (response.authResponse) {
            //user successfully logged in
            FB.api('/me', function(response) {
                verify_connect(response, 'fbc');
            });
        }
    }, {scope:'email,user_birthday,publish_stream'});
}

Drupal.hwfacebook.Ajax = function(context) {

    if (Drupal.Ajax != null) {

        Drupal.Ajax.plugins.process_hwfacebook_form = function(hook, args) {

            if (hook === 'message') {
                var connected = args.data.options.user_connected;
                var uid = args.data.options.uid;

                if (connected) {
                    $('#connect-modal').overlay().close();
                    window.location.href = 'http://' + window.location.hostname + '/user/' + uid + '/dashboard';
                }

                var formId = args.formObj[0].id;
                switch (formId) {

                    case 'hwfacebook-connect-form':

                        if ($('#messageWrapper').length > 0) {
                            $('#messageWrapper').remove();
                            $('input.error').removeClass('error');
                        }

                        if (args['options']['type'] == 'error') {
                            $('#FBconnect-form').prepend("<div id='messageWrapper'><div class='messages error'></div><br/></div>");
                            Drupal.Ajax.writeMessage($('.error .messages'), args.submitter, args.options);
                        }
                        return false;
                        break;

                    case 'hwfacebook-existing-form':

                        if ($('#messageWrapper').length > 0) {
                            $('#messageWrapper').remove();
                            $('input.error').removeClass('error');
                        }

                        if (args['options']['type'] == 'error') {
                            $('#FBconnect-existing-form').prepend("<div id='messageWrapper'><div class='messages error'></div><br/></div>");
                            Drupal.Ajax.writeMessage($('.error .messages'), args.submitter, args.options);
                        }
                        return false;
                        break;
                }
            }
        }
    }
}


Drupal.behaviors.FBCAjax = Drupal.hwfacebook.Ajax;

function verify_connect(response, formId) {

    // check if this user is a connect user
    // get hostname data for current server
    var newUrl = 'http://' + window.location.hostname + '/hwfacebook/connect';
    var dataStr = 'fbuid=' + response.id + '&login=true';

    $.ajax({
        type: 'POST',
        url: newUrl,
        dataType: 'json',
        data: dataStr,
        async: true,
        success: function(msg) {

            if (msg['connected'] == 'true') {
                // user is connected, so log them in
                window.location.href = 'http://' + window.location.hostname + '/user/' + msg['uid'] + '/dashboard';
            }
            else {
                // not connected so pop modal
                connect(response, formId);
            }
        }
    });

}

;
Drupal.advocacy = new Object; // create our own namespace

Drupal.advocacy.Init = function(context){
    
   
    $('.socialLink').click(function(){
	LogPoint(0,0,'share-social');	    
    });
    
    $('.leaderSocialLink').click(function(){
	LogPoint(0,0,'share-social');
	
    });
}


function LogPoint(nid,tid,alias) {    
   
  //get hostname data for current server
  var newUrl = 'http://' + window.location.hostname + '/advocacy/log';
  var dataStr = 'nid=0&tid=0&alias=' + alias;
  
  $.ajax({
      type: 'POST',
      url: newUrl, 
      async: false,
      dataType: 'json',                         
      data: dataStr,   
      success: function(){
  	  //do something...or don't
      }
  });
  return false;      
}

Drupal.behaviors.HWPointsForms = Drupal.advocacy.Init;
;
// Lazy load js
(function() {
  function async_load(src){
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = src;
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
  }
  if (window.attachEvent)
	  window.attachEvent('onload', async_load('/sites/all/themes/blackwell/js/jquery.cookie.js')),
    // window.attachEvent('onload', async_load('http://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-4fff53e0007f7bfc&domready=1')),
		window.attachEvent('onload', async_load('/sites/all/themes/blackwell/js/modals.js'));
  else
	  window.addEventListener('load', async_load('/sites/all/themes/blackwell/js/jquery.cookie.js'), false),
		// window.addEventListener('load', async_load('http://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-4fff53e0007f7bfc&domready=1'), false),
		window.addEventListener('load', async_load('/sites/all/themes/blackwell/js/modals.js'), false);
})();;
