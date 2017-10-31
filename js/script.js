
//On page load, for every page on the website
$(function() {
    //    Init popover
        $('#accountPopover').popover({
        'content': "<a href='index.html'> <button type='button' class='btn btn-primary'> Logout </button></a>",
        'html': true
    });
});