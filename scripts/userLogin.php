<?php
session_start();

require('connect.php');

$userID = $_REQUEST['userid'];
$password = $_REQUEST['password'];

$sql = "SELECT * FROM Users WHERE userID = $userID AND password = '$password'";

$result = $conn->query($sql);
if ($conn->error) die($conn->error);

if ($result->num_rows == 0) {
    echo 'failure';
}
else {
    echo 'success';
    $_SESSION['userid'] = $userID;
}