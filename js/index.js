function navToTicket() {
    let searchTicket = $('#searchText').val();
    if (searchTicket === undefined || searchTicket === "") searchTicket = 1;
    location.href = 'ticket.php?ticketNum=' + searchTicket
}

$(function() {
//    When the page is loaded, display the 5 most recent tickets
//    To do this, sort tickets by dateCreated
    let sortedTickets = tickets.sort(function(a, b) {
        let aString = a.dateCreated.split('/');
        let aDay = aString[0];
        let aMonth = aString[1];
        let aYear = aString[2];
        let aDate = new Date(aYear, aMonth-1, aDay);

        let bString = b.dateCreated.split('/');
        let bDay = bString[0];
        let bMonth = bString[1];
        let bYear = bString[2];
        let bDate = new Date(bYear, bMonth-1, bDay)

        return bDate - aDate;
    });
    for (let i = 0; i < 3; i++) {
        addOpenTicket(i);
    }
});