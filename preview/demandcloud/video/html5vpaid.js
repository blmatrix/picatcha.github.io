/**
 * @constructor
 */
var VpaidVideoPlayer = function() {
  /**
   * The slot is the div element on the main page that the ad is supposed to
   * occupy.
   * @type {Object}
   * @private
   */
  this.slot_ = null;

  /* Version tag */
  this.version_ = 0.68;

  /**
   * The video slot is the video element used by the ad to render video content.
   * @type {Object}
   * @private
   */
  this.videoSlot_ = null;

  /**
   * An object containing all registered events.  These events are all
   * callbacks for use by the VPAID ad.
   * @type {Object}
   * @private
   */
  this.eventsCallbacks_ = {};

  /* Ad Duration */
  this.adDuration = -1;

  /**
   * A list of getable and setable attributes.
   * @type {Object}
   * @private
   */
  this.attributes_ = {
    'companions' : '',
    'desiredBitrate' : 256,
    'duration': 10,
    'expanded' : false,
    'height' : 0,
    'icons' : false,
    'linear' : true,
    'remainingTime' : 10,
    'skippableState' : true,
    'viewMode' : 'normal',
    'width' : 0,
    'volume' : 1.0
  };

  /**
   * @type {?number} id of the interval used to synch remaining time
   * @private
   */
  this.intervalId_ = null;

  /**
   * A set of events to be reported.
   * @type {Object}
   * @private
   */
  this.quartileEvents_ = [
    {event: 'AdImpression', value: 0},
    {event: 'AdVideoStart', value: 0},
    {event: 'AdVideoFirstQuartile', value: 25},
    {event: 'AdVideoMidpoint', value: 50},
    {event: 'AdVideoThirdQuartile', value: 75},
    {event: 'AdVideoComplete', value: 100}
  ];

  /**
   * @type {number} An index into what quartile was last reported.
   * @private
   */
  this.lastQuartileIndex_ = 0;

  /**
   * An array of urls and mimetype pairs.
   *
   * @type {!object}
   * @private
   */
  this.parameters_ = {};
};


/**
 * VPAID defined init ad, initializes all attributes in the ad.  The ad will
 * not start until startAd is called.
 *
 * @param {number} width The ad width.
 * @param {number} height The ad heigth.
 * @param {string} viewMode The ad view mode.
 * @param {number} desiredBitrate The desired bitrate.
 * @param {Object} creativeData Data associated with the creative.
 * @param {Object} environmentVars Variables associated with the creative like
 *     the slot and video slot.
 */
VpaidVideoPlayer.prototype.initAd = function(
    width,
    height,
    viewMode,
    desiredBitrate,
    creativeData,
    environmentVars) {
  // slot and videoSlot are passed as part of the environmentVars
  this.attributes_['width'] = width;
  this.attributes_['height'] = height;
  this.attributes_['viewMode'] = viewMode;
  this.attributes_['desiredBitrate'] = desiredBitrate;
  this.slot_ = environmentVars.slot;
  this.videoSlot_ = environmentVars.videoSlot;

  // AdSlot document and window
  this.adDoc_ = window.adDoc = this.slot_.ownerDocument;
  if(this.adDoc_) {
    this.adWindow_ = window.adWindow = this.adDoc_.defaultView || this.adDoc_.parentWindow;
  }

  // Parse the incoming parameters.
  this.parameters_ = JSON.parse(creativeData['AdParameters']);
  if(this.parameters_.adDuration) {
    this.adDuration = this.parameters_.adDuration;
  }

  if(this.parameters_.placementId) {
    window.adWindow.placementId = this.parameters_.placementId;
    window.adWindow.templateKey = (this.parameters_.templateKey) ? this.parameters_.templateKey : null;
    window.adWindow.pub = (this.parameters_.pub) ? this.parameters_.pub : null;
  }

  this.log('initAd ' + width + 'x' + height +
      ' ' + viewMode + ' ' + desiredBitrate);

  this.updateVideoSlot_();

  this.videoSlot_.addEventListener(
      'timeupdate',
      this.timeUpdateHandler_.bind(this),
      false);

  this.videoSlot_.addEventListener(
      'ended',
      this.stopAd.bind(this),
      false);

  this.videoSlot_.addEventListener(
      'play',
      this.videoResume_.bind(this),
      false);

  this.callEvent_('AdLoaded');
};


