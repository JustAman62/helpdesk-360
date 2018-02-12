<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 03/02/2018
 * Time: 15:46
 * Gets all information for the users in the system, and outputs a json file with this information
 */

require('connect.php');

$userid = $_REQUEST['userid'];

$sql = "SELECT * FROM Users LEFT JOIN Employees ON Users.employeeID = Employees.employeeID WHERE Users.userID = $userid";

$result = $conn->query($sql);

if ($conn->error) die($conn->error);


echo json_encode($result->fetch_object());