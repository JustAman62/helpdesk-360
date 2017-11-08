<?php

//End the session every time the login page is opened, to simulate a logout
session_start();
$_SESSION = array();
session_destroy();
session_regenerate_id(true);


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Log In - Helpdesk 360</title>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/glyphs/css/glyph.css">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>

    <script src="js/script.js"></script>

</head>
<body>



<div class="container" style="min-height:80vh">
    <div class="row justify-content-center align-items-center" style="min-height: 80vh">
        <div class="col-12 col-md-6">
                <div class="row justify-content-center">
                <img src="img/helpdesk-login.png" alt="Helpdesk-360 Login" height="50px">
                    <form action="index.php">
                        <div class="input-group">
                            <span class="input-group-addon">User ID</span>
                            <input class="form-control" type="text" title="User ID" name="user">
                        </div>
                        <br>
                        <div class="input-group">
                            <span class="input-group-addon">Password</span>
                            <input class="form-control" type="password" title="Password" name="password">
                        </div>
                        <br>
                        <div class="row justify-content-center col-4 mx-auto">
                            <button class="btn btn-primary w-100" type="submit">Login</button>
                        </div>
                    </form>
                </div>
        </div>
    </div>
</div>
</body>
</html>