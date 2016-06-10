$(document).ready(function(){

  $('.imagePopup').click(function(){
    var rel = $(this).attr('rel');
    $(rel).appendTo('body');
    $('.imagePopup[rel]').overlay({ expose: {}, fixed: false});
  });

  // User dashboard
  if ($('#removeCOIbutton').length) {
    $('#removeCOIbutton').appendTo('body');
    $('#removeCOIbutton[rel]').overlay({ expose: {}, closeOnClick: false});
    $('#confirmCOIdelete a.confirm').click(function () {
      document.location = $(this).attr('rel'); return false;
    });
  }
  if ($('#userGroups').length) { // wrapper div
    $('.leaveConfirm').appendTo('body');
    $('a.xOut[rel]').overlay({ expose: {}, closeOnClick: false});
    $('.leaveConfirm a.confirm').click(function () {
      document.location = $(this).attr('rel'); return false;
    });
  }
  if ($('#leaveConfirm').length) { // wrapper div
    $('#leaveConfirm').appendTo('body');
    $('a.remove[rel]').overlay({ expose:{}, closeOnClick: false});
    $('#leaveConfirm a.confirm').click(function () {
      document.location = $(this).attr('rel'); return false;
    });
  }
  if ($('#selectCOI').length) {
    $('#selectCOI').appendTo('body');
    $('#selectCOI').overlay({ expose: {}, closeOnClick: false, api: true}).load();
  }


  if($('.removeConfirm').length){
    $('.removeConfirm').appendTo('body');
    $('a.xOut[rel]').overlay({ expose: {}, closeOnClick: false});
    $('.removeConfirm a.confirm').click(function () {
		  document.location = $(this).attr('rel'); return false;
    });
    $('.removeConfirm a.remove').click(function () {
		  document.location = $(this).attr('rel'); return false;
		});
  }

  if($('.hwprovider_popup').length) {
    $('a[href^=http]').click(function(e) {

      //Save link that was clicked
      var link = $(this).attr('href');

      //Prevents link from being fired
      e.preventDefault();

      //Show popup
      $('.hwprovider_popup').overlay({ expose: {}, closeOnClick: true, api: true}).load();
      
      //If the ok button on the popup is clicked fire off link
      $('.hwprovider_popup button').click(function(){
        window.location = link;
      });
    });
  }

  // Social sharing popup modal
  if ($('#shareModal').length) {

    $('#shareModal').overlay({
      expose: {},
      onClose:function(){
        if ($('#authDivModal').length) {
          $("#authDivModal").overlay({ expose: {}, closeOnClick: false, api: true}).load();

          //Contest modal
          $('a.signupPromo').click(function() {
            $('#signupModal form').attr('action', '/user/register'); // strip any destination
            $("#signupModal").overlay({ expose: {}, closeOnClick: false, api: true}).load();
            return false;
          });
        }
      },
      closeOnClick: false,
      api:true
    }).load();

    $('.closeSocial').click(function(){
      $('#shareModal').overlay({
        onClose:function(){
          if ($('#authDivModal').length) {
            $("#authDivModal").overlay({ expose: {}, closeOnClick: false, api: true}).load();

            //Contest modal
            $('a.signupPromo').click(function() {
              $('#signupModal form').attr('action', '/user/register'); // strip any destination
              $("#signupModal").overlay({ expose: {}, closeOnClick: false, api: true}).load();
              return false;
            });
          }
        }
      }).close();
      return false;
    });

    function eventHandler(event){
      if(event.type == 'addthis.menu.share'){
        $('#shareModal').overlay({
          onClose:function(){
            if ($('#authDivModal').length) {
              $("#authDivModal").overlay({ expose: {}, closeOnClick: false, api: true}).load();

              //Contest modal
              $('a.signupPromo').click(function() {
                $('#signupModal form').attr('action', '/user/register'); // strip any destination
                $("#signupModal").overlay({ expose: {}, closeOnClick: false, api: true}).load();
                return false;
              });
            }
          }
        }).close();
      }
    }
    addthis.addEventListener('addthis.menu.share', eventHandler);

  } else {
    if ($('#authDivModal').length) {
      $("#authDivModal").overlay({ expose: {}, closeOnClick: false, api: true}).load();

      //Contest modal
      $('a.signupPromo').click(function() {
        $('#signupModal form').attr('action', '/user/register'); // strip any destination
        $("#signupModal").overlay({ expose: {}, closeOnClick: false, api: true}).load();
        return false;
      });
    }
  }



  // show IE6 warning
//  if ($('#upgradeBrowser').length) {
//    $("#upgradeBrowser").overlay({ expose: {}, closeOnClick: false, api: true}).load();
//   }
  
  // Sponsor modal - still uses JQuery UI because we haven't ported effects
  //if ($('#sponsorPopup').length) {
  //  $('#sponsorPopup').dialog({bgiframe: true, autoOpen: false, width: 350, show: 'blind', hide: 'blind', dialogClass: //"sponsorPopupWrapper"});
  //  setTimeout(function() { $('#sponsorPopup').dialog('open'); }, 1000);
  //  setTimeout(function() { $('#sponsorPopup').parent().animate({ marginLeft: "+=160px", marginTop: "+250px" }, 1000 ); }, 1000);
  //  $('#closeSponsorPopup').click(function() { $('#sponsorPopup').dialog('close'); setCloseCookie(); return false;}); // setCloseCookie function defined inline
  //  $('#sponsorPopup').parent().find('a.ui-dialog-titlebar-close').click(setCloseCookie);
  //}
  
  // Advocacy points list modal
  if ($('a.pointsPopup').length) {
    if (!$('#pointsPopup').length) {
      $('body').append('<div id="pointsPopup" style="display:none;" class="overlay alertStyle"><div id="pointsPopupContent"></div></div>');
    }
    var loaded = false;
    $('a.pointsPopup').click(function(event) {
      event.preventDefault();
      if (!loaded) {
        $('#pointsPopupContent').load('/advocacy/points_listjs', function() {
          Drupal.attachBehaviors($('#pointsPopup'));
          $('#pointsPopup').overlay({ closeOnClick: true, fixed: false, api: true}).load();
          loaded = true;
        });
      }
      else {
    	$('#pointsPopup').overlay({ expose: {}, closeOnClick: false, api: true}).load();
      }
    });
  }

});


