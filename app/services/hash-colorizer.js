import Ember from 'ember';

export default Ember.Service.extend({
  colorScheme: function(id) {
    var colors0 = ['orange','deeppink','darkred','indigo'];
    var colors1 = ['indigo','blue','teal','green'];

    var bezierAdjCol0 = chroma.interpolate.bezier(colors0),
        bezierAdjCol1 = chroma.interpolate.bezier(colors1);

    var cs0 = chroma.scale(bezierAdjCol0).mode('lab').correctLightness(true),
        cs1 = chroma.scale(bezierAdjCol1).mode('lab').correctLightness(true);

    var cs = function(t) {
      if (t<0.5) return cs0(t*2);
      return cs1(t*2-1);
    };

    var i=4;

    return cs(parseInt(md5(id).substring(i,i+13),16)/4503599627370495).hex();
  }
});
