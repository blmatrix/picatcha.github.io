/**
 * hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
 * <http://cherne.net/brian/resources/jquery.hoverIntent.html>
 */
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);

(function($){$.ping=function(a){var i= new Image();i.src=a;};})(jQuery);

Drupal.hw = new Object; // create our own namespace

Drupal.hw.formInit = function(context) {
    $('.formInline', context).each(function () {

        var label_selector = 'label[for='+$(this).attr('id')+']';
        if($(this).val().length > 0)  {
            $(label_selector).addClass("has-text");
        }

        $(this).change(function () {
            if($(this).val().length > 0)  {
                $(label_selector).addClass("has-text");
            } else {
                $(label_selector).removeClass("has-text");
            }
        });

        $(this).focus(function () {
            $(label_selector).addClass("focus");
        });

        $(this).keydown(function (e) {
            if (e.which != 9) { //skip tab
                $(label_selector).addClass('has-text');
            }
        });

        $(this).keyup(function () {
            if($(this).val().length > 0)  {
                $(label_selector).addClass("has-text");
            } else {
                $(label_selector).removeClass("has-text");
            }
        });

        $(this).blur(function () {
            $(label_selector).removeClass('focus');
        });
    });
};

Drupal.hw.ajax = function(context) {
    try {
        if (FB.length && FB.XFBML.length) {
            FB.XFBML.Host.parseDomTree();
        }
    }
    catch(err) {
        //do something
    }

    $('a.interrupt').click(function(event) {
        event.preventDefault();
        Drupal.hw.destination = $(this).attr('href');

        if (!$('#authDivModal').length) {
            $('body').append('<div id="authDivModal" style="display:none;" class="overlay alertStyle"><div id="authDivContent"></div></div>');
        }
        $('#authDivContent').load('/user/auth/loginjs', function() {
            Drupal.attachBehaviors($('#authDivModal'));
            $('#authDivModal').overlay({ expose: {}, closeOnClick: false, api: true}).load();
        });
    });

    $('.ajax a.switch').click(function(event) {
        event.preventDefault();
        $('#authDivContent').load($(this).attr('href'), function() {
            Drupal.attachBehaviors($('#authDivModal'));
        });
    });

    if (Drupal.Ajax != null) {
        Drupal.Ajax.plugins.process_ajax_form = function(hook, args) {
            switch (hook) {
                case 'message':
                    var formId = args.formObj[0].id;
                    switch (formId) {
                        case 'hwsponsor-action-form':
                            if (args['options']['type'] == 'error') {
//              populate();
                            }
                            if (args['options']['type'] == 'status') {
                                $('#sponsorForm').hide();
                                $('#sponsorSuccess').show();
                                setTimeout(function() { $('#sponsorPopup').dialog('close'); }, 5000);
                                return false;
                            }
                            break;
                        case 'user-login':
                        case 'user-register':
                            if (args['options']['type'] == 'error') {
                                errBox = $(".ajax .messageWrapper");
                                if (errBox.length === 0) {
                                    errBox = $("<div class='messageWrapper'>");
                                    $('.ajax h1').after(errBox);
                                }
                                Drupal.Ajax.writeMessage($('.ajax .messageWrapper'), args.submitter, args.options);
                            }
                            return false;
                            break;
                    }
                    break;
                case 'complete':
                    var formId = args.form_id;
                    switch (formId) {
                        case 'user_register':
                        case 'user_login':
                            if (Drupal.hw.destination) {
                                document.location.href = Drupal.hw.destination;
                            }
                            else {
                                document.location.reload();
                            }
                            return false;
                            break;
                    }
                    break;
                case 'scrollFind':
                    return false;
            }
        }
    }
};

Drupal.behaviors.HWForms = Drupal.hw.formInit;
Drupal.behaviors.HWAjax = Drupal.hw.ajax;