/**
 * Called when the overlay is clicked.
 * @private
 */
VpaidVideoPlayer.prototype.overlayOnClick_ = function() {
  if ('AdClickThru' in this.eventsCallbacks_) {
    this.eventsCallbacks_['AdClickThru']('','0', true);
  };
};


/**
 * Called by the video element.  Calls events as the video reaches times.
 * @private
 */
VpaidVideoPlayer.prototype.timeUpdateHandler_ = function() {
  this.attributes_['remainingTime'] = this.videoSlot_.duration - this.videoSlot_.currentTime;
  this.log('timeupdate received : currentTime ='+this.videoSlot_.currentTime+ '  duration = '+this.videoSlot_.duration);
  if (this.lastQuartileIndex_ >= this.quartileEvents_.length) {
    return;
  }

  var percentPlayed = this.videoSlot_.currentTime * 100.0 / this.videoSlot_.duration;
  if (percentPlayed >= this.quartileEvents_[this.lastQuartileIndex_].value) {
    var lastQuartileEvent = (this.quartileEvents_[this.lastQuartileIndex_]) ? this.quartileEvents_[this.lastQuartileIndex_].event : null;
    if(lastQuartileEvent && this.eventsCallbacks_[lastQuartileEvent]) {
      this.eventsCallbacks_[lastQuartileEvent]();
      this.lastQuartileIndex_ += 1;
    }
  }

  if (this.attributes_['duration'] != this.videoSlot_.duration) {
    this.adDuration = this.attributes_['duration'] = this.videoSlot_.duration;
    this.callEvent_('AdDurationChange');
  }
};


VpaidVideoPlayer.prototype.addNativeAdContainer = function() {
  // Ad overlay
  overlay = this.overlay = this.adDoc_.createElement('div');
  overlay.id = 'ad-overlay';
  this.slot_.appendChild(overlay);

  // Skip Ad Button
  skipBtnStr = '<div id="skipad" class="skipad skipad-outline color">SKIP AD<span class="lines"></span></div>';
  overlay.innerHTML += skipBtnStr;

  // Brand
  brandStr = `<div class='branding'>
      <p class='powered'>
        POWERED BY
        <img src="https://s3.amazonaws.com/adsnative-logos/Polymorph-Mark.png" alt="Logo" class="logo" />
      </p>
    </div>`;
  overlay.innerHTML += brandStr;

  // Ad container
  adContainer = this.adContainer = this.adDoc_.createElement('div');
  adContainer.className = 'ad-container';
  overlay.appendChild(adContainer);

  // Ad placeholder
  var adDisplay = this.adDoc_.createElement('div');
  adDisplay.id = 'ad-display';
  adContainer.appendChild(adDisplay);

  // Styles
  var stylesheet = this.adDoc_.createElement('link');
  stylesheet.setAttribute('rel', 'stylesheet');
  stylesheet.setAttribute('type', 'text/css');
  stylesheet.setAttribute('href', 'https://docs.getpolymorph.com/preview/demandcloud/video/html5vpaid.css');
  overlay.appendChild(stylesheet);

  // Ad Fuse
  adFuse = this.adFuse = this.adDoc_.createElement('div');
  adFuse.className = 'ad-fuse';
  adFuse.id = 'ad-fuse';
  overlay.appendChild(adFuse);
  this.adFuse = this.adDoc_.getElementById('ad-fuse');
  if(this.adFuse) {
    // Code for Safari 3.1 to 6.0
    this.adFuse.addEventListener("webkitAnimationEnd", this.showSkipAd.bind(this), false);
    // Standard syntax
    this.adFuse.addEventListener("animationend", this.showSkipAd.bind(this), false);
  }

  adsnativetag = this.adWindow_.adsnativetag = this.adWindow_.adsnativetag || {};
  adsnativetag.cmdQ = this.adWindow_.adsnativetag.cmdQ = this.adWindow_.adsnativetag.cmdQ || [];

  var pmads = this.adDoc_.createElement('script');
  pmads.async = true;
  pmads.type = 'text/javascript';
  pmads.src = 'https://static.adsnative.com/static/js/render.v2.js';
  overlay.appendChild(pmads);
}

