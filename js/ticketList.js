
$(function() {
    for (let i in tickets) {
        if (tickets[i].ticketStatus===1) addOpenTicket(i);
        else addClosedTicket(i)
    }
});