//yields the following object: Mobile.Device, Mobile.iPhone, Mobile.iPod, Mobile.iPad, Mobile.Android
var Mobile = {};
Mobile.UA = navigator.userAgent;
Mobile.Device = false;
Mobile.Types = ["iPhone", "iPod", "iPad", "Android"];
for (var d = 0; d < Mobile.Types.length; d++) {
    var t = Mobile.Types[d];
    var type = Mobile.UA.match(new RegExp(t, "i"));
    if (type && type.length) {
        Mobile.DeviceType = type;
        Mobile[t] = true;
        Mobile.Device = true;
    }
}

$(document).ready(function() {

    /* Check text size cookie */
    var textCookie = getCookie('textSize');
    if (textCookie){
        var classListStr = '#mainContent.node, #mainContent.user'
        $(classListStr).css('fontSize', textCookie);
    }

    $("#hdAdvQuestion[title]").tooltip({ position: "bottom center", offset: [10, 0],  effect: 'slide', direction: 'down' });

    /* node teaser methods */
    $('div.node.teaser div.teaserBody').hide();
    $('div.node.teaser').hover(function () {
        $(this).find('div.teaserBody').show();
    }, function () {
        $(this).find('div.teaserBody').hide();
    });

    /* Reference Dimension formatting */
    if ($('#encycData').length) {
        if ($('#encycData').height() < 300){
            $('#encycLink').hide();
        }
        else {
            $('#toggleEncyc').toggle(function () {
                $(this).parents('div.encycData').removeClass('shortened');
                $(this).find('span.toggle').removeClass('expand').addClass('contract');
                $(this).find('span.linkText').text('Hide');
                return false;
            }, function () {
                $(this).parents('div.encycData').addClass('shortened');
                $(this).find('span.toggle').removeClass('contract').addClass('expand');
                $(this).find('span.linkText').text('Read More');
                return false;
            });
        }
    }

    // Check if overflow happens for a given jquery element
    function check_overflow(element) {
        var element_clone = element.clone();

        element.after(element_clone.hide().css({
            'position': 'absolute',
            'width': 'auto',
            'overflow': 'visible',
            'max-width': 'inherit'
        }));

        var has_overflow = element_clone.width() > element.width();

        element_clone.remove();
        return has_overflow;
    }

    /* user profile 'my story' */
    if ($('#myStory').length && $('#myStory').height() > 99) {
        $('#myStoryLink').show();
        $('#toggleMyStory').toggle(function () {
            $(this).parents('#myStory').removeClass('shortened');
            $(this).find('span.toggle').removeClass('expand').addClass('contract');
            $(this).find('span.linkText').text('Hide');
            return false;
        }, function () {
            $(this).parents('#myStory').addClass('shortened');
            $(this).find('span.toggle').removeClass('contract').addClass('expand');
            $(this).find('span.linkText').text('Read More');
            return false;
        });
    }
    else {
        $('#myStoryLink').hide();
    }

    /* HerBooks about the author */
    if ($('#bookAuthor').length && $('#bookAuthor').height() > 99) {
        $('#bookAuthorLink').show();
        $('#toggleBookAuthor').toggle(function () {
            $(this).parents('#bookAuthor').removeClass('shortened');
            $(this).find('span.toggle').removeClass('expand').addClass('contract');
            $(this).find('span.linkText').text('Hide');
            return false;
        }, function () {
            $(this).parents('#bookAuthor').addClass('shortened');
            $(this).find('span.toggle').removeClass('contract').addClass('expand');
            $(this).find('span.linkText').text('Read More');
            return false;
        });
    }
    else {
        $('#bookAuthorLink').hide();
    }

    /* Related Resources Flyout */
    $('.hideLink1').toggle(function() {
        $('.hideList1').show();
        $(this).text('Hide').addClass('contract').removeClass('expand');
    }, function () {
        $('.hideList1').hide();
        $(this).text('More').addClass('expand').removeClass('contract');
    });

    /* Related Topics Flyout */
    $('.hideLink2').toggle(function() {
        $('.hideList2').show();
        $(this).text('Hide').addClass('contract').removeClass('expand');
    }, function () {
        $('.hideList2').hide();
        $(this).text('More').addClass('expand').removeClass('contract');
    });

    /* AutoFocus */
    $('.autoFocus:first').focus();

    /* Generic window close link */
    $('a.closeWindow').click(function(event) {
        event.preventDefault();
        window.close();
    });

    /* Open Comments form */
    $('#comments .addComment').click(function(event) {
        $('#comments .box').slideDown(2000);
        $('html, body').animate({
          scrollTop: $("#comment-form").offset().top -100
        }, 2000);
        $('#comments .addCommentBottom').hide();
    });

    /* DFP Popup ad */
    if ( $('#div-gpt-ad-1429823341605-9').length) {
      setTimeout(function()
      {
        if (($('#div-gpt-ad-1429823341605-9 iframe').height() > 1) || ($("#div-gpt-ad-1429823341605-9 iframe").attr('height') > 1)) {
          $jq("#sponsorPopup").modal('show');
        }
      }, 2000);
    }

    /* reuters manage select all */
    if ($('#manageReuters').length) {
        $('#selectAll').click(function(){
            if (this.checked) {
                $('#articles input').attr('checked', true);
            }
            else {
                $('#articles input').attr('checked', false);
            }
        });
    }

    $('#registerMessage').click(function(event) {
        event.preventDefault();
        $.get('/user/<?php print $user->uid?>/dismiss-register', function() {
            $('#registerMessage').slideUp('slow');
            if ( $(event.target).is('a.message')) {
                document.location.href = $(event.target).attr('href');
            }
        });
    });

    $("#closeWarning").click(function ( event ) {
        event.preventDefault();
        $("#siteWarning").hide();
    });

    //Fade in social buttons once onload is done
    $('.addthis_toolbox').delay(1000).fadeIn(1000);
});

