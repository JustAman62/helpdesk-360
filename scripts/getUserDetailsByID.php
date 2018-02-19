<?php
// Contributions by: Jess McCreery

require 'connect.php';

$userid = $_REQUEST['userid'];

$sql = "SELECT * FROM Users LEFT JOIN Employees ON Users.employeeID = Employees.employeeID WHERE userID = $userid";

$result = $conn->query($sql);
if ($conn->error) die($conn->error);


echo json_encode($result->fetch_object());