/**
 * @private
 */
VpaidVideoPlayer.prototype.updateVideoSlot_ = function() {
  if (this.videoSlot_ == null) {
    this.videoSlot_ = document.createElement('video');
    this.log('Warning: No video element passed to ad, creating element.');
    this.slot_.appendChild(this.videoSlot_);
  }

  var foundSource = false;
  var videos = this.parameters_.videos || [];
  for (var i = 0; i < videos.length; i++) {
    // Choose the first video with a supported mimetype.
    if (this.videoSlot_.canPlayType(videos[i].mimetype) != '') {
      this.videoSlot_.setAttribute('src', videos[i].url);
      foundSource = true;
      this.log('Video source from <attributes> loaded into player');
      this.log('Video duration : '+ this.videoSlot_.duration);
      break;
    }
  }
  if (!foundSource) {
    // Unable to find a source video.
    this.callEvent_('AdError');
  }

  adsnativetag = this.adWindow_.adsnativetag = this.adWindow_.adsnativetag || {};
  adsnativetag.cmdQ = this.adWindow_.adsnativetag.cmdQ = this.adWindow_.adsnativetag.cmdQ || [];

  var pmads = this.adDoc_.createElement('script');
  pmads.async = true;
  pmads.type = 'text/javascript';
  pmads.src = 'https://static.adsnative.com/static/js/render.v2.js';
  this.slot_.appendChild(pmads);

  // Fetch Ad
  this.adWindow_.adsnativetag.cmdQ.push(function() {
      if(!window.adWindow) {
        console.log('Instream Multiform Ad Window reference error');
        return;
      }

      if(!window.adWindow.placementId) {
        console.log('No placement id configured for In-Stream Native-Ads VPAID tag');
        return;
      }

      if(!window.adWindow.pub) {
        console.log('Loading Polymorph - '+ window.adWindow.pub + ' VPAID tag');
      }

      videoAdUnit = window.adWindow.adsnativetag.defineAdUnit({
          apiKey: window.adWindow.placementId,
          templateKey: (window.adWindow.templateKey) ? window.adWindow.templateKey : null
      });

      window.adWindow.adsnativetag.requestAds(function(responseStatus, adObject){
        console.log('Instream Multiform Overall ad response callback')
        console.log('Instream Multiform : ', responseStatus);
        console.log('Instream Multiform : ', adObject);

        if(!responseStatus) {
          console.log('No-Fill : Native Ad, skipping to content');
          if(window.adWindow.vpaidPlayer && window.adWindow.vpaidPlayer.skipAd) {
            window.adWindow.vpaidPlayer.skipAd();
          }
        } else if(window.adWindow.vpaidPlayer.addNativeAdContainer) {
          console.log('Fill : Rendering Native Ad.');
          window.adWindow.vpaidPlayer.videoSlot_.play();
          window.adWindow.vpaidPlayer.addNativeAdContainer();
        }
      });

      window.adWindow.adsnativetag.displayAdUnit(videoAdUnit, 'ad-display', function(responseStatus, displayStatus, adObject){
        console.log('Instream Multiform ad rendered callback');
        console.log('Instream Multiform displayStatus : ', displayStatus);
      });
  });
};


/**
 * Helper function to update the size of the video player.
 * @private
 */
VpaidVideoPlayer.prototype.updateVideoPlayerSize_ = function() {
  try {
    this.videoSlot_.setAttribute('width', this.attributes_['width']);
    this.videoSlot_.setAttribute('height', this.attributes_['height']);
    this.videoSlot_.style.width = this.attributes_['width'] + 'px';
    this.videoSlot_.style.height = this.attributes_['height'] + 'px';
  } catch (e) { /* no op*/}
};


