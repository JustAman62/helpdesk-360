<?php

require('connect.php');

//Create the software entry in database

$sql = "INSERT INTO `Software`(`licenceNumber`, `name`, `type`) VALUES ($licencenumber, $name, $type)";
$result = $conn->query($sql);
if ($conn->error) die($conn->error);
