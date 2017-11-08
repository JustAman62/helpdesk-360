function navToTicket() {
    let searchTicket = $('#searchText').val();
    if (searchTicket === undefined || searchTicket === "") searchTicket = 1;
    location.href = 'ticket.php?ticketNum=' + searchTicket
}