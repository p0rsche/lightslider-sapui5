(function(){
  "use strict";
  jQuery.sap.declare('slider.TransitionModeType');

  jQuery.sap.require('sap.ui.base.DataType');

  var CONST = ['slide', 'fade'];
  /**
   * A string type that represents currency codes that are currently supported
   * by our little application. Currently only "USD" and "EUR" is supported
   */
  slider.TransitionModeType = sap.ui.base.DataType.createType(
    "slider.TransitionModeType",
    {
      isValid : function(sValue) {
        return CONST.indexOf(sValue) !== -1;
      }
    },
    sap.ui.base.DataType.getType('string')
  );
})();