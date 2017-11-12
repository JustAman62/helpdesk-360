$(function() {
//    When the page is loaded, display the 5 most recent tickets
//    To do this, sort tickets by dateCreated
    let sortedTickets = tickets.slice(0);
    sortedTickets.sort(function(a, b) {
        let aString = a.dateCreated.split('/');
        let aDay = aString[0];
        let aMonth = aString[1];
        let aYear = aString[2];
        let aDate = new Date(aYear, aMonth-1, aDay);

        let bString = b.dateCreated.split('/');
        let bDay = bString[0];
        let bMonth = bString[1];
        let bYear = bString[2];
        let bDate = new Date(bYear, bMonth-1, bDay);

        return bDate - aDate;
    });
    for (let i = 0; i < 3; i++) {
        addOpenTicket(sortedTickets[i].ticketNumber-1);
    }
});