// Contributions by: Aman Dhoot
$(function() {
//    When the page is loaded, display the 3 most recent tickets
//    To do this, sort tickets by dateCreated
    $.get('scripts/getTickets.php', {sort:'dateCreated'}, function(result) {
        //reverse the array the change the sorting to be descending instead of ascending
        result.reverse();
        for (let i = 0; i<3; i++) {
            createTicket(i, result);
        }
    }, 'json');
});
