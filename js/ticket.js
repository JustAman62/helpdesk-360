//Find out what ticket number the page has been opened for, default to ticket 1
let ticketNum = 1;

//Count for temporary call icons on notes
let counter = 0;
$(function() {
    //Get the ticket number from the GET request when the page is loaded
    ticketNum = location.search.split('&')[0].split('=')[1];

    $.get('scripts/getTickets.php', {ticketnum:ticketNum}, function(result) {
        if (!result) {
            return;
        }
        // Place the ticket number in the title of the page
        document.title = "Ticket #" + result[0].ticketNumber + " | Helpdesk 360";


        //When the page is first loaded, populate the ticket info
        // populateNotes();
        populateTicketInfo(result[0]);
        populateNotes(result[0]);
    }, 'json');




    //When the notes modal is shown, update the note textarea to match the note it was clicked on
    $('#notesModal').on('show.bs.modal', function(event) {
        // console.log($(event.relatedTarget).data());
        noteID = $(event.relatedTarget).data('noteId');
        // console.log(noteID)

        let noteModal = $(this);
        noteModal.find('.modal-body textarea').val(notes[noteID].Text).trigger('input');
    }).on('shown.bs.modal', function() {
        $('.modal-body textarea').trigger('input');
    });
    //Save the note displayed in the modal when the save button is clicked
    $('#saveNote').on('click', function() {
        let note = $('.modal-body textarea').val();
        notes[noteID].Text = note;

        //    Update the ticket page
        populateNotes();

        //    Close the modal
        $('#notesModal').modal('hide');
    });






});

function populateTicketInfo(ticket) {
    //Auto fill basic information
    $('.auto-fill').each(function(i, element) {
        if (ticket[element.dataset.autofill]) {
            element.innerHTML = ticket[element.dataset.autofill];
        }
    });

    //Add badges for if the ticket if open or closed
    if (ticket.ticketStatus === 1) {
        //Add open badge
        let badge = document.createElement('span');
        badge.setAttribute('class', 'badge badge-warning ml-1');
        badge.appendChild(document.createTextNode('Open'));
        $('#badge-list').append(badge);
    }
    else {
        //Add closed badge
        let badge = document.createElement('span');
        badge.setAttribute('class', 'badge badge-success ml-1');
        badge.appendChild(document.createTextNode('Closed'));
        $('#badge-list').append(badge);
    }

    //Make badges at the top of the screen
    // Specialist assigned/Not assigned badges
    if (ticket.specialistID) {
        let badge = document.createElement('span');
        badge.setAttribute('class', 'badge badge-success ml-1');
        badge.appendChild(document.createTextNode('Assigned'));
        $('#badge-list').append(badge)
    }
    else {
        let badge = document.createElement('span');
        badge.setAttribute('class', 'badge badge-warning ml-1');
        badge.appendChild(document.createTextNode('Not Assigned'));
        $('#badge-list').append(badge)
    }

//    Priority badge
    if (ticket.priority === 0) {
        let priorityBadge = document.createElement('span')
        priorityBadge.setAttribute('class', 'badge badge-success ml-1');
        priorityBadge.appendChild(document.createTextNode('Low Priority'));
        $('#badge-list').append(priorityBadge);
    }
    else if (ticket.priority === 1) {
        let priorityBadge = document.createElement('span')
        priorityBadge.setAttribute('class', 'badge badge-warning ml-1');
        priorityBadge.appendChild(document.createTextNode('Medium Priority'));
        $('#badge-list').append(priorityBadge);
    }
    else {
        let priorityBadge = document.createElement('span')
        priorityBadge.setAttribute('class', 'badge badge-danger ml-1');
        priorityBadge.appendChild(document.createTextNode('High Priority'));
        $('#badge-list').append(priorityBadge);
    }

//    Show number of days only for open tickets
    if (ticket.ticketStatus === 1) {
        //Add number of days ticket has been open
        let currentDate = new Date();
        let dateString = ticket.dateCreated.split('/');
        let createdDay = dateString[0];
        let createdMonth = dateString[1];
        let createdYear = dateString[2];
        let createdDate = new Date(createdYear, createdMonth-1, createdDay);

        let difference = Math.floor((currentDate - createdDate) / (1000*60*60*24));
        if (difference > 24) {
            let badge = document.createElement('span');
            badge.setAttribute('class', 'badge badge-danger ml-1');
            badge.appendChild(document.createTextNode(difference.toString() + " days"));
            $('#badge-list').append(badge);
        }
        else if (difference > 10) {
            let badge = document.createElement('span');
            badge.setAttribute('class', 'badge badge-warning ml-1');
            badge.appendChild(document.createTextNode(difference.toString() + " days"));
            $('#badge-list').append(badge);
        }
        else {
            let badge = document.createElement('span');
            badge.setAttribute('class', 'badge badge-success ml-1');
            badge.appendChild(document.createTextNode(difference.toString() + " days"));
            $('#badge-list').append(badge);
        }
    }

//    Populate specialist details
    if (ticket.specialistID) {
        let ID = document.createElement('h6');
        ID.appendChild(document.createTextNode('ID: ' + ticket.specialistID));
        let name = document.createElement('h6');
        name.appendChild(document.createTextNode('Jane Doe'));
        let number = document.createElement('h6');
        number.appendChild(document.createTextNode('01234 123 321'));
        let specialism = document.createElement('h6');
        specialism.appendChild(document.createTextNode('Printing Issues'));

        $('#specialistDetails').append(ID, name, number, specialism);
    }
    else {
        let notAssigned = document.createElement('h6');
        notAssigned.appendChild(document.createTextNode('Not Assigned to a Specialist'));
        $('#specialistDetails').append(notAssigned);
    }


}

