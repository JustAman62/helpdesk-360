<?php
// Contributions by: Jess McCreery

require('connect.php');

$serialnumber = $_REQUEST['serialnumber'];
$type = $_REQUEST['type'];
$make = $_REQUEST['make'];

//Create the hardware entry in database

$sql = "INSERT INTO `Equipment`(`serialNumber`, `type`, `make`) VALUES ('$serialnumber', '$type', '$make')";
$result = $conn->query($sql);
if ($conn->error) die($conn->error);
