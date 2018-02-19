// Contributions by: Jess McCreery
//    When the page is loaded, display the 3 most recent tickets
//    To do this, sort tickets by dateCreated

let listOfTickets;

$(function() {
    $('#filter-open-tickets').addClass('active');
    showSpecialistTickets();
});

function showSpecialistTickets() {
//    When the page is loaded, display the 3 most recent tickets
//    To do this, sort tickets by dateCreated
    $.get('scripts/getSpecialistTickets.php', function (result) {
        $('#ticket-list').html("");

        for (let i in result) {
            // Filtering for result goes here
            let filter = false;
            //Check for open/closed ticket filtering
            if ((result[i].ticketStatus == 0) && ($('#filter-open-tickets').hasClass('active')))
                filter = true;
            if ((result[i].ticketStatus == 1) && ($('#filter-closed-tickets').hasClass('active')))
                filter = true;

            if (filter) createTicket(i, result);
        }
        resizeAllGridItems();
    }, 'json');

}