function populateNotes() {
    let ticketNotes = [];
    // Make sure the notes section is empty to prevent repetitions
    $('#note-list').html('');

    for (let i in notes) {
        if (notes[i].ticketNumber === ticketNum+1) ticketNotes.push(i);
    }

    for (let i in ticketNotes) {
        makeNoteListItem(ticketNotes[i]);
    }
//    Add a make new note button
    let newNoteElement = document.createElement('button')
    newNoteElement.setAttribute('type', 'button');
    newNoteElement.setAttribute('class', 'list-group-item list-group-item-action');
    newNoteElement.setAttribute('onclick', "javascript:addNewNote('New Note')");
    let plusIcon = document.createElement('i');
    plusIcon.setAttribute('class', 'icon-plus-circled');
    newNoteElement.appendChild(plusIcon);
    newNoteElement.appendChild(document.createTextNode(' Add New Note'));
    $('#note-list').append(newNoteElement)
}

function makeNoteListItem(noteID) {
    // Template for making a note
    // `<button type="button" class="list-group-item list-group-item-action" data-toggle="modal" data-target="#notesModal" data-note-id="0">
    //     <small>19/09/2018 06:10</small><br>
    // <span>some notes</span>
    // </button>`

    let noteElement = document.createElement('button')
    noteElement.setAttribute('type', 'button');
    noteElement.setAttribute('class', 'list-group-item list-group-item-action');
    noteElement.setAttribute('data-toggle', 'modal');
    noteElement.setAttribute('data-target', '#notesModal');
    noteElement.setAttribute('data-note-id', noteID);

    let date = new Date();
    let dateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

    let dateTimeText = document.createElement('small');
    dateTimeText.appendChild(document.createTextNode(dateString + '   '));
    noteElement.appendChild(dateTimeText);
    if (counter % 3 === 0) {
        let callBadge = document.createElement('i');
        callBadge.setAttribute('class', 'icon icon-phone');
        noteElement.appendChild(callBadge);
    }
    counter++;
    noteElement.appendChild(document.createElement('br'));

    let noteText = document.createElement('span');
    // noteText.appendChild(document.create(notes[noteID].replace('\n', '<br>')));
    $(noteText).html(notes[noteID].Text.replace(/\n/g, ' <br> '));
    noteElement.appendChild(noteText);

    $('#note-list').append(noteElement)
}

function addNewNote(text) {
    let date = new Date();
    notes.push(
        {
            "noteID":notes.length,
            "Text":text,
            "Date":date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear(),
            "ticketNumber":tickets[ticketNum].ticketNumber
        });

    populateNotes();
    $('.list-group button:nth-last-child(2)').trigger('click');
}

function closeTicket() {
    let date = new Date();
    let dateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`

    addNewNote("Ticket closed on: " + dateString + " by: " + "John" + "\n\nReason:");
}
