//Find out what ticket number the page has been opened for, default to ticket 1
let ticketNum = 1;
$(function() {
    console.log(location.search.split('&')[0].split('=')[1]);
    ticketNum = location.search.split('&')[0].split('=')[1] - 1;
    //When the page is first loaded, populate the ticket info
    // populateNotes();
    populateTicketInfo();
    populateNotes();


    //When the notes modal is shown, update the note textarea to match the note it was clicked on
    $('#notesModal').on('show.bs.modal', function(event) {
        // console.log($(event.relatedTarget).data());
        noteID = $(event.relatedTarget).data('noteId');
        // console.log(noteID)

        let noteModal = $(this);
        noteModal.find('.modal-body textarea').val(notes[noteID]).trigger('input');

    }).on('shown.bs.modal', function() {
        $('.modal-body textarea').trigger('input');
    });
    //Save the note displayed in the modal when the save button is clicked
    $('#saveNote').on('click', function() {
        let note = $('.modal-body textarea').val();
        notes[noteID] = note;

        //    Update the ticket page
        populateNotes();

        //    Close the modal
        $('#notesModal').modal('hide');
    });




});

function populateTicketInfo() {
    $('.auto-fill').each(function(i, element) {
        element.innerHTML = tickets[ticketNum][element.dataset.autofill];
    })
}

function populateNotes() {
    let ticketNotes = [];
    // Make sure the notes section is empty to prevent repetitions
    $('#note-list').html('');

    for (i in notes) {
        if (notes[i].ticketNumber === ticketNum) ticketNotes.push(I);
    }

    for (i in ticketNotes) {
        makeNoteListItem(ticketNotes[i]);
    }
//    Add a make new note button
    let newNoteElement = document.createElement('button')
    newNoteElement.setAttribute('type', 'button');
    newNoteElement.setAttribute('class', 'list-group-item list-group-item-action');
    newNoteElement.setAttribute('onclick', 'javascript:addNewNote()');
    let plusIcon = document.createElement('i')
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
    // let dateString = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();

    let dateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

    let dateTimeText = document.createElement('small');
    dateTimeText.appendChild(document.createTextNode(dateString));
    noteElement.appendChild(dateTimeText);
    noteElement.appendChild(document.createElement('br'));

    let noteText = document.createElement('span');
    // noteText.appendChild(document.create(notes[noteID].replace('\n', '<br>')));
    $(noteText).html(notes[noteID].Text.replace(/\n/g, ' <br> '));
    noteElement.appendChild(noteText);

    $('#note-list').append(noteElement)
}

function addNewNote() {
    notes.push("New Note")
    populateNotes();
}
