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
    <title>Analytics - Helpdesk 360</title>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/glyphs/css/glyph.css">


    <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
    <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>



    <script src="js/script.js"></script>
    <script src="js/analytics.js"></script>

</head>
<body class="bg-light">

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
                <a class="nav-link active" href="analytics.php">Analytics</a>
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
        <h1 class="display-4 text-center mt-4" style="font-size: 4em">Welcome to the Analytics Page</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h4 class="display-4 text-center mt-4" style="font-size: 2em">Here you can see Current and past analytics</h4>
      </div>
    </div>
<!--    <div class="row">
      <div class="col-12">
        <h4 class="display-4 text-center mt-4" style="font-size: 2em">Select a button to continue</h4>
      </div>
    </div>  -->
    <div class="row">
      <div class="col-12 col-md-5 px-4 my-2">
          <button class="btn btn-primary btn-block m-auto" style="font-size: 25px;" onclick="location.href='currentAnalytics.php'">Current Analytics</button>
      </div>
      <div class="col-md-2">
      </div>
      <div class="col-12 col-md-5 px-4 my-2">
          <button class="btn btn-primary btn-block m-auto" style="font-size: 25px;">Past Analytics</button>
      </div>
    </div>




</body>
</html>
