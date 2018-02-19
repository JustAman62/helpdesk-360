// Contributions by: Jess McCreery
<?php

require('connect.php');

$licencenumber = $_REQUEST['licencenumber'];
$name = $_REQUEST['name'];
$type = $_REQUEST['name'];

//Create the software entry in database

$sql = "INSERT INTO `Software`(`licenceNumber`, `type`, `name`) VALUES ('$licencenumber', '$type', '$name')";
$result = $conn->query($sql);
if ($conn->error) die($conn->error);
