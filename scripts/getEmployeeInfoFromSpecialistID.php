// Contributions by: Aman Dhoot
<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 13/02/2018
 * Time: 21:13
 *
 * takes a speicialist ID as an input and returns the employees details for the specialist
 */

require 'connect.php';

$specialistID = $_REQUEST['specialistid'];

$sql = "SELECT userID FROM Specialists WHERE specialistID = $specialistID";
$result = $conn->query($sql);
if ($conn->error) die($conn->error);
$userID = $result->fetch_row()[0];


$sql = "SELECT * FROM Users LEFT JOIN Employees ON Users.employeeID = Employees.employeeID WHERE Users.userID = $userID";

$result = $conn->query($sql);

if ($conn->error) die($conn->error);

echo json_encode($result->fetch_object());
