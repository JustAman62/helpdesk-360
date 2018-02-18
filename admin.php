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
    <title>Admin Page - Helpdesk 360</title>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/glyphs/css/glyph.css">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>

    <script src="js/script.js"></script>
    <script src="js/admin.js"></script>
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
                <a class="nav-link" href="specialistHome.php">Specialist Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="ticketList.php">View Tickets</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="currentAnalytics.php">Analytics</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="admin.php">Admin</a>
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
            <h1 class="display-4 text-center">Admin</h1>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 col-12">
            <div class="card">
                <h5 class="card-header text-center">
                    Employees
                    <a class="text-secondary" href="#"><i class="icon icon-search"></i></a>
                </h5>
                <div class="list-group list-group-flush" id="user-list"></div>
                <div class="card-footer text-muted small text-center">
                    <span id="user-count"></span> Employees
                </div>
            </div>
          </div>
          <div class="col-md-4 col-12">
            <div class="card">
                <h5 class="card-header text-center">
                    Software
                    <a class="text-secondary" href="#"><i class="icon icon-search"></i></a>
                </h5>
                <div class="list-group list-group-flush" id="software-list"></div>
                <div class="card-footer text-muted small text-center">
                    <span id="software-count"></span> Software
                </div>
            </div>
            <br/>
            <div class="card">
                <h5 class="card-header text-center">
                    Hardware
                    <a class="text-secondary" href="#"><i class="icon icon-search"></i></a>
                </h5>
                <div class="list-group list-group-flush" id="hardware-list"></div>
                <div class="card-footer text-muted small text-center">
                    <span id="hardware-count"></span> Hardware
                </div>
            </div>
          </div>
        </div>
    </div>



<!--Modal for user creation/modifying-->
<div class="modal fade" id="employeeModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header justify-between">
                <h3 class="my-0">Edit User</h3>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group row">
                        <label for="employee-id" class="col-sm-4 col-form-label">Employee ID</label>
                        <div class="col-sm-8">
                            <input type="text" readonly class="form-control-plaintext" id="employee-id" value="lala">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="first-name" class="col-sm-4 col-form-label">First Name</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="first-name" placeholder="John">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="last-name" class="col-sm-4 col-form-label">Last Name</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="last-name" placeholder="Smith">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="contact-number" class="col-sm-4 col-form-label">Contact Number</label>
                        <div class="col-sm-8">
                            <input type="tel" class="form-control" id="contact-number" placeholder="07123456789">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="department" class="col-sm-4 col-form-label">Department</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="department" placeholder="Accounting">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="job-title" class="col-sm-4 col-form-label">Job Title</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="job-title" placeholder="Software Engineer">
                        </div>
                    </div>

                    <hr>
                    <div id="user-indicator">
                        <p class="text-center">This employee has no user account</p>
                        <button type="button" class="btn btn-primary mx-auto btn-block btn-sm" onclick="createUserForEmployee()">Create User Account</button>
                    </div>

                    <div id="user-details">
                        <div class="form-group row">
                            <label for="user-id" class="col-sm-4 col-form-label">User ID</label>
                            <div class="col-sm-8">
                                <input type="text" readonly class="form-control-plaintext" id="user-id" value="lala">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="user-password" class="col-sm-4 col-form-label">Password</label>
                            <div class="col-sm-8">
                                <input type="password" class="form-control" id="user-password" placeholder="Password">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="user-access-level" class="col-sm-4 col-form-label">Access Level</label>
                            <div class="col-sm-8">
                                <select class="form-control custom-select" id="user-access-level">
                                    <option>Operater & Specialist</option>
                                    <option>Specialist</option>
                                </select>
                            </div>
                        </div>
                        <button type="button" class="btn btn-outline-danger mx-auto btn-block btn-sm" onclick="deleteUser()">Delete User</button>
                    </div>
                </form>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-outline-danger" onclick="deleteEmployee()">Delete Employee</button>
                <div class="right">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-success" onclick="saveRecord()">Save</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="softwareModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header justify-between">
                <h3 class="my-0">Edit User</h3>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group row">
                        <label for="licence-number" class="col-sm-4 col-form-label">Licence Number</label>
                        <div class="col-sm-8">
                            <input type="text" readonly class="form-control-plaintext" id="licence-number" value="lala">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="name" class="col-sm-4 col-form-label">Name</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="name" placeholder="John">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="type" class="col-sm-4 col-form-label">Type</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="type" placeholder="Smith">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-outline-danger" onclick="deleteEmployee()">Delete Employee</button>
                <div class="right">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-success" onclick="saveRecord()">Save</button>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>
