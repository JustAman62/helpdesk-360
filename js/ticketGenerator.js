`        <a class="col-12 col-md-6 col-xl-4 p-3 ticket" href="ticket.php?ticketNum=1">
            <div class="ticket-header justify-content-between">
                <h5>Heading</h5>
                <h5><span class="badge badge-primary">Low Priority</span></h5>
            </div>
            <div class="ticket-body">
                <div class="ticket-description">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias atque ea eaque earum enim esse hic, inventore ipsam magnam necessitatibus, </p>
                </div>
                <div class="ticket-footer justify-content-between">
                    <span>left</span>
                    <span>right</span>
                </div>
            </div>
        </a>`


function createTicket(index, tickets) {

    let ticket = tickets[index];


    // let ticketContainer = createNewElement('a', 'col-12 col-md-6 col-xl-4 p-2 ticket');
    let ticketContainer = createNewElement('a', 'ticket');
    ticketContainer.setAttribute('href', 'ticket.php?ticketNum=' + ticket.ticketNumber);

    //--------

    let ticketHeaderContainer = createNewElement('div', 'ticket-header justify-content-between');

    let ticketHeading = createNewElement('h5');
    ticketHeading.append(document.createTextNode('Ticket #' + ticket.ticketNumber));

    let headingBadge = document.createElement('h5');
    let badge = createNewElement('span', 'badge');

    //Only assign a priority badge is the ticket is open, otherwise assign a closed badge
    if (ticket.ticketStatus == 0) {
        let badgeClass = ['badge badge-success', 'badge badge-warning', 'badge badge-danger'];
        badge.setAttribute('class', badgeClass[ticket.priority]);
        let badgeText = ['Low Priority', 'Medium Priority', 'High Priority'];
        badge.append(document.createTextNode(badgeText[ticket.priority]));
    }
    else {
        badge.setAttribute('class', 'badge badge-primary');
        badge.append(document.createTextNode('Closed'));
        let ticketHeaderContainer = createNewElement('div', 'ticket-header justify-content-between');
        let ticketHeading = createNewElement('h5');
        ticketHeading.append(document.createTextNode(ticket.problemType));
    }
    headingBadge.append(badge);

    ticketHeaderContainer.append(headingBadge);


    //---------

    let ticketBody = createNewElement('div', 'ticket-body');
    ticketBody.append(ticketHeaderContainer);

    let ticketDescriptionContainer = createNewElement('div', 'ticket-description');
    let ticketDescription = createNewElement('p');
    ticketDescription.append(document.createTextNode(ticket.originalDescription));
    ticketDescriptionContainer.append(ticketDescription);
    ticketBody.append(ticketDescriptionContainer);

    let ticketFooter = createNewElement('div', 'ticket-footer justify-content-between');
    let dateCreated = document.createElement('span');
    let dateOpened = ticket.dateCreated.split("-");

    dateCreated.append(document.createTextNode(dateOpened[2] + '/' + dateOpened[1] + '/' + dateOpened[0]));
    ticketFooter.append(dateCreated);
    let assignedSpecialist = document.createElement('span');
    let specialistString = "Not Assigned";
    if (ticket.specialistID) specialistString = ticket.specialistID;
    if (ticket.ticketStatus == 1) {
        let dateClosed = ticket.dateClosed.split('-')
        specialistString = dateClosed[2] + '/' + dateClosed[1] + '/' + dateClosed[0]
    }
    assignedSpecialist.append(document.createTextNode(specialistString));
    ticketFooter.append(assignedSpecialist);

    ticketBody.append(ticketFooter);

    ticketContainer.append(ticketBody);

    //---------

    $('#ticket-list').append(ticketContainer);


}

function createNewElement(elementString, classString) {
    let element = document.createElement(elementString);
    element.setAttribute('class', classString);
    return element;
}
