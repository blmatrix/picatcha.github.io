/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery( document ).ready(function() {
var s,
sideMenu = {
    settings:{
        signUpBotton:jQuery('#signUpSidMenu'),
        loginSidMenu:jQuery('#loginSidMenu'),
        sideMenuButton :jQuery('#sideMenuButton'),
        sidMenuWb:jQuery('#sidMenuWb'),
        userSidMenu:jQuery('#userSidMenu'),
        sidRegularItem:jQuery(".sidRegularItem"),
	
    },
    init:function(){
        s = this.settings;
        
        this.bindUIActions();
    },
    bindUIActions:function(){
        s.loginSidMenu.on('click',function(){
            jQuery("#log-in-btn").click();
           s.sidMenuWb.hide();
           jQuery('.nav-row-mogu').show();
        });
        s.sideMenuButton.on('click',function(){
            //Verify posistion
           var heightButton = s.sideMenuButton.height();
           var heightFooter = jQuery('#iblogounify_div').height();
           s.sidMenuWb.css('top',heightButton);
           //Set height
           var heightMenu = window.screen.availHeight-heightButton-heightFooter-20;
           if(heightMenu >750){
               heightMenu = 750;
           }
           s.sidMenuWb.css('height',heightMenu);
           jQuery('#main').block({message:''});
           s.sideMenuButton.toggleClass("Rectangle-4 Rectangle-4 active");
           
           jQuery('main').on('click',function(){
		jQuery('#main').unblock();
		s.sidMenuWb.hide('normal');
		jQuery('.nav-row-mogu').show();
                s.sidMenuWb.attr('data-status','off');
                jQuery('#loginSignV2').css('pointer-events','');
                s.sideMenuButton.removeClass("active");
           });
           
           
           if(s.sidMenuWb.attr('data-status') == 'off'){
               s.sidMenuWb.show('slow',function(){
                    //Turn on off nav bar
                    s.sidMenuWb.attr('data-status','on');
                    jQuery('#loginSignV2').css('pointer-events','none');
                    jQuery('#loginSignV2 ul').addClass('Log-in');
               });
           }else{
               s.sidMenuWb.hide('slow',function(){
                    //Turn on off nav bar
                    jQuery('.nav-row-mogu').show();
                    s.sidMenuWb.attr('data-status','off');
		    jQuery('#main').unblock();
                    jQuery('#loginSignV2').css('pointer-events','');
                    jQuery('#loginSignV2 ul').removeClass('Log-in');
               });
           }
        });
	
        s.userSidMenu.on('click',function(){
           jQuery('#userSubItems').toggle(280);
           jQuery("#userSidMenu").find("i").toggleClass("ionicons ion-chevron-right ionicons ion-chevron-down active");
           
        });
        s.sidRegularItem.on('click',function(){
            jQuery('.menuSubItems').not('#'+jQuery( this ).attr('data-category')).hide();
            jQuery('.sidRegularItem').not(this).removeClass("active");
            jQuery('.sidRegularItem').not(this).find("i").removeClass("ionicons ion-chevron-down active").addClass("ionicons ion-chevron-right");
            jQuery('#userSidMenu').find("i").removeClass("ionicons ion-chevron-down active").addClass("ionicons ion-chevron-right");
            
            jQuery('#'+jQuery( this ).attr('data-category')).toggle(280);
            jQuery(this).find("i").toggleClass("ionicons ion-chevron-right ionicons ion-chevron-down active");
            jQuery(this).toggleClass("sidRegularItem sidRegularItem active");
 
           
        });
    },
     
}

sideMenu.init();

    <!-- WB-1575 hiding logo and replacing with search box for mobile devices -->
    jQuery(".search-box .opener").click(function() {
        if (jQuery(window).width() >= 320 && jQuery(window).width() <= 736){

            if (jQuery(".search-box").hasClass("active") ){
                jQuery(".logo").show();
                jQuery(".search-box .opener").css('background','url(/wp-content/themes/skeleton/images/sprite.png) -190px 0');
            } else {
                jQuery(".logo").hide();
                jQuery(".search-box .opener").css('background','url(/wp-content/themes/skeleton/images/icons_v2/Close.png) no-repeat 15px 10px');
            }
        }
    });

    //adding follow and nofollow rel attribute to links
    jQuery("a").each(function() {
        var link = jQuery(this).attr("href");
        if(undefined !== link && (link.indexOf("weddingbee") > -1 || link.indexOf(".com") == -1)) {
            jQuery(this).attr("rel","follow");
        } else {
            jQuery(this).attr("rel","nofollow");
        }
    });


    //todo:: needs to load ajax comments template
    jQuery(".show_comments").live('click', function(event) {
        event.preventDefault();
        jQuery("#list_comments_"+this.id).toggle();
        jQuery(this).closest(".show_comments").find(".glyphicon").toggleClass("glyphicon-chevron-down").toggleClass("glyphicon-chevron-up");
    });

});
