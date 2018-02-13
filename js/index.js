$(function() {
//    When the page is loaded, display the 5 most recent tickets
//    To do this, sort tickets by dateCreated
    $.get('scripts/getTickets.php', {sort:'dateCreated'}, function(result) {
        console.log(result);
    }, 'json');
});