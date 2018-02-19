<?php
// Contributions by: Jess McCreery

require('connect.php');

$serialnumber = $_REQUEST['serialnumber'];
$type = $_REQUEST['type'];
$make = $_REQUEST['make'];

// update software table

$sql = "UPDATE `Equipment` SET `serialNumber`='$serialnumber',`type`='$name',`make`='$type' WHERE `serialNumber`= $serialnumber";
$result = $conn->query($sql);
if ($conn->error) die($conn->error);
