(function(){
  
  var CLASSES = {
    FIXED: 'isFixed',
    ANIM: 'anim',
    LOGO_SMALL: 'logo-small'
  };
  
  var Header = function($element) {
    // Return early if no element is passed in.
    if (!$element.length) {
      return;
    }
    
    /**
     * $element
     *
     * jQuery object referencing the header.
     */
    this.$element = $element;
    
    /**
     * Scroll Position
     *
     * Intial reference to the scroll position of
     * the Window. Used to track current position
     * in calculations of whether or not the window
     * is scrolling up or down.
     */
    this.scrollPos = null;
    
    /**
     * Last Position
     *
     * Initial reference to the last scroll position
     * of the user. Used to calculate if the scroll is
     * going up or down.
     */
    this.lastPos = null;
    
    /**
     * Delta
     *
     * Number of pixels you have to scroll until 
     * a scroll up or down event is recorded.
     * 
     * Contastant value, determined by user.
     */
    this.delta = 65;
    
    /**
     * Header Height
     *
     * The height of the full header element. Initially
     * set to null but will be caluclated. Set here
     * because responsive navs can necessitate an upate of
     * this value based on breakpoints.
     */
    this.headerHeight = null;
    
    /**
     * Top Height
     *
     * Initial reference to the height of the top part 
     * of the header. Used because there is a sub nav that
     * needs to attach itself to the top of the window at
     * whenever the window scrolls past it.
     */
    this.topHeight = null;
    
    /**
     * Past Header
     *
     * Initial reference to a boolean value that is defined
     * so that we know once the navhas been scrolled past.
     * This is useful because the header is relatively positioned
     * then fixed position so knowing when we have crossed that
     * boundary is a requirement of functionality
     */
    this.pastHeader = null;
    
    /**
     * Header Shown
     *
     * Initial reference to a boolean value that indicates
     * whether or not the nav is revealed to the user.
     */
    this.headerShown = null;
    
    // Initialize the view
    this.init();
  };
  
  // Alias prototype
  var proto = Header.prototype;
  
  /**
   * Init
   *
   * Top level function that initializes the view
   */
  proto.init = function() {
    this.setupHandlers()
        .createChildren()
        .enable();
  };
  
  /**
   * Setup Handlers
   *
   * Setups event handlers to bind the
   * value of 'this' properly.
   */
  proto.setupHandlers = function() {
    this.pageScrollHandler = this.pageScroll.bind(this);
    this.windowResizeHandler = this.windowResize.bind(this);
    
    return this;
  };
  
  /**
   * Create Children
   *
   * Creates jQuery objects of each of the
   * children that we need select.
   */
  proto.createChildren = function() {
    this.$wrapper = this.$element.find('.js-wrapper');
    this.$top = this.$element.find('.js-top');
    this.$bottom = this.$element.find('.js-bottom');
    this.$window = $(window);
    this.$mainLogo = this.$element.find('#main-logo');
    this.$sidMenu = $('#sidMenuWb');
    return this;
  };
  
  /**
   * Enable
   *
   * Intial calculations and event watchers added here.
   */
  proto.enable = function() {
    // Scroll Event
    this.$window.on('scroll', this.pageScrollHandler);
    this.$window.on('resize', this.windowResizeHandler);
    
    // Set Last Position on load. Good for when the browser loads
    // at the old scroll positon on refresh.
    this.lastPos = this.$window.scrollTop();
    
    // Run the calc heights function
    this.calcHeights();
    
    return this;
  };
  
  /**
   * Window Resize
   *
   * Event for window resizing. Re-calculates the 
   * heights that are necessary in other functions.
   */
  proto.windowResize = function() {
    this.calcHeights();
  };
  
  /**
   * Page Scroll
   *
   * A function that sets the value of this.scrollPos
   * on scroll and also determines the direction of the
   * scroll.
   */
  proto.pageScroll = function() {
    // Set current scroll position with new value;
    this.scrollPos = $(window).scrollTop();
    
    if (this.scrollPos >= this.topHeight && !this.pastHeader) {
      this.$wrapper.addClass(CLASSES.FIXED);
      this.$mainLogo.addClass(CLASSES.LOGO_SMALL);
      this.hideNav();
      this.setHeaderScrollVars(true);
    } else if (this.scrollPos <= 0 && this.pastHeader) {
      this.$wrapper.removeClass(CLASSES.FIXED + ' ' + CLASSES.ANIM);
      this.$mainLogo.removeClass(CLASSES.LOGO_SMALL);
      this.showNav();
      this.setHeaderScrollVars(false);
    }
    
    // Return early if below delta limit
    if (Math.abs(this.lastPos - this.scrollPos) <= this.delta) {
      return;
    }
    
    // Call the correct directional scroll event
    if (this.scrollPos > this.lastPos && this.pastHeader){
      this.$wrapper.addClass(CLASSES.ANIM);
      this.scrollDown();
    } else if (this.pastHeader){
      this.scrollUp();
    }
    this.lastPos = this.scrollPos;
  };
    
  
  /**
   * Set Header Scroll Vars
   *
   * This function is in charge of setting this.pastHeader
   * and this.headerShown when the scroll position is past
   * the header and when the scroll position is back at the
   * top of the page. A setTimeout() function is invoked so
   * that these variables are set before proceeding along with
   * any other tasks in the view in order to prevent animation
   * jumping. Animation jumping occurs when the 'anim' class
   * (CLASS.ANIM) is applied to the header which is receiving
   * new values via the showNav() function and it "jumps" and looks
   * awkward. This just prevents that from happening, which is nice.
   */
  proto.setHeaderScrollVars = function(bool) {
    var self = this;
    setTimeout(function(){
      if (bool) {
        self.pastHeader = true;
        self.headerShown = false;
      } else {
        self.pastHeader = false;
        self.headerShown = true;      
      }
    }, 10);
    

  };
  
  /**
   * Scroll Down
   *
   * Function that hides the header and sets the 
   * this.headerShown boolean value to false
   */
  proto.scrollDown = function() {
    if (this.headerShown) {
      this.hideNav();
      this.headerShown = false;
    }    
  };
  
  /**
   * Scroll Up
   *
   * Function that reveals the header and sets the 
   * this.headerShown boolean value to true
   */
  proto.scrollUp = function() {
    var smStatus = this.$sidMenu.attr('data-status');
    if (!this.headerShown && smStatus == 'off') {
      this.showNav();
      this.headerShown = true;
    }
    if(smStatus == 'on'){
      this.hideNav();
      this.headerShown = false;
    }
  };
  
  /**
   * Calculate Heights
   *
   * Function that calculates all the necessary heights for 
   * this header to function properly
   */
  proto.calcHeights = function() {
    // The height of the whole header, but 
    // measured from the wrapper.
    this.headerHeight = this.$wrapper.outerHeight();
    this.$element.height(this.headerHeight);
    
    // Top height to know when to stick the nav
    this.topHeight = this.$top.outerHeight();
  };
  
  /**
   * Hide Nav
   *
   * Adjusts a CSS value on the this.$wrapper to hide only the top
   * portion of the header. The animation is controlled by the 'anim'
   * class (CLASSES.ANIM).
   */
  proto.hideNav = function() {
        this.$wrapper.css({
        '-webkit-transform': 'translateY(-' + this.topHeight + 'px)',
        '-moz-transform': 'translateY(-' + this.topHeight + 'px)',
        '-ms-transform': 'translateY(-' + this.topHeight + 'px)',
        '-o-transform': 'translateY(-' + this.topHeight + 'px)',
        'transform': 'translateY(-' + this.topHeight + 'px)'
    })
  };
  
  /**
   * Show Nav
   *
   * Adjusts a CSS value on the this.$wrapper to show the whole header.
   * The animation is controlled by the 'anim' class (CLASSES.ANIM).
   */
  proto.showNav = function() {
    this.$wrapper.attr('style','');
    return this;
  };
  
  return new Header($('.js-header'));
  
})();