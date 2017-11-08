<?php
session_start();
if (isset($_REQUEST['user'])) {
    $_SESSION['user'] = $_REQUEST['user'];
}

if (!isset($_SESSION['user'])) {
    header('Location: login.php');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Home - Helpdesk 360</title>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/glyphs/css/glyph.css">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>

    <script src="js/script.js"></script>
</head>
<body class="bg-light">

<nav class="navbar  navbar-expand-md navbar-dark bg-dark flex-sm-nowrap">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".collapse">
        <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand nav-abs order-1" href="index.php"><img src="img/helpdesk-logo.png" alt="Helpdesk-360 Logo" height="33px"></a>
    <div class="navbar-collapse collapse order-3 order-md-1">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="ticketList.php">View Tickets</a>
            </li>
        </ul>
    </div>
    <div class="ml-auto order-2 order-md-3" style="white-space: nowrap">
        <a id="accountPopover" class="navbar-text nav-link nav-account" href="#" data-toggle="popover" title="Account" data-placement="bottom"> <?= $_SESSION['user'] ?> <i class="icon-user"></i></a>
    </div>
</nav>

<div class="container mt-4">
<div class="col-12 col-md-6">
    <div class="row d-flex flex-justify-content-between">
        <div class="col-12 px-4">
            <button class="btn btn-secondary btn-block" style="min-height:10vh" onclick="location.href='addCall.php'">New Call</button>
        </div>
        <div class="col-12 px-4">
            <button class="btn btn-secondary btn-block" style="min-height:10vh">Search For Ticket</button>
        </div>
    </div>
</div>
<div class="col-12 col-md-6">
ticket list
</div>

</div>

</body>
</html>