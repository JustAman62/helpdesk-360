<?php
// Contributions by: Aman Dhoot, Jess McCreery, Mary Roca, Linus kurz
session_start();
//If the user is not logged in, send them to login page
if (!isset($_SESSION['userid'])) {
    header('Location: login.php');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title> Ticket - Helpdesk 360 </title>

    <link rel="stylesheet" href="css/awesomplete.css" />
    <script src="js/awesomplete.js"></script>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/glyphs/css/glyph.css">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>

    <script src="js/script.js"></script>
    <script src="js/ticket.js"></script>
</head>
<body>
<!-----------------------Header----------------------------->
<nav class="navbar  navbar-expand-md navbar-dark bg-dark flex-sm-nowrap">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".collapse">
        <span class="navbar-toggler-icon"></span>
    </button>
    <?php if ($_SESSION['accesslevel']){ ?>
    <a class="navbar-brand nav-abs order-1" href="specialistHome.php"><img src="img/helpdesk-logo.png" alt="Helpdesk-360 Logo" height="33px"></a>
    <div class="navbar-collapse collapse order-3 order-md-1">
        <ul class="navbar-nav">
            <?php } else { ?>
            <a class="navbar-brand nav-abs order-1" href="index.php"><img src="img/helpdesk-logo.png" alt="Helpdesk-360 Logo" height="33px"></a>
            <div class="navbar-collapse collapse order-3 order-md-1">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="specialistHome.php">Specialist Home</a>
                    </li>
                    <?php } ?>
            <li class="nav-item">
                <a class="nav-link" href="ticketList.php">View Tickets</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="currentAnalytics.php">Analytics</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="admin.php">Admin</a>
            </li>
        </ul>
    </div>
    <div class="ml-auto order-2 order-md-3" style="white-space: nowrap">
        <a id="accountPopover" class="navbar-text nav-link nav-account" href="#" data-toggle="popover" title="Account" data-placement="bottom"> <?= $_SESSION['username'] ?> <i class="icon-user"></i></a>
    </div>
</nav>

<!-----------------------Content----------------------------->
<div class="container mb-5 mt-3">
    <a class="no-hover-underline" href="javascript:history.back()"><i class="icon icon-left-open-big"></i>Back</a>
    <h1 class="display-4 text-center">Ticket #<span id="ticket-number"></span></h1>
    <div class="container text-center" id="badge-list">
    </div>

    <hr>

    <h3>Employee Details</h3>
    <dl class="row">
        <dt class="col-4 col-md-3 text-right">ID</dt>
        <dd class="col-8 col-md-9" id="employee-id">Placeholder</dd>

        <dt class="col-4 col-md-3 text-right">Name</dt>
        <dd class="col-8 col-md-9" id="employee-name">Placeholder</dd>

        <dt class="col-4 col-md-3 text-right">Contact Number</dt>
        <dd class="col-8 col-md-9" id="employee-contact-number">Placeholder</dd>
    </dl>

    <hr>

    <div class="d-flex mb-3">
        <h3>Ticket Details</h3>
        <a class="ml-auto no-hover-underline" id="edit-button" href="javascript:editTicket()">Edit <i class="icon icon-pencil"></i> </a>
        <a class="ml-auto no-hover-underline" id="save-button" href="javascript:saveTicket()">Save</a>
    </div>
    <form id="ticket-details">
        <div class="form-group row">
            <label for="date-created" class="col-2 col-md-3 col-form-label text-right">Created On</label>
            <div class="col-10 col-md-9">
                <input type="text" readonly class="form-control-plaintext modifiable" id="date-created" value="Placeholder">
            </div>
        </div>

        <div class="form-group row">
            <label for="created-by" class="col-2 col-md-3 text-right col-form-label">Created By</label>
            <div class="col-10 col-md-9">
                <input type="text" readonly class="w-100 form-control-plaintext" id="created-by" value="fwefwe">
            </div>
        </div>

        <div class="form-group row">
            <label for="problem-type" class="col-2 col-md-3 text-right col-form-label">Problem Type</label>
            <div class="col-10 col-md-9">
                <input type="text" readonly class="w-100 form-control-plaintext modifiable" id="problem-type" value="">
            </div>
        </div>

        <div class="form-group row">
            <label for="priority" class="col-2 col-md-3 text-right col-form-label">Priority</label>
            <div class="col-12 col-md-9">
                <input type="text" readonly class="w-100 form-control-plaintext modifiable" id="priority" value="">
            </div>
        </div>

        <div class="form-group row">
            <label for="original-description" class="col-2 col-md-3 text-right col-form-label">Original Description</label>
            <div class="col-10 col-md-9">
                <input type="text" readonly class="w-100 form-control-plaintext modifiable auto-fill" data-autofill="originalDescription" id="original-description" value="">
            </div>
        </div>

        <div class="form-group row">
            <label for="serial-number" class="col-2 col-md-3 text-right col-form-label">Serial Number</label>
            <div class="col-10 col-md-9">
                <input type="text" readonly class="form-control-plaintext modifiable auto-fill" data-autofill="serialNumber" id="serial-number" value="">
            </div>
        </div>

        <div class="form-group row">
            <label for="software-licence-number" class="col-2 col-md-3 text-right col-form-label">Licence Number</label>
            <div class="col-10 col-md-9">
                <input type="text" readonly class="form-control-plaintext modifiable auto-fill" data-autofill="licenceNumber" id="software-licence-number" value="">
            </div>
        </div>

        <div class="form-group row">
            <label for="operating-system" class="col-2 col-md-3 text-right col-form-label">Operating System</label>
            <div class="col-10 col-md-9">
                <input type="text" readonly class="form-control-plaintext modifiable auto-fill" data-autofill="operatingSystem" id="operating-system" value="">
            </div>
        </div>
    </form>


    <hr>

    <h3>Specialist Details</h3>
    <h6 id="no-specialist">No Specialist is currently assigned to this ticket</h6>
    <div id="specialistDetails">
        <dl class="row">
            <dt class="col-4 col-md-3 text-right">ID</dt>
            <dd class="col-8 col-md-9" id="specialist-employee-id">Placeholder</dd>

            <dt class="col-4 col-md-3 text-right">Name</dt>
            <dd class="col-8 col-md-9" id="specialist-name">Placeholder</dd>

            <dt class="col-4 col-md-3 text-right">Contact Number</dt>
            <dd class="col-8 col-md-9" id="specialist-contact-number">Placeholder</dd>
        </dl>
    </div>
    <hr>

    <h3>Notes</h3>
    <!--Display each note in a seperate list item, grouped together
    When a item is clicked, show a modal to allow editing of the note-->
    <div class="list-group" id="note-list">
        <!--These Notes are now auto generated by the js code-->
        <!--Template:-->
        <!--<button type="button" class="list-group-item list-group-item-action" data-toggle="modal" data-target="#notesModal" data-note-id="0">-->
        <!--<small>19/09/2018 06:10</small><br>-->
        <!--<span>some notes</span>-->
        <!--</button>-->
    </div>

    <hr>

    <div class="row">
        <div class="col-12">
            <h3>Ticket Actions</h3>
        </div>
        <div class="col-12 col-md-6">
            <button class="btn btn-primary btn-block mr-0 ml-md-1 my-2 my-md-0">Assign to Specialist</button>
        </div>
        <div class="col12 col-md-6">
            <button class="btn btn-danger btn-block ml-0 mr-md-1 my-2 my-md-0" onclick="closeTicket()">Close Ticket</button>
        </div>
    </div>

</div>

<!--Notes modal-->
<div class="modal fade" id="notesModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="my-0">Edit Note</h3>
                <small>Created On: <span id="date-note-created"></span></small>
            </div>
            <div class="modal-body">
                <input type="hidden" id="note-id">
                <input type="hidden" id="call-id">
                <textarea name="note" id="modalNoteText" class="col-12 border border-secondary rounded my-0" placeholder="Notes"></textarea>
            </div>
            <div class="modal-footer justify-content-between">
                <div class="left">
                    <button type="button" class="btn btn-outline-danger" onclick="deleteNote()">Delete Note</button>
                </div>
                <div class="right">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-success" id="saveNote">Save</button>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>
