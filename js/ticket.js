
let ticketInfo;

$(function() {
    $('#save-button').hide();

    //Get the ticket number from the GET request when the page is loaded
    ticketNum = location.search.split('&')[0].split('=')[1];

    $.get('scripts/getTickets.php', {ticketnum:ticketNum, sort:'ticketNumber'}, function(result) {
        if (!result) {
            return;
        }
        // Place the ticket number in the title of the page
        document.title = "Ticket #" + result[0].ticketNumber + " | Helpdesk 360";


        //When the page is first loaded, populate the ticket info
        ticketInfo = result[0];
        populateTicketInfo(result[0]);
        populateNotes(result[0]);
    }, 'json');




    //When the notes modal is shown, update the note textarea to match the note it was clicked on
    $('#notesModal').on('show.bs.modal', function(event) {
        noteID = $(event.relatedTarget).data('noteId');

        $.get('scripts/getNotes.php', {noteid: noteID}, function(result) {
            console.log(result);
            let noteModal = $('#notesModal');
            noteModal.find('.modal-body textarea').val(result[0].text).trigger('input');
            noteModal.find('.modal-body input#note-id').val(result[0].noteID);
            noteModal.find('.modal-body input#call-id').val(result[0].callID);
            $('#date-note-created').text(formatDate(result[0].date) + ' ' + result[0].time.substr(0,5));
        }, 'json');

    }).on('shown.bs.modal', function() {
        $('.modal-body textarea').trigger('input');
    });


    //Save the note displayed in the modal when the save button is clicked
    $('#saveNote').on('click', function() {
        let noteText = $('.modal-body textarea').val();
        let noteID = $('.modal-body input#note-id').val();
        $.get('scripts/updateNote.php', {noteid: noteID, text:noteText}, function(result) {
            //    Update the ticket page
            populateNotes(ticketInfo);

            //    Close the modal
            $('#notesModal').modal('hide');
        });

    });
});

