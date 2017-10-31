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
    </a>`

function addTicket() {
    var html = $('#open-ticket-list').html();
    $('#open-ticket-list').html(html + openTicket);
    console.log(openTicket, 'lala');
}

$(function() {
    //    Init popover
        $('#accountPopover').popover({
        'content': "<a href='index.html'> <button type='button' class='btn btn-primary'> Logout </button></a>",
        'html': true
    });
});