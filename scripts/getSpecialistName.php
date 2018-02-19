<?php
// Contributions by: Linus kurz

require('connect.php');

$specialistname = $_REQUEST['specialistname'];

$result1 = $specialistname;
$result2 = $result1.split(":");
$result3 = $result2[0];
$result4 = $result1.split(" ");
$result5 = $result4[2];

$sql = "SELECT firstName, lastName FROM Employees WHERE employeeID = (SELECT employeeID FROM Users WHERE userID = (SELECT userID FROM Users WHERE userID = '$result5'))";

$result = $conn->query($sql);
if ($conn->error) die ($conn->error);

echo json_encode($result->fetch_all());
