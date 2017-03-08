var FBConnect = {

  /*
   * If this value is true alert boxes will be raised when various
   * types of configuration errors are detected.
   */
  debugVerbose : (window.location.href.indexOf('fbc_verbose_debug') != -1),
  usernames    : [],
  user  : {},
  initialized : false,

  init_Connect : function(api_key, plugin_path, home_url, wp_user, app_id, app_secret) {

    if (!api_key) {
      FBConnect.error("api_key is not set");
    }

    if (!plugin_path) {
      FBConnect.error("plugin path not provided");
    }

    // Check for properly configured template - note this test fails in IE!
    if (this.debugVerbose) {
      var html_tag = document.getElementsByTagName('html').item(0);
      if (html_tag.getAttribute('xmlns:fb') === null) {
        FBConnect.error('xmlns:fb not defined on html tag - check your templates');
      }
    }

    FBConnect.app_appid = app_id;
    FBConnect.app_secret = app_secret;
    FBConnect.app_api_key = api_key;
    FBConnect.app_channel = plugin_path + 'xd_receiver.php';

    FBConnect.user_id = 0;
    FBConnect.user_email = '';
    FBConnect.user_username = '';
    FBConnect.user_first_name = '';
    FBConnect.user_last_name = '';
    FBConnect.user_user;

    FBConnect.home_url = home_url || "/";

    FBConnect.plugin_path = plugin_path;
    FBConnect.ajax_url = plugin_path + 'fbajax.php';
    FBConnect.wp_user = wp_user;

    var config = {
      appId : app_id,
      xdChannelUrl : plugin_path + 'xd_receiver.php',
      status : true, // check login status
      cookie : true, // enable cookies to allow the server to access the session
      xfbml  : true, // parse XFBML
      oauth  : true
    };
    FB.debug = true;
    FB.init(config);
    FBConnect.initialized = true;

    },
    
  login: function(){
    var reload_location = /login|register/.test(window.location) ? FBConnect.home_url : window.location.href;
    var login_location  = FBConnect.home_url + '?action=fblogin&backend=nitro&fbredirect_to='+reload_location;
    window.location.assign( login_location );
  },
  login_or_popup : function()
  {
    if(FBConnect.user_id==0)
    {
      FBConnect.setupreg(null);
    }
    else
    {
      var data = { action: 'wp_user_exists', fbuid: FBConnect.user_id, user_email: FBConnect.user_email};
      jQuery.ajax({
        type: 'POST',
        url: FBConnect.ajax_url,
        data: data,
        success: function(a,b,c)
          {
            if(a.result != null)
            {
              _gaq.push(['_trackEvent', 'fbconnect', 'logged in'])
              //trackEvent('fbconnect','logged in');
              FBConnect.login();
            }
            else
            {
              FBConnect.setupreg(a.email);
            }  
          },
        dataType : 'json'
      });
    }
  },
  RequestUserId : function() {
      FB.api('/me', FBConnect.login_or_popup);
  },
  ResponseUserId : function(response) {
      FBConnect.user_id =response.id;
      FBConnect.login_or_popup();
  },
  setupreg : function(email)
  {

    //Popup the registration form
    $.getScript("http://www-static.weddingbee.com/scripts/jquery.smartmodal.js",
      function()
      {
        if(email == null) {
          $('#popupreg').load(FBConnect.plugin_path+'reg.php',FBConnect.popupreg);
        } else {
          $('#popupreg').load(FBConnect.plugin_path+'email_exists.php?email='+email.email,FBConnect.popupreg);
        }
      }
    );
  },
  popupreg : function()
  {
    $('#popupreg')[0]._sm = false;
    $('#popupreg').smart_modal().smart_modal_show();
    $('#popupreg').html('');
    
    //Change the action for the form
    var reload_location = /login|register/.test(window.location) ? FBConnect.home_url : window.location.href;
    var login_location  = FBConnect.home_url + '?action=fblogin&backend=nitro&fbredirect_to='+reload_location;
    $('#registrationform').attr('action',login_location);
    
    //Auto fill with a facebook name
    //FB.Facebook.apiClient.fql_query('SELECT username, first_name, last_name FROM user WHERE uid = me()', FBConnect.fillregform); 
    FBConnect.fillregform();
  },
  fillregform : function(data)
  {
    //if(!data){ return; }
    //var user = data[0];
    FBConnect.user = FBConnect.user_user;
    FBConnect.user.proposed_username = FBConnect.user_username || FBConnect.user_first_name + FBConnect.user_last_name.substring(0,1);
    
    if($('#registrationform').length)
    {
      $('#registrationform #user_login').val(FBConnect.user.proposed_username);
    }
  },
  username_exists : function(username)
  {
    //check username_exists via ajax
    var data = { action: 'username_exists', username: username };
    var exists = false;
    jQuery.ajax({
      type: 'POST',
      url: FBConnect.ajax_url,
      data: data,
      success: function(a,b,c){exists= (a.result != null);},
      async: false,
      dataType : 'json'
    });
    return exists;
  },
  validate_form: function(form)
  {
    var ret = true, el,val, error_container;
    var username = $.trim($(form).find('#user_login').val());
    
    //First check the username
    error_container = '#username_exists_error';
    el = '#user_login';
    if(FBConnect.username_exists(username))
    {
      $(error_container).show();
      $(el).addClass('invalid');
      ret = false;
    }
    else
    {
      $(error_container).hide();
      $(el).removeClass('invalid');
    }
    
    //Next make sure everything is filled out
    var els = $(form).find('input.required, select.required');
    for(var i = 0; i < els.length; i++)
    {
      el = els[i];
      val = $(els[i]).val();
      error_container = /wedding_date/.test(el.id) ? '#wedding_date_error' : '#' + el.id + '_error';
      if(val == '' || val == '0')
      {
        $(el).addClass('invalid');
        $(error_container).show();
        ret = false;
      }
      else
      {
        $(el).removeClass('invalid');
        $(error_container).hide();
      }
    }
    if(ret)
    {
      _gaq.push(['_trackEvent', 'fbconnect', 'registered'])
      //trackEvent("fbconnect","registered");
    }
    return ret;
  },
  logout : function() {
    FB.ensureInit(function() {
       FB.Connect.logout();
    });
  },

  redirect_home : function() {
    window.location = FBConnect.home_url;
  },

  /*
   wordpress specific functions
   */
  setup_feedform : function() {
    
      var comment_form = ge('commentform');
      if (!comment_form) {
        FBConnect.error('unable to locate id=commentform');
        return;
      }

      var orig_submit = ge('submit');
      if (orig_submit && orig_submit.getAttribute('name') === 'submit') {
        /* This is a bit of a hack. The default theme gives the submit
         button an id and name of "submit". This causes it to overwrite
         the .submit() function on the form. The solution is to delete
         the submit button and recreate it with a different id. See
         http://jibbering.com/faq/names/ for more info on why this is
         bad.  */

        var subbutton = document.createElement('input');
        subbutton.setAttribute('name', 'fbc_submit_hack');
        subbutton.setAttribute('type', 'submit');

        // restore the origional name
        subbutton.setAttribute('value', 'Submit Comment');

        comment_form.appendChild(subbutton);

        orig_submit.parentNode.replaceChild(subbutton, orig_submit);

      }

      /*
       * This is pretty terrible but I don't have a better option for
       * detecting a callable on IE since typeof(comment_form.submit)
       * returns object and 'call' in comment_form.submit is false.
       */
      if (comment_form.submit.nodeType) {
        FBConnect.error('unable to find .submit() on commentform');
        return;
      }

      comment_form.onsubmit = function() {
        return FBConnect.show_comment_feedform();
      }
    
  },

  show_comment_feedform : function() {

    var comment_text = '';

    var commentform = ge('commentform');
    if (commentform) {
      // if this isn't present something is seriously wrong
      var comment_box = commentform.comment;
      if (comment_box) {
        comment_text = comment_box.value;
      } else {
        FBConnect.error('unable to locate comment textarea');
        return true;
      }
    } else {
      FBConnect.error('unable to locate comment form, expected id=commentform');
      return true;
    }

    if (comment_text.length === 0) {
      // allow normal submit to complete
      return true;
    }

    //Double check that we are still logged in, we may have logged out since the page was loaded
    //FB.Connect.forceSessionRefresh();
    var stream_popup = function(){ 
      var text = new String(FBConnect.excerpt);
      var attachment = {
        'name': FBConnect.article_title,
        'href': window.location.href,
        'caption': 'A post on the blog ' + FBConnect.blog_name,
        'description': "\"" + text + "\"",
        "media": [{ "type": "image", "src": "http://www-static.weddingbee.com/images/bridepic.jpg", "href": window.location.href }]
      };
      FB.Connect.streamPublish(
        comment_text, // user_message
        attachment, // attachment
        null, // action links
        null, // target_id
        'My Comment', // prompt
          function() {
            // unconditional
            commentform.submit();
          },
        true, //auto_publish
        ''
      );

    };
   
    if(FBConnect.user_logged_in())
    {
      stream_popup();
    }
    else
    {
      return true;
    }
    
    return false;
  },

  user_logged_in : function()
  {
    var a = FB.JSON.deserialize(FBIntern.Cookie.getValue('fbsetting_' + FB.Facebook.apiKey));
    var logged_in =  a && (a.connectState === FB.ConnectState.connected);
    return logged_in;
  },
  error : function(msg) {
    if (FBConnect.debugVerbose) {
      var emsg = 'Error: ' + msg;
      alert(emsg);
    }
  }

};