/**
 * Returns the versions of VPAID ad supported.
 * @param {string} version
 * @return {string}
 */
VpaidVideoPlayer.prototype.handshakeVersion = function(version) {
  return ('2.0');
};


/**
 * Called by the wrapper to start the ad.
 */
VpaidVideoPlayer.prototype.startAd = function() {
  this.log('Starting ad');
  this.startAdReceived = true;

  this.callEvent_('AdStarted');
  this.callEvent_('AdImpression');
};

VpaidVideoPlayer.prototype.showSkipAd = function() {
  this.log('Skippable timer complete, show button');
  var skipButton = this.adDoc_.getElementById('skipad');
  skipButton.style.display = 'block';
  skipButton.addEventListener('click', this.skipAd.bind(this), false);
}

/**
 * Called by the wrapper to stop the ad.
 */
VpaidVideoPlayer.prototype.stopAd = function() {
  this.log('Stopping ad');
  if (this.intervalId_){
    clearInterval(this.intervalId_)
  }
  // Calling AdStopped immediately terminates the ad. Setting a timeout allows
  // events to go through.
  var callback = this.callEvent_.bind(this);
  this.callEvent_('AdVideoComplete');
  setTimeout(callback, 75, ['AdStopped']);
};


/**
 * @param {number} value The volume in percentage.
 */
VpaidVideoPlayer.prototype.setAdVolume = function(value) {
  this.attributes_['volume'] = value;
  this.log('setAdVolume ' + value);
  this.videoSlot_.volume = value / 100.0;
  this.callEvent_('AdVolumeChange');
};


/**
 * @return {number} The volume of the ad.
 */
VpaidVideoPlayer.prototype.getAdVolume = function() {
  this.log('getAdVolume');
  return this.attributes_['volume'];
};


/**
 * @param {number} width The new width.
 * @param {number} height A new height.
 * @param {string} viewMode A new view mode.
 */
VpaidVideoPlayer.prototype.resizeAd = function(width, height, viewMode) {
  this.log('resizeAd ' + width + 'x' + height + ' ' + viewMode);
  this.attributes_['width'] = width;
  this.attributes_['height'] = height;
  this.attributes_['viewMode'] = viewMode;
  // this.updateVideoPlayerSize_();

  // if linear, resize video
  if (this._attribute['linear']) {
      try {
          this._videoSlot.setAttribute('width', width);
          this._videoSlot.setAttribute('height', height);
          this._videoSlot.style.width = width + 'px';
          this._videoSlot.style.height = height + 'px';
      } catch (e) {
          console.log('Could not resize video ad');
      }
  }

  this.callEvent_('AdSizeChange');
};


/**
 * Pauses the ad.
 */
VpaidVideoPlayer.prototype.pauseAd = function() {
  this.log('pauseAd');
  this.videoSlot_.pause();
  this.callEvent_('AdPaused');
  if (this.intervalId_){
    clearInterval(this.intervalId_)
  }
};


/**
 * Resumes the ad.
 */
VpaidVideoPlayer.prototype.resumeAd = function() {
  this.log('resumeAd');
  this.videoSlot_.play();
  this.callEvent_('AdPlaying');
  var callback = (function(){
    this.attributes_['remainingTime'] -= 0.25;
    this.callEvent_('AdRemainingTimeChange');
  }).bind(this);
  this.intervalId_ = setInterval(callback, 250);
};


/**
 * Expands the ad.
 */
VpaidVideoPlayer.prototype.expandAd = function() {
  this.log('expandAd');
  this.attributes_['expanded'] = true;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
  this.callEvent_('AdExpanded');
};


/**
 * Returns true if the ad is expanded.
 * @return {boolean}
 */
VpaidVideoPlayer.prototype.getAdExpanded = function() {
  this.log('getAdExpanded');
  return this.attributes_['expanded'];
};


/**
 * Returns the skippable state of the ad.
 * @return {boolean}
 */
