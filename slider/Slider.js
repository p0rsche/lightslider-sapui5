(function(){
  'use strict';

  jQuery.sap.declare('slider.Slider');
  
  jQuery.sap.require('slider.lightSlider');
  jQuery.sap.require('slider.TransitionModeType');
  jQuery.sap.require('slider.PagerPositionType');

  sap.ui.core.Control.extend('slider.Slider', {
    metadata:{
      publicMethods: [
        "goToSlide", "goToPrevSlide", "goToNextSlide", "refresh", "play", "pause"
      ],
      properties:{
        //number of slides to show at a time
        item: {
          type: "int",
          defaultValue: 1
        },
        //Custom width for each slide
        autoWidth: {
          type: "boolean",
          defaultValue: false
        },
        //Number of slides to be moved at a time
        slideMove: {
          type: "int",
          defaultValue: 1
        },
        //Spacing between each slide
        slideMargin: {
          type: "int",
          defaultValue: 0
        },
        //Add custom class for slider, can be used to set different style for different sliders
        addClass: {
          type: "string",
          defaultValue: ''
        },
        //Type of transition 'slide' and 'fade'
        mode: {
          type: "slider.TransitionModeType",
          defaultValue: slider.TransitionModeType.slide
        },
        //If true LightSlider will use CSS transitions. if falls jquery animation will be used.
        useCSS: {
          type: "boolean",
          defaultValue: true
        },
        //Type of easing to be used for css animations.
        cssEasing: {
          type: "string",
          defaultValue: 'ease'
        },
        //Type of easing to be used for jquery animations.
        easing: {
          type: "string",
          defaultValue: 'linear'
        },
        //Transition duration (in ms). // ex = speed:400;.
        speed: {
          type: "int",
          defaultValue: 400
        },
        //If true, the Slider will automatically start to play.
        auto: {
          type: "boolean",
          defaultValue: true
        },
        //If false, will disable the ability to loop back to the beginning of the slide when on the last element.
        loop: {
          type: "boolean",
          defaultValue: true
        },
        //Enable slideEnd animation
        slideEndAnimation: {
          type: "boolean",
          defaultValue: true
        },
        //The time (in ms) between each auto transition
        pause: {
          type: "int",
          defaultValue: 2000
        },
        //Enable keyboard navigation
        keyPress: {
          type: "boolean",
          defaultValue: true
        },
        //Change direction to right-to-left
        rtl: {
          type: "boolean",
          defaultValue: true
        },
        //If false, prev/next buttons will not be displayed.
        controls: {
          type: "boolean",
          defaultValue: false
        },
        //custom html for prev control
        prevHtml: {
          type: "string",
          defaultValue: ''
        },
        //custom html for next control.
        nextHtml: {
          type: "string",
          defaultValue: ''
        },
        //Dynamically adjust slider height based on each slide's height
        adaptiveHeight: {
          type: "boolean",
          defaultValue: false
        },
        //change slide's direction from horizontal to Vertical
        vertical: {
          type: "boolean",
          defaultValue: false
        },
        //set height of slider if vertical mode is active and item more than 1.
        verticalHeight: {
          type: "int",
          defaultValue: 500
        },
        //width of gallery thumbnail while vertical mode active
        vThumbWidth: {
          type: "int",
          defaultValue: 100
        },
        //number of gallery thumbnail to show at a time.
        thumbItem: {
          type: "int",
          defaultValue: 10
        },
        //Enable pager option.
        pager: {
          type: "boolean",
          defaultValue: true
        },
        //Enable thumbnails gallery.
        gallery: {
          type: "boolean",
          defaultValue: false
        },
        //Spacing between gallery and slide.
        galleryMargin: {
          type: "int",
          defaultValue: 5
        },
        //Spacing between each thumbnails.
        thumbMargin: {
          type: "int",
          defaultValue: 3
        },
        //position of thumbnails . 'left', 'middle', 'right'.
        currentPagerPosition: {
          type: "slider.PagerPositionType",
          defaultValue: slider.PagerPositionType.right
        },
        //Enables touch support
        enableTouch: {
          type: "boolean",
          defaultValue: true
        },
        //Enables desktop mouse drag support
        enableDrag: {
          type: "boolean",
          defaultValue: true
        },
        //Enable free move(no limit) while swipe or drag
        freeMove: {
          type: "boolean",
          defaultValue: true
        },
        //Separate settings per breakpoint
        responsive: {
          type: "object",
          defaultValue: []
        }
      },
      events:{},
      defaultAggregation: "slides",
      aggregations:{
        slides: {
          type: "slider.Slide",
          multiple: true,
          singularName: "slide"
        }
      }
    },

    _sliderInstance: undefined,

    renderer : function(oRm, oControl) {      // the part creating the HTML
      oRm.write('<ul');
      oRm.writeControlData(oControl);  // writes the Control ID and enables event handling - important!
      //oRm.addClass('slider'); //default class for slider
      oRm.writeClasses();
      oRm.write('>');

      var aChildren = oControl.getSlides();
      for(var i = 0, len = aChildren.length; i < len; i++) {
        oRm.renderControl(aChildren[i]);
      }

      oRm.write('</ul>');
    },

    onAfterRendering: function() {
      var self = this;

      self._sliderInstance = jQuery.sap.byId(this.getId()).lightSlider(jQuery.extend({}, Object.getPrototypeOf(this.mProperties)));
    },

    exit: function() {
      this._sliderInstance = undefined;
    },

    _invokeSliderMethod: function(sMethodName, iParamOne) {
      if (this._sliderInstance && this._sliderInstance[sMethodName]) {
        this._sliderInstance[sMethodName].call(this, iParamOne);
      }
    },

    /**
     * Go to nth slide ex: slider.goToSlide(3)
     * @param num
     */
    goToSlide: function(iNum) {
      this._invokeSliderMethod('goToSlide', iNum);
    },
    /**
     * Go to previous slide
     */
    goToPrevSlide: function() {
      this._invokeSliderMethod('goToPrevSlide');
    },
    /**
     * Go to next slide
     */
    goToNextSlide: function() {
      this._invokeSliderMethod('goToNextSlide');
    },
    /**
     * Refresh slider
     */
    refresh: function() {
      this._invokeSliderMethod('refresh');
    },
    /**
     * play Slide
     */
    play: function() {
      this._invokeSliderMethod('play');
    },
    /**
     * pause Slide
     */
    pause: function() {
      this._invokeSliderMethod('pause');
    },

    /**
     * API Callbacks
     */

    /**
     * Executes before slider start loading
     * @param oEl
     */
    onBeforeStart: function(oEl) {

    },
    /**
     * Executes immediately after the slider is fully loaded
     * @param oEl
     */
    onSliderLoad: function(oEl) {

    },
    /**
     * Executes immediately before each slide transition
     * @param oEl
     */
    onBeforeSlide: function(oEl) {

    },
    /**
     * Executes immediately after each slide transition
     * @param oEl
     */
    onAfterSlide: function(oEl) {

    },
    /**
     * Executes immediately before each "Next" slide transition
     * @param oEl
     */
    onBeforeNextSlide: function(oEl) {

    },
    /**
     * Executes immediately before each "Prev" slide transition
     * @param oEl
     */
    onBeforePrevSlide: function(oEl) {

    }


  });

})();