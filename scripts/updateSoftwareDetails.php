<?php

require('connect.php');

$licencenumber = $_REQUEST['employeeid'];
$name = $_REQUEST['firstname'];
$type = $_REQUEST['lastname'];

// update employee table

$sql = "UPDATE `Software` SET `licenceNumber`='$licencenumber',`name`='$name',`type`='$type' WHERE `licenceNumber`=$licencenumber";

$result = $conn->query($sql);
if ($conn->error) die($conn->error);
