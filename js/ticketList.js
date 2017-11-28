
$(function() {
    CheckCTicket();
});

function CheckCTicket(){

    $("closed-ticket-list").html("");
    $("open-ticket-list").html("");

    let check = document.getElementById("CTicket").checked;

    for (let i in tickets) {
        if (tickets[i].ticketStatus===1) addOpenTicket(i);
        else {
            if(check===true)
            {
                addClosedTicket(i)
            }
            if(check===false)
            {
                $("closed-ticket-list")
            }
        }

    }
}

