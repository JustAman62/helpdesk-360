var openTicket =  `<a href="#" class="open-ticket-clickable">
    <div class="w-100 open-ticket-clickable">
    <div class="d-flex ticket-header">
    <h4 class="card-title">Ticket 2</h4>
</div>
<div class="ticket-body">
    <p class="card-text">Ticket Description</p>

<!--Table footer-->
<table class="w-100">
    <tr>
    <td>Date Created</td>
<td class="text-right">Unassigned / Specialist</td>
    </tr>
    </table>
    </div>
    </div>
    </a>`;

$(function() {
    for (i in tickets) {
        console.log(tickets[i].ticketStatus);
        if (tickets[i].ticketStatus===1) addOpenTicket(i);
        else addClosedTicket(i)
    }
})

function addTicket() {
    let html = $('#open-ticket-list').html();
    $('#open-ticket-list').html(html + openTicket);
    console.log(openTicket, 'lala');
}
//TODO: Make this work with createElement, not the lazy way!

function addOpenTicket(ticketNum) {
    let ticketText = '<a href="ticket.php?ticketNum='+ tickets[ticketNum].ticketNumber + '" class="open-ticket-clickable">\n    <div class="w-100 open-ticket-clickable">\n    <div class="d-flex ticket-header">\n    <h4 class="card-title"> Ticket ';
    ticketText += tickets[ticketNum].ticketNumber;
    ticketText += '</div>\n<div class="ticket-body">\n    <p class="card-text">';
    ticketText += tickets[ticketNum].originalDescription;
    ticketText += '</p>\n\n<!--Table footer-->\n<table class="w-100">\n    <tr>\n    <td>';
    ticketText += tickets[ticketNum].dateCreated;
    ticketText += '</td>\n<td class="text-right">';
    ticketText += tickets[ticketNum].specialistID ? tickets[ticketNum].specialistID : 'Not Assigned';
    ticketText += '</td>\n    </tr>\n    </table>\n    </div>\n    </div>\n    </a>';
    let html = $('#open-ticket-list').html();
    $('#open-ticket-list').html(html + ticketText);
}

function addClosedTicket(ticketNum) {
    let ticketText = '<a href="#" class="closed-ticket-clickable">\n    <div class="w-100 closed-ticket-clickable">\n    <div class="d-flex ticket-header">\n    <h4 class="card-title"> Ticket ';
    ticketText += tickets[ticketNum].ticketNumber;
    ticketText += '</div>\n<div class="ticket-body">\n    <p class="card-text">';
    ticketText += tickets[ticketNum].originalDescription;
    ticketText += '</p>\n\n<!--Table footer-->\n<table class="w-100">\n    <tr>\n    <td>';
    ticketText += tickets[ticketNum].dateCreated;
    ticketText += '</td>\n<td class="text-right">';
    ticketText += tickets[ticketNum].dateClosed;
    ticketText += '</td>\n    </tr>\n    </table>\n    </div>\n    </div>\n    </a>';
    let html = $('#closed-ticket-list').html();
    $('#closed-ticket-list').html(html + ticketText);
}