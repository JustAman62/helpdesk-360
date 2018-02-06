function createTicket(ticketNum) {
    let ticket = tickets[ticketNum];

    let ticketContainer = createNewElement('a', 'col-12 col-md-6 col-xl-4 p-3 ticket')
    ticketContainer.setAttribute('href', 'ticket.php?ticketNum=' + ticket.ticketNumber);

    let ticketHeaderContainer = createNewElement('div', 'ticket-header justify-content-between');

    let ticketHeading = createNewElement('h5');
    ticketHeading.append(document.createTextNode('Ticket #' + ticket.ticketNumber));

    let headingBadge = createNewElement('h5');
    let badge = createNewElement('span', 'badge badge-success');
    badge.append(document.createTextNode('Low Priority'));
    headingBadge.append(badge);

    ticketHeaderContainer.append(ticketHeading);
    ticketHeaderContainer.append(headingBadge);

    ticketContainer.append(ticketHeaderContainer);

    //---------





}

function createNewElement(elementString, classString) {
    let element = document.createElement(elementString);
    element.setAttribute('class', classString);
    return element;
}