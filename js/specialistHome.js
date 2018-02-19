// Contributions by: Jess McCreery
//    When the page is loaded, display the 3 most recent tickets
//    To do this, sort tickets by dateCreated

$(function() {
//    When the page is loaded, display the 3 most recent tickets
//    To do this, sort tickets by dateCreated
    $.get('scripts/getSpecialistTickets.php', function(result) {
        //reverse the array the change the sorting to be descending instead of ascending
        for (let i = 0; i<result.length; i++) {
            createTicket(i, result);
        }

        resizeAllGridItems();
    }, 'json');
});
