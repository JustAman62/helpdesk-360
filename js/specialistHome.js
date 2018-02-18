//TODO: Replace temp specialist number
//let specialistID = 1005;
//$(function() {
//    When the page is loaded, display the 5 most recent tickets
//    To do this, sort tickets by dateCreated

$(function() {
//    When the page is loaded, display the 3 most recent tickets
//    To do this, sort tickets by dateCreated
    $.get('scripts/getSpecialistTickets.php', function(result) {
        //reverse the array the change the sorting to be descending instead of ascending
        result.reverse();
        for (let i = 0; i<result.length; i++) {
            createTicket(i, result);
        }
    }, 'json');
});



    // let filteredTickets = tickets.filter(function(obj) {
    //     return (obj.specialistID === specialistID);
    // });
    // for (let i in filteredTickets) {
    //     createTicket(filteredTickets[i].ticketNumber-1);
    // }
    //
    // $('#num-tickets').text(filteredTickets.length)
});
