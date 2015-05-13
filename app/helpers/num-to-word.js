import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(num) {
  num = parseInt(num);

  var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

  if ((num = num.toString()).length > 2) {return 'overflow';}
  var n = ('00' + num).substr(-2).match(/^(\d{2})$/);
  if (!n) {return;} var str = '';
  str += (n[1] !== 0) ? (a[Number(n[0])] || b[n[0][0]] + ' ' + a[n[0][1]]) : '';
  return str.capitalize();

});