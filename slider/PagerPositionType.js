(function(){
  "use strict";
  jQuery.sap.declare('slider.PagerPositionType');

  jQuery.sap.require('sap.ui.base.DataType');

  var CONST = ['left', 'middle', 'right'];
  /**
   * A string type that represents currency codes that are currently supported
   * by our little application. Currently only "USD" and "EUR" is supported
   */
  slider.PagerPositionType = sap.ui.base.DataType.createType(
    "slider.PagerPositionType",
    {
      isValid : function(sValue) {
        return CONST.indexOf(sValue) !== -1;
      }
    },
    sap.ui.base.DataType.getType('string')
  );
})();