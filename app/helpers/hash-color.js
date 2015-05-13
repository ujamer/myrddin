import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(str) {
  var hash = '';
  for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

  //console.log(val);
  return "#"+intToARGB(hash);
});

function intToARGB(i){
    return ((i>>24)&0xFF).toString(16) + 
           ((i>>16)&0xFF).toString(16) + 
           ((i>>8)&0xFF).toString(16);
}