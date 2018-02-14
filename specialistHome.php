<?php
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
    <title> Specialist Home | Helpdesk 360 </title>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/glyphs/css/glyph.css">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>

    <script src="js/data.js"></script>
    <script src="js/script.js"></script>
    <script src="js/ticketGenerator.js"></script>
    <script src="js/specialistHome.js"></script>

</head>


<body>

<nav class="navbar  navbar-expand-md navbar-dark bg-dark flex-sm-nowrap">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".collapse">
        <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand nav-abs order-1" href="index.php"><img src="img/helpdesk-logo.png" alt="Helpdesk-360 Logo" height="33px"></a>
    <div class="navbar-collapse collapse order-3 order-md-1">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link active" href="specialistHome.php">Specialist Home</a>
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
        <a id="accountPopover" class="navbar-text nav-link nav-account" href="#" data-toggle="popover" title="Account" data-placement="bottom"> <?= $_SESSION['username'] ?> <i class="icon-user"></i></a>
    </div>
</nav>

<div class="container mt-4">
    <div class="row">
        <div class="col-12">
            <h1 class="text-center display-4">Specialist Homepage</h1>
            <h4 class="text-center small">(#1005)</h4>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-5 px-4 my-2">
            <button class="btn btn-primary btn-block m-auto" style="font-size: 25px;" onclick="location.href='ticketList.php'">View All Tickets</button>
        </div>
        <div class="col-md-2">
        </div>
        <div class="col-12 col-md-5 px-4 my-2">
            <button class="btn btn-primary btn-block m-auto" data-toggle="modal" data-target="#searchModal" style="font-size: 25px;">Search For Ticket <i class="icon-search"></i></button>
        </div>
    </div>

    <hr>

    <div class="row justify-content-center">
        <div class="col-12 col-md-8">
            <h4 class="text-center">My Tickets (<span id="num-tickets"></span>)</h4>
            <h4 class="text-center small my-0">Sort By</h4>
            <div class="btn-group btn-group-sm mb-2 w-100 my-1">
                <button class="btn btn-secondary ml-auto active">Date Created</button>
                <button class="btn btn-secondary mr-auto">Priority</button>
            </div>
        </div>
        <div class="col-12">
            <div id="ticket-list"></div>
        </div>
    </div>
</div>

<!--Modal for search for tickets-->
<div class="modal fade" id="searchModal" tabindex="-1" role="dialog">
    <div class="modal-dialog pt-5" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <form action="javascript:navToTicket()">
                    <div class="input-group">
                        <input type="text" id="searchText" class="my-0 form-control" placeholder="Ticket Number">
                        <span class="input-group-btn">
                            <button class="btn btn-primary" onclick="navToTicket()" type="submit">Open</button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

</body>
</html>