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

// Find the max user id, and add one to get the value of the next ID

$sql = "SELECT MAX(userID) FROM Users";

$userID = $conn->query($sql);
if ($conn->error) die($conn->error);
$userID = $userID->fetch_row()[0]+1;

// Check that the employee doesn't already have a user account

$sql = "SELECT * FROM Users WHERE employeeID = $employeeID";
$numUsers = $conn->query($sql);
if ($conn->error) die($conn->error);
if ($numUsers->num_rows > 0) die('Employee already has user account');

//Create the user account for the user

$sql = "INSERT INTO Users (userID, password, accessLevel, employeeID) VALUES ($userID, 'password', 1, $employeeID)";

$result = $conn->query($sql);

if ($conn->error) die($conn->error);


echo "User created for employee #$employeeID";