Drupal.hw.cleanstring = function(str) {
    // remove punctuation
    var punctuation = ['"', '\'', '`', ',', '.', '-', '_', ':', ';', '|', '{', '[', '}', ']',
        '+', '=', '*', '&', '%', '^', '$', '#', '@', '!', '~', '(', ')', '?', '<', '>', '\\' ];
    for (i = 0; i < punctuation.length; i++) {
        str = str.replace(punctuation[i], '');
    }
    if (!str.length) {
        return;
    }

    str = str.trim();

    // Reduce to the subset of ASCII96 letters and numbers
    var pattern = new RegExp('[^a-zA-Z0-9 ]', 'g');
    str = str.replace(pattern, '-');

    // remove stop words
    var ignoreWords = [ 'a', 'an', 'as', 'at', 'before', 'but', 'by', 'for', 'from', 'is', 'in',
        'into', 'like', 'of', 'off', 'on', 'onto', 'per', 'since', 'than', 'the',
        'this', 'that', 'to', 'up', 'via', 'with'];
    for (i = 0; i < ignoreWords.length; i++) {
        pattern = new RegExp('\\b' + ignoreWords[i] + '\\b', "gi");
        str = str.replace(pattern, '-');
    }
    str = str.trim();

    // replace whitespace
    str = str.replace(new RegExp('\\s+', 'g'), '-').trim();

    // replace leading or trailing hyphens
    str = str.replace(new RegExp('^\\-+|\\-+$', 'g'), '').trim();

    // replace multiple hypens
    str = str.replace(new RegExp('\\-+', 'g'), '-').trim();

    // lowercase
    str = str.toLowerCase();

    return str;
};

function resizeText(multiplier) {

    var classListStr = '#mainContent.node, #mainContent.user';
    if ($(classListStr) == '') {
        $(classListStr).css('fontSize', '14px');
    }
    var textSize = parseFloat($(classListStr).css('fontSize')) + (multiplier * 2);
    // sensible minimum and maximum size limits
    if (textSize >= 24){
        textSize = 14
    }
    textSize = textSize + 'px';
    $(classListStr).css('fontSize', textSize);
    // expire in 30 days
    cookieExpireSecs = (60 * 60 * 24 * 30);
    setCookie('textSize', textSize, cookieExpireSecs);
}

function navHoverOver(e) {
    $(this).addClass('current');
    $(this).find('.flyDown').stop().fadeTo('fast', 1, function() {$(this).show();});
}

function navHoverOff(e) {
    $(this).removeClass('current');
    $(this).find('.flyDown').stop().fadeTo('fast', 0, function() {$(this).hide();});
}

