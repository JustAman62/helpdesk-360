
//On page load, for every page on the website
$(function() {
    //    Init popover for user logout
    $('#accountPopover').popover({
        'content': "<a href='login.php'> <button type='button' class='btn btn-primary'> Logout </button></a>",
        'html': true
    });

    //    auto resize text areas
    $('textarea').each(function () {
        this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input change cut paste drop keyup', resizeTextArea);
});

function resizeTextArea() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
}

function navToTicket() {
    let searchTicket = $('#searchText').val();
    if (searchTicket === undefined || searchTicket === "") searchTicket = 1;
    location.href = 'ticket.php?ticketNum=' + searchTicket
}