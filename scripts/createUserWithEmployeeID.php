<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 10/02/2018
 * Time: 13:45
 *
 * When given an employeeID, it creastes a user account for that employee
 */

require('connect.php');

$employeeID = $_REQUEST['employeeid'];

// Find the max user id

$sql = "SELECT MAX(userID) FROM Users";

$userID = $conn->query($sql);
if ($conn->error) die($conn->error);
$userID++;


$sql = "INSERT INTO Users (userID, password, accessLevel, employeeID) VALUES ($userID, 'password', 1, $employeeID)";

$result = $conn->query($sql);

if ($conn->error) die($conn->error);


echo "User created for employee #$employeeID";
