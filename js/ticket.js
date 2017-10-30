var notes = [
    'ndwqd dowqboi nwoi',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam deserunt error est hic in, nihil perspiciatis provident quasi qui quis quod recusandae sequi suscipit voluptates. Eveniet nisi recusandae voluptatem!',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam deserunt error est hic in, nihil perspiciatis provident quasi qui quis quod recusandae sequi suscipit voluptates. Eveniet nisi recusandae voluptatem! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam deserunt error est hic in, nihil perspiciatis provident quasi qui quis quod recusandae sequi suscipit voluptates. Eveniet nisi recusandae voluptatem!'
];

$('#notesModal').on('show.bs.modal', function(event) {
    var originalButton = $(event.relatedTarget);
    var noteID = originalButton.data('note-id');

    var noteModal = $(this);
    noteModal.find('modal-body textarea').val(notes[noteID]);
});
