//TODO: Replace temp specialist number
let specialistID = 1005;
$(function() {
//    When the page is loaded, display the 5 most recent tickets
//    To do this, sort tickets by dateCreated
    let filteredTickets = tickets.filter(function(obj) {
        return (obj.specialistID === specialistID);
    });
    for (let i in filteredTickets) {
        addOpenTicket(filteredTickets[i].ticketNumber-1);
    }
});