<?php
session_start();

require('connect.php');

$userID = $_REQUEST['userid'];
$acessLevel = $_REQUEST['acesslevel'];
$password = $_REQUEST['password'];

$sql = "SELECT * FROM Users LEFT JOIN Employees ON Users.employeeID = Employees.employeeID WHERE userID = '$userID' AND password = '$password'";

$result = $conn->query($sql);
if ($conn->error) die($conn->error);

if ($result->num_rows == 0) {
    echo 'failure';
}
else {
    if ($acessLevel==1) {
        echo 'specialist';
        $_SESSION['userid'] = $userID;
        $employee = $result->fetch_object();
        $_SESSION['username'] = $employee->firstName." ".$employee->lastName;
    }
    elseif ($acessLevel==1){
        echo 'both';
        $_SESSION['userid'] = $userID;
        $employee = $result->fetch_object();
        $_SESSION['username'] = $employee->firstName." ".$employee->lastName;
    }


}