function ucfirst(string) {
    if (string.length == 0) return '';
    var first = string.substr(0,1).toUpperCase();
    return first+string.substr(1);
}
function lcfirst(string) {
    if (string.length == 0) return '';
    var first = string.substr(0,1).toLowerCase();
    return first+string.substr(1);
}

function setCookie(name, value, expiresecs, path, domain, secure) {

    if (expiresecs) {
        expiresecs = expiresecs * 1000;
        var expires = new Date();
        expires.setTime(expires.getTime() + expiresecs);
    }

    document.cookie = name + "=" +escape( value ) +
        ( expires ? ";expires=" + expires.toUTCString() : "" ) +
        ( path ? "; path=" + path : "; path=/" ) +
        ( domain ? "; domain=" + domain : "" ) +
        ( secure ? "; secure" : "" );
}

function getCookie(name){

    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0){
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}


// Site skin bg adjustment
function displaySiteSkinAd(){

    if (siteSkin = document.getElementById("siteSkin")) {
      if (siteSkin.getElementsByTagName('iframe')[0]) {
        skinWidth = (siteSkin.getElementsByTagName('iframe')[0].clientWidth);
        windowWidth = $(window).width();
        windowDiff = (windowWidth - skinWidth) / 2;
        if (windowWidth < skinWidth) {
            siteSkin.style.left = windowDiff + "px";
            siteSkin.style.width = (windowWidth - windowDiff) + "px";
        }
        else {
            siteSkin.style.left = null;
            siteSkin.style.width = null;
        }
    }
    }
};

window.onload = displaySiteSkinAd;
//Fade in siteskin once onload is done
$(window).load(function(){$('#siteSkin').fadeIn(1000);});
window.onresize = displaySiteSkinAd;

