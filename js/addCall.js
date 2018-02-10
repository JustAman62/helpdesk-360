$(function() {
   let input = $('#create-problem-type');
   let problemTypesList = new Awesomplete(input[0]);
   problemTypesList.minChars = 0;
   $.get('scripts/getProblemTypes.php', function(result) {
       console.log(result);
       problemTypesList.list = result;
   }, 'json');

   input.on('focus', function() {
       problemTypesList.evaluate();
       problemTypesList.open();
   })
});