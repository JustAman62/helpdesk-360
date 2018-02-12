<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 10/02/2018
 * Time: 17:26
 *
 * deletes the specified user
 */

require('connect.php');

$userid = $_REQUEST['userid'];


$sql = "DELETE FROM `Users` WHERE userID = $userid";

$employeeID = $conn->query($sql);
if ($conn->error) die($conn->error);

echo 'deletion successful';
