// Contributions by: Aman Dhoot
let ticketList;
$(function() {
//
//    Apply default filters
    $('#filter-open-tickets').addClass('active');
    $('#filter-low-priority').addClass('active');
    $('#filter-med-priority').addClass('active');
    $('#filter-high-priority').addClass('active');

    getTicketList();

});

function getTicketList(){

    $.get('scripts/getTickets.php', {sort: 'ticketNumber'}, function(result) {
        ticketList = result;
        showTickets();
    }, 'json');
}

function showTickets() {
    //reset ticket list everything this function is run
    $('#ticket-list').html("");

    for (let i in ticketList) {
        // Filtering for tickets goes here
        let filter = false;
        //Check for open/closed ticket filtering
        if ((ticketList[i].ticketStatus == 0) && ($('#filter-open-tickets').hasClass('active')))
            filter = true;
        if ((ticketList[i].ticketStatus == 1) && ($('#filter-closed-tickets').hasClass('active')))
            filter = true;

        if (!filter) continue;
        //Check to see if the priority filters match the ticket priorities
        if (ticketList[i].priority == 0)
            filter = $('#filter-low-priority').hasClass('active');

        if (ticketList[i].priority == 1)
            filter = $('#filter-med-priority').hasClass('active');

        if (ticketList[i].priority == 2)
            filter = $('#filter-high-priority').hasClass('active');

        if (filter) createTicket(i, ticketList);
    }
    resizeAllGridItems();
}