// end FBConnect
function sfc_login_check() 
{
    FB.Facebook.apiClient.users_hasAppPermission('email',function(res,ex){
      //If we are on the login page, we just want to redirect to the home page
      var reload_func = /login/.test(window.location) ? FBConnect.redirect_home : window.location.reload;
      if( !res ) {
        FB.Connect.showPermissionDialog("email", function(perms) {
          reload_func();
        });
      } else {
        reload_func();
      }
    });
}
  
  
function fbc_onlogout_noauto() {
  fbc_set_visibility_by_class('fbc_hide_on_login', '');
  fbc_set_visibility_by_class('fbc_hide_on_logout', 'none');
}


function fbc_onlogin_noauto() {
  fbc_set_visibility_by_class('fbc_hide_on_login', 'none');
  fbc_set_visibility_by_class('fbc_hide_on_logout', '');
  FBConnect.setup_feedform();
}

function fbc_set_visibility_by_class(cls, vis) {
  var res = document.getElementsByClassName(cls);
  for(var i = 0; i < res.length; ++i) {
    res[i].style.visibility = vis;
  }
}

function ge(elem) {
  return document.getElementById(elem);
}

function init_data_fb(){
  FB.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        FB.api('/me',  function(response) {
            FBConnect.user_user = response;
            FBConnect.user_id = response.id;
            FBConnect.user_email = response.email;
            FBConnect.user_username = response.username;
            FBConnect.user_first_name = response.first_name;
            FBConnect.user_last_name = response.last_name;
            FBConnect.login_or_popup();
         });
       }
    });
}

function fb_subscribe(){
  FB.getLoginStatus(function(response) {
      if (response.status=='not_authorized'){
          FB.login(function(response){
              if (response.status == "not_authorized"){
                alert("You have to authorize the app to continue, try again");
              }else if (response.authResponse) {
                init_data_fb();
              }
          }, {scope: 'email'});
      }else if(response.status=='connected'){
          init_data_fb();
      }else if(response.status=='unknown'){
          FB.login(function(response){
              if (response.status == "unknown"){
                alert("You have to authorize the app to continue, try again");
              }else if (response.authResponse) {
                init_data_fb();
              }
          }, {scope: 'email'});
      }
  });
}

window.fbAsyncInit = function() {
  var strHost = 'www.weddingbee.com';
  /*
  if(window.location.hostname.indexOf('stg-') > -1){
    strHost = 'stg-'+ strHost;
  } else if(window.location.hostname.indexOf('beta-') > -1){
    strHost = 'beta-'+ strHost;
  }
  */
  strHost = window.location.hostname;
    FBConnect.init_Connect('', 'http://'+strHost+'/wp-content/plugins/wp-facebookconnect/', 'http://'+strHost, 0, $("#fb_app_id").val(), '');
    $("#fb_button_id").css("display","inline-block");
};

