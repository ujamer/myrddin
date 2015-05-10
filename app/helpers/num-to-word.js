import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(num) {
  num = parseInt(num);

  var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

  if ((num = num.toString()).length > 2) {return 'overflow';}
  var n = ('00' + num).substr(-2).match(/^(\d{2})$/);
  if (!n) {return;} var str = '';
  str += (n[1] !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
  return str.capitalize();

});