VpaidVideoPlayer.prototype.getAdSkippableState = function() {
  this.log('getAdSkippableState');
  return this.attributes_['skippableState'];
};


/**
 * Collapses the ad.
 */
VpaidVideoPlayer.prototype.collapseAd = function() {
  this.log('collapseAd');
  this.attributes_['expanded'] = false;
};


/**
 * Skips the ad.
 */
VpaidVideoPlayer.prototype.skipAd = function() {
  this.log('skipAd');
  var skippableState = this.attributes_['skippableState'];
  if (skippableState) {
    this.callEvent_('AdSkipped');
    this.callEvent_('AdStopped');
  }
};


/**
 * Registers a callback for an event.
 * @param {Function} aCallback The callback function.
 * @param {string} eventName The callback type.
 * @param {Object} aContext The context for the callback.
 */
VpaidVideoPlayer.prototype.subscribe = function(
    aCallback,
    eventName,
    aContext) {
  this.log('Subscribe ' + eventName);
  var callBack = aCallback.bind(aContext);
  this.eventsCallbacks_[eventName] = callBack;
};


/**
 * Removes a callback based on the eventName.
 *
 * @param {string} eventName The callback type.
 */
VpaidVideoPlayer.prototype.unsubscribe = function(eventName) {
  this.log('unsubscribe ' + eventName);
  this.eventsCallbacks_[eventName] = null;
};


/**
 * @return {number} The ad width.
 */
VpaidVideoPlayer.prototype.getAdWidth = function() {
  return this.attributes_['width'];
};


/**
 * @return {number} The ad height.
 */
VpaidVideoPlayer.prototype.getAdHeight = function() {
  return this.attributes_['height'];
};


/**
 * @return {number} The time remaining in the ad.
 */
VpaidVideoPlayer.prototype.getAdRemainingTime = function() {
  return this.attributes_['remainingTime'];
};


/**
 * @return {number} The duration of the ad.
 */
VpaidVideoPlayer.prototype.getAdDuration = function() {
  return this.attributes_['duration'];
};


/**
 * @return {string} List of companions in vast xml.
 */
VpaidVideoPlayer.prototype.getAdCompanions = function() {
  return this.attributes_['companions'];
};


/**
 * @return {boolean} A list of icons.
 */
VpaidVideoPlayer.prototype.getAdIcons = function() {
  return this.attributes_['icons'];
};


VpaidVideoPlayer.prototype.onAdImpression = function() {
    this.callEvent_('AdImpression');
}


/**
 * @return {boolean} True if the ad is a linear, false for non linear.
 */
VpaidVideoPlayer.prototype.getAdLinear = function() {
  return this.attributes_['linear'];
};


/**
 * Logs events and messages.
 *
 * @param {string} message
 */
VpaidVideoPlayer.prototype.log = function(message) {
  console.log(message);
};


/**
 * Calls an event if there is a callback.
 * @param {string} eventType
 * @private
 */
VpaidVideoPlayer.prototype.callEvent_ = function(eventType) {
  this.log('Eventname : '+ eventType);
  if (eventType in this.eventsCallbacks_) {
    this.eventsCallbacks_[eventType]();
  }
};


/**
 * Callback for when the mute button is clicked.
 * @private
 */
VpaidVideoPlayer.prototype.muteButtonOnClick_ = function() {
  if (this.attributes_['volume'] == 0) {
    this.attributes_['volume'] = 1.0;
    this.videoSlot_.volume = 1.0;
  } else {
    this.attributes_['volume'] = 0.0;
    this.videoSlot_.volume = 0.0;
  }
  this.callEvent_('AdVolumeChange');
};


/**
 * Callback when the video element calls start.
 * @private
 */
VpaidVideoPlayer.prototype.videoResume_ = function() {
  this.log("video element resumed.");
};

/**
 * Main function called by wrapper to get the VPAID ad.
 * @return {Object} The VPAID compliant ad.
 */
var getVPAIDAd = function() {
  window.vpaidPlayer = new VpaidVideoPlayer();
  return window.vpaidPlayer;
};


