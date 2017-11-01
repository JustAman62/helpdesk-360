
//On page load, for every page on the website
$(function() {
    //    Init popover
    $('#accountPopover').popover({
        'content': "<a href='login.php'> <button type='button' class='btn btn-primary'> Logout </button></a>",
        'html': true
    });
});

