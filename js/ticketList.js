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
    for (let i in tickets) {
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
    let a = createTicketElement('a', 'open-ticket-clickable');
    a.setAttribute('href', 'ticket.php?ticketNum='+ tickets[ticketNum].ticketNumber);

    let div1 = createTicketElement('div', 'w-100 open-ticket-clickable');
    a.appendChild(div1);

    let headerDiv = createTicketElement('div', 'd-flex ticket-header');
    div1.appendChild(headerDiv);

    let header = createTicketElement('h4', 'card-title');
    header.appendChild(document.createTextNode('Ticket #' + tickets[ticketNum].ticketNumber));
    headerDiv.appendChild(header);

    let priorityBadge;
    if (tickets[ticketNum].priority === 0) {
        priorityBadge = createTicketElement('span', 'badge badge-success ml-auto ticket-list-badge px-2');
        priorityBadge.appendChild(document.createTextNode('Low Priority'));
    }
    else if (tickets[ticketNum].priority === 1) {
        priorityBadge = createTicketElement('span', 'badge badge-warning ml-auto ticket-list-badge px-2');
        priorityBadge.appendChild(document.createTextNode('Medium Priority'));
    }
    else {
        priorityBadge = createTicketElement('span', 'badge badge-danger ml-auto ticket-list-badge px-2');
        priorityBadge.appendChild(document.createTextNode('High Priority'));
    }
    headerDiv.appendChild(priorityBadge);

    let divBody = createTicketElement('div', 'ticket-body');
    div1.appendChild(divBody);

    let description = createTicketElement('p', 'card-text');
    description.appendChild(document.createTextNode(tickets[ticketNum].originalDescription));
    divBody.appendChild(description);

    let table = createTicketElement('table', 'w-100');
    let row = createTicketElement('tr', '')
    table.appendChild(row);
    let dateCreated = createTicketElement('td', '');
    dateCreated.appendChild(document.createTextNode(tickets[ticketNum].dateCreated));
    row.appendChild(dateCreated);
    let specialistID = createTicketElement('td', 'text-right');
    let specialistText = document.createTextNode(tickets[ticketNum].specialistID ? tickets[ticketNum].specialistID : 'Not Assigned')
    specialistID.appendChild(specialistText);
    row.appendChild(specialistID);
    divBody.appendChild(table);

    $('#open-ticket-list').append(a);





    // let ticketText = '<a href="ticket.php?ticketNum='+ tickets[ticketNum].ticketNumber + '" class="open-ticket-clickable">\n    <div class="w-100 open-ticket-clickable">\n    <div class="d-flex ticket-header">\n    <h4 class="card-title"> Ticket ';
    // ticketText += tickets[ticketNum].ticketNumber + '<span class="badge badge-success">Priority</span>';
    // ticketText += '</div>\n<div class="ticket-body">\n    <p class="card-text">';
    // ticketText += tickets[ticketNum].originalDescription;
    // ticketText += '</p>\n\n<!--Table footer-->\n<table class="w-100">\n    <tr>\n    <td>';
    // ticketText += tickets[ticketNum].dateCreated;
    // ticketText += '</td>\n<td class="text-right">';
    // ticketText += tickets[ticketNum].specialistID ? tickets[ticketNum].specialistID : 'Not Assigned';
    // ticketText += '</td>\n    </tr>\n    </table>\n    </div>\n    </div>\n    </a>';
    // let html = $('#open-ticket-list').html();
    // $('#open-ticket-list').html(html + ticketText);
}

function addClosedTicket(ticketNum) {
    let ticketText = '<a href="ticket.php?ticketNum='+ tickets[ticketNum].ticketNumber + '" class="closed-ticket-clickable">\n    <div class="w-100 closed-ticket-clickable">\n    <div class="d-flex ticket-header">\n    <h4 class="card-title"> Ticket ';
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

function createTicketElement(elementType, classString) {
    element = document.createElement(elementType);
    element.setAttribute('class', classString)
    return element;
}