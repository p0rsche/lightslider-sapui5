(function(){
  'use strict';

  jQuery.sap.declare('slider.Slide');

  sap.ui.core.Control.extend('slider.Slide', {
    metadata:{
      publicMethods: [
      ],
      properties:{
      },
      events:{},
      defaultAggregation : "content",
      aggregations : {
        "content" : {
          singularName : "content"
        }
      }
    },

    renderer: function(oRm, oControl) {
      oRm.write('<li');
      oRm.writeControlData(oControl);  // writes the Control ID and enables event handling - important!
      //oRm.addClass('slider'); //default class for slider
      oRm.writeClasses();
      oRm.write('>');

      var aChildren = oControl.getContent();
      for(var i = 0, len = aChildren.length; i < len; i++) {
        oRm.renderControl(aChildren[i]);
      }

      oRm.write('</li>');
    }

  });

})();