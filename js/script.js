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
    $('#open-ticket-list').innerHTML += openTicket;
}