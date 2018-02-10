<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 10/02/2018
 * Time: 16:58
 *
 * create a new employee in the employees table
 */

// Find the max user id, and add one to get the value of the next ID

$sql = "SELECT MAX(employeeID) FROM Employees";

$employeeID = $conn->query($sql);
if ($conn->error) die($conn->error);
$employeeID = $employeeID->fetch_row()[0]+1;

//Create the employee record for the employee

$sql = "INSERT INTO `Employees`(`employeeID`) VALUES ($employeeID)";
$result = $conn->query($sql);
if ($conn->error) die($conn->error);

//create an array of the record just created to return back
$array['employeeid'] = $employeeID;

echo json_encode($array);
