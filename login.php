<?php
// Contributions by: Aman Dhoot

//End and recreate the session every time the login page is opened, to simulate a logout
session_destroy();
session_regenerate_id(true);
session_start();
$_SESSION = array();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Login - Helpdesk 360</title>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/glyphs/css/glyph.css">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>

    <script src="js/script.js"></script>
    <script src="js/login.js"></script>
</head>
<body>
<div class="container" style="min-height:0px">
    <div class="d-flex justify-content-center align-items-center" style="margin-top: 5%">
        <img src="img/helpdesk-login.png" alt="Helpdesk-360 Login" height="400px">
    </div>
    <br>
    <div class="row justify-content-center">
        <form action="javascript:login()">
            <div class="input-group">
                <span class="input-group-addon">User ID</span>
                <input class="form-control" type="text" title="User ID" name="user" id="user-id">
            </div>
            <br>
            <div class="input-group">
                <span class="input-group-addon">Password</span>
                <input class="form-control" type="password" title="Password" name="password" id="password">
            </div>
            <br>
            <div class="row justify-content-center col-4 mx-auto">
                <button class="btn btn-primary w-100" type="submit">Login</button>
            </div>
            <div class="row justify-content-center col-10 mx-auto my-1">
                <small class="text-danger text-center" id="login-failure">User ID / Password incorrect <br> Please Try Again</small>
            </div>
        </form>
    </div>
</div>
</body>
</html>