function populateTicketInfo(ticket) {
    //Auto fill basic information
    $('.auto-fill').each(function(i, element) {
        if (ticket[element.dataset.autofill]) {
            $(element).val(ticket[element.dataset.autofill]);
        }
    });

    //Fill in employee details
    $.get('scripts/getFullEmployeeDetailsByID.php', {employeeid:ticket.employeeID}, function(result) {
        $('#employee-id').text(result.employeeID);
        $('#employee-name').text(result.firstName + ' ' + result.lastName);
        $('#employee-contact-number').text(result.contactNumber.substr(0, 5) + ' ' + result.contactNumber.substr(5));
    }, 'json');

    //Add badges for if the ticket if open or closed
    if (ticket.ticketStatus == 0) {
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
    let priorityBadge = document.createElement('span');
    let badgeClass = ['badge badge-success ml-1', 'badge badge-warning ml-1', 'badge badge-danger ml-1'];
    priorityBadge.setAttribute('class', badgeClass[ticket.priority]);
    let badgeText = ['Low Priority', 'Medium Priority', 'High Priority'];
    priorityBadge.appendChild(document.createTextNode(badgeText[ticket.priority]));
    $('#badge-list').append(priorityBadge);

//    Show number of days only for open tickets
    if (ticket.ticketStatus == 0) {
        //Add number of days ticket has been open
        let currentDate = new Date();
        let dateString = ticket.dateCreated.split('-');
        let createdDay = dateString[2];
        let createdMonth = dateString[1];
        let createdYear = dateString[0];
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

//    Populate Created By Field
    $.get('scripts/getUserDetailsByID.php',{userid:ticket.userID}, function(result) {
        $('#created-by').val(result.firstName + ' ' + result.lastName + ' (' + result.userID + ')');
    }, 'json');

//    Populate problem type field

    $.get('scripts/findProblemTypeName.php',{problemtypeid:ticket.problemTypeID}, function(result) {
        $('#problem-type').val(result[0].problemTypeName)
    }, 'json');

//    Populate other fields
    $('#date-created').val(formatDate(ticket.dateCreated));

    let priorities = ['Low', 'Medium', 'High'];
    $('#priority').val(priorities[ticket.priority]);

    $('#ticket-number').text(ticket.ticketNumber);

//    Populate specialist details
    if (ticket.specialistID) {
        $('#no-specialist').hide();
        $('#specialistDetails').show()
        $.get('scripts/getEmployeeInfoFromSpecialistID.php', {specialistid: ticket.specialistID}, function(result) {
            $('#specialist-employee-id').text(result.employeeID);
            $('#specialist-name').text(result.firstName + ' ' + result.lastName);
            $('#specialist-contact-number').text(result.contactNumber);
        }, 'json');
    }
    else {
        $('#no-specialist').show();
        $('#specialistDetails').hide()
    }
<<<<<<< HEAD
=======
}
>>>>>>> abb7495413cae822ba83854ec095974477e60e08

// Set closed tickets to show problem problem type
  if (ticket.problemType) {
    $.get('scripts/getProblemType.php', {problemtype: ticket.problemType}, function(result) {
      $('#problem-type').text(ticket.problemtype);
    }, 'json');
  }

function populateNotes(ticket, open=false) {

    $.get('scripts/getNotes.php', {ticketnumber: ticket.ticketNumber}, function(result) {
        $('#note-list').html("");

        for (let i in result) {
            makeNoteListItem(result[i]);
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
        $('#note-list').append(newNoteElement);

        if (open)   $('.list-group button:nth-last-child(2)').trigger('click')


    }, 'json');
}

function makeNoteListItem(note) {
    // Template for making a note
    // `<button type="button" class="list-group-item list-group-item-action" data-toggle="modal" data-target="#notesModal" data-note-id="0">
    //     <small>19/09/2018 06:10</small><br>
    // <span>some notes</span>
    // </button>`

    let noteElement = document.createElement('button');
    noteElement.setAttribute('type', 'button');
    noteElement.setAttribute('class', 'list-group-item list-group-item-action');
    noteElement.setAttribute('data-toggle', 'modal');
    noteElement.setAttribute('data-target', '#notesModal');
    noteElement.setAttribute('data-note-id', note.noteID);

    let dateTimeText = document.createElement('small');
    dateTimeText.appendChild(document.createTextNode(formatDate(note.date) + ' ' + note.time.substr(0, 5) ));
    noteElement.appendChild(dateTimeText);
    if (note.callID) {
        let callBadge = document.createElement('i');
        callBadge.setAttribute('class', 'icon icon-phone');
        noteElement.appendChild(callBadge);
    }
    noteElement.appendChild(document.createElement('br'));

    let noteText = document.createElement('span');
    $(noteText).html(note.text.replace(/\n/g, ' <br> '));
    noteElement.appendChild(noteText);

    $('#note-list').append(noteElement)
}

function addNewNote(text) {
    let date = new Date();
    let dateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    let timeString = `${date.getHours()}:${date.getMinutes()}:00`;
    $.get('scripts/createNote.php', {
        calltime: timeString,
        calldate: dateString,
        notes: text,
        ticketnumber: ticketInfo.ticketNumber
        //    todo: send correct userid when sending request

    }, function(result) {
        populateNotes(ticketInfo, true);
    }, 'json');
}

function closeTicket() {
    let date = new Date();
    let dateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    let timeString = `${date.getHours()}:${date.getMinutes()}:00`;

    addNewNote("Ticket closed on: " + dateString  + timeString + "\n\nReason:");

    $.get('scripts/closeTicket.php', {ticketnumber: ticketInfo.ticketNumber, dateclosed:dateString});
}

function deleteNote() {
    $.get('scripts/deleteNote.php', {
        noteid: $('#note-id').val(),
        callid: $('#call-id').val() ? $('#call-id').val() : undefined
    }, function(result) {
        //    Update the ticket page
        populateNotes(ticketInfo);

        //    Close the modal
        $('#notesModal').modal('hide');
    });
}

let problemTypesList;
function editTicket() {
    // let inputs = ;

    $('input.modifiable').fadeOut(function () {
        $(this).fadeIn().addClass('form-control').removeClass('form-control-plaintext').removeAttr('readonly');
    });

    $('#edit-button').fadeOut(function() {
        $('#save-button').fadeIn();
    });

//    Add awesomplete stuff to priority type, to match the add call GUI
    let input = $('#problem-type');
    problemTypesList = new Awesomplete(input[0]);
    problemTypesList.minChars = 0;
    $.get('scripts/getProblemTypes.php', function(result) {
        console.log(result[0]);
        let array = [];
        for (let i in result) {
            array.push(result[i][0]);
        }
        problemTypesList.list = array;
    }, 'json');

    input.on('focus', function() {
        problemTypesList.evaluate();
        problemTypesList.open();
    });
}

function saveTicket() {
    $('input.modifiable').fadeIn().addClass('form-control-plaintext').removeClass('form-control').attr('readonly', true);


    $('#save-button').fadeOut(function() {
        $('#edit-button').fadeIn();
    });

    problemTypesList.destroy();

    let priority = $('#priority').val();

    if (priority === "Low") priority = 0;
    if (priority === "Medium") priority = 1;
    if (priority === "High") priority = 2;

    $.get('scripts/updateTicket.php', {
        ticketnumber: ticketInfo.ticketNumber,
        priority: priority,
        problemtype: $('#problem-type').val(),
        operatingsystem: $('#operating-system').val(),
        problemdescription: $('#original-description').val(),
        licencenumber: $('#software-licence-number').val() === "" ? 'NULL' : $('#software-licence-number').val(),
        serialnumber: $('#serial-number').val() === "" ? 'NULL' : $('#serial-number').val(),
    }, function(result) {

    }, 'json');
}
