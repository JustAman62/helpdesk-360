function navToTicket() {
    let searchTicket = $('#searchText').val();
    if (searchTicket === undefined || searchTicket === "") searchTicket = 1;
    location.href = 'ticket.php?ticketNum=' + searchTicket
}

$(function() {
//    When the page is loaded, display the 5 most recent tickets
//    To do this, sort tickets by dateCreated
    let sortedTickets = tickets.sort(function(a, b) {

        let dateCreatedA = Date(a.dateCreated)
    })
});