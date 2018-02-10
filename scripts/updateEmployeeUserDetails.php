<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 10/02/2018
 * Time: 16:03
 *
 * updates the employee and user tables with new information
 */

require('connect.php');

$employeeID = $_REQUEST['employeeid'];
$firstname = $_REQUEST['firstname'];
$lastname = $_REQUEST['lastname'];
$contactnumber = $_REQUEST['contactnumber'];
$department = $_REQUEST['department'];
$jobtitle = $_REQUEST['jobtitle'];
$userid = $_REQUEST['userid'];
$password = $_REQUEST['password'];
$accesslevel = $_REQUEST['accesslevel'];

// update employee table

$sql = "UPDATE `Employees` SET `firstName`=$firstname,`lastName`=$lastname,`jobTitle`=$jobtitle,`department`=$department,`contactNumber`=$contactnumber WHERE `employeeID`=$employeeID";

$result = $conn->query($sql);

if ($conn->error) die($conn->error);