function modifyContactForm(name) {
    // hide all
    var contactDivs = new Array('#contactForm','#promoteText','#blogText', '#writerText');
    for (i = 0;i<contactDivs.length;i++){
        $(contactDivs[i]).hide();
    }
    switch (name) {
        case 'other':
            $('#contactForm').show();
            break;
        case 'promote':
            $('#promoteText').show();
            break;
        case 'blog':
            $('#blogText').show();
            break;
        case 'writer':
            $('#writerText').show();
            break;
    }
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

// Header animation

var smallMenu = false;

$(window).scroll(function(){
  if($('body').width() > 767) {
    if($(window).scrollTop() > 10)
    {
      if(smallMenu === false)
      { 
        smallMenu = true;
        $('#logo').stop().animate({width: '72px', height: '70px', left: '1px'}, 300);
        $('.main-nav .container-fluid').stop().animate({marginLeft: '86px'}, 300);
      }
    }       
    else 
    {
      if(smallMenu === true)
      { 
        smallMenu = false;
        $('#logo').stop().animate({width: '180px', height: '95px', left: '0'}, 300);
        $('.main-nav .container-fluid').stop().animate({marginLeft: '200px'}, 300);
      }
    }
  } else {
    $('.main-nav .container-fluid').css({marginLeft: '0px'});
  }
});

$(window).resize(function(){
  if($('body').width() > 767) {
    if(smallMenu === true)
    { 
      $('#logo').css({width: '72px', height: '70px', left: '1px'}, 300);
      $('.main-nav .container-fluid').css({marginLeft: '86px'}, 300);
    }
    else if(smallMenu === false)
    { 
      $('#logo').css({width: '180px', height: '95px', left: '0'}, 300);
      $('.main-nav .container-fluid').css({marginLeft: '200px'}, 300);
    }
  } else {
    $('.main-nav .container-fluid').css({marginLeft: '0px'});
  }
});

// Element fully in viewport - http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
function isElementInViewport (el) 
{
  //special bonus for those using jQuery
  if (typeof jQuery !== 'undefined' && el instanceof jQuery) el = el[0];

  var rect = el.getBoundingClientRect();
  var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  var windowWidth = (window.innerWidth || document.documentElement.clientWidth);

  return (
       (rect.left >= 0)
    && (rect.top >= 0)
    && ((rect.left + rect.width) <= windowWidth)
    && ((rect.top + rect.height) <= windowHeight)
  );
}

$.fn.scrollBottom = function() { 
  return $(document).height() - this.scrollTop() - this.height(); 
};

$(document).ready(function() {
  // Sticky right rail ad and refresh when scrolled back into view

  var el = $('#sticky-wrap');
  var stickyTop = $('#sticky-wrap').offset().top;
  $(window).bind('load resize', function(e) {
    stickyTop = $('#sticky-wrap').offset().top; // updates when all assets are loaded or resized
  });
  var lastScrollTop = 0; //http://stackoverflow.com/questions/4326845/how-can-i-determine-the-direction-of-a-jquery-scroll-event
  var lastScrollBot = 0;
  var topReached = 0;
  var botReached = 0;
  var refreshUp = true;
  var refreshUpLeft = true;
  var refreshDown = true;

  $(window).bind('load resize scroll', function(e) { // if window resized or scrolled
    var docheight = $(document).height();
    var windowTop = $(window).scrollTop();
    var windowBot = $(window).scrollBottom();
    var limit = docheight - $('footer').outerHeight() - $('#adBottom').outerHeight() - $('#sticky-wrap').outerHeight() - 50;
    var diff = limit - windowTop;
    var st = $(this).scrollTop();
    var sb = $(this).scrollBottom();

    if ($('body').hasClass('hub') && ($('.left-column').height() > $('.right-column').height()) && ($(window).width() > 767)) { // rechecking heights and width on any change
      if ($('#adRightTop').length) { // make sure ad exists
        if (stickyTop < (windowTop + 80)) {
           el.css({ position: 'fixed', top: 80, 'max-width': 300 });
        }
        else {
           el.css('position','static');
        }

        if ((limit - 80) < windowTop) {
          el.css({top: diff});
        }
      }
    } else if (($('.left-column').height() > $('.right-column').height()) && ($(window).width() > 767)) { // rechecking heights and width on any change
      if ($('#adRightTop').length) { // make sure ad exists
        if (stickyTop < (windowTop + 102)) {
           el.css({ position: 'fixed', top: 102, 'max-width': 300 });
        }
        else {
           el.css('position','static');
        }

        if ((limit - 80) < windowTop) {
          el.css({top: diff});
        }
      }
    } else {
      el.removeAttr('style');
    }

    if ($('#adRightTop').length) { // make sure ad exists
      if (refreshUp && (st < lastScrollTop) && ((limit - 40) < windowTop) && isElementInViewport(document.getElementById('adRightTop'))) { //https://techpunch.co.uk/development/refresh-google-dfp-ads
        refreshAds([slots['flexTop']]);
        refreshUp = false;
      }
      if (refreshDown && (st > lastScrollTop) && (windowTop > (limit / 2)) && isElementInViewport(document.getElementById('adRightTop'))) { //https://techpunch.co.uk/development/refresh-google-dfp-ads
        refreshAds([slots['flexTop']]);
        refreshDown = false;
      }
    }

    if ($('#adTop').length) { // make sure ad exists
      if ((st < lastScrollTop) && (topReached > 0) && isElementInViewport(document.getElementById('adTop'))) {
        refreshAds([slots['Top']]);
      }
    }

    if ($('#adBottom').length) { // make sure ad exists
      if ((sb < lastScrollBot) && (botReached > 0) && isElementInViewport(document.getElementById('adBottom'))) {
        refreshAds([slots['Bottom']]);
      }
    }

    if ($('#adLeft').length) { // make sure ad exists
      if (refreshUpLeft && (st < lastScrollTop) && isElementInViewport(document.getElementById('adLeft'))) { //https://techpunch.co.uk/development/refresh-google-dfp-ads
        refreshAds([slots['Left']]);
        refreshUpLeft = false;
      }
    }

    lastScrollTop = st;
    lastScrollBot = sb;

    if (windowTop == 0) { // count when scroll hits top of page
      topReached++;
      refreshDown = true;
      refreshUpLeft = true;
    }

    if (windowBot == 0) { // count when scroll hits bottom of page
      botReached++;
      refreshUp = true;
    }

  });
});