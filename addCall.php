<?php
session_start();
//If user is not logged in, ask user to log in
if (!isset($_SESSION['user'])) {
    header('Location: login.php');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title> New Call | Helpdesk 360 </title>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/glyphs/css/glyph.css">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>

    <script src="js/script.js"></script>
</head>
<body class="bg-light body-margin-bottom">
<nav class="navbar  navbar-expand-md navbar-dark bg-dark flex-sm-nowrap">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".collapse">
        <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand nav-abs order-1" href="index.php"><img src="img/helpdesk-logo.png" alt="Helpdesk-360 Logo" height="33px"></a>
    <div class="navbar-collapse collapse order-3 order-md-1">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="specialistHome.php">Specialist Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="ticketList.php">View Tickets</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="analytics.php">Analytics</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="admin.php">Admin</a>
            </li>

        </ul>
    </div>
    <div class="ml-auto order-2 order-md-3" style="white-space: nowrap">
        <a id="accountPopover" class="navbar-text nav-link nav-account" href="#" data-toggle="popover" title="Account" data-placement="bottom"> <?= $_SESSION['user'] ?> <i class="icon-user"></i></a>
    </div>
</nav>

<div class="container my-3">
    <div class="row">
        <h1 class="display-4 text-center w-100">New Call</h1>
    </div>
    <div class="row my-2">
        <ul class="nav nav-tabs nav-fill w-100" role="tablist">
            <li class="nav-item">
                <a href="#create" id="create-tab" data-toggle="tab" role="tab" class="nav-link active">Create New Ticket</a>
            </li>
            <li class="nav-item">
                <a href="#add" id="add-tab" data-toggle="tab" role="tab" class="nav-link">Add to existing Ticket</a>
            </li>
        </ul>
        <div class="tab-content col-12">
            <div class="tab-pane fade show active" id="create" role="tabpanel">
                <form action="">
                    <div class="row">
                        <div class="col-12 col-md-4">
                            <label for="create-call-time">Call Time</label>
                            <input type="time" class="form-control" id="create-call-time" placeholder="hh:mm">
                            <small class="text-secondary">Time the call was received</small>
                        </div>
                        <div class="col-12 col-md-4">
                            <label for="create-call-date">Call Date</label>
                            <input type="date" class="form-control" id="create-call-date" placeholder="dd/mm/yyyy">
                            <small class="text-secondary">Date the call was received</small>
                        </div>
                        <div class="form-group col-12 col-md-4">
                            <label for="create-priority">Priority</label>
                            <select class="form-control custom-select" id="create-priority">
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12 col-md-4">
                            <label for="create-employee-id">Employee's ID</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="create-employee-id" placeholder="1234">
                                <span class="input-group-btn">
                                    <button class="btn btn-secondary" type="button">Confirm</button>
                                </span>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <label for="create-employee-name">Employee's Name</label>
                            <input type="text" class="form-control" id="create-employee-name" placeholder="John Smith">
                        </div>
                        <div class="col-12 col-md-4">
                            <label for="create-employee-contact-number">Employee's Contact Number</label>
                            <input type="text" class="form-control" id="create-employee-contact-number" placeholder="07123 456 789">
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12 col-md-4">
                            <label for="create-problem-type">Problem Type</label>
                            <input type="text" class="form-control" id="create-problem-type" placeholder="Printer">
                        </div>
                        <div class="col-12 col-md-4">
                            <label for="create-OS">Operating System</label>
                            <input type="text" class="form-control" id="create-OS" placeholder="Windows 10">
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12">
                            <label for="create-problem-description">Problem Description</label>
                            <textarea name="" id="create-problem-description" class="form-control w-100"></textarea>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 col-md-4 mt-4">
                            <h5>Software Issue</h5>
                            <label for="create-licence-number">Licence Number</label>
                            <div class="input-group">
                                <input type="text" id="create-licence-number" class="form-control w-100">
                                <span class="input-group-btn">
                                    <button class="btn btn-secondary" type="button">Check</button>
                                </span>
                            </div>
                        </div>
                        <div class="col-12 col-md-8 mt-4">
                            <h5>Hardware Issue</h5>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <label for="create-serial-number">Serial Number</label>
                                    <div class="input-group">
                                        <input type="text" id="create-serial-number" class="form-control w-100">
                                        <span class="input-group-btn">
                                    <button class="btn btn-secondary" type="button">Check</button>
                                </span>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <label for="create-unique-identifier">Unique Identifier</label>
                                    <div class="input-group">
                                        <input type="text" id="create-unique-identifier" class="form-control w-100">
                                        <span class="input-group-btn">
                                    <button class="btn btn-secondary" type="button">Check</button>
                                </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col-12">
                            <label for="add-notes">Call Notes</label>
                            <textarea name="" id="create-notes" class="form-control w-100"></textarea>
                        </div>
                    </div>

                    <div class="row justify-content-center col-12">
                        <button class="btn btn-primary col-md-4 my-5" type="button">Assign to specialist</button>
                           <div class ="col-md-2">
                           </div>
                        <button class="btn btn-primary col-md-4 my-5" type="button">Create Ticket</button>
                    </div>


                </form>
            </div>

            <!--Add to existing ticket tab-->
            <div class="tab-pane fade" id="add" role="tabpanel">
                <form action="">
                    <div class="row">
                        <div class="col-12 col-md-4">
                            <label for="add-call-time">Call Time</label>
                            <input type="time" class="form-control" id="add-call-time" placeholder="hh:mm">
                            <small class="text-secondary">Time the call was received</small>
                        </div>
                        <div class="col-12 col-md-4">
                            <label for="add-call-date">Call Date</label>
                            <input type="date" class="form-control" id="add-call-date" placeholder="dd/mm/yyyy">
                            <small class="text-secondary">Date the call was received</small>
                        </div>
                        <div class="col-12 col-md-4">
                            <label for="add-ticket-number">Ticket Number</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="add-ticket-number" placeholder="123456">
                                <span class="input-group-btn">
                                    <button class="btn btn-secondary" type="button">Confirm</button>
                                </span>
                            </div>
                            <small class="text-secondary">Ticket to add call to</small>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12 col-md-4">
                            <label for="add-employee-id">Employee's ID</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="add-employee-id" placeholder="1234">
                                <span class="input-group-btn">
                                    <button class="btn btn-secondary" type="button">Confirm</button>
                                </span>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <label for="add-employee-name">Employee's Name</label>
                            <input type="text" class="form-control" id="add-employee-name" placeholder="John Smith">
                        </div>
                        <div class="col-12 col-md-4">
                            <label for="add-employee-contact-number">Employee's Contact Number</label>
                            <input type="text" class="form-control" id="add-employee-contact-number" placeholder="07123 456 789">
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12">
                            <label for="add-notes">Call Notes</label>
                            <textarea name="" id="add-notes" class="form-control w-100"></textarea>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <button class="btn btn-primary col-12 col-md-4 my-5" type="button">Add to ticket</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>

</body>
</html>
