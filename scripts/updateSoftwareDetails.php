<?php

require('connect.php');

$licencenumber = $_REQUEST['licencenumber'];
$name = $_REQUEST['name'];
$type = $_REQUEST['type'];

// update software table

$sql = "UPDATE `Software` SET `licenceNumber`='$licencenumber',`name`='$name',`type`='$type' WHERE `licenceNumber`= $licencenumber";

$result = $conn->query($sql);
if ($conn->error) die($conn->error);
