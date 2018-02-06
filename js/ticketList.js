
$(function() {
    showTickets();
});

function showTickets(){

    for (let i in tickets) {
        if (tickets[i].ticketStatus===1) createTicket(tickets[i].ticketNumber);
    }
}


