<?php
session_start();

require('connect.php');

$userID = $_REQUEST['userid'];
$password = $_REQUEST['password'];

$sql = "SELECT * FROM Users LEFT JOIN Employees ON Users.employeeID = Employees.employeeID WHERE userID = '$userID' AND password = '$password'";
$sql1 = "SELECT `Users`.`accessLevel` FROM `Users` WHERE `Users`.`userID`='$userID'";

$result = $conn->query($sql);
if ($conn->error) die($conn->error);
$result1 = $conn->query($sql1);
if ($conn->error) die($conn->error);

if ($result->num_rows == 0) {
    echo 'failure';
}

else {
    if ($result1=='0') {
        echo 'both';
        $_SESSION['userid'] = $userID;
        $employee = $result->fetch_object();
        $_SESSION['username'] = $employee->firstName." ".$employee->lastName;
    }
    else {
        echo $result1;
        $_SESSION['userid'] = $userID;
        $employee = $result->fetch_object();
        $_SESSION['username'] = $employee->firstName." ".$employee->lastName;
    }
}


