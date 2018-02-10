<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 10/02/2018
 * Time: 17:32
 *
 * deletes the specified employee
 */

require('connect.php');

$employeeid = $_REQUEST['employeeid'];


$sql = "DELETE FROM `Employees` WHERE employeeID = $employeeid";

$conn->query($sql);
if ($conn->error) die($conn->error);

echo 'deletion successful';